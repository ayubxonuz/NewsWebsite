import {useEffect} from "react"
import CardsList from "./CardsList"
import {animateScroll} from "react-scroll"

function Home() {
  useEffect(() => {
    animateScroll.scrollToTop({
      duration: 500,
      smooth: true,
    })
  }, [])
  return (
    <>
      <CardsList />
    </>
  )
}

export default Home
