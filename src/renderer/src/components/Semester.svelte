<script>
  import Course from './Course.svelte'
  export let courses
  export let year
  export let semester
  export let singleFile = false

  $: totalCredits = courses.reduce((total, course) => total + Number(course.courseCredits), 0)
</script>

<div class:singleFile class="semesterItem">
  <div class="semesterTitle">Año {year} Semestre {semester}</div>
  <div class="semesterCourses">
    {#each courses as course, i (course.courseCode + i)}
      <Course {course} />
    {/each}
  </div>
  <div>
    <p>Creditos en Total: {totalCredits}</p>
  </div>
</div>

<style>
  .semesterItem {
    flex-direction: column;
    display: flex;
    flex: 49% 0 0;
    width: 100%;
    gap: 1em 0.75%;
  }

  .semesterTitle {
    font-size: 1.2em;
  }

  .semesterCourses {
    border-radius: 0.5em;
    overflow: hidden;
  }

  .singleFile {
    flex: 95% 0 0;
  }

  @media only screen and (max-width: 1100px) {
    .semesterItem {
      flex: 95% 0 0;
    }
  }
</style>
