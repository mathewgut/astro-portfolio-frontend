import { useState, type Dispatch, type SetStateAction } from "react";
import type { DocumentImage } from "./ItemTypes";
import { domainEndpoint } from "./utils";

// for strapi media
export default function MediaView({media}:{media:DocumentImage[]}) {
    const [indexNumber, setIndexNumber] = useState<number>(0);
    const [metaActive, setMetaActive] = useState<boolean>(false);

    const imgExtensions = [".png", ".jpg", ".jpeg", ".gif", ".bmp", ".webp", ".svg", ".tiff", ".ico", ".avif"]
    const vidExtensions = [".mp4", ".webm", ".ogg", ".mov", ".avi", ".wmv", ".flv", ".mkv", ".m4v", ".3gp"];
    
    function changeMediaIndex(posAdd:number) {
        const newIndex = indexNumber + posAdd;
        
        if (newIndex < 0) {
            setIndexNumber(media.length - 1);
        } else if (newIndex >= media.length) {
            setIndexNumber(0);
        } else {
            setIndexNumber(newIndex);
        }
    }
    
    return(
        <main className="relative flex flex-col justify-center items-center w-full h-full my-4">

                <div className="flex relative w-full justify-center max-h-100 border-2">
                    <button type="button" 
                    onClick={() => setMetaActive(!metaActive)}
                    className="flex absolute z-30 top-1 right-1 backdrop-blur-sm bg-black/30 px-2 py-1 gap-2 rounded-md text-white text-sm justify-center items-center hover:cursor-pointer">  
                        <img src="/info.svg" alt="information icon"
                        className="h-5 w-5" style={{ filter: "invert(1)" }}
                        /> 
                    </button>

                    <button onClick={() => changeMediaIndex(-1)} className="absolute flex justify-center items-center w-15 h-1/2 top-2/8 left-0 bg-black/10 hover:bg-black/20 hover:text-white hover:cursor-pointer">
                            &lt;
                    </button>
                    <button onClick={() => changeMediaIndex(1)} className="absolute flex justify-center items-center w-15 h-1/2 top-2/8 right-0 bg-black/10 hover:bg-black/20 hover:text-white hover:cursor-pointer">
                        &gt;
                    </button>

                    {metaActive && 
                        <section className="absolute text-xs flex flex-col sm:text-sm w-full h-full justify-center text-center bg-black/50 backdrop-blur-sm text-white p-4">
                            <p><span className="font-bold">id: </span> {media[indexNumber].id}</p>
                            <p><span className="font-bold">name: </span> {media[indexNumber].name}</p>
                            <p><span className="font-bold">alt text: </span> {media[indexNumber].alternativeText ?? "null"}</p>
                            <p><span className="font-bold">caption: </span> {media[indexNumber].alternativeText ?? "null"}</p>
                            <p><span className="font-bold">dimensions: </span> {media[indexNumber].width && media[indexNumber].height ? String(media[indexNumber].width + "px x " + media[indexNumber].height + "px" ) : "null"}</p>
                            <p><span className="font-bold">served using: </span> Strapi </p>
                        </section>
                    }

                    { imgExtensions.includes(media[indexNumber].ext) &&
                        <img className="max-h-100 max-w-full" src={domainEndpoint+media[indexNumber].url} alt={media[indexNumber].alternativeText} />  
                    }
                    
                    { vidExtensions.includes(media[indexNumber].ext) &&
                        <video
                            className="w-full max-h-full max-w-fit bg-black"
                            src={domainEndpoint+media[indexNumber].url}
                            controls
                            controlsList="nodownload"
                            autoPlay
                            muted
                        >
                            Your browser does not support the video tag.
                        </video>
                    }
                   
                        
                        
                    

                </div>

            <span className="flex justify-center items-center gap-2 my-2">
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