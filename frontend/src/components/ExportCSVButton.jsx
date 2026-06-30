import React from "react";
import API_BASE_URL from "../config/api";

const ExportCSVButton = () => {
  const handleDownload = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/students/export/csv`);
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "students.csv";
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (err) {
      alert("Failed to download CSV");
    }
  };

  return (
    <button
      onClick={handleDownload}
      className="bg-blue-600 text-white px-4 py-2 rounded"
    >
      Download CSV
    </button>
  );
};

export default ExportCSVButton;
