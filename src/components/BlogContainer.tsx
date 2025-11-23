import { useEffect, useState } from "react";
import truncateText from "../components/utils";
import {motion, useAnimation} from "motion/react";
import type { PostArray } from "./ItemTypes";


export default function BlogContainer() {
    const [posts, setPosts] = useState<PostArray | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<any>(null);

    useEffect(() => {
        const fetchPosts = async () => {
        try {
            const res = await fetch("/api/all-posts");
            if (!res.ok) {
                throw new Error('Failed to fetch posts');
            }
            const data: PostArray = await res.json();
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
        <section className="flex flex-col h-full font-[terminal] lg:px-12 md:px-10 sm:px-6 px-4 py-8 max-w-4xl mx-auto bg-gradient-to-br">
            {loading &&
            <>
                <article className="flex h-full flex-col justify-center items-center gap-2 animate-pulse">
                    <p>Syncing with satellite...</p>
                </article>
                
            </>
            }

            {error &&
                <article className="flex h-full flex-col justify-center items-center animate-bounce">
                    <p>Uplink failed (try again later)</p>
                    <img className="h-5 w-5" src="/x.svg" />
                </article>
            }

            {posts && posts.data.length == 0 &&
                <article className="flex h-full flex-col justify-center items-center animate-bounce">
                    <p>No posts published</p>
                    <img className="h-5 w-5" src="/x.svg" />
                </article>
            }

            { posts && posts.data.length > 0 && 
                   <section className="flex flex-col gap-6">
                   {
                    posts.data.map((post) => 
                        <a key={post.id} href={"/posts/view/" + post.documentId}>
                            <PostPreview post={post} />
                        </a>
                    )
                    }
                   </section> 
            }
        </section>
    )
}

export function Tag({category}:{category:string}) {
    return(
        <span className="flex items-center justify-center text-xs mt-2 px-2 py-1 border w-fit border-black rounded-md">{category}</span>
    )
}

function PostPreview({post}:{post:any}) {
    const [hovered, setHovered] = useState(false);

    return(
        <motion.article 
            onHoverStart={() => setHovered(true)}
            onHoverEnd={() => setHovered(false)}
            whileHover={{ 
                scale: 1.05,
                borderBottomWidth: "4px",
                }}
            transition={{ 
                duration: 0.2,
                type: "tween", 
                ease: "easeInOut", 
                repeat: 0,
            }}

            key={post.id} className="flex flex-col py-4 px-1 text-black border-b border-black hover:cursor-pointer">
                <div>
                    <time className="text-xs text-gray-600">{new Date(post.publishedAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric"
                    })}
                    </time>
                </div>
                
                <DecodedTitle text={post.title} />
                <motion.p
                whileInView={{opacity: [0,1,0,0,1,8,0,1]}}
                viewport={{ once: true }}
                transition={{ 
                duration: 1.2,
                type: "tween", 
                ease: "easeInOut", 
                repeat: 0,
                }} 
                className="text-sm font-[jetbrains-mono] text-neutral-800">
                    {truncateText(post.description, hovered ? 150 : 80)}
                </motion.p>
                <Tag category={post.category} />
            
        </motion.article>
    )
     
}



function DecodedTitle({ text }: { text: string }) {
    const [displayed, setDisplayed] = useState(""); // stores the currently 'decoded' text
    const controls = useAnimation();
    const [hasAnimated, setHasAnimated] = useState(false);

    useEffect(() => {
        if (!hasAnimated) {
            controls.start("visible");
        }
    }, [controls, hasAnimated]);

    const handleInView = () => {
        if (hasAnimated) return;
        let frame = 0;
        let revealed = "";
        let raf: number;
        const chars =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*:;,.?";
        function decode() {
            if (frame < text.length) {
                revealed = text
                    .split("")
                    .map((c, i) =>
                        i < frame
                            ? c
                            : chars[Math.floor(Math.random() * chars.length)]
                    )
                    .join("");
                setDisplayed(revealed);
                frame++;
                raf = window.setTimeout(decode, 40);
            } else {
                setDisplayed(text);
                setHasAnimated(true);
            }
        }
        decode();
        return () => clearTimeout(raf);
    };

    return (
        <motion.h2
            className="text-xl font-semibold mb-2 font-[vcr] max-w-full break-words"
            aria-label={text}
            initial="hidden"
            animate={controls}
            variants={{
                hidden: {},
                visible: {},
            }}
            transition={{ease: "easeInOut"}}
            viewport={{ once: true, amount: 0.8 }}
            onViewportEnter={handleInView}
        >
            {displayed}
        </motion.h2>
    );
}
