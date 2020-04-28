<template>
	<div class="main">
		<div class="main__block">
			<search @input="setInput"/>
			<ul class="main__list">
				<li class="main__list-item" v-for="(item, index) in filteredPeoples" v-bind:key="index">
					<p class="main__list-name">{{ item.name.first }} {{ item.name.last }}</p>
					<p class="main__list-address">
						Адрес: {{ item.location.street.name }} {{ item.location.street.number }}
					</p>
					<button @click="select(item)">+</button>
				</li>
			</ul>
			<p class="main__hint"
				v-show="!filteredPeoples.length">
				Результат не найден. Попробуйте другое имя.
			</p>
		</div>
		<div class="main__block">
			<h3 class="main__block-title">Выбраны:</h3>
			<ul class="main__list">
				<li class="main__list-item"
					v-for="(item, index) in this.selectedPeoples"
					v-bind:key="index">
					<p class="main__list-name">{{ item.name.first }} {{ item.name.last }}</p>
					<p class="main__list-address">
						Адрес: {{ item.location.street.name }} {{ item.location.street.number }}
					</p>
					<button @click="unselect(item)">-</button>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex';
import Search from '../components/Search.vue';

export default {
	name: 'Main',

	components: {
		Search,
	},

	props: {
		peoples: Array,
	},

	data() {
		return {
			loadedData: false,
			inputValue: '',
		};
	},

	computed: {
		...mapState(['selectedPeoples']),

		// фильтрация по имени/фамилии человека и названию улицы
		filteredPeoples() {
			const searchTemplate = (el) => el.toLowerCase()
				.indexOf(this.inputValue.toLowerCase()) >= 0;
			return this.peoples.filter((item) => searchTemplate(item.name.first)
				|| searchTemplate(item.name.last) || searchTemplate(item.location.street.name));
		},
	},

	methods: {
		setInput(e) {
			this.inputValue = e;
		},

		getDate() {
			const date = new Date();
			return date.toLocaleString('ru');
		},

		getData(element, type) {
			return {
				...element,
				move: type,
				data: this.getDate(),
			};
		},

		select(element) {
			this.$store.dispatch('select', this.getData(element, 'select'));
		},

		unselect(element) {
			this.$store.dispatch('unselect', this.getData(element, 'unselect'));
		},
	},
};
</script>

<style lang="less">
	.main {
		display: flex;
		color: #2c3e50;

		&__block {
			display: flex;
			flex-direction: column;
			align-items: flex-start;
			min-width: 256px;

			&:first-of-type {
				margin-right: 36px;
			}

			&-title {
				margin: 0 0 76px;
				font-size: 16px;
				line-height: 20px;
			}
		}

		&__list {
			margin: 0;
			padding: 0;
			list-style: none;
			text-align: left;
			width: 100%;

			&-item {
				position: relative;
				margin-bottom: 16px;

				button {
					position: absolute;
					top: 3px;
					right: 0;
					cursor: pointer;
				}
			}

			&-name,
			&-address {
				margin: 0;
			}
		}

		&__hint {
			max-width: 256px;
		}
	}
</style>
