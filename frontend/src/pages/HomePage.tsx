import { Container } from "components/layout";
import React from "react";
import { Link } from "react-router-dom";

export const HomePage = () => {
  return (
    <Container>
      {/* <div className='w-full h-full flex flex-grow justify-center items-center py-4 xl:py-12'> */}
        <h1 className='text-yellowAcent text-3xl font-robotoMono'>
          <Link to='/typing'>Start Typing</Link>
        </h1>
      {/* </div> */}
    </Container>
  );
};

export default HomePage;
