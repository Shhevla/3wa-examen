import express from "express";
import { deleteMessage, modifmessage, writeTchat } from "../utils/chatbox/chatbox.js";
const router = express.Router();

 router.post("/sendmsg", async(req, res) => {
    const uid = req.body.uid;
    const uidCab = req.body.uidCab;
    const txt = req.body.txt;
    writeTchat(uidCab, uid, txt);
})

router.post("/modifmessage", async(req, res) => {
    const uid = req.body.uid;
    const uidCab = req.body.uidCab;
    const txt = req.body.txt;
    const index = req.body.index;
    modifmessage(uidCab, uid, txt, index);
})

router.post("/deletemessage", async(req, res) => {
    const uid = req.body.uid;
    const uidCab = req.body.uidCab;
    const index = req.body.index;
    deleteMessage(uidCab, uid, index);
})

export default router;