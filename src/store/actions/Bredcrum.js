export const receive_post = post => {
    return {
        type: "BREADCRUM",
        data: post
    };
};


export const change_breadcrum = name => {
    return function(dispatch, getState) {
        return dispatch(receive_post(name))
    };
};