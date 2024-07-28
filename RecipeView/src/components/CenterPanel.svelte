<script>
	import { selectedRecipeList } from '../store.js';

	const recipeLists = ['Recipe List 1', 'Recipe List 2']; // Example recipe list names

	let currentSelectedList = '';

	// Subscribe to the selectedRecipeList store to update the currentSelectedList variable
	selectedRecipeList.subscribe((value) => {
		currentSelectedList = value;
	});

	function selectRecipeList(listName) {
		selectedRecipeList.set(listName);
	}
</script>

<div class="center">
	<h2>Recipe List</h2>
	{#each recipeLists as listName}
		<button
			type="button"
			class="recipe-list-name {currentSelectedList === listName
				? 'selected'
				: ''}"
			on:click={() => selectRecipeList(listName)}
		>
			{listName}
		</button>
	{/each}
</div>

<style>
	.center {
		display: flex;
		flex: 1 0 200px;
		flex-direction: column;
		max-width: 200px;
		margin: 10px 10px 10px 100px;
		padding: 10px;
		border: 1px solid #c4c4c4;
	}
	.center h2 {
		margin-bottom: 10px;
	}
	.recipe-list-name {
		padding: 10px;
		margin-bottom: 5px;
		border: 1px solid #ddd;
		cursor: pointer;
		text-align: left;
		width: 100%;
		background: none;
		border-radius: 4px;
	}
	.recipe-list-name.selected {
		background-color: orange;
	}
</style>
