import { useEffect, useState } from "react";
import truncateText from "../components/utils";
import {motion} from "motion/react";

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
    }[];
    meta: {}
    
}



export default function BlogContainer() {
    const [posts, setPosts] = useState<Post | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<any>(null);
    const [hovered, setHovered] = useState(false);


    useEffect(() => {
        const fetchPosts = async () => {
        try {
            const res = await fetch("/api/posts");
            if (!res.ok) {
                throw new Error('Failed to fetch posts');
            }
            const data: Post = await res.json();
            setPosts(data);
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
    return(
        <section className="flex flex-col h-full font-[terminal] lg:px-12 md:px-10 sm:px-6 px-4 py-8 max-w-4xl mx-auto">
            {loading &&
                <article className="flex h-full flex-col justify-center items-center gap-2 animate-pulse">
                    <p>Syncing with satellite...</p>
                </article>
                
            }
            { posts && posts.data.length > 0 && 
                   <section className="flex flex-col gap-6">
                   {
                    posts.data.map((post) => 
                        <motion.article 
                            onHoverStart={() => setHovered(true)}
                            onHoverEnd={() => setHovered(false)}
                            key={post.id} className="flex flex-col py-4 px-1 text-black border-b border-black hover:cursor-pointer">
                                <h2 className="text-2xl mb-2">{post.title}</h2>
                                <p className="text-sm">{truncateText(post.body, 80)}</p>
                                <Tag category={post.category} />
                            
                        </motion.article>
                    )
                    }
                   </section> 
                
               
                

            }
        </section>
    )
}

function Tag({category}:{category:string}) {
    return(
        <span className="text-xs mt-2 px-2 py-1 border w-fit border-black rounded-md">{category}</span>
    )
}
