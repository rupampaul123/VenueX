import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


export default function Signup()
{
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneno, setPhoneno] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("user");

    const navigate = useNavigate();

   async function handleSubmit(e)
    {
      e.preventDefault();
      try{
       const res = await fetch('http://localhost:3000/signup',{
            method:'POST',
            credentials: "include",
            headers:{
            "Content-Type": 'application/json'},
            body: JSON.stringify({
                name: name,
                email: email,
                password: password,
                phoneno: Number(phoneno),
                role: role
            })
        });
        const data = await res.json();
      if (res.ok) {
        navigate("/");
      } else {
        alert(data.message || "Signup failed");
      }
    } catch (err) {
      console.error(err);
      alert("Error connecting to server");
    }
    }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-md bg-white rounded-2xl p-8 border border-gray-400">
        

        <h1 className="text-3xl font-bold text-[#2563EB] text-center mb-2">
          Join VenueX
        </h1>
        <p className="text-center text-gray-500 mb-6">
          Find and book the perfect venue for your next event
        </p>


        <form className="space-y-5" onSubmit={handleSubmit}>

          <div>
            <label className="block text-sm font-medium text-[#2563EB] mb-1">
              Full Name
            </label>
            <input
              required
              type="text"
              placeholder="John Doe"
              className="w-full px-4 py-2 border border-gray-300 rounded-xl 
                         focus:outline-none focus:ring-2 focus:ring-[#2563EB] text-[#2563EB]"
              value={name}
              onChange={((e) => setName(e.target.value))}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#2563EB] mb-1">
              Email
            </label>
            <input
              required  
              type="email"
              placeholder="you@example.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-xl 
                         focus:outline-none focus:ring-2 focus:ring-[#2563EB] text-[#2563EB]"
              value={email}
              onChange={((e) => setEmail(e.target.value))}
            />
          </div>

           <div>
            <label className="block text-sm font-medium text-[#2563EB] mb-1">
              Phone Number
            </label>
            <input
              max={9999999999}
              required
              type="number"
              placeholder="+91 ********** "
              className="w-full px-4 py-2 border border-gray-300 rounded-xl 
                         focus:outline-none focus:ring-2 focus:ring-[#2563EB] text-[#2563EB]"
              value={phoneno}
              onChange={((e) => setPhoneno(e.target.value))}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#2563EB] mb-1">
              Password
            </label>
            <input
              required
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-2 border border-gray-300 rounded-xl 
                         focus:outline-none focus:ring-2 focus:ring-[#2563EB] text-[#2563EB]"
              value={password}
              onChange={((e) => setPassword(e.target.value))}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#2563EB] mb-1">
              Role
            </label>
            <select
              required
              placeholder="Choose Your Role"
              className="w-full px-4 py-2 border border-gray-300 rounded-xl 
                         focus:outline-none focus:ring-2 focus:ring-[#2563EB] text-[#2563EB]"
              value={role}
              onChange={((e) => setRole(e.target.value))}
            >
              <option value="user"> Buyer </option>
              <option value="admin"> Admin </option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-[#2563EB] text-white font-semibold py-3 rounded-xl 
                       shadow hover:bg-[#1A3796] transition"
          >
            Sign Up
          </button>
        </form>

        <div className="my-6 flex items-center">
          <hr className="flex-1 border-gray-300" />
          <span className="px-2 text-sm text-gray-400">or</span>
          <hr className="flex-1 border-gray-300" />
        </div>

        <button className="w-full border border-gray-300 text-[#2563EB] font-medium py-3 rounded-xl hover:bg-gray-50 transition">
          Continue with Google
        </button>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-[#2563EB] font-semibold hover:underline">
            Login
          </Link>
        </p>
      </div>
      <img src="/Sign up-rafiki.png" style={{height:"600px", width:"600px"}}></img>
    </div>
  );
}