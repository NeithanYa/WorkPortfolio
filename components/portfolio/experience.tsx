"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink } from "lucide-react";

const experiences = [
  {
    period: "2023 — Present",
    title: "Senior Frontend Engineer",
    company: "TechCorp",
    companyUrl: "#",
    description:
      "Build and maintain critical components used to construct the company&apos;s frontend. Work closely with cross-functional teams, including developers, designers, and product managers, to implement and advocate for best practices in web development and accessibility.",
    technologies: ["React", "TypeScript", "Next.js", "GraphQL", "Tailwind CSS"],
  },
  {
    period: "2021 — 2023",
    title: "Full Stack Developer",
    company: "StartupXYZ",
    companyUrl: "#",
    description:
      "Developed and shipped highly interactive web applications for diverse clients. Collaborated with designers and engineering team to build an internal design system and component library.",
    technologies: ["Vue.js", "Node.js", "PostgreSQL", "AWS", "Docker"],
  },
  {
    period: "2019 — 2021",
    title: "Web Developer",
    company: "Digital Agency",
    companyUrl: "#",
    description:
      "Developed and maintained code for client websites using HTML, CSS, JavaScript, and React. Manually tested sites in various browsers and mobile devices to ensure cross-browser compatibility and responsiveness.",
    technologies: ["JavaScript", "React", "SCSS", "WordPress", "PHP"],
  },
  {
    period: "2018 — 2019",
    title: "Junior Developer",
    company: "WebStudio",
    companyUrl: "#",
    description:
      "Assisted in the development of client projects, learned modern development practices, and contributed to team documentation. Built responsive landing pages and interactive features.",
    technologies: ["HTML", "CSS", "JavaScript", "jQuery", "Bootstrap"],
  },
];

export function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" ref={ref} className="py-24 px-6 lg:px-16">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          className="text-3xl font-bold text-foreground mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          Experience
        </motion.h2>

        <div className="space-y-12">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.period}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + index * 0.15, duration: 0.6 }}
              className="group"
            >
              <div className="grid md:grid-cols-[140px_1fr] gap-4 md:gap-8">
                {/* Timeline period */}
                <div className="text-muted-foreground text-sm font-mono uppercase tracking-wider">
                  {exp.period}
                </div>

                {/* Content */}
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                    {exp.title} ·{" "}
                    <a
                      href={exp.companyUrl}
                      className="inline-flex items-center gap-1 hover:underline"
                    >
                      {exp.company}
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </h3>

                  <p className="text-muted-foreground leading-relaxed">
                    {exp.description.replace(/&apos;/g, "'")}
                  </p>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
