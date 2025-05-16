import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Linkedin } from "lucide-react";
import { useState } from "react";
import axios from "axios";

const representatives = [
  {
    name: "Atharva Salunkhe",
    role: "CEO",
    image: "/representatives/atharva.jpg",
    contact: {
      email: "contact@nexusmarketing.com",
      phone: "+91 82914 38590",
      linkedin: "https://linkedin.com/in/atharva-salunkhe"
    }
  },
  {
    name: "Omkar Leve",
    role: "Founder",
    image: "/representatives/omkar.jpg",
    contact: {
      email: "omkar@nexusmarketing.com",
      phone: "+91 70839 03909",
      linkedin: "https://linkedin.com/in/omkar-leve"
    }
  },
  {
    name: "Vishal Das",
    role: "Marketing Director",
    image: "/representatives/vishal.jpg",
    contact: {
      email: "vishal@nexusmarketing.com",
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
      // Send to Telegram bot
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
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold text-white mb-4"
          >
            Contact Us
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-white/50 max-w-2xl mx-auto"
          >
            Get in touch with our team or send us a message
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Representatives */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-8"
          >
            {representatives.map((rep) => (
              <div 
                key={rep.name}
                className="bg-neutral-900 rounded-2xl p-6 border border-white/10 flex gap-6 items-center"
              >
                {/* Avatar */}
                <div className="w-20 h-20 rounded-full bg-neutral-800 overflow-hidden flex-shrink-0">
                  <img 
                    src={rep.image} 
                    alt={rep.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Info */}
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-white">{rep.name}</h3>
                  <p className="text-white/50 text-sm mb-3">{rep.role}</p>
                  
                  <div className="flex gap-4">
                    <a 
                      href={`mailto:${rep.contact.email}`}
                      className="text-white/70 hover:text-white transition-colors"
                    >
                      <Mail className="w-4 h-4" />
                    </a>
                    <a 
                      href={`tel:${rep.contact.phone}`}
                      className="text-white/70 hover:text-white transition-colors"
                    >
                      <Phone className="w-4 h-4" />
                    </a>
                    <a 
                      href={rep.contact.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/70 hover:text-white transition-colors"
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-6"
          >
            <div className="bg-neutral-900 rounded-2xl p-8 border border-white/10">
              {error && (
                <div className="text-red-400 text-center mb-4">
                  {error}
                </div>
              )}
              
              {submissionSuccess ? (
                <div className="text-center">
                  <p className="text-white">Thank you for your message!</p>
                  <p className="text-white/50 mt-2">We'll get back to you as soon as possible.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-white/70 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-neutral-800 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-white/30"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-white/70 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-neutral-800 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-white/30"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-white/70 mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      className="w-full bg-neutral-800 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-white/30 resize-none"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-white/10 hover:bg-white/20 text-white font-medium py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}