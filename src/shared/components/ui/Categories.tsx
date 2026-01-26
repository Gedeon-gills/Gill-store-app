// src/ui/Categories.tsx
import { CatgoriesArr } from "../../store/Categories";
import { useNavigate } from "react-router-dom";

export default function Categories() {
  const navigate = useNavigate();

  return (
    <div className="flex px-40 gap-8">
      {CatgoriesArr.map((category) => (
        <div
          key={category.name}
          className="grid items-center cursor-pointer"
          onClick={() => navigate(`/category/${category.name.toLowerCase()}`)}
        >
          <img
            className="rounded-full w-24 h-24 object-cover"
            src={category.imageUrl}
            alt={category.name}
          />
          <p className="text-center mt-2 capitalize">{category.name}</p>
        </div>
      ))}
    </div>
  );
}
