export const receive_post = post => {
    return {
        type: "REMOVE_COLUMN",
        data: post
    };
};


export const remove_column = data => {
    return function(dispatch, getState) {
        return dispatch(receive_post(data))
    };
};