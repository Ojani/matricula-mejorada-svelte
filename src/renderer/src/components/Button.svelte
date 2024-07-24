<button on:click>
  <slot />
</button>

<style>
  button {
    border: 1px solid var(--txt);
    background: var(--bg-light);
    transition: filter 0.2s;
    display: inline-block;
    padding: 0.35em 0.75em;
    border-radius: 0.2em;
    text-align: center;
    color: var(--txt);
    font-size: 1em;
    cursor: pointer;
  }

  button:hover {
    filter: brightness(0.8);
  }
</style>
