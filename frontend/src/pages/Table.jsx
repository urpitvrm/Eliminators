import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

function Table({ students }) {
  const navigate = useNavigate();

  const handleView = (id) => navigate(`/student/${id}`);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/students/${id}`);
      window.location.reload();
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  const handleEdit = (id) => navigate(`/update/${id}`);

  const handleToggleReminder = async (cf_id, current) => {
    try {
      await axios.put(`http://localhost:5000/api/toggle/${cf_id}`);
      window.location.reload();
    } catch (err) {
      console.error("Toggle failed", err);
    }
  };

  return (
    <div className="p-4">
      {students.length === 0 ? (
        <div className="text-center text-gray-500">Loading...</div>
      ) : (
        <>
          {/* Desktop Table View */}
          <div className="hidden md:block overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow text-sm">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="px-4 py-2 text-left">Name</th>
                  <th className="px-4 py-2 text-left">Email</th>
                  <th className="px-4 py-2 text-left">Phone</th>
                  <th className="px-4 py-2 text-left">Handle</th>
                  <th className="px-4 py-2 text-left">Current</th>
                  <th className="px-4 py-2 text-left">Max</th>
                  {/* <th className="px-4 py-2 text-left">Updated</th> */}
                  <th className="px-4 py-2 text-left">Reminders</th>
                  <th className="px-4 py-2 text-left">Reminder</th>
                  <th className="px-4 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr
                    key={student._id}
                    className="border-t hover:bg-gray-50 text-gray-800"
                  >
                    <td className="px-4 py-2">{student.name}</td>
                    <td className="px-4 py-2">{student.email}</td>
                    <td className="px-4 py-2">{student.mobile}</td>
                    <td className="px-4 py-2">
                      <a
                        href={`https://codeforces.com/profile/${student.handle}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline"
                      >
                        {student.handle}
                      </a>
                    </td>
                    <td className="px-4 py-2">{student.currentRating}</td>
                    <td className="px-4 py-2">{student.maxRating}</td>
                    {/* <td className="px-4 py-2">
                      {student.lastUpdated?.slice(0, 10)}
                    </td> */}
                    <td className="px-4 py-2">{student.reminderCount}</td>
                    <td className="px-4 py-2">
                      <select
                        value={student.disable}
                        onChange={() =>
                          handleToggleReminder(student.cf_id, student.disable)
                        }
                        className="border rounded px-2 py-1"
                      >
                        <option value={0}>ON</option>
                        <option value={1}>OFF</option>
                      </select>
                    </td>
                    <td className="px-4 py-2 space-x-1">
                      <button
                        onClick={() => handleView(student._id)}
                        className="bg-blue-500 text-white px-2 py-1 rounded text-xs"
                      >
                        View
                      </button>
                      <button
                        onClick={() => handleEdit(student._id)}
                        className="bg-green-500 text-white px-2 py-1 rounded text-xs"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(student._id)}
                        className="bg-red-500 text-white px-2 py-1 rounded text-xs"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile & Tablet View */}
          <div className="block md:hidden mt-4 space-y-4">
            {students.map((student) => (
              <div
                key={student._id}
                className="bg-white border border-gray-200 rounded-lg shadow p-4 text-sm"
              >
                <p>
                  <span className="font-medium">Name:</span> {student.name}
                </p>
                <p>
                  <span className="font-medium">Email:</span> {student.email}
                </p>
                <p>
                  <span className="font-medium">Phone:</span> {student.mobile}
                </p>
                <p>
                  <span className="font-medium">Handle:</span>{" "}
                  <a
                    href={`https://codeforces.com/profile/${student.handle}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    {student.handle}
                  </a>
                </p>
                <p>
                  <span className="font-medium">Current Rating:</span>{" "}
                  {student.currentRating}
                </p>
                <p>
                  <span className="font-medium">Max Rating:</span>{" "}
                  {student.maxRating}
                </p>
                {/* <p>
                  <span className="font-medium">Last Updated:</span>{" "}
                  {student.lastUpdated?.slice(0, 10)}
                </p> */}
                <p>
                  <span className="font-medium">Reminders:</span>{" "}
                  {student.reminderCount}
                </p>
                <p>
                  <span className="font-medium">Reminder:</span>{" "}
                  <select
                    value={student.disable}
                    onChange={() =>
                      handleToggleReminder(student.cf_id, student.disable)
                    }
                    className="border rounded px-2 py-1 mt-1"
                  >
                    <option value={0}>ON</option>
                    <option value={1}>OFF</option>
                  </select>
                </p>

                <div className="mt-3 flex flex-wrap gap-2">
                  <button
                    onClick={() => handleView(student._id)}
                    className="bg-blue-500 text-white px-3 py-1 rounded text-xs"
                  >
                    View
                  </button>
                  <button
                    onClick={() => handleEdit(student._id)}
                    className="bg-green-500 text-white px-3 py-1 rounded text-xs"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(student._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded text-xs"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Table;
