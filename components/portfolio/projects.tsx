"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, Github, Folder } from "lucide-react";

const featuredProjects = [
  {
    title: "E-Commerce Platform",
    description:
      "A full-featured e-commerce platform with real-time inventory management, secure payment processing, and an intuitive admin dashboard. Built with performance and scalability in mind.",
    technologies: ["Next.js", "TypeScript", "Stripe", "PostgreSQL", "Tailwind CSS"],
    github: "#",
    live: "#",
    image: "/projects/ecommerce.jpg",
  },
  {
    title: "Task Management App",
    description:
      "A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features. Includes advanced filtering and search capabilities.",
    technologies: ["React", "Node.js", "Socket.io", "MongoDB", "Redux"],
    github: "#",
    live: "#",
    image: "/projects/taskapp.jpg",
  },
  {
    title: "Analytics Dashboard",
    description:
      "An interactive analytics dashboard that visualizes complex data sets with beautiful charts and graphs. Features customizable widgets and export functionality.",
    technologies: ["Vue.js", "D3.js", "Python", "FastAPI", "Chart.js"],
    github: "#",
    live: "#",
    image: "/projects/analytics.jpg",
  },
];

const otherProjects = [
  {
    title: "Weather App",
    description: "A beautiful weather application with location-based forecasts and animated backgrounds.",
    technologies: ["React", "OpenWeather API", "CSS Animations"],
    github: "#",
    live: "#",
  },
  {
    title: "Portfolio Generator",
    description: "A CLI tool that generates portfolio websites from a simple JSON configuration file.",
    technologies: ["Node.js", "Handlebars", "CLI"],
    github: "#",
  },
  {
    title: "Markdown Editor",
    description: "A real-time markdown editor with preview, syntax highlighting, and export options.",
    technologies: ["React", "CodeMirror", "Marked"],
    github: "#",
    live: "#",
  },
  {
    title: "API Rate Limiter",
    description: "A robust rate limiting middleware for Express.js with Redis support.",
    technologies: ["Node.js", "Redis", "Express"],
    github: "#",
  },
  {
    title: "Image Optimizer",
    description: "A web app that optimizes and compresses images while maintaining quality.",
    technologies: ["Next.js", "Sharp", "WebAssembly"],
    github: "#",
    live: "#",
  },
  {
    title: "Chat Application",
    description: "Real-time chat application with rooms, direct messages, and file sharing.",
    technologies: ["Socket.io", "React", "MongoDB"],
    github: "#",
    live: "#",
  },
];

export function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" ref={ref} className="py-24 px-6 lg:px-16 bg-card/30">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-3xl font-bold text-foreground mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          Featured Projects
        </motion.h2>

        {/* Featured Projects */}
        <div className="space-y-24 mb-24">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + index * 0.2, duration: 0.6 }}
              className="group relative"
            >
              <div
                className={`grid lg:grid-cols-2 gap-8 items-center ${
                  index % 2 === 1 ? "lg:text-right" : ""
                }`}
              >
                {/* Project Image Placeholder */}
                <motion.div
                  className={`relative overflow-hidden rounded-lg bg-secondary/50 aspect-video ${
                    index % 2 === 1 ? "lg:order-2" : ""
                  }`}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="absolute inset-0 bg-primary/5 group-hover:bg-transparent transition-colors duration-300" />
                  <div className="w-full h-full flex items-center justify-center">
                    <Folder className="w-16 h-16 text-muted-foreground/30" />
                  </div>
                </motion.div>

                {/* Project Info */}
                <div
                  className={`space-y-4 ${index % 2 === 1 ? "lg:order-1" : ""}`}
                >
                  <p className="text-primary font-mono text-sm">Featured Project</p>
                  <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <div className="bg-card p-6 rounded-lg shadow-lg border border-border">
                    <p className="text-muted-foreground leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                  <div
                    className={`flex flex-wrap gap-2 ${
                      index % 2 === 1 ? "lg:justify-end" : ""
                    }`}
                  >
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="text-sm font-mono text-muted-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div
                    className={`flex items-center gap-4 ${
                      index % 2 === 1 ? "lg:justify-end" : ""
                    }`}
                  >
                    {project.github && (
                      <motion.a
                        href={project.github}
                        whileHover={{ scale: 1.1, y: -2 }}
                        className="text-muted-foreground hover:text-primary transition-colors"
                        aria-label="View GitHub repository"
                      >
                        <Github className="w-5 h-5" />
                      </motion.a>
                    )}
                    {project.live && (
                      <motion.a
                        href={project.live}
                        whileHover={{ scale: 1.1, y: -2 }}
                        className="text-muted-foreground hover:text-primary transition-colors"
                        aria-label="View live site"
                      >
                        <ExternalLink className="w-5 h-5" />
                      </motion.a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Other Projects */}
        <motion.h3
          className="text-2xl font-bold text-foreground mb-8 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          Other Noteworthy Projects
        </motion.h3>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {otherProjects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.9 + index * 0.1, duration: 0.5 }}
              whileHover={{ y: -8 }}
              className="group bg-card p-6 rounded-lg border border-border hover:border-primary/50 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <Folder className="w-10 h-10 text-primary" />
                <div className="flex items-center gap-3">
                  {project.github && (
                    <a
                      href={project.github}
                      className="text-muted-foreground hover:text-primary transition-colors"
                      aria-label="View GitHub repository"
                    >
                      <Github className="w-5 h-5" />
                    </a>
                  )}
                  {project.live && (
                    <a
                      href={project.live}
                      className="text-muted-foreground hover:text-primary transition-colors"
                      aria-label="View live site"
                    >
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </div>
              <h4 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors mb-2">
                {project.title}
              </h4>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs font-mono text-muted-foreground"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
