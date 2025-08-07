import React, { useState, useEffect, useRef, Suspense } from 'react';
import { Github, Linkedin, Mail, Download, ChevronDown, Server, Terminal, Database } from 'lucide-react';
import { Canvas, useFrame } from '@react-three/fiber';
import { motion, useScroll, useTransform } from 'framer-motion';
import * as THREE from 'three';

// 3D Rotating Server Icon Component
const RotatingServer = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <group>
      {/* Main server body */}
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <boxGeometry args={[1.2, 1.8, 0.6]} />
        <meshStandardMaterial color="#4682B4" />
      </mesh>
      {/* Server details */}
      <mesh position={[0, 0.3, 0.31]}>
        <boxGeometry args={[0.8, 0.1, 0.02]} />
        <meshStandardMaterial color="#F5F5F5" />
      </mesh>
      <mesh position={[0, 0, 0.31]}>
        <boxGeometry args={[0.8, 0.1, 0.02]} />
        <meshStandardMaterial color="#F5F5F5" />
      </mesh>
      <mesh position={[0, -0.3, 0.31]}>
        <boxGeometry args={[0.8, 0.1, 0.02]} />
        <meshStandardMaterial color="#F5F5F5" />
      </mesh>
    </group>
  );
};

// Background Network Lines Component
const NetworkLines = () => {
  return (
    <div className="absolute inset-0 overflow-hidden opacity-10">
      <svg className="w-full h-full">
        {[...Array(6)].map((_, i) => (
          <motion.line
            key={i}
            x1={`${Math.random() * 100}%`}
            y1={`${Math.random() * 100}%`}
            x2={`${Math.random() * 100}%`}
            y2={`${Math.random() * 100}%`}
            stroke="#4682B4"
            strokeWidth="1"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.3 }}
            transition={{
              duration: 3,
              delay: i * 0.5,
              repeat: Infinity,
              repeatType: "reverse",
              repeatDelay: 2,
            }}
          />
        ))}
      </svg>
    </div>
  );
};

// Animated Dots Background
const AnimatedDots = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-gray-400 rounded-full opacity-20"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  );
};

const Hero = () => {
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

  const texts = [
    'DevOps & Backend Engineer',
    'CI/CD Specialist',
    'Cloud Automation Expert',
    'Infrastructure Architect'
  ];

  // Typewriter effect
  useEffect(() => {
    const typeSpeed = isDeleting ? 50 : 100;
    const currentFullText = texts[textIndex];

    if (!isDeleting && charIndex < currentFullText.length) {
      const timeout = setTimeout(() => {
        setCurrentText(currentFullText.substring(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      }, typeSpeed);
      return () => clearTimeout(timeout);
    } else if (isDeleting && charIndex > 0) {
      const timeout = setTimeout(() => {
        setCurrentText(currentFullText.substring(0, charIndex - 1));
        setCharIndex(charIndex - 1);
      }, typeSpeed);
      return () => clearTimeout(timeout);
    } else if (!isDeleting && charIndex === currentFullText.length) {
      const timeout = setTimeout(() => setIsDeleting(true), 2000);
      return () => clearTimeout(timeout);
    } else if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setTextIndex((textIndex + 1) % texts.length);
    }
  }, [charIndex, isDeleting, textIndex, texts]);

  const socialLinks = [
    { 
      icon: Github, 
      href: 'https://github.com/neelakshi-kaundal', 
      label: 'GitHub'
    },
    { 
      icon: Linkedin, 
      href: 'https://linkedin.com/in/neelakshi-kaundal', 
      label: 'LinkedIn'
    },
    { 
      icon: Mail, 
      href: 'mailto:neelakshikaundal89@gmail.com', 
      label: 'Email'
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <section 
      id="home" 
      ref={heroRef}
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-black"
    >
      {/* Background Elements */}
      <AnimatedDots />
      <NetworkLines />

      {/* 3D Server Animation */}
      <div className="absolute top-1/4 right-10 w-32 h-32 hidden lg:block">
        <Canvas camera={{ position: [0, 0, 5] }}>
          <Suspense fallback={null}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} color="#4682B4" />
            <RotatingServer />
          </Suspense>
        </Canvas>
      </div>

      {/* Main Content */}
      <motion.div 
        className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
        style={{ y }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-left">
            {/* Profile Picture */}
            <motion.div 
              className="mb-8 flex lg:hidden justify-center"
              variants={itemVariants}
            >
              <motion.div 
                className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-gray-300"
                whileHover={{ 
                  scale: 1.05,
                  borderColor: '#4682B4'
                }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <img 
                  src="https://images.pexels.com/photos/3756681/pexels-photo-3756681.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop" 
                  alt="Neelakshi Kaundal" 
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </motion.div>

            {/* Name */}
            <motion.h1 
              className="text-5xl md:text-7xl font-bold mb-6 text-white font-inter tracking-tight"
              variants={itemVariants}
            >
              Neelakshi Kaundal
            </motion.h1>

            {/* Animated Subtitle */}
            <motion.div 
              className="mb-6"
              variants={itemVariants}
            >
              <div className="text-xl md:text-2xl text-gray-300 mb-2 font-light">
                <span className="text-steel-blue font-medium">
                  {currentText}
                </span>
                <span className="animate-pulse text-gray-400">|</span>
              </div>
              <div className="flex flex-wrap gap-2 text-sm text-gray-400">
                <span>CI/CD</span>
                <span>•</span>
                <span>Cloud Automation</span>
                <span>•</span>
                <span>Infrastructure</span>
              </div>
            </motion.div>

            {/* Bio */}
            <motion.p 
              className="text-lg text-gray-300 max-w-2xl mb-8 leading-relaxed font-inter"
              variants={itemVariants}
            >
              I design scalable infrastructures and build automated backend systems using tools like Docker, Kubernetes, Jenkins, and cloud-native tech.
            </motion.p>

            {/* Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 mb-8"
              variants={itemVariants}
            >
              <motion.button
                className="px-6 py-3 border-2 border-steel-blue text-steel-blue font-medium rounded-lg hover:bg-steel-blue hover:text-white transition-all duration-300 flex items-center justify-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Download size={18} />
                📄 Download Resume
              </motion.button>

              <motion.button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-6 py-3 bg-steel-blue text-white font-medium rounded-lg hover:bg-blue-600 transition-all duration-300 flex items-center justify-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Mail size={18} />
                📬 Get In Touch
              </motion.button>
            </motion.div>

            {/* Social Links */}
            <motion.div 
              className="flex gap-6"
              variants={itemVariants}
            >
              {socialLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full border border-gray-600 text-gray-400 hover:text-steel-blue hover:border-steel-blue transition-all duration-300"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={link.label}
                >
                  <link.icon size={20} />
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* Right Content - Profile Picture for Desktop */}
          <div className="hidden lg:flex justify-center">
            <motion.div 
              className="relative"
              variants={itemVariants}
            >
              <motion.div 
                className="relative w-80 h-80 rounded-full overflow-hidden border-4 border-gray-700"
                whileHover={{ 
                  scale: 1.05,
                  borderColor: '#4682B4',
                  rotate: 2
                }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <img 
                  src="https://images.pexels.com/photos/3756681/pexels-photo-3756681.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop" 
                  alt="Neelakshi Kaundal" 
                  className="w-full h-full object-cover"
                />
              </motion.div>
              
              {/* Floating Tech Icons */}
              <motion.div
                className="absolute -top-4 -right-4 w-12 h-12 bg-steel-blue rounded-full flex items-center justify-center"
                animate={{ 
                  y: [0, -10, 0],
                  rotate: [0, 180, 360]
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Server size={24} className="text-white" />
              </motion.div>

              <motion.div
                className="absolute -bottom-4 -left-4 w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center"
                animate={{ 
                  y: [0, 10, 0],
                  rotate: [0, -180, -360]
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
              >
                <Terminal size={24} className="text-steel-blue" />
              </motion.div>

              <motion.div
                className="absolute top-1/2 -left-6 w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center"
                animate={{ 
                  x: [0, -5, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5
                }}
              >
                <Database size={20} className="text-white" />
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
          variants={itemVariants}
          onClick={() => document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' })}
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown 
            size={32} 
            className="text-gray-400 hover:text-steel-blue transition-colors duration-300"
          />
          <p className="text-gray-500 text-xs mt-1 text-center">Scroll to explore</p>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;