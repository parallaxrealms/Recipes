<script>
	import { createEventDispatcher } from 'svelte';
	export let type = ''; // 'confirmation' or 'edit-recipe'
	export let message = ''; // For confirmation messages
	export let recipe = null; // For edit-recipe form
	const dispatch = createEventDispatcher();

	function closePopup() {
		dispatch('close');
	}

	function confirmAction() {
		dispatch('confirm');
	}

	function saveRecipe() {
		dispatch('save', { recipe });
	}

	function handleKeydown(event) {
		if (event.key === 'Escape') {
			closePopup();
		}
	}
</script>

<div
	class="overlay"
	role="dialog"
	aria-modal="true"
	on:keydown={handleKeydown}
	tabindex="0"
>
	<div class="popup" on:click|stopPropagation>
		{#if type === 'confirmation'}
			<p>{message}</p>
			<button on:click={confirmAction}>Yes</button>
			<button on:click={closePopup}>No</button>
		{:else if type === 'edit-recipe'}
			<h2>Edit Recipe</h2>
			<div>
				<label for="recipe-name">Name:</label>
				<input id="recipe-name" type="text" bind:value={recipe.name} />
			</div>
			<div>
				<label for="recipe-image">Image URL:</label>
				<input id="recipe-image" type="text" bind:value={recipe.image} />
			</div>
			<div>
				<label>Ingredients:</label>
				{#each recipe.ingredients as ingredient, i}
					<div>
						<label for="ingredient-name-{i}">Ingredient Name:</label>
						<input
							id="ingredient-name-{i}"
							type="text"
							bind:value={ingredient.name}
							placeholder="Ingredient Name"
						/>
						<label for="ingredient-measurement-{i}">Measurement:</label>
						<input
							id="ingredient-measurement-{i}"
							type="text"
							bind:value={ingredient.measurement}
							placeholder="Measurement"
						/>
						<label for="ingredient-amount-{i}">Amount:</label>
						<input
							id="ingredient-amount-{i}"
							type="number"
							bind:value={ingredient.amount}
							placeholder="Amount"
						/>
					</div>
				{/each}
				<button
					on:click={() =>
						recipe.ingredients.push({ name: '', measurement: '', amount: 0 })}
				>
					Add Ingredient
				</button>
			</div>
			<button on:click={saveRecipe}>Save</button>
			<button on:click={closePopup}>Cancel</button>
		{/if}
	</div>
</div>

<style>
	.overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.6);
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.popup {
		background: white;
		padding: 20px;
		border-radius: 8px;
		width: 400px;
		max-width: 90%;
	}
	.popup p {
		margin-bottom: 20px;
	}
	.popup button {
		margin: 5px;
	}
	.popup div {
		margin-bottom: 10px;
	}
</style>
