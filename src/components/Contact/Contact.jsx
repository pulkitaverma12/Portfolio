import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Check, AlertCircle } from 'lucide-react';
import { GithubIcon, LinkedinIcon, TwitterIcon } from '../Icons';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: '' });
  const [copied, setCopied] = useState(false);

  // You can set the target email here.
  const emailAddress = "pulkitaverma10@gmail.com";
  const formSubmitEndpoint = `https://formsubmit.co/ajax/${emailAddress}`;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const showToast = (message, type) => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: '', type: '' });
    }, 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(formSubmitEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          _subject: `Portfolio Contact: ${formData.subject}`,
          _template: 'table',
          _captcha: 'false'
        })
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      setIsSubmitting(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
      showToast('Message sent successfully!', 'success');
    } catch (error) {
      setIsSubmitting(false);
      showToast('Message send nahi ho paya. Please try again.', 'error');
    }
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="contact-section">
      <div className="contact-container">
        
        <div className="contact-split">
          <motion.div 
            className="contact-left"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title">Let's Connect</h2>
            <p className="contact-heading">
              Have a project in mind? Let's build something amazing together.
            </p>
            
            <div className="email-copy hover-target" onClick={copyEmail}>
              <Mail size={24} className="accent-icon" />
              <span className="email-text">{emailAddress}</span>
              {copied ? <Check size={20} color="#E5E5E5" /> : <span className="copy-hint">Copy</span>}
            </div>

            <div className="social-links">
              <a href="https://github.com/pulkitaverma12" className="social-link hover-target" target="_blank" rel="noopener noreferrer">
                <GithubIcon size={24} />
              </a>
              <a href="https://www.linkedin.com/in/pulkita-verma-a28b16259/" className="social-link hover-target" target="_blank" rel="noopener noreferrer">
                <LinkedinIcon size={24} />
              </a>
              <a href="https://x.com/Priyal12Verma" className="social-link hover-target" target="_blank" rel="noopener noreferrer">
                <TwitterIcon size={24} />
              </a>
              <a href="https://leetcode.com/u/Pulkitaverma/" className="social-link hover-target" target="_blank" rel="noopener noreferrer" aria-label="LeetCode profile">
                <span>LC</span>
              </a>
            </div>
          </motion.div>

          <motion.div 
            className="contact-right"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="input-group">
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    value={formData.name}
                    onChange={handleChange}
                    required 
                    className="hover-target"
                  />
                  <label htmlFor="name" className={formData.name ? 'active' : ''}>Your Name</label>
                </div>
                <div className="input-group">
                  <input 
                    type="email" 
                    id="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required 
                    className="hover-target"
                  />
                  <label htmlFor="email" className={formData.email ? 'active' : ''}>Your Email</label>
                </div>
              </div>
              
              <div className="input-group">
                <input 
                  type="text" 
                  id="subject" 
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required 
                  className="hover-target"
                />
                <label htmlFor="subject" className={formData.subject ? 'active' : ''}>Subject</label>
              </div>

              <div className="input-group">
                <textarea 
                  id="message" 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required 
                  rows="5"
                  className="hover-target"
                ></textarea>
                <label htmlFor="message" className={formData.message ? 'active' : ''}>Your Message</label>
              </div>

              <button type="submit" className="submit-btn hover-target" disabled={isSubmitting}>
                {isSubmitting ? (
                  <span className="loading-spinner"></span>
                ) : (
                  "Send Message"
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {toast.show && (
          <motion.div 
            className={`toast-notification ${toast.type}`}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
          >
            {toast.type === 'success' ? <Check size={20} /> : <AlertCircle size={20} />}
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Contact;
