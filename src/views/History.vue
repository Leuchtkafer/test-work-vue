<template>
	<div class="history">
		<h1>История {{ title }}</h1>
		<ol class="history__list">
			<li v-for="(item, index) in actualHistory" class="history__list-item" v-bind:key="index">
				<p>Имя: {{ item.name.first }} {{ item.name.last }}</p>
				<p>id: {{ item.id }}</p>
				<p>Тип изменения: {{ typeOfChange(item.move) }}</p>
				<p>Дата изменения: {{ item.data }}</p>
			</li>
		</ol>
	</div>
</template>

<script>
import { mapState } from 'vuex';

export default {
	name: 'History',

	props: {
		type: String,
	},

	data() {
		return {
			titles: {
				select: 'добавлений',
				unselect: 'удалений',
			},
		};
	},

	computed: {
		...mapState(['history']),

		title() {
			return this.titles[this.type];
		},

		actualHistory() {
			return this.type ? this.history.filter((it) => it.move === this.type) : this.history;
		},
	},

	methods: {
		typeOfChange(type) {
			return type === 'select' ? 'добавление' : 'удаление';
		},
	},
};
</script>

<style lang="less">
	.history {
		&__list {
			margin: 0;
			padding: 0 0 0 20px;
			text-align: left;
			max-width: 400px;

			p {
				margin: 0;
			}

			&-item {
				margin-bottom: 24px;
			}
		}
	}
</style>
