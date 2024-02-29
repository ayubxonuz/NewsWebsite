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

const initialState = {
  allNews: null as any,
  loading: false,
  error: null,
  searchTerm: "",
  filterData: [] as NewsObj[],
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
      state.filterData = state.allNews.filter((news: NewsObj) =>
        news.title.toLowerCase().includes(state.searchTerm.toLowerCase())
      )
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
  },
})

export const {setAllData, setSearchTerm, filterArr} = dataSlice.actions

export default dataSlice.reducer
