import React, { useEffect, useRef } from 'react';
import { GraduationCap, Calendar, MapPin, Award } from 'lucide-react';
import { motion } from 'framer-motion';

const Education = () => {
  const educationRef = useRef<HTMLDivElement>(null);

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

    const educationCards = educationRef.current?.querySelectorAll('.education-card');
    educationCards?.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  const educationData = [
    {
      type: 'Education',
      title: 'Bachelor of Technology in Computer Science',
      institution: 'ABC University',
      location: 'New Delhi, India',
      duration: '2020 - 2024',
      grade: 'CGPA: 8.5/10',
      description: 'Specialized in Software Engineering and Data Structures. Active member of the Programming Club and DevOps Society.',
      activities: [
        'President of Computer Science Society',
        'Winner of Inter-college Programming Contest',
        'Led DevOps workshop series for 200+ students'
      ]
    },
    {
      type: 'Internship',
      title: 'DevOps Engineer Intern',
      institution: 'Tech Solutions Pvt Ltd',
      location: 'Bangalore, India',
      duration: 'Jun 2023 - Aug 2023',
      grade: 'Performance: Excellent',
      description: 'Worked on CI/CD pipeline automation, container orchestration, and cloud infrastructure management using AWS and Kubernetes.',
      activities: [
        'Reduced deployment time by 60% using Jenkins pipelines',
        'Implemented monitoring solutions with Prometheus',
        'Mentored 3 junior interns on DevOps practices'
      ]
    },
    {
      type: 'Certification',
      title: 'AWS Certified Solutions Architect',
      institution: 'Amazon Web Services',
      location: 'Online',
      duration: 'Mar 2023',
      grade: 'Score: 850/1000',
      description: 'Comprehensive certification covering AWS cloud architecture, security, and best practices for scalable applications.',
      activities: [
        'Hands-on experience with 20+ AWS services',
        'Designed fault-tolerant architectures',
        'Implemented cost optimization strategies'
      ]
    },
    {
      type: 'Training',
      title: 'Kubernetes Administrator Bootcamp',
      institution: 'Linux Foundation',
      location: 'Online',
      duration: 'Jan 2023 - Feb 2023',
      grade: 'Certification: CKA',
      description: 'Intensive training on Kubernetes cluster administration, networking, security, and troubleshooting.',
      activities: [
        'Managed production-grade Kubernetes clusters',
        'Implemented RBAC and network policies',
        'Automated cluster operations with Helm'
      ]
    }
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
    <section id="education" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 font-inter">
            Education & Experience
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            My academic journey and professional development in technology and DevOps
          </p>
        </motion.div>

        <motion.div 
          ref={educationRef} 
          className="space-y-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {educationData.map((item, index) => (
            <motion.div
              key={index}
              className="education-card bg-white rounded-xl p-8 shadow-md border border-gray-200"
              variants={itemVariants}
            >
              <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                {/* Icon and Type */}
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-full bg-steel-blue/10 flex items-center justify-center">
                    <GraduationCap size={32} className="text-steel-blue" />
                  </div>
                </div>
                
                {/* Content */}
                <div className="flex-1">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
                    <div>
                      <span className="text-sm text-steel-blue font-semibold uppercase tracking-wide">
                        {item.type}
                      </span>
                      <h3 className="text-xl font-bold text-gray-900 mb-1 font-inter">
                        {item.title}
                      </h3>
                      <p className="text-steel-blue font-medium mb-2">
                        {item.institution}
                      </p>
                    </div>
                    
                    <div className="flex flex-col lg:text-right text-sm text-gray-600 space-y-1">
                      <div className="flex items-center lg:justify-end">
                        <Calendar size={16} className="mr-2 text-steel-blue" />
                        {item.duration}
                      </div>
                      <div className="flex items-center lg:justify-end">
                        <MapPin size={16} className="mr-2 text-steel-blue" />
                        {item.location}
                      </div>
                      <div className="flex items-center lg:justify-end">
                        <Award size={16} className="mr-2 text-steel-blue" />
                        {item.grade}
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {item.description}
                  </p>
                  
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-3 font-inter">
                      Key Achievements:
                    </h4>
                    <ul className="space-y-2">
                      {item.activities.map((activity, activityIndex) => (
                        <li key={activityIndex} className="flex items-start">
                          <div className="w-2 h-2 bg-steel-blue rounded-full mt-2 mr-3 flex-shrink-0"></div>
                          <span className="text-gray-600">{activity}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Education;