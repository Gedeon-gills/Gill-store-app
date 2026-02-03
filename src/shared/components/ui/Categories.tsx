import { useQuery } from "@tanstack/react-query";
import { CategoryService } from "../../services/category";
import { useNavigate } from "react-router-dom";

interface Category {
  id?: string;
  name: string;
  image?: string;
}

export default function Categories() {
  const navigate = useNavigate();

  const {
    data: categories = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: () => CategoryService.getCategories(),
  });

  if (isLoading) return <div className="text-center py-16">Loading categories...</div>;
  if (isError) return <div className="text-center py-16 text-red-500">Error loading categories</div>;

  return (
    <div className="flex flex-wrap py-8 sm:py-12 lg:py-16 gap-4 sm:gap-6 lg:gap-8 justify-center px-4">
      {(categories as Category[]).map((category: Category) => (
        <div
          key={category.id || category.name}
          className="flex flex-col items-center cursor-pointer hover:opacity-80 transition-opacity min-w-[80px] sm:min-w-[100px]"
          onClick={() => navigate(`/category/${category.name.toLowerCase()}`)}
        >
          {category.image && (
            <img
              className="rounded-full w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 object-cover mx-auto"
              src={category.image}
              alt={category.name}
            />
          )}
          <p className="text-center mt-1 sm:mt-2 capitalize font-medium text-xs sm:text-sm lg:text-base">{category.name}</p>
        </div>
      ))}
    </div>
  );
}
