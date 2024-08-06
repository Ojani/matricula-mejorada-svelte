<button on:click>
  <slot />
</button>

<style>
  button {
    all: unset;
    background: var(--bg-light);
    transition: filter 0.2s;
    box-sizing: border-box;
    display: inline-block;
    padding: 0.75em 1em;
    text-align: center;
    color: var(--txt);
    font-size: 1em;
    cursor: pointer;
    width: 100%;
  }

  button:hover {
    filter: brightness(0.8);
  }
</style>
