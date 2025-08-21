import { useContext } from "react";
import { NotificationContext } from "./NotificationContext";

function NotificationList() {
    const { notifications } = useContext(NotificationContext);

    return (
        <div>
            <h2>Notifications</h2>
            {notifications.length === 0 && <p>No notifications yet.</p>}
            <ul className="notification-list">
                {notifications.map((n) => (
                    <li
                        key={n.id}
                        className={n.read ? "notification read" : "notification unread"}
                    >
                        {n.message}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default NotificationList;