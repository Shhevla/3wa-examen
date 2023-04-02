import { doc, getFirestore, updateDoc, getDoc, setDoc, collection, addDoc } from "firebase/firestore";
import admin from 'firebase-admin'

export function readProfile(uid, test) {
    let db = getFirestore();
    return new Promise(
        (resolve, reject) => {
            const query = getDoc(doc(db, "profile", uid));
            resolve(query);
        }
    )
}

export async function updateProfile(uid, json) {
    let db = getFirestore();
    let errorcheck = "200";
    let usererror;
    await readProfile(uid).then((data) => {usererror = data.data();});
    return new Promise(
        async (resolve, reject) => {
        console.log(usererror);
        if (usererror) {
            const query = await setDoc(doc(db, "profile", uid), json).catch((error) => errorcheck = error );
        } else 
            errorcheck = "304";
        resolve(errorcheck);
        }
    )
}

export function getRole(uid) {
    let db = getFirestore();

    return new Promise(
        (resolve, reject) => {
            const query = getDoc(doc(db, "profile", uid));
            resolve(query);
        }
    )
}

export function inscription(uid, json) {
    let db = getFirestore();

    return new Promise(async (resolve, reject) => {
       const query = await setDoc(doc(db, "profile", uid), json);
       await addDoc(collection(db, "cabinets_manager"), {}).then((data)=> {
            setDoc(doc(db, "profile", uid), {cabinet_manager: data.id }, {merge: true});
        })
        resolve(query);
    })
}