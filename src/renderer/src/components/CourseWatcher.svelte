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
  let courses = {}
  let session

  onMount(() => {
    courses = JSON.parse(localStorage.getItem('watchedCourses')) || {}
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

      <Button>Actualizar</Button>
      <Button>Despejar</Button>
    </ButtonSection>
  </div>
  <div class="courses">
    {#if Object.values(courses).length < 10}
      <CourseWatchSearch bind:courses />
    {/if}
    {#each Object.entries(courses) as [courseCode, sections] (courseCode)}
      <WatchedSection {sections} {courseCode}></WatchedSection>
    {/each}
    <WatchedSection sections={null} courseCode="FISI3171"></WatchedSection>
    <WatchedSection sections={null} courseCode="FISI3172"></WatchedSection>
    <WatchedSection sections={null} courseCode="MATE3031"></WatchedSection>
    <WatchedSection sections={null} courseCode="MATE3032"></WatchedSection>
    <WatchedSection sections={null} courseCode="CIIC4010"></WatchedSection>
    <WatchedSection sections={null} courseCode="CIIC4020"></WatchedSection>
    <WatchedSection sections={null} courseCode="CIIC4025"></WatchedSection>
    <WatchedSection sections={null} courseCode="CIIC4025"></WatchedSection>
  </div>
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
    gap: 1.6em;
  }
</style>
