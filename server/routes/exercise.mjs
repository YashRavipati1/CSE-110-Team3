import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";

const router = express.Router();

router.get("/", async (req, res) => {
    let collection = await db.collection("exerciseEntries");
    let results = await collection.find({}).toArray();
    console.log(results);
    res.send(results).status(200);
});

router.get("/:id", async (req, res) => {
    let query = { _id: ObjectId(req.params.id) };
    let collection = await db.collection("exerciseEntries");
    let results = await collection.findOne(query);
    console.log(results);
    res.send(results).status(200);
});

router.post("/", async (req, res) => {
    let collection = await db.collection("exerciseEntries");
    let result = await collection.insertOne(req.body);
    res.send(result).status(200);
});

router.delete("/:id", async (req, res) => {
    const query = { _id: ObjectId(req.params.id) };
    let collection = await db.collection("exerciseEntries");
    let result = await collection.deleteOne(query);
    res.send(result).status(200);
});

export default router;