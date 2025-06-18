

import React, { useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import { useParams } from "react-router-dom";
import axios from "axios";

function UpdateStudent() {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [cfhandle, setCfhandle] = useState("");

  const loadData = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/students/${id}`
      );
      setName(data.name);
      setEmail(data.email);
      setMobile(data.mobile);
      setCfhandle(data.codeforcesHandle); // assuming `handle` is the field name
    } catch (err) {
      console.error("Error fetching student data:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/students/${id}`, {
        name,
        email,
        mobile,
        codeforcesHandle: cfhandle,
      });
      alert("Student updated successfully.");
    } catch (err) {
      console.error("Error updating student:", err);
      alert("Update failed.");
    }
  };

  useEffect(() => {
    if (id) loadData();
  }, [id]);

  return (
    <Layout>
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-4">Update Student</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            className="border p-2 w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            className="border p-2 w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            placeholder="Mobile"
            className="border p-2 w-full"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />
          <input
            type="text"
            placeholder="Codeforces Handle"
            className="border p-2 w-full"
            value={cfhandle}
            onChange={(e) => setCfhandle(e.target.value)}
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Update
          </button>
        </form>
      </div>
    </Layout>
  );
}

export default UpdateStudent;
