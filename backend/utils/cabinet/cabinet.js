import { doc, getFirestore, updateDoc, getDoc, addDoc, collection, arrayUnion, deleteDoc, arrayRemove, getDocs, setDoc} from "firebase/firestore";
import { getDatabase, ref, set, remove, update, onValue, get, child } from "firebase/database";
import admin from 'firebase-admin'
import { getRole, readProfile } from "../profile/profile.js";
import { getRandomColor } from "../basics/randomColorChooser.js";
import { getStorage, deleteObject, ref as ref2} from "firebase/storage";

export function createCabinet(uid, json) {
    let db = getFirestore();
    let date = new Date();
    let database = getDatabase();
    if (date.getMinutes() < 10)
        json["date"] = `${date.getDay()}/${date.getMonth()}/${date.getFullYear()} ${date.getHours()}:0${date.getMinutes()}`;
     else 
        json["date"] = `${date.getDay()}/${date.getMonth()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
    json["owner"] = uid;
    return new Promise(async (resolve, reject) => {
        let saveCm;
        let path = "cabinets_manager/database/";
        await readProfile(uid).then((dataP) => saveCm = dataP);
        path = path + saveCm.data().cabinet_manager + "/";
        const query = await addDoc(collection(db, path), json).then(async data => {
            updateDoc(doc(db, "profile", uid), { cabinet: arrayUnion(path + data.id ) });
            const pathReal = ref(database, "locations/" + data.id);
            set(pathReal, json);
        })
        resolve(query);
    })
}

export function readCabinet(id, path) {

    let db = getFirestore();
    return new Promise(
        (resolve, reject) => {
            console.log(id);
            const query = getDoc(doc(db, path, id));
            resolve(query);
        }
    )
}

export  async function allCabinetWork(uid) {
    let db = getFirestore();
    let saveP;
    await readProfile(uid).then((dataP) => saveP = dataP);
    return await new Promise(
         async(resolve, reject) => {
            let stockData = [];
            for (var i = 0; i < 3; i++)
                stockData[i] = [];
            for (let iC = 0; iC < saveP.data().cabinet.length; iC++) {
                let indexCut = -1;
                for (let i = 0; i < saveP.data().cabinet[iC].length; i++)
                    if (saveP.data().cabinet[iC][i] == '/')
                        indexCut = i;
                let subCab = saveP.data().cabinet[iC].substring(indexCut + 1);
                let subPath = saveP.data().cabinet[iC].substring(0, indexCut + 1)
                await getDoc(doc(db, subPath, subCab)).then((data) => {
                    stockData[0][iC] = data.data();
                    stockData[1][iC] = data.id;
                    stockData[2][iC] = subPath;
                });
            }
            resolve(stockData);
        }
    );
}

export async function readAllWorker(pract) {
    let db = getFirestore();
    return await new Promise(
         async(resolve, reject) => {
            let stockData = [];
            for (var i = 0; i < 2; i++)
                stockData[i] = [];
            let index = 0;
            if (pract.length != 0) {
                for (let i = 0; i < pract.length; i++) {
                    await getDoc(doc(db, "profile", pract[i].id)).then((data) => {
                        stockData[0][index] = data.data();
                        stockData[1][index] = data.id;
                        index++;
                    })
                }
            }
            resolve(stockData);
        }
    );
}

export async function getAllWorker(uidCab) {
    const db = ref(getDatabase());
    let saveWorker;
    await get(child(db, "locations/" + uidCab + "/practitioners/" )).then((snapshot) => {
        saveWorker = snapshot.val();
    })
    return saveWorker;
    //const path = ref(db, "locations/" + uidCab + "/practitioners/");
    //onValue(path, (data) => {
    //  const practitioners = data.val() ? data.val() : [];
    //  return practitioners;
    //});
}

export async function removeCabinet(path, id, uid) {
    let db = getFirestore();
    let database = getDatabase();
    let role = await roleofCabinet(uid, id);
    console.log(role);
    if (role === "Error" || role != "Titulaire") {
        return("Rolefalse");
    }
    const pathReal = ref(database, "locations/" + id);
    const storage = getStorage();
    const desertRef = ref2(storage, `images/${id}`);
    path = path.charAt(0).toLowerCase() + path.slice(1);
    let refdb = doc(db, path, id);
    let msg = "Delete";
    new Promise(async (resolve, reject) => {
        const query = await getDoc(refdb);
        let tableMail = query.data().invitation;
        let tablePract = query.data().practitioners;
        let tableUidInvit = [];
        let pendingDelete = {"name" : query.data().name, "path" : path + id};
        if (query.exists()) {
            if (tableMail != undefined) {
                for (let i = 0; i < tableMail.length; i++) {
                    await admin.auth().getUserByEmail(tableMail[i]).then((dataMail) => {tableUidInvit.push(dataMail.uid) });
                }
                for (let i = 0; i < tableUidInvit.length; i++) {
                    updateDoc(doc(db, "profile", tableUidInvit[i]), {pending: arrayRemove(pendingDelete)});
                }
            }
            for (let i = 0; i < tablePract.length; i ++) {
            updateDoc(doc(db, "profile", tablePract[i].id), {cabinet: arrayRemove(path + id)});
            }
            deleteObject(desertRef).then(() => {
            }).catch((error) => {
                console.log(error);
            });
            deleteDoc(refdb);
            remove(pathReal);
            msg = "Delete";
            resolve("Delete Ok");
        } else {
            msg = "ErrorDelete";
            resolve("Error")
        }
    })
    return(msg);
}

export async function addWorker(id, path, mail) {
    let db = getFirestore();
    let database = getDatabase();
    let uid;
    let profil;
    let obj = [];

    await admin.auth().getUserByEmail(mail).then((data) => {uid = data.uid}).catch((error) => {uid = "no found"; console.log(error)})
    await readProfile(uid).then((data) => {profil = data})
    let refdb = doc(db, path, id);
    const jsontest = {
        "firstName": profil.data().information.fname,
        "lastName": profil.data().information.lname,
        "color": getRandomColor(),
        "id": uid,
        "role": "Remplacent"
    }
    await get(child(ref(database), "locations/" + id + "/practitioners/" )).then((snapshot) => {
        obj = snapshot.val();
        const checkUndefined = (element) => element == undefined;
        const checkindex = obj.findIndex(checkUndefined, undefined);
        if (checkindex == -1)
            obj.push(jsontest);
        else
            obj[checkindex] = jsontest;
    })
    return new Promise((resolve, reject) => {
        if (uid != "no found") {
        const query = getDoc(refdb);
        resolve(query);
        } else {
        reject("no user");
        }
    }).then(() => {
        updateDoc(refdb, { practitioners: arrayUnion(jsontest) });
        updateDoc(doc(db, "profile", uid), {cabinet: arrayUnion(path + id)});
        //update(ref(database), updates);
        set(ref(database, 'locations/' + id + "/practitioners/"), obj);
    })
}

export async function delWorker(id, path, practId) {
    const db = getDatabase();
    const firestore = getFirestore();
    const realtimePath = ref(db, 'locations/' + id);
    let stock;
    let deleteName;
    let verifdel = 0;
    await readProfile(practId).then((data) => {console.log("test",path.split("/")[2], data.data().cabinet_manager ); if (data.data() != undefined && path.split("/")[2] == data.data().cabinet_manager) verifdel = 1})
    await getDoc(doc(firestore, path, id)).then((data) => {stock = data.data().practitioners;})
    for (let i = 0; stock.length > i ; i++) {
        if (practId == stock[i].id)            
            deleteName = stock[i];
    }
    console.log(path.split("/")[2], practId);
    if (verifdel == 0) {
    console.log(verifdel);
    return new Promise(resolve => {
        updateDoc(doc(firestore, path, id), { practitioners: arrayRemove(deleteName)});
        updateDoc(doc(firestore, "profile", practId), { cabinet: arrayRemove(path+id)});
         onValue(realtimePath, async (snapshot) => {
            let secureNum;
            var data = snapshot.val();
            for (let i = 0; i < data.practitioners.length; i++) {
                if (data.practitioners[i] != undefined && data.practitioners[i].id == practId) {
                    await set(ref(db, 'locations/' + id +"/practitioners/" + i), null);
                    secureNum = i;
                }
            }
            for (let i = 0; data.members != undefined && i < data.members.length; i++) {
                if (data.members[i].invoice[secureNum] == undefined) {
                    secureNum = secureNum;
                } else
                   await set(ref(db, 'locations/' + id + "/members/" + i + "/invoice/" + secureNum), null);
            }
            resolve(data);
        }, {
            onlyOnce: true
        });
    });
    }
}

export function updateCabinet(id, path, json) {
    let db = getFirestore();
    let database = getDatabase();
    let errorcatch = "200";
    let save;

    return new Promise(async (resolve, reject) => {
        setDoc(doc(db, path, id), json);
        await get(ref(database, 'locations/' + id)).then((data) => {save  = data.val();});
        save.practitioners = json.practitioners;
        await set(ref(database, 'locations/' + id), save).catch((error) => errorcatch = error);   
        if (errorcatch == "200" )
            resolve(errorcatch);
        else
            reject(errorcatch);
    })
}

export async function pendingInvitation(email, path, idCab) {
    let db = getFirestore();
    let uid;
    let dataCab = readCabinet(idCab, path);
    let tab = {name: "", path: ""};
    let verif = 0;
    let saveProfile;
    let nbPrac = 0;
    await dataCab.then((data) => { tab.name = data.data().name; tab.path = path + idCab; 
        if (data.data().invitation != undefined) nbPrac = data.data().practitioners.length + data.data().invitation.length; else nbPrac = data.data().practitioners.length; });
    await admin.auth().getUserByEmail(email).then((data) => {uid = data.uid}).catch((error) => {uid = "no found"; console.log(error)})
    await readProfile(uid,"d").then((data) => {saveProfile = data.data()});
    if (saveProfile != undefined) {
        saveProfile.cabinet.forEach(element => {
            if (element == path + idCab)
                verif = 1;
        })
    
        if (verif != 1 && saveProfile.pending != undefined )
            saveProfile.pending.forEach(element => {
                if (element.path == path + idCab)
                    verif = 1;
            })
    }
    if (uid != "no found" && verif == 0 && nbPrac < 10) {
        return new Promise((resolve, reject) => {
            resolve("add");
            updateDoc(doc(db, "profile", uid), {pending: arrayUnion(tab)});
            updateDoc(doc(db, path, idCab), {invitation: arrayUnion(email)});
        });
    } else if (nbPrac >= 10) 
        return(new Promise((resolve, reject) => {resolve("Full cabinet")}));
    else if (verif == 1)
        return(new Promise((resolve, reject) => {resolve("already here")}));
    else 
        return(new Promise((resolve, reject) => {resolve("invitation cancel")}));
}

export async function pendingAccept(email, notification) {
    let db = getFirestore();
    let uid;
   
    let id = notification.path.split("/");
    let path = notification.path.split("/");
    path.pop()
    await admin.auth().getUserByEmail(email).then((data) => {uid = data.uid}).catch((error) => {uid = "no found"; console.log(error)})
    return new Promise((resolve, reject) => {
        resolve();
    }).then(() => {
        addWorker(id[id.length - 1], path.join("/") + "/",email);
        updateDoc(doc(db, "profile", uid), {pending: arrayRemove(notification)});
        updateDoc(doc(db, path.join("/") + "/", id[id.length - 1]), {invitation: arrayRemove(email)});
    });
}

export async function pendingCancel(email, notification) {
    let db = getFirestore();
    let uid;
    let id = notification.path.split("/");
    let path = notification.path.split("/");
    console.log("Notification", id[id.length - 1]);
    path.pop()
    console.log("Notification", path.join("/") + "/");
    await admin.auth().getUserByEmail(email).then((data) => {uid = data.uid}).catch((error) => {uid = "no found"; console.log(error)})
    return new Promise((resolve, reject) => {
        resolve();
    }).then(() => {
        updateDoc(doc(db, "profile", uid), {pending: arrayRemove(notification)});
        updateDoc(doc(db, path.join("/") + "/", id[id.length - 1]), {invitation: arrayRemove(email)});
    });
}

export async function roleofCabinet(uid, uidCab) {
    let db = getDatabase();
    let save;
    let role;
    await get(ref(db, 'locations/' + uidCab)).then((data) => {save = data.val()});
    if(save == null)
        return("Error")
    else {
        await save.practitioners.forEach((element) => {
            if (element.id == uid)
                role = element.role;   
        })
      if (!role)
        return("Error")
      return role;
    }
}

export async function notifDocumentSend(indexMember, uid, uidCab){
//    let database = getDatabase();
//    
//    let realtimePath = ref(database, `Notification/${uidCab}/${indexMember}`);
//    onValue(realtimePath, async (snapshot) => { 
//        let getPract = snapshot.val().practitioners;
//        for(let i = 0; i < getPract.length; i++) {
//            if (getPract[i] != uid)
//                await set(ref(database, "location/" + uidCab +"/members/" + indexMember + "/notifications/document/", {arrayUnion: getPract[i]}));
//        }
//    })
//    return("send");
}