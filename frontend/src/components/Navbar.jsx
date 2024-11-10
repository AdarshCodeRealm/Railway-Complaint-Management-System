// "use client"
import { useState, useEffect } from "react"
import Image from "../assets/images/G20-logo.png"
import micIcon from "../assets/images/micIcon.png"
import { signUpWithGoogle, signOut, getCookie } from "@/firebaseConfig"
export default function Navbar() {
  const [isSmallScreen, setIsSmallScreen] = useState(false)
  const [currentLanguage, setCurrentLanguage] = useState("en")
  const [isAuthorized, setIsAuthorized] = useState(false)
  function isAuthenticated() {
    const accessToken = getCookie("accessToken")
    return !!accessToken
  }
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768)
    }
    setIsAuthorized(isAuthenticated())

    handleResize()
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <nav
      className={`bg-white flex-col md:flex-row w-screen shadow-md px-16  p-4 ${isSmallScreen ? "flex flex-col space-y-4" : "flex items-center justify-between"}`}
    >
      <div
        className={` flex  items-center ${isSmallScreen ? "justify-center" : ""}`}
      >
        <img src={Image} alt="G20 Logo" className="mr-4 h-10  md:h-16" />
        <div>
          <h1 className="text-3xl md:text-4xl  font-bold text-[#8B0000]">
            RailMadad
          </h1>
          <p className="text-xs md:text-sm font-font1 text-black">
            For Inquiry, Assistance & Grievance Redressal
          </p>
        </div>
      </div>
      <div
        className={` gap-2 flex items-center ${isSmallScreen ? "justify-center" : ""}`}
      >
        <div className="flex animate-pulse items-center bg-[#D35400] text-white px-3 py-1 rounded-md mr-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 mr-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
            />
          </svg>
          <span className="text-2xl font-bold ">139</span>
        </div>
        <span className="text-sm font-font1">
          for Security/Medical Assistance
        </span>
      </div>
      <div
        className={` flex  ${isSmallScreen ? "flex-row space-x-2" : "items-center space-x-4"}`}
      >
        {isAuthorized ? (
          <button
            onClick={signOut}
            className="bg-[#EFE4E8] font-font1 px-6 border border-gray-300 text-sm rounded-lg hover:bg-[#930B3E] hover:text-white p-2"
          >
            Sign Out
          </button>
        ) : (
          <button
            onClick={signUpWithGoogle}
            className="bg-[#DCDEF9] font-font1 px-6 border border-gray-300 text-gray-900 text-sm rounded-lg hover:bg-[#930B3E] hover:text-white block p-2"
          >
            Log In
          </button>
        )}
        <button
          onClick={signUpWithGoogle}
          className={`${isAuthorized ? "hidden" : "block"} bg-[#EFE4E8] font-font1 px-6 border border-gray-300 text-sm rounded-lg hover:bg-[#930B3E] hover:text-white p-2`}
        >
          Sign Up
        </button>
        <select
          className="bg-white font-font1 border px-6 border-gray-300  text-sm rounded-lg    p-2"
          value={currentLanguage}
          onChange={(e) => setCurrentLanguage(e.target.value)}
        >
          <option value="en">English</option>
          <option value="hi">हिंदी</option>
        </select>
        {/* <img src={micIcon} className="h-6 " alt="mic icon" /> */}
      </div>
    </nav>
  )
}
