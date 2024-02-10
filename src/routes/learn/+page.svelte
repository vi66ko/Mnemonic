<script>
	/** @type {import('./$types').PageData} */
	export let data;

	const codeSystem = [
		['c', 'з'],
		['т', 'д'],
		['н'],
		['м'],
		['ч', 'ц'],
		['л'],
		['ш', 'ж', 'дж'],
		['к', 'г'],
		['ф', 'в'],
		['б', 'р', 'п']
	];
</script>

<section>
	<h2>Специален коде</h2>
	<table>
		<thead>
			<tr>
				<th>Цифри</th>
				<th>Букви</th>
			</tr>
		</thead>
		<tbody>
			{#each codeSystem as letters, index}
				<tr>
					<td>
						{index}
					</td>
					<td>
						{letters.join(', ')}
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</section>

<style>
	table {
		/* border-collapse: collapse; */
	}
	tbody {
		margin: 5rem;
	}
	thead {
		margin-top: 10rem;
	}
	td {
		padding: 0.5rem 0.5rem;
		border-bottom: 1px solid black;
	}

	td:first-child {
		text-align: center;
	}
</style>
