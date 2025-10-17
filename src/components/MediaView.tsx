import { useState, type Dispatch, type SetStateAction } from "react";
import type { DocumentImage } from "./ItemTypes";
import { domainEndpoint } from "./utils";

// for strapi media
export default function MediaView({media, active, setActive, mediaIndex=0}:{media:DocumentImage[], active:boolean, setActive:Dispatch<SetStateAction<boolean>>, mediaIndex?:number}){
    const [indexNumber, setIndexNumber] = useState<number>(mediaIndex);
    const [metaActive, setMetaActive] = useState<boolean>(false);

    const imgExtensions = [".png", ".jpg", ".jpeg", ".gif", ".bmp", ".webp", ".svg", ".tiff", ".ico", ".avif"];
    const vidExtensions = [".mp4", ".webm", ".ogg", ".mov", ".avi", ".wmv", ".flv", ".mkv", ".m4v", ".3gp"];
    return(
        <main className="fixed flex flex-col top-0 gap-5 z-50 justify-center items-center h-svh w-svw backdrop-blur-md bg-black/30">
        <img onClick={() => setActive(false)} className="absolute top-7.5 right-7.5 h-7 w-7 hover:cursor-pointer" src="/x.svg" alt="close media button"/>
            
            <button type="button" 
            onClick={() => setMetaActive(!metaActive)}
            className="flex bg-black px-2 py-1 gap-2 rounded-md text-white text-sm justify-center items-center hover:cursor-pointer">
            
                { metaActive &&
                    <>
                        <img src="/image.svg" alt="media icon"
                        className="h-4 w-4" style={{ filter: "invert(1)" }}
                        />
                        <p>Return to media</p>
                    </>
                }
                {!metaActive &&
                    <>
                        <img src="/info.svg" alt="information icon"
                        className="h-4 w-4" style={{ filter: "invert(1)" }}
                        />
                        <p>Data for nerds</p>
                    </>
                }
                
            </button>
            {metaActive && 
                <section className="flex flex-col text-sm max w-100 justify-center text-left bg-black text-white p-4">
                    <p><span className="font-bold">id: </span> {media[indexNumber].id}</p>
                    <p><span className="font-bold">name: </span> {media[indexNumber].name}</p>
                    <p><span className="font-bold">alt text: </span> {media[indexNumber].alternativeText ?? "null"}</p>
                    <p><span className="font-bold">caption: </span> {media[indexNumber].alternativeText ?? "null"}</p>
                    <p><span className="font-bold">dimensions: </span> {media[indexNumber].width && media[indexNumber].height ? String(media[indexNumber].width + "px x " + media[indexNumber].height + "px" ) : "null"}</p>


                    <p><span className="font-bold">backend: </span> Strapi </p>

                </section>
            }
            
            { !metaActive &&

                <>
                    { imgExtensions.includes(media[indexNumber].ext) &&
                    <img className="w-[80%] max-h-[80svh] max-w-fit hover:cursor-zoom-in" src={domainEndpoint+media[indexNumber].url} alt={media[indexNumber].alternativeText} />  
                    }
                    
                    { vidExtensions.includes(media[indexNumber].ext) &&
                    <video
                        className="w-[80%] max-h-[80svh] max-w-fit bg-black"
                        src={domainEndpoint+media[indexNumber].url}
                        controls
                        controlsList="nodownload"
                        autoPlay
                        muted
                    >
                        Your browser does not support the video tag.
                    </video>
                    }
                </>
            }

            <span className="flex justify-center items-center gap-2">
            { 
                media.map((_,index) =>
                    <> 
                        { indexNumber != index &&
                            <button type="button" key={index} onClick={(e) => {setIndexNumber(Number(e.currentTarget.id)); setMetaActive(false);}} id={String(index)} className="bg-black w-4 h-4 hover:cursor-pointer" />

                        }

                         { indexNumber == index &&
                            <button type="button" key={index} onClick={(e) => {setIndexNumber(Number(e.currentTarget.id)); setMetaActive(false);}} id={String(index)} className="bg-white border-2 border-black w-5 h-5 hover:cursor-pointer" />

                        }
                    </> 
                )
            }
            </span>
        </main>
    )
}