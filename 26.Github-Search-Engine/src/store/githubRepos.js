import create from 'zustand'
import axios from 'axios'

export const useGithubReposStore = create(set => ({
  repos: [],
  loading: false,
  isEnd: false,
  getRepos: async (username, page) => {
    set({loading:true})
    const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=30&page=${page}`, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_Github_API_KEY}`
      }
    })

    set(state => ({
      loading: false,
      repos: [...state.repos, ...res.data],
      isEnd: res.data.length === 0
    }))
  },
  resetRepos: () => {
    set({
      loading: false,
      repos:  [],
      isEnd: false
    })
  }
}))