import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";

const router = express.Router();

// Get all nutrition entries for a specific user by email and date range, modified the path by adding dateRange in front
router.get("/dateRange/:email", async (req, res) => {
    const { email } = req.params;
    const { start, end } = req.query;

    if (!start || !end) {
        return res.status(400).send("Start and end dates are required.");
    }

    try {
        // Treat the start and end as UTC dates
        const startOfDay = new Date(`${start}T00:00:00.000Z`); // Start of day in UTC
        const endOfDay = new Date(`${end}T23:59:59.999Z`); // End of day in UTC

        console.log("Start of day from mjs (UTC):", startOfDay, "End of day from mjs (UTC):", endOfDay);

        const collection = await db.collection("nutritionEntries");

        const query = {
            user: email,
            date: {
                $gte: startOfDay,
                $lte: endOfDay,
            },
        };

        console.log("MongoDB Query:", JSON.stringify(query, null, 2));

        const results = await collection.find(query).toArray();
        if (results.length > 0) {
            return res.status(200).send(results);
        } else {
            return res.status(404).send("No nutrition entries found for the specified range.");
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).send("Error fetching data.");
    }
});


// Zere: adding this to get all nutrition entries for a specific user by email, with no specific date
router.get("/all/:email", async (req, res) => {
    //console.log("User email in nutrition.mjs: " + req.params.email);
    let collection = await db.collection("nutritionEntries");
    let query = { user: req.params.email };
    console.log("User email in First function nutrition.mjs: " + req.params.email);
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


router.get("/nutID/:email/:_id", async (req, res) => {
    let { email, _id } = req.params;
    let collection = await db.collection("nutritionEntries");
    let query = { user: email, _id: ObjectId(_id) };
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

// get all nutrition entries for all users in database
router.get("/", async (req, res) => {
    let collection = await db.collection("nutritionEntries");
    let results = await collection.find({}).toArray();
    res.send(results).status(200);
});

// Zere: adding this to get a specific nutrition entry by unique ID
router.get("/:id", async (req, res) => {
    let query = { _id: ObjectId(req.params._id) };
    let collection = await db.collection("nutritionEntries");
    let results = await collection.findOne(query);
    res.send(results).status(200);
});

// Get all nutrition entries for a specific user by email and date, all in front of email to get all entries for a specific user first, then by date
// can be found at http://localhost:8080/nutrition/all/:email/:date
// 
router.get("/all/:email/:date", async (req, res) => {
    const { email, date } = req.params;

    try {
        // Parse the date from the request and construct the range
        const startOfDay = new Date(`${date}T00:00:00.000Z`);
        const endOfDay = new Date(`${date}T23:59:59.999Z`);

        console.log("Start of day from mjs (PST):", startOfDay, "End of day from mjs (PST):", endOfDay);

        // Query for dates within the specified day range
        const query = {
            user: email,
            date: {
                $gte: startOfDay,
                $lte: endOfDay,
            },
        };

        const collection = await db.collection("nutritionEntries");
        const results = await collection.find(query).toArray();

        if (results.length > 0) {
            res.status(200).send(results);
        } else {
            res.status(404).send("No nutrition entries found for the specified date.");
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).send("Error fetching data.");
    }
});


/*router.get("/:email/:date", async (req, res) => {
    let query = { user: req.params.email, date: req.params.date };
    let collection = await db.collection("nutritionEntries");
    let results = await collection.find(query).toArray();
    res.send(results).status(200);
})*/

router.post("/", async (req, res) => {
    try {
        const { date, ...rest } = req.body; // Extract the date field and the rest of the payload

        console.log("Date from MJS:", date);

        // Convert the input date to PST
        const convertToPST = (inputDate) => {
            const date = new Date(inputDate);
            //PST offset (UTC -8 hours)
            const utcOffset = 8 * 60 * 60 * 1000; // 8 hours in milliseconds
            const pstDate = new Date(date.getTime() - utcOffset);
        
            return pstDate;
        };
        

        const newEntry = {
            ...rest,
            date: convertToPST(date), // Convert the date to PST before saving
        };

        console.log("New nutrition entry FROM MJS in PST:", newEntry);
        const collection = await db.collection("nutritionEntries");
        const result = await collection.insertOne(newEntry);

        res.status(201).send(result);
    } catch (error) {
        console.error("Error adding entry:", error);
        res.status(500).send("Error adding entry.");
    }
});



router.delete("/:id", async (req, res) => {
    const query = { _id: ObjectId(req.params.id) };
    let collection = await db.collection("nutritionEntries");
    let result = await collection.deleteOne(query);
    res.send(result).status(200);
});

// Zere: adding this to update the nutrition entry in case the user wants to edit
router.put("/:email/:id", async (req, res) => {
    const query = {_id: ObjectId(req.params.id) };
    const update = { $set: req.body };
    let collection = await db.collection("nutritionEntries");
    let result = await collection.updateOne(query, update);
    res.send(result).status(200);
});


export default router;