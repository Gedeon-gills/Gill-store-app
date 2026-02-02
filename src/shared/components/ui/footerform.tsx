import {
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
  FaYoutube,
  FaEnvelope
} from "react-icons/fa6";

const Forms = () => {
  return (
  <div className="w-full max-w-sm">
    <h3 className="text-white font-bold mb-6 text-sm tracking-wider">
      NEWSLETTER
    </h3>
    <p className="text-sm mb-4 text-white/80">
      Subscribe to our mailing list to get the new updates!
    </p>

    <div className="relative mb-6">
      <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
      <input
        type="email"
        placeholder="Your email address"
        className="bg-white text-black text-xs px-10 py-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <button className="absolute right-0 top-0 h-full bg-blue-600 text-white px-3 font-bold text-xs rounded-r-md uppercase hover:bg-sky-500 transition-colors  whitespace-nowrap">
        Sign Up
      </button>
    </div>

    <div className="flex gap-2">
      {[FaFacebook, FaTwitter, FaLinkedin, FaInstagram, FaYoutube].map(
        (Icon, idx) => (
          <a
            key={idx}
            href="#"
            className="p-2 bg-gray-700 hover:bg-[#00a8e8] transition-colors rounded-sm text-white"
          >
            <Icon size={16} />
          </a>
        ),
      )}
    </div>
  </div>
);
};

export default Forms;
