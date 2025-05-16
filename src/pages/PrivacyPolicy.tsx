import React from 'react';
import { Link } from 'react-router-dom';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-black pt-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-white mb-8">Privacy Policy</h1>
        
        <div className="prose prose-invert max-w-none">
          <p className="mb-6 text-white">
            Last updated: May 16, 2025
          </p>

          <h2 className="text-white">1. Introduction</h2>
          <p className="text-white">
            Welcome to Nexus Marketing. We are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, and protect your personal data when you use our website and services.
          </p>

          <h2 className="text-white">2. Information We Collect</h2>
          <ul className="text-white">
            <li>Personal Information (name, email, phone number)</li>
            <li>Contact Information (address, company details)</li>
            <li>Communication Data (messages, emails)</li>
            <li>Technical Data (IP address, browser type)</li>
          </ul>

          <h2 className="text-white">3. How We Use Your Information</h2>
          <ul className="text-white">
            <li>To provide and improve our services</li>
            <li>To communicate with you about our services</li>
            <li>To process your inquiries and orders</li>
            <li>To comply with legal obligations</li>
          </ul>

          <h2 className="text-white">4. Data Security</h2>
          <p className="text-white">
            We implement appropriate security measures to protect your personal data from unauthorized access, disclosure, or loss.
          </p>

          <h2 className="text-white">5. Your Rights</h2>
          <ul className="text-white">
            <li>Right to access your personal data</li>
            <li>Right to rectify inaccurate information</li>
            <li>Right to request deletion</li>
            <li>Right to object to processing</li>
          </ul>

          <h2 className="text-white">6. Contact Us</h2>
          <p className="text-white">
            If you have any questions about this Privacy Policy, please contact us at:
            <br />
            <Link to="/contact" className="text-blue-400 hover:text-blue-300">Contact Us</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
