import {useState} from "react"
import {Link, useNavigate, useParams} from "react-router-dom"
import Loading from "../components/Loading"
import {toast} from "react-toastify"
import {useDispatch, useSelector} from "react-redux"
import {deleteNews} from "../redux/dataSlice"

function Detail() {
  const {id} = useParams()
  const [loading, setLoading] = useState<boolean>(false)
  const dispatch = useDispatch<any>()
  const navigate = useNavigate()

  const {allNews} = useSelector((state: any) => state.dataSlice)

  const handleDelete = (itemId: string | number) => {
    setLoading(true)
    dispatch(deleteNews(itemId))
      .then(() => {
        toast.success("News deleted successfully")
        navigate("/")
        setLoading(false)
      })
      .catch((error: {message: any}) => {
        console.error(error.message)
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
                {loading ? (
                  <button className="btn btn-disabled">
                    <span className="loading-spinner loading"></span>
                  </button>
                ) : (
                  <button
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
