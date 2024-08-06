<script>
  import { fade } from 'svelte/transition'
  export let title = '[UNTITLED DROPDOWN]'
  export let options
  let open = false
</script>

<div
  class="wrapper"
  class:open
  on:mouseenter={() => (open = true)}
  on:mouseleave={() => (open = false)}
  role="tooltip"
>
  <summary class="button">{title}</summary>
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
</div>

<style>
  .wrapper {
    position: relative;
  }

  .button {
    background: var(--bg-light);
    transition: filter 0.2s;
    box-sizing: border-box;
    border-radius: inherit;
    display: inline-block;
    padding: 0.75em 1em;
    text-align: center;
    position: relative;
    color: var(--txt);
    cursor: pointer;
    font-size: 1em;
    width: 100%;
  }

  .open > .button {
    filter: brightness(0.8);
  }

  .list {
    box-shadow: 0 0.2em 0.2em rgba(0, 0, 0, 0.5);
    background: var(--bg-light);
    flex-direction: column;
    border-radius: 0.5em;
    position: absolute;
    overflow: hidden;
    display: flex;
    width: 100%;
    z-index: 10;
    left: 0;
  }

  .box {
    background: linear-gradient(135deg, var(--bg-light) 40%, var(--bg));
    transform: translate(-50%, -50%) rotate(45deg);
    transition: filter 0.2s;
    position: absolute;
    height: 0.7em;
    width: 0.7em;
    content: '';
    z-index: 14;
    left: 50%;
    top: 100%;
  }

  .open > .button + .box {
    filter: brightness(0.8);
  }

  label {
    justify-content: space-between;
    padding: 0.5em 0.5em;
    cursor: pointer;
    display: flex;
  }

  .list > label:hover {
    background: var(--bg);
  }
</style>
