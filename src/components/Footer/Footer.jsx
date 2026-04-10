import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import resumeFile from '../../assets/resume.pdf';
import './Footer.css';

const Footer = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const resumeUrl = resumeFile;

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="footer-section">
      <div className="footer-container">
        <p className="copyright">
          © {new Date().getFullYear()} Pulkita Verma. All rights reserved.
        </p>
        <div className="footer-links-wrap">
          <p className="credit">
            Designed & Built by <span className="highlight">Pulkita Verma</span>
          </p>
          <div className="footer-resume-links">
            <a
              href={resumeUrl}
              download="resume.pdf"
              className="footer-link footer-link-download hover-target"
            >
              Download Resume
            </a>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showScrollTop && (
          <motion.button 
            className="scroll-top-btn hover-target"
            onClick={scrollToTop}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            whileHover={{ y: -5 }}
          >
            <ArrowUp size={24} />
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  );
};

export default Footer;
