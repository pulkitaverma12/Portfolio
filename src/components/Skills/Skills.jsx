import React from 'react';
import GitHubActivityGraph from '../ui/GitHubActivityGraph.jsx';
import { portfolioConfig } from '../../data/portfolioConfig';
import './Skills.css';

const skillGroups = [
  {
    title: 'Languages',
    items: ['C/C++', 'Python', 'Java', 'JavaScript', 'PHP', 'SQL', 'Dart']
  },
  {
    title: 'Frameworks',
    items: ['React', 'Node.js', 'Flutter', 'Flask', 'Bootstrap']
  },
  {
    title: 'Core Competencies',
    items: [
      'Data Structures & Algorithms',
      'Object-Oriented Programming',
      'Database Design',
      'Operating Systems',
      'Computer Networks',
      'System Architecture',
      'Full-Stack Development',
      'Cloud Computing'
    ]
  },
  {
    title: 'Infra / Tools',
    items: ['Git', 'Linux', 'MySQL', 'RESTful APIs', 'Google Cloud Platform', 'Android Studio', 'VS Code', 'Arduino']
  }
];

const Skills = () => {
  const githubUsername = portfolioConfig.githubUsername;
  const githubProfileUrl = portfolioConfig.socialLinks.github;

  return (
    <section id="skills" className="skills-section">
      <div className="skills-shell">
        <div className="section-header">
          <span className="skills-kicker">SKILLS</span>
          <h2 className="section-title">Tech Stack</h2>
        </div>

        <div className="skills-grid">
          {skillGroups.map((group) => (
            <article key={group.title} className="skills-card hover-target">
              <h3>{group.title}</h3>

              <div className="skills-pills">
                {group.items.map((item) => (
                  <span key={item} className="skill-pill">
                    {item}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>

        <GitHubActivityGraph githubUsername={githubUsername} githubProfileUrl={githubProfileUrl} />
      </div>
    </section>
  );
};

export default Skills;
