'use client';

import { FlaskConical, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-teal-600 rounded-lg flex items-center justify-center">
                <FlaskConical size={20} className="text-white" />
              </div>
              <span className="text-xl font-bold">MedCare</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Your trusted healthcare partner providing quality medical services and pathology tests at your doorstep.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {['About Us', 'Services', 'Doctors', 'Tests', 'Contact'].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-bold text-lg mb-4">Services</h3>
            <ul className="space-y-2">
              {['Consult Doctor', 'Pathology Tests', 'Buy Medicine', 'Health Packages', 'Home Collection'].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-gray-400 text-sm">
                <Phone size={16} className="mt-1 flex-shrink-0" />
                <span>1800-123-4567</span>
              </li>
              <li className="flex items-start gap-2 text-gray-400 text-sm">
                <Mail size={16} className="mt-1 flex-shrink-0" />
                <span>support@medcare.com</span>
              </li>
              <li className="flex items-start gap-2 text-gray-400 text-sm">
                <MapPin size={16} className="mt-1 flex-shrink-0" />
                <span>123 Healthcare Street, Medical District, India</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Media & Copyright */}
        <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} MedCare. All rights reserved.
          </p>
          
          <div className="flex gap-4">
            {[
              { icon: <Facebook size={18} />, href: '#' },
              { icon: <Twitter size={18} />, href: '#' },
              { icon: <Instagram size={18} />, href: '#' },
              { icon: <Linkedin size={18} />, href: '#' },
            ].map((social, i) => (
              <Link
                key={i}
                href={social.href}
                className="w-9 h-9 bg-gray-800 hover:bg-gradient-to-r hover:from-blue-600 hover:to-teal-600 rounded-lg flex items-center justify-center transition-all duration-300"
              >
                {social.icon}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
