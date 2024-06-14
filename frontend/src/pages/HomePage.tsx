import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className='flex flex-col items-center w-full max-w-7xl h-full'>
      <div className='w-full h-full flex justify-center items-center py-4 xl:py-12'>
        <h1 className='text-yellowAcent text-3xl font-robotoMono'>
          <Link to='/typing'>Start Typing</Link>
        </h1>
      </div>
    </div>
  );
};

export default HomePage;
