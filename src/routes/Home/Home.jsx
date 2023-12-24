import React, { useRef } from "react";
import SchedulerHomeContainer from "../../components/SchedulerHomeContainer/SchedulerHomeContainer";
import HomeImage from "../../components/HomeImage";
import AppFooter from "../../components/AppFooter";

function Home() {
  const ref = useRef(null);

  const handleClick = () => {
    ref.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <HomeImage onClick={handleClick} />
      <div ref={ref}>
        <SchedulerHomeContainer />
      </div>
      <AppFooter />
    </>
  );
}

export default Home;
