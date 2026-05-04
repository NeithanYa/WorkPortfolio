"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Github, Linkedin, Twitter, Mail, ArrowDown, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

const socialLinks = [
  { icon: Github, href: "https://github.com/NeithanYa/WorkPortfolio", label: "GitHub" },
  { icon: Twitter, href: "https://x.com/NeithanYYa", label: "Twitter" },
  { icon: Mail, href: "#contact", label: "Email" },
];

const navItems = ["About", "Skills", "Projects", "Contact"];

function FloatingParticle({ delay, duration, x, y }: { delay: number; duration: number; x: number; y: number }) {
  return (
    <motion.div
      className="absolute w-1 h-1 bg-primary/40 rounded-full"
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: [0, 1, 1, 0],
        scale: [0, 1, 1, 0],
        y: [y, y - 100],
        x: [x, x + (Math.random() - 0.5) * 50],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeOut",
      }}
    />
  );
}

function MagneticButton({ children, className, href }: { children: React.ReactNode; className?: string; href: string }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 150, damping: 15 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.3);
    y.set((e.clientY - centerY) * 0.3);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      href={href}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileTap={{ scale: 0.95 }}
      className={className}
    >
      {children}
    </motion.a>
  );
}

function AnimatedText({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) {
  return (
    <motion.span className={`inline-block ${className}`}>
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ opacity: 0, y: 50, rotateX: -90 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{
            duration: 0.5,
            delay: delay + i * 0.03,
            ease: [0.215, 0.61, 0.355, 1],
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.span>
  );
}

export function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; delay: number; duration: number }>>([]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1000),
      y: Math.random() * (typeof window !== "undefined" ? window.innerHeight : 800),
      delay: Math.random() * 5,
      duration: 3 + Math.random() * 2,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col justify-center px-6 lg:px-16 overflow-hidden">
      {/* Animated gradient background */}
      <motion.div
        className="absolute inset-0 opacity-30"
        animate={{
          background: [
            "radial-gradient(circle at 20% 50%, var(--primary) 0%, transparent 50%)",
            "radial-gradient(circle at 80% 50%, var(--primary) 0%, transparent 50%)",
            "radial-gradient(circle at 50% 80%, var(--primary) 0%, transparent 50%)",
            "radial-gradient(circle at 20% 50%, var(--primary) 0%, transparent 50%)",
          ],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      />

      {/* Mouse follower glow */}
      <motion.div
        className="fixed w-96 h-96 rounded-full pointer-events-none z-0"
        style={{
          background: "radial-gradient(circle, rgba(45, 212, 191, 0.08) 0%, transparent 70%)",
          left: mousePosition.x - 192,
          top: mousePosition.y - 192,
        }}
        transition={{ type: "spring", damping: 30, stiffness: 200 }}
      />

      {/* Floating particles */}
      {particles.map((p) => (
        <FloatingParticle key={p.id} delay={p.delay} duration={p.duration} x={p.x} y={p.y} />
      ))}

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      />

      <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-[1fr_auto] gap-16 items-center relative z-10">
        {/* Left side - Name and info */}
        <div className="space-y-8">
          <div className="space-y-6">
            <motion.div
              className="flex items-center gap-2"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <motion.div
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              >
                <Sparkles className="w-5 h-5 text-primary" />
              </motion.div>
              <span className="text-primary font-mono text-sm tracking-wider uppercase">
                Hello, I&apos;m
              </span>
            </motion.div>

            <h1 className="text-6xl md:text-8xl font-bold tracking-tight">
              <AnimatedText text="NeithanYYa" className="text-foreground" delay={0.3} />
              <br />
              <AnimatedText text="Roblox Dev" className="text-primary" delay={0.5} />
            </h1>

            <motion.div
              className="overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <motion.p
                className="text-xl md:text-2xl text-muted-foreground font-medium"
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6, delay: 1, ease: "easeOut" }}
              >
                Lua & LuaU Developer
              </motion.p>
            </motion.div>
          </div>

          <motion.p
            className="text-muted-foreground text-lg leading-relaxed max-w-lg"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
          >
            Roblox Scripter.
            I create fast, reliable systems that bring games to life.
          </motion.p>

          {/* Social links with magnetic effect */}
          <motion.div
            className="flex items-center gap-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.6 }}
          >
            {socialLinks.map((link, index) => (
              <MagneticButton
                key={link.label}
                href={link.href}
                className="group relative p-3 rounded-xl bg-secondary/50 backdrop-blur-sm border border-border hover:border-primary/50 text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.5 + index * 0.1, type: "spring" }}
                >
                  <link.icon className="w-5 h-5 relative z-10" />
                </motion.div>
                <motion.span
                  className="absolute inset-0 rounded-xl bg-primary/10"
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </MagneticButton>
            ))}
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.6 }}
          >
            <motion.a
              href="#projects"
              className="group inline-flex items-center gap-3 px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium relative overflow-hidden"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.span
                className="absolute inset-0 bg-foreground"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
              <span className="relative z-10 group-hover:text-background transition-colors">View My Work</span>
              <motion.span
                className="relative z-10"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowDown className="w-4 h-4 rotate-[-90deg] group-hover:text-background transition-colors" />
              </motion.span>
            </motion.a>
          </motion.div>
        </div>

        {/* Right side - Navigation links */}
        <motion.nav
          className="hidden lg:flex flex-col gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          {navItems.map((item, index) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="group flex items-center gap-4 text-muted-foreground hover:text-foreground transition-colors duration-300 py-2"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 + index * 0.1, duration: 0.5 }}
              whileHover={{ x: -10 }}
            >
              <motion.span
                className="w-8 h-px bg-muted-foreground/30 group-hover:w-16 group-hover:bg-primary transition-all duration-300 origin-right"
              />
              <span className="text-sm font-medium uppercase tracking-widest relative">
                {item}
                <motion.span
                  className="absolute -bottom-1 left-0 h-px bg-primary"
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                />
              </span>
            </motion.a>
          ))}
        </motion.nav>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <motion.a
          href="#about"
          className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
        >
          <motion.span
            className="text-xs uppercase tracking-widest"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Scroll
          </motion.span>
          <motion.div
            className="w-6 h-10 rounded-full border-2 border-current flex justify-center pt-2"
          >
            <motion.div
              className="w-1.5 h-1.5 rounded-full bg-current"
              animate={{ y: [0, 16, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.a>
      </motion.div>
    </section>
  );
}
