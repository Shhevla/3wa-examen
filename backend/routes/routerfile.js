import express from "express";
import { uploadFile } from "../utils/cabinet/fileOnline.js";
import path, { resolve } from 'path';
const router = express.Router();

 router.post("/uploadfile", async(req, res) => {
    const uid = req.body.uid;
    const indexMember = req.body.memberIndex;
    const CabId = req.body.cabId;
    const member =req.body.member;
    const action = req.body.type;
    let response;

    await uploadFile(uid,indexMember, CabId, member, action).then(data => {response = data});
    res.send({ response: response });
})

export default router;