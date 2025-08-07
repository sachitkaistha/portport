import React from 'react';
import { Github, Linkedin, Mail, ArrowUp, Heart } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = [
    { icon: Github, href: 'https://github.com/neelakshi-kaundal', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com/in/neelakshi-kaundal', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:neelakshikaundal89@gmail.com', label: 'Email' },
  ];

  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Education', href: '#education' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white font-inter">
              Neelakshi Kaundal
            </h3>
            <p className="text-gray-400 max-w-md">
              DevOps & Backend Engineer passionate about building scalable infrastructure 
              and automated systems. Always learning, always growing.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-gray-800 hover:bg-steel-blue transition-all duration-300 hover:scale-110"
                  aria-label={link.label}
                >
                  <link.icon size={20} className="text-gray-400 hover:text-white transition-colors duration-300" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white font-inter">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-steel-blue transition-colors duration-300 hover:underline"
                    onClick={(e) => {
                      e.preventDefault();
                      document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white font-inter">Get In Touch</h4>
            <div className="space-y-2">
              <p className="text-gray-400">
                <span className="font-medium">Email:</span> neelakshikaundal89@gmail.com
              </p>
              <p className="text-gray-400">
                <span className="font-medium">Phone:</span> +91 9056103909
              </p>
              <p className="text-gray-400">
                <span className="font-medium">Location:</span> Hoshiapur, Mukerian (Punjab)
              </p>
            </div>
            <div className="inline-flex items-center px-3 py-1 bg-green-600 text-white text-sm rounded-full">
              <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></div>
              Available for opportunities
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm flex items-center">
            © 2024 Neelakshi Kaundal. Made with 
            <Heart size={16} className="text-red-500 mx-1" /> 
            and lots of coffee.
          </p>
          
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <p className="text-gray-400 text-sm">
              Built with React & Tailwind CSS
            </p>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-full bg-steel-blue text-white hover:bg-blue-600 transition-all duration-300 transform hover:scale-110"
              aria-label="Scroll to top"
            >
              <ArrowUp size={16} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;