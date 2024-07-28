<script>
	import LeftPanel from './LeftPanel.svelte';
	import CenterPanel from './CenterPanel.svelte';
	import RightPanel from './RightPanel.svelte';
	import PopupForm from './PopupForm.svelte';
	import { selectedRecipeList, recipes } from '../store.js';
	import { get } from 'svelte/store';

	let selectedRecipes = [];
	let recipeListName = '';
	let currentSelectedRecipe = null;
	let showPopup = false;
	let popupType = '';
	let popupMessage = '';
	let popupRecipe = null;

	$: if ($selectedRecipeList) {
		recipeListName = $selectedRecipeList;
		selectedRecipes = get(recipes)[recipeListName] || [];
		currentSelectedRecipe = null; // Reset the current selected recipe when the list changes
	}

	function selectRecipe(event) {
		currentSelectedRecipe = event.detail;
	}

	function addRecipe() {
		popupType = 'edit-recipe';
		popupRecipe = { name: '', image: '', ingredients: [] };
		showPopup = true;
	}

	function editRecipe() {
		if (!currentSelectedRecipe) return;
		popupType = 'edit-recipe';
		popupRecipe = { ...currentSelectedRecipe };
		showPopup = true;
	}

	function deleteRecipe() {
		if (!currentSelectedRecipe) return;
		popupType = 'confirmation';
		popupMessage = 'delete this recipe?';
		showPopup = true;
	}

	function confirmDeleteRecipe() {
		const updatedRecipes = selectedRecipes.filter(
			(recipe) => recipe !== currentSelectedRecipe,
		);
		recipes.update((r) => {
			r[recipeListName] = updatedRecipes;
			return r;
		});
		currentSelectedRecipe = null; // Deselect the recipe after deleting
		showPopup = false;
	}

	function saveRecipe(event) {
		const newRecipe = event.detail.recipe;
		const updatedRecipes = currentSelectedRecipe
			? selectedRecipes.map((recipe) =>
					recipe === currentSelectedRecipe ? newRecipe : recipe,
				)
			: [...selectedRecipes, newRecipe];
		recipes.update((r) => {
			r[recipeListName] = updatedRecipes;
			return r;
		});
		showPopup = false;
	}

	function closePopup() {
		showPopup = false;
	}
</script>

<div class="dashboard">
	<LeftPanel {recipeListName} />
	<CenterPanel />
	<RightPanel
		{selectedRecipes}
		{recipeListName}
		{currentSelectedRecipe}
		on:selectRecipe={selectRecipe}
	/>
	<div class="buttons">
		<button on:click={addRecipe} disabled={!recipeListName}>Add Recipe</button>
		<button on:click={editRecipe} disabled={!currentSelectedRecipe}
			>Edit Recipe</button
		>
		<button on:click={deleteRecipe} disabled={!currentSelectedRecipe}
			>Delete Recipe</button
		>
	</div>
	{#if showPopup}
		<PopupForm
			type={popupType}
			message={popupMessage}
			recipe={popupRecipe}
			on:close={closePopup}
			on:confirm={confirmDeleteRecipe}
			on:save={saveRecipe}
		/>
	{/if}
</div>

<style>
	.dashboard {
		display: inline-flex;
	}
	.buttons {
		display: block;
		height: 60px;
		width: 100%;
		margin-right: 0;
		gap: 10px;
	}
	.buttons button {
		height: 60px;
		width: 125px;
		margin: 10px;
		padding: 10px;
		font-size: 14px;
	}
</style>
