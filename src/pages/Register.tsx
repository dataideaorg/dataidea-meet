import React, { useState } from "react";
import { register} from "../api/Auth";
import { Link } from "react-router-dom";
import { BeatLoader } from "../components/Spinners";
import { toast } from "react-toastify";

const Register: React.FC = () => {
  const [first_name, SetFirstName] = useState<string>("");
  const [last_name, SetLastName] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await register({ first_name, last_name, username, email, password });
      toast.success("Registration successful");
      // wait for toaster
      setTimeout(() => {
        window.location.href = "/login";
      }, 1000);
    } catch (err: any) {
      setLoading(false)
      toast.error(err.message);
      setError(err.message);
    }
  };

  return (
    <div className="font-default md:w-1/2 m-auto p-3">
      <h2 className="text-3xl font-bold text-[#008374] mb-6 text-center">
        Welcome, Register
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
        <input
          type="text"
          placeholder="First Name"
          value={first_name}
          onChange={(e) => SetFirstName(e.target.value)}
          required
          className="border border-gray-300 rounded-md p-3"
        />
        <input
          type="text"
          placeholder="Last Name"
          value={last_name}
          onChange={(e) => SetLastName(e.target.value)}
          required
          className="border border-gray-300 rounded-md p-3"
        />
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="border border-gray-300 rounded-md p-3"
        />
        {/* add gender */}
        <select
          className="border border-gray-300 rounded-md p-3"
          required
        >
          <option value="">Select Gender</option>
          <option value="M">Male</option>
          <option value="F">Female</option>
          <option value="N">Prefer not to say</option>
        </select>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
          {loading ? <BeatLoader loading={loading} /> : "Register"}
        </button>
      </form>
      {error && <p className="text-red-500 underline p-3">{error}</p>}
      <p className="text-center mt-3">
        Already have an account?{" "}
        <Link to="/login" className="text-[#008374] underline">
          Login
        </Link>
      </p>
    </div>
  );
};

export default Register;