<script>
  import { onMount } from 'svelte'
  import Curriculum from './Curriculum.svelte'
  import Toolbar from './Toolbar.svelte'
  import { blur} from 'svelte/transition'

  let semesters = JSON.parse(localStorage.getItem('curriculum')) || []
  let filters = []

  let renderCurriculum = false

  onMount(() => setTimeout(() => (renderCurriculum = true)))

  window.electronAPI.onRecieveCurriculum((curriculum) => {
    localStorage.setItem('curriculum', JSON.stringify(curriculum))
    localStorage.setItem('curriculum-last-updated', Date.now())
    semesters = curriculum
  })
</script>

<div transition:blur>
  <Toolbar bind:filters />
  {#if renderCurriculum}
    <Curriculum {filters} {semesters} />
  {/if}
</div>

<style>
  div {
    justify-content: space-evenly;
    flex-direction: column;
    align-items: center;
    overflow: hidden;
    display: flex;
    height: 100%;
  }
</style>
