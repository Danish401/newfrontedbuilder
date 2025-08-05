

// import React from 'react';
// import { Link } from 'react-router-dom';
// import CreateIcon from '@mui/icons-material/Create';
// import ShareIcon from '@mui/icons-material/Share';
// import BarChartIcon from '@mui/icons-material/BarChart';

// const features = [
//   {
//     title: 'Create Beautiful Forms',
//     description: 'Design modern, responsive forms with drag-and-drop ease and a variety of templates.',
//     icon: <CreateIcon style={{ fontSize: 48, color: '#3c9087' }} />,
//   },
//   {
//     title: 'Share Instantly',
//     description: 'Share your forms with a link and collect responses in real time.',
//     icon: <ShareIcon style={{ fontSize: 48, color: '#3c9087' }} />,
//   },
//   {
//     title: 'Analyze & Export',
//     description: 'View responses in style, download as PDF/CSV, and get insights instantly.',
//     icon: <BarChartIcon style={{ fontSize: 48, color: '#3c9087' }} />,
//   },
// ];

// const Home = () => {
//   return (
//     <div className="min-h-screen flex flex-col">
//       {/* Hero Section */}
//       <section className="flex flex-col items-center justify-center flex-1 px-4 py-16 text-center bg-gradient-to-br from-[#b0dfd6] via-[#80c8bd] to-[#56aba0]">
//         <h1 className="text-4xl sm:text-5xl font-extrabold text-[#21403e] mb-4 drop-shadow-lg tracking-tight">Build, Share, and Collect with Style</h1>
//         <p className="text-lg sm:text-xl text-[#285d59] mb-8 max-w-2xl mx-auto">
//           Create beautiful, responsive forms in seconds. Share with anyone. Collect responses in your favorite template style.
//         </p>
//         <Link
//           to="/form/new"
//           className="inline-block bg-[#3c9087] hover:bg-[#2e736d] text-[#f3faf8] font-bold py-3 px-8 rounded-full shadow-lg transition-all duration-300 text-lg"
//         >
//           Get Started
//         </Link>
//       </section>

//       {/* Features Section */}
//       <section className="flex flex-col md:flex-row items-center justify-center gap-8 py-12 px-4 bg-gradient-to-br from-[#b0dfd6] via-[#80c8bd] to-[#56aba0]">
//         {features.map((feature, idx) => (
//           <div key={idx} className="flex flex-col items-center bg-white rounded-3xl shadow-xl p-10 w-full max-w-xs transition-transform duration-200 hover:scale-105 border border-[#e0f2f1]">
//             <div className="mb-4">{feature.icon}</div>
//             <h3 className="text-xl font-bold text-[#21403e] mb-2">{feature.title}</h3>
//             <p className="text-[#285d59]">{feature.description}</p>
//           </div>
//         ))}
//       </section>

//       {/* New Section with Genoa Gradient Background */}
//       {/* <section className="w-full py-12 px-4 bg-gradient-to-br from-[#b0dfd6] via-[#80c8bd] to-[#56aba0] flex flex-col items-center justify-center">
//         {/* You can add any content here, e.g., testimonials, call to action, or leave as a placeholder */}
//         {/* <div className="max-w-2xl w-full text-center">
//           <h2 className="text-2xl font-bold text-[#21403e] mb-4">Ready to get started?</h2>
//           <p className="text-[#285d59] mb-6">Join thousands of users building beautiful forms with ease. Try it now!</p>
//           {/* Example call-to-action button */}
//           {/* <button className="bg-gradient-to-r from-[#3c9087] to-[#56aba0] hover:from-[#56aba0] hover:to-[#3c9087] text-[#f3faf8] rounded-full font-semibold shadow px-8 py-3 focus:outline-none focus:ring-2 focus:ring-[#3c9087] transition-all duration-200">
//             Get Started
//           </button>
//         </div>
//       </section> */} 

//       {/* Call to Action */}
//       {/* <section className="py-12 px-4 bg-asphalt-50 text-center">
//         <h2 className="text-2xl sm:text-3xl font-bold text-asphalt-800 mb-4">Ready to create your first form?</h2>
//         <Link
//           to="/form/new"
//           className="inline-block bg-asphalt-500 hover:bg-asphalt-400 text-white font-bold py-3 px-8 rounded-2xl shadow-lg transition-all duration-300 text-lg"
//         >
//           Start Now
//         </Link> */}
//       {/* </section> */}
//     </div>
//   );
// };

// export default Home;

import React from 'react';
import { Link } from 'react-router-dom';
import CreateIcon from '@mui/icons-material/Create';
import ShareIcon from '@mui/icons-material/Share';
import BarChartIcon from '@mui/icons-material/BarChart';

const features = [
  {
    title: 'Create Beautiful Forms',
    description: 'Design modern, responsive forms with drag-and-drop ease and a variety of templates.',
    icon: <CreateIcon style={{ fontSize: 48, color: '#3c9087' }} />,
  },
  {
    title: 'Share Instantly',
    description: 'Share your forms with a link and collect responses in real time.',
    icon: <ShareIcon style={{ fontSize: 48, color: '#3c9087' }} />,
  },
  {
    title: 'Analyze & Export',
    description: 'View responses in style, download as PDF/CSV, and get insights instantly.',
    icon: <BarChartIcon style={{ fontSize: 48, color: '#3c9087' }} />,
  },
];

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center flex-1 px-6 py-20 text-center bg-[#b0dfd6]">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-[#21403e] mb-4 tracking-tight drop-shadow-lg leading-tight">
          Build, Share & Collect<br className="hidden sm:block" /> with Style
        </h1>
        <p className="text-lg sm:text-xl text-[#285d59] mb-8 max-w-2xl">
          Create beautiful, responsive forms in seconds. Share instantly. Collect responses in your favorite format.
        </p>
        <Link
          to="/form/new"
          className="inline-block bg-[#3c9087] hover:bg-[#2e736d] text-white font-semibold py-3 px-8 rounded-full shadow-md transition-all duration-300 text-lg"
        >
          Get Started
        </Link>
      </section>

      {/* Features Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 py-16 px-6 bg-[#eff6ff]">
        {features.map((feature, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center text-center bg-white rounded-3xl shadow-xl p-8 hover:shadow-2xl transition duration-300 border border-[#d1f0e8]"
          >
            <div className="mb-4">{feature.icon}</div>
            <h3 className="text-xl font-bold text-[#21403e] mb-2">{feature.title}</h3>
            <p className="text-[#285d59] text-sm">{feature.description}</p>
          </div>
        ))}
      </section>

      {/* Call to Action Section */}
      <section className="w-full py-16 px-6 bg-[#3c9087] text-center text-white">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4">Ready to create your first form?</h2>
        <p className="text-md sm:text-lg mb-6 max-w-xl mx-auto">
          Join thousands of users creating dynamic forms effortlessly.
        </p>
        <Link
          to="/form/new"
          className="inline-block bg-white text-[#21403e] hover:bg-[#d1f0e8] font-semibold py-3 px-8 rounded-full shadow-md transition duration-300 text-lg"
        >
          Start Now
        </Link>
      </section>
    </div>
  );
};

export default Home;
