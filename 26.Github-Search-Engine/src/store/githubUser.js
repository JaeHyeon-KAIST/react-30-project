import create from 'zustand'
import axios from 'axios'

export const useGithubUserStore = create(set => ({
  user: {},
  loading: false,
  getUser: async (username) => {
    set({loading:true})
    const res = await axios.get(`https://api.github.com/users/${username}`, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_Github_API_KEY}`
      }
    })

    set({
      loading: false,
      user: res.data
    })
  }
}))