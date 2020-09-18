import * as types from "./actionTypes";

const initialState = {
  vkpay_id: 0,
  image: '',
  form: { title:'', duration: '', link:{}, name:'', description:'', abnormal: false, exclude:false, trailer:false },
  user: {first_name: 'Матвей', last_name: 'Правосудов', donate:0}
};

const historyReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_PODCAST_ICON:
      return {
        ...state,
        image: action.payload
      };
    case types.SET_PODCAST_CONTENT:
      return {
        ...state,
        music: action.payload
      };
    case types.SET_PODCAST_FORM:
      return {
        ...state,
        form: {...state.form, ...action.payload}
      };
    case types.SET_VK_USER:
      return {
        ...state,
        user: {...state.user, ...action.payload}
      };
    default:
      return state;
  }
};

export default historyReducer;
