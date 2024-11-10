import { useState } from "react"
import RailLogo from "../assets/logo-railmadad.png"
import {
  Bell,
  User,
  Menu,
  Home,
  FileText,
  Settings,
  HelpCircle,
  UserPlus,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import StaffSection from "../components/Sections/StaffSection"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import GrievanceSection from "@/components/Sections/GrievanceSection"
import { signOut } from "../Config"
function RailMadadDashboardWithSidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [activeSection, setActiveSection] = useState("dashboard")
  const handleButtonClick = (sectionName) => {
    setActiveSection(sectionName)
  }

  const renderActiveComponent = () => {
    switch (activeSection) {
      case "dashboard":
        return <GrievanceSection />
      case "complaints":
        return <GrievanceSection />
      case "staff":
        return <StaffSection />
      case "settings":
        return <h1>Settings Component</h1>
      case "help":
        return <h1>Help Component</h1>
      default:
        return <h1>Dashboard Component</h1>
    }
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`bg-indigo-700 text-white min-h-screen p-4 ${isSidebarOpen ? "w-64" : "w-16"}`}
      >
        <nav>
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="flex items-center space-x-2 p-2 hover:bg-indigo-600 rounded"
              >
                <Menu className="h-5 w-5" />
                <span className={`${isSidebarOpen ? "" : "hidden"}`}></span>
              </button>
            </li>
            <li>
              <button
                onClick={() => handleButtonClick("dashboard")}
                className={`flex items-center space-x-2 p-2 hover:bg-indigo-600 rounded ${
                  activeSection === "dashboard" ? "bg-indigo-800" : ""
                }`}
              >
                <Home className="h-5 w-5" />
                <span className={`${isSidebarOpen ? "" : "hidden"}`}>
                  Dashboard
                </span>
              </button>
            </li>
            <li>
              <button
                onClick={() => handleButtonClick("complaints")}
                className={`flex items-center space-x-2 p-2 hover:bg-indigo-600 rounded ${
                  activeSection === "complaints" ? "bg-indigo-800" : ""
                }`}
              >
                <FileText className="h-5 w-5" />
                <span className={`${isSidebarOpen ? "" : "hidden"}`}>
                  Complaints
                </span>
              </button>
            </li>
            <li>
              <button
                onClick={() => handleButtonClick("staff")}
                className={`flex items-center space-x-2 p-2 hover:bg-indigo-600 rounded ${
                  activeSection === "staff" ? "bg-indigo-800" : ""
                }`}
              >
                <UserPlus className="h-5 w-5" />
                <span className={`${isSidebarOpen ? "" : "hidden"}`}>
                  Staff
                </span>
              </button>
            </li>
            <li>
              <button
                onClick={() => handleButtonClick("settings")}
                className={`flex items-center space-x-2 p-2 hover:bg-indigo-600 rounded ${
                  activeSection === "settings" ? "bg-indigo-800" : ""
                }`}
              >
                <Settings className="h-5 w-5" />
                <span className={`${isSidebarOpen ? "" : "hidden"}`}>
                  Settings
                </span>
              </button>
            </li>
            <li>
              <button
                onClick={() => handleButtonClick("help")}
                className={`flex items-center space-x-2 p-2 hover:bg-indigo-600 rounded ${
                  activeSection === "help" ? "bg-indigo-800" : ""
                }`}
              >
                <HelpCircle className="h-5 w-5" />
                <span className={`${isSidebarOpen ? "" : "hidden"}`}>Help</span>
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex  flex-col  overflow-hidden">
        <header className="bg-white z-10 shadow-sm">
          <div className=" max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <div className="flex items-center">
              <div className="flex flex-row space-x-4 justify-center items-center ">
                <img className="h-10 " src={RailLogo} alt="railmadad-logo" />
                <h1 className="text-3xl font-semibold text-gray-900">
                  Rail Madad Dashboard
                </h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuItem><button onClick={signOut}>Logout</button></DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>
        {/*add component to show   */}
        <main className="flex-grow p-4">{renderActiveComponent()}</main>
      </div>
    </div>
  )
}

export default RailMadadDashboardWithSidebar
