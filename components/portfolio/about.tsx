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
              I&apos;m a Roblox scripter focused on building systems that are clean, reliable, and made to scale. I don’t just script features — I build the structure behind games so they actually {" "}
              <span className="text-primary font-medium">work</span>{" "}
              <span className="text-primary font-medium">long-term.</span>.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 }}
            >

              I’ve spent time learning through real projects, breaking down how successful games are built, and applying that into my own systems. This lets me develop efficiently while avoiding messy or unoptimized code.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 }}
            >
              I mainly work on gameplay systems, data handling, and core mechanics — anything that needs to be solid behind the scenes.

            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 }}
            >
              Right now, I’m looking to collaborate on projects that need strong systems and someone who can turn ideas into something playable.
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
