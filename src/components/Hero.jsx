import React from "react";
import { Button } from "@mui/material";
import Input from "./Input"; // Adjust the path if necessary
import { Search } from "lucide-react"; // Ensure lucide-react is installed
import { motion } from "framer-motion";
import { useSelector } from 'react-redux'; // Import useSelector to access the Redux store

function Hero() {
  // Access dark mode state from Redux
  const isDarkMode = useSelector((state) => state.form.isDarkMode);

  return (
    <div className={`flex flex-col items-center justify-center gap-6 px-4 py-16 min-h-[60vh] w-full text-center transition-all duration-300 
      ${isDarkMode 
        ? 'bg-gradient-to-br from-[#2e736d] via-[#21403e] to-[#0f2424] text-[#f3faf8]' // genoa dark gradient
        : 'bg-gradient-to-br from-[#b0dfd6] via-[#80c8bd] to-[#56aba0] text-[#21403e]'}
    `}>
      <motion.h2
        className="font-extrabold text-4xl md:text-5xl lg:text-6xl mb-2 tracking-tight drop-shadow-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        Create Your <span className="text-[#3c9087]">Dynamic Form</span> and <span className="text-[#56aba0]">Share It Instantly</span>
      </motion.h2>
      <motion.h2
        className="text-lg md:text-2xl text-[#b0dfd6] font-medium mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        Unlock the Best Services Available
      </motion.h2>

      <motion.div
        className="flex flex-col sm:flex-row items-center gap-4 mt-4 w-full max-w-xl mx-auto"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        <Input
          placeholder="Search"
          className={`rounded-full w-full sm:w-[350px] px-4 py-2 text-base shadow-md focus:ring-2 focus:ring-[#3c9087] transition-all duration-200 
            ${isDarkMode ? 'bg-[#244b49] text-[#f3faf8]' : 'bg-[#f3faf8] text-[#21403e]'}
          `}
        />
        <Button
          variant="contained"
          className={`rounded-full h-[46px] px-6 font-semibold shadow-lg transition-all duration-200 
            ${isDarkMode 
              ? 'bg-[#3c9087] hover:bg-[#2e736d] text-[#f3faf8]' 
              : 'bg-[#56aba0] hover:bg-[#3c9087] text-[#21403e]'}
          `}
        >
          <Search className="w-5 h-5" />
        </Button>
      </motion.div>
    </div>
  );
}

export default Hero;
