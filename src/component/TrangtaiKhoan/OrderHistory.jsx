import { User } from "../redux/selector"
import HistoruCart from "./Component/HistoruCart"
import { useSelector } from "react-redux"
const OrderHistory = () => {
  const user=useSelector(User)
  console.log(user.orders)
  return (
    <div className="w-[800px] h-[600px] flex flex-row flex-wrap gap-5">
      {
        user.orders.map((el, index) => (
          <HistoruCart
            key={index}
            order={el}
            name={user.username}
          />
        ))
      }
    </div>
  )
}

export default OrderHistory
