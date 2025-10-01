
import { useEffect, useState } from "react";

interface Post {
  id: number;
  title: string;
  content: string;
}

export default function BlogContainer() {
    const [posts, setPosts] = useState<Post[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<any>(null);


    useEffect(() => {
        const fetchPosts = async () => {
        try {
            const res = await fetch("/api/posts");
            if (!res.ok) {
                throw new Error('Failed to fetch posts');
            }
            const data: Post[] = await res.json();
            setPosts(data);
        } 
        catch (err) {
            setError(err); 
        } 
        finally {
            setLoading(false);
        }
        };

        fetchPosts();
    }, []);
    return(
        <section>
            {loading && <p>Loading posts...</p>}
        </section>
    )
}

