// import axios from "axios";

// export const moduleAuth = {
//     state: () => ({
//         login: "",
//         password: "",
//         loggedIn: false,
//         userData: {}
//     }),
//     getters: {
//     },
//     mutations: {
//         updateUserData(state, userData) {
//             state.userData = userData;
//             localStorage.setItem(
//                 'userData',
//                 JSON.stringify({ ...userData, password: userData.password })
//             );
//         },
//         updateAuth(state, isAuth) {
//             state.loggedIn = isAuth;
//         },
//         updateLogin(state, login) {
//             state.login = login;
//         },
//         updatePassword(state, password) {
//             state.password = password;
//         },
//     },
//     actions: {
//         async submitLogin({ state, commit }) {
//             const response = await axios.post(
//                 "http://93.95.97.34/api/users/login", {
//                 login: state.login,
//                 password: state.password
//             });
//             if (response.message) {
//                 alert("Ошибка");
//                 return false
//             }
//             else {
//                 commit('updateUserData', response.data);
//                 commit('updateAuth', true);
//                 localStorage.setItem(
//                     'userData',
//                     JSON.stringify({ ...response.data, password: state.password })
//                 );
//                 return true
//             }
//         },
//     },
//     namespaced: true
// }


import axios from "axios";

const user = JSON.parse(localStorage.getItem('userData'))
const initialState = user
    ? { loggedIn: true, userData: user }
    : { loggedIn: false, userData: {} }

export const moduleAuth = {
    namespaced: true,
    state: { ...initialState, error: '' },
    mutations: {
        updateUserData(state, userData) {
            state.userData = userData;
            state.loggedIn = true
        },
        setError(state, message) {
            state.error = message
        }
    },
    getters: {
        getLoggedIn(state) {
            return state.loggedIn
        }
    },
    actions: {
        async login({ commit }, data) {
            const response = await axios.post("http://93.95.97.34/api/users/login", data);
            if (response) {
                if (response.message) {
                    commit('setError', response.message)
                    return false
                }
                else {
                    commit('updateUserData', response.data)
                    localStorage.setItem(
                        'userData',
                        JSON.stringify({ ...response.data, password: data.password })
                    );
                    return true
                }
            }
        }
    }
}