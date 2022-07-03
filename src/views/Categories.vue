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
					<v-toolbar-title>Категории</v-toolbar-title>
				</v-toolbar>
			</template>
		</v-data-table>

		<form>
			<v-card class="mx-auto pa-5" outlined>
				<div class="text-overline mb-4">Добавить категорию</div>

				<v-list-item>
					<v-list-item-content>
						<v-text-field
							v-model="form.title"
							label="Заголовок"
							required
						></v-text-field>
					</v-list-item-content>
				</v-list-item>

				<v-list-item>
					<v-list-item-content>
						<v-text-field
							v-model="form.description"
							label="Описание"
							required
						></v-text-field>
					</v-list-item-content>
				</v-list-item>

				<v-card-actions class="ml-2">
					<v-btn class="col-12" color="success" @click="handlerClickAddCategory"
						>Добавить категорию</v-btn
					>
				</v-card-actions>
			</v-card>
		</form>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
	name: 'Categories',

	data() {
		return {
			form: {
				title: '',
				description: '',
			},

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

			await this.$store.dispatch('Categories/fetchCategories', {
				orderingQuery: prefixDirectionSort + sortBy,
			})

			this.loading = false
		},

		async handlerClickAddCategory() {
			try {
				await this.$store.dispatch('Categories/addCategory', {
					title: this.form.title,
					description: this.form.description,
				})

				await this.getDataFromApi()
			} catch (e) {
				console.log(e)
			}

			this.form.title = ''
			this.form.description = ''
		},
	},

	computed: {
		...mapGetters({
			getCountOfActiveItems: 'Categories/getCountOfActiveItems',
		}),

		getActiveItems() {
			return this.$store.getters['Categories/getActiveItems'](this.options.page)
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
