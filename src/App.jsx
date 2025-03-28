import { useState, useEffect } from "react";
import UpdateItem from "./components/UpdateItem";

// use the following link to get the data
// `/doors` will give you all the doors, to get a specific door use `/doors/1`.
const API_URI = `http://${import.meta.env.VITE_API_URI}/doors`;

function App() {
  const [item, setItem] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch a specific door (using ID 1 as example)
    fetch(`${API_URI}/1`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch door');
        }
        return response.json();
      })
      .then((data) => setItem(data))
      .catch((err) => setError(err.message));
  }, []);

  if (error) return <div>Error: {error}</div>;
  if (!item) return <div>Loading...</div>;

  return <UpdateItem item={item} apiUri={API_URI} />;
}

export default App;
