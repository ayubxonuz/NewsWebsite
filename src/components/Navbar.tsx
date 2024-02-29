import {useEffect, useState, ChangeEvent} from "react"
import {NavLink} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"
import {fetchData, setSearchTerm, filterArr} from "../redux/dataSlice"

function Navbar() {
  const dispatch = useDispatch<any>()
  const {searchTerm} = useSelector((store: any) => store.dataSlice)

  useEffect(() => {
    dispatch(fetchData())
  }, [])

  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light")
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme)
    localStorage.setItem("theme", theme)
  }, [theme])

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value
    dispatch(setSearchTerm(searchTerm))
    dispatch(filterArr())
  }

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"))
  }

  return (
    <div className="navbar bg-base-100 m-0 p-0">
      <div className="flex-1">
        <NavLink
          to={"/"}
          className="text-xl font-bold hover:opacity-60 transition"
        >
          News
        </NavLink>
      </div>
      <div className="flex-none gap-2">
        <div className="form-control">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search"
            className="input input-bordered w-24 md:w-auto"
          />
        </div>
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-14 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://cdn-icons-png.freepik.com/512/7153/7153150.png"
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
          >
            <li>
              <p onClick={toggleTheme}>
                {theme === "light" ? "Dark Mode" : "Light Mode"}
              </p>
            </li>
            <li>
              <NavLink to={"/create"}>Create News</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Navbar
