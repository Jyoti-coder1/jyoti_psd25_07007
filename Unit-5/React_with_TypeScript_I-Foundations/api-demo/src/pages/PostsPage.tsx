import { useContext } from "react";
import { PostContext } from "../context/PostContext";
import PostCard from "../components/PostCard";

function PostsPage() {
    const { posts } = useContext(PostContext);

    return (
        <div>
            <h2>Posts</h2>
            {posts.length === 0 ? (
                <p>Loading...</p>
            ) : (
                posts.slice(0, 10).map((post) => <PostCard key={post.id} post={post} />)
            )}
        </div>
    );
}

export default PostsPage;