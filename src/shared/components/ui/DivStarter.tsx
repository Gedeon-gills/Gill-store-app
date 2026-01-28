import { Link } from "react-router-dom";

interface props {
  description: string;
}
export default function DivStarter(props: props) {
  return (
    <div className="flex items-center justify-between border-b border-gray-200 mb-6">
      {/* Left title */}
      <div>
        <h2 className="text-lg font-semibold uppercase tracking-wide">
          {props.description}
        </h2>
        <div className="mt-2 h-[2px] w-24 bg-blue-600"></div>
      </div>

      {/* Right button */}
      <button className="bg-blue-600 text-white text-sm font-semibold  px-6 py-3 rounded hover:bg-blue-700 transition">
        <Link to={"/Shop"}>VIEW ALL</Link>
      </button>
    </div>
  );
}
