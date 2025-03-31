"use client";

import { motion, useInView } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { CardProps } from '../../types';
import card from "./card.module.scss";

export default function Card({ isFlipped = false }: CardProps) {
  const [isMobile, setIsMobile] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-20% 0px -20% 0px" });

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
      <article className={`${card.card} ${isFlipped ? card["card--flipped"] : ""}`}>
        
        <motion.img
          ref={ref}
          className={card.card__image}
          alt="Portfolio image"
          src="/images/capco-home.png"
          width="840"
          height="432"
          initial={ isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 80 }}
          animate={isMobile ? { opacity: 1, y: 0 } : isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 80 }} 
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
        </motion.img>
        <motion.div
          ref={ref}
          className={card.card__content}
          initial={ isMobile ? { opacity: 1, transform: 'translateX(0)', y: 0 } : { opacity: 0, y: 80, transform: isFlipped ? 'translateX(10%)' : 'translateX(-10%)' }}
          animate={isMobile ? { opacity: 1, transform: 'translateX(0)', y: 0 } : isInView ? { opacity: 1, y: 0, transform: isFlipped ? 'translateX(10%)' : 'translateX(-10%)' } : { opacity: 0, y: 80 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        >
          <h2 className={card.card__title}>Capco</h2>
          <p className={card.card__intro}>
            During my time at Ratio as a Lead Front-end Developer, I led the implementation of a phased refresh for the website. I also developed a comprehensive style guide, utilising methodologies like BEM (Block, Element, Modifier) naming conventions and the Atomic Design approach. Additionally, I ensured that all new components were fully documented in the style guide, providing clear guidelines for future development.
          </p>

          <ul className={card.card__tags}>
            <li className={card.card__tag}>HTML</li>
            <li className={card.card__tag}>CSS/SASS</li>
            <li className={card.card__tag}>VueJS</li>
          </ul>
        </motion.div>
      </article>
    </div>
  );
}