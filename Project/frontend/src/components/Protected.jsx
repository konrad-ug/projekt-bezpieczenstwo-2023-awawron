import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const Protected = ({ token }) => {
  const isRun = useRef(false);

  const [data, setData] = useState(null);

  useEffect(() => {
    if (isRun.current) return;

    isRun.current = true;

    const config = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };

    axios
      .get("/data", config)
      .then((res) => setData(res.data))
      .catch((err) => console.error(err));
  }, []);

  return data ? (
    <div className="mt-4">
      <div className="bg-red-500 text-white font-bold py-2 px-4 rounded">
        Protected
      </div>
      {data.map((rec, i) => (
        <h3 key={i} className="text-xl">
          {rec}
        </h3>
      ))}
    </div>
  ) : (
    <div className="mt-4">No data</div>
  );
};

export default Protected;
