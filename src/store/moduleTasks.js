import axios from "axios";
export const moduleTasks = {
    state: () => ({
        tasks: [],
        page: 0,
        limit: 10,
        totalPages: 0,
        filter: {
            query: "",
            assignedUsers: [],
            userIds: [],
            type: [],
            status: [],
            rank: []
        },
        paginationTasks: []
    }),
    getters: {
        getTasks(state) {
            return state.tasks;
        }, 
        getFilter(state) {
            return state.filter
        },
        getPaginationTasks(state) {
            return state.paginationTasks
        }
    },
    mutations: {
        setTasks(state, tasks) {
            state.tasks = tasks;
        },
        setPage(state, page) {
            state.page = page
        },
        setTotalPages(state, totalPages) {
            state.totalPages = totalPages
        },
        setFilterQuery(state, query) {
            state.filter.query = query
        },
        setFilterAssignedUsers(state, ids) {
            state.filter.assignedUsers = ids
        },
        setFilterStatus(state, status) {
            state.filter.status = status
        },
        setFilterRank(state, rank) {
            state.filter.rank = rank
        },
        setFilterType(state, type) {
            state.filter.type = type
        },
        setLimit(state, limit) {
            state.limit = limit
        },
        setPaginationTasks(state, tasks) {
            state.paginationTasks = tasks
        }
    },
    actions: {
        async fetchPaginationTasks({ state, commit }, page = 0) {
            commit('setPage', page);
            try {
                const response = await axios.post(
                    "http://93.95.97.34/api/tasks", {
                    filter: state.filter,
                    page: state.page,
                    limit: state.limit
                });
                const { data, page, limit, total } = response.data || {}
                commit('setPaginationTasks', data);
                commit('setLimit', limit);
                commit('setTotalPages', total);
                commit('setPage', page);
            } catch (e) {
                alert("Ошибка");
            }
        },
        async fetchTasks({ commit }) {
            try {
                const response = await axios.post(
                    "http://93.95.97.34/api/tasks", {
                        page: 0,
                        limit: 0
                    });
                const { data } = response.data || {}
                commit('setTasks', data);
            } catch (e) {
                alert("Ошибка");
            }
        },
    },
    namespaced: true
}