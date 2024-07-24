<script>
  import Button from './Button.svelte'
  import Checklist from './Checklist.svelte'
  import Select from './Select.svelte'

  export let filters

  let completion = 'all'

  let gradeChecklistFilterOptions = [
    { text: 'A', value: 'A', isChecked: true },
    { text: 'B', value: 'B', isChecked: true },
    { text: 'C', value: 'C', isChecked: true },
    { text: 'D', value: 'D', isChecked: true },
    { text: 'F', value: 'F', isChecked: true },
    { text: 'P', value: 'P', isChecked: true },
    { text: 'No evaluada', value: '', isChecked: true }
  ]

  // Filtering semesters
  $: {
    const selectedGrades = gradeChecklistFilterOptions
      .filter((option) => option.isChecked)
      .map((option) => option.value)

    const selectedGradesFilter = (course) =>
      selectedGrades.includes(course.courseGrade.toUpperCase())

    let completionStatusFilter = () => true

    if (completion == 'completed') {
      completionStatusFilter = (course) => course.courseGrade != ''
    } else if (completion == 'incomplete') {
      completionStatusFilter = (course) => course.courseGrade == ''
    }

    filters = [completionStatusFilter, selectedGradesFilter]
  }

  function resetFilters() {
    completion = 'all'
    gradeChecklistFilterOptions = gradeChecklistFilterOptions.map((option) => ({
      ...option,
      isChecked: true
    }))
  }
</script>

<div class="toolbar">
  <Button on:click={window.electronAPI.importCurriculum}>Importar Currículo</Button>
  <div class="filters">
    <Checklist title="Filtrar por nota" bind:options={gradeChecklistFilterOptions} />
    <Select bind:value={completion}>
      <option value="all">Completados e Incompletados</option>
      <option value="completed">Mostrar Completados</option>
      <option value="incomplete">Mostrar Incompletados</option>
    </Select>
    <Button on:click={resetFilters}>Remover filtros</Button>
  </div>
</div>

<style>
  .toolbar {
    justify-content: space-between;
    align-items: baseline;
    min-width: 556px;
    display: flex;
    width: 95%;
    gap: 1em;
  }

  .filters {
    align-items: baseline;
    display: flex;
    gap: inherit;
  }
</style>
