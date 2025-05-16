import { Github, Twitter, Instagram, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const navigation = {
  main: [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "Privacy Policy", href: "/privacy-policy" },
    { name: "Terms & Conditions", href: "/terms-conditions" }
  ],
  social: [
    { name: "Twitter", href: "https://twitter.com/", icon: Twitter },
    { name: "Instagram", href: "https://instagram.com/", icon: Instagram },
    { name: "GitHub", href: "https://github.com/", icon: Github },
    { name: "Email", href: "mailto:contact@nexusmarketing.com", icon: Mail },
  ],
};

export function Footer() {
  return (
    <footer className="bg-black border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* Logo & Links */}
          <div className="flex flex-col items-center md:items-start">
            <Link to="/" className="flex items-center mb-4 md:mb-0">
              <img 
                src="/nexus logo.png" 
                alt="Nexus Marketing Agency" 
                className="h-8 w-auto"
              />
            </Link>
            <nav className="flex gap-6 mt-4 md:mt-0">
              {navigation.main.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="text-sm text-white/50 hover:text-white transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4 mt-6 md:mt-0">
            {navigation.social.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/50 hover:text-white transition-colors"
                >
                  <Icon className="w-5 h-5" />
                </a>
              );
            })}
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-white/10 text-center text-white/50 text-sm">
          &copy; {new Date().getFullYear()} Nexus Marketing. All rights reserved.
        </div>
      </div>
    </footer>
  );
}