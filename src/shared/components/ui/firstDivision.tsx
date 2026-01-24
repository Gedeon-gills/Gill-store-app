import FirstCard from "../layouts/firstCard"
import HeroSlider from "../layouts/firstPageDiv"
export default function FirstDivision(){
    return(
        <div className="flex ">
        <HeroSlider/>
        <div>
        <FirstCard/>
        <FirstCard/>
        </div>
        </div>
    )
}