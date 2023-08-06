import { useEffect, useState } from "react";

function Notes() {
  const baseurl = `${import.meta.env.VITE_SERVER_URL}/api/notes`;
  const [data, setDate] = useState([]);
  const [loading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await fetch(baseurl);
        if (!response.ok) {
          throw new Error("failed to fetch data");
        } else {
          const data = await response.json();
          setDate(data);
          setIsLoading(false);
        }
      } catch (error) {
        setError("Error while fetch data .try again!");
        setIsLoading(false);
      }
    };
     fetchData()
  }, [baseurl]);

  return <div>

    <pre>
        {JSON.stringify(data,null,2)}
    </pre>
  </div>;
}

export default Notes;
