import React from 'react';
import { Link } from 'react-router-dom';

const TermsConditions = () => {
  return (
    <div className="min-h-screen bg-black pt-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-white mb-8">Terms & Conditions</h1>
        
        <div className="prose prose-invert max-w-none">
          <p className="mb-6 text-white">
            Last updated: May 16, 2025
          </p>

          <h2 className="text-white">1. Acceptance of Terms</h2>
          <p className="text-white">
            By accessing or using our website and services, you agree to be bound by these Terms & Conditions.
          </p>

          <h2 className="text-white">2. Services</h2>
          <p className="text-white">
            We provide various marketing and development services as described on our website. All services are subject to availability and may require additional terms specific to each service.
          </p>

          <h2 className="text-white">3. Pricing and Payment</h2>
          <ul className="text-white">
            <li>Prices are subject to change without notice</li>
            <li>Payment terms will be specified in your service agreement</li>
            <li>Any late payments may incur additional fees</li>
          </ul>

          <h2 className="text-white">4. Intellectual Property</h2>
          <p className="text-white">
            All content on our website is protected by copyright. You may not use or reproduce any content without our express written permission.
          </p>

          <h2 className="text-white">5. Limitation of Liability</h2>
          <p className="text-white">
            We are not liable for any indirect, incidental, or consequential damages arising from the use of our services.
          </p>

          <h2 className="text-white">6. Termination</h2>
          <p className="text-white">
            We reserve the right to terminate any service agreement if you violate these Terms & Conditions.
          </p>

          <h2 className="text-white">7. Changes to Terms</h2>
          <p className="text-white">
            We may update these Terms & Conditions at any time. Your continued use of our services constitutes acceptance of the updated terms.
          </p>

          <h2 className="text-white">8. Contact Us</h2>
          <p className="text-white">
            If you have any questions about these Terms & Conditions, please contact us at:
            <br />
            <Link to="/contact" className="text-blue-400 hover:text-blue-300">Contact Us</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsConditions;
