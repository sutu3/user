import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {Provider} from 'react-redux'
import store from './component/redux/store.jsx'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './component/trangchu/home/home'
import Login from './component/trangchu/Login/Login.jsx'
import AccountHome from './component/TrangtaiKhoan/home.jsx'
import Infor from './component/TrangtaiKhoan/infor.jsx'
import Order from './component/TrangtaiKhoan/OrderHistory.jsx'
import State from './component/TrangtaiKhoan/State.jsx'
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
  <React.StrictMode>
  <BrowserRouter>
  <App />
  <Routes>
  <Route path='/' element={<Home/>}/>
  <Route path='/DangNhap' element={<Login/>}/>
  <Route path='/account' element={<AccountHome/>}>
    <Route path='infor' element={<Infor/>}/>
    <Route path='order' element={<Order/>}/>
    <Route path='state' element={<State/>}/>
  </Route>

  {/* <Route /> */}
    
  </Routes>
  </BrowserRouter>
  </React.StrictMode>
  </Provider>
)
