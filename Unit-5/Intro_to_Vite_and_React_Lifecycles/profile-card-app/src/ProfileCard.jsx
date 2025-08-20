import React from "react";
function ProfileCard({
    name = "Anonymous User",
    age = "N/A",
    bio = "No biography available.",
}) {
    const truncatedBio =
        bio.length > 100 ? bio.substring(0, 100) + "… Read More" : bio;
    const cardStyle = {
        border: "1px solid #ddd",
        borderRadius: "12px",
        padding: "16px",
        width: "280px",
        boxShadow: "0px 4px 8px rgba(0,0,0,0.1)",
        fontFamily: "Arial, sans-serif",
        margin: "10px auto",
        backgroundColor: "#fff",
    };
    const nameStyle = {
        fontSize: "20px",
        fontWeight: "bold",
        marginBottom: "8px",
    };
    const ageStyle = {
        fontSize: "14px",
        color: "#555",
        marginBottom: "12px",
    };
    const bioStyle = {
        fontSize: "14px",
        color: "#333",
    };
    return (
        <div style={cardStyle}>
            <div style={nameStyle}>{name}</div>
            <div style={ageStyle}>Age: {age}</div>
            <div style={bioStyle}>{truncatedBio}</div>
        </div>
    );
}
export default ProfileCard;