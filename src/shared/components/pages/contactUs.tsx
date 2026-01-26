import { FaLocationPin, FaClock, FaMailchimp, FaPhone } from "react-icons/fa6";
import Header from "../forms/Headers";
import Footer from "../forms/Footer";

export default function ContactUs() {
  return (
    <div className="bg-white">
      <Header />

      {/* ===== Page Header ===== */}
      <div className="text-center py-20 bg-gray-50">
        <h1 className="text-4xl font-semibold text-gray-800">Contact Us</h1>
        <p className="text-gray-500 mt-3">B-DIFFERENT</p>
      </div>

      {/* ===== Map Section ===== */}
      <div className="w-full h-[450px] bg-gray-200">
        <iframe
          title="Office Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3987.511993875192!2d30.0881484!3d-1.9394677!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19dca6eb4b136305%3A0xfa7ecaf4c40f3383!2skLab!5e0!3m2!1sen!2srw!4v1700000000000"
          className="w-full h-full border-0"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
 
      {/* ===== Content ===== */}
      <div className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* ===== Contact Form ===== */}
        <form className="space-y-6">
          <h1 className="text-2xl font-semibold text-gray-800">
            Send Us A Message
          </h1>
          <p className="text-gray-600">
            Contact us to get any help or offer us your suggestions
          </p>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Your Name (Required)
            </label>
            <input
              type="text"
              className="w-full border px-4 py-3 focus:outline-none focus:border-black"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Your Email (Required)
            </label>
            <input
              type="email"
              className="w-full border px-4 py-3 focus:outline-none focus:border-black"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Subject</label>
            <input
              type="text"
              className="w-full border px-4 py-3 focus:outline-none focus:border-black"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Your Message
            </label>
            <textarea
              rows={5}
              className="w-full border px-4 py-3 focus:outline-none focus:border-black"
            />
          </div>

          <button
            type="submit"
            className="bg-black text-white px-8 py-3 text-sm font-semibold hover:bg-gray-800 transition"
          >
            SEND A MESSAGE
          </button>
        </form>

        {/* ===== Contact Info ===== */}
        <div className="space-y-12">
          {/* Intro */}
          <div>
            <h1 className="text-2xl font-semibold text-gray-800 mb-3">
              GET IN TOUCH
            </h1>
            <p className="text-gray-600 leading-relaxed">
              B-Different is always ready to help. Reach out to us using the
              information below.
            </p>
          </div>

          {/* Office */}
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Our Office
            </h2>

            <p className="flex items-center gap-3 text-gray-600 mb-3">
              <FaLocationPin />
              Address: Kimihurura, Rwanda
            </p>

            <p className="flex items-center gap-3 text-gray-600 mb-3">
              <FaPhone />
              Phone: (+250) 785-220-022
            </p>

            <p className="flex items-center gap-3 text-gray-600">
              <FaMailchimp />
              Email: tresormugish07@gmail.com
            </p>
          </div>

          {/* Working Hours */}
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Working Hours
            </h2>

            <p className="flex items-center gap-3 text-gray-600 mb-2">
              <FaClock />
              Monday - Friday: 9am to 7pm
            </p>

            <p className="flex items-center gap-3 text-gray-600 mb-2">
              <FaClock />
              Saturday: 9am to 2pm
            </p>

            <p className="flex items-center gap-3 text-gray-600">
              <FaClock />
              Sunday: Closed
            </p>
          </div>
        </div>
      </div>
      {/* ===== CTA Section ===== */}
      <div
        className="relative bg-center bg-cover bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://i.pinimg.com/736x/8a/01/57/8a01579d53988a2bba62d34f4f68fdca.jpg')",
        }}
      >
        {/* Blue Overlay */}
        <div className="absolute inset-0 bg-blue-900/80"></div>

        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-6 py-24 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">
            Do You Have Any Questions?
          </h2>

          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            Feel free to contact us anytime. We are happy to help you with your
            business needs.
          </p>

          <a
            href="/contact-us"
            className="inline-block bg-white text-blue-900 px-8 py-3 font-semibold text-sm hover:bg-gray-100 transition"
          >
            CONTACT US
          </a>
        </div>
      </div>

      <Footer />
    </div>
  );
}
