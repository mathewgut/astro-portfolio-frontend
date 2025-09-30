import React from "react";
import { motion } from "motion/react"

export default function IndexButton({ text, link }: { text: string; link: string }) {
    const [hovered, setHovered] = React.useState(false);
    const [coord, setCoord] = React.useState({ x: 0, y: 0 });
    
    const blockButtonStyles = "w-30 h-20 bg-black text-white z-30" +
    "hover:cursor-pointer rounded-lg"
    
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
            {hovered && <BitAnimation position={coord} />}
        </a>
    )
}

function BitAnimation ({position} : {position: {x:number, y:number}}) {
    return (
        <motion.article 
        className={`absolute top-[${position.y - 60}px] left-[${position.x + 40}px] w-2.5 h-2.5 bg-black pointer-events-none z-20`}
        initial={{ opacity: 1 }}
        animate={{ 
            x: [null, -5, -20, -25, -30],
            y: [null, -50, -100, -150, -200],
            rotate: [0, 90, 180, 270, 360],
            opacity: [1, 0]
         }}
        transition={{ duration: 1.2, ease: "easeInOut", repeat: Infinity }}
        

        >
        
        </motion.article>
    )
}