"use client";

import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { ExternalLink, Github, Folder, ArrowUpRight } from "lucide-react";

const featuredProjects = [
  {
    title: "E-Commerce Platform",
    description:
      "A full-featured e-commerce platform with real-time inventory management, secure payment processing, and an intuitive admin dashboard. Built with performance and scalability in mind.",
    technologies: ["Next.js", "TypeScript", "Stripe", "PostgreSQL", "Tailwind CSS"],
    github: "#",
    live: "#",
    gradient: "from-cyan-500/20 to-blue-500/20",
    // Add your media here - supports video (.mp4, .webm) or GIF
    // media: "/videos/ecommerce-demo.mp4",
    // mediaType: "video", // "video" or "gif"
    media: null,
    mediaType: null,
  },
  {
    title: "Task Management App",
    description:
      "A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features. Includes advanced filtering and search capabilities.",
    technologies: ["React", "Node.js", "Socket.io", "MongoDB", "Redux"],
    github: "#",
    live: "#",
    gradient: "from-purple-500/20 to-pink-500/20",
    // media: "/videos/task-app-demo.mp4",
    // mediaType: "video",
    media: null,
    mediaType: null,
  },
  {
    title: "Analytics Dashboard",
    description:
      "An interactive analytics dashboard that visualizes complex data sets with beautiful charts and graphs. Features customizable widgets and export functionality.",
    technologies: ["Vue.js", "D3.js", "Python", "FastAPI", "Chart.js"],
    github: "#",
    live: "#",
    gradient: "from-orange-500/20 to-red-500/20",
    // media: "/gifs/analytics-demo.gif",
    // mediaType: "gif",
    media: null,
    mediaType: null,
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

function FeaturedProjectCard({ project, index, isInView }: { project: typeof featuredProjects[0]; index: number; isInView: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 150, damping: 20 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), springConfig);
  const z = useSpring(0, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const normalX = (e.clientX - rect.left) / rect.width - 0.5;
    const normalY = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(normalX);
    y.set(normalY);
    z.set(20);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current && project.mediaType === "video") {
      videoRef.current.play();
    }
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    z.set(0);
    setIsHovered(false);
    if (videoRef.current && project.mediaType === "video") {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const isReversed = index % 2 === 1;

  return (
    <motion.div
      ref={ref}
      className={`group grid lg:grid-cols-2 gap-8 items-center ${isReversed ? "lg:flex-row-reverse" : ""}`}
      initial={{ opacity: 0, y: 80 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.2 + index * 0.2, duration: 0.8, ease: "easeOut" }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
    >
      {/* Media showcase area - supports video, GIF, or gradient placeholder */}
      <motion.div
        className={`relative aspect-video rounded-2xl overflow-hidden ${isReversed ? "lg:order-2" : ""}`}
        style={{ rotateX, rotateY, z, transformStyle: "preserve-3d" }}
      >
        {/* Video media */}
        {project.media && project.mediaType === "video" && (
          <video
            ref={videoRef}
            src={project.media}
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}

        {/* GIF media */}
        {project.media && project.mediaType === "gif" && (
          <img
            src={project.media}
            alt={project.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}

        {/* Fallback gradient placeholder when no media */}
        {!project.media && (
          <>
            <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-50`} />
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                className="text-6xl font-bold text-foreground/5"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              >
                {String(index + 1).padStart(2, "0")}
              </motion.div>
            </div>
          </>
        )}

        {/* Hover overlay with play indicator for videos */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-primary/30 to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 0.6 : 0 }}
          transition={{ duration: 0.3 }}
        />

        {/* Action buttons overlay */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ transform: "translateZ(50px)" }}
        >
          {project.github && (
            <motion.a
              href={project.github}
              className="p-4 rounded-full bg-background/90 backdrop-blur-sm text-foreground hover:text-primary transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Github className="w-6 h-6" />
            </motion.a>
          )}
          {project.live && (
            <motion.a
              href={project.live}
              className="p-4 rounded-full bg-primary text-primary-foreground"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ExternalLink className="w-6 h-6" />
            </motion.a>
          )}
        </motion.div>

        {/* Border animation */}
        <motion.div
          className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-primary/50"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>

      {/* Content */}
      <div className={`space-y-4 ${isReversed ? "lg:order-1 lg:text-right" : ""}`}>
        <motion.span
          className="text-primary font-mono text-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 + index * 0.2 }}
        >
          Featured Project
        </motion.span>

        <motion.h3
          className="text-2xl md:text-3xl font-bold text-foreground group-hover:text-primary transition-colors"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.35 + index * 0.2 }}
        >
          {project.title}
        </motion.h3>

        <motion.div
          className="p-6 rounded-xl bg-card border border-border shadow-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 + index * 0.2 }}
          whileHover={{ borderColor: "rgba(45, 212, 191, 0.3)" }}
        >
          <p className="text-muted-foreground leading-relaxed">
            {project.description}
          </p>
        </motion.div>

        <motion.div
          className={`flex flex-wrap gap-3 ${isReversed ? "lg:justify-end" : ""}`}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.45 + index * 0.2 }}
        >
          {project.technologies.map((tech, techIndex) => (
            <motion.span
              key={tech}
              className="text-sm font-mono text-muted-foreground hover:text-primary transition-colors cursor-default"
              whileHover={{ scale: 1.05, color: "var(--primary)" }}
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.5 + index * 0.2 + techIndex * 0.05 }}
            >
              {tech}
            </motion.span>
          ))}
        </motion.div>

        <motion.div
          className={`flex items-center gap-4 pt-2 ${isReversed ? "lg:justify-end" : ""}`}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.55 + index * 0.2 }}
        >
          {project.github && (
            <motion.a
              href={project.github}
              className="text-muted-foreground hover:text-primary transition-colors"
              whileHover={{ scale: 1.1, y: -2 }}
            >
              <Github className="w-5 h-5" />
            </motion.a>
          )}
          {project.live && (
            <motion.a
              href={project.live}
              className="text-muted-foreground hover:text-primary transition-colors"
              whileHover={{ scale: 1.1, y: -2 }}
            >
              <ExternalLink className="w-5 h-5" />
            </motion.a>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}

function OtherProjectCard({ project, index, isInView }: { project: typeof otherProjects[0]; index: number; isInView: boolean }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="group h-full p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300 relative overflow-hidden"
        whileHover={{ y: -10, boxShadow: "0 20px 40px -20px rgba(45, 212, 191, 0.2)" }}
      >
        {/* Animated background gradient */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <motion.div
              animate={{ rotate: isHovered ? 360 : 0 }}
              transition={{ duration: 0.5 }}
            >
              <Folder className="w-10 h-10 text-primary" />
            </motion.div>
            <div className="flex items-center gap-3">
              {project.github && (
                <motion.a
                  href={project.github}
                  className="text-muted-foreground hover:text-primary transition-colors"
                  whileHover={{ scale: 1.2, y: -2 }}
                >
                  <Github className="w-5 h-5" />
                </motion.a>
              )}
              {project.live && (
                <motion.a
                  href={project.live}
                  className="text-muted-foreground hover:text-primary transition-colors"
                  whileHover={{ scale: 1.2, y: -2 }}
                >
                  <ArrowUpRight className="w-5 h-5" />
                </motion.a>
              )}
            </div>
          </div>

          <h4 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors mb-3">
            {project.title}
          </h4>
          <p className="text-muted-foreground text-sm leading-relaxed mb-6">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="text-xs font-mono text-muted-foreground/80"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" ref={ref} className="py-32 px-6 lg:px-16 bg-card/30 relative overflow-hidden">
      {/* Animated background */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-primary/5 blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="max-w-6xl mx-auto relative">
        {/* Section Header */}
        <motion.div
          className="flex items-center gap-4 mb-16"
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <motion.span
            className="text-7xl md:text-9xl font-bold text-primary/10"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            04
          </motion.span>
          <div>
            <motion.h2
              className="text-4xl md:text-5xl font-bold text-foreground"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Featured Projects
            </motion.h2>
            <motion.div
              className="h-1 bg-primary mt-2"
              initial={{ width: 0 }}
              animate={isInView ? { width: "100%" } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
            />
          </div>
        </motion.div>

        {/* Featured Projects */}
        <div className="space-y-32 mb-32">
          {featuredProjects.map((project, index) => (
            <FeaturedProjectCard
              key={project.title}
              project={project}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>

        {/* Other Projects Header */}
        <motion.h3
          className="text-2xl font-bold text-foreground mb-12 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          Other Noteworthy Projects
        </motion.h3>

        {/* Other Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {otherProjects.map((project, index) => (
            <OtherProjectCard
              key={project.title}
              project={project}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
