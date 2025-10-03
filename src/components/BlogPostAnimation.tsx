import { motion, useAnimation } from "motion/react";
import { useEffect, useState } from "react";

export default function BlogPostAnimation({children}: {children: React.ReactNode}) {
    return(<section className="flex flex-col h-full w-full relative justify-center items-center">
            
            <motion.div 
            className="fixed h-8 w-8 bg-black z-30" 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ 
                opacity: [0,1,0,1,0.8,1,1,1,1.8,1,0],
                y: [0, -3, 0, -2, 0, -1, 0, -1, 0, 0, 500],
                scale: [0.5, 1.2, 1, 1.05, 1, 1.3, 1, 1.3, 0.8],
                rotate: [0, 90, 95, 180, 270, 275, 360, -360],
                backgroundColor: ["green", "#333333", "#666666", "#999999", "#CCCCCC", "#FFFFFF", "#CCCCCC", "#999999", "#666666", "#333333", "#000000"]
             }}
            transition={{ duration: 1.5, delay: 0  }}
            />
            <motion.div
                initial={{ opacity: 0 }}
                className="fixed top-0 left-0 h-1/2 w-1/2 bg-white" 
                animate={{
                    opacity: [1,1,1,1,1,1,1,1,1,0],
                    y: [0, 100, 0, 300, 0, 50, 400, -1, 0, 0],
                }}
                transition={{ duration: 0.3, delay: 1.9  }}
            />
            <motion.div
                initial={{ opacity: 0 }}
                animate={{
                    opacity: [1,1,1,1,1,1,1,1,1,0],
                    y: [0, -100, 0, -300, 0, -50, -400, -1, 0, 0],
                }}
                className="fixed bottom-0 right-0 h-1/2 w-1/2 bg-white" 
                transition={{ duration: 0.3, delay: 1.9  }}
            />
            <motion.main
                initial={{ opacity: 0 }}
                animate={{ 
                    opacity: [0,0,0,0,0,1,0,0.8,1,1,0,0,1],
                    scale: [1, 0.98, 0.25, 0.99, 1, 1.01, 1, 1.005, 0.3, 1.5, 1],

                 }}
                transition={{ duration: 0.55, delay:1.4, ease: "linear" }} 
                className="flex flex-col h-full w-full "
            >
            {children}
        </motion.main>
        </section>
    )
}
