<script>
  import Eye from '../assets/Eye.svg.svelte'
  import EyeClosed from '../assets/EyeClosed.svg.svelte'

  export let label = null
  export let value
  export let placeholder = ''
  export let sensitive = false
  let showing = !sensitive
</script>

<div>
  {#if label}
    <label for={label}
      ><span>{label}</span>
      {#if sensitive}
        <button on:click={() => (showing = !showing)}>
          {#if showing}
            <Eye />
          {:else}
            <EyeClosed />
          {/if}
        </button>
      {/if}
    </label>
  {/if}
  {#if showing}
    <input bind:value type="text" id={label} {placeholder} />
  {:else}
    <input bind:value type="password" id={label} {placeholder} />
  {/if}
</div>

<style>
  div {
    flex-direction: column;
    border-radius: inherit;
    display: flex;
    padding: 1em;
    gap: 1em;
  }

  label {
    justify-content: space-between;
    font-size: 1.2em;
    display: flex;
  }

  input {
    all: unset;
    border-bottom: 1px solid currentColor;
    font-size: 1.2em;
  }

  button {
    all: unset;
    cursor: pointer;
  }

  button:focus {
    outline: 1px solid currentColor;
    background: var(--bg-light);
    border-radius: 0.5em;
  }
</style>
