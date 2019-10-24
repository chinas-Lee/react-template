const setPageTitle = function (data) {
    return (dispatch, getState) => {
        dispatch({
            type: 'SET_PAGE_TITLE',
            data: data
        })
    }
}
const setUserData = function (data) {
    return async (dispatch, getState) => {
        dispatch({
            type: 'SET_USER_DATA',
            data: data
        })
    }
}

export {
    setPageTitle,
    setUserData
}
