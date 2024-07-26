<script>
  import { fade } from 'svelte/transition'
  import Semester from './Semester.svelte'
  export let semesters = []
  export let filters = []
  export let singleFile = false
  export let noPadding = false

  $: filteredSemesters = semesters.map((courses) => {
    for (let filter of filters) {
      courses = courses.filter(filter)
    }
    return courses
  })
</script>

<div class="curriculumWrapper">
  {#key filteredSemesters}
    <div
      class="semestersWrapper"
      class:noPadding
      in:fade={{ delay: 200, duration: 300 }}
      out:fade={{ duration: 200 }}
    >
      {#if !semesters}
        <p>Importa el currículo para verlo aquí</p>
      {:else}
        {#each filteredSemesters as courses, i}
          {#if courses.length > 0}
            <Semester {singleFile} {courses} year={Math.floor(i / 2) + 1} semester={(i % 2) + 1} />
          {/if}
        {/each}
      {/if}
    </div>
  {/key}
</div>

<style>
  .curriculumWrapper {
    background: var(--bg-light);
    border-radius: 0.5em;
    overflow-y: scroll;
    overflow-x: hidden;
    height: 100%;
    width: 100%;
  }

  p {
    margin: auto;
  }

  .semestersWrapper {
    justify-content: space-around;
    padding: 2em 0.75%;
    min-height: 100%;
    min-width: 555px;
    flex-wrap: wrap;
    display: flex;
    gap: 3em 0;
  }

  .noPadding {
    padding: 0;
  }
</style>
