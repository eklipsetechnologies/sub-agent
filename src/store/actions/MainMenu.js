export const receive_post = post => {
    return {
        type: "MAIN_MENU",
        data: post
    };
};


export const open_main_menu = name => {

    return function(dispatch, getState) {
        return dispatch(receive_post(name))
    };
};