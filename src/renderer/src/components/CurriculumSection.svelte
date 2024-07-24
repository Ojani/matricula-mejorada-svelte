<script>
  import Curriculum from './Curriculum.svelte'
  import Section from './Section.svelte'
  import Toolbar from './Toolbar.svelte'

  let semesters = JSON.parse(localStorage.getItem('curriculum')) || []
  let filters = []

  window.electronAPI.onRecieveCurriculum((curriculum) => {
    localStorage.setItem('curriculum', JSON.stringify(curriculum))
    localStorage.setItem('curriculum-last-updated', Date.now())
    semesters = curriculum
  })
</script>

<Section title="Currículo">
  <div>
    <Toolbar bind:filters />
    <Curriculum {filters} {semesters} />
  </div>
</Section>

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
