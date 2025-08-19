import Categories from "@/components/Categories";
import NewArrivals from "@/components/NewArrivals";
import SliderComponent from "@/components/SliderComponent";
import TopSellers from "@/components/TopSellers";

export default function Home() {
  return (
    <div>
    <SliderComponent />
      <Categories />
      <NewArrivals />
      <TopSellers/>
    </div>
  );
}
