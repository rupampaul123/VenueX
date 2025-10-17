import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Link, useParams } from "react-router-dom";

export default function Details() {
  const [details, setDetails] = useState({
    name: "",
    phoneno: "",
    content: "",
    location: "",
    price: "",
    image: "",
  });

  const {id} = useParams();

  useEffect(() => {
    fetch(`http://localhost:3000/details/${id}`)
      .then((res) => res.json())
      .then((data) => setDetails(data))
      .catch((err) => console.error("Error fetching details:", err));
  }, []);

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 flex justify-center py-12 px-4">
        <div className="w-full max-w-5xl bg-white rounded-3xl shadow-lg overflow-hidden">
          
          <div className="relative">
            <img
              src={details.image || "/me.jpg"}
              alt={details.name}
              className="w-full h-[450px] object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent text-white p-6 rounded-b-3xl">
              <h1 className="text-3xl font-bold">{details.name || "Venue Name"}</h1>
              <p className="text-lg mt-1">{details.location || "Location not available"}</p>
            </div>
          </div>

          <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-xl font-semibold text-blue-700 mb-3">Venue Details</h2>
              <p className="text-gray-600 leading-relaxed">
                {details.content ||
                  "This venue offers a perfect setting for events and gatherings, equipped with great ambiance and all essential facilities."}
              </p>
            </div>

            <div className="bg-blue-50 p-6 rounded-2xl shadow-inner flex flex-col gap-4">
              <div className="flex justify-between border-b border-gray-200 pb-2">
                <span className="font-medium text-gray-700">💰 Price</span>
                <span className="text-blue-600 font-semibold text-lg">
                  ₹{details.price || "N/A"}
                </span>
              </div>
              <div className="flex justify-between border-b border-gray-200 pb-2">
                <span className="font-medium text-gray-700">📍 Location</span>
                <span className="text-gray-800">{details.location || "N/A"}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-700">📞 Contact</span>
                <span className="text-gray-800">{details.phoneno || "N/A"}</span>
              </div>
                  <Link to={`/booking/${id}`}>
                    <button className="mt-6 bg-blue-600 w-full hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition">
                      Book This Venue
                    </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}