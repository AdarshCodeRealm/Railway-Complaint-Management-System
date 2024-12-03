import { useContext } from "react"
import { navContext } from "../context/navbarContext/navbarContext"
import { Menu, Home, FileText, Settings, HelpCircle, UserPlus} from "lucide-react"
const NavbarSection = () => {
  const { state, updatenavShrinkState, updateActiveElement } = useContext(navContext);
  return (
    <div>
      <aside
        className={`bg-indigo-700 text-white min-h-screen p-4 ${state.navShrinkState ? "w-64" : "w-16"}`}
      >
        <nav>
          <ul className="space-y-2">
            <li>
              <button
                onClick={updatenavShrinkState}
                className="flex items-center space-x-2 p-2 hover:bg-indigo-600 rounded"
              >
                <Menu className="h-5 w-5" />
                <span
                  className={`${state.navShrinkState ? "" : "hidden"}`}
                ></span>
                <span
                  className={`${state.navShrinkState ? "" : "hidden"} font-bold text-lg`}
                >
                  Rail Madad Admin
                </span>
              </button>
            </li>
            <li>
              <button
                onClick={() => updateActiveElement("dashboard")}
                className={`flex items-center space-x-2 p-2 hover:bg-indigo-600 rounded ${
                  state.activeElement === "dashboard" ? "bg-indigo-800" : ""
                }`}
              >
                <Home className="h-5 w-5" />
                <span className={`${state.navShrinkState ? "" : "hidden"}`}>
                  Dashboard
                </span>
              </button>
            </li>
            <li>
              <button
                onClick={() => updateActiveElement("complaints")}
                className={`flex items-center space-x-2 p-2 hover:bg-indigo-600 rounded ${
                  state.activeElement === "complaints" ? "bg-indigo-800" : ""
                }`}
              >
                <FileText className="h-5 w-5" />
                <span className={`${state.navShrinkState ? "" : "hidden"}`}>
                  Complaints
                </span>
              </button>
            </li>
            <li>
              <button
                onClick={() => updateActiveElement("staff")}
                className={`flex items-center space-x-2 p-2 hover:bg-indigo-600 rounded ${
                  state.activeElement === "staff" ? "bg-indigo-800" : ""
                }`}
              >
                <UserPlus className="h-5 w-5" />
                <span className={`${state.navShrinkState ? "" : "hidden"}`}>
                  Staff
                </span>
              </button>
            </li>
            <li>
              <button
                onClick={() => updateActiveElement("settings")}
                className={`flex items-center space-x-2 p-2 hover:bg-indigo-600 rounded ${
                  state.activeElement === "settings" ? "bg-indigo-800" : ""
                }`}
              >
                <Settings className="h-5 w-5" />
                <span className={`${state.navShrinkState ? "" : "hidden"}`}>
                  Settings
                </span>
              </button>
            </li>
            <li>
              <button
                onClick={() => updateActiveElement("help")}
                className={`flex items-center space-x-2 p-2 hover:bg-indigo-600 rounded ${
                  state.activeElement === "help" ? "bg-indigo-800" : ""
                }`}
              >
                <HelpCircle className="h-5 w-5" />
                <span className={`${state.navShrinkState ? "" : "hidden"}`}>
                  Help
                </span>
              </button>
            </li>
          </ul>
        </nav>
      </aside>
    </div>
  )
}

export default NavbarSection
