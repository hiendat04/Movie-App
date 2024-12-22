import { useEffect, useState } from "react";

const DEFAULT_HEADERS = {
  accept: "application/json",
  Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
};
export default function useFetch(
  { url = "", method = "GET", headers = {} },
  { enabled } = { enabled: true },
) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (enabled) {
      setIsLoading(true);
      fetch(`${import.meta.env.VITE_API_HOST}${url}`, {
        method,
        headers: {
          ...DEFAULT_HEADERS,
          ...headers,
        },
      })
        .then(async (res) => {
          const data = await res.json();
          setData(data);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, method, JSON.stringify(headers), enabled]); // If we do not use JSON.stringify for headers variable, useEffect will compare the ADDRESS of the object variable in memory but not the VALUE of it. Therefore, we need to convert it into string so that we can compare the value, avoid infinite API request

  return { data, isLoading };
}
