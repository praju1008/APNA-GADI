import React from "react";
import "./Careers.css";
import { motion } from "framer-motion";

const Careers = () => {
  return (
    <div className="careers-container">
      <section className="careers-hero">
        <h1>Join the Apna Gadi Team</h1>
        <p>Be part of the Green Mobility Revolution</p>
      </section>

      <section className="careers-content">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p>
            At Apna Gadi, we’re always on the lookout for passionate, motivated individuals who want to join us in our mission to revolutionize the way people travel. If you're someone who is driven by innovation, sustainability, and making a positive impact, we'd love to hear from you!
          </p>

          <p>
            We're looking for individuals in various fields, including technology, customer service, marketing, operations, and more. As a growing company, we offer exciting career opportunities where you can learn, grow, and make a difference.
          </p>

          <h2>Current Openings</h2>
          <ul>
            <li>Software Engineer</li>
            <li>Customer Support Executive</li>
            <li>Marketing Specialist</li>
            <li>Operations Manager</li>
          </ul>

          <p>
            To apply, please send your resume and cover letter to <strong>careers@apnagadi.com</strong>. We look forward to hearing from you!
          </p>
        </motion.div>
      </section>
    </div>
  );
};

export default Careers;
