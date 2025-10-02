import React from "react";
import { motion } from "motion/react"

export default function IndexButton({ text, link }: { text: string; link: string }) {
    const [hovered, setHovered] = React.useState(false);
    const [fade, setFade] = React.useState(false);
    const [coord, setCoord] = React.useState({ x: 0, y: 0 });
    
    const particleCount = 48;

    let blockButtonStyles = "w-30 h-20 bg-black text-white z-30 hover:cursor-pointer" +
    " relative "

    const isLeft = coord.x < window.innerWidth / 2;
    const isTop = (coord.y - 42) < window.innerHeight / 2 ;
    
    let border = {};

    // motion apparently doesnt supporting animating with rem
    // https://github.com/motiondivision/motion/issues/1243
    if (isLeft && isTop) {
        border = {
            borderTopLeftRadius: "34px",
            borderTopRightRadius: "4px",
            borderBottomRightRadius: "4px",
            borderBottomLeftRadius: "4px",
        };
    } 
    else if (!isLeft && isTop) {
        border = {
            borderTopLeftRadius: "4px",
            borderTopRightRadius: "34px",
            borderBottomRightRadius: "4px",
            borderBottomLeftRadius: "4px",
        };
    } 
    else if (isLeft && !isTop) {
        border = {
            borderTopLeftRadius: "4px",
            borderTopRightRadius: "4px",
            borderBottomRightRadius: "4px",
            borderBottomLeftRadius: "34px",
        };
    } 
    else {
        border = {
            borderTopLeftRadius: "4px",
            borderTopRightRadius: "4px",
            borderBottomRightRadius: "34px",
            borderBottomLeftRadius: "4px",
        };
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
            }}

            onHoverEnd={(e) => setHovered(false)}
            initial={{ borderRadius: "8px" }}
            animate={hovered ? border : { borderRadius: "8px" }}

            transition={{ duration: 3, delay:0.5, ease: "easeInOut" }}
            whileTap={{ scale: 0.8,}}

            className={blockButtonStyles}>
                {text}
            </motion.button>
            {hovered &&
                <> 
                { Array.from({length: particleCount}).map((_, i) => 
                    <BitAnimation count={i} key={i} position={coord} fade={fade} />
                )}
                </>
            }
        </a>
    )
}

function BitAnimation ({position, count, fade} : {position: {x:number, y:number}, count:number, fade: boolean}) {
    const navBarHeight = 42;
    
    let xKeys = [
        [null, -25], [null, -30], [null, -35], [null, -40], [null, -45],
        [null, -50], [null, -55], [null, -60], [null, -65], [null, -70],
        [null, -75], [null, -80], [null, -85], [null, -90], [null, -95],
        [null, -100], [null, -105], [null, -110], [null, -115],

    ];

    let yKeys = [
        [null, -20], [null, -25], [null, -30], [null, -35], [null, -40],
        [null, -45], [null, -50], [null, -55], [null, -60], [null, -65],
        [null, -70], [null, -75], [null, -80], [null, -85], [null, -90],
        [null, -95], [null, -100], [null, -105], [null, -110], [null, -115],
        
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
            style={{ top: isTop ? position.y-100 : position.y -70 , left: isLeft ? position.x -35 : position.x +35 }} 
            className={`absolute  w-1.5 h-1.5 bg-black z-0 pointer-events-none`}
            initial={{ opacity: 0 }}
            animate={{ 
                x: xKeys[Math.floor(Math.random() * xKeys.length)],
                y: yKeys[Math.floor(Math.random() * yKeys.length)],
                rotate: [0, 90, 180, 270, 360],
                opacity: [1, 0]
            }}
            transition={{ 
                duration: 1.35, 
                type: "tween", 
                ease: "easeIn", 
                repeat: Infinity,
                repeatDelay: Math.random() * 0.1 + count/10,
                delay: Math.random() * count/10
            }}
        />
    )
}