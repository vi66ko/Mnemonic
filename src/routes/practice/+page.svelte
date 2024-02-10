<script>
	/** @type {import('./$types').PageData} */
	export let data;

	let index = 0;
	let numberRangeStart = 0;
	let numberRangeEnd = 9;
	let numberOfDigits = 0;
	let generatedSequence = [];
	let correctAnswers = [];
	let answer = null;
	let isSettingStartDigit = false;
	let message = '';
	$: displayCorrectAnswers = correctAnswers.join('');
	const State = {
		IS: 'generating',
		IDLE: 'idle',
		ANSWERING: 'answering',
		GENERATING: 'generating',
		REMEMBERING: 'remembering'
	};

	function setMessage(text, seconds) {
		message = text;
		const timer = setTimeout(() => {
			message = '';
			clearInterval(timer);
		}, seconds * 1000);
	}

	function generate() {
		generatedSequence = [];

		if (numberOfDigits <= 0) {
			setMessage('The number of digits must not be 0', 4);
			return;
		}

		for (let i = 0; i < numberOfDigits; i++) {
			generatedSequence.push(Math.round(Math.random() * numberRangeEnd) - numberRangeStart);
		}
		console.log(generatedSequence);

		State.IS = State.REMEMBERING;
		// numberRange = 0;
		// numberOfDigits = 0;
	}
	// generate();
	function giveMeNextNumber() {
		index++;
		if (index >= generatedSequence.length) {
			State.IS = State.ANSWERING;
			index = 0;
		}
	}
	function validateAnswer(event) {
		if (answer === generatedSequence[index]) {
			index++;
			correctAnswers = [...correctAnswers, answer];

			console.log('Bravo');
			if (!generatedSequence[index]) {
				State.IS = State.GENERATING;
			}
		} else {
			setMessage('Nope try again', 2);
		}

		answer = null;
	}
</script>

<div>
	<div class="h-10 py-1 border-b tracking-wider text-center text-white">{message}</div>
	{#if State.IS === State.GENERATING}
		<section id="config-menu">
			<div class="config-inputs">
				<div>
					<label for="num-range">Number Range: </label>
					<div id="num-range">
						<input type="number" bind:value={numberRangeStart} placeholder="0" />
						<input type="number" bind:value={numberRangeEnd} placeholder="9" />
					</div>
				</div>
				<div class="range">
					<label for="">Digit Length: </label>
					<input type="number" bind:value={numberOfDigits} />
				</div>
			</div>
			<div class="controls">
				<button on:click={generate}>Generate</button>
			</div>
		</section>
	{/if}

	{#if State.IS === State.REMEMBERING}
		<section id="remembering">
			<div id="view">
				<span>{generatedSequence[index]}</span>
			</div>
			<div class="controls">
				<button on:click={giveMeNextNumber}>Next</button>
			</div>
		</section>
	{/if}

	{#if State.IS === State.ANSWERING}
		<section id="answering">
			<div id="view">
				<!-- {#key answer} -->
				<span>{displayCorrectAnswers.length <= 0 ? '?' : displayCorrectAnswers} </span>
				<!-- {/key} -->
			</div>
			<div class="controls">
				<input
					type="number"
					bind:value={answer}
					on:input={validateAnswer}
					placeholder="Type the numbers in a sequence"
				/>
			</div>
		</section>
	{/if}
</div>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		width: 20rem;
		height: 20rem;
		color: rgba(255, 255, 255, 0.868);
		/* border: 1px solid greenyellow; */
	}

	.config-inputs > div {
		display: flex;
		justify-content: space-between;
		margin-top: 1.5rem;
	}
	#config-menu input {
		width: 3rem;
		padding: 0.5rem 0.75rem;
		font-size: 1.25rem;
		font-weight: 500;
		color: rgba(0, 0, 0, 0.812);
		text-align: center;
	}
	.controls {
		background: rgb(64, 99, 12);
	}

	button {
		width: 100%;
		padding: 0.75rem 0.5rem;
	}

	#view {
		width: 100%;
		text-align: center;
	}

	#view > span {
		/* display: inline-block; */
		vertical-align: middle;
		font-size: 4rem;
		line-height: 17rem;
	}
	#answering input {
		width: 100%;
		text-align: center;
		padding: 0.75rem 0.5rem;
	}
	/*  Chrome, Safari, Edge, Opera  */
	input::-webkit-outer-spin-button,
	input::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}
	/* Firefox */
	input[type='number'] {
		-moz-appearance: textfield;
	}
</style>
