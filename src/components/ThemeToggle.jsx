import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from 'react';
import { cn } from "@/lib/utils";

export const ThemeToggle = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    // Check the saved theme preference in localStorage when the component mounts
    // and set the initial state accordingly
    useEffect(() => {
        // Check the saved theme preference in localStorage
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme === "dark") {
            document.documentElement.classList.add("dark");
            setIsDarkMode(true);
        } else {
            document.documentElement.classList.remove("dark");
            setIsDarkMode(false);
        }
    }, []);

    const toggleTheme = () => {
        if (isDarkMode) {
            // Toggle to light mode
            document.documentElement.classList.remove("dark");
            // Save the theme preference in localStorage to persist it when reloading the page
            localStorage.setItem("theme", "light");
            setIsDarkMode(false);
        }
        else {
            // Toggle to dark mode
            document.documentElement.classList.add("dark");
            // Save the theme preference in localStorage to persist it when reloading the page
            localStorage.setItem("theme", "dark");
            setIsDarkMode(true);
        }
    };

    return (
        <button onClick={toggleTheme} className={cn(
            "p-2 rounded-full transition-colors duration-300",
            "focus:outline-none"
        )}> 
            {!isDarkMode ? (
                <Sun className="h-6 w-6 text-yellow-300"/> 
            ) : (
                <Moon className="h-6 w-6 text-blue-900" />
            )}
        </button>
    );
}