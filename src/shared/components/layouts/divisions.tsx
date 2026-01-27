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
          <li
            key={index}
            className="cursor-pointer transition-colors duration-200 hover:text-blue-600"
          >
            {item}
          </li>
        ))}
      </ul>
    </aside>
  );
}
