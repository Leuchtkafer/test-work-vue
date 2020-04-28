import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import VueAxios from 'vue-axios';

Vue.use(Vuex);
Vue.use(VueAxios, axios);

export default new Vuex.Store({
	state: {
		peoples: [],
		history: [],
		selectedPeoples: [],
	},
	getters: {},
	actions: {
		loadPeoples({ commit }) {
			axios
				.get('https://randomuser.me/api/?results=100&inc=name,location&nat=us')
				.then((r) => r.data.results)
				.then((results) => {
					const peoples = results.map((it, index) => {
						const people = it;
						people.id = index;
						return people;
					});
					commit('SET_PEOPLES', peoples);
				});
		},

		select({ commit }, data) {
			commit('UPDATE_HISTORY', data);
			commit('SELECT_PEOPLE', data);
			commit('REDUSE_PEOPLES', data);
		},

		unselect({ commit }, data) {
			commit('UPDATE_HISTORY', data);
			commit('UPDATE_PEOPLES', data);
			commit('UNSELECT_PEOPLE', data);
		},
	},
	mutations: {
		SET_PEOPLES(state, peoples) {
			state.peoples = peoples;
		},

		UPDATE_HISTORY(state, history) {
			state.history.push(history);
		},

		UPDATE_PEOPLES(state, people) {
			state.peoples = [...state.peoples, state.selectedPeoples.find((it) => it.id === people.id)]
				.sort((a, b) => a.id - b.id);
		},

		REDUSE_PEOPLES(state, people) {
			state.peoples = state.peoples.filter((it) => it.id !== people.id);
		},

		SELECT_PEOPLE(state, people) {
			state.selectedPeoples = [...state.selectedPeoples,
				state.peoples.find((it) => +it.id === people.id)];
		},

		UNSELECT_PEOPLE(state, people) {
			state.selectedPeoples = state.selectedPeoples.filter((it) => it.id !== people.id);
		},
	},
});
