import { Card, CardContent } from "../components/card";
import { MapPin } from "lucide-react";
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

export default function Booked() {
  const [venues, setVenues] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    fetch("https://venuex-production.up.railway.app/me", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setIsLoggedIn(data.loggedIn);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  
  useEffect(() => {
    fetch("https://venuex-production.up.railway.app/booked", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((res) => setVenues(res));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600 text-lg">
        Checking login status...
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          Booked <span className="text-blue-600">Venues</span> By You
        </h1>
        <p className="text-gray-600 mb-6">Get all your bookings here</p>
      </div>

      {venues.length === 0 ? (
        <div className="text-center text-gray-600 text-lg pb-16">
          You have no bookings yet.
        </div>
      ) : (
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pb-16">
          {venues.map((venue) => (
            <Card
              key={venue.id}
              className="overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition"
            >
              <img
                src={venue.url}
                alt={venue.name}
                className="h-48 w-full object-cover"
              />
              <CardContent className="p-4">
                <h2 className="text-xl font-semibold text-gray-800">
                  {venue.name}
                </h2>
                <div className="flex items-center text-gray-500 text-sm mt-1">
                  <MapPin size={16} className="mr-1 text-blue-600" />
                  Phone No. - {venue.phoneno}
                </div>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-lg font-bold text-blue-600">
                    From -{" "}
                    {new Date(venue.start).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                  <span className="text-lg font-bold text-blue-600">
                    To -{" "}
                    {new Date(venue.end).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
