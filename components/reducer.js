export const initialState = {
    dishes: [],
    promos: [],
    leaders: [],
    comments: []
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
      default:
        return state;
    }
  };
  
  export default reducer;