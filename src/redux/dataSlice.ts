import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import {NewsObj} from "../interface/allDataInterface"

export const fetchData = createAsyncThunk(
  "newswebsite/fetchData",
  async (_, thunkAPI) => {
    try {
      const res = await fetch("https://newsdata-cdr7.onrender.com/data")
      if (!res.ok) {
        throw new Error("Failed to fetch data")
      }
      return await res.json()
    } catch (error: any) {
      return thunkAPI.rejectWithValue({error: error.message})
    }
  }
)

export const createNews = createAsyncThunk(
  "newswebsite/createNews",
  async (newNews: NewsObj, thunkAPI) => {
    try {
      const res = await fetch("https://newsdata-cdr7.onrender.com/data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newNews),
      })

      if (!res.ok) {
        throw new Error("Failed to create news")
      }

      return newNews
    } catch (error: any) {
      return thunkAPI.rejectWithValue({error: error.message})
    }
  }
)

export const deleteNews = createAsyncThunk(
  "newswebsite/deleteNews",
  async (id: string | number, thunkAPI) => {
    try {
      const res = await fetch(`https://newsdata-cdr7.onrender.com/data/${id}`, {
        method: "DELETE",
      })

      if (!res.ok) {
        throw new Error("Failed to delete news")
      }

      return id
    } catch (error: any) {
      return thunkAPI.rejectWithValue({error: error.message})
    }
  }
)

const initialState = {
  allNews: null as unknown,
  loading: false,
  error: null,
  searchTerm: "",
  filterData: [] as NewsObj[],
  singleData: {},
}

export const dataSlice = createSlice({
  name: "news",
  initialState: initialState,
  reducers: {
    setAllData: (state, action) => {
      state.allNews = action.payload
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload
    },
    filterArr: (state) => {
      if (Array.isArray(state.allNews)) {
        state.filterData = state.allNews.filter((news: NewsObj) =>
          news.title.toLowerCase().includes(state.searchTerm.toLowerCase())
        )
      }
    },
    singleData: (state, {payload}) => {
      state.singleData = payload
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchData.rejected, (state, {payload}: any) => {
        state.loading = false
        state.error = payload.error
      })
      .addCase(fetchData.fulfilled, (state, {payload}) => {
        state.error = null
        state.allNews = payload
        state.loading = false
      })
      .addCase(createNews.fulfilled, (state, {payload}) => {
        Array.isArray(state.allNews) && state.allNews.push(payload)
      })
      .addCase(deleteNews.fulfilled, (state, {payload}) => {
        Array.isArray(state.allNews) &&
          state.allNews.filter((news: NewsObj) => news.id !== payload)
      })
  },
})

export const {setAllData, singleData, setSearchTerm, filterArr} =
  dataSlice.actions

export default dataSlice.reducer
