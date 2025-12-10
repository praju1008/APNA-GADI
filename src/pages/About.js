import React from "react";
import "./About.css";
import { motion } from "framer-motion";
const AboutUs = () => {
  return (
    <div className="about-container">
      <section className="about-hero">
        <h1>About Apna Gadi</h1>
        <p>Your Trusted Partner for Electric Vehicle Rentals</p>
      </section>

      <section className="about-content">
         <motion.div
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
  >
        <p>
          Welcome to Apna Gadi, a leading-edge platform that is transforming the way people move in urban and semi-urban spaces by offering efficient, reliable, and environmentally responsible electric vehicle rental services. Born out of a vision to create a cleaner, smarter future, Apna Gadi is more than just a transportation solution—it's a movement toward sustainable living and conscious mobility choices. With an unwavering focus on customer satisfaction, safety, and innovation, we are proud to be at the forefront of India's green mobility revolution.
        </p>

        <p>
          At Apna Gadi, we understand the pulse of modern commuters. Whether you're a daily traveler heading to the office, a tourist exploring new destinations, or a student looking for affordable mobility options, our electric bikes and cars are designed to offer unmatched convenience. Our platform ensures that you can book a vehicle with just a few clicks, anytime and anywhere, without the hassles of traditional vehicle rentals. Each vehicle on our platform undergoes regular maintenance checks to guarantee safety and performance, while our intuitive interface makes the booking process seamless even for first-time users.
        </p>

        <p>
          The inspiration behind Apna Gadi was born from the pressing need to combat rising pollution levels and traffic congestion in Indian cities. With fuel prices continuously escalating and environmental concerns growing stronger by the day, we realized the importance of an electric-first approach. Our team, composed of young innovators, passionate environmentalists, and mobility experts, collaborated to bring this dream to life. Today, Apna Gadi stands as a symbol of change, helping thousands of users every day shift from fuel-based transportation to clean, silent, and smart alternatives.
        </p>

        <p>
          We believe that technology and sustainability go hand-in-hand. That’s why our backend is powered by modern tech stacks to ensure high performance and data security. we leverage the best tools to enhance the user experience. Our mobile and web platforms are constantly updated based on user feedback to meet evolving expectations. We also aim to integrate AI in future updates to recommend vehicles based on travel history, duration, location, and budget.
        </p>

        <p>
          Apna Gadi is more than a rental platform—it's a lifestyle choice for those who care about the environment and seek freedom from the limitations of traditional transport systems. Our rentals not only reduce carbon footprints but also save users from the financial burden of owning and maintaining a vehicle. We promote a sharing economy where resources are efficiently used, and accessibility is prioritized for everyone, regardless of their background or income level.
        </p>

        <p>
          As we expand, we are committed to creating a network of charging stations in collaboration with urban bodies and private players, ensuring that range anxiety becomes a thing of the past. Our partnerships with local businesses also enable us to offer discounts, loyalty rewards, and integrated trip packages to enhance customer satisfaction. We take pride in being community-driven and constantly strive to support local employment by hiring and training youth for various on-ground operations.
        </p>

        <p>
          Our mission is crystal clear: to provide affordable, efficient, and eco-conscious mobility solutions to every corner of India. We envision a future where every citizen can travel freely without polluting the environment or draining their wallet. With Apna Gadi, that future is not a distant dream but a reality unfolding every single day.
        </p>

        <p>
          We are proud of the trust our users have placed in us, and we strive every day to exceed expectations. Whether it’s through transparent pricing, fast support, or continuous innovation, we aim to remain your most trusted mobility partner. As we continue to grow, we invite you to be part of this journey—whether as a rider, a partner, or a supporter of clean energy.
        </p>

        <p>
          Join us in rewriting the story of transportation in India. Let's ride toward a greener, smarter, and brighter tomorrow—one electric vehicle at a time.
        </p>
        <p>
          Thank you for choosing Apna Gadi. Together, we can make a difference!
        </p>
        <p>
          For any inquiries, suggestions, or partnerships, please feel free to reach out to us. We are always here to listen and assist you in any way we can.<br />
          For collaborations, feedback, or support, feel free to reach out to our team anytime at <strong>apnagadi@gmail.com</strong> or call us at <strong>+919008269890</strong>. We're here to help you 24/7.
        </p>
          </motion.div>
      </section>
    </div>
  );
};

export default AboutUs;
