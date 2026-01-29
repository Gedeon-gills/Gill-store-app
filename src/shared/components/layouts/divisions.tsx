import { Link } from "react-router-dom";

interface DivisionsProps {
  title: string;
  items: string[]
}

export default function Divisions({ title, items }: DivisionsProps) {
  return (
    <aside className="border border-gray-200   bg-white">
      {/* Title */}
      <div className="px-5 py-4 border-b border-gray-200">
        <h3 className="text-[16px] font-semibold text-blue-600">{title}</h3>
      </div>

      {/* Category list */}
      <ul className="px-5 py-4 space-y-4 text-[14px] text-gray-700">
        {items.map((item, index) => (
          <li key={index}>
            <Link
              to={`/category/${item.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and')}`}
              className="cursor-pointer transition-colors duration-200 hover:text-blue-600 block"
            >
              {item}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
