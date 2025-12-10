import React from "react";
import "./PaymentPolicy.css"; // Custom CSS for the payment policy page
import { motion } from "framer-motion";

const PaymentPolicy = () => {
  return (
    <div className="payment-policy-container">
      <section className="payment-policy-hero">
        <h1>Payment Policy</h1>
        <p>Know Your Payment Options and Security</p>
      </section>

      <section className="payment-policy-content">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="payment-section">
            <h2>Secure & Flexible Payments</h2>
            <p>
              At <strong>Apna Gadi</strong>, we ensure a secure, seamless payment experience for all bookings and purchases. Whether you're renting an EV or buying an accessory, your transaction is in safe hands.
            </p>

            <ul>
              <li>💳 We accept all major credit/debit cards, UPI, Net Banking, and Wallets.</li>
              <li>🔐 All transactions are secured with end-to-end encryption (SSL certified).</li>
              <li>📩 A digital invoice is sent to your registered email after each payment.</li>
              <li>💰 EMI options available for selected products and services.</li>
              <li>🕓 Bookings must be prepaid to confirm your slot and availability.</li>
              <li>🚫 COD (Cash on Delivery) is not available for rentals.</li>
            </ul>

            <p>
              For any billing concerns or transaction support, reach out to us at <a href="mailto:billing@apnagadi.in">billing@apnagadi.in</a>.
            </p>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default PaymentPolicy;
