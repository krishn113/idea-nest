import React from "react";
import { FaGithub, FaLinkedin , FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full px-6 lg:px-12 text-gray-800">

      {/* Divider */}
      <div className="mt-6 border-t border-gray-300"></div>

      {/* Bottom Section: Copyright and Links */}
      <div className="flex flex-col md:flex-row justify-between items-center mt-4 gap-4">
        <p className="text-gray-600 text-md">
          © 2024 Krishna Agarwal. All rights reserved.
        </p>
        <div className="flex gap-4 mt-2 md:mt-0 text-xl">
        <a
          href="https://www.linkedin.com/in/krishna-agarwal-236b6b271/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedin className="text-gray-800 hover:text-blue-600 transition" />
        </a>
        <a 
          href="mailto:ag.krishna0807@gmail.com"
          target="_blank"
          rel="noopener noreferrer">
            <FaEnvelope className="text-gray-800 hover:text-gray-600 transition" />
          </a>
        <a
          href="https://github.com/krishn113"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithub className="text-gray-800 hover:text-gray-600 transition" />
        </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

