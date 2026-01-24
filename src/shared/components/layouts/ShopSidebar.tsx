import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

const filters = [
  {
    title: "Product Categories",
    items: ["T-Shirts", "Hoodies", "Jeans", "Shoes"],
  },
  {
    title: "Filter by Price",
    items: ["$0 - $50", "$50 - $100", "$100 - $200"],
  },
  { title: "Filter by Color", items: ["Red", "Blue", "Green", "Black"] },
  { title: "Filter by Size", items: ["S", "M", "L", "XL"] },
  {
    title: "Average Rating",
    items: ["⭐ 1+", "⭐ 2+", "⭐ 3+", "⭐ 4+", "⭐ 5"],
  },
];

export default function ShopSidebar() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index:any) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full max-w-xs ml-40 mt-20 p-4 space-y-4">
      {filters.map((filter, index) => (
        <div key={index}>
          {/* Header */}
          <button
            className="w-full flex justify-between items-center py-2 border-b focus:outline-none"
            onClick={() => toggle(index)}
          >
            <span className="text-sm font-medium">{filter.title}</span>
            <FaChevronDown
              className={`transition-transform duration-300 ${
                openIndex === index ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Content */}
          <div
            className={`overflow-hidden transition-all duration-300 ${
              openIndex === index ? "max-h-40 mt-2" : "max-h-0"
            }`}
          >
            <ul className="flex flex-col gap-2 text-sm">
              {filter.items.map((item, idx) => (
                <li key={idx} className="cursor-pointer hover:text-blue-500">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Bottom blue line */}
          <div className="h-[2px] w-8 bg-blue-500 mt-1"></div>
        </div>
      ))}
    </div>
  );
}
