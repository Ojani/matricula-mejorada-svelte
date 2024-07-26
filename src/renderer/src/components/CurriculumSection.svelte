<script>
  import { onMount } from 'svelte'
  import Curriculum from './Curriculum.svelte'
  import Toolbar from './Toolbar.svelte'
  import Section from './Section.svelte'

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

<Section column={true}>
  <Toolbar bind:filters />
  {#if renderCurriculum}
    <Curriculum {filters} {semesters} />
  {/if}
</Section>
