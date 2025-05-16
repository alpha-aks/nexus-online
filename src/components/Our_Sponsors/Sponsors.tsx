import { motion } from "framer-motion";
import { Link } from "react-router-dom";

// Client logos data
const clients = [
  { id: 1, name: "Client A", logo: "/client-a-logo.png" },
  { id: 2, name: "Client B", logo: "/client-b-logo.png" },
  { id: 3, name: "Client C", logo: "/client-c-logo.png" },
  { id: 4, name: "Client D", logo: "/client-d-logo.png" },
  { id: 5, name: "Client E", logo: "/client-e-logo.png" },
];

export function Sponsors() {
  return (
    <section className="bg-black relative overflow-hidden py-32">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-white/[0.02] pointer-events-none" />
      
      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-white text-center mb-12"
        >
          Our Clients
        </motion.h2>

        {/* Clients Row */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {clients.map((client, index) => (
            <motion.div
              key={client.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-neutral-900 rounded-xl p-6 border border-white/10 h-full flex items-center justify-center hover:border-white/20 transition-colors">
                <img
                  src={client.logo}
                  alt={client.name}
                  className="h-12 w-auto opacity-50 group-hover:opacity-100 transition-opacity"
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Simple CTA */}
        <div className="mt-12 text-center">
          <Link
            to="/contact"
            className="text-white/50 hover:text-white transition-colors text-sm"
          >
            Work With Us →
          </Link>
        </div>
      </div>
    </section>
  );
}