import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";

const router = express.Router();

router.get("/", async (req, res) => {
    let collection = await db.collection("users");
    let results = await collection.find({}).toArray();
    res.send(results).status(200);
});

router.get("/:email", async (req, res) => {
    try {
        let query = { email: req.params.email };
        let collection = await db.collection("users");
        let results = await collection.findOne(query);
        if (!results) {
            return res.send({ user: null });
        }
        res.send({ user: results });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

router.post("/", async (req, res) => {
    let collection = await db.collection("users");
    let result = await collection.insertOne(req.body);
    res.send(result).status(200);
});

router.delete("/:id", async (req, res) => {
    const query = { _id: ObjectId(req.params.id) };

    const collection = db.collection("users");
    let result = await collection.deleteOne(query);

    res.send(result).status(200);
});

router.patch("/:email", async (req, res) => {
    const query = { email: req.params.email };
    const updates = { $set: req.body };

    let collection = await db.collection("users");
    let result = await collection.updateOne(query, updates);

    res.send(result).status(200);
});

export default router;