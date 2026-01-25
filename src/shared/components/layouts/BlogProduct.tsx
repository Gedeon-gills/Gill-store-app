import { FaUser, FaCalendar } from "react-icons/fa6";

interface BlogProduct {
  image: string;
  category: string;
  owner: string;
  title: string;
  date: string;
  intro: string;
}

export default function BlogsProductCard({
  image,
  category,
  owner,
  title,
  date,
  intro,
}: BlogProduct) {
  return (
    <div className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
      {/* Image */}
      <div className="overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Content */}
      <div className="p-5 space-y-3">
        {/* Category */}
        <p className="text-xs uppercase tracking-wide text-blue-600 font-semibold">
          {category}
        </p>

        {/* Title */}
        <h2 className="text-lg font-semibold text-gray-900 leading-snug hover:text-blue-600 cursor-pointer">
          {title}
        </h2>

        {/* Meta info */}
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <span className="flex items-center gap-1">
            <FaUser className="text-xs" />
            {owner}
          </span>
          <span className="flex items-center gap-1">
            <FaCalendar className="text-xs" />
            {date}
          </span>
        </div>

        {/* Intro */}
        <p className="text-sm text-gray-600 leading-relaxed">{intro}</p>

        {/* Read more */}
        <p className="text-sm font-semibold text-blue-600 cursor-pointer hover:underline">
          Continue Reading →
        </p>
      </div>
    </div>
  );
}
