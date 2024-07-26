<script>
  import { currentTheme } from '../lib/store'
  import { themes } from '../lib/themes'

  function changeTheme(themeIndex) {
    localStorage.setItem('theme', themeIndex)
    currentTheme.set(themeIndex)
  }
</script>

<div class="themes">
  {#each themes as theme, i}
    <button
      class="themeWrapper"
      class:selectedTheme={$currentTheme == i}
      on:click={() => changeTheme(i)}
    >
      <div class="themeName">{theme.name}</div>
      <div class="themeColors">
        {#each theme.styles as property}
          <div class="color" style={`background: ${property[1]}`}></div>
        {/each}
      </div>
    </button>
  {/each}
</div>

<style>
  .themes {
    flex-direction: column;
    justify-content: center;
    display: flex;
    height: 100%;
    gap: 1.5em;
  }

  .themeWrapper {
    all: unset;
    flex-direction: column;
    background: var(--bg);
    border-radius: 0.5em;
    transition: 0.3s;
    cursor: pointer;
    display: flex;
    padding: 1em;
    gap: 1em;
  }

  .selectedTheme {
    border: 1px solid var(--txt);
  }

  .themeWrapper:hover {
    transform: scale(1.035);
  }

  .themeName {
    background: var(--bg-light);
    padding: 0.25em 0.5em;
    border-radius: 0.25em;
    text-align: center;
    margin: 0;
  }

  .themeColors {
    display: flex;
    gap: 0.5em;
  }

  .color {
    border: 1px solid var(--txt);
    border-radius: 0.25em;
    transition: 0.3s;
    height: 2em;
    width: 100%;
  }
</style>
