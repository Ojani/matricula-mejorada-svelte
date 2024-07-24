<script>
  import { fade } from 'svelte/transition'
  export let title = '[UNTITLED DROPDOWN]'
  export let options
  let open = false
</script>

<button class:open on:mouseenter={() => (open = true)} on:mouseleave={() => (open = false)}>
  <summary class="button">{title} </summary>
  {#if open}
    <div class="box" transition:fade={{ duration: 100 }}></div>
    <div
      transition:fade={{ duration: 100 }}
      class="list"
      on:click={(e) => e.stopPropagation()}
      aria-hidden={!open}
    >
      {#each options as { text, value, isChecked }}
        <label for={value + text}
          >{text}
          <input bind:checked={isChecked} {value} type="checkbox" id={value + text} /></label
        >
      {/each}
    </div>
  {/if}
</button>

<style>
  button {
    all: unset;
    position: relative;
  }

  .button {
    border: 1px solid var(--txt);
    background: var(--bg-light);
    transition: filter 0.2s;
    display: inline-block;
    padding: 0.35em 0.75em;
    border-radius: 0.2em;
    text-align: center;
    position: relative;
    color: var(--txt);
    font-size: 1em;
    cursor: pointer;
  }

  .button:hover:not(:has(.list:hover)) {
    filter: brightness(0.8);
  }

  .open > summary {
    border-radius: 0.2em 0.2em 0 0;
  }

  .list {
    border-radius: 0 0 0.2em 0.2em;
    background: var(--bg-light);
    border: 1px solid white;
    flex-direction: column;
    position: absolute;
    overflow: hidden;
    border-top: none;
    display: flex;
    width: 100%;
    z-index: 10;
    top: 100%;
    left: 0;
  }

  .box {
    transform: translate(-50%, -50%) rotate(45deg);
    border-right: 1px solid currentColor;
    border-bottom: 1px solid currentColor;
    background: var(--bg-light);
    transition: filter 0.2s;
    position: absolute;
    height: 0.7em;
    width: 0.7em;
    content: '';
    z-index: 14;
    left: 50%;
    top: 100%;
  }

  .button:hover + .box {
    filter: brightness(0.8);
  }

  label {
    border-top: 1px solid white;
    justify-content: space-between;
    padding: 0.5em 0.5em;
    cursor: pointer;
    display: flex;
  }

  .list > label:first-child {
    border-top: none;
  }

  .list > label:hover {
    background: var(--bg);
  }
</style>
