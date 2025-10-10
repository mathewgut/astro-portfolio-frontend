import { useEffect, useState } from "react";


/* 

images endpoint: res =  http://localhost:1337/api/works/{documentID}?populate=*

// creates auto sizing for small, medium, large
// 

image_url = res.data.{size}.url

*/
interface WorkArray {
    data: {
        id: number;
        documentId: string; 
        title: string;
        type: "fullstack"|"frontend"|"backend"|"api"|"game"|"cli"|"chatbot"|"other";
        role: "all"|"lead developer"|"developer"|"lead designer"|"designer"|"owner"|"organizer"|"artist";
        description: string;
        is_active: boolean;
        completed: Date;
        media:string[];
        createdAt: Date;
        updatedAt: Date;
        publishedAt: Date;
    }[];
    meta: {}
}

export default function WorkContainer(){
    const [works, setWorks] = useState<WorkArray | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<any>(null);
    const [hovered, setHovered] = useState(false);

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
        <main 
        className="flex flex-col mt-10 gap-2 pb-10 w-full h-full font-[Terminal] ">
            <section className="flex h-full gap-2">
                <aside className="flex flex-col h-full min-h-fit w-1/2 border-2 rounded-xl px-4 overflow-y-scroll">
                    <header className="sticky top-0 z-30 bg-white flex items-center justify-center border-b-2">
                        <h2>
                            Project select
                        </h2>
                    </header>
                    <section className="flex min-h-fit gap-2 flex-col m-2">
                        { works?.data?.map((item,index) =>
                            <>
                                <ProjectItem item={item} />
                                <ProjectItem item={item} />
                                <ProjectItem item={item} />
                                <ProjectItem item={item} />


                            </>
                        )}
                    </section>
                </aside>
                <aside className="flex flex-col h-full w-1/2 rounded-xl px-4 justify-center items-center text-black">
                    <section className="flex flex-col mt-2 justify-center items-center">
                        <h3>Inspector</h3>
                        <img className="h-5 w-5" src="/search.svg" />
                    </section>
                </aside>
            </section>
        </main>
    )
}

function ProjectItem ({item}:{item:WorkArray["data"][number]}) {
    const colors = ["border-blue-900", "border-green-900", "border-slate-900", "border-red-900", "border-indigo-900", "border-rose-900", "border-teal-900", "border-violet-900"]

    const selectedColor = colors[Math.floor(Math.random()*colors.length)]

    return(
        <div 
        className={`flex flex-col justify-end px-4 py-2 ${selectedColor} border-b-2 hover:border-b-4 h-30 w-full col-span-1 text-black hover:cursor-pointer ease-in-out duration-200 hover:scale-105 hover:pb-4`}>
            <h2 className="text-xl pb-2">{item.title}</h2>
            <div className="flex gap-2 capitalize text-sm text-white">
                <p className="">
                    <span className="flex gap-1 justify-center items-center text-white bg-black py-1 px-2 rounded-lg">
                    <img src="/folder.svg" className="h-5 w-5" style={{ filter: "invert(1)" }} />
                    {item.type}
                    </span>
                </p>
                <p className="">
                    <span className="flex gap-1 justify-center items-center text-white bg-black py-1 px-2 rounded-lg">
                    <img src="/user.svg" className="h-5 w-5" style={{ filter: "invert(1)" }} />
                        Developer
                    </span>
                </p>
            </div>
        </div>
    )
}



function InfoItem (){
    return(
        <article className="flex justify-center items-center rounded-xl w-full bg-black row-span-2">
            <h2 className="text-2xl text-white">
                Work
            </h2>
        </article>
    )
}

function FilterItem(){
    return(
        <article className="h-full w-full rounded-xl col-span-1 bg-white text-black border-2 border-black">
            <h2>filter</h2>
        </article>
    )
}