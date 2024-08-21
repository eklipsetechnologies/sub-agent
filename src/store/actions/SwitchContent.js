export const receive_post = post => {
    return {
        type: "SWITCH",
        data: post
    };
};


export const switch_content = name => {

    return function(dispatch, getState) {
        return dispatch(receive_post(name))
    };
};