import { CatgoriesArr } from "../../store/Categories";
export default function Categories() {
  const Categories = CatgoriesArr.map((Category) => (
    <div className="grid items-center">
      <img className="rounded-full size size-25" src={Category.imageUrl} />
      <p>{Category.name}</p>
    </div>
  ));
  return <div className="flex px-40 gap-8">{Categories}</div>;
}
