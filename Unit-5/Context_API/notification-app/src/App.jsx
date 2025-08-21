import { useContext } from "react";
import { NotificationProvider, NotificationContext } from "./NotificationContext";
import NotificationList from "./NotificationList";
import "./App.css";

function Controls() {
  const { markAllAsRead, stopNotifications } = useContext(NotificationContext);

  return (
    <div className="controls">
      <button onClick={markAllAsRead}>Mark All as Read</button>
      <button onClick={stopNotifications}>Stop Notifications</button>
    </div>
  );
}

function App() {
  return (
    <NotificationProvider>
      <div className="app">
        <h1>Real-time Notification Panel</h1>
        <NotificationList />
        <Controls />
      </div>
    </NotificationProvider>
  );
}

export default App;