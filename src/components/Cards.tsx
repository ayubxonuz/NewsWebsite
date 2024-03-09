import {Link} from "react-router-dom"
import {NewsObj} from "../interface/allDataInterface"
import {useEffect, useState} from "react"
type CardProps = {
  news: NewsObj
}

function Cards({news}: CardProps) {
  const [isNew, setIsNew] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000)
      const newsDate = new Date(news.date)
      setIsNew(newsDate > twentyFourHoursAgo)
    }, 0)

    return () => clearTimeout(timer)
  }, [news])
  return (
    <>
      {news && (
        <div className="card max-w-[300px] w-full bg-base-100 shadow-xl">
          <figure>
            <img className="h-[220px]" src={news.img} alt="Shoes" />
          </figure>
          <div className="card-body max-[350px]:p-[20px]">
            <div className="flex items-center gap-x-2">
              <h2 className="card-title line-clamp-1">{news.title}</h2>
              {isNew && (
                <div className="badge badge-secondary text-white">New</div>
              )}
            </div>
            <p className="line-clamp-3">{news.description}</p>
            <div className="flex items-center mt-2">
              <p className="w-[50%] text-[14px] max-[350px]:text-[13px]">
                Author:{" "}
                <span className="opacity-70">
                  {news.author.slice(0, 4) + "..."}
                </span>
              </p>
              <p className="opacity-70 font-mono max-[350px]:text-[13px]">
                {news.date}
              </p>
            </div>
            <Link to={`/detail/${news.id}`} className="btn mt-2 btn-primary ">
              Read More
            </Link>
          </div>
        </div>
      )}
    </>
  )
}

export default Cards
