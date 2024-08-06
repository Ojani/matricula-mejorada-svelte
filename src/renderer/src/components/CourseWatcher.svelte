<script>
  import CourseWatchSearch from './CourseWatchSearch.svelte'
  import Select from './Select.svelte'
  import Button from './Button.svelte'
  import { onMount } from 'svelte'
  import ButtonSection from './ButtonSection.svelte'
  import WatchedSection from './WatchedSection.svelte'
  let showCourseSelector = true
  let lastUpdated = null
  // object of courses, each course has an array full of section objects
  let coursesSections = {}
  let session

  function handleAddCourse() {
    showCourseSelector = true
    // Focusing on the input after showing it
    setTimeout(() => {
      document.querySelector('.wrapper input').focus()
    })
  }

  onMount(() => {
    coursesSections = localStorage.getItem('watchedCourses') || {}
    lastUpdated = localStorage.getItem('watchedCourses-last-updated') || null
  })
</script>

<div class="wrapper">
  <div class="buttons">
    <ButtonSection>
      <Select bind:value={session}>
        <option value="2">Primer Semestre</option>
        <option value="3">Segundo Semestre</option>
        <option value="1">Primer Verano</option>
        <option value="4">Segundo Verano</option>
      </Select>

      <Button on:click={handleAddCourse}>Añadir Curso</Button>
      <Button>Actualizar</Button>
      <Button>Despejar</Button>
    </ButtonSection>
  </div>
  <div class="courses">
    <WatchedSection></WatchedSection>
    <WatchedSection></WatchedSection>
    <WatchedSection sections={null}></WatchedSection>
    <WatchedSection sections={null}></WatchedSection>
    <WatchedSection sections={null}></WatchedSection>
    <WatchedSection sections={null}></WatchedSection>
    <WatchedSection sections={null}></WatchedSection>
    <WatchedSection sections={null}></WatchedSection>
    <WatchedSection sections={null}></WatchedSection>
    <WatchedSection></WatchedSection>
    <WatchedSection sections={null}></WatchedSection>
  </div>
  <!-- {#if showCourseSelector}
    <CourseWatchSearch />
  {/if} -->
</div>

<style>
  .wrapper {
    flex-direction: column;
    border-radius: 0.5em;
    background: var(--bg);
    position: relative;
    overflow: hidden;
    display: flex;
    height: 100%;
    gap: 0.75em;
  }

  .buttons {
    margin: 1em;
  }

  .courses {
    flex-direction: column;
    align-items: center;
    display: flex;
    gap: 1.2em;
  }
</style>
