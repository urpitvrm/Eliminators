import React, { useState } from "react";
import axios from "axios";
import Layout from "../Layout/Layout";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    
    codeforcesHandle: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await axios.post(
        "http://localhost:5000/api/students/register",
        formData
      );

      setMessage("Registered successfully!");
      setFormData({
        name: "",
        email: "",
        mobile: "",
        codeforcesHandle: "",
      });
    } catch (err) {
      console.log("Error:", err.response?.data || err.message);
      setMessage(
        "Registration failed: " + (err.response?.data?.error || err.message)
      );
    }
  };

  return (
    <Layout>
      <div className="max-w-md mx-auto mt-10 bg-white shadow-md p-6 rounded-md">
        <h2 className="text-2xl font-semibold mb-4 text-center">Register</h2>
        {message && (
          <p className="text-center text-sm text-red-500 mb-2">{message}</p>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
            required
          />
          <input
            type="text"
            name="mobile"
            placeholder="Mobile Number"
            value={formData.mobile}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
            required
          />
          {/* <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
            required
          /> */}
          <input
            type="text"
            name="codeforcesHandle"
            placeholder="Codeforces Handle"
            value={formData.codeforcesHandle}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Register
          </button>
        </form>
      </div>
    </Layout>
  );
}

export default Register;
