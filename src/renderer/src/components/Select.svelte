<script>
  export let value
</script>

<div>
  <span></span>
  <select bind:value>
    <slot />
  </select>
</div>

<style>
  div {
    position: relative;
  }

  div:hover {
    filter: brightness(0.8);
  }
  span {
    transform: translate(100%, -50%) rotate(45deg);
    border-right: 1px solid currentColor;
    border-top: 1px solid currentColor;
    position: absolute;
    height: 0.5em;
    width: 0.5em;
    top: 50%;
  }
  select {
    all: unset;
    padding: 0.35em 0.75em 0.35em 1.35em;
    border: 1px solid var(--txt);
    background: var(--bg-light);
    transition: filter 0.2s;
    display: inline-block;
    border-radius: 0.2em;
    text-align: center;
    color: var(--txt);
    cursor: pointer;
    font-size: 1em;
  }
</style>
