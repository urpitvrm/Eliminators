// import React from "react";
// import { NavLink } from "react-router-dom";

// function Header() {
//   return (
//     <header className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white shadow py-4 px-6">
//       <div className="max-w-7xl mx-auto flex justify-between items-center">
//         {/* <h1 className="text-xl font-bold">Student Progress Management</h1> */}
//         <NavLink
//           to="/"
//           className="text-2xl font-bold"
//         >
//           Student Progress Management
//         </NavLink>
//         <nav className="space-x-4">
//           <NavLink
//             to="/"
//             className={({ isActive }) =>
//               isActive ? "underline font-semibold" : "hover:underline"
//             }
//           >
//             Home
//           </NavLink>
//           {/* <NavLink
//             to="/about"
//             className={({ isActive }) =>
//               isActive ? "underline font-semibold" : "hover:underline"
//             }
//           >
//             About
//           </NavLink> */}
//           <NavLink
//             to="/register"
//             className={({ isActive }) =>
//               isActive ? "underline font-semibold" : "hover:underline"
//             }
//           >
//             Add Student
//           </NavLink>
//         </nav>
//       </div>
//     </header>
//   );
// }

// export default Header;

import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react"; // Optional: you can use any icon set

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white shadow py-4 px-6">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <NavLink to="/" className="text-2xl font-bold">
          Student Progress Management
        </NavLink>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden focus:outline-none"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "underline font-semibold" : "hover:underline"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/register"
            className={({ isActive }) =>
              isActive ? "underline font-semibold" : "hover:underline"
            }
          >
            Add Student
          </NavLink>
        </nav>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden mt-4 space-y-2 px-6">
          <NavLink
            to="/"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              isActive
                ? "block underline font-semibold"
                : "block hover:underline"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/register"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              isActive
                ? "block underline font-semibold"
                : "block hover:underline"
            }
          >
            Add Student
          </NavLink>
        </div>
      )}
    </header>
  );
}

export default Header;
