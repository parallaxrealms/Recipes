<script>
	export let recipe;

	let fullscreen = false;
	let quantityIndex = 4; // Start with the index for the default quantity of 1
	const quantities = [0, 0.25, 0.5, 0.75, 1, 2, 3, 4, 6, 7, 8, 9, 10];

	const toggleFullscreen = () => (fullscreen = !fullscreen);
	const toggleStrike = (event) => {
		const tds = event.currentTarget.querySelectorAll('td');
		tds.forEach((td) => {
			if (td.style.textDecoration === 'line-through') {
				td.style.textDecoration = '';
			} else {
				td.style.textDecoration = 'line-through';
			}
		});
	};

	const increaseQuantity = () => {
		if (quantityIndex < quantities.length - 1) {
			quantityIndex += 1;
		}
	};

	const decreaseQuantity = () => {
		if (quantityIndex > 0) {
			quantityIndex -= 1;
		}
	};

	$: quantity = quantities[quantityIndex];

	$: multipliedIngredients = recipe.ingredients.map((ingredient) => {
		return { ...ingredient, amount: ingredient.amount * quantity };
	});
</script>

<div class={fullscreen ? 'fullscreen' : 'card'}>
	<img src={recipe.image} alt={recipe.name} class="recipe-image" />
	<div>
		<h2>{recipe.name}</h2>
		<table>
			<thead>
				<tr>
					<th>Amount</th>
					<th>Measurement</th>
					<th>Ingredient</th>
				</tr>
			</thead>
			<tbody>
				{#each multipliedIngredients as ingredient}
					<tr on:click={toggleStrike}>
						<td>{ingredient.amount}</td>
						<td>{ingredient.measurement}</td>
						<td>{ingredient.name}</td>
					</tr>
				{/each}
			</tbody>
		</table>
		<div class="quantity">
			<span>How Many?</span>
			<button on:click={decreaseQuantity} disabled={quantityIndex === 0}
				>-</button
			>
			<span>{quantity}</span>
			<button
				on:click={increaseQuantity}
				disabled={quantityIndex === quantities.length - 1}>+</button
			>
		</div>
		<button on:click={toggleFullscreen}>{fullscreen ? 'Exit' : 'Start'}</button>
	</div>
</div>

<style>
	.card {
		display: flex;
		border: 1px solid #ddd;
		padding: 1rem;
		margin: 1rem 0;
	}
	.fullscreen {
		display: flex;
		flex-direction: column;
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: white;
		z-index: 1000;
		padding: 2rem;
		overflow: auto;
	}
	.recipe-image {
		max-width: 300px;
		max-height: 300px;
		width: auto;
		height: auto;
		margin-right: 1rem;
	}
	table {
		width: 100%;
		border-collapse: collapse;
	}
	th,
	td {
		border: 1px solid #ddd;
		padding: 0.5rem;
		text-align: left;
	}
	th {
		background-color: #f2f2f2;
	}
	tr:hover {
		background-color: #f5f5f5;
		cursor: pointer;
	}
	.quantity {
		display: flex;
		align-items: center;
		margin-top: 1rem;
	}
	.quantity span {
		margin: 0 1rem;
	}
	.quantity button {
		padding: 0.5rem 1rem;
		font-size: 1rem;
	}
</style>
