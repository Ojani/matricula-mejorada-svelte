<script>
  import { fly } from 'svelte/transition'
  export let column = false
</script>

<div class:column in:fly={{ y: 50 }}>
  <slot />
</div>

<style>
  div {
    justify-content: space-around;
    overflow: hidden;
    display: flex;
    height: 100%;
    padding: 1em;
    z-index: 1;
    gap: 1em;
  }

  .column {
    flex-direction: column;
  }
</style>
