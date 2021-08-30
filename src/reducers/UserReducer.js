const UserReducer = (state, action) => {
  switch (action.type) {
    case 'LOAD_USERS': {
      return { ...state, users: action.payload }
    }

    case 'SHOW_ERROR': {
      return { ...state, alertSeverity: "error", alertTitle: "Error", showAlert: true, alertMessage: action.payload }
    }

    case 'SHOW_INFO': {
      return { ...state, alertSeverity: "info", alertTitle: "Info", showAlert: true, alertMessage: action.payload }
    }

    case 'HIDE_ALERT': {
      return { ...state, showAlert: false }
    }

    case 'LOADING': {
      return { ...state, isLoading: true }
    }

    case 'READY': {
      return { ...state, isLoading: false }
    }

    default:
      throw new Error('no matching action type');
  }
};

export default UserReducer;
