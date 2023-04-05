import { getDatabase, ref, set, get, update, remove } from "firebase/database";
import { getAllWorker, roleofCabinet } from "../cabinet/cabinet.js";

export async function writeTchat(uidCab, uid, txt) {
    let role = roleofCabinet(uid, uidCab);
    let database = getDatabase();
    let save = [];
    let worker = [];
    let refdb = ref(database, 'message/' + uidCab);
    let tabsave = [];
    for (let i = 0; i < 2; i++) {
        worker[i] = [];
    }
    tabsave = await getAllWorker(uidCab);
    for (let i = 0; i < tabsave.length; i++) {
        worker[0][i] = tabsave[i].id;
    }
    for (let i = 0; i < worker[0].length; i++) {
        if (worker[0][i] === uid) 
            worker[1][i] = 0
        else 
            worker[1][i] = 1
    }
    await get(refdb).then((data) => {if (data.val() !== null) save = data.val().message;});
    if (save === undefined) 
        save = [];
    save.push(txt);
    let json = {"worker": worker[0], "workerNotif": worker[1], "message": save};
    set(refdb, json);
    console.log("Ecriture dans la base de donnée");
}

export async function modifmessage(uidCab, uid, txt, index) {
    let database = getDatabase();
    console.log("Modification de la base de donnée")
    let refdb = ref(database, 'message/' + uidCab + '/message/' + index);
    update(refdb, txt);
}

export async function deleteMessage(uidCab, uid, index) {
    let database = getDatabase();
    console.log("Suppresion de la base de donnée")
    let refdb = ref(database, 'message/' + uidCab + '/message/' + index);
    remove(refdb);
}