import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function PostDetails() {
    const { id } = useParams();
    const [post, setPost] = useState(null);

    useEffect(() => {
        fetch(`https://dummyjson.com/posts/${id}`)
        .then((res) => res.json())
        .then((data) => setPost(data))
        .catch((err) => console.error("Error fetching post:", err));
    }, [id]);
    if (!post) return <p>Loading post...</p>;

    return (
        <article className="postdetails">
            <Link to="/" className="backlink">← Back to Home</Link>
            <h1>{post.title}</h1>
            <p className="body">{post.body}</p>
            <div className="tags">
                {post.tags?.map((t) => (
                    <span key={t} className="tag">#{t}</span>
                ))}
            </div>
        </article>
    );
}