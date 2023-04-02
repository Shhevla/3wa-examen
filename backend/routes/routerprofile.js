import express from "express";

import { getRole, inscription, readProfile, updateProfile } from "../utils/profile/profile.js";
const router = express.Router();

router.post("/getprofile", (req, res) => {
    const uid = req.body.uid;
    readProfile(uid).then(data => {
        res.send(data.data());
    })
})

router.post("/updateprofile", (req, res) => {
    const uid = req.body.uid;
    updateProfile(uid, req.body.user).then((data) => res.send({response: data}));
})

router.get("/getrole", (req, res) => {
    const uid = req.body.uid;
    getRole(uid).then(data => {
        res.send(data.data().abonnement);
    })
})

router.post("/verifyaccount", (req, res) => {
    const uid = req.body.uid;
    readProfile(uid).then(data => {
        if (data.data() == null) {
            res.send({ response: "no account" });
        } else {
            res.send({ response: "account" });
        }
    })
})

router.post("/createaccount", (req, res) => {
    const json = req.body.json;
    const uid = req.body.uid;
    console.log(uid, "separation",json);
    inscription(uid, json);
    res.send({ response: "create" });
})

export default router;