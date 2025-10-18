import { Link } from "react-router-dom"
import { Button } from "./button"
import { useState, useEffect } from "react";


const API_URL = window.location.hostname === 'localhost' 
  ? "http://localhost:3000" 
  : "https://venuex-production.up.railway.app";

export default function Navbar() {
    const[IsLoggedIn, setIsLoggedIn] = useState(false);
    const[role, setRole] = useState("");

    useEffect(() => {
      fetch(`${API_URL}/me`, {
        method: "GET",
        credentials: "include", 
      })
        .then(res => res.json())
        .then(data => {
          if (data.loggedIn) setIsLoggedIn(true);
        })
        .catch(() => setIsLoggedIn(false));
    }, []);

    useEffect(() => {
      fetch(`${API_URL}/navbar`, {
        method: "GET",
        credentials: "include",
      })
      .then(res => {
        if (!res.ok) throw new Error('Not authorized');
        return res.json();
      })
      .then(res => setRole(res))
      .catch(err => console.error('Navbar fetch error:', err));
    }, []);

    return(
      <nav className="flex items-center justify-between px-8 md:px-16 py-5 shadow-sm bg-white/70 backdrop-blur-md sticky top-0 z-50">
        <Link to="/">
          <h1 className="text-2xl font-extrabold text-blue-600 tracking-tight">
            VenueX
          </h1>
        </Link>
        <div className="space-x-8 hidden md:flex">
          <Link to={role=="admin"? "/add" : "/venues"} className="text-gray-700 hover:text-blue-600 transition">
            {role === "admin"? `Add Venue` : "View Sites" }
          </Link>
          <Link to={role=="admin"? "/listed" : "/booked"} className="text-gray-700 hover:text-blue-600 transition">
            {role === "admin"? `Listed Sites` : "Booked Sites" }
          </Link>
          <Link to="/about" className="text-gray-700 hover:text-blue-600 transition">
            About The Developer
          </Link>
        </div>
        <div className="space-x-7 flex items-center">
            {IsLoggedIn ? (
                <>
                <Link to="/profile">
                    <Button className="bg-blue-600 text-white rounded-xl px-5 py-2 font-medium shadow-md hover:bg-blue-700 transition">
                        Profile
                    </Button>
                </Link>
                </>
                ) : (
                <>
                    <Link to="/login" className="text-gray-700 hover:text-blue-600 transition">
                    Log In
                    </Link>
                    <Link to="/signup">
                    <Button className="bg-blue-600 text-white rounded-xl px-5 py-2 font-medium shadow-md hover:bg-blue-700 transition">
                        Sign Up
                    </Button>
                    </Link>
                </>
                )}
        </div>
      </nav>
    )
}