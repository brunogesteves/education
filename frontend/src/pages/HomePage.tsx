import Header from "../components/home/header";
import HomeLeft from "../components/home/homeLeft";

function HomePage() {
  return (
    <div className="bg-[#FFF2F3] min-h-full">
      <Header />
      <div className="mx-10 flex justify-between items-center h-fit">
        <HomeLeft />
        <div className="w-1/2 ">
          <img src="/cover.png" alt="student" />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
