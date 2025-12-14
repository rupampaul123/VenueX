import Navbar from '../components/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/button';
import { useEffect } from 'react';

export default function Add() {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAccess = async () => {
      try {
        const res = await fetch('https://venuex-bmu7.onrender.com/add', {
          credentials: 'include',
        });

        if (res.status === 403) {
          navigate('/signup');
        }
      } catch (err) {
        console.error('Error checking access:', err);
      }
    };

    checkAccess();
  }, [navigate]);

  return (
    <>
      <Navbar />
      <section className="grid grid-cols-1 md:grid-cols-2 gap-10 px-8 md:px-20 py-20 items-center">
        <div className="flex justify-center relative invisible sm:visible">
          <div className="absolute -top-10 -left-10 w-72 h-72 bg-blue-200 rounded-full blur-3xl opacity-30 animate-pulse"></div>
          <img
            src="Select house-amico.png"
            alt="Event venue illustration"
            className="w-[90%] max-w-lg relative drop-shadow-2xl"
          />
        </div>

        <div className="space-y-6">
          <h2 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight">
            Let’s Get Your Venue <span className="text-blue-600"> Online</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-lg">
            Add venue details, upload photos, and set availability so people can start booking right
            away.
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <Link to="/add/form">
              <Button className="bg-blue-600 text-white rounded-xl px-8 py-3 text-lg font-semibold shadow-lg hover:scale-105 hover:bg-blue-700 transition transform">
                Get Started
              </Button>
            </Link>
            <Button
              variant="outline"
              className="rounded-xl px-8 py-3 text-lg border-2 border-blue-600 text-blue-600 font-semibold hover:bg-blue-50 hover:scale-105 transition transform"
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
