import React from "react";
import { Link } from "react-router-dom";
import CreateIcon from "@mui/icons-material/Create";
import ShareIcon from "@mui/icons-material/Share";
import BarChartIcon from "@mui/icons-material/BarChart";

const features = [
  {
    title: "Create Beautiful Forms",
    description:
      "Design modern, responsive forms with drag-and-drop ease and a variety of templates.",
    icon: <CreateIcon style={{ fontSize: 56, color: "#3c9087" }} />,
  },
  {
    title: "Share Instantly",
    description:
      "Share your forms with a link and collect responses in real time.",
    icon: <ShareIcon style={{ fontSize: 56, color: "#3c9087" }} />,
  },
  {
    title: "Analyze & Export",
    description:
      "View responses in style, download as PDF/CSV, and get insights instantly.",
    icon: <BarChartIcon style={{ fontSize: 56, color: "#3c9087" }} />,
  },
];

const Home = () => {
  return (
    // padding-top prevents overlap with fixed header
    <div className="min-h-screen flex flex-col pt-16 sm:pt-24 bg-gradient-to-b from-[#d7f0ea] to-[#b0dfd6]">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center flex-1 px-6 py-20 text-center max-w-7xl mx-auto">
        <h1 className="text-4xl sm:text-6xl font-extrabold text-[#21403e] mb-6 tracking-tight drop-shadow-md leading-tight max-w-4xl">
          Build, Share & Collect
          <br className="hidden sm:block" /> with Style
        </h1>
        <p className="text-lg sm:text-xl text-[#285d59] mb-12 max-w-3xl leading-relaxed">
          Create beautiful, responsive forms in seconds. Share instantly.
          Collect responses in your favorite format.
        </p>
        <Link
          to="/form/new"
          className="inline-block bg-[#3c9087] hover:bg-[#2e736d] text-white font-semibold py-4 px-12 rounded-full shadow-lg transition-all duration-300 text-lg sm:text-xl transform hover:scale-105"
        >
          Get Started
        </Link>
      </section>

      {/* Features Section */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 py-16 px-6 max-w-7xl mx-auto">
        {features.map((feature, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center text-center bg-white rounded-3xl shadow-xl p-10 hover:shadow-2xl transition duration-300 border border-[#d1f0e8] transform hover:-translate-y-2"
          >
            <div className="mb-6">{feature.icon}</div>
            <h3 className="text-2xl font-bold text-[#21403e] mb-3">
              {feature.title}
            </h3>
            <p className="text-[#285d59] text-base sm:text-lg max-w-xs">
              {feature.description}
            </p>
          </div>
        ))}
      </section>

      {/* Call to Action Section */}
      <section className="w-full py-20 px-6 bg-[#3c9087] text-center text-white">
        <h2 className="text-3xl sm:text-4xl font-bold mb-6 max-w-4xl mx-auto">
          Ready to create your first form?
        </h2>
        <p className="text-md sm:text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
          Join thousands of users creating dynamic forms effortlessly.
        </p>
        <Link
          to="/form/new"
          className="inline-block bg-white text-[#21403e] hover:bg-[#d1f0e8] font-semibold py-4 px-12 rounded-full shadow-lg transition duration-300 text-lg sm:text-xl transform hover:scale-105"
        >
          Start Now
        </Link>
      </section>
    </div>
  );
};

export default Home;
