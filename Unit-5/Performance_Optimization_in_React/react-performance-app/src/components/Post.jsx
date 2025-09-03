import React, { useMemo } from "react";

function Post({ id, title, body, verifyPost, toggleVerify, index }) {
    const bgColor = useMemo(() => {
        if (index === 0) return "lightgreen";
        if (index === 1) return "red";
        if (index === 2) return "lightblue";
        return `hsl(${Math.random() * 360}, 60%, 70%)`;
    }, [index]);

    return (
        <div className="post" style={{ background: bgColor }}>
            <h4>{title}</h4>
            <p>{body}</p>
            <button onClick={() => toggleVerify(id)}>
                {verifyPost ? "Verified" : "Verify"}
            </button>
        </div>
    );
}
export default React.memo(Post);