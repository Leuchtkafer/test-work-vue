<template>
<p class="search">
	<label class="search-label" for="name">Введите имя или название улицы</label>
	<input
			class="search-input"
			type="text"
			id="name"
			v-model="value"
			@input="onInput">
</p>
</template>

<script>
export default {
	name: 'Search',

	data() {
		return {
			value: '',
		};
	},

	methods: {
		onInput() {
			this.$emit('input', this.value);
		},
	},
};
</script>

<style lang="less">
	.search {
		display: flex;
		flex-direction: column;
		width: 100%;
		text-align: left;
		margin: 0 0 28px;

		&-label {
			margin-bottom: 6px;
		}

		&-input {
			border: 1px solid #ccc;
			border-radius: 6px;
			outline: none;
			box-shadow: none;
			padding: 8px 12px;
			color: #2c3e50;
			font-size: 16px;
			line-height: 24px;
		}
	}
</style>
