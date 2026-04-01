import React from 'react';
import { motion } from 'framer-motion';
import './Experience.css';

const experiences = [
  {
    id: 1,
    company: "Skyvo Technologies Pvt Ltd",
    role: "Web Development Trainee",
    duration: "Jul 2025 – Aug 2025",
    achievements: [
      "Designed and developed a café management website with Home, Menu, Cart, and Payment sections",
      "Integrated frontend with backend APIs for dynamic functionality and smooth user interaction",
      "Built responsive UI using HTML, CSS, and Bootstrap with focus on UX"
    ]
  },
  {
    id: 2,
    company: "Cognifyz Technologies",
    role: "Software Development Intern",
    duration: "Mar 2025 – Apr 2025",
    achievements: [
      "Contributed to application design, development, testing, and deployment",
      "Collaborated with cross-functional teams to analyze requirements and improve workflows",
      "Developed efficient and user-centric software solutions"
    ]
  },
  {
    id: 3,
    company: "Academic & Personal Projects",
    role: "Web Developer",
    duration: "2023 – Present",
    achievements: [
      "Built Medi Guru platform using React, PHP, and MySQL for virtual medical training",
      "Developed Café Management System with REST API integration",
      "Created Jewellery E-commerce website using HTML, CSS, Bootstrap",
      "Worked on Digital Library platform for book donations (Smriti Pustakalaya)"
    ]
  },
  {
  id: 4,
  company: "Academic Projects",
  role: "Software & Embedded Developer",
  duration: "2023",
  achievements: [
    "Enhanced a CRUD application by integrating File I/O for persistent data storage and retrieval",
    "Implemented read/write operations to ensure data remains even after program termination",
    "Designed and developed a voice-controlled robot using Arduino with motor drivers and sensors",
    "Enabled real-time movement control through voice commands and hardware integration"
  ]
  }
];

const ExperienceCard = ({ exp, index }) => {
  const isEven = index % 2 === 0;

  return (
    <div className={`timeline-item ${isEven ? 'left' : 'right'}`}>
      <motion.div 
        className="timeline-content hover-target"
        initial={{ opacity: 0, x: isEven ? -50 : 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <div className="timeline-date">{exp.duration}</div>
        <h3 className="timeline-role">{exp.role}</h3>
        <h4 className="timeline-company">{exp.company}</h4>
        <ul className="timeline-achievements">
          {exp.achievements.map((ach, i) => (
            <li key={i}>{ach}</li>
          ))}
        </ul>
      </motion.div>
      <div className="timeline-node"></div>
    </div>
  );
};

const Experience = () => {
  return (
    <section id="experience" className="experience-section">
      <div className="experience-container">
        <div className="section-header text-center">
          <motion.h2 
            className="section-title"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Experience
          </motion.h2>
        </div>

        <div className="timeline">
          {experiences.map((exp, index) => (
            <ExperienceCard key={exp.id} exp={exp} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
