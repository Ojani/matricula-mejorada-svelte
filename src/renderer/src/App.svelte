<script>
  import { fly } from 'svelte/transition'
  import CurriculumSection from './components/CurriculumSection.svelte'
  import HomeSection from './components/HomeSection.svelte'
  import MatriculaSection from './components/MatriculaSection.svelte'
  import NavLink from './components/NavLink.svelte'
  import { currentPage, currentTheme } from './lib/store'
  import SettingsSection from './components/SettingsSection.svelte'
  import { getParsedTheme } from './lib/themes'

  currentTheme.subscribe((themeIndex) => {
    document.querySelector(':root').style = getParsedTheme(themeIndex)
  })
</script>

<section>
  <nav>
    <NavLink on:click={() => currentPage.set('Home')} current={$currentPage == 'Home'}>Home</NavLink
    >
    <NavLink on:click={() => currentPage.set('Currículo')} current={$currentPage == 'Currículo'}
      >Currículo</NavLink
    >
    <NavLink on:click={() => currentPage.set('Matrícula')} current={$currentPage == 'Matrícula'}
      >Matrícula</NavLink
    >
    <NavLink on:click={() => currentPage.set('Ajustes')} current={$currentPage == 'Ajustes'}
      >Ajustes</NavLink
    >
    {#key $currentPage}
      <h1 in:fly={{ y: '25px' }} out:fly={{ y: '-25px' }}>{$currentPage}</h1>
    {/key}
  </nav>
  {#if $currentPage == 'Home'}
    <HomeSection />
  {:else if $currentPage == 'Currículo'}
    <CurriculumSection />
  {:else if $currentPage == 'Ajustes'}
    <SettingsSection />
  {:else}
    <MatriculaSection />
  {/if}
</section>

<style>
  section {
    justify-content: space-between;
    flex-direction: column;
    display: flex;
    height: 100vh;
  }

  nav {
    border-bottom: 1px solid var(--txt-light);
    justify-content: left;
    align-items: center;
    position: relative;
    flex: 4.5em 0 0;
    padding: 0 3em;
    display: flex;
  }

  h1 {
    transform: translateX(-50%);
    position: absolute;
    font-size: 2rem;
    padding: 0.5em 0;
    left: 50%;
    margin: 0;
  }
</style>
