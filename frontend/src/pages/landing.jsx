import LogoLoop from '../components/logoloop';
import { SiMarriott } from "react-icons/si";
import { SiOyo } from "react-icons/si";        // OYO Rooms
import { SiAirbnb } from "react-icons/si";
import { SiBookmyshow } from "react-icons/si";
import { SiRazorpay } from "react-icons/si";
import { SiPaytm } from "react-icons/si";
import { SiStripe } from "react-icons/si";
import { SiGooglepay } from "react-icons/si";
import { SiVisa } from "react-icons/si";
import { SiMastercard } from "react-icons/si";


import Cookies from "js-cookie";
import { useState, useEffect } from 'react';
import { Button } from "../components/button";
import { Link } from "react-router-dom";
import CountUp from "../components/countup"
import KeyFeatures from '../components/keyfeatures';
import Navbar from '../components/Navbar';

export default function LandingPage() {

  const techLogos = [
  { node: <SiMarriott />, title: "React", href: "https://react.dev" },
  { node: <SiOyo />, title: "TypeScript", href: "https://www.typescriptlang.org" },
  { node: <SiAirbnb />, title: "Tailwind CSS", href: "https://tailwindcss.com" },
  { node: <SiBookmyshow />, title: "Tailwind CSS", href: "https://tailwindcss.com" },
];

const techLogos1 = [
  { node: <SiRazorpay />, title: "Tailwind CSS", href: "https://tailwindcss.com" },
  { node: <SiPaytm />, title: "Tailwind CSS", href: "https://tailwindcss.com" },
  { node: <SiVisa />, title: "Tailwind CSS", href: "https://tailwindcss.com" },
  { node: <SiGooglepay />, title: "Tailwind CSS", href: "https://tailwindcss.com" },
  { node: <SiMastercard />, title: "Tailwind CSS", href: "https://tailwindcss.com" },
  { node: <SiStripe />, title: "Tailwind CSS", href: "https://tailwindcss.com" },
]

const imageLogos = [
  { src: "/logos/company1.png", alt: "Company 1", href: "https://company1.com" },
  { src: "/logos/company2.png", alt: "Company 2", href: "https://company2.com" },
  { src: "/logos/company3.png", alt: "Company 3", href: "https://company3.com" },
];


  return (
    <>
    <div className="min-h-screen bg-gradient-to- from-white via-blue-50 to-white text-gray-900">
      <Navbar/>


      <section className="grid grid-cols-1 md:grid-cols-2 gap-10 px-8 md:px-20 py-20 items-center">

        <div className="space-y-6">
          <h2 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight">
            Find Your Perfect <span className="text-blue-600">Event Venue</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-lg">
            VenueX makes it simple to discover and book event spaces near you.  
            Search by location, compare options, and make hassle-free reservations.
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <Link to="/venues">
            <Button className="bg-blue-600 text-white rounded-xl px-8 py-3 text-lg font-semibold shadow-lg hover:scale-105 hover:bg-blue-700 transition transform">
              Get Started
            </Button>
            </Link>
            <Button variant="outline" className="rounded-xl px-8 py-3 text-lg border-2 border-blue-600 text-blue-600 font-semibold hover:bg-blue-50 hover:scale-105 transition transform">
              Learn More
            </Button>
          </div>
        </div>

        <div className="flex justify-center relative invisible sm:visible">
          <div className="absolute -top-10 -left-10 w-72 h-72 bg-blue-200 rounded-full blur-3xl opacity-30 animate-pulse"></div>
          <img 
            src="Outdoor party-bro.png" 
            alt="Event venue illustration" 
            className="w-[90%] max-w-lg relative drop-shadow-2xl"
          />
        </div>
      </section>
      </div>


      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center py-20 bg-white">
        <div>
          <CountUp
            from={0}
            to={500}
            separator=","
            direction="up"
            duration={2}
            className="count-up-text text-blue-600 font-extrabold text-7xl"
          />
          <h2 className="text-4xl text-gray-600 mt-4">
            Venues Listed Across Major Cities
          </h2>
        </div>
        
        <div>
          <CountUp
            from={0}
            to={1200}
            separator=","
            direction="up"
            duration={2}
            className="count-up-text text-blue-600 font-extrabold text-7xl"
          />
          <h2 className="text-4xl text-gray-600 mt-4">
            Successful Bookings Last Month
          </h2>
        </div>
        
        <div>
          <CountUp
            from={0}
            to={95}
            separator=","
            direction="up"
            duration={5}
            className="count-up-text text-blue-600 font-extrabold text-7xl"
          />
          <h2 className="text-4xl text-gray-600 mt-4">
            Customer Satisfaction Rating
          </h2>
        </div>
      </div>

      <KeyFeatures/>

        
        <div style={{marginTop:"80px" ,height: '200px', position: 'relative', overflow: 'hidden'}}>
          <h2 className="text-5xl text-center font-bold text-[#2563EB] mb-12">Partners</h2>
            <LogoLoop
              logos={techLogos}
              speed={100}
              direction="left"
              logoHeight={100}
              gap={80}
              pauseOnHover
              scaleOnHover
              fadeOut
              fadeOutColor="#ffffff"
              ariaLabel="Technology partners"
            />
    </div>
    <div style={{marginTop:"80px", height: '200px', position: 'relative', overflow: 'hidden'}}>
            <LogoLoop
              logos={techLogos1}
              speed={100}
              direction="right"
              logoHeight={100}
              gap={80}
              pauseOnHover
              scaleOnHover
              fadeOut
              fadeOutColor="#ffffff"
              ariaLabel="Technology partners"
            />
    </div>

    <div className="flex justify-center items-center bg-gradient-to-r from-blue-50 to-white py-12 px-6 text-center max-w-9xl mx-auto">
      <div>
      <h2 className="text-6xl md:text-5xl font-bold text-blue-600 mb-6">
        Why Choose Your Ideal Venue?
      </h2>

      <ul className="space-y-3 text-gray-700 text-lg mb-8 text-left md:text-center md:space-y-2">
        <li className="flex items-center justify-start md:justify-center">
          <span className="text-blue-600 text-3xl mr-2">✔</span>
          Wide range of pricing venues for every occasion
        </li>
        <li className="flex items-center justify-start md:justify-center">
          <span className="text-blue-600 text-3xl mr-2">✔</span>
          Trusted by thousands with success & happy organizers
        </li>
      </ul><Link to="/venues">
          <Button className="bg-blue-600 text-white rounded-xl px-8 py-3 text-lg font-semibold shadow-lg hover:scale-105 hover:bg-blue-700 transition transform">
            Get Started
          </Button>
          </Link>
        </div>
        <div>
          <img style={{ height: "700px", width: "700px" }} className='invisible sm:visible' src="Outdoor party-rafiki.png"/>
          </div>
      </div>

            
    </>
  );
}
