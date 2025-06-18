// Footer.jsx
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-center py-6 mt-10 border-t dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Student Progress Management System
        </p>
        <div className="flex space-x-4 mt-2 sm:mt-0">
          <a
            href="https://github.com/urpitvrm"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            GitHub
          </a>
          <a href="/docs" className="hover:underline">
            Documentation
          </a>
          <a href="/contact" className="hover:underline">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
