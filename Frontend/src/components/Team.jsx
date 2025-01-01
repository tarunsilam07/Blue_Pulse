import React from 'react';
import Navbar from './NavBar';
import Footer from './Footer';

import facebook from '/facebook.svg';
import instagram from '/instagram.svg';
import linkedin from '/linkedin.svg';
import twitter from '/twitter.svg';

import img1 from '/img1.jpeg';
import img2 from '/img2.jpeg';
import img3 from '/img3.jpeg';
import img4 from '/img4.jpeg';
import img5 from '/img5.jpeg';
import img6 from '/img6.jpeg';

const teamMembers = [
  {
    name: 'S Tarun',
    role: 'FullStack Developer',
    imgSrc: img1,
    socials: {
      facebook: { icon: facebook, url: 'https://facebook.com/profile-link-tarun' },
      twitter: { icon: twitter, url: 'https://twitter.com/profile-link-tarun' },
      instagram: { icon: instagram, url: 'https://instagram.com/profile-link-tarun' },
      linkedin: { icon: linkedin, url: 'https://www.linkedin.com/in/tarun-silam-83a46021a?miniProfileUrn=urn%3Ali%3Afs_miniProfile%3AACoAADc9eq4Bu8Q_lgioA8Xc8272XAWv5jnIhXY&lipi=urn%3Ali%3Apage%3Ad_flagship3_search_srp_all%3B8xX27Z60Traa0r73hNE1LA%3D%3D' },
    },
  },
  {
    name: 'V Sidhardha',
    role: 'Project Manager',
    imgSrc: img5,
    socials: {
      facebook: { icon: facebook, url: 'https://facebook.com/profile-link-sidhardha' },
      twitter: { icon: twitter, url: 'https://twitter.com/profile-link-sidhardha' },
      instagram: { icon: instagram, url: 'https://instagram.com/profile-link-sidhardha' },
      linkedin: { icon: linkedin, url: 'https://www.linkedin.com/in/sidhardha-valavala-1a2463276?miniProfileUrn=urn%3Ali%3Afs_miniProfile%3AACoAAENXy0oB6FeRgPISFhXOo3p3PmGfStdQTWc&lipi=urn%3Ali%3Apage%3Ad_flagship3_search_srp_all%3ByGfd27QLRwKIFkL8BLLW9Q%3D%3D' },
    },
  },
  {
    name: 'M Lalitha',
    role: 'Frontend Developer',
    imgSrc: img4,
    socials: {
      facebook: { icon: facebook, url: 'https://facebook.com/profile-link-lalitha' },
      twitter: { icon: twitter, url: 'https://twitter.com/profile-link-lalitha' },
      instagram: { icon: instagram, url: 'https://instagram.com/profile-link-lalitha' },
      linkedin: { icon: linkedin, url: 'https://www.linkedin.com/in/laliteswari-moyilla-2780722a8?miniProfileUrn=urn%3Ali%3Afs_miniProfile%3AACoAAEoMRfwB2NEMPeuU-JzdypayJpK8tc4-SOs&lipi=urn%3Ali%3Apage%3Ad_flagship3_search_srp_all%3BZop72bUGRKaC5pMTuMm58w%3D%3D' },
    },
  },
  {
    name: 'M Srivalli',
    role: 'Flutter Developer',
    imgSrc: img3,
    socials: {
      facebook: { icon: facebook, url: 'https://facebook.com/profile-link-srivalli' },
      twitter: { icon: twitter, url: 'https://twitter.com/profile-link-srivalli' },
      instagram: { icon: instagram, url: 'https://instagram.com/profile-link-srivalli' },
      linkedin: { icon: linkedin, url: 'https://www.linkedin.com/in/venkata-sai-srivalli-muthangi?miniProfileUrn=urn%3Ali%3Afs_miniProfile%3AACoAAEs2VggBb6-R7ry7ApM4AcHJW4Y_O3vPVSU&lipi=urn%3Ali%3Apage%3Ad_flagship3_search_srp_all%3B7hA%2BGLdjT6y4Zme81hPO3A%3D%3D' },
    },
  },
  {
    name: 'D Mallesh',
    role: 'IoT Engineer',
    imgSrc: img6,
    socials: {
      facebook: { icon: facebook, url: 'https://facebook.com/profile-link-mallesh' },
      twitter: { icon: twitter, url: 'https://twitter.com/profile-link-mallesh' },
      instagram: { icon: instagram, url: 'https://instagram.com/profile-link-mallesh' },
      linkedin: { icon: linkedin, url: 'https://www.linkedin.com/in/danda-mallesh-reddy-723803215?miniProfileUrn=urn%3Ali%3Afs_miniProfile%3AACoAADZnCEsBWG3ZUQ5xA9qntBC3t8UUA13YdhI&lipi=urn%3Ali%3Apage%3Ad_flagship3_search_srp_all%3BP%2FEqnZRQSmO25%2BSkkpW8hg%3D%3D' },
    },
  },
  {
    name: 'P Sai Krishna',
    role: 'Research',
    imgSrc: img2,
    socials: {
      facebook: { icon: facebook, url: 'https://facebook.com/profile-link-krishna' },
      twitter: { icon: twitter, url: 'https://twitter.com/profile-link-krishna' },
      instagram: { icon: instagram, url: 'https://instagram.com/profile-link-krishna' },
      linkedin: { icon: linkedin, url: 'https://www.linkedin.com/in/peddinti-saikrishna-a0879225b?miniProfileUrn=urn%3Ali%3Afs_miniProfile%3AACoAAEACcCgBSJlktBAKf8teekI0dCZ5IiE_gPQ&lipi=urn%3Ali%3Apage%3Ad_flagship3_search_srp_all%3BkUf82OLQSuK%2BympDBpFZmw%3D%3D' },
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
              <div key={index} className="relative group m-6 text-center">
                {/* Team Member Picture */}
                <div className="w-36 h-36 rounded-full overflow-hidden border-4 border-transparent group-hover:border-gray-800 transition-all ease-linear">
                  <img className="w-full h-full object-cover" src={member.imgSrc} alt={`${member.name}, ${member.role}`} />
                </div>

                {/* Name under picture */}
                <h3 className="mt-4 text-lg font-semibold text-gray-800">{member.name}</h3>

                {/* Card Info on Hover */}
                <div className="absolute left-1/2 transform -translate-x-1/2 -top-20 opacity-0 group-hover:opacity-100 transition-all ease-linear bg-gray-800 p-4 text-center rounded-md shadow-lg w-48">
                  <p className="text-sm text-gray-300">{member.role}</p>
                  <div className="flex justify-center space-x-3 mt-4">
                    {Object.keys(member.socials).map((social, idx) => (
                      <a
                        key={idx}
                        href={member.socials[social].url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transform transition-transform duration-200 hover:scale-110"
                      >
                        <img className="w-8" src={member.socials[social].icon} alt={`${social} Profile`} />
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
