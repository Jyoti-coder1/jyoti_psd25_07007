import { createContext, useState, useEffect } from "react";

export interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
}

export const PostContext = createContext<{ posts: Post[] }>({ posts: [] });

export function PostProvider(props: { children: React.ReactNode }) {
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/posts")
            .then((res) => res.json())
            .then((data: Post[]) => setPosts(data))
            .catch((err) => console.error("Error fetching posts:", err));
    }, []);

    return (
        <PostContext.Provider value={{ posts }}>
            {props.children}
        </PostContext.Provider>
    );
}