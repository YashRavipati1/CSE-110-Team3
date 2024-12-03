import express from "express";
import cors from "cors";
import "./loadEnvironment.mjs";
import "express-async-errors";
import users from "./routes/users.mjs";
import exercise from "./routes/exercise.mjs";
import nutrition from "./routes/nutrition.mjs";
import mood from "./routes/mood.mjs";
import weight from "./routes/weight.mjs"

const PORT = process.env.PORT || 8080;
const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/users", users);
app.use("/exercise", exercise);
app.use("/nutrition", nutrition);
app.use("/mood", mood);
app.use("/weights", weight);

// Global error handling
app.use((err, _req, res, next) => {
  res.status(500).send("Uh oh! An unexpected error occured.")
})

// start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
