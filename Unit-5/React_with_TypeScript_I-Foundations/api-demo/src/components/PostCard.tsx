import type { Post } from "../context/PostContext";

function PostCard({ post }: { post: Post }) {
    return (
        <div style={{ border: "1px solid gray", padding: "10px", marginBottom: "10px" }}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
        </div>
    );
}

export default PostCard;