import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const AdminPage = ({ token, isAdmin }) => {
  if (!isAdmin) {
    return <div>Error - unauthorized</div>;
  }

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
      .get("/admin", config)
      .then((res) => setData(res.data))
      .catch((err) => console.error(err));
  }, []);

  return data ? (
    <div className="mt-4">
      <div className="bg-black text-white font-bold py-2 px-4 rounded">
        Admin
      </div>
      <h3>{data}</h3>
    </div>
  ) : (
    <div className="mt-4">No data</div>
  );
};

export default AdminPage;
