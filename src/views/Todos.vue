<template>
	<div class="grey lighten-3">
		<v-data-table
			:headers="headers"
			:items="getActiveItems"
			:options.sync="options"
			:server-items-length="getCountOfActiveItems"
			:loading="loading"
			class="elevation-1"
			:footer-props="{
				'items-per-page-options': [5],
			}"
			:items-per-page="5"
		>
			<template v-slot:top>
				<v-toolbar flat>
					<v-toolbar-title>Задачи</v-toolbar-title>
				</v-toolbar>
			</template>

			<template v-slot:item.category_info="{ item }">
				<v-menu bottom offset-y>
					<template v-slot:activator="{ on, attrs }">
						<v-btn v-bind="attrs" v-on="on" text>Категории</v-btn>
					</template>
					<v-list>
						<v-list-item
							v-for="category in item.category_info"
							:key="category.id"
						>
							<v-list-item-title>{{ category.title }}</v-list-item-title>
						</v-list-item>
					</v-list>
				</v-menu>
			</template>

			<template v-slot:item.deadline="{ item }">
				<!-- <v-date-picker v-bind="new Date(item.deadline)"></v-date-picker> -->
				{{ moment(item.deadline).fromNow() }}
			</template>

			<template v-slot:item.status="{ item }">
				<v-chip v-if="item.status == 'PLANNED'" text-color="black"
					>Запланировано</v-chip
				>
				<v-chip
					v-else-if="item.status == 'PROCESS'"
					color="orange"
					text-color="white"
					>В процессе</v-chip
				>
				<v-chip
					v-else-if="item.status == 'DONE'"
					color="green"
					text-color="white"
					>Выполнено</v-chip
				>
			</template>
		</v-data-table>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
import moment from 'moment'

moment.lang('ru')

export default {
	name: 'Todos',

	data() {
		return {
			loading: true,
			options: {},
			headers: [
				{ text: 'Название', value: 'title', sortable: false },
				{
					text: 'Описание',
					align: 'start',
					sortable: false,
					value: 'description',
				},
				{ text: 'Дедлайн', value: 'deadline', sortable: true },
				{ text: 'Категории', value: 'category_info', sortable: false },
				{ text: 'Статус', value: 'status', sortable: false },
			],
		}
	},
	watch: {
		options: {
			handler() {
				this.getDataFromApi()
			},
			deep: true,
		},
	},
	methods: {
		async getDataFromApi() {
			this.loading = true

			const { sortBy, sortDesc } = this.options

			const prefixDirectionSort = sortDesc[0] ? '' : '-'

			await this.$store.dispatch('Todos/fetchTodos', { orderingQuery: prefixDirectionSort + sortBy })

			this.loading = false
		},

		moment,
	},

	computed: {
		...mapGetters({
			getCountOfActiveItems: 'Todos/getCountOfActiveItems',
			getCategories: 'Category/getCategories',
		}),

		getActiveItems() {
			return this.$store.getters['Todos/getActiveItems'](this.options.page)
		},
	},
}
</script>

<style>
.v-data-footer {
	justify-content: flex-end;
	padding: 5px 0 !important;
}
</style>
