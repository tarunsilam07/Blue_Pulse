import Navbar from './NavBar';
import Footer from './Footer';

import instagram from '/instagram.svg';
import linkedin from '/linkedin.svg';

import img1 from '/img1.jpeg';
import img4 from '/img4.jpeg';
import img5 from '/img5.jpeg';

const teamMembers = [
  {
    name: 'S Tarun',
    role: 'Backend Developer & Microcontroller Programmer',
    imgSrc: img1,
    socials: {
      instagram: { icon: instagram, url: 'https://www.instagram.com/tarun_077__/' },
      linkedin: { icon: linkedin, url: 'https://www.linkedin.com/in/tarun-silam-83a46021a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app' },
    },
  },
  {
    name: 'V Sidhardha',
    role: 'Analysis Developer & Integration',
    imgSrc: img5,
    socials: {
      instagram: { icon: instagram, url: 'https://www.instagram.com/mr_sidhu.14/' },
      linkedin: { icon: linkedin, url: 'https://www.linkedin.com/in/sidhardha-valavala-1a2463276?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app' },
    },
  },
  {
    name: 'M Laliteswari',
    role: 'Frontend Developer & Connectivity',
    imgSrc: img4,
    socials: {
      instagram: { icon: instagram, url: 'https://www.instagram.com/lalli._.iii/' },
      linkedin: { icon: linkedin, url: 'https://www.linkedin.com/in/laliteswari-moyilla-2780722a8?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app' },
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
