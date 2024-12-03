interface weightRecord {
  email: string;
  weight: number;
  date: string;
};

export const getWeight = async (email: string)=> {
console.log("Checking all entries for from api for user:", email);
const response = await fetch(`http://localhost:8080/weights/${email}`, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    }
});

if (!response.ok) {
    const errorText = await response.text();
    console.error('Failed to fetch all weights:', errorText);
    return { success: false, data: errorText };
}

try {
    const data = await response.json();
    console.log('Fetched weights:', data);
    return { success: true, data: data };
} catch (error) {
    console.error('Error parsing weight data:', error);
    return { success: false}; 
}
}


export const addWeight = async (weightRecord: weightRecord) => {
  const response = await fetch(`http://localhost:8080/weights/`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(weightRecord)
  });
  if(!response.ok) {
      return { success: false, data: await response.text() };
  }
  return { success: true, data: await response.json() };
}

export const editWeight = async (email: string, updates: any) => {
  const response = await fetch(`http://localhost:8080/weights/${email}`, {
      method: 'PATCH',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(updates),
  });
  if(!response.ok) {
      return { success: false, data: await response.text() };
  }
  return { success: true, data: await response.json() }
};

export const deleteWeight = async (id: string) => {
  const response = await fetch(`http://localhost:8080/weights/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Failed to delete weight entry");
  }
  return response.json();
};