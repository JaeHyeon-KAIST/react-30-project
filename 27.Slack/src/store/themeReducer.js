const SET_THEME = 'SET_THEME'

export const setTheme = (mainTheme, subTheme) => ({type:SET_THEME, mainTheme, subTheme})

const initialState = {mainTheme: '#4C3C4C', subTheme: '#eee'}

const themeReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_THEME:
      return {
        mainTheme: action.mainTheme,
        subTheme: action.subTheme
      };
    default:
      return state;
  }
}

export default themeReducer;