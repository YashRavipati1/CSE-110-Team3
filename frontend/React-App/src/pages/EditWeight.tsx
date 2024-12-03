import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getWeight, editWeight, deleteWeight } from "../api/weight";

interface WeightRecord {
  _id: string;
  email: string;
  weight: number;
  date: string;
}

const EditWeight = () => {
  const { email } = useParams<{ email: string }>(); // Retrieve the email parameter from the route
  const [weights, setWeights] = useState<WeightRecord[]>([]);
  const [markedForDeletion, setMarkedForDeletion] = useState<Set<string>>(
    new Set()
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!email) {
      setError("User email is missing.");
      return;
    }

    // Grabs all weight entries. Should already be sorted
    getWeight(email)
      .then((response) => {
        if (response.success && Array.isArray(response.data.weightRecords)) {
          setWeights(response.data.weightRecords);
        } else {
          setError("Failed to fetch weight records.");
        }
      }).catch((err) => {
        console.error("Error fetching weights:", err);
        setError("Error fetching weight records.");
      }).finally(() => setLoading(false));
  }, [email]);

  // Handle changes made to date or weight
  const handleInputChange = (
    index: number,
    field: "date" | "weight",
    value: string
  ) => {
    const updatedWeights = [...weights];
    updatedWeights[index] = {
      ...updatedWeights[index],
      [field]: field === "weight" ? parseFloat(value) : value,
    };
    setWeights(updatedWeights);
  };

  // Makes it so user needs to click save before entries are deleted
  const handleMarkForDeletion = (id: string) => {
    setMarkedForDeletion((prev) => {
      const updatedSet = new Set(prev);
      if (updatedSet.has(id)) {
        updatedSet.delete(id);
      } else {
        updatedSet.add(id);
      }
      return updatedSet;
    });
  };

  const handleSaveAll = async () => {
    // Promises serve as a buffered state before saving/deletion
    try {
      // Handle edits
      const savePromises = weights
        .filter((record) => !markedForDeletion.has(record._id))
        .map((record) =>
          editWeight(record._id, {
            date: record.date,
            weight: record.weight,
          })
        );

      // Handle deletions
      const deletePromises = Array.from(markedForDeletion).map((id) =>
        deleteWeight(id)
      );

      // Saves changed from buffer
      await Promise.all([...savePromises, ...deletePromises]);
      navigate("/"); // Navigate back to the main page
    } catch (error) {
      console.error("Error saving changes:", error);
      alert("An error occurred while saving changes.");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Edit Weight Entries</h1>
      <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        {weights.map((entry, index) => (
          <div
            key={entry._id}
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "10px",
              backgroundColor: markedForDeletion.has(entry._id)
                ? "#ffe6e6" // Highlight deleted entries
                : "#f9f9f9",
            }}
          >
            <div style={{ flex: 1, marginRight: "10px" }}>
              <label>
                Date:{" "}
                <input
                  type="date"
                  value={entry.date}
                  onChange={(e) =>
                    handleInputChange(index, "date", e.target.value)
                  }
                  style={{
                    padding: "5px",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                  }}
                  disabled={markedForDeletion.has(entry._id)}
                />
              </label>
            </div>
            <div style={{ flex: 1, marginRight: "10px" }}>
              <label>
                Weight:{" "}
                <input
                  type="number"
                  value={entry.weight}
                  onChange={(e) =>
                    handleInputChange(index, "weight", e.target.value)
                  }
                  style={{
                    padding: "5px",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                  }}
                  disabled={markedForDeletion.has(entry._id)}
                />
              </label>
            </div>
            <button
              onClick={() => handleMarkForDeletion(entry._id)}
              style={{
                padding: "5px 10px",
                backgroundColor: markedForDeletion.has(entry._id)
                  ? "#4caf50" // Change button style for undo
                  : "#f44336",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              {markedForDeletion.has(entry._id) ? "Undo" : "Delete"}
            </button>
          </div>
        ))}
      </div>
      <div style={{ marginTop: "20px" }}>
        <button
          onClick={handleSaveAll}
          style={{
            padding: "10px 15px",
            backgroundColor: "#4caf50",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Save All Changes
        </button>
        <button
          onClick={() => navigate(-1)}
          style={{
            padding: "10px 15px",
            marginLeft: "10px",
            backgroundColor: "#f44336",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default EditWeight;
