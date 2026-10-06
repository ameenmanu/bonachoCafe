import React from 'react';
import { Link } from 'react-router';
import { MapPin, Phone, Mail, ExternalLink } from 'lucide-react';

const InstagramIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const FacebookIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

const TwitterIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
  </svg>
);

export function ContactPage() {
  return (
    <section className="min-h-screen bg-[#FAF8F5] pt-28 pb-32 px-6 sm:px-12 text-[#2C221B]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
        
        {/* Left Side: Contact Info & Socials */}
        <div className="space-y-12">
          <div>
            <p className="text-[#ef4d32] font-semibold tracking-[0.18em] uppercase text-sm mb-4">Come say hello</p>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#17352a] mb-6" style={{ lineHeight: '0.9' }}>
              Find your green escape
            </h1>
            <p className="text-lg text-[#526159] max-w-md leading-relaxed">
              We're always ready to pour you a fresh cup. Drop by our cafe, send us a message, or follow our journey online.
            </p>
          </div>

          <div className="space-y-8">
            {/* Address */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-[#EADBCE] text-[#17352a] flex items-center justify-center shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#17352a] mb-2">Visit Us</h3>
                <p className="text-[#526159] leading-relaxed max-w-sm">
                  Basement Floor, SJ Arcade,<br />
                  Bypass Road, Ponniakurussi,<br />
                  Perinthalmanna, Kerala 679322
                </p>
                <a 
                  href="https://maps.app.goo.gl/kfBwwsyzEBuMPA6j6" 
                  target="_blank" 
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 mt-3 text-sm font-semibold uppercase tracking-wider text-[#ef4d32] hover:text-[#ce3f69] transition-colors"
                >
                  <span>Get Directions</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-[#EADBCE] text-[#17352a] flex items-center justify-center shrink-0">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#17352a] mb-2">Call Us</h3>
                <p className="text-[#526159] leading-relaxed">
                  +91 987 654 3210
                </p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-[#EADBCE] text-[#17352a] flex items-center justify-center shrink-0">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#17352a] mb-2">Email Us</h3>
                <a href="mailto:hello@banachocafe.com" className="text-[#526159] leading-relaxed hover:text-[#ef4d32] transition-colors">
                  hello@banachocafe.com
                </a>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div className="pt-6 border-t border-[#EADBCE]">
            <h3 className="text-sm font-semibold tracking-[0.15em] uppercase text-[#6b776f] mb-6">Follow our socials</h3>
            <div className="flex items-center gap-6">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-[#17352a] hover:text-[#ef4d32] transition-colors duration-300">
                <InstagramIcon />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="text-[#17352a] hover:text-[#ef4d32] transition-colors duration-300">
                <FacebookIcon />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="text-[#17352a] hover:text-[#ef4d32] transition-colors duration-300">
                <TwitterIcon />
              </a>
            </div>
          </div>
        </div>

        {/* Right Side: Embedded Map */}
        <div className="h-[300px] md:h-[400px] lg:h-[700px] w-full rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white relative z-10">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.143093282483!2d76.22384661480112!3d10.976378492186711!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba7d264e16ffc03%3A0x6b803f260195ec4a!2sSJ%20Arcade%2C%20Bypass%20Rd%2C%20Ponniakurussi%2C%20Perinthalmanna%2C%20Kerala%20679322!5e0!3m2!1sen!2sin!4v1680193427142!5m2!1sen!2sin" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen={true} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Banacho Cafe Location"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
