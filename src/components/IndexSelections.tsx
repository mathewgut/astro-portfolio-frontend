import React from "react";
import { motion } from "motion/react"


function Button ({text, link}: {text:string, link:string}) {
    return (
        <a href={link}>
            <button className="
            transition-all ease-in-out duration-150 
            hover:border-white hover:scale-110 hover:translate-y-[-2px] hover:bg-white hover:text-black hover:cursor-pointer
            active:border-white active:scale-110 active:translate-y-[-2px] active:bg-white active:text-black
            border-2 border-transparent px-3 py-1 text-3xl">
                {text}
            </button>
        </a>
    )
}

export default function IndexSelections() {
    return (
      <section className="uppercase flex flex-col w-70 flex-wrap gap-2 justify-center items-center">
        <Button text="blog" link="/blog" />
        <Button text="work" link="/work" />    
        <Button text="about" link="/about" />
        <Button text="contact" link="/contact" />
        <Button text="frontend code" link="https://github.com/mathewgut/astro-portfolio-frontend" />
      </section>
    )
}
