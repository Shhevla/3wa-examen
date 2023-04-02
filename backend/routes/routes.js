import express from "express";

const router = express.Router();

router.get("/test", (req, res) => {
    console.log(new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''));
    res.send("Version 1.3");
})

export default router;