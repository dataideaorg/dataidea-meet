import React, { useState } from "react";
import { login } from "../api/Auth";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { BeatLoader } from "../components/Spinners";

const Login: React.FC = () => {
  const [username, setLocalUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    setLoading(true);
    e.preventDefault();
    try {
      const data = await login({ username, password });
      // Save the tokens (you can use localStorage, cookies, or Context API)
      localStorage.setItem("access_token", data.access);
      localStorage.setItem("refresh_token", data.refresh);
      localStorage.setItem("username", data.username);
      // setLoading(false)
      //   redirect home
      toast.success("Login successful");
      // Move the redirect after a short delay
      setTimeout(() => {
        window.location.href = "/";
      }, 1000); // Wait 1 second for the toast to show
    } catch (err: any) {
      setLoading(false);
      toast.error(err.message);
      setError(err.message);
    }
  };

  return (
    <div className="font-default md:w-1/2 m-auto p-3">
      <h2 className="text-3xl font-bold text-[#008374] mb-6 text-center">
        Welcome back, Login
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setLocalUsername(e.target.value)}
          required
          className="border border-gray-300 rounded-md p-3"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="border border-gray-300 rounded-md p-3"
        />
        <button
          type="submit"
          className="bg-[#008374] text-white p-3 rounded-lg"
        >
          {loading ? <BeatLoader loading={loading} /> : "Login"}
        </button>
      </form>
      {error && <p className="text-red-500 underline p-3">{error}</p>}
      <p className="text-center mt-3">
        Don't have an account?{" "}
        <Link to="/register" className="text-[#008374] underline">
          Register
        </Link>
      </p>
    </div>
  );
};

export default Login;