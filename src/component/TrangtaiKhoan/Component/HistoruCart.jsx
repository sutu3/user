
const HistoruCart = ({order,name}) => {
    const time=order.created_at.split('T')
    console.log(time)
  return (
    <div className="bg-[#fcf3ec] w-64 h-28 rounded-lg flex flex-col hover:border-[#fab36d] hover:border-2">
      <div className="p-3 flex flex-row pb-0 justify-between">
        <div className="font-mono font-bold ">{name}</div>
        <div className="w-8 h-8 bg-center bg-cover bg-no-repeat" style={{backgroundImage:'url("/src/assets/Image/3.png")'}}></div>
      </div>
      <div className="flex flex-row p-2 pb-0 pt-1 gap-10">
        <div className="flex flex-row "> 
        <div className="w-5 h-5 bg-center bg-cover bg-no-repeat" style={{backgroundImage:'url("/src/assets/Image/1.png")'}}></div>
        <div className="text-xs justify-center items-center flex font-serif">{time[0]}</div>
        </div>
        <div className="flex flex-row gap-2"> 
        <div className="w-4 h-4 bg-center bg-cover bg-no-repeat" style={{backgroundImage:'url("/src/assets/Image/2.png")'}}></div>
        <div className="text-xs justify-center items-center flex font-serif">{time[1]}</div>
        </div>
      </div>
      <div className="gap-16 flex flex-row p-3">
        <div className="bg-[#e47e1a] rounded-xl p-[5px] text-xs text-white">{order.status}</div>
        <div className="font-mono text-sm">$ {order.orderItems.reduce((el,acc)=>el+(acc.product_price*acc.quantity),0)}</div>
      </div>
    </div>
  )
}

export default HistoruCart
