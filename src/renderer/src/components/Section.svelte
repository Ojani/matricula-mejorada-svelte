<script>
  import NavLink from './NavLink.svelte'
  import { currentPage } from '../lib/store'
  import { fade } from 'svelte/transition'

  export let title = '[SECTION TITLE]'
</script>

<section in:fade={{ duration: 150, delay: 150 }} out:fade={{ duration: 150 }}>
  <nav>
    <NavLink on:click={() => currentPage.set('Home')} current={title == 'Home'}>Home</NavLink>
    <NavLink on:click={() => currentPage.set('Currículo')} current={title == 'Currículo'}
      >Currículo</NavLink
    >
    <NavLink on:click={() => currentPage.set('Matrícula')} current={title == 'Matrícula'}
      >Matrícula</NavLink
    >
    <h1>{title}</h1>
  </nav>
  <slot />
</section>

<style>
  section {
    justify-content: space-between;
    flex-direction: column;
    display: flex;
    height: 100vh;
  }

  nav {
    border-bottom: 1px solid rgba(255, 255, 255, 0.5);
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
