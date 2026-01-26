import FirstCard from "../layouts/firstCard";
import HeroSlider from "../layouts/firstPageDiv";
export default function FirstDivision() {
  return (
    <div className="flex ">
      <HeroSlider />
      <div>
        <FirstCard
          image="https://i.pinimg.com/1200x/a7/02/9f/a7029f972e9d3d71e2c25973dfc0f646.jpg"
          label="FOR MEN"
        />
        <FirstCard
          image="https://i.pinimg.com/1200x/eb/81/9f/eb819f56a1263e2197f3765f6269463e.jpg"
          label="FOR WOMEN"
        />
      </div>
    </div>
  );
}
