import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { BeatLoader } from "react-spinners";

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { username } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    setLoading(true)
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const meetingID = formData.get("meetingID") as string;
    const userName = username || formData.get("userName") as string;
    if (meetingID && userName) {
      window.location.href = `/meeting?roomID=${meetingID}&userName=${userName}`;
    }
    setLoading(false) 
  };

  const handleCreateMeeting = () => {
    setLoading(true)
    const meetingID = Math.floor(Math.random() * 10000).toString();
    const userName = username || `userName${Math.floor(Math.random() * 10000)}`;
    navigate(`/meeting?roomID=${meetingID}&userName=${userName}`);
    // toast
    setLoading(false)
  };

  return (
    <div className="min-h-screen  flex flex-col items-center justify-center font-default">
      <main className="md:w-1/2 flex-grow flex flex-col items-center justify-center">
        <div className="bg-white p-8 rounded-lg  w-full max-w-md">
          <h2 className="text-3xl font-bold text-[#008374] mb-6 text-center">Join a Meeting</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md p-3 outline-none focus:ring-1 focus:ring-[#66fdee]"
                placeholder="Enter Meeting ID"
                name="meetingID"
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-[#008374] text-white p-3 rounded-lg outline-none focus:ring-1 focus:ring-[#66fdee]"
            >
              {loading ? <BeatLoader loading={loading} /> : "Join Meeting"}
            </button>
          </form>
          <div className="mt-4 text-center">
            <button
              onClick={handleCreateMeeting}
              className="w-full bg-gray-500 text-white p-3 rounded-lg shadow-sm hover:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-[#66fdee]"
            >
              {loading ? <BeatLoader loading={loading} /> : "Create New Meeting"}
            </button>
          </div>
        </div>
      </main>
      <footer className="bg-gray-800 w-full py-4 text-center text-white">
        &copy; 2025 DATAIDEA Meet. All rights reserved.
      </footer>
    </div>
  );
};

export default HomePage;
