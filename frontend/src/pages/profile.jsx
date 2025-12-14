import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import { useState } from 'react';
import { Button } from '../components/button';
import { Link } from 'react-router-dom';

export default function Profile() {
  async function handlelogout() {
    await fetch('https://venuex-bmu7.onrender.com/logout', {
      credentials: 'include',
      method: 'GET',
    });
  }

  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phoneno: 0,
    role: '',
  });

  useEffect(() => {
    fetch('https://venuex-bmu7.onrender.com/profile', {
      method: 'GET',
      credentials: 'include',
    })
      .then(res => res.json())
      .then(res => setProfile(res))
      .catch(err => console.log('error loading profile ', err));
  }, []);

  return (
    <>
      <Navbar />
      <h1 className="text-center text-4xl font-bold text-gray-800 m-6">
        Your <span className="text-blue-600">Profile</span>
      </h1>
      <div className="relative min-w-screen h-80 mx-5 my-5 rounded-3xl overflow-hidden bg-slate-600 flex justify-center items-center">
        <div className="w-36 h-36 rounded-full bg-red-800 z-30 absolute -top-18">
          <img
            className="w-full h-full object-cover rounded-full"
            src="https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_incoming&w=740&q=80"
          />
        </div>
        <div className="h-full w-full z-10"></div>
      </div>
      <h1 className="text-center text-4xl font-bold text-gray-800 m-6">
        Your <span className="text-blue-600">Details</span>
      </h1>
      <div className="min-w-screen h-auto flex justify-center items-start mt-10">
        <div className="bg-white shadow-lg rounded-2xl p-8 w-[1200px] mb-24">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-3">
            Profile Details
          </h2>

          <div className="grid grid-cols-2 gap-y-4 text-gray-700 text-lg">
            <p className="font-medium">Name:</p>
            <p>{profile.name}</p>

            <p className="font-medium">Email:</p>
            <p>{profile.email}</p>

            <p className="font-medium">Phone Number:</p>
            <p>{String(profile.phoneno)}</p>

            <p className="font-medium">Role:</p>
            <p>{profile.role}</p>
          </div>
        </div>
      </div>

      <div className="min-w-screen flex justify-center items-center">
        <Link to="/">
          <Button onClick={handlelogout} className="mb-24">
            Signout
          </Button>
        </Link>
      </div>
    </>
  );
}
