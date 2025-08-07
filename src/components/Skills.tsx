import React, { useRef, useEffect } from 'react';
import { FaDocker, FaLinux, FaJenkins, FaPython, FaReact, FaAws, FaGitAlt } from 'react-icons/fa';
import { SiKubernetes, SiTerraform, SiMongodb, SiPostgresql, SiRedis, SiNginx } from 'react-icons/si';
import { Server, Database, Code, Cloud } from 'lucide-react';
import { motion } from 'framer-motion';

const Skills = () => {
  const skillsRef = useRef<HTMLDivElement>(null);

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

    const skillCards = skillsRef.current?.querySelectorAll('.skill-card');
    skillCards?.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  const skillCategories = [
    {
      title: 'DevOps & Infrastructure',
      icon: <Server size={24} className="text-steel-blue" />,
      skills: [
        { name: 'Docker', icon: <FaDocker size={32} className="text-blue-500" />, level: 90 },
        { name: 'Kubernetes', icon: <SiKubernetes size={32} className="text-blue-600" />, level: 85 },
        { name: 'Jenkins', icon: <FaJenkins size={32} className="text-red-500" />, level: 88 },
        { name: 'Terraform', icon: <SiTerraform size={32} className="text-purple-600" />, level: 82 },
        { name: 'Linux', icon: <FaLinux size={32} className="text-yellow-500" />, level: 92 },
        { name: 'Nginx', icon: <SiNginx size={32} className="text-green-500" />, level: 80 },
      ]
    },
    {
      title: 'Cloud & Databases',
      icon: <Cloud size={24} className="text-steel-blue" />,
      skills: [
        { name: 'AWS', icon: <FaAws size={32} className="text-orange-500" />, level: 87 },
        { name: 'MongoDB', icon: <SiMongodb size={32} className="text-green-600" />, level: 85 },
        { name: 'PostgreSQL', icon: <SiPostgresql size={32} className="text-blue-700" />, level: 83 },
        { name: 'Redis', icon: <SiRedis size={32} className="text-red-600" />, level: 78 },
      ]
    },
    {
      title: 'Programming & Development',
      icon: <Code size={24} className="text-steel-blue" />,
      skills: [
        { name: 'Python', icon: <FaPython size={32} className="text-yellow-400" />, level: 90 },
        { name: 'React', icon: <FaReact size={32} className="text-cyan-400" />, level: 85 },
        { name: 'Git', icon: <FaGitAlt size={32} className="text-orange-600" />, level: 88 },
      ]
    }
  ];

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
    <section id="skills" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 font-inter">
            Skills & Technologies
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            My technical expertise spans across DevOps, cloud infrastructure, and backend development
          </p>
        </motion.div>

        <div ref={skillsRef} className="space-y-16">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              className="skill-category"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <motion.div 
                className="flex items-center justify-center mb-8"
                variants={itemVariants}
              >
                {category.icon}
                <h3 className="text-2xl font-semibold text-gray-800 ml-3 font-inter">
                  {category.title}
                </h3>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    className="skill-card bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200"
                    variants={itemVariants}
                    whileHover={{ 
                      scale: 1.02,
                      y: -5,
                      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
                    }}
                  >
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 rounded-lg bg-gray-50 flex items-center justify-center mr-4">
                        {skill.icon}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-gray-800 font-inter">
                          {skill.name}
                        </h4>
                      </div>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <motion.div 
                        className="bg-steel-blue h-2 rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                      />
                    </div>
                    <div className="text-right mt-2">
                      <span className="text-sm text-gray-600 font-medium">{skill.level}%</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;