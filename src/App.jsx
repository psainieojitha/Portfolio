/**
 * Personal Portfolio – P Sai Nieojitha
 * Stack: React + Tailwind (CDN) + Framer Motion
 * Theme: Dark, editorial, minimal with electric-blue accent
 */

import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

// ─── Constants ────────────────────────────────────────────────────────────────

const ACCENT = "#3B82F6"; // blue-500

const PROJECTS = [
  {
    id: 1,
    title: "AI-Based Attendance System",
    category: "AI",
    desc:
      "End-to-end smart attendance pipeline combining real-time face detection via YOLO, QR code verification, and GPS-based geofencing to prevent proxy attendance.",
    tech: ["YOLO", "OpenCV", "QR Code", "Geofencing", "Python", "Firebase"],
    github: "https://github.com/psainieojitha",
    icon: "🎯",
    highlight: true,
  },
  {
    id: 2,
    title: "Mental Health AI App",
    category: "AI",
    desc:
      "Conversational AI companion for mental wellness — tracks mood, provides evidence-based CBT exercises, and offers anonymous journaling with sentiment analysis.",
    tech: ["Python", "NLP", "Sentiment Analysis", "Firebase", "REST API"],
    github: "https://github.com/psainieojitha/KASK7",
    icon: "🧠",
    highlight: true,
  },
  {
    id: 3,
    title: "Event Management Platform",
    category: "Full Stack",
    desc:
      "Comprehensive platform for event planning, ticketing, and scheduling with real-time attendee tracking and automated notifications.",
    tech: ["React", "Node.js", "Express", "MongoDB", "Stripe API"],
    github: "https://github.com/ananthasail18/Event_Management_python_application",
    icon: "📅",
    highlight: true,
  },
];

const SKILLS = {
  Programming: [
    { name: "Python", level: 90 },
    { name: "C", level: 75 },
    { name: "C++", level: 70 },
    { name: "HTML", level: 80 },
  ],
  Technologies: [
    { name: "Firebase", level: 80 },
    { name: "API Integration", level: 85 },
    { name: "GitHub", level: 88 },
    { name: "VS Code", level: 95 },
  ],
};

const ACHIEVEMENTS = [
  {
    icon: "🏆",
    title: "Guidewire Fee Scholar",
    desc: "Selected for the prestigious Guidewire scholarship recognising academic excellence and technical potential.",
  },
  {
    icon: "⚡",
    title: "12+ Hackathons",
    desc: "Active participant in 12+ online and offline hackathons, consistently delivering impactful prototypes under tight deadlines.",
  },
  {
    icon: "📡",
    title: "IEEE SSIT SAC",
    desc: "Serving in an IEEE Student Activities Committee role, driving tech awareness and community outreach.",
  },
];

const FILTER_TABS = ["All", "AI", "Full Stack"];

// ─── Animation Variants ───────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

// ─── Typing Effect Hook ───────────────────────────────────────────────────────

function useTypingEffect(words, speed = 90, pause = 1800) {
  const [display, setDisplay] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIdx];
    let timeout;

    if (!deleting && charIdx <= current.length) {
      timeout = setTimeout(() => {
        setDisplay(current.slice(0, charIdx));
        setCharIdx((c) => c + 1);
      }, speed);
    } else if (!deleting && charIdx > current.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIdx >= 0) {
      timeout = setTimeout(() => {
        setDisplay(current.slice(0, charIdx));
        setCharIdx((c) => c - 1);
      }, speed / 2);
    } else {
      setDeleting(false);
      setWordIdx((w) => (w + 1) % words.length);
    }

    return () => clearTimeout(timeout);
  }, [charIdx, deleting, wordIdx, words, speed, pause]);

  return display;
}

// ─── Loader ───────────────────────────────────────────────────────────────────

function Loader({ onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2000);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050810]"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="w-16 h-16 rounded-full border-2 border-blue-500/30 border-t-blue-500"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 0.9, ease: "linear" }}
      />
      <motion.p
        className="mt-5 text-sm tracking-[0.3em] uppercase text-blue-400/70 font-mono"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        Initialising…
      </motion.p>
    </motion.div>
  );
}

// ─── Navbar ───────────────────────────────────────────────────────────────────

function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const links = ["About", "Skills", "Projects", "Achievements", "Contact"];

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-[#050810]/90 backdrop-blur-md border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <span className="font-mono text-sm text-blue-400 tracking-widest">
          PSN<span className="text-white/30">.</span>
        </span>

        {/* Links */}
        <ul className="hidden md:flex gap-8">
          {links.map((l) => (
            <li key={l}>
              <a
                href={`#${l.toLowerCase()}`}
                className="text-sm text-white/50 hover:text-blue-400 transition-colors duration-200 tracking-wide"
              >
                {l}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href="#contact"
          className="hidden md:inline-flex text-xs font-mono px-4 py-2 border border-blue-500/50 text-blue-400 rounded hover:bg-blue-500/10 transition-all duration-200"
        >
          Let's Talk →
        </a>
      </div>
    </motion.nav>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function Hero() {
  const typed = useTypingEffect([
    "Building real-world AI solutions",
    "Crafting scalable systems",
    "Turning ideas into impact",
  ]);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#050810]"
    >
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(#3B82F6 1px, transparent 1px), linear-gradient(90deg, #3B82F6 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Glow orb */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-blue-600/10 blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="inline-flex items-center gap-2 mb-8 px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/5 text-blue-400 text-xs font-mono tracking-widest"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
          AI & Data Science · BMS College of Engineering
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="text-5xl md:text-7xl font-bold text-white mb-4 tracking-tight leading-[1.1]"
          style={{ fontFamily: "'Sora', sans-serif" }}
        >
          P Sai{" "}
          <span
            className="text-transparent bg-clip-text"
            style={{
              backgroundImage: "linear-gradient(135deg, #3B82F6, #8B5CF6)",
            }}
          >
            Nieojitha
          </span>
        </motion.h1>

        {/* Typing tagline */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="h-10 mb-8 flex items-center justify-center"
        >
          <p className="text-lg md:text-xl text-white/60 font-mono">
            {typed}
            <span className="ml-0.5 inline-block w-0.5 h-5 bg-blue-400 align-middle animate-pulse" />
          </p>
        </motion.div>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="flex flex-wrap gap-4 justify-center"
        >
          <a
            href="#projects"
            className="px-7 py-3 rounded-lg bg-blue-500 text-white text-sm font-semibold hover:bg-blue-400 transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/30 hover:-translate-y-0.5"
          >
            View Projects
          </a>
          <a
            href="#contact"
            className="px-7 py-3 rounded-lg border border-white/20 text-white/80 text-sm font-semibold hover:border-blue-400/60 hover:text-blue-400 transition-all duration-200 hover:-translate-y-0.5"
          >
            Contact Me
          </a>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/20 text-xs font-mono tracking-widest"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            ↓
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Section Wrapper ──────────────────────────────────────────────────────────

function Section({ id, children, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.section
      id={id}
      ref={ref}
      variants={stagger}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      className={`py-24 px-6 max-w-6xl mx-auto ${className}`}
    >
      {children}
    </motion.section>
  );
}

function SectionHeader({ label, title }) {
  return (
    <motion.div variants={fadeUp} className="mb-14">
      <p className="text-xs font-mono tracking-[0.3em] text-blue-400 mb-3 uppercase">
        {label}
      </p>
      <h2
        className="text-3xl md:text-4xl font-bold text-white"
        style={{ fontFamily: "'Sora', sans-serif" }}
      >
        {title}
      </h2>
      <div className="mt-4 h-px w-16 bg-blue-500/50" />
    </motion.div>
  );
}

// ─── About ────────────────────────────────────────────────────────────────────

function About() {
  return (
    <section id="about" className="py-24 bg-[#07091a]">
      <Section id="">
        <SectionHeader label="01 / Who I Am" title="About Me" />
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <motion.div variants={fadeUp} className="space-y-5 text-white/65 leading-relaxed">
            <p>
              I'm a{" "}
              <span className="text-white font-medium">
                2nd-year AI & Data Science student
              </span>{" "}
              at BMS College of Engineering, Bengaluru — passionate about building
              systems that solve real, tangible problems.
            </p>
            <p>
              My work spans computer vision, NLP, and full-stack integrations with
              Firebase and REST APIs. I thrive in hackathon environments where
              constraints breed creativity.
            </p>
            <p>
              Beyond code, I'm driven by the belief that technology should be
              accessible and impactful — from clearing ambulance routes to
              detecting road hazards before they cause accidents.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={stagger}
            className="grid grid-cols-2 gap-4"
          >
            {[
              { value: "12+", label: "Hackathons" },
              { value: "4", label: "Live Projects" },
              { value: "2nd", label: "Year @ BMSCE" },
              { value: "IEEE", label: "SSIT Member" },
            ].map((s) => (
              <motion.div
                key={s.label}
                variants={fadeUp}
                className="p-6 rounded-xl border border-white/8 bg-white/3 hover:border-blue-500/40 hover:bg-blue-500/5 transition-all duration-300"
              >
                <p
                  className="text-3xl font-bold text-blue-400 mb-1"
                  style={{ fontFamily: "'Sora', sans-serif" }}
                >
                  {s.value}
                </p>
                <p className="text-sm text-white/50">{s.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Section>
    </section>
  );
}

// ─── Skills ───────────────────────────────────────────────────────────────────

function SkillBar({ name, level, delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="space-y-1.5">
      <div className="flex justify-between text-sm">
        <span className="text-white/70">{name}</span>
        <span className="text-blue-400/70 font-mono text-xs">{level}%</span>
      </div>
      <div className="h-1.5 rounded-full bg-white/8 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : {}}
          transition={{ duration: 1, delay, ease: "easeOut" }}
          className="h-full rounded-full bg-gradient-to-r from-blue-500 to-violet-500"
        />
      </div>
    </div>
  );
}

function Skills() {
  return (
    <Section id="skills">
      <SectionHeader label="02 / What I Know" title="Skills" />
      <div className="grid md:grid-cols-2 gap-12">
        {Object.entries(SKILLS).map(([category, items]) => (
          <motion.div key={category} variants={fadeUp}>
            <p className="text-xs font-mono tracking-widest text-blue-400/70 uppercase mb-6">
              {category}
            </p>
            <div className="space-y-5">
              {items.map((s, i) => (
                <SkillBar key={s.name} name={s.name} level={s.level} delay={i * 0.1} />
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

// ─── Project Card ─────────────────────────────────────────────────────────────

function ProjectCard({ project }) {
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
      className={`group relative p-6 rounded-2xl border ${project.highlight ? 'border-blue-500/40 shadow-[0_0_15px_rgba(59,130,246,0.15)] bg-[#0c1229]' : 'border-white/8 bg-[#07091a]'} hover:border-blue-500/80 hover:shadow-[0_0_25px_rgba(59,130,246,0.25)] hover:bg-[#090d20] transition-all duration-300 flex flex-col gap-4 cursor-default`}
    >
      {/* Top row */}
      <div className="flex items-start justify-between">
        <span className="text-3xl">{project.icon}</span>
        <span className="text-xs font-mono px-2 py-0.5 rounded border border-blue-500/30 text-blue-400/80">
          {project.category}
        </span>
      </div>

      {/* Title */}
      <h3
        className="text-lg font-semibold text-white group-hover:text-blue-300 transition-colors duration-200"
        style={{ fontFamily: "'Sora', sans-serif" }}
      >
        {project.title}
      </h3>

      {/* Desc */}
      <p className="text-sm text-white/50 leading-relaxed flex-1">{project.desc}</p>

      {/* Tech tags */}
      <div className="flex flex-wrap gap-2">
        {project.tech.map((t) => (
          <span
            key={t}
            className="text-xs px-2 py-0.5 rounded bg-white/5 text-white/50 border border-white/8"
          >
            {t}
          </span>
        ))}
      </div>

      {/* GitHub link */}
      <a
        href={project.github}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 text-xs text-blue-400/70 hover:text-blue-400 transition-colors duration-200 mt-1"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12" />
        </svg>
        View on GitHub
      </a>

      {/* Hover accent line */}
      <div className="absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-blue-500/0 via-blue-500/60 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </motion.div>
  );
}

// ─── Projects ─────────────────────────────────────────────────────────────────

function Projects() {
  const [active, setActive] = useState("All");
  const filtered =
    active === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === active);

  return (
    <section id="projects" className="py-24 bg-[#07091a]">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
        >
          <SectionHeader label="03 / What I've Built" title="Projects" />

          {/* Filter tabs */}
          <motion.div variants={fadeUp} className="flex flex-wrap gap-2 mb-10">
            {FILTER_TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActive(tab)}
                className={`px-4 py-1.5 rounded-full text-sm font-mono transition-all duration-200 ${
                  active === tab
                    ? "bg-blue-500 text-white"
                    : "border border-white/15 text-white/50 hover:border-blue-500/50 hover:text-blue-400"
                }`}
              >
                {tab}
              </button>
            ))}
          </motion.div>

          {/* Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              variants={stagger}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              {filtered.map((p) => (
                <ProjectCard key={p.id} project={p} />
              ))}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Achievements ─────────────────────────────────────────────────────────────

function Achievements() {
  return (
    <Section id="achievements">
      <SectionHeader label="04 / Milestones" title="Achievements" />
      <motion.div variants={stagger} className="grid md:grid-cols-3 gap-6">
        {ACHIEVEMENTS.map((a) => (
          <motion.div
            key={a.title}
            variants={fadeUp}
            whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
            className="p-7 rounded-2xl border border-white/8 bg-[#07091a] hover:border-blue-500/40 transition-all duration-300"
          >
            <span className="text-4xl mb-4 block">{a.icon}</span>
            <h3
              className="text-lg font-semibold text-white mb-2"
              style={{ fontFamily: "'Sora', sans-serif" }}
            >
              {a.title}
            </h3>
            <p className="text-sm text-white/50 leading-relaxed">{a.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}

// ─── Contact ──────────────────────────────────────────────────────────────────

function Contact() {
  return (
    <section id="contact" className="py-24 bg-[#07091a]">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={stagger}
        >
          <motion.p
            variants={fadeUp}
            className="text-xs font-mono tracking-[0.3em] text-blue-400 mb-3 uppercase"
          >
            05 / Get In Touch
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="text-4xl md:text-5xl font-bold text-white mb-5"
            style={{ fontFamily: "'Sora', sans-serif" }}
          >
            Let's Build Something
            <br />
            <span className="text-blue-400">Together</span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="text-white/50 mb-10 leading-relaxed"
          >
            Open to collaborations, hackathon teams, internships, and research
            opportunities. Drop a message — I reply fast.
          </motion.p>

          {/* Contact links */}
          <motion.div
            variants={stagger}
            className="flex flex-wrap justify-center gap-4"
          >
            {[
              {
                label: "Email",
                href: "mailto:psainieojitha@gmail.com",
                icon: "✉️",
                value: "psainieojitha@gmail.com",
              },
              {
                label: "GitHub",
                href: "https://github.com/psainieojitha",
                icon: "💻",
                value: "github.com/psainieojitha",
              },
              {
                label: "LinkedIn",
                href: "https://linkedin.com/in/psainieojitha",
                icon: "🔗",
                value: "linkedin.com/in/psainieojitha",
              },
            ].map((c) => (
              <motion.a
                key={c.label}
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                variants={fadeUp}
                whileHover={{ y: -4 }}
                className="group flex items-center gap-3 px-6 py-4 rounded-xl border border-white/10 bg-white/3 hover:border-blue-500/50 hover:bg-blue-500/5 transition-all duration-300 text-left"
              >
                <span className="text-xl">{c.icon}</span>
                <div>
                  <p className="text-xs text-white/40 font-mono uppercase tracking-wider">
                    {c.label}
                  </p>
                  <p className="text-sm text-white/80 group-hover:text-blue-400 transition-colors duration-200">
                    {c.value}
                  </p>
                </div>
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="border-t border-white/5 py-8 text-center">
      <p className="text-xs text-white/25 font-mono tracking-widest">
        © 2025 P Sai Nieojitha · Built with React & ♥
      </p>
    </footer>
  );
}

// ─── Root App ─────────────────────────────────────────────────────────────────

export default function App() {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className="bg-[#050810] text-white min-h-screen"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=DM+Sans:wght@400;500;600&family=DM+Mono&display=swap');
        html { scroll-behavior: smooth; }
        ::selection { background: #3B82F620; color: #93C5FD; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #050810; }
        ::-webkit-scrollbar-thumb { background: #3B82F640; border-radius: 2px; }
      `}</style>

      <AnimatePresence>{!loaded && <Loader onDone={() => setLoaded(true)} />}</AnimatePresence>

      {loaded && (
        <>
          <Navbar />
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Achievements />
          <Contact />
          <Footer />
        </>
      )}
    </div>
  );
}
