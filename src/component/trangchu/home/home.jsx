// import React from 'react'; // không cần thiết với các phiên bản React mới
import Header from '../header/index';
import Slice1 from '../footer/slice1';
import Slice2 from '../footer/slice2';
import Slice3 from '../footer/slice3';
// Nếu CartSlice là một Redux slice, nó không nên được nhập như một component React
// import CartSlice from '../../redux/CartSlice'; // Xóa dòng này nếu không phải là component

const Home = () => {

  return (
    <div className='w-full absolute top-36'>
      <Header />
      <Slice1 />
      <Slice2 />
      <Slice3 />
      
        
    </div>
  );
}

export default Home;

