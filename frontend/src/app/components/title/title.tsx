"use client";

import { motion, useInView } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import title from "./title.module.scss";

export default function Title() {
  const [isMobile, setIsMobile] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-30% 0px -30% 0px" });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        setIsMobile(window.innerWidth < 768);
      };

      handleResize();
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  return (
    <div className="wrapper">
      <motion.h2
          ref={ref}
          className={title.title}
          initial={ isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          animate={isMobile ? {} : isInView ? { opacity: 1, y: 0 } : { opacity: 1, y: 50 }} 
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
        Experience
      </motion.h2>
      <motion.p
          ref={ref}
          className={title.title__text}
          initial={isMobile ? { opacity: 1 } : { opacity: 0, y: 50 }}
          animate={ isMobile ? { y: 0 } : isInView ? { opacity: 1, y: 0 } : { opacity: 1, y: 50 }} 
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
        Not all of the work I’ve done I am able to share due to NDA’s.
      </motion.p>
    </div>
  );
}
