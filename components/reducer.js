export const initialState = {
    dishes: [],
    promos: [],
    leaders: [],
    comments: [],
    favorites: []
};
const reducer = (state, action) => {
    switch (action.type) {
      case "SET__DISHES":
          return{
              ...state,
              dishes: action.payload
          }
      case "SET__PROMOS":
          return{
              ...state,
              promos: action.payload
          }
      case "SET__LEADERS":
          return{
              ...state,
              leaders: action.payload
          }
      case "SET__COMMENTS":
          return{
              ...state,
              comments: action.payload
          }
      case "SET__FAVORITE":
          return{
              ...state,
              favorites: [...state.favorites, action.payload]
          }
      case "DELETE__FAVORITES":
          return{
              ...state,
              favorites: state.favorites.filter((fav) => fav !== action.payload)
          }
      default:
        return state;
    }
  };
  
  export default reducer;