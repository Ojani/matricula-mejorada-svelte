<script>
  export let course
  const { courseCodeAndSection, courseName, courseCredits, courseGrade } = course
</script>

<div class="courseItem">
  <div class="courseCode">{courseCodeAndSection.join('-')}</div>
  <div class="courseName">{courseName}</div>
  <div class="courseCredits">{Number(courseCredits)}</div>
  <div class="courseGrade">{courseGrade}</div>
</div>

<style>
  .courseItem {
    background: var(--bg-dark);
    display: flex;
    width: 100%;
  }

  .courseItem > div {
    padding-bottom: 1em;
    padding-top: 1em;
  }

  .courseCode {
    background: var(--bg-light);
    padding-left: 2%;
    flex: 25% 0 0;
  }

  .courseName {
    padding-left: 2%;
    flex: 55% 0 0;
  }

  .courseCredits {
    background: var(--bg-light);
    text-align: center;
    flex: 10% 0 0;
  }

  .courseGrade {
    text-align: center;
    flex: 10% 0 0;
  }
</style>
