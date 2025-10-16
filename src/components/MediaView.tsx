import { useState, type Dispatch, type SetStateAction } from "react";
import type { ActiveItemType, DocumentImage } from "./ItemTypes";
import { apiEndpoint, domainEndpoint } from "./utils";

// for strapi images
export default function MediaView({media, active, setActive, mediaIndex=0}:{media:DocumentImage[], active:boolean, setActive:Dispatch<SetStateAction<boolean>>, mediaIndex?:number}){
    const  [indexNumber, setIndexNumber] = useState<number>(mediaIndex);
    
    return(
        <main className="fixed flex flex-col top-0 gap-5 z-50 justify-center items-center h-svh w-svw backdrop-blur-md bg-black/30">
            <img onClick={() => setActive(false)} className="absolute top-7.5 right-7.5 h-7 w-7 hover:cursor-pointer" src="/x.svg" alt="close media button"/>
            <img className="w-[80%] hover:cursor-zoom-in" src={domainEndpoint+media[indexNumber].url} alt={media[indexNumber].alternativeText} />
            <span className="flex gap-2">
                { 
                    media.map((item,index) => 
                        <div key={index} onClick={(e) => setIndexNumber(Number(e.currentTarget.id))} id={String(index)} className="bg-black w-5 h-5 " />
                    )
                
                }
            </span>
        
        </main>
    )
}