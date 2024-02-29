import {Outlet} from "react-router-dom"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

function RootLayout() {
  return (
    <>
      <div className="flex flex-col grow max-container">
        <Navbar />
        <main>
          <Outlet />
        </main>
      </div>
      <Footer />
    </>
  )
}

export default RootLayout
