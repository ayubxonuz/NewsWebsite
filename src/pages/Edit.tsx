import {FormEvent, useEffect, useState} from "react"
import {useSelector} from "react-redux"
import {NewsObj, RootState} from "../interface/allDataInterface"
import {json, useNavigate} from "react-router-dom"
import {toast} from "react-toastify"

function Edit() {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const {singleData} = useSelector((store: RootState) => store.dataSlice)

  useEffect(() => {
    if (Object.keys(singleData).length === 0) {
      navigate("/")
    }
  }, [])

  function isValidImageExtension(filename: string): boolean {
    const allowedExtensions = [".jpg", ".png", ".svg"]
    const extension = filename.slice(filename.lastIndexOf(".")).toLowerCase()
    return allowedExtensions.includes(extension)
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
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
    const editNews = {
      img,
      title,
      description,
      author,
    }
    try {
      setLoading(true)
      const req = await fetch(
        `https://newsdata-cdr7.onrender.com/data/${singleData.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editNews),
        }
      ).then(() => {
        toast.success("Successfully edited news")
        setLoading(false)
        navigate("/")
      })
    } catch (error: any) {
      toast.error(error)
    }
  }

  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      className="w-full flex justify-center mt-6"
    >
      <label className="form-control max-w-sm w-full">
        <div className="label">
          <span className="label-text">Img URL</span>
        </div>
        <input
          required
          type="url"
          name="img"
          defaultValue={singleData.img}
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
          defaultValue={singleData.title}
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
          defaultValue={singleData.description}
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
          defaultValue={singleData.author}
          placeholder="Type here"
          className="input input-bordered mb-3"
        />
        {loading ? (
          <button type="button" className="btn btn-disabled btn-primary mt-2">
            Edit <span className="loading"></span>
          </button>
        ) : (
          <button type="submit" className="btn btn-primary">
            Edit
          </button>
        )}
      </label>
    </form>
  )
}

export default Edit
