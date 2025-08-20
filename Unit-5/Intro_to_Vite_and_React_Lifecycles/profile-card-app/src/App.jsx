import React from "react";
import ProfileCard from "./ProfileCard";

function App() {
  return (
    <div>
      <ProfileCard
        name="Jyoti Maan"
        age={24}
        bio="Jyoti is a software engineer with over 2 years of experience in full stack development. She enjoys building user-friendly web applications and mentoring junior developers."
      />
      <ProfileCard age={22} />
    </div>
  );
}
export default App;
