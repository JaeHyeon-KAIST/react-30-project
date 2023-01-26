import create from 'zustand'
import axios from 'axios'

export const useGithubUsersStore = create(set => ({
  users: [],
  totalCount: 0,
  loading: false,
  searchUsers: async (q, page) => {
    set({loading:true})
    const res = await axios.get(`https://api.github.com/search/users?q=${q}&per_page=20&page=${page}`, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_Github_API_KEY}`
      }
    })

    set({loading:false, users:res.data.items, totalCount:res.data.total_count})
  }
}))