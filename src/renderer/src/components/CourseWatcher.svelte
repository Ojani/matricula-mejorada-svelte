<script>
  import CourseWatchSearch from './CourseWatchSearch.svelte'
  import { watchedCourses } from '../lib/store'
  import Select from './Select.svelte'
  import Button from './Button.svelte'
  import ButtonSection from './ButtonSection.svelte'
  import WatchedSection from './WatchedSection.svelte'
  let semester
</script>

<div class="wrapper">
  <div class="buttons">
    <ButtonSection>
      <Select bind:value={semester}>
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
    {#if Object.values($watchedCourses).length < 10}
      <CourseWatchSearch />
    {/if}
    {#each Object.entries($watchedCourses) as [courseCode, sections] (courseCode)}
      <WatchedSection {sections} {semester} {courseCode}></WatchedSection>
    {/each}
  </div>
</div>

<style>
  .wrapper {
    flex-direction: column;
    border-radius: 0.5em;
    background: var(--bg);
    position: relative;
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
