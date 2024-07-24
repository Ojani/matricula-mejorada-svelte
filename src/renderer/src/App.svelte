<script>
  import CurriculumSection from './components/CurriculumSection.svelte'
  import HomeSection from './components/HomeSection.svelte'
  import MatriculaSection from './components/MatriculaSection.svelte'
  import { currentPage } from './lib/store'
</script>

{#if $currentPage == 'Home'}
  <HomeSection />
{:else if $currentPage == 'Currículo'}
  <CurriculumSection />
{:else}
  <MatriculaSection />
{/if}

<style>
</style>
