import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../contexts/DataContext";
import { addWeight, getWeight } from "../api/weight";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
} from "recharts";

interface weightRecord {
  email: string;
  weight: number;
  date: string;
}

// Helper function to get today's date in PST
const getTodayInPST = (): string => {
  const now = new Date();
  // Convert current time to UTC then adjust for PST (-8 hours)
  const pstOffset = now.getTimezoneOffset() + 480; // 480 minutes = 8 hours
  const pstTime = new Date(now.getTime() - pstOffset * 60 * 1000);
  return pstTime.toISOString().split("T")[0]; // Return in YYYY-MM-DD format
};

export const WeightTracker = () => {
  const [weights, setWeights] = useState<weightRecord[]>([]);
  const [weight, setWeight] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [date, setDate] = useState(getTodayInPST()); // Default date is today in PST
  const navigate = useNavigate();
  const { currentUser } = useContext(DataContext);
  const userEmail = currentUser?.email;
  let goal = currentUser?.weightGoal;

  // Sets an arbitrary goal if user doesn't have one
  if (!goal) {
    goal = 150;
  }

  useEffect(() => {
    if (!userEmail) {
      console.error("User email is undefined");
      return;
    }

    // Grabs all Weight Entries
    getWeight(userEmail)
      .then((response) => {
        if (response.success && Array.isArray(response.data.weightRecords)) {
          // Sorts from Earliest to Latest Dates
          const sortedWeights = response.data.weightRecords.sort(
            (a: { date: string | number | Date; }, b: { date: string | number | Date; }) => new Date(a.date).getTime() - new Date(b.date).getTime()
          );
          setWeights(sortedWeights);
        } else {
          console.error("Failed to fetch weight records");
        }
      })
      .catch((err) => {
        console.error("Error fetching weights:", err);
        setError("Error fetching weight records.");
      }).finally(() => setLoading(false));;
  }, [userEmail]);

  // Create 10% buffer for chart's Y-axis
  let maxY = Math.max(...weights.map((item) => item.weight), goal);
  let minY = Math.min(...weights.map((item) => item.weight), goal);
  let buffer = (maxY - minY) * 0.1;
  maxY = Math.round(maxY + buffer);
  minY = Math.round(minY - buffer);

  const handleSubmit = async () => {
    if (!weight) {
      alert("Please enter weight");
      return;
    }
    if (!userEmail) {
      console.error("Email is undefined");
      return <div>Cannot pull up user data, email is undefined...</div>;
    }

    // Allows user to not input a date (assigns date to today.)
    const formattedDate = date || getTodayInPST();

    const weightRecord: weightRecord = {
      email: userEmail,
      weight: parseFloat(weight),
      date: formattedDate, // YYYY-MM-DD
    };

    try {
      console.log("Adding weight record:", weightRecord);
      await addWeight(weightRecord);
      // Makes sure array is sorted from earliest to latest
      setWeights((prevWeights) =>
        [...prevWeights, weightRecord].sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        )
      );
    } catch (error) {
      console.error("Error adding weight record:", error);
      alert("Failed to add weight record.");
    }

    // Clear input fields
    setWeight("");
    setDate(getTodayInPST());
  };

  const handleEdit = () => {
    console.log("Navigate to edit page for weight:");
    navigate(`/edit-weight/${userEmail}`);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div style={{ width: "100%", height: "100%", padding: "20px" }}>
      {/* Chart Section */}
      <ResponsiveContainer width="100%" height="70%">
        <LineChart
          width={500}
          height={300}
          data={weights}
          margin={{ top: 20, right: 50, left: 20, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            label={{ value: "Date", position: "insideBottom", offset: -9 }}
          />
          <YAxis
            label={{ value: "Weight", angle: -90, position: "insideLeft" }}
            domain={[minY, maxY]}
          />
          <Tooltip />
          <Legend
            wrapperStyle={{
              top: -30,
              left: 50,
              right: 0,
              bottom: 0,
              position: "relative",
            }}
          />
          <ReferenceLine
            y={goal}
            label={{ value: "Goal", position: "insideTop" }}
            stroke="blue"
          />
          <Line type="monotone" dataKey="weight" stroke="green" />
        </LineChart>
      </ResponsiveContainer>

      {/* Button Section */}
      <div style={{ marginTop: "0px" }}>
        <div style={{ marginBottom: "-15px" }}>
          <label>
            Enter Weight:{" "}
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="Weight in lb"
            />
          </label>
        </div>
        <div style={{ marginBottom: "5px" }}>
          <label>
            Enter Date:{" "}
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </label>
        </div>
        <div>
          <button onClick={handleSubmit} style={{ marginRight: "10px" }}>
            Submit
          </button>
          <button onClick={handleEdit}>Edit</button>
        </div>
      </div>
    </div>
  );
};

export default WeightTracker;
