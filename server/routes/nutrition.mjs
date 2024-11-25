import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";

const router = express.Router();

// Zere: adding this to get all nutrition entries for a specific user by email, with no specific date
router.get("/:email", async (req, res) => {
    //console.log("User email in nutrition.mjs: " + req.params.email);
    let collection = await db.collection("nutritionEntries");
    let query = { user: req.params.email };
    //console.log("User email in query: " + req.params.email);
    try {
        let results = await collection.find(query).toArray();
        if (results.length > 0) {
            res.status(200).send(results);
        } else {
            res.status(404).send('No nutrition entries found for this user.');
        }
    } catch (error) {
        res.status(500).send('Server error while retrieving nutrition entries.');
    }
});


router.get("/:email/:_id", async (req, res) => {
    //console.log("User email in nutrition.mjs: " + req.params.email);
    let collection = await db.collection("nutritionEntries");
    let query = { user: req.params.email, _id: ObjectId(req.params._id) };
    //console.log("User email in query: " + req.params.email);
    try {
        let results = await collection.find(query).toArray();
        if (results.length > 0) {
            res.status(200).send(results);
        } else {
            res.status(404).send('No nutrition entries found for this user.');
        }
    } catch (error) {
        res.status(500).send('Server error while retrieving nutrition entries.');
    }
});


router.get("/", async (req, res) => {
    let collection = await db.collection("nutritionEntries");
    let results = await collection.find({}).toArray();
    res.send(results).status(200);
});

// Zere: adding this to get a specific nutrition entry by unique ID
router.get("/:id", async (req, res) => {
    console.log("Checking user ID from edit meal in GET nutrition.mjs",req.params.id);
    let query = { _id: ObjectId(req.params._id) };
    let collection = await db.collection("nutritionEntries");
    let results = await collection.findOne(query);
    res.send(results).status(200);
});

router.get("/:email/:date", async (req, res) => {
    let query = { user: req.params.email, date: req.params.date };
    console.log(req.params.date);
    let collection = await db.collection("nutritionEntries");
    let results = await collection.find(query).toArray();
    res.send(results).status(200);
})

router.post("/", async (req, res) => {
    let collection = await db.collection("nutritionEntries");
    let result = await collection.insertOne(req.body);
    res.send(result).status(200);
});

router.delete("/:id", async (req, res) => {
    const query = { _id: ObjectId(req.params.id) };
    let collection = await db.collection("nutritionEntries");
    let result = await collection.deleteOne(query);
    res.send(result).status(200);
});

// Zere: adding this to update the nutrition entry in case the user wants to edit
router.put("/:id", async (req, res) => {
    const query = { _id: ObjectId(req.params.id) };
    const update = { $set: req.body };
    let collection = await db.collection("nutritionEntries");
    let result = await collection.updateOne(query, update);
    res.send(result).status(200);
});

export default router;