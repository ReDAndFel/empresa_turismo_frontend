import "./App.css"
import { Route, Routes, Link } from "react-router-dom"
import RoomReservation from "./components/RoomReservation/RoomReservation"
import CarReservation from "./components/CarReservation/CarReservation"
import PurchaseItem from "./components/PurchaseItem/PurchaseItem"
import PurchaseTouristPackage from "./components/PurchaseTouristPackage/PurchaseTouristPackage"
import PurchaseTouristPackageCancellation from "./components/PurchaseTouristPackageCancellation/PurchaseTouristPackageCancellation"
import RoomReservationCancellation from "./components/RoomReservationCancellation/RoomReservationCancellation"

function App() {

  return (
    <div className="main_container">
      <nav className="nav_aside">
        <Link to="/Reservacion_de_habitacion">Reservacion de habitacion</Link>
        <Link to="/Reservacion_de_carro">Reservacion de carro</Link>
        <Link to="/Compra_de_articulo">Compra articulo</Link>
        <Link to="/Compra_paquete_turistico">Compra paquete turistico</Link>
        <Link to="/Cancelacion_paquete_turistico">Cancelacion paquete turistico</Link>
        <Link to="/Cancelacion_reserva_habitacion">Cancelacion reserva habitacion</Link>
      </nav>
      <Routes className='routes_container'>
        <Route path='/' element={<RoomReservation />} />
        <Route path='/Reservacion_de_habitacion' element={<RoomReservation />} />
        <Route path='/Reservacion_de_carro' element={<CarReservation />} />
        <Route path='/Compra_de_articulo' element={<PurchaseItem />} />
        <Route path='/Compra_paquete_turistico' element={<PurchaseTouristPackage />} />
        <Route path='/Cancelacion_paquete_turistico' element={<PurchaseTouristPackageCancellation />} />
        <Route path='/Cancelacion_reserva_habitacion' element={<RoomReservationCancellation />} />
      </Routes>
    </div>
  )
}

export default App
