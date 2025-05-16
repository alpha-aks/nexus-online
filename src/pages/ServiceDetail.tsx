import { useParams, Link } from 'react-router-dom';
import servicesData from '@/data/services.json';
import { ArrowLeft, Users, Briefcase, Clock, ChevronRight, ExternalLink, Camera } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function ServiceDetail() {
  const { id } = useParams();
  
  // Find the service using string comparison
  const service = servicesData.services.find(s => String(s.id) === id);
  
  const [selectedImage, setSelectedImage] = useState<null | { url: string; caption: string }>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  if (!service) {
    return (
      <div className="min-h-screen bg-black pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link 
            to="/services"
            className="inline-flex items-center text-white hover:text-white/80 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Services
          </Link>
          <h1 className="text-4xl font-bold text-white mt-8">
            Service not found
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-16">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section with Full-width Image */}
        <div className="relative h-[50vh] md:h-[60vh] w-full">
          <div className="absolute inset-0">
            <img 
              src={service.image} 
              alt={service.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
          </div>
          
          {/* Back Button - Floating */}
          <div className="absolute top-8 left-8 z-10">
            <Link 
              to="/services"
              className="inline-flex items-center bg-black/30 backdrop-blur-sm text-white px-4 py-2 rounded-full hover:bg-black/50 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Services
            </Link>
          </div>

          {/* Service Title and Category - Bottom of Hero */}
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
            <div className="max-w-7xl mx-auto">
              <span className="inline-block px-3 py-1 rounded-full text-sm bg-white/10 text-white mb-4">
                {service.category === 'tech' ? 'Technical' : 
                 service.category === 'design' ? 'Design' : 'Marketing'}
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
                {service.title}
              </h1>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="max-w-7xl mx-auto px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="prose prose-invert max-w-none">
                <h2 className="text-2xl font-semibold text-white mb-4">About the Service</h2>
                <p className="text-neutral-300 text-lg leading-relaxed">
                  {service.description}
                </p>

                {service.features && (
                  <div className="mt-12">
                    <h2 className="text-2xl font-semibold text-white mb-6">Key Features</h2>
                    <ul className="space-y-4">
                      {service.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <ChevronRight className="w-5 h-5 text-white/50 mt-1 flex-shrink-0" />
                          <span className="text-neutral-300 ml-4">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-neutral-900 rounded-2xl p-6 border border-white/10">
                <h3 className="text-xl font-semibold text-white mb-6">Service Details</h3>
                
                <div className="space-y-6">
                  {/* Timeline */}
                  <div className="flex items-start space-x-4">
                    <Clock className="w-5 h-5 text-white/50 flex-shrink-0" />
                    <div>
                      <p className="text-white font-medium">Timeline</p>
                      <p className="text-neutral-400">{service.timeline}</p>
                    </div>
                  </div>

                  {/* Expertise */}
                  <div className="flex items-start space-x-4">
                    <Briefcase className="w-5 h-5 text-white/50 flex-shrink-0" />
                    <div>
                      <p className="text-white font-medium">Expertise</p>
                      <p className="text-neutral-400">{service.expertise}</p>
                    </div>
                  </div>

                  {/* Team Size */}
                  <div className="flex items-start space-x-4">
                    <Users className="w-5 h-5 text-white/50 flex-shrink-0" />
                    <div>
                      <p className="text-white font-medium">Team</p>
                      <p className="text-neutral-400">{service.teamSize}</p>
                    </div>
                  </div>
                </div>

                {/* Enquire Button */}
                {service.enrollLink && (
                  <a
                    href={service.enrollLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-full bg-white text-black py-3 px-6 rounded-xl font-medium hover:bg-neutral-200 transition-colors mt-8"
                  >
                    Enquire Now
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Portfolio Gallery Section */}
          {service.gallery && service.gallery.length > 0 && (
            <div className="mt-16">
              <div className="flex items-center gap-3 mb-8">
                <Camera className="w-6 h-6 text-white/50" />
                <h2 className="text-2xl font-semibold text-white">Portfolio Gallery</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {service.gallery.map((photo, index) => (
                  <div 
                    key={index}
                    className="relative group cursor-pointer"
                    onClick={() => setSelectedImage(photo)}
                  >
                    <div className="aspect-video w-full border border-white/10 overflow-hidden rounded-xl">
                      <img 
                        src={photo.url} 
                        alt={photo.caption}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <p className="absolute bottom-4 left-4 right-4 text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {photo.caption}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Lightbox Modal */}
        {selectedImage && (
          <div 
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 md:p-8"
            onClick={() => setSelectedImage(null)}
          >
            <div className="relative max-w-7xl w-full">
              <img 
                src={selectedImage.url} 
                alt={selectedImage.caption}
                className="w-full h-auto max-h-[80vh] object-contain rounded-xl"
              />
              <p className="text-white text-center mt-4">{selectedImage.caption}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
