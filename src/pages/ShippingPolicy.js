import React from "react";
import "./ShippingPolicy.css"; // Custom CSS
import { motion } from "framer-motion";

const ShippingPolicy = () => {
  return (
    <div className="shipping-policy-container">
      <section className="shipping-policy-hero">
        <h1>Shipping Policy</h1>
        <p>Your Guide to Delivery & Transportation</p>
      </section>

      <section className="shipping-policy-content">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="shipping-section">
            <h2>Delivery & Logistics</h2>
            <p>
              At <strong>Apna Gadi</strong>, we ensure timely and safe delivery of our electric vehicles and accessories.
              Shipping is available in all serviceable cities.
            </p>

            <ul>
              <li>📦 Orders are processed within <strong>1-2 business days</strong>.</li>
              <li>🚚 Delivery typically takes <strong>5-7 business days</strong>, depending on your location.</li>
              <li>📍 Real-time tracking is provided after dispatch via SMS/email.</li>
              <li>💰 Shipping charges (if any) will be shown at checkout.</li>
              <li>❗ Deliveries are made during working hours only (10 AM – 6 PM).</li>
            </ul>

            <p>
              For any special delivery instructions, feel free to contact our support team at
              <a href="mailto:support@apnagadi.in"> support@apnagadi.in</a>.
            </p>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default ShippingPolicy;
