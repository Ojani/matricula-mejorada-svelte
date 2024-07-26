<script>
  import { scale } from 'svelte/transition'
  export let current
</script>

<button on:click>
  <p>
    <slot />
  </p>
  {#if current}
    <div class="arrow" transition:scale></div>
  {/if}
</button>

<style>
  button {
    all: unset;
    transition: background-color 0.2s;
    align-items: center;
    position: relative;
    cursor: pointer;
    padding: 0 2em;
    display: flex;
    height: 100%;
  }

  button:hover {
    background: var(--bg-light);
  }

  p {
    transition: transform 0.2s;
  }

  button:hover p {
    transform: translateY(-15%);
  }

  .arrow {
    transform: translate(-50%, 50%) rotate(45deg);
    border-left: 1px solid var(--txt-light);
    border-top: 1px solid var(--txt-light);
    background: var(--bg);
    pointer-events: none;
    position: absolute;
    height: 1em;
    width: 1em;
    left: 50%;
    bottom: 0;
  }
</style>
