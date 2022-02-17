import * as types from "../constant";
const initialState = {
    token: null
};

const authProfile = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_USER_PROFILE:
            return { ...state, userProfile: action.payload, isLoading: false };

        case types.TOKEN:
            return { ...state, token: action.payload };

        default:
            return { ...state };
    }
};

export default authProfile;
