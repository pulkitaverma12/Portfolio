import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { InteractiveRobotSpline } from '../ui/interactive-3d-robot';
import { portfolioConfig } from '../../data/portfolioConfig';
import './About.css';

const LEETCODE_USERNAME = 'Pulkitaverma';
const GITHUB_USERNAME = portfolioConfig.githubUsername;

const baseStats = [
  { value: 0, label: 'LeetCode Solved', suffix: '+' },
  { value: 20, label: "Projects", suffix: "+" },
  { value: 0, label: "GitHub Pushes", suffix: "+" },
  { value: 5, label: "Technologies", suffix: "+" }
];

const getSolvedCount = (payload) => {
  const value =
    payload?.totalSolved ??
    payload?.solvedProblem ??
    payload?.solved ??
    payload?.acSubmissionNum?.find((entry) => entry?.difficulty === 'All')?.count ??
    payload?.submitStats?.acSubmissionNum?.find((entry) => entry?.difficulty === 'All')?.count;

  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : null;
};

const AnimatedNumber = ({ end, duration = 2.5, inView }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let startTimestamp = null;
    let animationFrame;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        animationFrame = window.requestAnimationFrame(step);
      }
    };
    animationFrame = window.requestAnimationFrame(step);
    
    return () => {
      if(animationFrame) window.cancelAnimationFrame(animationFrame);
    };
  }, [inView, end, duration]);

  return <span>{count}</span>;
};

const About = () => {
  const ROBOT_SCENE_URL = 'https://prod.spline.design/PyzDhpQ9E5f1E3MT/scene.splinecode';
  const [leetcodeSolved, setLeetcodeSolved] = useState(0);
  const [githubPushes, setGithubPushes] = useState(0);

  useEffect(() => {
    let isMounted = true;

    const fetchLeetCodeSolved = async () => {
      const endpoints = [
        `https://leetcode-api-faisalshohag.vercel.app/${LEETCODE_USERNAME}`,
        `https://alfa-leetcode-api.onrender.com/${LEETCODE_USERNAME}`
      ];

      for (const endpoint of endpoints) {
        try {
          const response = await fetch(endpoint);
          if (!response.ok) continue;

          const payload = await response.json();
          const solvedCount = getSolvedCount(payload);
          if (solvedCount === null) continue;

          if (isMounted) {
            setLeetcodeSolved(solvedCount);
          }
          return;
        } catch (error) {
          // Try next endpoint.
        }
      }
    };

    fetchLeetCodeSolved();
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    let isMounted = true;

    const fetchGithubPushes = async () => {
      try {
        let totalPushes = 0;

        // GitHub public events API returns recent events only.
        for (let page = 1; page <= 10; page += 1) {
          const response = await fetch(
            `https://api.github.com/users/${GITHUB_USERNAME}/events/public?per_page=100&page=${page}`
          );

          if (!response.ok) break;

          const events = await response.json();
          if (!Array.isArray(events) || events.length === 0) break;

          totalPushes += events.filter((event) => event?.type === 'PushEvent').length;

          if (events.length < 100) break;
        }

        if (isMounted) {
          setGithubPushes(totalPushes);
        }
      } catch (error) {
        // Keep default value when request fails.
      }
    };

    fetchGithubPushes();
    return () => {
      isMounted = false;
    };
  }, []);

  const stats = useMemo(
    () => [
      { ...baseStats[0], value: leetcodeSolved },
      baseStats[1],
      { ...baseStats[2], value: githubPushes },
      baseStats[3]
    ],
    [leetcodeSolved, githubPushes]
  );

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <section id="about" className="about-section" ref={ref}>
      <div className="about-container">
        
        <div className="about-header">
          <motion.div 
            className="section-number"
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 0.1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            02
          </motion.div>
          <motion.h2 
            className="section-title"
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            About Me
          </motion.h2>
        </div>

        <div className="about-content">
          <motion.div 
            className="about-text-container"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="about-text">
              I'm <span className="highlight">Pulkita Verma</span>, a passionate and detail-oriented developer specializing in modern web technologies. I have hands-on experience in building responsive applications and integrating frontend with backend systems. I am driven by problem-solving and continuously strive to improve my technical and development skills.
            </p>
            
            <div className="stats-grid">
              {stats.map((stat, idx) => (
                <div key={idx} className="stat-card hover-target">
                  <div className="stat-value">
                    <AnimatedNumber end={stat.value} inView={inView} />
                    <span className="stat-suffix">{stat.suffix}</span>
                  </div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            className="about-visual"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <InteractiveRobotSpline
              scene={ROBOT_SCENE_URL}
              className="about-robot-spline"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
