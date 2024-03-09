import {useEffect, useState} from "react"
import {Link, useNavigate, useParams} from "react-router-dom"
import Loading from "../components/Loading"
import {toast} from "react-toastify"
import {useSelector} from "react-redux"
import {deleteNews, singleData} from "../redux/dataSlice"
import {animateScroll} from "react-scroll"
import {useAppDispatch} from "../redux/store"
import {RootState} from "../interface/allDataInterface"

function Detail() {
  useEffect(() => {
    animateScroll.scrollToTop({
      duration: 500,
      smooth: true,
    })
  }, [])
  const {id} = useParams()
  const [loading, setLoading] = useState<boolean>(false)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const {allNews} = useSelector((state: RootState) => state.dataSlice)

  const handleDelete = (itemId: string | number) => {
    setLoading(true)
    dispatch(deleteNews(itemId))
      .then(() => {
        toast.success("News deleted successfully")
        navigate("/")
        setLoading(false)
      })
      .catch(() => {
        toast.error("Failed to delete item")
        setLoading(false)
      })
  }

  const item =
    allNews && allNews.find((news: {id: string | number}) => news.id === id)
  return (
    <>
      {item ? (
        <div className="card lg:card-side bg-base-100 shadow-xl mt-6">
          <figure>
            <img
              className="w-[400px] max-[1024px]:max-w-full max-[1024px]:w-full max-[1024px]:max-h-[500px] h-full mb-auto"
              src={item.img}
              alt="Album"
            />
          </figure>
          <div className="card-body max-[630px]:p-[15px] pb-5 w-min max-[1024px]:w-full">
            <h2 className="card-title">{item.title}</h2>
            <p className="mt-2">{item.description}</p>
            <div className="items-center max-[543px]:block max-[543px]:mt-3">
              <div className="flex text-[14px] font-mono gap-x-4 max-[450px]:block max-[450px]:text-center text-end mt-2">
                <p>
                  Author: <span className="opacity-70">{item.author}.</span>
                </p>
                <p className="opacity-70 contents">{item.date}</p>
              </div>
              <div className="items-center max-[450px]:justify-center justify-end mt-3 flex gap-x-3 max-[543px]:mt-3">
                <Link
                  to={`/edit`}
                  onClick={() => {
                    dispatch(singleData(item))
                  }}
                  title="Edit"
                  className="btn btn-square"
                >
                  <svg
                    className="h-6 w-6"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M21.2799 6.40005L11.7399 15.94C10.7899 16.89 7.96987 17.33 7.33987 16.7C6.70987 16.07 7.13987 13.25 8.08987 12.3L17.6399 2.75002C17.8754 2.49308 18.1605 2.28654 18.4781 2.14284C18.7956 1.99914 19.139 1.92124 19.4875 1.9139C19.8359 1.90657 20.1823 1.96991 20.5056 2.10012C20.8289 2.23033 21.1225 2.42473 21.3686 2.67153C21.6147 2.91833 21.8083 3.21243 21.9376 3.53609C22.0669 3.85976 22.1294 4.20626 22.1211 4.55471C22.1128 4.90316 22.0339 5.24635 21.8894 5.5635C21.7448 5.88065 21.5375 6.16524 21.2799 6.40005V6.40005Z"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M11 4H6C4.93913 4 3.92178 4.42142 3.17163 5.17157C2.42149 5.92172 2 6.93913 2 8V18C2 19.0609 2.42149 20.0783 3.17163 20.8284C3.92178 21.5786 4.93913 22 6 22H17C19.21 22 20 20.2 20 18V13"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
                {loading ? (
                  <button className="btn btn-disabled">
                    <span className="loading-spinner loading"></span>
                  </button>
                ) : (
                  <button
                    title="Delete"
                    onClick={() => handleDelete(item.id)}
                    className="btn btn-square"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                )}

                <Link to={"/"} className="btn btn-md">
                  Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  )
}

export default Detail
