<template>
	<v-app id="inspire">
		<v-navigation-drawer v-model="drawer" app>
			<v-sheet color="grey lighten-4" class="pa-4">
				<div>Кириллов Даниил Павлович</div>
			</v-sheet>

			<v-divider></v-divider>

			<v-list>
				<v-list-item
					v-for="[icon, text, link] in links"
					:key="icon"
					link
					:to="link"
				>
					<v-list-item-icon>
						<v-icon>{{ icon }}</v-icon>
					</v-list-item-icon>

					<v-list-item-content>
						<v-list-item-title>{{ text }}</v-list-item-title>
					</v-list-item-content>
				</v-list-item>
			</v-list>
		</v-navigation-drawer>

		<v-app-bar app>
			<v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

			<v-toolbar-title>TODO</v-toolbar-title>
		</v-app-bar>

		<v-main>
			<router-view></router-view>
		</v-main>
	</v-app>
</template>

<script>
export default {
	name: 'App',

	data: () => ({
		drawer: null,
		links: [
			['mdi-format-list-bulleted-square', 'Задачи', '/'],
			['mdi-folder', 'Категории', '/categories'],
		],
	})
}
</script>
