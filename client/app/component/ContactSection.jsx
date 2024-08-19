import { MapPin, Phone, Mail, Globe } from 'lucide-react';

export default function ContactSection() {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-semibold text-center mb-4">GET IN TOUCH</h2>
        

        <div className="grid md:grid-cols-2 gap-8">
          {/* Google Map Embed */}
          <div className="h-[500px]">
            <iframe
              className="w-full h-full rounded-lg"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d431.19077540585585!2d84.95999938248526!3d27.13724832598146!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb55c89e923a5b%3A0x18647a8d31fcece1!2sAdarsh%20Offset%20Press!5e0!3m2!1sen!2snp!4v1723949822749!5m2!1sen!2snp"
              allowFullScreen=""
              loading="lazy"
            ></iframe>
            
          </div>

          {/* Contact Form and Information */}
          <div>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Name *"
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              />
              <input
                type="email"
                placeholder="E-mail *"
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              />
              <input
                type="text"
                placeholder="Phone *"
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              />
              <textarea
                placeholder="Message *"
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                rows="4"
              ></textarea>
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Submit
              </button>
            </form>

            <div className="mt-8 space-y-4">
              <div className="flex items-center">
                <MapPin className="w-6 h-6 text-gray-700 mr-2" />
                <span>JeetpurSimara Sub-Metropolitancity-7, Jeetpur, Bara, Nepal</span>
              </div>
              <div className="flex items-center">
                <Phone className="w-6 h-6 text-gray-700 mr-2" />
                <span>Phone: +977 9876543210</span>
              </div>
              <a href="mailto:abhaytechhub@gmail.com" className="flex items-center">
                <Mail className="w-6 h-6 text-gray-700 mr-2" />
                <span>Support: abhaytechhub@gmail.com</span>
              </a>
              <div className="flex items-center">
                <Globe className="w-6 h-6 text-gray-700 mr-2" />
                <span>Support: www.abhayguptaofficial.vercel.app</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
