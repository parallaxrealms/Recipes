<script>
	import { createEventDispatcher } from 'svelte';
	export let selectedRecipes = [];
	export let recipeListName = '';
	export let currentSelectedRecipe = null;

	const dispatch = createEventDispatcher();

	function selectRecipe(recipe) {
		dispatch('selectRecipe', recipe);
	}
</script>

<div class="right">
	<h2>Viewing: {recipeListName}</h2>
	{#each selectedRecipes as recipe}
		<button
			type="button"
			class="recipe-card {currentSelectedRecipe === recipe ? 'selected' : ''}"
			on:click={() => selectRecipe(recipe)}
		>
			<img src={recipe.image} alt={recipe.name} class="recipe-image" />
			<h3>{recipe.name}</h3>
			<ul>
				{#each recipe.ingredients as ingredient}
					<li>
						{ingredient.amount}
						{ingredient.measurement}
						{ingredient.name}
					</li>
				{/each}
			</ul>
		</button>
	{/each}
</div>

<style>
	.right {
		display: flex;
		flex-direction: column;
		flex: 0 0 60%;
		border: 1px solid #c4c4c4;
		margin: 10px 10px 10px 100px;
		padding: 10px;
		overflow-y: auto;
		width: 100%;
		height: 80vh;
	}
	.recipe-card {
		margin-bottom: 10px;
		padding: 10px;
		border: 1px solid #ddd;
		cursor: pointer;
		text-align: left;
		width: 100%;
		display: block;
		background: none;
		border-radius: 4px;
	}
	.recipe-card.selected {
		border: 2px solid #000;
		background-color: orange;
	}
	.recipe-image {
		max-width: 100px;
		max-height: 100px;
	}
</style>
