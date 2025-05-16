import { motion } from "framer-motion";
import { Users, TrendingUp, Calendar } from "lucide-react";

const highlights = [
  {
    icon: Users,
    title: "10+",
    description: "Active Clients"
  },
  {
    icon: TrendingUp,
    title: "15+",
    description: "Active Campaigns"
  },
  {
    icon: Calendar,
    title: "2024",
    description: "Establishment"
  }
];

export function Nexus() {
  return (
    <section className="bg-black relative overflow-hidden py-24">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-white/[0.02] pointer-events-none" />
      
      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold text-white mb-4"
          >
            Experience the Future
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-white/80 max-w-3xl mx-auto"
          >
            At Nexus Marketing Agency, we combine cutting-edge technology with creative strategies to help businesses thrive in the digital age. From SEO and social media marketing to brand strategy and content creation, we deliver comprehensive solutions that drive real results.
          </motion.p>
        </div>

        {/* Image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="relative aspect-video rounded-2xl border border-white/10 overflow-hidden mb-16"
        >
          <img
            src="/nexus logo.png"
            alt="Nexus Marketing Agency"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        </motion.div>

        {/* Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {highlights.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.6 }}
                className="text-center p-6 bg-neutral-900 rounded-xl border border-white/10 hover:border-white/20 transition-colors"
              >
                <Icon className="w-8 h-8 text-white/50 mx-auto mb-4" />
                <h3 className="text-3xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-white/50">{item.description}</p>
              </motion.div>
            );
          })}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.0 }}
          className="text-center mt-12"
        >
          <p className="text-white/80 mb-4">Ready to transform your digital presence?</p>
          <a
            href="/contact"
            className="inline-flex items-center px-6 py-3 bg-white/10 hover:bg-white/20 transition-colors rounded-lg text-white font-medium"
          >
            Get Started →
          </a>
        </motion.div>
      </div>
    </section>
  );
}