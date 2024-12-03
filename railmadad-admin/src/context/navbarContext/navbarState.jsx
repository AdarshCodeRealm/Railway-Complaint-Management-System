import { navContext } from "./navbarContext";
import { useState } from "react";
const NavStateProvider = (props) => {
  const s1 = {
    navShrinkState: false,
    activeElement: "dashboard"
}
  const [state, setState] = useState(s1);
  const updateActiveElement = (element) => {
    setState({ ...state, activeElement: element });
  }
  const updatenavShrinkState = () => {
    setState({ ...state, navShrinkState: !state.navShrinkState });
  }
  return (
    <navContext.Provider value={{state, updateActiveElement, updatenavShrinkState}}>
      {props.children}
    </navContext.Provider>
  );
};

export default NavStateProvider;