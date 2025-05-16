import { useSearchParams, Link } from 'react-router-dom';
import { Filter } from 'lucide-react';

type Category = 'all' | 'tech' | 'design' | 'marketing' | 'consulting';

const servicesData = {
  services: [
    {
      id: "web-development",
      title: "Web Development",
      category: "tech",
      image: "/services/web-development.jpg",
      description: "Professional web development services using cutting-edge technologies like React, Next.js, and Node.js. We build responsive, scalable, and performant web applications tailored to your needs.",
      timeline: "4-8 weeks",
      expertise: "Full Stack",
      teamSize: "2-4 developers",
      features: [
        "Custom web application development",
        "Responsive design implementation",
        "API development and integration",
        "Database design and optimization",
        "Performance optimization",
        "SEO-friendly architecture"
      ],
      connectLink: "/contact?service=web-development"
    },
    {
      id: "ui-design",
      title: "UI/UX Design",
      category: "design",
      image: "/services/ui-design.jpg",
      description: "Create beautiful, intuitive user interfaces and experiences that delight your users. Our design process focuses on user research, wireframing, and iterative prototyping.",
      timeline: "2-4 weeks",
      expertise: "UI/UX Design",
      teamSize: "1-2 designers",
      features: [
        "User research and personas",
        "Wireframing and prototyping",
        "Visual design and branding",
        "Interaction design",
        "Usability testing",
        "Design system creation"
      ],
      connectLink: "/contact?service=ui-design"
    },
    {
      id: "digital-marketing",
      title: "Digital Marketing",
      category: "marketing",
      image: "/services/digital-marketing.jpg",
      description: "Comprehensive digital marketing solutions to grow your online presence and drive business results.",
      timeline: "Ongoing",
      expertise: "Digital Marketing",
      teamSize: "3-5 specialists",
      features: [
        "SEO optimization",
        "Social media management",
        "Content creation",
        "Email marketing",
        "Analytics & reporting",
        "Campaign management"
      ],
      connectLink: "/contact?service=digital-marketing"
    },
    {
      id: "social-media",
      title: "Social Media Marketing",
      category: "marketing",
      image: "/services/social-media.jpg",
      description: "Strategic social media campaigns across all major platforms to build brand awareness and engage your audience.",
      timeline: "Ongoing",
      expertise: "Social Media",
      teamSize: "2-4 specialists",
      features: [
        "Content creation",
        "Social media strategy",
        "Audience engagement",
        "Paid advertising",
        "Analytics tracking",
        "Community management"
      ],
      connectLink: "/contact?service=social-media"
    },
    {
      id: "whatsapp-marketing",
      title: "WhatsApp Marketing",
      category: "marketing",
      image: "/services/whatsapp-marketing.jpg",
      description: "Leverage WhatsApp Business API for direct customer communication and engagement.",
      timeline: "Ongoing",
      expertise: "WhatsApp Business",
      teamSize: "2-3 specialists",
      features: [
        "Business API integration",
        "Automated messaging",
        "Customer service",
        "Lead generation",
        "Campaign management",
        "Analytics tracking"
      ],
      connectLink: "/contact?service=whatsapp-marketing"
    },
    {
      id: "content-marketing",
      title: "Content Marketing",
      category: "marketing",
      image: "/services/content-marketing.jpg",
      description: "Create and distribute valuable content to attract and engage your target audience.",
      timeline: "Ongoing",
      expertise: "Content Strategy",
      teamSize: "2-4 specialists",
      features: [
        "Blog writing",
        "Article creation",
        "SEO content",
        "Video content",
        "Social media posts",
        "Content strategy"
      ],
      connectLink: "/contact?service=content-marketing"
    },
    {
      id: "email-marketing",
      title: "Email Marketing",
      category: "marketing",
      image: "/services/email-marketing.jpg",
      description: "Engage your audience through targeted email campaigns and newsletters.",
      timeline: "Ongoing",
      expertise: "Email Strategy",
      teamSize: "2-3 specialists",
      features: [
        "Newsletter creation",
        "Campaign automation",
        "Lead nurturing",
        "Segmentation",
        "A/B testing",
        "Analytics tracking"
      ],
      connectLink: "/contact?service=email-marketing"
    },
    {
      id: "sms-marketing",
      title: "SMS Marketing",
      category: "marketing",
      image: "/services/sms-marketing.jpg",
      description: "Reach customers directly through SMS campaigns for promotions and updates.",
      timeline: "Ongoing",
      expertise: "SMS Strategy",
      teamSize: "2-3 specialists",
      features: [
        "Bulk SMS campaigns",
        "Automated messages",
        "Promotional texts",
        "Transaction alerts",
        "Lead generation",
        "Analytics tracking"
      ],
      connectLink: "/contact?service=sms-marketing"
    },
    {
      id: "mobile-apps",
      title: "Mobile App Development",
      category: "tech",
      image: "/services/mobile-apps.jpg",
      description: "Native and cross-platform mobile app development for iOS and Android. We create engaging mobile experiences that drive user engagement.",
      timeline: "6-12 weeks",
      expertise: "Mobile Development",
      teamSize: "2-3 developers",
      features: [
        "Native app development",
        "Cross-platform solutions",
        "Backend integration",
        "Performance optimization",
        "App store optimization",
        "Continuous support"
      ],
      connectLink: "/contact?service=mobile-apps"
    },
    {
      id: "branding",
      title: "Brand Identity",
      category: "design",
      image: "/services/branding.jpg",
      description: "Complete branding solutions including logo design, brand guidelines, and visual identity systems that reflect your brand's personality.",
      timeline: "2-4 weeks",
      expertise: "Brand Strategy",
      teamSize: "2-3 designers",
      features: [
        "Logo design",
        "Brand guidelines",
        "Visual identity",
        "Brand strategy",
        "Brand assets",
        "Brand management"
      ],
      connectLink: "/contact?service=branding"
    },
    {
      id: "seo",
      title: "SEO Optimization",
      category: "marketing",
      image: "/services/seo.jpg",
      description: "Optimize your website for search engines to improve visibility and drive organic traffic. We implement proven SEO strategies for better rankings.",
      timeline: "Ongoing",
      expertise: "SEO",
      teamSize: "2-4 specialists",
      features: [
        "Keyword research",
        "On-page optimization",
        "Technical SEO",
        "Content optimization",
        "Local SEO",
        "Analytics & reporting"
      ],
      connectLink: "/contact?service=seo"
    }
  ]
};

export default function Services() {
  const [searchParams, setSearchParams] = useSearchParams();
  const category = (searchParams.get('category') as Category) || 'all';

  const filteredServices = servicesData.services.filter(service => {
    return category === 'all' || service.category === category;
  });

  return (
    <div className="min-h-screen bg-black pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-6xl font-bold text-white mb-8">
          Services
        </h1>
        
        {/* Filters */}
        <div className="flex items-center gap-2 mb-8">
          <Filter className="w-5 h-5 text-white/50" />
          <select
            value={category}
            onChange={(e) => setSearchParams({ category: e.target.value })}
            className="bg-neutral-900 text-white border border-white/20 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-white"
          >
            <option value="all">All Services</option>
            <option value="tech">Technical</option>
            <option value="design">Design</option>
            <option value="marketing">Marketing</option>
            <option value="consulting">Consulting</option>
          </select>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service) => (
            <Link
              key={service.id}
              to={`/services/detail/${String(service.id)}`}
              className="group relative bg-neutral-900 rounded-2xl overflow-hidden hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-all duration-300 border border-white/10"
            >
              <div className="relative h-[200px] w-full">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-all duration-300" />
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-bold text-white mb-2">{service.title}</h3>
                <p className="text-white/80 mb-4 line-clamp-2">{service.description}</p>
                
                <Link
                  to={service.connectLink}
                  className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
                >
                  Connect With Us
                </Link>
              </div>
            </Link>
          ))}
        </div>

        {/* No Services Found */}
        {filteredServices.length === 0 && (
          <div className="text-center py-16 text-neutral-400">
            <p>No services found in this category</p>
          </div>
        )}
      </div>
    </div>
  );
}