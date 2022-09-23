import { useRef } from 'react';
import SchedulerHomeContainer from '../../components/SchedulerHomeContainer/SchedulerHomeContainer';
import HomeImage from '../../components/HomeImage';


function Home() {
  const ref = useRef(null);

  const handleClick = () => {
    ref.current.scrollIntoView({behavior: 'smooth'});
  };

  return (
    <>
      <HomeImage onClick={handleClick}/>
      <div ref={ref}>
        <SchedulerHomeContainer />
      </div>
    </>
  )
}

export default Home;
