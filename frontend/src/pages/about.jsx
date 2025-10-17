import Navbar from "../components/Navbar";
    import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
 import { faGithub, faLinkedinIn, faInstagram } from '@fortawesome/free-brands-svg-icons';

export default function About() {
  return (
    <>
      <Navbar />
      <h2 className="mt-6 text-center text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight">
        Know <span className="text-blue-600">About The Developer</span>
      </h2>

      <div className="h-auto w-full text-center mt-16 text-2xl md:text-3xl text-gray-800 max-w-3xl mx-auto px-4">
        <span className="text-blue-600 font-bold">Welcome to VenueX</span>
      </div>


      <div className="w-full h-auto flex flex-col md:flex-row justify-center items-center gap-12 mt-12 px-6">
        <img
          src="me.jpg"
          alt="About Rupam Paul Bag"
          className="w-40 h-40 md:w-56 md:h-56 object-cover rounded-full shadow-lg"
        />

        <div className="text-center md:text-left text-lg md:text-xl text-gray-700 max-w-2xl leading-relaxed">
          <p>
            Hi, I’m <span className="font-bold text-gray-900">Rupam Paul Bag</span>, a 2nd-year CSE student at SASTRA University passionate about full-stack web development.
          </p>
          <p className="mt-4">
            I’ve built projects like <a href="https://github.com/rupampaul123/Campus-Kart"><span className="text-blue-600 font-semibold">CampusKart</span></a> (college e-commerce) and <a href="https://github.com/rupampaul123/SastraList"><span className="text-blue-600 font-semibold">SastraList</span></a> (campus marketplace), gaining experience in React, Node.js, Express, MySQL, MongoDB, and Tailwind.
          </p>
          <p className="mt-4">
            I enjoy creating real-world solutions, exploring secure authentication, backend APIs, and scalable deployments. I’m currently seeking internship opportunities to grow as a full-stack engineer.
          </p>
        </div>
      </div>
        <div className="h-auto w-full text-center mt-12 text-2xl md:text-3xl text-gray-800 max-w-3xl mx-auto px-4">
        <span className="text-blue-600 font-bold">Find Me On</span>
      </div>
      <div className="flex my-7 gap w-full justify-around items-center">
        <a className="cursor-pointer" href="https://www.linkedin.com/in/rupam-paul-bag-66bb3b307/"><div className="text-gray-600 font-bold text-[30px] hover:text-blue-600">LinkedIn <span><FontAwesomeIcon icon={faLinkedinIn} /></span></div></a>
        <a className="cursor-pointer" href="https://github.com/rupampaul123"><div className="text-gray-600 font-bold text-[30px] hover:text-blue-600">Github <span><FontAwesomeIcon icon={faGithub} /></span></div></a>
        <a className="cursor-pointer" href="https://www.instagram.com/rupampaul_/"><div className="text-gray-600 font-bold text-[30px] hover:text-blue-600">Instragram <span><FontAwesomeIcon icon={faInstagram} /></span></div></a>
      </div>
    </>
  );
}
