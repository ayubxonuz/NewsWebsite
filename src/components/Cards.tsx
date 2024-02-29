import {Link} from "react-router-dom"
import {NewsObj} from "../interface/allDataInterface"
type CardProps = {
  news: NewsObj
}

function Cards({news}: CardProps) {
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
              <div className="badge badge-secondary">NEW</div>
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
