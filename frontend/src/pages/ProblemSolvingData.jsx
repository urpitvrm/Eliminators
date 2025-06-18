// import React from "react";
// import { Bar } from "react-chartjs-2";
// import CalendarHeatmap from "react-calendar-heatmap";
// import "react-calendar-heatmap/dist/styles.css";

// const ProblemSolvingData = ({
//   recentSubs,
//   hardest,
//   avgRating,
//   avgPerDay,
//   pbBuckets,
//   problemDays,
//   setProblemDays,
//   heatmapValues,
// }) => {
//   const barData = {
//     labels: Object.keys(pbBuckets).sort((a, b) => a - b),
//     datasets: [
//       {
//         label: "# solved",
//         data: Object.values(pbBuckets),
//         backgroundColor: "teal",
//       },
//     ],
//   };

//   return (
//     <section className="bg-white p-4 rounded shadow space-y-4">
//       <div className="flex justify-between items-center">
//         <h3 className="text-xl">Problem Solving Data</h3>
//         <select
//           value={problemDays}
//           onChange={(e) => setProblemDays(Number(e.target.value))}
//         >
//           {[7, 30, 90].map((d) => (
//             <option key={d} value={d}>
//               Last {d} days
//             </option>
//           ))}
//         </select>
//       </div>

//       <div className="space-y-2">
//         <p>
//           <strong>Total solved:</strong> {recentSubs.length}
//         </p>
//         <p>
//           <strong>Hardest:</strong> {hardest.name || "N/A"} (
//           {hardest.rating || "––"})
//         </p>
//         <p>
//           <strong>Average rating:</strong> {avgRating}
//         </p>
//         <p>
//           <strong>Avg/day:</strong> {avgPerDay}
//         </p>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
//         <div>
//           <Bar data={barData} />
//         </div>
//         <div>
//           <h4 className="font-semibold">Submission Heatmap</h4>
//           <CalendarHeatmap
//             startDate={new Date(Date.now() - 365 * 86400 * 1000)}
//             endDate={new Date()}
//             values={heatmapValues}
//             showWeekdayLabels
//           />
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ProblemSolvingData;
