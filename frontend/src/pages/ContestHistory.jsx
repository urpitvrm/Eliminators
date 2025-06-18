// import React from "react";
// import { Line } from "react-chartjs-2";

// const ContestHistory = ({ recentContests, contestDays, setContestDays }) => {
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

//   return (
//     <section className="bg-white p-4 rounded shadow space-y-4">
//       <div className="flex justify-between items-center">
//         <h3 className="text-xl">Contest History</h3>
//         <select
//           value={contestDays}
//           onChange={(e) => setContestDays(Number(e.target.value))}
//         >
//           {[30, 90, 365].map((d) => (
//             <option key={d} value={d}>
//               Last {d} days
//             </option>
//           ))}
//         </select>
//       </div>
//       <Line data={lineData} />
//       <table className="w-full text-left mt-4">
//         <thead>
//           <tr>
//             <th>Date</th>
//             <th>Contest</th>
//             <th>Old → New</th>
//             <th>Rank</th>
//             <th>Unsolved</th>
//           </tr>
//         </thead>
//         <tbody>
//           {recentContests.map((c) => (
//             <tr key={c.contestId}>
//               <td>
//                 {new Date(
//                   c.ratingUpdateTimeSeconds * 1000
//                 ).toLocaleDateString()}
//               </td>
//               <td>{c.contestName}</td>
//               <td>
//                 {c.oldRating} → {c.newRating}
//               </td>
//               <td>{c.rank}</td>
//               <td>—</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </section>
//   );
// };

// export default ContestHistory;
