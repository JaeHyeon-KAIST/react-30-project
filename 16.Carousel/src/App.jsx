import React from 'react';
import Carousel from './Components/Carousel';

function App() {
  return (
    <div>
      <Carousel loop autoLoop autoTime={2000} transitionTime={500} direction="row">
        {[<div>hello1</div>, <>hello2</>, <>hello3</>, <>hello4</>]}
      </Carousel>
    </div> 
  );
}

export default App;