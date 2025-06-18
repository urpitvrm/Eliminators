// import React, { useState, useEffect, useMemo } from "react";
// import Layout from "../Layout/Layout";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   BarElement,
//   ArcElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import { Bar, Line } from "react-chartjs-2";
// import CalendarHeatmap from "react-calendar-heatmap";
// import "react-calendar-heatmap/dist/styles.css";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   BarElement,
//   ArcElement,
//   Title,
//   Tooltip,
//   Legend
// );

// function StudentDetails() {
//   const { id } = useParams();
//   const [details, setDetails] = useState(null);
//   const [cfData, setCfData] = useState(null);
//   const [problemDays, setProblemDays] = useState(30);
//   const [contestDays, setContestDays] = useState(90);

//   const loadData = async (studentId) => {
//     try {
//       console.log("first student", studentId);
//       const { data: student } = await axios.get(
//         `http://localhost:5000/api/students/${studentId}`
//       );
//       setDetails(student);
//       console.log("k1", student);

//       const cfRes = await axios.get(
//         `http://localhost:5000/api/codeforces-data?studentId=${student._id}`
//       );

//       if (cfRes.data.length > 0) {
//         setCfData(cfRes.data[0]);
//       }
//     } catch (err) {
//       console.error("Error fetching student or CF data:", err);
//     }
//   };

//   console.log("k", cfData);
//   useEffect(() => {
//     loadData(id);
//   }, [id]);

//   const subs = cfData?.submissions || [];
//   const contests = cfData?.contests || [];

//   const recentSubs = useMemo(() => {
//     const since = Date.now() - problemDays * 86400 * 1000;
//     return subs.filter(
//       (s) => s.verdict === "OK" && s.creationTimeSeconds * 1000 >= since
//     );
//   }, [subs, problemDays]);

//   const totalSolved = recentSubs.length;

//   const hardest = recentSubs.reduce((max, s) => {
//     const points = s.problem?.points || 0;
//     return points > (max?.points || 0) ? s.problem : max;
//   }, null);

//   const avgRating = (
//     recentSubs.reduce((sum, s) => sum + (s.problem?.points || 0), 0) /
//     Math.max(totalSolved, 1)
//   ).toFixed(1);

//   const avgPerDay = (totalSolved / problemDays).toFixed(2);

//   const ratingBuckets = useMemo(() => {
//     const buckets = {};
//     recentSubs.forEach((s) => {
//       const rating = Math.floor((s.problem?.points || 0) / 500) * 500;
//       buckets[rating] = (buckets[rating] || 0) + 1;
//     });
//     return buckets;
//   }, [recentSubs]);

//   const barData = {
//     labels: Object.keys(ratingBuckets).sort((a, b) => a - b),
//     datasets: [
//       {
//         label: "# Solved",
//         data: Object.values(ratingBuckets),
//         backgroundColor: "teal",
//       },
//     ],
//   };

//   const recentContests = useMemo(() => {
//     const since = Date.now() - contestDays * 86400 * 1000;
//     return contests.filter((c) => c.ratingUpdateTimeSeconds * 1000 >= since);
//   }, [contests, contestDays]);

//   const lineData = {
//     labels: recentContests.map((c) =>
//       new Date(c.ratingUpdateTimeSeconds * 1000).toLocaleDateString()
//     ),
//     datasets: [
//       {
//         label: "Rating",
//         data: recentContests.map((c) => c.newRating),
//         borderColor: "blue",
//         fill: false,
//       },
//     ],
//   };

//   const heatmapValues = useMemo(() => {
//     const map = new Map();
//     subs.forEach((s) => {
//       if (s.verdict !== "OK") return;
//       const date = new Date(s.creationTimeSeconds * 1000)
//         .toISOString()
//         .slice(0, 10);
//       map.set(date, (map.get(date) || 0) + 1);
//     });
//     return Array.from(map.entries()).map(([date, count]) => ({ date, count }));
//   }, [subs]);

//   if (!details || !cfData) return <Layout>Loading...</Layout>;

//   return (
//     <Layout>
//       <div className="p-6 space-y-10">
//         <h1 className="text-3xl font-bold">{details.name}'s Dashboard</h1>

//         <section className="bg-white p-4 rounded shadow space-y-4">
//           <div className="flex justify-between items-center">
//             <h2 className="text-xl font-semibold">Problem Solving Stats</h2>
//             <select
//               value={problemDays}
//               onChange={(e) => setProblemDays(Number(e.target.value))}
//             >
//               {[7, 30, 90].map((d) => (
//                 <option key={d} value={d}>
//                   Last {d} days
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div>
//             CF Handle: {cfData.handle}{" "}
//             <a
//               href={`https://codeforces.com/profile/${cfData.handle}`}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-blue-600 underline hover:text-blue-800"
//             >
//               Visit Profile
//             </a>
//           </div>

//           <p>Total Solved: {totalSolved}</p>
//           <p>
//             Hardest Problem: {hardest?.name || "N/A"} ({hardest?.points || "—"})
//           </p>
//           <p>Average Rating: {avgRating}</p>
//           <p>Average per Day: {avgPerDay}</p>

//           <Bar data={barData} />
//           <CalendarHeatmap
//             startDate={new Date(Date.now() - 365 * 86400 * 1000)}
//             endDate={new Date()}
//             values={heatmapValues}
//             showWeekdayLabels
//           />
//         </section>

//         <section className="bg-white p-4 rounded shadow space-y-4">
//           <div className="flex justify-between items-center">
//             <h2 className="text-xl font-semibold">Contest Performance</h2>
//             <select
//               value={contestDays}
//               onChange={(e) => setContestDays(Number(e.target.value))}
//             >
//               {[30, 90, 365].map((d) => (
//                 <option key={d} value={d}>
//                   Last {d} days
//                 </option>
//               ))}
//             </select>
//           </div>
//           <Line data={lineData} />
//           <table className="w-full mt-4 text-left">
//             <thead>
//               <tr>
//                 <th>Date</th>
//                 <th>Contest</th>
//                 <th>Old → New</th>
//                 <th>Rank</th>
//               </tr>
//             </thead>
//             <tbody>
//               {recentContests.map((c) => (
//                 <tr key={c.contestId}>
//                   <td>
//                     {new Date(
//                       c.ratingUpdateTimeSeconds * 1000
//                     ).toLocaleDateString()}
//                   </td>
//                   <td>{c.contestName}</td>
//                   <td>
//                     {c.oldRating} → {c.newRating}
//                   </td>
//                   <td>{c.rank}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </section>
//       </div>
//     </Layout>
//   );
// }

// export default StudentDetails;

// // import React, { useState, useEffect, useMemo } from "react";
// // import Layout from "../Layout/Layout";
// // import { useParams } from "react-router-dom";
// // import axios from "axios";
// // import {
// //   Chart as ChartJS,
// //   CategoryScale,
// //   LinearScale,
// //   PointElement,
// //   LineElement,
// //   BarElement,
// //   ArcElement,
// //   Title,
// //   Tooltip,
// //   Legend,
// // } from "chart.js";
// // import { Bar, Line } from "react-chartjs-2";
// // import CalendarHeatmap from "react-calendar-heatmap";
// // import "react-calendar-heatmap/dist/styles.css";

// // ChartJS.register(
// //   CategoryScale,
// //   LinearScale,
// //   PointElement,
// //   LineElement,
// //   BarElement,
// //   ArcElement,
// //   Title,
// //   Tooltip,
// //   Legend
// // );

// // function StudentDetails() {
// //   const { id } = useParams();
// //   const [details, setDetails] = useState(null);
// //   const [cfData, setCfData] = useState(null);
// //   const [problemDays, setProblemDays] = useState(30);
// //   const [contestDays, setContestDays] = useState(90);

// //   const loadData = async (studentId) => {
// //     try {
// //       const { data: student } = await axios.get(`/api/students/${studentId}`);
// //       setDetails(student);

// //       const cfRes = await axios.get(
// //         `/api/codeforces-data?studentId=${student._id}`
// //       );
// //       if (cfRes.data.length > 0) setCfData(cfRes.data[0]);
// //     } catch (err) {
// //       console.error("Error fetching student or CF data:", err);
// //     }
// //   };

// //   useEffect(() => {
// //     loadData(id);
// //   }, [id]);

// //   const toggleReminder = async () => {
// //     try {
// //       const res = await axios.patch(`/api/students/${id}/reminder`, {
// //         disable: !details.autoReminderDisabled,
// //       });
// //       setDetails((prev) => ({
// //         ...prev,
// //         autoReminderDisabled: res.data.autoReminderDisabled,
// //       }));
// //     } catch (err) {
// //       console.error("Error toggling reminder:", err);
// //     }
// //   };

// //   const subs = cfData?.submissions || [];
// //   const contests = cfData?.contests || [];

// //   const recentSubs = useMemo(() => {
// //     const since = Date.now() - problemDays * 86400 * 1000;
// //     return subs.filter(
// //       (s) => s.verdict === "OK" && s.creationTimeSeconds * 1000 >= since
// //     );
// //   }, [subs, problemDays]);

// //   const totalSolved = recentSubs.length;

// //   const hardest = recentSubs.reduce((max, s) => {
// //     const points = s.problem?.points || 0;
// //     return points > (max?.points || 0) ? s.problem : max;
// //   }, null);

// //   const avgRating = (
// //     recentSubs.reduce((sum, s) => sum + (s.problem?.points || 0), 0) /
// //     Math.max(totalSolved, 1)
// //   ).toFixed(1);

// //   const avgPerDay = (totalSolved / problemDays).toFixed(2);

// //   const ratingBuckets = useMemo(() => {
// //     const buckets = {};
// //     recentSubs.forEach((s) => {
// //       const rating = Math.floor((s.problem?.points || 0) / 500) * 500;
// //       buckets[rating] = (buckets[rating] || 0) + 1;
// //     });
// //     return buckets;
// //   }, [recentSubs]);

// //   const barData = {
// //     labels: Object.keys(ratingBuckets).sort((a, b) => a - b),
// //     datasets: [
// //       {
// //         label: "# Solved",
// //         data: Object.values(ratingBuckets),
// //         backgroundColor: "teal",
// //       },
// //     ],
// //   };

// //   const recentContests = useMemo(() => {
// //     const since = Date.now() - contestDays * 86400 * 1000;
// //     return contests.filter((c) => c.ratingUpdateTimeSeconds * 1000 >= since);
// //   }, [contests, contestDays]);

// //   const lineData = {
// //     labels: recentContests.map((c) =>
// //       new Date(c.ratingUpdateTimeSeconds * 1000).toLocaleDateString()
// //     ),
// //     datasets: [
// //       {
// //         label: "Rating",
// //         data: recentContests.map((c) => c.newRating),
// //         borderColor: "blue",
// //         fill: false,
// //       },
// //     ],
// //   };

// //   const heatmapValues = useMemo(() => {
// //     const map = new Map();
// //     subs.forEach((s) => {
// //       if (s.verdict !== "OK") return;
// //       const date = new Date(s.creationTimeSeconds * 1000)
// //         .toISOString()
// //         .slice(0, 10);
// //       map.set(date, (map.get(date) || 0) + 1);
// //     });
// //     return Array.from(map.entries()).map(([date, count]) => ({ date, count }));
// //   }, [subs]);

// //   if (!details || !cfData) return <Layout>Loading...</Layout>;

// //   return (
// //     <Layout>
// //       <div className="p-6 space-y-10">
// //         <h1 className="text-3xl font-bold">{details.name}'s Dashboard</h1>

// //         <section className="bg-white p-4 rounded shadow space-y-4">
// //           <div className="flex justify-between items-center">
// //             <h2 className="text-xl font-semibold">Problem Solving Stats</h2>
// //             <select
// //               value={problemDays}
// //               onChange={(e) => setProblemDays(Number(e.target.value))}
// //             >
// //               {[7, 30, 90].map((d) => (
// //                 <option key={d} value={d}>
// //                   Last {d} days
// //                 </option>
// //               ))}
// //             </select>
// //           </div>

// //           <div>
// //             CF Handle: {cfData.handle}{" "}
// //             <a
// //               href={`https://codeforces.com/profile/${cfData.handle}`}
// //               target="_blank"
// //               rel="noopener noreferrer"
// //               className="text-blue-600 underline hover:text-blue-800"
// //             >
// //               Visit Profile
// //             </a>
// //           </div>

// //           <p>Total Solved: {totalSolved}</p>
// //           <p>
// //             Hardest Problem: {hardest?.name || "N/A"} ({hardest?.points || "—"})
// //           </p>
// //           <p>Average Rating: {avgRating}</p>
// //           <p>Average per Day: {avgPerDay}</p>

// //           <Bar data={barData} />
// //           <CalendarHeatmap
// //             startDate={new Date(Date.now() - 365 * 86400 * 1000)}
// //             endDate={new Date()}
// //             values={heatmapValues}
// //             showWeekdayLabels
// //           />
// //         </section>

// //         <section className="bg-white p-4 rounded shadow space-y-4">
// //           <div className="flex justify-between items-center">
// //             <h2 className="text-xl font-semibold">Contest Performance</h2>
// //             <select
// //               value={contestDays}
// //               onChange={(e) => setContestDays(Number(e.target.value))}
// //             >
// //               {[30, 90, 365].map((d) => (
// //                 <option key={d} value={d}>
// //                   Last {d} days
// //                 </option>
// //               ))}
// //             </select>
// //           </div>
// //           <Line data={lineData} />
// //           <table className="w-full mt-4 text-left">
// //             <thead>
// //               <tr>
// //                 <th>Date</th>
// //                 <th>Contest</th>
// //                 <th>Old → New</th>
// //                 <th>Rank</th>
// //               </tr>
// //             </thead>
// //             <tbody>
// //               {recentContests.map((c) => (
// //                 <tr key={c.contestId}>
// //                   <td>
// //                     {new Date(
// //                       c.ratingUpdateTimeSeconds * 1000
// //                     ).toLocaleDateString()}
// //                   </td>
// //                   <td>{c.contestName}</td>
// //                   <td>
// //                     {c.oldRating} → {c.newRating}
// //                   </td>
// //                   <td>{c.rank}</td>
// //                 </tr>
// //               ))}
// //             </tbody>
// //           </table>
// //         </section>

// //         {/* Reminder Section */}
// //         <section className="bg-white p-4 rounded shadow space-y-2">
// //           <h2 className="text-xl font-semibold">Reminder Settings</h2>
// //           <p>Reminders Sent: {details.reminderCount}</p>
// //           <button
// //             onClick={toggleReminder}
// //             className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
// //           >
// //             {details.autoReminderDisabled ? "Enable" : "Disable"} Reminders
// //           </button>
// //         </section>
// //       </div>
// //     </Layout>
// //   );
// // }

// // export default StudentDetails;
import React, { useState, useEffect, useMemo } from "react";
import Layout from "../Layout/Layout";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

function StudentDetails() {
  const { id } = useParams();
  const [details, setDetails] = useState(null);
  const [cfData, setCfData] = useState(null);
  const [problemDays, setProblemDays] = useState(30);
  const [contestDays, setContestDays] = useState(90);

  const loadData = async (studentId) => {
    try {
      const { data: student } = await axios.get(
        `http://localhost:5000/api/students/${studentId}`
      );
      setDetails(student);

      const cfRes = await axios.get(
        `http://localhost:5000/api/codeforces-data?studentId=${student._id}`
      );

      if (cfRes.data.length > 0) {
        setCfData(cfRes.data[0]);
      }
    } catch (err) {
      console.error("Error fetching student or CF data:", err);
    }
  };

  // const toggleReminder = async () => {
  //   try {
  //     const res = await axios.patch(
  //       `http://localhost:5000/api/students/${id}/reminder`,
  //       {
  //         disable: !details.autoReminderDisabled,
  //       }
  //     );
  //     setDetails((prev) => ({
  //       ...prev,
  //       autoReminderDisabled: res.data.autoReminderDisabled,
  //     }));
  //   } catch (err) {
  //     console.error("Failed to toggle reminder", err);
  //   }
  // };

  useEffect(() => {
    loadData(id);
  }, [id]);

  const subs = cfData?.submissions || [];
  const contests = cfData?.contests || [];

  const recentSubs = useMemo(() => {
    const since = Date.now() - problemDays * 86400 * 1000;
    return subs.filter(
      (s) => s.verdict === "OK" && s.creationTimeSeconds * 1000 >= since
    );
  }, [subs, problemDays]);

  const totalSolved = recentSubs.length;

  const hardest = recentSubs.reduce((max, s) => {
    const points = s.problem?.points || 0;
    return points > (max?.points || 0) ? s.problem : max;
  }, null);

  const avgRating = (
    recentSubs.reduce((sum, s) => sum + (s.problem?.points || 0), 0) /
    Math.max(totalSolved, 1)
  ).toFixed(1);

  const avgPerDay = (totalSolved / problemDays).toFixed(2);

  const ratingBuckets = useMemo(() => {
    const buckets = {};
    recentSubs.forEach((s) => {
      const rating = Math.floor((s.problem?.points || 0) / 500) * 500;
      buckets[rating] = (buckets[rating] || 0) + 1;
    });
    return buckets;
  }, [recentSubs]);

  const barData = {
    labels: Object.keys(ratingBuckets).sort((a, b) => a - b),
    datasets: [
      {
        label: "# Solved",
        data: Object.values(ratingBuckets),
        backgroundColor: "teal",
      },
    ],
  };

  const recentContests = useMemo(() => {
    const since = Date.now() - contestDays * 86400 * 1000;
    return contests.filter((c) => c.ratingUpdateTimeSeconds * 1000 >= since);
  }, [contests, contestDays]);

  const lineData = {
    labels: recentContests.map((c) =>
      new Date(c.ratingUpdateTimeSeconds * 1000).toLocaleDateString()
    ),
    datasets: [
      {
        label: "Rating",
        data: recentContests.map((c) => c.newRating),
        borderColor: "blue",
        fill: false,
      },
    ],
  };

  const heatmapValues = useMemo(() => {
    const map = new Map();
    subs.forEach((s) => {
      if (s.verdict !== "OK") return;
      const date = new Date(s.creationTimeSeconds * 1000)
        .toISOString()
        .slice(0, 10);
      map.set(date, (map.get(date) || 0) + 1);
    });
    return Array.from(map.entries()).map(([date, count]) => ({ date, count }));
  }, [subs]);

  if (!details || !cfData) return <Layout>Loading...</Layout>;

  return (
    <Layout>
      <div className="p-6 space-y-10">
        <h1 className="text-3xl font-bold">{details.name}'s Dashboard</h1>

        <section className="bg-white p-4 rounded shadow space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Problem Solving Stats</h2>
            <select
              value={problemDays}
              onChange={(e) => setProblemDays(Number(e.target.value))}
            >
              {[7, 30, 90].map((d) => (
                <option key={d} value={d}>
                  Last {d} days
                </option>
              ))}
            </select>
          </div>

          <div>
            CF Handle: {cfData.handle}{" "}
            <a
              href={`https://codeforces.com/profile/${cfData.handle}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline hover:text-blue-800"
            >
              Visit Profile
            </a>
          </div>

          <p>Total Solved: {totalSolved}</p>
          <p>
            Hardest Problem: {hardest?.name || "N/A"} ({hardest?.points || "—"})
          </p>
          <p>Average Rating: {avgRating}</p>
          <p>Average per Day: {avgPerDay}</p>

          <Bar data={barData} />
          <CalendarHeatmap
            startDate={new Date(Date.now() - 365 * 86400 * 1000)}
            endDate={new Date()}
            values={heatmapValues}
            showWeekdayLabels
          />

          {/* Reminder Toggle Section
          <div className="mt-4 bg-gray-100 p-4 rounded">
            <p>
              <strong>Reminders Sent:</strong> {details.reminderCount || 0}
            </p>
            <button
              onClick={toggleReminder}
              className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              {details.autoReminderDisabled ? "Enable" : "Disable"} Reminders
            </button>
          </div> */}


        </section>

        <section className="bg-white p-4 rounded shadow space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Contest Performance</h2>
            <select
              value={contestDays}
              onChange={(e) => setContestDays(Number(e.target.value))}
            >
              {[30, 90, 365].map((d) => (
                <option key={d} value={d}>
                  Last {d} days
                </option>
              ))}
            </select>
          </div>

          <Line data={lineData} />

          <table className="w-full mt-4 text-left">
            <thead>
              <tr>
                <th>Date</th>
                <th>Contest</th>
                <th>Old → New</th>
                <th>Rank</th>
              </tr>
            </thead>
            <tbody>
              {recentContests.map((c) => (
                <tr key={c.contestId}>
                  <td>
                    {new Date(
                      c.ratingUpdateTimeSeconds * 1000
                    ).toLocaleDateString()}
                  </td>
                  <td>{c.contestName}</td>
                  <td>
                    {c.oldRating} → {c.newRating}
                  </td>
                  <td>{c.rank}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </Layout>
  );
}

export default StudentDetails;
