<script>
  export let title
</script>

<div class="cell">
  {#if title}
    <h3 class="cellTitle">{title}</h3>
  {/if}
  <slot />
</div>

<style>
  .cell {
    background: var(--bg-light);
    flex-direction: column;
    border-radius: 0.5em;
    display: flex;
    padding: 1em;
    height: 100%;
    width: 100%;
    gap: 1em;
  }

  .cellTitle {
    background: var(--bg);
    display: inline-block;
    font-weight: lighter;
    border-radius: 10em;
    padding: 0.25em 1em;
    align-self: center;
    text-align: center;
    margin: 0;
  }
</style>
