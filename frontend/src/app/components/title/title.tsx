"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import title from "./title.module.scss";

export default function Title() {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-30% 0px -30% 0px" });

  return (
    <div className="wrapper">
      <motion.h2
          ref={ref}
          className={title.title}
          initial={{ opacity: 1, y: 80 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 1, y: 90 }} 
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
        Experience
      </motion.h2>
      <motion.p
          ref={ref}
          className={title.title__text}
          initial={{ opacity: 1, y: 80 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 1, y: 90 }} 
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
        Not all of the work I've done I am able to share due to NDA's. Here is a selection of projects I have worked on that I can showcase.
      </motion.p>
    </div>
  );
}
