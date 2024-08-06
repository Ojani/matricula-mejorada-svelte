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
    padding: 0.75em 1em 0.75em 1.6em;
    background: var(--bg-light);
    transition: filter 0.2s;
    border-radius: inherit;
    box-sizing: border-box;
    display: inline-block;
    white-space: nowrap;
    text-align: center;
    color: var(--txt);
    cursor: pointer;
    font-size: 1em;
    width: 100%;
  }
</style>
