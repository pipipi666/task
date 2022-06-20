import axios from "axios";
export const moduleUsers = {
    state: () => ({
        users: [],
        page: 0,
        limit: 10,
        totalPages: 0,
        paginationUsers: []
    }),
    getters: {
        getUsers(state) {
            return state.users;
        },
        getUsersList(state) {
            return state.users.map(x => ({ title: x.username, value: x.id }))
        },
        paginationUsers(state) {
            return state.paginationUsers
        }
    },
    mutations: {
        updateUsers(state, users) {
            state.users = users;
        },
        setPage(state, page) {
            state.page = page
        },
        setTotalPages(state, totalPages) {
            state.totalPages = totalPages
        },
        setUsers(state, users) {
            state.paginationUsers = users
        },
        setLimit(state, limit) {
            state.limit = limit
        },
    },
    actions: {
        async fetchUsers({ commit }) {
            try {
                const response = await axios.get(
                    "http://93.95.97.34/api/users/all");
                commit('updateUsers', response.data);
            } catch (e) {
                alert("Ошибка");
            }
        },
        filtredPage({ commit, state }, page = 0) {
            commit('setPage', page);
            axios.post("http://93.95.97.34/api/users", {
                filter: {
                    query: ""
                },
                page: state.page || 0,
                limit: state.limit || 0
            }).then((res) => {
                const { data, page, limit, total } = res.data || {};
                commit('setUsers', (data || []));
                commit('setLimit', limit);
                commit('setTotalPages', total);
                commit('setPage', page);
            })
        }
    },
    namespaced: true
}