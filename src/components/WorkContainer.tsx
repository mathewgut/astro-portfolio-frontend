import { useEffect, useState, createContext, useContext, type ReactElement, type ReactNode } from "react";
import MediaView from "./MediaView";
import type { ActiveItemType, PostArray, WorkArray } from "./ItemTypes";
import { motion } from "motion/react";
import { navigate } from "astro:transitions/client";
import truncateText from "./utils";


/* 

images endpoint: res =  http://localhost:1337/api/works/{documentID}?populate=*

// creates auto sizing for small, medium, large
// 

image_url = res.data.{size}.url

*/



export default function WorkContainer(){
    const [works, setWorks] = useState<WorkArray | null>(null);
    
    const [loading, setLoading] = useState<boolean>(true);
    const [loadingActive, setLoadingActive]= useState<boolean>(false);
    
    const [error, setError] = useState<any>(null);
    const [activeError, setActiveError] = useState<any>(null);
    const [mediaActive, setMediaActive] = useState<boolean>(false)
    
    const [activeItem, setActiveItem] = useState<ActiveItemType | null>(null);

    const fetchWorkItem = async (id:string) => {
        try {
            setLoadingActive(true);
            const res = await fetch("/api/work-item/" + id);
            if (!res.ok) {
                throw new Error('Failed to fetch work image');
            }
            const data = await res.json();
            setActiveItem(data.data);
            console.log(data)
        } 
        catch (err) {
            setActiveError(err); 
        } 
        finally {
            setLoadingActive(false);
        }
    };


    useEffect(() => {
        const fetchWorks = async () => {
        try {
            const res = await fetch("/api/all-works");
            if (!res.ok) {
                throw new Error('Failed to fetch posts');
            }
            const data: WorkArray = await res.json();
            setWorks(data);
           
        } 
        catch (err) {
            setError(err); 
        } 
        finally {
            setLoading(false);
            console.log(works)
        }
        };

        fetchWorks();
    }, []);
    
    
    return(
        <>
        { !loadingActive && mediaActive && activeItem?.media &&
            <MediaView media={activeItem.media} 
            active={mediaActive} setActive={setMediaActive} />
        }
        
        
        <main 
        className="flex flex-col mt-10 gap-2 pb-10 w-full h-full font-[Terminal] ">
            
            <section className="flex flex-col sm:flex-row h-full gap-2">
                <aside className="flex flex-col h-full min-h-2/5 sm:min-h-fit sm:w-1/2 sm:min-w-75 sm:max-w-120 border-2 rounded-xl px-4 overflow-y-scroll">
                    <header className="sticky top-0 z-20 bg-white flex items-center justify-center border-b-2">
                        <h2>
                            Project select
                        </h2>
                    </header>
                    <section className="flex min-h-fit gap-4 flex-col m-2">
                        {
                            loading &&
                            <p className="flex justify-center duration-200 ease-in-out animate-pulse text-neutral-600">Syncing data...</p>
                        }
                        { 
                            !loading && works?.data?.map((item,index) =>
                            <>
                                <ProjectItem key={item.id} item={item} onClickFn={fetchWorkItem} />
                            </>
                        )}
                    </section>
                </aside>
                <aside className="flex flex-col overflow-y-auto sm:w-full rounded-xl px-4 justify-start items-center text-black">
                    <section className="flex flex-col mt-2 justify-start items-center">
                        {
                            loadingActive &&
                            <p className="duration-200 ease-in-out animate-pulse text-neutral-600">Decrypting...</p>
                        }
                        
                        {
                            !loadingActive && !activeItem &&
                            <>
                                <h3>Inspector</h3>
                                <img className="h-5 w-5" alt="Magnifying glass icon" src="/search.svg" />
                            </>
                        }
                        {
                            !loadingActive && activeItem &&
                            <section className="flex flex-col justify-start items-center px-6 md:px-12 h-full">
                                <article className="flex flex-col gap-2 justify-start items-center h-fit">
                                    <p>ID: {activeItem.id}</p>
                                    <h3 className="text-xl font-semibold">{activeItem.title}</h3>
                                    <div className="flex gap-2 mb-2 text-sm">
                                        <Badge title={activeItem.type}>
                                            <img src="/folder.svg" alt="Project type icon" className="h-5 w-5" style={{ filter: "invert(1)" }} />
                                        </Badge>

                                        <Badge title={activeItem.role}>
                                            <img src="/user.svg" alt="Role icon" className="h-5 w-5" style={{ filter: "invert(1)" }} />
                                        </Badge>
                                    </div>
                                    <p className="my-6">{activeItem.description}</p>
                                    { activeItem.completed &&
                                        <span className="flex flex-col w-full">
                                            <p className="mb-1 font-semibold">
                                                Completed
                                            </p>
                                            <p className="text-xs">
                                                {new Date(activeItem.completed).toDateString()}
                                            </p>
                                        </span>

                                    }
                                    
                                    
                                    { activeItem.technologies &&
                                        <span className="flex flex-col w-full">
                                            <p className="mb-1 font-semibold">
                                                Technologies
                                            </p>
                                            <p className="text-xs">
                                                {activeItem.technologies}
                                            </p>
                                        </span>
                                    }

                                    { activeItem.link &&

                                        <Link url={activeItem.link}/>
                                        
                                    }
                                    <div className="flex gap-2">
                                        { activeItem.media &&
                                            <p onClick={() => setMediaActive(true)} className="text-black hover:underline hover:cursor-pointer">
                                                View media    
                                            </p>
                                        }
                                    
                                    </div>
                                </article>
                                
                                { activeItem.articles.length > 0 &&
                                    <BlogPosts posts={activeItem.articles} />
                                    
                                }
                            </section>

                        }
                    </section>
                </aside>
            </section>
        </main>
        </>

    )
}

function ProjectItem ({item, onClickFn}:{item:WorkArray["data"][number], onClickFn:(id:string)=>void}) {
    const colors = ["border-blue-900", "border-green-900", "border-slate-900", "border-red-900", "border-indigo-900", "border-rose-900", "border-teal-900", "border-violet-900"]
    const selectedColor = colors[Math.floor(Math.random()*colors.length)]
    const badgeDelay = 0.5;

    return(
        <motion.div
        initial={{height:0}}
        animate={{minHeight:"fit-content",height:"fit-content"}}
        transition={{
            duration:0.3,
            ease:"easeInOut",
            }}
        whileInView="visible"
        viewport={{ once: true }}
        onClick={() => onClickFn(item.documentId)} 
        className={`flex flex-col justify-end px-4 py-2 ${selectedColor} border-b-2 hover:border-b-4 h-30 w-full col-span-1 text-black hover:cursor-pointer ease-in-out duration-200 hover:scale-105 hover:pb-4`}>
            <motion.h2 
                initial={{opacity:0}}
                animate={{opacity:1}}
                transition={{
                    delay:0.3,
                    repeat:0,
                    duration:0.3
                }}
                
            className="text-xl pb-2">
                {item.title}

            </motion.h2>
            <div className="flex gap-2 capitalize text-sm text-white">
                <Badge delay={badgeDelay} title={item.type}>
                    <img src="/folder.svg" alt="Project icon" className="h-5 w-5" style={{ filter: "invert(1)" }} />
                </Badge>
                
                <Badge delay={badgeDelay} title={item.role}>
                    <img src="/user.svg" alt="Role icon" className="h-5 w-5" style={{ filter: "invert(1)" }} />
                </Badge>
            </div>
        </motion.div>
    )
}

export function Badge({title, children, delay=0}:{title:string, children:ReactNode, delay?:number}){
    return(
        <motion.span 
        initial={{
            opacity:0
        }}
        animate={{opacity:1}}
        transition={{
            delay:delay,
            duration:delay
        }}
        className="flex gap-1 capitalize text-sm justify-center items-center text-white bg-black py-1 px-3 rounded-lg hover:cursor-default">
            {children}
            <p className="text-xs">
                {title}
            </p>
        </motion.span>
    )
}

function BlogPosts({posts}:{posts:PostArray["data"]}){
    
    return(
        <section className="flex flex-col mt-4 w-3/4">
            <h3 className="font-semibold">
                Associated Posts
            </h3>
            <section className="flex flex-col text-black overflow-y-scroll p-4 h-50">
                {posts.map((item,index) => 
                    <div onClick={() => navigate("/posts/view/"+item.documentId)} 
                    className=" border-2 rounded-lg p-4 hover:cursor-pointer hover:underline hover:scale-105 ease-in-out duration-150">
                        <h4 className="font-semibold">
                            {item.title}
                        </h4>
                        <p className="text-sm">
                            {truncateText(item.body,30)}
                        </p>
                    </div>
                )}
            </section>
        </section>
    )
}

function Link({url}:{url:string}){
    return(
        <span className="group flex gap-2 items-center w-full h-fit underline hover:cursor-pointer px-1 py-2 hover:bg-black hover:text-white text-sm">
            <img className="h-5 w-5 group-hover:invert-100" src="/link.svg"></img>
            <a referrerPolicy="no-referrer" href={url}>{url}</a>
        </span>
    )
}