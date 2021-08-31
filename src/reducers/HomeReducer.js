const HomeReducer = (state, action) => {
  switch (action.type) {
    case 'LOAD_TREES': {
      return { ...state, trees: action.payload, tree: undefined, totalPages: Math.ceil(action.total_trees / state.pageSize) }
    }

    case 'CHANGE_FILTER': {
      return { ...state, filter: action.payload }
    }

    case 'CHANGE_TREE': {
      return { ...state, tree: action.payload }
    }

    case 'SHOW_ERROR': {
      return { ...state, showAlert: true, alertMessage: action.payload }
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

    case 'PAGE_CHANGE': {
      return { ...state, page: action.payload }
    }

    default:
      throw new Error('no matching action type');
  }
};

export default HomeReducer;
