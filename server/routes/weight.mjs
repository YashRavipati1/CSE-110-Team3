import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";

const router = express.Router();

router.get("/", async (req, res) => {
    let collection = await db.collection("weightEntries");
    try {
        // Sort all entries by date (ascending order: earliest to latest)
        let results = await collection.find({}).sort({ date: 1 }).toArray();
        res.status(200).send(results);
    } catch (error) {
        res.status(500).send("Server error while retrieving weight entries.");
    }
});

router.get("/:email", async (req, res) => {
    let collection = await db.collection("weightEntries");
    let query = { email: req.params.email };
    try {
        // Sort entries by date
        let results = await collection.find(query).sort({ date: 1 }).toArray();
        if (results.length > 0) {
            res.status(200).send({ weightRecords: results });
        } else {
            res.status(404).send("No weight entries found for this user.");
        }
    } catch (error) {
        res.status(500).send("Server error while retrieving weight entries.");
    }
});


router.post("/", async (req, res) => {
    let collection = await db.collection("weightEntries");
    try {
        let result = await collection.insertOne(req.body);
        res.status(200).send(result);
    } catch (error) {
        res.status(500).send("Server error while adding a weight entry.");
    }
});

router.delete("/:id", async (req, res) => {
    const query = { _id: ObjectId(req.params.id) };
    const collection = db.collection("weightEntries");
    try {
      let result = await collection.deleteOne(query);
      res.status(200).send(result);
    } catch (error) {
      res.status(500).send("Server error while deleting a weight entry.");
    }
  });  

router.patch("/:id", async (req, res) => {
    const query = { _id: ObjectId(req.params.id) }; // Find by unique ID
    const updates = { $set: req.body }; // Apply only specified updates

    let collection = await db.collection("weightEntries");
    try {
        let result = await collection.updateOne(query, updates);
        res.status(200).send(result);
    } catch (error) {
        res.status(500).send("Server error while updating a weight entry.");
    }
});

export default router;
