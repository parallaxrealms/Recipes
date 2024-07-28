<script>
	export let recipeListName = '';
</script>

<div class="left">
	<button>New Recipe List</button>
	<button disabled={!recipeListName}>Edit Recipe List</button>
	<button disabled={!recipeListName}>Delete Recipe List</button>
	<button>Settings</button>
	<button>Log Out</button>
</div>

<style>
	.left {
		flex: 0 0 200px;
		max-width: 200px;
		margin: 10px 10px 10px 10px;
		padding: 10px;
		border: 1px solid #ddd;
		display: flex;
		flex-direction: column;
	}
	.left button {
		margin-bottom: 10px;
		padding: 15px;
		font-size: 16px;
	}
</style>
