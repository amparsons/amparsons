"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import promo from "./promo.module.scss";

export default function Promo() {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "0px 0px 0px 0px" });

  return (
    <div className="wrapper">
      
      <motion.div
          ref={ref}
          className={promo.promo}
          initial={{ opacity: 0, y: 80 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 80 }} 
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
        <ul className={promo.promo__logos}>
          <li className={promo.promo__logo}>Semantic HTML</li>
          <li className={promo.promo__logo}>JavaScript/ES6</li>
          <li className={promo.promo__logo}>TypeScript</li>
          <li className={promo.promo__logo}>jQuery</li>
          <li className={promo.promo__logo}>VueJS</li>
          <li className={promo.promo__logo}>NextJS</li>
          <li className={promo.promo__logo}>CSS Modules</li>
          <li className={promo.promo__logo}>Docker</li>
          <li className={promo.promo__logo}>StoryBook</li>
          <li className={promo.promo__logo}>Playwright</li>
          <li className={promo.promo__logo}>WebPack</li>
          <li className={promo.promo__logo}>Figma</li>
        </ul>
      </motion.div>
    </div>
  );
}
