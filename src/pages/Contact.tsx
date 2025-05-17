import { motion } from "framer-motion";
import { Mail, Phone, Linkedin } from "lucide-react";
import { useState } from "react";
import axios from "axios";

const representatives = [
  {
    name: "Atharva Salunkhe",
    role: "CEO",
    image: "https://images.prismic.io/alphas/aCcRXidWJ-7kSNfD_Untitleddesign-6.jpg?auto=format,compress",
    contact: {
      email: "atharvasalunkhe@nexusmarketing.co.in",
      phone: "+91 82914 38590",
      linkedin: "https://linkedin.com/in/atharva-salunkhe"
    }
  },
  {
    name: "Omkar Leve",
    role: "Founder",
    image: "https://images.prismic.io/alphas/aCcRUidWJ-7kSNe9_1st.png?auto=format,compress",
    contact: {
      email: "omkarleve@nexusmarketing.co.in",
      phone: "+91 70839 03909",
      linkedin: "https://linkedin.com/in/omkar-leve"
    }
  },
  {
    name: "Vishal Das",
    role: "Marketing Director",
    image: "https://images.prismic.io/alphas/aCiHCCdWJ-7kSQJB_WhatsAppImage2025-05-16at15.55.51.jpeg?auto=format,compress",
    contact: {
      email: "vishaldas@nexusmarketing.co.in",
      phone: "+91 73041 45033",
      linkedin: "https://linkedin.com/in/vishal-das"
    }
  }
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const BOT_TOKEN = "7965214317:AAEJy9iYl674tcO8fupMzFPXn8FmRUGBG5c";
      const CHAT_ID = "-4975658405";
      
      const message = `New Contact Form Submission:\n\nName: ${formData.name}\nEmail: ${formData.email}\nMessage:\n${formData.message}`;
      
      const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
      const payload = {
        chat_id: CHAT_ID,
        text: message
      };

      const response = await axios.get(url, { params: payload });
      
      if (response.data.ok) {
        setSubmissionSuccess(true);
        setFormData({ name: "", email: "", message: "" });
      } else {
        throw new Error("Failed to send message to Telegram");
      }
    } catch (error: any) {
      console.error('Error submitting form:', error);
      setError(error.message || "Failed to send message");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <section className="bg-black relative overflow-hidden pt-16">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-white/[0.02] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            Get In Touch
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg text-gray-300 max-w-2xl mx-auto"
          >
            Ready to take your business to the next level? Let's connect and explore how we can help you achieve your goals.
          </motion.p>
        </div>

        {/* Contact Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Form */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 bg-black text-white focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 bg-black text-white focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="mt-1 block w-full rounded-md border-gray-300 bg-black text-white focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                {error && (
                  <div className="text-red-500 text-sm">{error}</div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-500 text-white py-3 px-6 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>

                {submissionSuccess && (
                  <div className="text-green-500 text-sm mt-4">
                    Message sent successfully! We'll get back to you soon.
                  </div>
                )}
              </form>
            </motion.div>
          </div>

          {/* Representatives */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {representatives.map((rep, index) => (
              <div key={index} className="bg-black/50 rounded-lg p-6">
                <div className="flex items-center space-x-6">
                  <img
                    src={rep.image}
                    alt={rep.name}
                    className="w-24 h-24 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="text-xl font-semibold text-white">
                      {rep.name}
                    </h3>
                    <p className="text-gray-400">{rep.role}</p>
                    <div className="mt-4 space-y-2">
                      <div className="flex items-center text-gray-400">
                        <Mail className="w-4 h-4 mr-2" />
                        <a
                          href={`mailto:${rep.contact.email}`}
                          className="hover:text-blue-500 transition-colors"
                        >
                          {rep.contact.email}
                        </a>
                      </div>
                      <div className="flex items-center text-gray-400">
                        <Phone className="w-4 h-4 mr-2" />
                        <span>{rep.contact.phone}</span>
                      </div>
                      <div className="flex items-center text-gray-400">
                        <Linkedin className="w-4 h-4 mr-2" />
                        <a
                          href={rep.contact.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-blue-500 transition-colors"
                        >
                          LinkedIn
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}