import trainIcon from "../assets/images/train.png"
import chatBotIcon from "../assets/images/chatbot.png"
import tipIcon from "../assets/images/tip.png"
import SuggestionsForm from "./Form/suggestionForm"
import GrievanceForm from "./Form/grievanceForm"
import Chatbot from "./Form/chatBot"
import { useState } from "react"
import trackIcon from "../assets/images/track-concern.png"
import enquiryIcon from "../assets/images/enquiry.png"
// import ChatBotButton from "./ChatBotButton"
import { toast } from "react-toastify"
export default function Home() {
  const [activeForm, setActiveForm] = useState("TRAIN")

  const services = [
    {
      name: "Ticket Booking",
      color:
        "https://railmadad.indianrailways.gov.in/madad/final/images/booking-icon-1.png",
    },
    {
      name: "Train Enquiry",
      color:
        "https://railmadad.indianrailways.gov.in/madad/final/images/booking-icon-2.png",
    },
    {
      name: "Reservation Enquiry",
      color:
        "https://railmadad.indianrailways.gov.in/madad/final/images/booking-icon-3.png",
    },
    {
      name: "Retiring Room Booking",
      color:
        " https://railmadad.indianrailways.gov.in/madad/final/images/booking-icon-4.png",
    },
    {
      name: "Indian Railways",
      color:
        "https://railmadad.indianrailways.gov.in/madad/final/images/booking-icon-5.png",
    },
    {
      name: "UTS Ticketing",
      color:
        "https://railmadad.indianrailways.gov.in/madad/final/images/booking-icon-6.png",
    },
    {
      name: "Freight Business",
      color:
        "https://railmadad.indianrailways.gov.in/madad/final/images/booking-icon-7.png",
    },
    {
      name: "Railway Parcel Website",
      color:
        "https://railmadad.indianrailways.gov.in/madad/final/images/booking-icon-2.png",
    },
  ]

  const menuItems = [
    { name: "TRAIN", icon: trainIcon, link: "trainIcon" },
    // { name: "STATION", icon: "🏛️", link: "station" },
    // { name: "APPRECIATION/ RAIL ANUBHAV", icon: "📝", link: "appreciation" },
    { name: "ENQUIRY", icon: enquiryIcon, link: "enquiry" },
    { name: "TRACK YOUR CONCERN", icon: trackIcon, link: "track-concern" },
    { name: "SUGGESTIONS", icon: tipIcon, link: "suggestions" },
    { name: "AI CHATBOT", icon: chatBotIcon, link: "suggestions" },
  ]

  return (
    <div className=" flex flex-col  md:my-6 md:mr-8 md:flex-row min-h-screen ">
      {/* Left Section - Service Logos */}
      <div className="md:w-2/5 md:p-4 my-16 md:mt-22 order-4 sm:order-1">
        <div className="grid grid-cols-4 gap-4 md:mt-16 mx-16 ">
          {services.map((service, index) => (
            <div
              key={index}
              className={` gap-2 items-center text-center flex flex-col `}
            >
              <img
                src={service.color}
                className="text-xl md:text-2xl md:w-16  w-40 mb-2"
              />
              <div className="font-font1  text-slate-300 md:text-white text-xm md:text-sm">
                {service.name}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Middle Section - Vertical Menu */}
      <div className="flex md:hidden fixed bottom-0 right-0 left-0 md:order-3 justify-between items-center px-5 bg-[#6B001B]">
        {menuItems.map((item, index) => (
          <div
            key={index}
            className={` md:mb-4  p-2 `}
            onClick={() => setActiveForm(item.name)}
          >
            <img
              src={item.icon}
              className={`w-5   md:w-10 hover:w-7 mr-2 ${activeForm == item.name ? "w-7" : ""}`}
              alt={`${item.name} Icon`}
            />
          </div>
        ))}
      </div>

      <div className=" w-screen md:w-3/5 flex md:mt-5 justify-end flex-col md:flex-row bg-[#6B001B]  text-white  order-2">
        <div className="hidden md:block md:w-1/6">
          {menuItems.map((item, index) => (
            <div
              key={index}
              className={`${activeForm == item.name ? "bg-[#8f2323]" : ""} md:mb-4 flex-row flex md:flex-col items-center justify-center text-center cursor-pointer hover:bg-[#8f2323] p-2 rounded`}
              onClick={() => setActiveForm(item.name)}
            >
              <img
                src={item.icon}
                className="w-5 md:w-10 mr-2"
                alt={`${item.name} Icon`}
              />
              <span>{item.name}</span>
            </div>
          ))}
        </div>
        {/* <ChatBotButton /> */}
        <div className="w-screen md:w-5/6 order-3 sm:mt-2">
          {/* <Component/> */}
          {/* <GrievanceForm/> */}
          {activeForm == "TRAIN" && <GrievanceForm />}
          {activeForm == "ENQUIRY" && (
            <button
              onClick={() => {
                toast.success(
                  "Grievance register successfully.Grievance register successfully.",
                  {}
                )
              }}
            >
              hello
            </button>
          )}
          {activeForm == "SUGGESTIONS" && <SuggestionsForm />}
          {activeForm == "AI CHATBOT" && <Chatbot />}
        </div>
      </div>
    </div>
  )
}
