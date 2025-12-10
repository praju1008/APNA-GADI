import React from "react";
import "./ReturnPolicy.css"; // Custom CSS for the return policy page
import { motion } from "framer-motion";

const ReturnPolicy = () => {
  return (
    <div className="return-policy-container">
      <section className="return-policy-hero">
        <h1>Return Policy</h1>
        <p>Know Your Rights for Returns & Cancellations</p>
      </section>

      <section className="return-policy-content">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="return-section">
            <h2>Return & Cancellation Guidelines</h2>
            <p>
              At <strong>Apna Gadi</strong>, your satisfaction is our top priority. If you are not fully satisfied with your booking or accessory purchase, we offer a hassle-free return and cancellation policy.
            </p>

            <ul>
              <li>↩️ Returns are accepted within <strong>30 days</strong> of purchase.</li>
              <li>📦 Product must be in original condition with all accessories.</li>
              <li>🧾 A valid invoice or order ID is required for all returns.</li>
              <li>💸 Refunds will be processed within <strong>7–10 business days</strong> after inspection.</li>
              <li>🚫 Vehicles once delivered and used are <strong>not eligible</strong> for return.</li>
              <li>🕓 Cancellations must be made <strong>24 hours before the scheduled delivery</strong>.</li>
            </ul>

            <p>
              For return or cancellation requests, contact us at <a href="mailto:support@apnagadi.in">support@apnagadi.in</a> or visit your account dashboard.
            </p>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default ReturnPolicy;
