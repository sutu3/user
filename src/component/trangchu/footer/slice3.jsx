
import Card from "../card/index";
import { StateCard } from "../../redux/selector";
import {useSelector} from 'react-redux'
import {Productinfor} from '../../redux/selector'
const Slice3 = () => {
    const state=useSelector(StateCard)
  const Product=useSelector(Productinfor)
  console.log(Product)
  return (
    <div className={`w-[70%] flex flex-wrap  m-auto gap-5 transition-transform duration-700 ease-in-out  transform ${!state?"translate-x-0":"-translate-x-56"}`}>
      {
        Product.map((el,index) => (<Card
          product1={el}
            key={index}
          />))
      }</div>
      
  );
};

export default Slice3;
