import {} from "react";
import { Link } from "react-router-dom";
import Navbar from "../layouts/contNav";
import ScrollButton from "../ui/buttons/scrollButton";
import Footer from "../forms/Footer";

const about = () => {
  return (
    <div className="bg-white font-sans text-gray-800">
      <section className="relative h-[300px] bg-cover bg-center bg-no-repeat bg-[url('/image/collection/lens-by-benji-sFEcIgnhxnw-unsplash.jpg')] py-16 text-center">
        <div className="absolute inset-0 bg-black/60"></div>

        <div className="relative z-10 text-white">
          <Navbar />
          <ScrollButton />
          <h1 className="text-4xl font-bold mb-2">About Us</h1>
          <div className="text-[14px]">
            <span className="hover:text-blue-500"><Link to="/">Home</Link></span>
            <span className="mx-1">/</span>
            <span className="text-white">About</span>
          </div>
        </div>
      </section>
      <section className="max-w-7xl mx-auto w-full px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
              auctor, nisl eget ultricies aliquam, nunc nisl aliquet nunc, quis
              aliquet nunc nisl eget nunc. Nullam auctor, nisl eget ultricies
              aliquam, nunc nisl aliquet nunc, quis aliquet nunc nisl eget nunc.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
              auctor, nisl eget ultricies aliquam, nunc nisl aliquet nunc, quis
              aliquet nunc nisl eget nunc. Nullam auctor, nisl eget ultricies aliquam,
              nunc nisl aliquet nunc, quis aliquet nunc nisl eget nunc.
            </p>
          </div>
          <div>
            <img src="/image/collection/andrew-neel-unsplash.jpg"
            alt="Our Story" className="w-full h-auto rounded-lg shadow-md" />
          </div>
        </div>
      </section>
      <Footer />
      </div>
  );
};

export default about;
