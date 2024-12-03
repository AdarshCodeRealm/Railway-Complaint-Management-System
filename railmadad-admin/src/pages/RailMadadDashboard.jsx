import RailLogo from "../assets/logo-railmadad.png"
import {
  Bell,
  User,
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
} from "@/components/ui/dropdown-menu";
import { useContext } from "react"
import GrievanceSection from "@/components/Sections/Grievance Section/GrievanceSection"
import { signOut } from "../Config"
import { navContext } from "@/context/navbarContext/navbarContext";
import NavbarSection from "@/components/NavbarSection";
function RailMadadDashboardWithSidebar() {
  const {state} = useContext(navContext);

  const renderActiveComponent = () => {
    switch (state.activeElement) {
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

      <NavbarSection />

      {/* Main Content */}
      <div className="flex-1 flex  flex-col  overflow-hidden">
        <header className="bg-white  shadow-sm">
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
