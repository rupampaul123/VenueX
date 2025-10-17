import { Card, CardContent } from "../components/card";
import { Button } from "../components/button";
import { Search, MapPin, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Cookies from "js-cookie";

export default function Venue() {
  const [venues, setVenues] = useState([]);
  const [venues1, setVenues1] = useState([]);
  const [search, setSearch] = useState("");

  const [price, setPrice] = useState("Price");
  const [location, setLocation] = useState("Location");
  const [rating, setRating] = useState("Rating");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3000/venues")
      .then((res) => res.json())
      .then((res) => {
        setVenues(res);
        setVenues1(res);
      });
  }, []);



  function applyFilters() {
    var temp = [...venues];
    if (search) {
      temp = temp.filter(
        (venue) =>
          venue.name.toLowerCase().includes(search.toLowerCase()) ||
          venue.location.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (location && location !== "Location") {
      temp = temp.filter((venue) =>
        venue.location.toLowerCase().includes(location.toLowerCase())
      );
    }

    if (rating && rating !== "Rating") {
      temp = temp.filter((venue) => venue.rating >= parseFloat(rating));
    }

    if (price === "Low to High") {
      temp.sort((a, b) => a.price - b.price);
    } else if (price === "High to Low") {
      temp.sort((a, b) => b.price - a.price);
    }

    setVenues1(temp);
  }


  useEffect(() => {
    applyFilters();
  }, [search, location, rating, price, venues]);

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) setIsLoggedIn(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      <Navbar />


      <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          Discover <span className="text-blue-600">Venues</span> Near You
        </h1>
        <p className="text-gray-600 mb-6">
          Search, compare, and find the perfect event space for your occasion.
        </p>

        <div className="flex flex-col md:flex-row items-center gap-3 md:gap-4 bg-white shadow-md rounded-2xl p-3 max-w-7xl">
          <div className="flex items-center flex-1 bg-gray-50 rounded-xl px-2">
            <Search className="text-gray-400 ml-2" />
            <input
              value={search}
              type="text"
              placeholder="Search by name, location, or type..."
              className="flex-1 px-4 py-2 bg-transparent outline-none"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-3">
            <select
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="px-4 py-2 rounded-xl border text-gray-700 shadow-sm"
            >
              <option>Price</option>
              <option>Low to High</option>
              <option>High to Low</option>
            </select>

            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="px-4 py-2 rounded-xl border text-gray-700 shadow-sm"
            >
              <option value="Location">Location</option>
              <option value="Delhi">New Delhi</option>
              <option value="Bangalore">Bangalore</option>
              <option value="Jaipur">Jaipur</option>
              <option value="Mumbai">Mumbai</option>
            </select>

            <select
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              className="px-4 py-2 rounded-xl border text-gray-700 shadow-sm"
            >
              <option>Rating</option>
              <option value="4.5">4.5+</option>
              <option value="4.0">4.0+</option>
              <option value="3.0">3.0+</option>
            </select>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pb-16">
        {venues1.map((venue) => (
          <Card
            key={venue.id}
            className="overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition"
          >
            <img
              src={venue.image}
              alt={venue.name}
              className="h-48 w-full object-cover"
            />
            <CardContent className="p-4">
              <h2 className="text-xl font-semibold text-gray-800">
                {venue.name}
              </h2>
              <div className="flex items-center text-gray-500 text-sm mt-1">
                <MapPin size={16} className="mr-1 text-blue-600" />
                {venue.location}
              </div>
              <div className="flex items-center justify-between mt-3">
                <span className="text-lg font-bold text-blue-600">
                  ₹{venue.price}
                </span>
                <div className="flex items-center text-yellow-500">
                  <Star size={16} fill="currentColor" />
                  <span className="ml-1 text-sm text-gray-700">
                    {venue.rating}
                  </span>
                </div>
              </div>
              <Link to={`/details/${venue._id}`}><Button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl">
                View Details
              </Button> </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
