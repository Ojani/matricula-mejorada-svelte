<script>
  import Calendar from './Calendar.svelte'
  import Curriculum from './Curriculum.svelte'
  import Cell from './Cell.svelte'
  import Section from './Section.svelte'
  let semesters = JSON.parse(localStorage.getItem('curriculum')) || []
</script>

<Section>
  <Cell title="Currículo">
    <Curriculum {semesters} singleFile={true} noPadding={true} />
  </Cell>
  <Cell title="Horarios">
    <Calendar />
  </Cell>
</Section>
