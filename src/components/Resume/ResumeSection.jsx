import React from 'react';
import { motion } from 'framer-motion';
import resumeFile from '../../assets/resume.pdf';
import './ResumeSection.css';

const ResumeSection = () => {
  const resumeUrl = resumeFile;

  return (
    <section id="resume" className="resume-section">
      <div className="resume-container">
        <motion.div
          className="resume-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.65, ease: 'easeOut' }}
        >
          <h2 className="resume-title">Resume</h2>
          <p className="resume-subtitle">Download or view my resume</p>
        </motion.div>

        <motion.article
          className="resume-card hover-target"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <div className="resume-card-content">
            <p className="resume-description">
              Get a complete snapshot of my technical skills, projects, and experience.
            </p>
          </div>

          <div className="resume-actions">
            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="resume-btn resume-btn-outline hover-target"
            >
              View Resume
            </a>
            <a
              href={resumeUrl}
              download="resume.pdf"
              className="resume-btn resume-btn-solid hover-target"
            >
              Download Resume
            </a>
          </div>
        </motion.article>
      </div>
    </section>
  );
};

export default ResumeSection;
