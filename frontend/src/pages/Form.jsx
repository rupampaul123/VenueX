import { useState } from "react";
import Cookies from "js-cookie";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar"
import imageCompression from 'browser-image-compression';
import { useEffect } from "react";
export default function Form()
{

     const [name, setName] = useState("");
      const [location, setLocation] = useState("");
      const [price, setPrice] = useState();
      const[phoneno, setPhoneno] = useState();
      const[image, setImage] = useState(null);
      const[content, setContent] = useState("")

      const navigate = useNavigate();

      
      
        const imageChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const options = { maxSizeMB: 1, maxWidthOrHeight: 1024 };
        const compressedFile = await imageCompression(file, options);
            if (compressedFile.size / 1024 / 1024 > 1) {
            alert("Image is too large even after compression");
            return;
            }
        const reader = new FileReader();
        reader.onloadend = () => setImage(reader.result); // base64
        reader.readAsDataURL(compressedFile);
        };
    
      async function handlesubmit(e) {
        e.preventDefault();
        try {
          const res = await fetch("http://localhost:3000/form", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({  name, location, price, phoneno, image, content }),
            credentials: "include", 
          });
    
          const data = await res.json();
    
          if (res.ok) {
            navigate("/venues"); 
          } else {
            alert(data.message || "Login failed");
          }
        } catch (err) {
          console.error(err);
          alert("Error connecting to server");
        }
      }
 

    return (
        <>
        <Navbar/>
            <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6">

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#2563EB]">VenueX</h1>
          <p className="text-gray-600 mt-2">Share Your Space</p>
        </div>


        <form className="space-y-4" onSubmit={handlesubmit}>
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-[#2563EB]"
            >
              Venue Name
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              id="name"
              placeholder="John Doe's House"
              className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-xl 
                         focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
            />
          </div>

            <div>
            <label
              htmlFor="location"
              className="block text-sm font-medium text-[#2563EB]"
            >
              Venue Location
            </label>
            <select onChange={(e) => setLocation(e.target.value)} className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-xl 
                         focus:outline-none focus:ring-2 focus:ring-[#2563EB]">
              <option value="Location">Location</option>
              <option value="Delhi">New Delhi</option>
              <option value="Bangalore">Bangalore</option>
              <option value="Jaipur">Jaipur</option>
              <option value="Mumbai">Mumbai</option>
            </select>
          </div>

            <div>
            <label
              htmlFor="price"
              className="block text-sm font-medium text-[#2563EB]"
            >
              Venue Price
            </label>
            <input
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              type="number"
              id="price"
              placeholder="₹ 20000"
              className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-xl 
                         focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
            />
          </div>

          <div>
            <label
              htmlFor="phoneno"
              className="block text-sm font-medium text-[#2563EB]"
            >
              Venue Owner's Phone No.
            </label>
            <input
              value={phoneno}
              onChange={(e) => setPhoneno(e.target.value)}
              type="number"
              id="phoneno"
              placeholder="+91 "
              className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-xl 
                         focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
            />
          </div>

          <div>
            <label
              htmlFor="content"
              className="block text-sm font-medium text-[#2563EB]"
            >
              Details About The Place
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              type="text"
              id="content"
              placeholder="Describe Your Place "
              className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-xl 
                         focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
            />
          </div>

        <div>
            <label
              htmlFor="image"
              className="block text-sm font-medium text-[#2563EB]"
            >
              Venue Image
            </label>
            <input
              onChange={imageChange}
              type="file"
              id="image"
              
              className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-xl 
                         focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
            />
          </div>


          <button
            type="submit"
            className="w-full py-3 bg-[#2563EB] text-white font-semibold rounded-xl 
                       hover:bg-[#1E3A8A] transition"
          >
            Add Listing
          </button>
        </form>


        <div className="mt-8 flex items-center">
          <div className="flex-grow h-px bg-gray-300"></div>
          <div className="flex-grow h-px bg-gray-300"></div>
        </div>
      </div>
      <img
        src="/For sale-rafiki.png"
        style={{ height: "600px", width: "600px" }}
      />
    </div>
        </>
    )
}