import { useEffect, useState, type ReactNode } from "react";
import type { ActiveItemType, PostArray, WorkArray } from "./ItemTypes";
import { motion } from "motion/react";
import { navigate } from "astro:transitions/client";
import truncateText from "./utils";

export default function WorkContainer(){
    const [works, setWorks] = useState<WorkArray | null>(null);
    
    const [loading, setLoading] = useState<boolean>(true);
    const [loadingActive, setLoadingActive]= useState<boolean>(false);
    
    const [error, setError] = useState<any>(null);
    const [activeError, setActiveError] = useState<any>(null);
    const [mediaActive, setMediaActive] = useState<boolean>(false);
    
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
            <ProjectSelect loading={loading} works={works} fetchWorkItem={fetchWorkItem} />
        </>

    )
}

function ProjectSelect({loading, works, fetchWorkItem}:{loading:boolean, works:WorkArray | null, fetchWorkItem:(id:string)=>void}){
    const [timeoutOpacity, setTimeoutOpacity] = useState<number>(0);
    const headerTextStyles = "text-xs flex gap-2 items-center";

    useEffect(() => {
        const timeout = setTimeout(() => {
            setTimeoutOpacity(1);
        }, 500);
        return () => clearTimeout(timeout);
    }, []);
    
    return(
        <main className="flex flex-col min-h-svh w-svh rounded-xl px-4">
            <header className="mb-6">
            <h1 className="mt-6 mb-2 px-4 py-2 bg-black w-fit text-white text-lg sm:text-3xl">
                // PROJECT_DIRECTORY
            </h1>
            { loading &&
                <p className={headerTextStyles}>Retrieving projects...</p>
            }
            { !loading &&
                <div className={headerTextStyles}>
                    {loading && "Loading projects..." }
                    {!loading && "Success."} 
                    <span className="ease-in-out duration-500 delay-200" style={{opacity: timeoutOpacity}}>
                        {works?.data.length} projects found.
                    </span>
                </div>
            }
            
            </header>
            <section className="flex min-h-fit gap-4 flex-col m-2 pb-2">
                { 
                    works?.data?.map((item,index) =>
                    <motion.div
                    initial={{opacity:0, y:20}}
                    animate={{opacity:1, y:0}}
                    transition={{delay: index * 0.2, duration:0.3}}
                    >
                        <ProjectItem key={item.id} item={item} onClickFn={(id:string) => navigate("works/"+id)} />
                    </motion.div>
                )}
            </section>
        </main>
    )
}

function ProjectItem ({item, onClickFn}:{item:WorkArray["data"][number], onClickFn:(id:string)=>void}) {
    const colors = ["border-blue-900", "border-green-900", "border-slate-900", "border-red-900", "border-indigo-900", "border-rose-900", "border-teal-900", "border-violet-900"]
    const selectedColor = colors[Math.floor(Math.random()*colors.length)]
    const badgeDelay = 0;

    return(
        <div
        onClick={() => onClickFn(item.documentId)} 
        className={`flex flex-col justify-end px-4 py-2 ${selectedColor} border-b-2 hover:border-b-4 w-full col-span-1 text-black hover:cursor-pointer ease-in-out duration-200 hover:scale-105 hover:pb-4`}>
            <h2
            className="text-xl pb-2">
               [ {item.title} ]

            </h2>
            <p className="text-sm font-[jetbrains-mono] text-neutral-800">
                {truncateText(item.description, 125) }
            </p>
            
            <div className="flex items-center justify-center gap-6 sm:items-baseline sm:flex-col sm:gap-0 ">
                
            <div className="flex flex-col sm:flex-row sm:gap-6 mt-6 mb-2 sm:mb-0 capitalize text-sm items-center hover:cursor-pointer">
                <p className="text-black mb-2 sm:mb-0">// TAGS</p>
                <div className="flex flex-col sm:flex-row gap-2">
                    <Badge delay={badgeDelay} title={item.type}>
                        <img src="/folder.svg" alt="Project icon" className="h-4 w-4" />
                    </Badge>
                    
                    <Badge delay={badgeDelay} title={item.role}>
                        <img src="/user.svg" alt="Role icon" className="h-4 w-4" />
                    </Badge>
                </div>
                
            </div>
            <div className="flex flex-col sm:flex-row justify-center sm:gap-4 text-sm mt-2">
                    <p className="text-left w-fit whitespace-nowrap mb-2 sm:mb-0">// STACK</p>
                    <ul className="text-xs flex flex-col gap-1 items-center justify-center sm:pl-0 sm:flex-row sm:gap-4">
                        { item.technologies &&
                            item.technologies.split(",").map((tech, index) =>
                                <li>{tech}</li>
                            )
                        }
                    </ul>
                    
                </div>
            </div>
            
        </div>
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
        className="flex gap-1 capitalize text-xs justify-center items-center text-black border-2 border-black py-1 px-2.5 rounded-lg hover:cursor-default">
            {children}
            <p className="text-xs">
                {title}
            </p>
        </motion.span>
    )
}

function BlogPosts({posts}:{posts:PostArray["data"]}){
    
    return(
        <section className="flex flex-col mt-4 md:w-3/4">
            <h3 className="flex items-center justify-center md:justify-start font-semibold">
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
        <a href={url} referrerPolicy="no-referrer" className="group flex gap-2 items-center justify-center w-full h-fit underline hover:cursor-pointer px-1 py-2 hover:bg-black hover:text-white text-sm">
            <img className="h-5 w-5 group-hover:invert-100" alt="link icon" src="/link.svg"></img>
            <p>{url}</p>
        </a>
    )
}

function ProjectStatus({isActive}:{isActive:boolean}){
    return(
        <div className={`flex justify-center items-center gap-2 px-2 py-1 rounded-md text-xs font-semibold ${isActive ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"}`}>
            {isActive ? "ACTIVE" : "INACTIVE"}
        </div>
    )
}