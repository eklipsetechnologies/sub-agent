export const receive_post = post => {
    return {
        type: "CHAT_DATA",
        data: post
    };
};


export const chats_data = data => {

    return function(dispatch, getState) {
        return dispatch(receive_post(data))
    };
};