import {nanoid} from "nanoid"
import {FormEvent, useEffect, useState} from "react"
import {useNavigate} from "react-router-dom"
import {toast} from "react-toastify"
import {NewsObj} from "../interface/allDataInterface"
import {createNews} from "../redux/dataSlice"
import {animateScroll} from "react-scroll"
import {useAppDispatch} from "../redux/store"

function Create() {
  useEffect(() => {
    animateScroll.scrollToTop({
      duration: 500,
      smooth: true,
    })
  }, [])
  const dispatch = useAppDispatch()
  const [loading, setLoading] = useState<boolean>(false)
  const navigate = useNavigate()

  function isValidImageExtension(filename: string): boolean {
    const allowedExtensions = [".jpg", ".png", ".svg"]
    const extension = filename.slice(filename.lastIndexOf(".")).toLowerCase()
    return allowedExtensions.includes(extension)
  }

  const todayFunc = () => {
    const today: Date = new Date()
    const options: Intl.DateTimeFormatOptions = {
      day: "numeric",
      month: "short",
      year: "numeric",
    }
    const formattedDate: string = today.toLocaleDateString("en-US", options)
    return formattedDate
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    setLoading(true)
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const img = formData.get("img") as string
    const title = formData.get("title") as string
    const description = formData.get("description") as string
    const author = formData.get("author") as string

    if (!isValidImageExtension(img)) {
      toast.error(
        "Invalid image URL. Please provide a URL ending with .jpg, .png, or .svg"
      )
      setLoading(false)
      return
    }

    const newNews: NewsObj = {
      id: nanoid(),
      img,
      title,
      description,
      author,
      date: todayFunc(),
    }

    try {
      await dispatch(createNews(newNews))
      setLoading(false)
      navigate("/")
      toast.success("Successfully created news")
    } catch (error: any) {
      toast.error(error)
    }
  }
  return (
    <form onSubmit={handleSubmit} className="w-full flex justify-center mt-6">
      <label className="form-control max-w-sm w-full">
        <div className="label">
          <span className="label-text">Img URL</span>
        </div>
        <input
          required
          type="url"
          name="img"
          placeholder="Type here"
          className="input input-bordered mb-3"
        />
        <div className="label">
          <span className="label-text">Title</span>
        </div>
        <input
          required
          type="text"
          name="title"
          placeholder="Type here"
          className="input input-bordered mb-3"
        />
        <div className="label">
          <span className="label-text">Description</span>
        </div>
        <input
          required
          type="text"
          name="description"
          placeholder="Type here"
          className="input input-bordered mb-3"
        />
        <div className="label">
          <span className="label-text">Author</span>
        </div>
        <input
          required
          maxLength={20}
          type="text"
          name="author"
          placeholder="Type here"
          className="input input-bordered mb-3"
        />
        {loading ? (
          <button type="button" className="btn btn-disabled btn-primary mt-2">
            Create <span className="loading"></span>
          </button>
        ) : (
          <button type="submit" className="btn btn-primary">
            Create
          </button>
        )}
      </label>
    </form>
  )
}

export default Create
