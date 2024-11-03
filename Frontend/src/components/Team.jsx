import React from 'react';
import Navbar from './NavBar';
import Footer from './Footer';

import facebook from '/facebook.svg';
import instagram from '/instagram.svg';
import linkedin from '/linkedin.svg';
import twitter from '/twitter.svg';

import img1 from '/img1.jpg';
import img2 from '/img2.jpg';
import img3 from '/img3.jpg';
import img4 from '/img4.jpg';
import img5 from '/img5.jpg';
import img6 from '/img6.jpg';

const teamMembers = [
  {
    name: 'D Mallesh',
    role: 'Project Leader',
    imgSrc: img5,
    socials: {
      facebook: facebook,
      twitter: twitter,
      instagram: instagram,
      linkedin: linkedin,
    },
  },
  {
    name: 'M Lalitha',
    role: 'Developer',
    imgSrc: img3,
    socials: {
      facebook: facebook,
      twitter: twitter,
      instagram: instagram,
      linkedin: linkedin,
    },
  },
  {
    name: 'M Srivalli',
    role: 'Designer',
    imgSrc: img2,
    socials: {
      facebook: facebook,
      twitter: twitter,
      instagram: instagram,
      linkedin: linkedin,
    },
  },
  {
    name: 'P Sai Krishna',
    role: 'Backend Developer',
    imgSrc: img4,
    socials: {
      facebook: facebook,
      twitter: twitter,
      instagram: instagram,
      linkedin: linkedin,
    },
  },
  {
    name: 'S Tarun',
    role: 'Frontend Developer',
    imgSrc: img1,
    socials: {
      facebook: facebook,
      twitter: twitter,
      instagram: instagram,
      linkedin: linkedin,
    },
  },
  {
    name: 'V Sidhardha',
    role: 'Project Manager',
    imgSrc: img6,
    socials: {
      facebook: facebook,
      twitter: twitter,
      instagram: instagram,
      linkedin: linkedin,
    },
  },
];

const Team = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <section className="team-section flex-grow py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl text-gray-800">Our Team</h2>
            <p className="mt-4 text-lg text-gray-600">
              Meet our dedicated team of professionals working collaboratively to achieve excellence. 
              With diverse skills and backgrounds, we are committed to delivering innovative solutions 
              and driving our projects forward together.
            </p>
          </div>

          <div className="flex flex-wrap justify-center">
            {teamMembers.map((member, index) => (
              <div key={index} className="relative group m-6">
                <div className="w-36 h-36 rounded-full overflow-hidden border-4 border-transparent group-hover:border-gray-800 transition-all ease-linear">
                  <img className="w-full h-full object-cover" src={member.imgSrc} alt={`${member.name}, ${member.role}`} />
                </div>

                <div className="absolute left-1/2 transform -translate-x-1/2 -top-20 opacity-0 group-hover:opacity-100 transition-all ease-linear bg-gray-800 p-4 text-center rounded-md shadow-lg w-48">
                  <h3 className="text-lg font-semibold text-white">{member.name}</h3>
                  <p className="text-sm text-gray-300">{member.role}</p>
                  <div className="flex justify-center space-x-3 mt-4">
                    {Object.keys(member.socials).map((social, idx) => (
                      <a
                        key={idx}
                        href="#"
                        className="transform transition-transform duration-200 hover:scale-110"
                      >
                        <img className="w-8" src={member.socials[social]} alt={`${social} Profile`} />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Team;
