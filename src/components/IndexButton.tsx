import React from "react";
import { motion } from "motion/react"

export default function IndexButton({ text, link }: { text: string; link: string }) {
    const [hovered, setHovered] = React.useState(false);
    const [coord, setCoord] = React.useState({ x: 0, y: 0 });
    
    let blockButtonStyles = "w-30 h-20 bg-black text-white z-30" +
    "hover:cursor-pointer relative  "

    const isLeft = coord.x < window.innerWidth / 2;
    const isTop = (coord.y - 42) < window.innerHeight / 2 ;

    if(isLeft && isTop) {
        blockButtonStyles += " hover:rounded-tl-4xl hover:skew-[20deg]"
    }
    else if(!isLeft && isTop) {
         blockButtonStyles += " hover:rounded-tr-4xl hover:skew-x-6"
    }
    else if(isLeft && !isTop) {
        blockButtonStyles += " hover:rounded-bl-4xl hover:-skew-y-6"
    }
    else {
        blockButtonStyles += " hover:rounded-br-4xl hover:-skew-x-6"
    }

    return(
        <a href={link}>
            <motion.button 
            onHoverStart={(e) => {
                setHovered(true);
                // find coords of button to pass to BitAnimation
                const target = e.target as HTMLElement;
                const rect = target?.getBoundingClientRect();
                
                setCoord({
                    x: Math.round(rect?.left + rect?.width / 2),
                    y: Math.round(rect?.bottom + rect?.height / 2)
                });

                console.log(coord);
            }}

            onHoverEnd={(e) => setHovered(false)}
            whileHover={{
                scale: 1.1,
            }}
            transition={{
                duration: 0.25,
                repeatType: 'reverse',
                ease: 'easeInOut',
            }}
           
            className={blockButtonStyles}>
                {text}
            </motion.button>
            {hovered &&
            <> 
            { Array.from({length: 12}).map((_, i) => 
                <BitAnimation key={i} position={coord} />
            )}
            
            </>
                
            }
        </a>
    )
}

function BitAnimation ({position} : {position: {x:number, y:number}}) {
    const navBarHeight = 42;
    
    let xKeys = [
        [null, -25], [null, -30], [null, -35], [null, -40], [null, -45],
        [null, -50], [null, -55], [null, -60], [null, -65], [null, -70],
        [null, -75], [null, -80], [null, -85], [null, -90], [null, -95],
        [null, -100], [null, -105], [null, -110], [null, -115], [null, -120],
        [null, -125], [null, -130], [null, -135], [null, -140],
        [null, -300], 
        [null, -320], 
    ];

    let yKeys = [
        [null, -20], [null, -25], [null, -30], [null, -35], [null, -40],
        [null, -45], [null, -50], [null, -55], [null, -60], [null, -65],
        [null, -70], [null, -75], [null, -80], [null, -85], [null, -90],
        [null, -95], [null, -100], [null, -105], [null, -110], [null, -115],
        [null, -120], [null, -125], [null, -130], [null, -135],
        [null, -280], 
        [null, -295], 
    ];


    const isLeft = position.x < window.innerWidth / 2;
    const isTop = (position.y - navBarHeight) < window.innerHeight / 2 ;

    // invert x values if on right side of screen
    if (!isLeft) {
        xKeys = xKeys.map(arr => arr.map(num => num !== null ? num * -1 : null)) as [number | null, number][];
    }

    // invert y values if on bottom half of screen
    if (!isTop) {
        yKeys = yKeys.map(arr => arr.map(num => num !== null ? num * -1 : null)) as [number | null, number][];
    }
    

    return (
        <motion.article
        onPointerOverCapture={(e) => e.stopPropagation()}
        style={{ top: isTop ? position.y-110 : position.y -50, left: isLeft ? position.x -35 : position.x +35 }} 
        className={`absolute  w-2.5 h-2.5 bg-black z-0 pointer-events-none`}
        initial={{ opacity: 0 }}
        animate={{ 
            x: xKeys[Math.floor(Math.random() * xKeys.length)],
            y: yKeys[Math.floor(Math.random() * yKeys.length)],
            rotate: [0, 90, 180, 270, 360],
            opacity: [1, 0]
         }}
        transition={{ 
            duration: 1.2, 
            type: "tween", 
            ease: "easeIn", 
            repeat: Infinity,
            repeatDelay: Math.random() * 0.7,
            delay: Math.random() * 0.5
        }}
        >
        
        </motion.article>
    )
}