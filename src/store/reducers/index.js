const initialState = {
    details: [],
    isFetching: false,
    error:false,
    errorCode:"",
    chats:[],
    fetching:false,
    children:"",
    menu:"dashboard",
    switch:"Home",
    login_layout:"",
    userDetails:"",
    isToast:false,
    ToastMessage:"",
    ToastToggle:false,
    params:[],
    expandStudents:false,
    searchResult:[],
    selectedStudent:[],
    examColumn:[],
    Right:"Open",
    breadcrum:"Overview",
    quick_switch:"",
    refresh:"",
    quick_params:false,
    quick_param_name:"",
    user:null,
    submenu:"",
    

};

const asyncReducer = (state = initialState, action) => {


    if (action.type === "MENU") {
        return Object.assign({}, state, {
            children: action.data,
        });
    } else if (action.type === "MAIN_MENU") {
        return Object.assign({}, state, {
            menu: action.data
        });
    } else if (action.type === "SWITCH") {
        return Object.assign({}, state, {
            switch: action.data
        });
    } else if (action.type === "LOGIN_LAYOUT") {
        return Object.assign({}, state, {
            login_layout: action.data
        });
    } else if (action.type === "USER_DETAILS") {
        return Object.assign({}, state, {
            userDetails: action.data
        });
    } else if (action.type === "TOAST") {
        return Object.assign({}, state, {
            ToastMessage: action.data,
        });
    } else if (action.type === "TOAST_TRIGGER") {
        return Object.assign({}, state, {
            isToast: action.data,
            ToastToggle:!state.ToastToggle
        });
    } else if (action.type === "PROPS_PARAMS") {
        return Object.assign({}, state, {
            params: action.data,
        });
    } else if (action.type === "OPEN_RIGHT") {
        return Object.assign({}, state, {
            Right: action.data
        });
    } else if (action.type === "REMOVE_COLUMN") {
        return Object.assign({}, state, {
            examColumn:action.data
        });
    } else if (action.type === "BREADCRUM") {
        return Object.assign({}, state, {
            breadcrum:action.data
        });
    } else if (action.type === "QUICK_SWITCH") {
        return Object.assign({}, state, {
            quick_switch:action.data
        });
    } else if (action.type === "REFRESH") {
        return Object.assign({}, state, {
            refresh:action.data
        });
    } else if (action.type === "QUICK_PARAMS") {
        return Object.assign({}, state, {
            quick_params:!state.quick_params
        });
    } else if (action.type === "QUICK_PARAMS_NAME") {
        return Object.assign({}, state, {
            quick_param_name:action.data
        });
    } else if (action.type === "SUBMENU") {
        return Object.assign({}, state, {
            submenu:action.data
        });
    } else if (action.type === "SELECT_USER") {
        return Object.assign({}, state, {
            user:action.data
        });
    }
    return state;


};

export default asyncReducer;