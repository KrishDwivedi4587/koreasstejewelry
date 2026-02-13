import React, { useEffect } from 'react';
import { Mail, Phone, Instagram, Facebook, Youtube, MessageCircle } from 'lucide-react';

const Contact: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-[#FAFAF9] min-h-screen pt-20 flex flex-col items-center">
      {/* Decorative background element for visual depth */}
      <div className="absolute top-0 left-0 w-full h-[50vh] bg-white z-0"></div>
      
      <div className="relative z-10 max-w-[90rem] w-full px-6 py-20 text-center">
        <h1 className="font-serif text-6xl md:text-7xl text-gray-900 mb-8 tracking-tight">Contact</h1>
        <p className="font-sans text-lg md:text-xl text-gray-500 mb-20 max-w-2xl mx-auto leading-relaxed tracking-wide">
          We are here to assist you with any inquiries regarding our Lifestyle collections or BEAUWELL products.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-32 items-stretch">
            {/* Email Card - Static for Copy/Paste */}
            <div className="group flex flex-col items-center p-8 bg-white shadow-[0_10px_40px_-15px_rgba(0,0,0,0.1)] hover:shadow-[0_20px_50px_-10px_rgba(0,0,0,0.15)] hover:-translate-y-1 transition-all duration-300 rounded-lg border border-gray-100">
                <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center mb-6 group-hover:bg-brand-terracotta/10 transition-colors duration-500 shrink-0">
                    <Mail className="w-6 h-6 text-gray-700 group-hover:text-brand-terracotta transition-colors duration-500" />
                </div>
                <h3 className="font-serif text-2xl mb-6 text-gray-900 shrink-0">Email</h3>
                
                <div className="flex flex-col items-center justify-center flex-grow">
                    <span className="text-gray-600 font-sans text-lg group-hover:text-brand-terracotta transition-colors duration-300 select-all">
                        Koreasste@customer.in
                    </span>
                    <span className="text-xs text-gray-400 mt-2">General Inquiries</span>
                </div>
            </div>

            {/* Phone Card */}
            <div className="group flex flex-col items-center p-8 bg-white shadow-[0_10px_40px_-15px_rgba(0,0,0,0.1)] hover:shadow-[0_20px_50px_-10px_rgba(0,0,0,0.15)] hover:-translate-y-1 transition-all duration-300 rounded-lg border border-gray-100">
                <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center mb-6 group-hover:bg-brand-terracotta/10 transition-colors duration-500 shrink-0">
                    <Phone className="w-6 h-6 text-gray-700 group-hover:text-brand-terracotta transition-colors duration-500" />
                </div>
                <h3 className="font-serif text-2xl mb-6 text-gray-900 shrink-0">Phone</h3>
                
                <div className="flex flex-col w-full space-y-5 flex-grow justify-center">
                    <div className="flex flex-col items-center group/item">
                        <span className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1 group-hover/item:text-brand-terracotta transition-colors">Lifestyle</span>
                        <span className="text-gray-600 font-sans text-sm md:text-base">+91 333 232 404</span>
                    </div>
                    <div className="w-16 h-px bg-gray-100 mx-auto"></div>
                    <div className="flex flex-col items-center group/item">
                        <span className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1 group-hover/item:text-brand-terracotta transition-colors">Beauwell</span>
                        <span className="text-gray-600 font-sans text-sm md:text-base">+91 3333 432 404</span>
                    </div>
                </div>
            </div>

            {/* Lifestyle WhatsApp Card */}
            <a href="https://wa.me/9193134442404" target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center p-8 bg-white shadow-[0_10px_40px_-15px_rgba(0,0,0,0.1)] hover:shadow-[0_20px_50px_-10px_rgba(0,0,0,0.15)] hover:-translate-y-1 transition-all duration-300 rounded-lg border border-gray-100 cursor-pointer">
                <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center mb-6 group-hover:bg-brand-terracotta/10 transition-colors duration-500 shrink-0">
                    <MessageCircle className="w-6 h-6 text-gray-700 group-hover:text-brand-terracotta transition-colors duration-500" />
                </div>
                <h3 className="font-serif text-xl lg:text-2xl mb-6 text-gray-900 shrink-0">Lifestyle WhatsApp</h3>
                <div className="flex flex-col items-center justify-center flex-grow">
                    <span className="text-gray-500 group-hover:text-brand-terracotta transition-colors duration-300 font-sans text-sm md:text-base">
                        Chat on WhatsApp
                    </span>
                    <span className="text-xs text-gray-400 mt-2 max-w-[150px] mx-auto leading-relaxed">
                        Fashion Inquiries
                    </span>
                </div>
            </a>

            {/* Beauwell WhatsApp Card */}
            <a href="https://wa.me/914442432404" target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center p-8 bg-white shadow-[0_10px_40px_-15px_rgba(0,0,0,0.1)] hover:shadow-[0_20px_50px_-10px_rgba(0,0,0,0.15)] hover:-translate-y-1 transition-all duration-300 rounded-lg border border-gray-100 cursor-pointer">
                <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center mb-6 group-hover:bg-brand-terracotta/10 transition-colors duration-500 shrink-0">
                    <MessageCircle className="w-6 h-6 text-gray-700 group-hover:text-brand-terracotta transition-colors duration-500" />
                </div>
                <h3 className="font-serif text-xl lg:text-2xl mb-6 text-gray-900 shrink-0">Beauwell WhatsApp</h3>
                <div className="flex flex-col items-center justify-center flex-grow">
                    <span className="text-gray-500 group-hover:text-brand-terracotta transition-colors duration-300 font-sans text-sm md:text-base">
                        Chat on WhatsApp
                    </span>
                    <span className="text-xs text-gray-400 mt-2 max-w-[150px] mx-auto leading-relaxed">
                        Wellness Inquiries
                    </span>
                </div>
            </a>
        </div>

        <div className="relative mb-16">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center">
                <span className="bg-[#FAFAF9] px-6 text-sm text-gray-400 uppercase tracking-[0.2em] font-sans font-medium">Follow Our Journey</span>
            </div>
        </div>

        <div className="flex justify-center items-center space-x-10 md:space-x-16 pb-10">
            <SocialLink href="https://www.instagram.com/koreasste" icon={<Instagram size={36} />} label="Instagram" />
            <SocialLink href="https://www.facebook.com/people/Nu-Skin-Koreasste/61585379076302/" icon={<Facebook size={36} />} label="Facebook" />
            <SocialLink href="https://www.youtube.com/@KoreassteBeauWell" icon={<Youtube size={36} />} label="YouTube" />
        </div>

      </div>
    </div>
  );
};

const SocialLink: React.FC<{ href: string; icon: React.ReactNode; label: string }> = ({ href, icon, label }) => (
    <a 
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-full bg-white text-gray-600 shadow-[0_4px_20px_-5px_rgba(0,0,0,0.1)] hover:text-white hover:bg-gray-900 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_30px_-5px_rgba(0,0,0,0.2)] border border-gray-100"
        aria-label={label}
    >
        <span className="transform transition-transform duration-300 group-hover:scale-110">
            {icon}
        </span>
    </a>
);

export default Contact;