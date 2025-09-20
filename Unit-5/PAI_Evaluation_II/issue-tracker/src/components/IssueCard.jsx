import React from  "react";

const IssueCard = React.memo(({ issue }) => {
    return (
        <div className="issue-card">
            <h3>
                #{issue.number} - {issue.title}
            </h3>
            <p>Author: {issue.user.login}</p>
            <p>
                Labels:{" "}
                {issue.labels.map((label) => (
                    <span key={label.id} className="label">
                        {label.name}
                    </span>
                ))}
            </p>
            <p>Status: {issue.state}</p>
        </div>
    );
})

export default IssueCard;