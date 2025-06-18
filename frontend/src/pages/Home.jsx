
import React, { useState, useEffect } from "react";
import Layout from "../Layout/Layout";
import Table from "./Table";
import axios from "axios";
import UpdateCronTime from "./UpdateCronTime";
import ExportCSVButton from "../components/ExportCSVButton";

function Home() {
  const [students, setStudents] = useState([]);

  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/codeforces-data"
      );

      // Ensure data is an array
      
      const list = Array.isArray(data) ? data : data.data || [];
      // console.log("12", list[0])
      const formatted = list.map((entry) => {
        // console.log(entry)
        const student = entry.student || {};
        
        return {
          _id: student._id ||  "unknown",
          cf_id:entry._id ||"kk",
          name: student.name || "N/A",
          email: student.email || "N/A",
          mobile: entry.mobile || "N/A",
          handle: entry.handle || "N/A",
          currentRating: entry.rating ?? "N/A",
          maxRating: entry.maxRating ?? "N/A",
          lastUpdated: entry.lastUpdated
            ? new Date(entry.lastUpdated).toLocaleString()
            : "N/A",
          reminderCount: entry.reminderCount,
          disable: entry.autoReminderDisabled==false?(0):(1) ||"kk",
        };
      });
      

      setStudents(formatted);
      

    } catch (err) {
      console.error("Fetch error:", err.message);
      setStudents([]); // fallback empty
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  // console.log("first", students);

  return (
    <Layout>
      <div className="bg-white p-4 rounded-lg shadow-md mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <h1 className="text-2xl font-bold text-gray-800">All Students</h1>
          <UpdateCronTime />
        </div>
        <ExportCSVButton />
      </div>

      <div className="bg-white p-4 rounded-lg shadow-md">
        <Table students={students} />
      </div>
    </Layout>
  );
  
  
  
}

export default Home;
