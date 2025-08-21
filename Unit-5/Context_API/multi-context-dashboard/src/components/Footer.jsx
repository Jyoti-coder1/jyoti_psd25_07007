import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

function Footer() {
  const { theme } = useContext(ThemeContext);
  return <div className={`footer ${theme}`}>© 2025 Dashboard</div>;
}

export default Footer;