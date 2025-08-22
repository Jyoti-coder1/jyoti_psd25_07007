import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {
    const [posts, setPosts] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        fetch("https://dummyjson.com/posts?limit=100")
            .then((res) => res.json())
            .then((data) => setPosts(data.posts || []))
            .catch((err) => console.error("Error fetching posts:", err));
    }, []);

    const filtered = posts.filter(
        (p) =>
            p.title &&
            p.title.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <section>
            <div className="searchbar">
                <input
                    type="text"
                    placeholder="Search by title..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            {filtered.length === 0 ? (
                <p>No posts found.</p>
            ) : (
                <ul className="postlist">
                    {filtered.map((post) => (
                        <li key={post.id} className="postcard">
                        <h3>
                        <Link to={`/post/${post.id}`}>{post.title}</Link>
                   </h3>
                <p>{post.body.slice(0, 100)}...</p>
            </li>
            ))}
        </ul>
    )
}
    </section >
  );
}