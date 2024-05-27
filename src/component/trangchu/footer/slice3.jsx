//import React from 'react'
const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
import Card from "../card/index";
import {useSelector} from 'react-redux'
import {Productinfor} from '../../redux/selector'
//         "productid": 1,
//         "productname": "Áo thun nam",
//         "productprice": 100000,
//         "productmaterial": "Cotton",
//         "color": "Đỏ",
//         "sizee": "S",
//         "image": [],
//         "typeofproduct": "Áo_thun",
//         "gender": "Nam"
const slice3 = () => {
  const Product=useSelector(Productinfor)
  console.log(Product)
  return (
    <div className="w-[70%] flex flex-wrap  m-auto gap-5 mt-10">
      {
        /* {Product.map((el)=>(<Card key={el.id} name={'card1'} size={[]} price={'110.000'}/>))} */
        Product.map((el) => (<Card
        id={el.productid}
            key={el.productid}
            name={el.productname}
            size={["S", "M", "L", "XL", "2XL"]}
            price={el.productprice}
            url={el.image}
          />))
      }
    </div>
  );
};

export default slice3;
