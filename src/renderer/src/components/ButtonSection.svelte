<div>
  <slot />
</div>

<style>
  div {
    display: flex;
    gap: 0.125em;
  }

  div :global(> *) {
    border-left: var(--txt-light);
    flex: 1;
  }

  div :global(> *:first-child) {
    border-bottom-left-radius: 2em;
    border-top-left-radius: 2em;
  }

  div :global(> *:last-child) {
    border-bottom-right-radius: 2em;
    border-top-right-radius: 2em;
  }
</style>
