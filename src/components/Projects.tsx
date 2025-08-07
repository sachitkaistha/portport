import React, { useState, useRef, useEffect } from 'react';
import { Github, ExternalLink, Filter } from 'lucide-react';
import { motion } from 'framer-motion';

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const projectsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up');
          }
        });
      },
      { threshold: 0.1 }
    );

    const projectCards = projectsRef.current?.querySelectorAll('.project-card');
    projectCards?.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  const filters = ['All', 'DevOps', 'Python', 'Web', 'ML'];

  const projects = [
    {
      title: 'Kubernetes CI/CD Pipeline',
      description: 'Automated deployment pipeline using Jenkins, Docker, and Kubernetes for microservices architecture.',
      image: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=400',
      tags: ['DevOps', 'Kubernetes', 'Jenkins', 'Docker'],
      category: 'DevOps',
      githubUrl: 'https://github.com/neelakshi-kaundal',
      liveUrl: 'https://demo.example.com'
    },
    {
      title: 'Infrastructure as Code',
      description: 'Terraform scripts for AWS infrastructure provisioning with automated scaling and monitoring.',
      image: 'https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=400',
      tags: ['DevOps', 'Terraform', 'AWS', 'Infrastructure'],
      category: 'DevOps',
      githubUrl: 'https://github.com/neelakshi-kaundal',
      liveUrl: 'https://demo.example.com'
    },
    {
      title: 'Python API Gateway',
      description: 'High-performance REST API built with FastAPI, featuring authentication, rate limiting, and monitoring.',
      image: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=400',
      tags: ['Python', 'FastAPI', 'PostgreSQL', 'Redis'],
      category: 'Python',
      githubUrl: 'https://github.com/neelakshi-kaundal',
      liveUrl: 'https://demo.example.com'
    },
    {
      title: 'React Dashboard',
      description: 'Modern admin dashboard with real-time monitoring, analytics, and responsive design.',
      image: 'https://images.pexels.com/photos/1181673/pexels-photo-1181673.jpeg?auto=compress&cs=tinysrgb&w=400',
      tags: ['React', 'TypeScript', 'Tailwind', 'Charts'],
      category: 'Web',
      githubUrl: 'https://github.com/neelakshi-kaundal',
      liveUrl: 'https://demo.example.com'
    },
    {
      title: 'ML Model Deployment',
      description: 'Machine learning model deployment using Docker containers with automated retraining pipeline.',
      image: 'https://images.pexels.com/photos/1181676/pexels-photo-1181676.jpeg?auto=compress&cs=tinysrgb&w=400',
      tags: ['Python', 'ML', 'Docker', 'TensorFlow'],
      category: 'ML',
      githubUrl: 'https://github.com/neelakshi-kaundal',
      liveUrl: 'https://demo.example.com'
    },
    {
      title: 'Monitoring Stack',
      description: 'Complete monitoring solution using Prometheus, Grafana, and ELK stack for infrastructure observability.',
      image: 'https://images.pexels.com/photos/1181678/pexels-photo-1181678.jpeg?auto=compress&cs=tinysrgb&w=400',
      tags: ['DevOps', 'Prometheus', 'Grafana', 'ELK'],
      category: 'DevOps',
      githubUrl: 'https://github.com/neelakshi-kaundal',
      liveUrl: 'https://demo.example.com'
    }
  ];

  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1
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
    <section id="projects" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 font-inter">
            Featured Projects
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A showcase of my latest work in DevOps, backend development, and automation
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div 
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                activeFilter === filter
                  ? 'bg-steel-blue text-white shadow-lg'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {filter}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div 
          ref={projectsRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.title}
              className="project-card bg-white rounded-xl overflow-hidden shadow-md border border-gray-200"
              variants={itemVariants}
              whileHover={{ 
                scale: 1.02,
                y: -5,
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)'
              }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="relative overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all duration-300"></div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3 text-gray-900 font-inter">
                  {project.title}
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag, tagIndex) => (
                    <span 
                      key={tagIndex}
                      className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex gap-4">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:border-steel-blue hover:text-steel-blue transition-all duration-300"
                  >
                    <Github size={16} className="mr-2" />
                    Code
                  </a>
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center px-4 py-2 bg-steel-blue text-white rounded-lg hover:bg-blue-600 transition-all duration-300"
                  >
                    <ExternalLink size={16} className="mr-2" />
                    Live Demo
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View More Button */}
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <a
            href="https://github.com/neelakshi-kaundal"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-8 py-3 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-all duration-300"
          >
            <Github size={20} className="mr-2" />
            View All Projects
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;