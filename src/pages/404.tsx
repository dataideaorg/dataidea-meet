import React from "react";
import { Link } from "react-router-dom";
// import NotFoundImage from "../assets/404.png";

const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800 font-default">
      <h1 className="text-6xl font-bold text-[#008374]">404</h1>
      <p className="text-2xl mt-4 font-semibold">Page Not Found</p>
      <p className="text-gray-600 mt-2 text-center max-w-md">
        Oops! The page you are looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="mt-6 px-6 py-3 bg-[#008374] text-white font-medium rounded-md shadow hover:bg-[#006a5c] transition-all"
      >
        Go Back Home
      </Link>
      <div className="mt-10">
        <img
          src="https://via.placeholder.com/400x300" // Replace with your 404 illustration/image URL
          alt="404 Illustration"
          className="rounded-md shadow-lg"
        />
      </div>
    </div>
  );
};

export default NotFound;