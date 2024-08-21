export const receive_post = post => {
    return {
        type: "ADD_COLUMN",
        data: post
    };
};


export const add_column = data => {
    return function(dispatch, getState) {
        return dispatch(receive_post(data))
    };
};