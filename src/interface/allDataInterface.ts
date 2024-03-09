export interface NewsObj {
  id: string | number
  img: string
  title: string
  description: string
  author: string
  date: string
}

export interface RootState {
  dataSlice: {
    allNews: NewsObj[]
    loading: boolean
    error: null
    searchTerm: string
    filterData: [] | NewsObj[]
    singleData: NewsObj
  }
}
