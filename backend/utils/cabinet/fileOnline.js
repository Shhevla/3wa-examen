
import admin from 'firebase-admin';
import { getDatabase, set, ref, get} from 'firebase/database';
import { getStorage, ref as ref2, listAll} from "firebase/storage";

export async function uploadFile(uid , indexMember, uidCab, members, action) {
    let response;
    const storage = getStorage();
    let database = getDatabase();
    let listRef = ref2(storage, `images/${uidCab}/members/${members.firstName}_${members.lastName}/`);
    let databasePath = ref(database, `locations/${uidCab}/`)
    let indexsave;

    await get(databasePath).then((snapshot) => {
        if (snapshot.exists()) {
            let data2 = snapshot.val();
            let index = 0;
            data2.members.forEach((element) => {
                if (element.firstName == members.firstName && element.lastName == members.lastName) {
                    indexsave = index;
                }   
                index++
            });
        } else {
             console.log("No data available");
        }
    }).catch((error) => {
        console.error(error);
    });

    await admin.auth().getUser(uid).then(async ( ) => {
        response = "ok";
        if (indexMember > -1) {  
            if (action == "upload") {
                await set(ref(database, `locations/${uidCab}/members/${indexsave}/notification/documents`), 1);
            }
            if (action == "list") {

            let item = 0;
            await listAll(listRef)
            .then(async (res) => {
                if (res.items != undefined)
                    res.items.forEach((itemRef) => {
                        item += 1;
                    });
                if (item != 0 && members.notification.documents != 0)
                    await set(ref(database, `locations/${uidCab}/members/${indexsave}/notification/documents`), 0);
                if (item == 0) {
                    console.log(item);
                    await set(ref(database, `locations/${uidCab}/members/${indexsave}/notification/documents`), -1);
                }
            }).catch((error) => {
                console.log(error);
            })}
            if (action == "delete") {
                let item = 0;
                await listAll(listRef)
                .then(async (res) => {
                    if (res.items != undefined)
                        res.items.forEach((itemRef) => {
                            item += 1;
                        
                        });
                    if (item <= 1)
                        await set(ref(database, `locations/${uidCab}/members/${indexsave}/notification/documents`), -1);
                }).catch((error) => {
                    console.log(error);
                });
            }
        }
    }).catch((error) => {response = "no found"; console.log(error)})
    return(response);
}