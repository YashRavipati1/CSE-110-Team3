import express from "express";
import db from "../db/conn.mjs";

const router = express.Router();

router.get("/", async (req, res) => {
    let collection = await db.collection("mealRecs");
    let results = await collection.find({}).toArray();
    res.send(results).status(200);
});


// Types are either High or Low (caps sensitive)
// Calorie type, protein type, fat type - gets 3 recommendations
router.get("/:calType/:pType/:fType/:cType", async (req, res) => {
    let collection = await db.collection("mealRecs");
    let query = {
        calType: req.params.calType,
        pType: req.params.pType,
        fType: req.params.fType,
        cType: req.params.cType
    };

    let results = await collection.find(query).toArray();
    if (results.length > 3) {
        results = results.sort(() => 0.5 - Math.random()).slice(0, 3);
    }
    res.send(results).status(200);
});

export default router;