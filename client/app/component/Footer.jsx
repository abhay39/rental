import { Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Us */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">About Us</h3>
            <p className="text-gray-400">
            At Khoojo Rooms, we understand that finding the perfect space to call home can be both exciting and challenging. That&apos;s why we are dedicated to simplifying the process of booking rooms and flats, ensuring a seamless experience from start to finish.
            </p>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <MapPin className="w-5 h-5 text-gray-400 mr-2" />
                JeetpurSimara Sub-Metropolitancity-7, Jeetpur, Bara, Nepal
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 text-gray-400 mr-2" />
                +977 9876543210
              </li>
              <a href="mailto:abhaytechhub@gmail.com" className="flex items-center">
                <Mail className="w-5 h-5 text-gray-400 mr-2" />
                abhaytechhub@gmail.com
              </a>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-gray-400 hover:text-white transition">
                  Home
                </a>
              </li>
              
              <li>
                <a href="/aboutUs" className="text-gray-400 hover:text-white transition">
                  About Us
                </a>
              </li>
              <li>
                <a href="/contact" className="text-gray-400 hover:text-white transition">
                  Contact
                </a>
              </li>
              <li>
                <a href="/auth/dashboard" className="text-gray-400 hover:text-white transition">
                  Profile
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-8 border-t border-gray-700 pt-4 text-center">
          <p className="text-gray-500">&copy; 2024 Khoojo Rooms. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
