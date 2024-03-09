import Cards from "./Cards"
import {NewsObj, RootState} from "../interface/allDataInterface"
import Loading from "./Loading"
import {useSelector} from "react-redux"
import {useEffect} from "react"
import {fetchData} from "../redux/dataSlice"
import {useAppDispatch} from "../redux/store"

function CardsList() {
  const dispatch = useAppDispatch()
  const {allNews, filterData, loading} = useSelector(
    (store: RootState) => store.dataSlice
  )

  const newsToDisplay = filterData.length > 0 ? filterData : allNews

  useEffect(() => {
    dispatch(fetchData())
  }, [])

  return (
    <>
      {loading && <Loading />}
      <div className="gap-x-4 grid grid-cols-3 gap-y-6 mt-6 max-[970px]:grid-cols-2 justify-items-center max-[666px]:grid-cols-1">
        {newsToDisplay &&
          Array.isArray(newsToDisplay) &&
          newsToDisplay.map((news: NewsObj) => {
            return <Cards key={news.id} news={news} />
          })}
      </div>
      {newsToDisplay && newsToDisplay.length == 0 && (
        <h1 className="text-center font-bold text-xl">
          No news, please add news!
        </h1>
      )}
    </>
  )
}

export default CardsList
