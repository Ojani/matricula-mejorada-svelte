<button on:click>
  <slot />
</button>

<style>
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
