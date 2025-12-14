import { useState, useEffect } from 'react';
import { useNavigate, Link, useParams, Navigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
export default function Booking() {
  const [name, setName] = useState('');
  const [phoneno, setPhoneno] = useState();
  const [start, setStart] = useState();
  const [end, setEnd] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    fetch('https://venuex-bmu7.onrender.com/me', {
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => {
        setIsLoggedIn(data.loggedIn);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  async function handlesubmit(e) {
    e.preventDefault();
    try {
      const res = await fetch(`https://venuex-bmu7.onrender.com/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          phoneno,
          start,
          end,
        }),
        credentials: 'include',
      });

      const data = await res.json();

      if (res.ok) {
        navigate('/venues');
      } else {
        alert(data.message || 'Booking failed');
      }
    } catch (err) {
      console.error(err);
      alert('Error connecting to server');
    }
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-white px-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-[#2563EB]">VenueX</h1>
            <p className="text-gray-600 mt-2">Book Your Space</p>
          </div>

          <form className="space-y-4" onSubmit={handlesubmit}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-[#2563EB]">
                Name
              </label>
              <input
                value={name}
                onChange={e => setName(e.target.value)}
                type="text"
                id="name"
                placeholder="John Doe "
                className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-xl 
                         focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
              />
            </div>

            <div>
              <label htmlFor="phoneno" className="block text-sm font-medium text-[#2563EB]">
                Renter's Phone No.
              </label>
              <input
                value={phoneno}
                onChange={e => setPhoneno(e.target.value)}
                type="number"
                id="phoneno"
                placeholder="+91 "
                className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-xl 
                         focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
              />
            </div>

            <div>
              <label htmlFor="start" className="block text-sm font-medium text-[#2563EB]">
                From:
              </label>
              <input
                value={start}
                onChange={e => setStart(e.target.value)}
                type="date"
                id="start"
                placeholder="30-03-2006"
                className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-xl 
                         focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
              />
            </div>

            <div>
              <label htmlFor="start" className="block text-sm font-medium text-[#2563EB]">
                To:
              </label>
              <input
                value={end}
                onChange={e => setEnd(e.target.value)}
                type="date"
                id="end"
                placeholder="30-03-2006"
                className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-xl 
                         focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#2563EB] text-white font-semibold rounded-xl 
                       hover:bg-[#1E3A8A] transition"
            >
              Confirm Booking
            </button>
          </form>

          <div className="mt-8 flex items-center">
            <div className="flex-grow h-px bg-gray-300"></div>
            <div className="flex-grow h-px bg-gray-300"></div>
          </div>
        </div>
        <img src="/House searching-cuate.png" style={{ height: '600px', width: '600px' }} />
      </div>
    </>
  );
}
