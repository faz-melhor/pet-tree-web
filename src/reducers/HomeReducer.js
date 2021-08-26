const HomeReducer = (state, action) => {
  if (action.type === 'LOAD_TREES') {
    return { ...state, trees: action.payload, tree: undefined }
  }

  if (action.type === 'CHANGE_FILTER') {
    return { ...state, filter: action.payload }
  }

  if (action.type === 'CHANGE_TREE') {
    return { ...state, tree: action.payload }
  }

  if (action.type === 'SHOW_ERROR') {
    return { ...state, showAlert: true, alertMessage: action.payload }
  }

  if (action.type === 'HIDE_ALERT') {
    return { ...state, showAlert: false }
  }

  if (action.type === 'LOADING') {
    return { ...state, isLoading: true }
  }

  if (action.type === 'READY') {
    return { ...state, isLoading: false }
  }

  throw new Error('no matching action type');
};

export default HomeReducer;
