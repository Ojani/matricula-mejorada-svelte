<script>
  import Calendar from './Calendar.svelte'
  import Cell from './Cell.svelte'
  import CourseWatcher from './CourseWatcher.svelte'
  import Section from './Section.svelte'
</script>

<Section>
  <div class="sectionDivider">
    <Cell title="Manejador de Matrícula"></Cell>
    <Cell title="Horarios">
      <Calendar />
    </Cell>
  </div>
  <div class="sectionDivider">
    <Cell title="Vigilancia de Secciones">
      <CourseWatcher />
    </Cell>
  </div>
</Section>

<style>
  .sectionDivider {
    flex-direction: column;
    display: flex;
    height: 100%;
    width: 100%;
    gap: 1em;
  }
</style>
