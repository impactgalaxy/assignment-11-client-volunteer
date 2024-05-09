import { Outlet } from "react-router-dom"
import Navbar from "./C_P_R/components/shared_conponents/Navbar"
import Footer from "./C_P_R/components/shared_conponents/Footer"

function App() {

  return (
    <>
      <Navbar></Navbar>
      <Outlet></Outlet>
      <Footer></Footer>

    </>
  )
}

export default App
/***
 * https://i.ibb.co/jM1kpks/at-infinity-fl6pb3-E-z-S8-unsplash.jpg
 * https://i.ibb.co/hX0VNh2/markus-spiske-phvqs-Mbxt-TY-unsplash.jpg
 * https://i.ibb.co/12rwN88/tony-mucci-kj-Op-ODAb-JA-unsplash.jpg
 * https://i.ibb.co/qJ3xQG7/joshua-coleman-WTrfvtoe3y-M-unsplash.jpg
 * https://i.ibb.co/jyhSN3K/daniel-curran-Mt-v-DBy-RI44-unsplash.jpg
 * https://i.ibb.co/b7yPJwz/riccardo-ginevri-h-Uj-SO5d-ZA-E-unsplash.jpg
 */