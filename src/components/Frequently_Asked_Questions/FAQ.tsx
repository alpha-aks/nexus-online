import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

const faqData = {
  title: "Frequently Asked Questions",
  subtitle: "Everything you need to know about our marketing services",
  questions: [
    {
      id: 1,
      question: "What services does Nexus Marketing offer?",
      answer: "We offer a comprehensive suite of marketing services including digital marketing, social media management, SEO optimization, content creation, email marketing, and lead generation."
    },
    {
      id: 2,
      question: "How do I get started with Nexus Marketing?",
      answer: "Simply fill out our contact form or reach out to one of our team members. We'll schedule a consultation to understand your needs and create a customized marketing strategy for your business."
    },
    {
      id: 3,
      question: "What's included in your pricing?",
      answer: "Our pricing is tailored to your specific needs. We offer flexible packages that can include website development, social media management, SEO services, and more. Contact us for a detailed quote."
    },
    {
      id: 4,
      question: "Can you help with social media marketing?",
      answer: "Absolutely! We specialize in social media marketing across all major platforms. We create engaging content, manage your social media presence, and help grow your online audience through strategic campaigns."
    },
    {
      id: 5,
      question: "How long does it take to see results?",
      answer: "While some marketing strategies show immediate results, others require time to build momentum. We typically see significant improvements within 3-6 months, but we'll provide regular progress updates along the way."
    },
    {
      id: 6,
      question: "Do you offer website development?",
      answer: "Yes, we offer professional website development services. Our team can create a modern, responsive website that aligns with your brand identity and marketing goals."
    }
  ],
  cta: {
    text: "Still have questions?",
    linkText: "Contact our team →"
  }
};

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      className="border-b border-white/10"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="py-6 w-full flex items-center justify-between text-left"
      >
        <span className="text-lg text-white font-medium">{question}</span>
        <ChevronDown 
          className={`w-5 h-5 text-white/50 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-white/70">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function FAQ() {
  return (
    <section className="bg-black relative overflow-hidden py-24">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-white/[0.02] pointer-events-none" />
      
      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold text-white mb-4"
          >
            {faqData.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-white/50"
          >
            {faqData.subtitle}
          </motion.p>
        </div>

        {/* FAQ List */}
        <div className="space-y-px">
          {faqData.questions.map((faq) => (
            <FAQItem 
              key={faq.id} 
              question={faq.question} 
              answer={faq.answer} 
            />
          ))}
        </div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-16 text-center"
        >
          <p className="text-white/50 mb-4">
            {faqData.cta.text}
          </p>
          <Link
            to="/contact"
            className="text-white hover:text-white/80 transition-colors"
          >
            {faqData.cta.linkText}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}