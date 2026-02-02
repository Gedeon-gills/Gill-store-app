import Navbar from "../layouts/contNav";
import ScrollButton from "../ui/buttons/scrollButton";
import Footer from "../forms/Footer";
import { Link } from "react-router-dom";
import { FaMap, FaPhone, FaEnvelope, FaClock } from "react-icons/fa6";

const ContactPage: React.FC = () => {
  return (
    <div className="bg-white font-sans text-gray-800">
      <section className="relative h-[300px] bg-cover bg-center bg-no-repeat bg-[url('/image/collection/lens-by-benji-sFEcIgnhxnw-unsplash.jpg')] py-16 text-center">
        <div className="absolute inset-0 bg-black/60"></div>

        <div className="relative z-10 text-white">
          <Navbar />
          <ScrollButton />
          <h1 className="text-4xl font-bold mb-2">Contact Us</h1>
          <div className="text-[14px]">
            <span className="hover:text-blue-500"><Link to="/">Home</Link></span>
            <span className="mx-1">/</span>
            <span className="text-white">Contact</span>
          </div>
        </div>
      </section>

      <div className="mx-2 mt-1 w-[99%] h-[450px] bg-gray-200 rounded-xl overflow-hidden shadow-md">
        <iframe
          title="Office Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.844200783366!2d30.0881484!3d-1.9394677!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19dca6eb4b136305%3A0xfa7ecaf4c40f3383!2skLab!5e0!3m2!1sen!2srw!4v1706000000000"
          className="w-full h-full border-0"
          allowFullScreen
          loading="lazy"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-2xl font-semibold mb-2">Send Us Message</h2>
          <p className="text-gray-500 mb-8 text-sm">
            Contact us to get any support or help.
          </p>

          <form className="space-y-4">
            <div>
              <label className="block text-sm mb-1 text-gray-600">
                Your Name (required)
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 p-3 rounded focus:outline-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm mb-1 text-gray-600">
                Your Email (required)
              </label>
              <input
                type="email"
                className="w-full border border-gray-300 p-3 rounded focus:outline-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm mb-1 text-gray-600">
                Subject
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 p-3 rounded focus:outline-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm mb-1 text-gray-600">
                Your Message
              </label>
              <textarea
                rows={5}
                className="w-full border border-gray-300 p-3 rounded focus:outline-blue-500"
              ></textarea>
            </div>
            <button className="bg-[#2b59ff] text-white px-8 py-3 rounded font-medium hover:bg-blue-700 transition">
              SEND MESSAGE
            </button>
          </form>
        </div>

        <div className="space-y-10">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Get In Touch</h2>
            <p className="text-gray-500 leading-relaxed text-sm">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
              pretium nisi feugiat nisi gravida, eget rutrum ligula placerat.
            </p>
          </div>

          <div className="space-y-6">
            <h3 className="font-bold text-lg border-b pb-2">Our Office</h3>
            <div className="flex items-start gap-4">
              <FaMap className="text-blue-600 w-5 h-5 mt-1" />
              <p className="text-sm">Address: 105 Street, Kigali, Rwanda.</p>
            </div>
            <div className="flex items-center gap-4">
              <FaPhone className="text-blue-600 w-5 h-5" />
              <p className="text-sm">Phone: (+250) 345 987 102</p>
            </div>
            <div className="flex items-center gap-4">
              <FaEnvelope className="text-blue-600 w-5 h-5" />
              <p className="text-sm">Email: Mail@Example.com</p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-bold text-lg border-b pb-2">Working Hours</h3>
            <div className="flex items-start gap-4">
              <FaClock className="text-blue-600 w-5 h-5 mt-1" />
              <div className="text-sm text-gray-600 space-y-1">
                <p>Monday - Friday: 9am to 7pm</p>
                <p>Saturday: 9am to 2pm</p>
                <p>Sunday: Closed</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section
        className="relative bg-[url('/image/collection/flipsnack-6QNipEp6v_4-unsplash.jpg')] 
             bg-cover bg-center py-16 text-center text-white"
      >
        <div className="absolute inset-0 bg-[#2b59ff]/70"></div>

        <div className="relative z-10">
          <h2 className="text-3xl font-bold mb-4">Want To Work With Us?</h2>
          <p className="mb-8 opacity-90">
            Feel free to reach us with the contact form!
          </p>
          <button className="border-2 border-white px-10 py-3 font-semibold hover:bg-white hover:text-blue-600 transition">
            CONTACT US
          </button>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default ContactPage;
