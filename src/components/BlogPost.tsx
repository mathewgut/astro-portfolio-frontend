import react from "react";
import { useEffect, useState } from "react";
import truncateText from "../components/utils";
import {motion, useAnimation} from "motion/react";

interface Post {
    data: {
        id: number;
        documentID: number; 
        title: string;
        category: "Tips"|"News"|"Opinion"|"Project Update"|"Post Mortem"|"Release";
        body: string;
        createdAt: Date;
        updatedAt: Date;
        publishedAt: Date;
    };
    meta: {}
}


export default function BlogPost() {
    
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<any>(null);
    const [hovered, setHovered] = useState(false);
    const [post, setPost] = useState<any | null>(null);

    useEffect(() => {
        const fetchPosts = async () => {
        try {
            const res = await fetch("/api/all-posts");
            if (!res.ok) {
                throw new Error('Failed to fetch posts');
            }
            const data: Post = await res.json();
            setPost(data);
            console.log(data);
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
    return (

    )

}