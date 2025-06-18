import React, { useEffect, useState } from "react";
import axios from "axios";

const timeOptions = [
  { label: "12:00 AM", cronTime: "0 0 * * *" },
  { label: "1:00 AM", cronTime: "0 1 * * *" },
  { label: "2:00 AM", cronTime: "0 2 * * *" },
  { label: "3:00 AM", cronTime: "0 3 * * *" },
  { label: "4:00 AM", cronTime: "0 4 * * *" },
  { label: "5:00 AM", cronTime: "0 5 * * *" },
  { label: "6:00 AM", cronTime: "0 6 * * *" },
  { label: "7:00 AM", cronTime: "0 7 * * *" },
  { label: "8:00 AM", cronTime: "0 8 * * *" },
  { label: "9:00 AM", cronTime: "0 9 * * *" },
  { label: "10:00 AM", cronTime: "0 10 * * *" },
  { label: "11:00 AM", cronTime: "0 11 * * *" },
  { label: "12:00 PM", cronTime: "0 12 * * *" },
  { label: "1:00 PM", cronTime: "0 13 * * *" },
  { label: "2:00 PM", cronTime: "0 14 * * *" },
  { label: "3:00 PM", cronTime: "0 15 * * *" },
  { label: "4:00 PM", cronTime: "0 16 * * *" },
  { label: "5:00 PM", cronTime: "0 17 * * *" },
  { label: "6:00 PM", cronTime: "0 18 * * *" },
  { label: "7:00 PM", cronTime: "0 19 * * *" },
  { label: "8:00 PM", cronTime: "0 20 * * *" },
  { label: "9:00 PM", cronTime: "0 21 * * *" },
  { label: "10:00 PM", cronTime: "0 22 * * *" },
  { label: "11:00 PM", cronTime: "0 23 * * *" },
];

function UpdateCronTime() {
  const [selectedTime, setSelectedTime] = useState("0 0 * * *");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("cronTime");
    if (saved) setSelectedTime(saved);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        "http://localhost:5000/api/cron/update-cron",
        {
          cronTime: selectedTime,
        }
      );
      localStorage.setItem("cronTime", selectedTime);
      setMessage(res.data.message);
    } catch (error) {
      setMessage("Failed to update cron time");
    }
  };

  return (
    <div >
      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row items-center gap-4"
      >
        {/* <h2 className="text-sm font-semibold whitespace-nowrap">
          Update Cron Time
        </h2> */}
        <select
          className="p-2 border rounded w-full sm:w-auto"
          value={selectedTime}
          onChange={(e) => setSelectedTime(e.target.value)}
        >
          {timeOptions.map((option) => (
            <option key={option.cronTime} value={option.cronTime}>
              {option.label}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 whitespace-nowrap"
        >
          Update Cron
        </button>
      </form>
      {message && <p className="mt-4 text-green-700">{message}</p>}
    </div>
  );
}

export default UpdateCronTime;
