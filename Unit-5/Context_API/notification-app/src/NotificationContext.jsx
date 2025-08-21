import { createContext, useState, useEffect } from "react";

export const NotificationContext = createContext();

export function NotificationProvider({ children }) {
    const [notifications, setNotifications] = useState([]);
    const [intervalId, setIntervalId] = useState(null);

    // Play a sound
    const playSound = () => {
        const audio = new Audio(
            "https://www.fesliyanstudios.com/play-mp3/4386" // short beep sound
        );
        audio.play();
    };

    // Function to add a new notification
    const addNotification = (message) => {
        const newNotification = {
            id: Date.now(),
            message,
            read: false,
        };
        setNotifications((prev) => [newNotification, ...prev]);
        playSound(); // 🔊 play sound on new notification
    };

    // Function to mark all as read
    const markAllAsRead = () => {
        setNotifications((prev) =>
            prev.map((n) => ({ ...n, read: true }))
        );
    };

    // Function to stop notifications
    const stopNotifications = () => {
        if (intervalId) {
            clearInterval(intervalId);
            setIntervalId(null);
        }
    };

    // Simulate real-time notifications every 5s
    useEffect(() => {
        const id = setInterval(() => {
            addNotification("You have a new message!");
        }, 5000);

        setIntervalId(id);

        return () => clearInterval(id); // cleanup
    }, []);

    return (
        <NotificationContext.Provider
            value={{
                notifications,
                addNotification,
                markAllAsRead,
                stopNotifications,
            }}
        >
            {children}
        </NotificationContext.Provider>
    );
}