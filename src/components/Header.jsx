// import React, { useState, useEffect } from "react";
// import { Button, IconButton ,Typography} from "@mui/material";
// import { motion, AnimatePresence } from "framer-motion";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import { MdNightlight, MdWbSunny, MdOutlineAccountBalance, MdOutlineBuild, MdSave, MdEdit } from "react-icons/md";
// import logo from "../assets/logo.svg";
// import 'react-toastify/dist/ReactToastify.css'; // Import CSS for styling
// import { toast, ToastContainer } from 'react-toastify';
// import { useDispatch, useSelector } from "react-redux";
// import { toggleDarkMode } from "../features/formSlice";
// import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
// import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
// import axios from "axios";
// import p from "../assets/images/profile.png"
// import LogoutIcon from '@mui/icons-material/Logout';
// import { logout1 } from '../features/authSlice'; // Adjust the path accordingly
// const BACKEND_URL =
//   process.env.NODE_ENV === "production"
//     ? "https://newbackendformbuilder.onrender.com"
//     : "http://localhost:5000";
// function Header() {
//   const { formId } = useParams();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const isDarkMode = useSelector((state) => state.form.isDarkMode);
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false); // For services dropdown
//   const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false); // For profile dropdown
//   const [userdata, setUserdata] = useState({});
//   const { user, isAuthenticated } = useSelector((state) => state.auth);
//   const getUser = async () => {
//     try {
//       const response = await axios.get(`${BACKEND_URL}/login/success`, { withCredentials: true });
//       console.log("Response from /login/success:", response.data); // Add this line
//       if (response.data.user) {
//         setUserdata(response.data.user); // Set userdata for both login methods
//       } else {
//         setUserdata({}); // Clear user data if not logged in
//       }
//     } catch (error) {
//       console.log("Error fetching user data", error);
//       setUserdata({}); // Clear user data on error
//     }
//   };
  
//   const logout = async () => {
//     try {
//       const response = await axios.get(`${BACKEND_URL}/logout`, { withCredentials: true });
//       if (response.status === 200) {
//         localStorage.removeItem("token");
//         document.cookie = "token=; Max-Age=0; path=/;";
//         setUserdata({}); // Clear userdata on logout
//         setIsProfileDropdownOpen(false); // Close profile dropdown after logout
  
//         // Show success toast notification
//         toast.success("Successfully logged out!", {
//           position: "bottom-right",
//           autoClose: 2000,
//           hideProgressBar: true,
//           style: {
//             backgroundColor: '#9b9ef0',
//             color: '#f5f5f5',
//             borderRadius: '8px',
//           },
//         });
  
//         navigate("/login");
//       }
//     } catch (error) {
//       console.error("Error logging out:", error.response ? error.response.data : error.message);
      
//       // Show error toast notification
//       toast.error("Logout failed. Please try again.", {
//         position: "bottom-right",
//         autoClose: 3000,
//         className: 'custom-toast', // Optionally apply a custom clas
//         hideProgressBar: true,
//         style: {
//           backgroundColor: '#9b9ef0',
//           color: '#f5f5f5',
//           borderRadius: '8px',
//         },
//       });
//     }
//   };
//   const toggleDropdown = () => {
//     setIsDropdownOpen((prev) => !prev);
//     if (isProfileDropdownOpen) setIsProfileDropdownOpen(false); // Close profile dropdown if open
//   };

//   const toggleProfileDropdown = () => {
//     setIsProfileDropdownOpen((prev) => !prev);
//     if (isDropdownOpen) setIsDropdownOpen(false); // Close services dropdown if open
//   };

//   useEffect(() => {
//     getUser(); // Fetch user data on component mount
//   }, []);

//   const toggleTheme = () => {
//     dispatch(toggleDarkMode());
//   };

//   const handleLogout = () => {
//     // Clear user and token from Redux
//     dispatch(logout1());
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
  
//     // Show success toast notification
//     toast.success("Successfully logged out!", {
//       position: "bottom-right",
//       autoClose: 2000,
//       hideProgressBar: true,
//       className: 'custom-toast', // Optionally apply a custom clas
//       style: {
//         backgroundColor: '#9b9ef0',
//         color: '#fff',
//         borderRadius: '8px',
//       },
//     });
  
//     // Delay the navigation to allow the toast to display
//     setTimeout(() => {
//       navigate("/login");
//     }, 2000); // Wait for 3000 milliseconds (3 seconds) before navigating
//   };
  
//   const dropdownVariants = {
//     open: {
//       opacity: 1,
//       y: 0,
//       transition: { type: "spring", stiffness: 300, damping: 24 },
//     },
//     closed: { opacity: 0, y: -20, transition: { duration: 0.2 } },
//   };

//   return (
//     <>
//       <motion.div
//         className={`fixed top-0 left-0 py-0 w-full flex justify-between items-center shadow-md ${
//           isDarkMode 
//             ? "bg-[#21403e] text-[#f3faf8]" // genoa 900 bg, 50 text
//             : "bg-[#b0dfd6] text-[#244b49]" // genoa 200 bg, 800 text
//         } z-50`}
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 0.5 }}
//       >
//         <motion.div className="flex items-center gap-4 ml-4" whileHover={{ scale: 1.05 }}>
//           <motion.img
//             src={logo}
//             alt="logo"
//             width={100}
//             height={50}
//             className="cursor-pointer"
//             whileHover={{ rotate: 360 }}
//             transition={{ duration: 1 }}
//           />
//         </motion.div>

//         <motion.div className="flex items-center gap-8 relative">
//           {['Home', 'Forms'].map((item, index) => (
//             <motion.div key={index} className="relative cursor-pointer group">
//               <Link
//                 to={item === "Home" ? "/" : item === "Forms" ? "/forms":null}
//                 className={`text-sm ${isDarkMode ? "text-[#f3faf8]" : "text-[#244b49]"}`}
//               >
//                 <h2 className="hover:text-[#9b9ef0] transition">{item}</h2>
//               </Link>
//               <motion.div
//                 className="absolute left-0 right-0 h-1 bg-[#3c9087] mt-1 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
//                 style={{ bottom: -2 }}
//               />
//             </motion.div>
//           ))}

//           {/* Services Dropdown */}
//           <motion.div className="relative cursor-pointer group">
//             <motion.h2
//               className={`text-sm ${isDarkMode ? "text-[#f3faf8]" : "text-[#244b49]"}`}
//               onClick={toggleDropdown}
//             >
//               Services {isDropdownOpen ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
//             </motion.h2>

//             <AnimatePresence>
//               {isDropdownOpen && (
//                 <motion.div
//                   className={`absolute z-10 shadow-lg mt-2 rounded ${
//                     isDarkMode ? "bg-[#21403e] text-[#f3faf8]" : "bg-[#d7f0ea] text-[#244b49]"
//                   }`}
//                   initial="closed"
//                   animate="open"
//                   exit="closed"
//                   variants={dropdownVariants}
//                 >
//                   <motion.ul className="p-2 space-y-1">
//                     <motion.li
//                       className="px-4 py-2 hover:bg-[#80c8bd] cursor-pointer flex items-center" // genoa 300
//                       onClick={() => {
//                         setIsDropdownOpen(false);
//                         navigate("/form/new");
//                       }}
//                     >
//                       <MdOutlineBuild className="mr-2" />
//                       FormBuilder
//                     </motion.li>
//                   </motion.ul>
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </motion.div>
//         </motion.div>

//         <motion.div className="flex items-center gap-4">
//   {/* Theme toggle icon */}
//   {/* <IconButton onClick={toggleTheme}>
//     {isDarkMode ? <MdWbSunny className="text-white mr-3" size={24} /> : <MdNightlight size={24} />}
//   </IconButton> */}

//   {/* Profile dropdown */}
//   {
//   isAuthenticated && user ? (
//     <div 
//       className="relative" 
//       onMouseEnter={() => setIsProfileDropdownOpen(true)} 
//       onMouseLeave={() => setIsProfileDropdownOpen(false)}
//     >
//       <IconButton className="focus:outline-none">
//         {/* Profile image or icon */}
//         {userdata.image ? (
//           <img src={p} alt="User profile" className="w-10 h-10 mr-4  rounded-full border-2 border-[#6e6ade]" />
//         ) : (
//           <MdOutlineAccountBalance 
//           className={isDarkMode ? "text-white mr-8" : "text-gray-500 mr-8"} 
//           size={24} 
//         />
        
//         )}
//       </IconButton>

//       <AnimatePresence>
//         {isProfileDropdownOpen && (
//           <motion.div
//             variants={dropdownVariants}
//             initial="closed"
//             animate="open"
//             exit="closed"
//             className={`absolute right-0 mt-2 ${isDarkMode ? "bg-[#21403e] text-[#f3faf8]" : "bg-[#d7f0ea] text-[#244b49]"} shadow-lg rounded-lg p-4 z-10 w-60 mr-4`}
//           >
//             <div className="flex items-center gap-3 mb-4">
//               {/* Large profile image in dropdown */}
              
//               <div>
//                 {/* Username and email display */}
//                 <p className={`text-lg font-bold font-serif ${isDarkMode ? "text-[#f3faf8]" : "text-[#244b49]"}`}>
//                   {user.name}
//                 </p>
//                 <p className={`text-xs font-sans ${isDarkMode ? "text-[#f3faf8]" : "text-[#244b49]"}`}>
//                   {user.email}
//                 </p>
//               </div>
//             </div>
//             <hr className="border-gray-300 dark:border-gray-600 mb-4" />
//             {/* Logout button with framer motion effects */}
//             <motion.button
//             onClick={handleLogout}
//               className={`w-full flex items-center text-left text-sm ${
//                 isDarkMode ? "text-[#b0dfd6] hover:text-[#56aba0]" : "text-[#21403e] hover:text-[#3c9087]" // genoa 200, 400, 900, 500
//               } transition`}
//               whileHover={{ scale: 1.1 }}
//               whileTap={{ scale: 0.95 }}
//             >
              
//               <LogoutIcon className="mr-2" />
//               <span>Logout</span>
//             </motion.button>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
  
//   ) : userdata && userdata.email ? (
//     <div 
//       className="relative" 
//       onMouseEnter={() => setIsProfileDropdownOpen(true)} 
//       onMouseLeave={() => setIsProfileDropdownOpen(false)}
//     >
//       <IconButton className="focus:outline-none">
//         {/* Profile image or icon */}
//         {userdata.image ? (
//           <img src={userdata.image} alt="User profile" className="w-10 h-10 mr-8  rounded-full border-2 border-[#6e6ade]" />
//         ) : (
//           <MdOutlineAccountBalance 
//           className={isDarkMode ? "text-white mr-8" : "text-gray-500 mr-8"} 
//           size={24} 
//         />
//         )}
//       </IconButton>

//       <AnimatePresence>
//         {isProfileDropdownOpen && (
//           <motion.div
//             variants={dropdownVariants}
//             initial="closed"
//             animate="open"
//             exit="closed"
//             className={`absolute right-0 mt-2 ${isDarkMode ? "bg-[#21403e] text-[#f3faf8]" : "bg-[#d7f0ea] text-[#244b49]"} shadow-lg rounded-lg p-4 z-10 w-60 mr-4`}
//           >
//             <div className="flex items-center gap-3 mb-4">
//               {/* Large profile image in dropdown */}
//               {userdata.image && (
//                 <img src={userdata.image} alt="User profile" className="w-12 h-12 rounded-full border-2 border-[#6e6ade]" />
//               )}
//               <div>
//                 {/* Username and email display */}
//                 <p className={`text-lg font-bold font-serif ${isDarkMode ? "text-[#f3faf8]" : "text-[#244b49]"}`}>
//                   {userdata.displayName || userdata.name}
//                 </p>
//                 <p className={`text-xs font-sans ${isDarkMode ? "text-[#f3faf8]" : "text-[#244b49]"}`}>
//                   {userdata.email}
//                 </p>
//               </div>
//             </div>
//             <hr className="border-gray-300 dark:border-gray-600 mb-4" />
//             {/* Logout button with framer motion effects */}
//             <motion.button
//               onClick={logout}
//               className={`w-full flex items-center text-left text-sm ${
//                 isDarkMode ? "text-[#b0dfd6] hover:text-[#56aba0]" : "text-[#21403e] hover:text-[#3c9087]" // genoa 200, 400, 900, 500
//               } transition`}
//               whileHover={{ scale: 1.1 }}
//               whileTap={{ scale: 0.95 }}
//             >
//               <LogoutIcon className="mr-2" />
//               <span>Logout</span>
//             </motion.button>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   ) 
//  : (      <div className="mr-8">
//   <Button
//     variant="contained"
//     className={`flex rounded-full py-0.5 px-3 text-sm transition-colors ${
//       isDarkMode 
//         ? "bg-[#3c9087] hover:bg-[#2e736d] text-[#f3faf8]" // genoa 500, 600, 50
//         : "bg-[#56aba0] hover:bg-[#3c9087] text-[#21403e]" // genoa 400, 500, 900
//     }`}
//     onClick={() => navigate("/signup")}
//   >
//     Get Started
//   </Button>
// </div>

//           )}
//         </motion.div>
 
//       </motion.div>
//       <ToastContainer
//   position="bottom-right"
//   autoClose={3000}
//   hideProgressBar
//   newestOnTop
//   closeOnClick
//   rtl={false}
//   pauseOnFocusLoss
//   draggable
//   pauseOnHover
//   style={{
//     margin: '20px', // Add margin for spacing from the edges
//     zIndex: 9999, // Ensure the toast appears above other elements
//   }}
// />

      
//     </>
//   );
// }

// export default Header;




import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, Link, useParams } from "react-router-dom";
import { Button, IconButton } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { MdOutlineAccountBalance, MdOutlineBuild, MdSave, MdEdit, MdNightlight, MdWbSunny } from "react-icons/md";
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import LogoutIcon from '@mui/icons-material/Logout';
import { useDispatch, useSelector } from "react-redux";
import { toggleDarkMode } from "../features/formSlice";
import { logout1 } from '../features/authSlice';
import axios from "axios";
import logo from "../assets/logo.svg";
import p from "../assets/images/profile.png";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BACKEND_URL =
  process.env.NODE_ENV === "production"
    ? "https://newbackendformbuilder.onrender.com"
    : "http://localhost:5000";

function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isDarkMode = useSelector((state) => state.form.isDarkMode);
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [userdata, setUserdata] = useState({});

  // Detect mobile device
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth <= 768);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Check if current route is FormBuilder route (adjust if you have other form-related routes)
  const isFormBuilderRoute = location.pathname.startsWith("/form");

  // Fetch logged-in user data
  const getUser = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/login/success`, { withCredentials: true });
      if (response.data.user) {
        setUserdata(response.data.user);
      } else {
        setUserdata({});
      }
    } catch (error) {
      setUserdata({});
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const logout = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/logout`, { withCredentials: true });
      if (response.status === 200) {
        localStorage.removeItem("token");
        document.cookie = "token=; Max-Age=0; path=/;";
        setUserdata({});
        setIsProfileDropdownOpen(false);
        toast.success("Successfully logged out!", {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: true,
          style: { backgroundColor: '#9b9ef0', color: '#f5f5f5', borderRadius: '8px' },
        });
        navigate("/login");
      }
    } catch (error) {
      toast.error("Logout failed. Please try again.", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: true,
        style: { backgroundColor: '#9b9ef0', color: '#f5f5f5', borderRadius: '8px' },
      });
    }
  };

  const handleLogout = () => {
    dispatch(logout1());
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Successfully logged out!", {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: true,
      style: { backgroundColor: '#9b9ef0', color: '#fff', borderRadius: '8px' },
    });
    setTimeout(() => {
      navigate("/login");
    }, 2000);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
    if (isProfileDropdownOpen) setIsProfileDropdownOpen(false);
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen((prev) => !prev);
    if (isDropdownOpen) setIsDropdownOpen(false);
  };

  const dropdownVariants = {
    open: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
    closed: { opacity: 0, y: -20, transition: { duration: 0.2 } },
  };

  // *** HIDE HEADER if on mobile AND on form builder route ***
  if (isMobile && isFormBuilderRoute) {
    return null;
  }

  // Else render header normally
  return (
    <>
      <motion.div
        className={`fixed top-0 left-0 py-0 w-full flex justify-between items-center shadow-md ${
          isDarkMode ? "bg-[#21403e] text-[#f3faf8]" : "bg-[#b0dfd6] text-[#244b49]"
        } z-50`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div className="flex items-center gap-4 ml-4" whileHover={{ scale: 1.05 }}>
          <motion.img
            src={logo}
            alt="logo"
            width={100}
            height={50}
            className="cursor-pointer"
            whileHover={{ rotate: 360 }}
            transition={{ duration: 1 }}
          />
        </motion.div>

        <motion.div className="flex items-center gap-8 relative">
          {["Home", "Forms"].map((item, index) => (
            <motion.div key={index} className="relative cursor-pointer group">
              <Link
                to={item === "Home" ? "/" : item === "Forms" ? "/forms" : null}
                className={`text-sm ${isDarkMode ? "text-[#f3faf8]" : "text-[#244b49]"}`}
              >
                <h2 className="hover:text-[#9b9ef0] transition">{item}</h2>
              </Link>
              <motion.div
                className="absolute left-0 right-0 h-1 bg-[#3c9087] mt-1 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                style={{ bottom: -2 }}
              />
            </motion.div>
          ))}

          {/* Services Dropdown */}
          <motion.div className="relative cursor-pointer group">
            <motion.h2
              className={`text-sm ${isDarkMode ? "text-[#f3faf8]" : "text-[#244b49]"}`}
              onClick={toggleDropdown}
            >
              Services {isDropdownOpen ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
            </motion.h2>

            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div
                  className={`absolute z-10 shadow-lg mt-2 rounded ${
                    isDarkMode ? "bg-[#21403e] text-[#f3faf8]" : "bg-[#d7f0ea] text-[#244b49]"
                  }`}
                  initial="closed"
                  animate="open"
                  exit="closed"
                  variants={dropdownVariants}
                >
                  <motion.ul className="p-2 space-y-1">
                    <motion.li
                      className="px-4 py-2 hover:bg-[#80c8bd] cursor-pointer flex items-center"
                      onClick={() => {
                        setIsDropdownOpen(false);
                        navigate("/form/new");
                      }}
                    >
                      <MdOutlineBuild className="mr-2" />
                      FormBuilder
                    </motion.li>
                  </motion.ul>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>

        <motion.div className="flex items-center gap-4">
          {/* Profile dropdown and buttons */}
          {isAuthenticated && user ? (
            <div
              className="relative"
              onMouseEnter={() => setIsProfileDropdownOpen(true)}
              onMouseLeave={() => setIsProfileDropdownOpen(false)}
            >
              <IconButton className="focus:outline-none" onClick={toggleProfileDropdown}>
                {userdata.image ? (
                  <img
                    src={p}
                    alt="User profile"
                    className="w-10 h-10 mr-4 rounded-full border-2 border-[#6e6ade]"
                  />
                ) : (
                  <MdOutlineAccountBalance
                    className={isDarkMode ? "text-white mr-8" : "text-gray-500 mr-8"}
                    size={24}
                  />
                )}
              </IconButton>

              <AnimatePresence>
                {isProfileDropdownOpen && (
                  <motion.div
                    variants={dropdownVariants}
                    initial="closed"
                    animate="open"
                    exit="closed"
                    className={`absolute right-0 mt-2 ${
                      isDarkMode ? "bg-[#21403e] text-[#f3faf8]" : "bg-[#d7f0ea] text-[#244b49]"
                    } shadow-lg rounded-lg p-4 z-10 w-60 mr-4`}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div>
                        <p
                          className={`text-lg font-bold font-serif ${
                            isDarkMode ? "text-[#f3faf8]" : "text-[#244b49]"
                          }`}
                        >
                          {user.name}
                        </p>
                        <p
                          className={`text-xs font-sans ${
                            isDarkMode ? "text-[#f3faf8]" : "text-[#244b49]"
                          }`}
                        >
                          {user.email}
                        </p>
                      </div>
                    </div>
                    <hr className="border-gray-300 dark:border-gray-600 mb-4" />
                    <motion.button
                      onClick={handleLogout}
                      className={`w-full flex items-center text-left text-sm ${
                        isDarkMode
                          ? "text-[#b0dfd6] hover:text-[#56aba0]"
                          : "text-[#21403e] hover:text-[#3c9087]"
                      } transition`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <LogoutIcon className="mr-2" />
                      <span>Logout</span>
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : userdata && userdata.email ? (
            <div
              className="relative"
              onMouseEnter={() => setIsProfileDropdownOpen(true)}
              onMouseLeave={() => setIsProfileDropdownOpen(false)}
            >
              <IconButton className="focus:outline-none" onClick={toggleProfileDropdown}>
                {userdata.image ? (
                  <img
                    src={userdata.image}
                    alt="User profile"
                    className="w-10 h-10 mr-8 rounded-full border-2 border-[#6e6ade]"
                  />
                ) : (
                  <MdOutlineAccountBalance
                    className={isDarkMode ? "text-white mr-8" : "text-gray-500 mr-8"}
                    size={24}
                  />
                )}
              </IconButton>

              <AnimatePresence>
                {isProfileDropdownOpen && (
                  <motion.div
                    variants={dropdownVariants}
                    initial="closed"
                    animate="open"
                    exit="closed"
                    className={`absolute right-0 mt-2 ${
                      isDarkMode ? "bg-[#21403e] text-[#f3faf8]" : "bg-[#d7f0ea] text-[#244b49]"
                    } shadow-lg rounded-lg p-4 z-10 w-60 mr-4`}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      {userdata.image && (
                        <img
                          src={userdata.image}
                          alt="User profile"
                          className="w-12 h-12 rounded-full border-2 border-[#6e6ade]"
                        />
                      )}
                      <div>
                        <p
                          className={`text-lg font-bold font-serif ${
                            isDarkMode ? "text-[#f3faf8]" : "text-[#244b49]"
                          }`}
                        >
                          {userdata.displayName || userdata.name}
                        </p>
                        <p
                          className={`text-xs font-sans ${
                            isDarkMode ? "text-[#f3faf8]" : "text-[#244b49]"
                          }`}
                        >
                          {userdata.email}
                        </p>
                      </div>
                    </div>
                    <hr className="border-gray-300 dark:border-gray-600 mb-4" />
                    <motion.button
                      onClick={logout}
                      className={`w-full flex items-center text-left text-sm ${
                        isDarkMode
                          ? "text-[#b0dfd6] hover:text-[#56aba0]"
                          : "text-[#21403e] hover:text-[#3c9087]"
                      } transition`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <LogoutIcon className="mr-2" />
                      <span>Logout</span>
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <div className="mr-8">
              <Button
                variant="contained"
                className={`flex rounded-full py-0.5 px-3 text-sm transition-colors ${
                  isDarkMode
                    ? "bg-[#3c9087] hover:bg-[#2e736d] text-[#f3faf8]"
                    : "bg-[#56aba0] hover:bg-[#3c9087] text-[#21403e]"
                }`}
                onClick={() => navigate("/signup")}
              >
                Get Started
              </Button>
            </div>
          )}
        </motion.div>
      </motion.div>

      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        style={{ margin: "20px", zIndex: 9999 }}
      />
    </>
  );
}

export default Header;
