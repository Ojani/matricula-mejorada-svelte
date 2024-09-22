<script>
  import { watchedCourses } from '../lib/store'
  import FormItem from './FormItem.svelte'
  import Button from './Button.svelte'

  // automatixally capitalizing course code input
  $: courseCode = courseCode && courseCode.toUpperCase().slice(0, 10)

  function searchCourse() {
    $watchedCourses[courseCode] = null
    courseCode = ''
  }
</script>

<div class="wrapper">
  <p style="flex: 4">Añadir Curso</p>
  <span style="flex: 17">
    <span class="inputWrapper">
      <div class="input">
        <FormItem bind:value={courseCode} placeholder="QUIM3131" />
      </div>
    </span>
    <div class="buttonWrapper">
      <Button on:click={searchCourse}>Buscar</Button>
    </div>
  </span>
</div>

<style>
  .wrapper {
    justify-content: space-between;
    align-items: center;
    border-radius: 2em;
    overflow: hidden;
    height: 2.75rem;
    display: flex;
    gap: 0.125em;
    width: 90%;
  }

  p {
    background: var(--bg-dark);
    justify-content: center;
    align-items: center;
    display: flex;
    height: 100%;
  }
  span {
    justify-content: space-between;
    display: flex;
    gap: inherit;
    gap: 0.125em;
  }

  .inputWrapper {
    background: var(--bg-light);
    width: 100%;
  }
  .buttonWrapper {
    --bg-light: var(--bg-dark);
    align-self: center;
    width: 25%;
  }

  .buttonWrapper :global(> *) {
    height: 3em;
  }
</style>
