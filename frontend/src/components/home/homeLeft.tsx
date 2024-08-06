function HomeLeft() {
  return (
    <div className="flex flex-col w-1/2 gap-y-5 items-start">
      <span className="text-[#96BB7C]">Welcome</span>
      <span className="text-3xl font-bold mr-1">
        Best Learning Oportunities
      </span>
      <span className="text-[#737373] mr-40">
        Our goal is to make online education work dor everyone
      </span>
      <div className="flex gap-x-2">
        <button className="bg-[#96BB7C] rounded-lg text-white px-4 py-2">
          Join us
        </button>
        <button className="border-2 border-[#96BB7C] rounded-lg px-4 py-2">
          Learn More
        </button>
      </div>
    </div>
  );
}

export default HomeLeft;
