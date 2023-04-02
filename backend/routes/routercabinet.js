import express from "express";
import { addWorker, allCabinetWork, createCabinet, delWorker, notifDocumentSend, pendingInvitation ,pendingAccept, pendingCancel, readAllWorker, readCabinet, removeCabinet, updateCabinet, roleofCabinet } from "../utils/cabinet/cabinet.js";
import { writeTchat } from "../utils/chatbox/chatbox.js";

const router = express.Router();

router.post("/createcabinet", (req, res) => {
    const uid = req.body.uid;
    const json = req.body.json;
    createCabinet(uid, json);
    res.send({ response: "create" });
})

router.post("/getcabinet", (req, res) => {
    const id = req.body.id;
    const path = req.body.path;
    readCabinet(id, path).then(data => {
        res.send(data.data());
    })
})

router.post("/updatecabinet", (req, res) => {
    const id = req.body.id;
    const json = req.body.json
    const path = req.body.path;
    updateCabinet(id, path ,json).then((data) => {
        console.log(data);
        res.send({ response: data });
    })
})

router.post("/deletecabinet", (req, res) => {
    const uid = req.body.uid;
    const path = req.body.path;
    const uidCab = req.body.uidCab;
    removeCabinet(path, uidCab, uid).then((data) => {
        res.send(data);
    })
})

router.post("/getallcabinetwork", (req, res) => {
    const uid = req.body.uid;
    allCabinetWork(uid).then((data) => {res.send(data)})
})

router.post("/getallworker", (req, res) => {
    const pract = req.body.pract;

    readAllWorker(pract).then((data) => {res.send(data)})
})

router.post("/addworker", (req, res) => {
    const id =req.body.id;
    const path = req.body.path;
    const email = req.body.email;
    addWorker(id,path, email).then(() => {res.send({ response: "added" })}).catch(() => {
       res.send({ response: "no User" });
    });
})

router.post("/delworker", (req, res) => {
    const id =req.body.id;
    const path = req.body.path;
    const practId = req.body.practId;
    delWorker(id,path, practId).then(() => {res.send({ response: "delete" })}).catch(() => {
       res.send({ response: "no User" });
    });
})

router.post("/pendinginvitation", (req, res) => {
    const email = req.body.email;
    const path = req.body.path;
    const idCab = req.body.id;
    pendingInvitation(email, path, idCab).then((data) => {
        console.log(data);
        res.send({response: data});
    })
})

router.post("/pendingaccept", (req, res) => {
    const email = req.body.email;
    const notification = req.body.notification;

    pendingAccept(email, notification).then(() => {
        res.send({response: "add"});
    })
})

router.post("/pendingcancel", (req, res) => {
    const email = req.body.email;
    const notification = req.body.notification;

    pendingCancel(email, notification).then(() => {
        res.send({response: "del"});
    })
})

router.post("/notifdocumentsend", (req, res) => {
    const indexMember = req.body.indexMember;
    const uid = req.body.uid;
    const uidCab = req.body.uidCab;
    notifDocumentSend(indexMember, uid, uidCab)
    res.send({response: "send"}); 
})

router.post("/roleget", async(req, res) => {
    const uid = req.body.uid;
    const uidCab = req.body.uidCab;
    let answerResult;
    let answePromise = roleofCabinet(uid, uidCab);
    answePromise.then(data => {answerResult = data})
    console.log((await answePromise).toString());
    res.send({response: (await answePromise).toString()})
})


export default router;