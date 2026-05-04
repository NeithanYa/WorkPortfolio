"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

export function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const highlights = [
    { label: "advertising agencies", bold: true },
    { label: "large corporations", bold: true },
    { label: "start-ups", bold: true },
    { label: "small digital product studios", bold: true },
  ];

  return (
    <section 
      id="about" 
      ref={ref}
      className="py-24 px-6 lg:px-16"
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <motion.h2 
            className="text-3xl font-bold text-foreground"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
          >
            About Me
          </motion.h2>

          <div className="space-y-6 text-muted-foreground text-lg leading-relaxed">
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
            >
              I&apos;m a developer passionate about crafting accessible, pixel-perfect user 
              interfaces that blend thoughtful design with robust engineering. My favorite 
              work lies at the intersection of design and development, creating experiences 
              that not only look great but are meticulously built for{" "}
              <span className="text-primary font-medium">performance</span> and{" "}
              <span className="text-primary font-medium">usability</span>.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 }}
            >
              Currently, I&apos;m a Senior Developer at{" "}
              <span className="text-foreground font-semibold hover:text-primary transition-colors cursor-pointer">
                TechCorp
              </span>
              , specializing in building scalable web applications. I contribute to the 
              creation and maintenance of components that power the company&apos;s frontend, 
              ensuring our platform meets modern standards and best practices to deliver 
              an inclusive user experience.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 }}
            >
              In the past, I&apos;ve had the opportunity to develop software across a variety 
              of settings — from{" "}
              {highlights.map((item, index) => (
                <span key={item.label}>
                  <span className="text-foreground font-medium">{item.label}</span>
                  {index < highlights.length - 2 && ", "}
                  {index === highlights.length - 2 && " and "}
                </span>
              ))}
              . Additionally, I also released a comprehensive{" "}
              <span className="text-foreground font-semibold">video course</span> teaching 
              modern web development practices.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 }}
            >
              In my spare time, I&apos;m usually hiking, reading, contributing to open source 
              projects, or exploring new technologies. I believe in continuous learning and 
              sharing knowledge with the community.
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
