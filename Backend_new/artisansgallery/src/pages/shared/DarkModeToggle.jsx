import React, { useState, useEffect } from "react";

const DarkModeToggle = () => {
  const [darkMode, setDarkMode] = useState(false);

  // Function to toggle the dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Save the user's preference in local storage
  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  // Check if the user has a dark mode preference in local storage
  useEffect(() => {
    const storedDarkMode = JSON.parse(localStorage.getItem("darkMode"));
    if (storedDarkMode !== null) {
      setDarkMode(storedDarkMode);
    }
  }, []);

  // Apply dark mode styles to the root element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark-mode");
    } else {
      document.documentElement.classList.remove("dark-mode");
    }
  }, [darkMode]);

  return (
    <button onClick={toggleDarkMode}>
      {darkMode ? "Disable Dark Mode" : "Enable Dark Mode"}
    </button>
  );
};

export default DarkModeToggle;
