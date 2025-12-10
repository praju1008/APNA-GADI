import React from "react";
import "./PrivacyPolicy.css";
import { motion } from "framer-motion";

const PrivacyPolicy = () => {
  return (
    <div className="privacy-container">
      <section className="privacy-hero">
        <h1>Privacy Policy</h1>
        <p>Your Privacy Matters to Us</p>
      </section>

      <section className="privacy-content">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2>Introduction</h2>
          <p>
            At Apna Gadi, we value your privacy and are committed to protecting your personal information. This privacy policy outlines how we collect, use, and protect your data when you use our services.
          </p>

          <h2>Information We Collect</h2>
          <p>
            We collect personal information such as your name, email address, phone number, and payment details when you sign up, book a vehicle, or contact us.
          </p>

          <h2>How We Use Your Information</h2>
          <p>
            Your personal information is used for booking, providing customer support, improving our services, and sending relevant updates. We may also use your information to notify you about special offers and promotions.
          </p>

          <h2>Data Security</h2>
          <p>
            We take data security seriously and implement strict measures to ensure that your personal information is kept safe. We use encryption technologies to protect sensitive data.
          </p>

          <h2>Third-Party Sharing</h2>
          <p>
            We do not share your personal data with third parties without your consent, except where required by law or to provide the services you've requested.
          </p>

          <h2>Changes to This Policy</h2>
          <p>
            We reserve the right to update this privacy policy as necessary. Any changes will be posted on this page with the updated date.
          </p>

          <p>
            For any questions or concerns, feel free to contact us at <strong>support@apnagadi.com</strong>.
          </p>
        </motion.div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
