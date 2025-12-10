import React from "react";
import "./TermsConditions.css";
import { motion } from "framer-motion";

const TermsConditions = () => {
  return (
    <div className="terms-container">
      <section className="terms-hero">
        <h1>Terms & Conditions</h1>
        <p>Know Your Rights and Responsibilities</p>
      </section>

      <section className="terms-content">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <h2>Introduction</h2>
            <p>
              By using Apna Gadi's services, you agree to comply with the following terms and conditions. Please read them carefully.
            </p>
          </div>

          <div>
            <h2>Eligibility</h2>
            <p>
              You must be at least 18 years old and legally able to form contracts to use our services. You also agree to provide accurate, current, and complete information during registration.
            </p>
          </div>

          <div>
            <h2>Booking & Payment</h2>
            <p>
              All bookings are subject to availability and confirmation. Payments must be made through the available methods on the platform. You are responsible for ensuring the payment details are correct.
            </p>
          </div>

          <div>
            <h2>Use of Service</h2>
            <p>
              You agree to use the services for lawful purposes only and in compliance with all applicable laws. You are responsible for the safe operation of any vehicle rented through Apna Gadi.
            </p>
          </div>

          <div>
            <h2>Cancellation & Refund</h2>
            <p>
              Cancellations made within 24 hours of booking may be eligible for a full refund. Terms for refunds are available on our platform.
            </p>
          </div>

          <div>
            <h2>Limitation of Liability</h2>
            <p>
              Apna Gadi will not be held responsible for any damage, injury, or loss incurred during the use of our services. You use the vehicles at your own risk.
            </p>
          </div>

          <div>
            <h2>Changes to Terms</h2>
            <p>
              We reserve the right to modify these terms at any time. The updated terms will be posted on this page.
            </p>
          </div>

          <div>
            <p>
              If you have any questions, please contact us at <strong>support@apnagadi.com</strong>.
            </p>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default TermsConditions;
