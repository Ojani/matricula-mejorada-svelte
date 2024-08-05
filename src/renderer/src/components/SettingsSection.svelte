<script>
  import Button from './Button.svelte'
  import Cell from './Cell.svelte'
  import Section from './Section.svelte'
  import FormItem from './FormItem.svelte'
  import ThemeSelector from './ThemeSelector.svelte'
  import { onMount } from 'svelte'

  let accessPin
  let dateOfBirth
  let lastFourSSN
  let studentNumber

  let accessPinOriginal
  let dateOfBirthOriginal
  let lastFourSSNOriginal
  let studentNumberOriginal

  function updateOriginals() {
    const obj = JSON.parse(localStorage.getItem('credentials')) || {}
    accessPinOriginal = accessPin = obj.accessPin
    dateOfBirthOriginal = dateOfBirth = obj.dateOfBirth
    lastFourSSNOriginal = lastFourSSN = obj.lastFourSSN
    studentNumberOriginal = studentNumber = obj.studentNumber
  }

  function save() {
    const obj = { accessPin, dateOfBirth, lastFourSSN, studentNumber }
    localStorage.setItem('credentials', JSON.stringify(obj))
    updateOriginals()
  }

  onMount(updateOriginals)

  $: hideSaveButton =
    accessPinOriginal == accessPin &&
    dateOfBirthOriginal == dateOfBirth &&
    lastFourSSNOriginal == lastFourSSN &&
    studentNumberOriginal == studentNumber
</script>

<Section>
  <Cell title="Credenciales">
    <div class="form">
      <FormItem bind:value={studentNumber} label="Número de Estudiante" sensitive />
      <FormItem bind:value={lastFourSSN} label="Últimos 4 Dígitos de Seguro Social" sensitive />
      <FormItem bind:value={accessPin} label="Código de Acceso Permanente" sensitive />
      <FormItem bind:value={dateOfBirth} label="Fecha de Nacimiento" sensitive />
      <div class:hideSaveButton class="saveButtonWrapper">
        <Button on:click={save}>Guardar</Button>
      </div>
    </div>
  </Cell>
  <Cell title="Información del Usuario"></Cell>
  <Cell title="Apariencia del App">
    <ThemeSelector />
  </Cell>
</Section>

<style>
  .form {
    flex-direction: column;
    border-radius: inherit;
    background: var(--bg);
    margin: auto 0;
    display: flex;
    padding: 2em;
    gap: 2em;
  }

  .saveButtonWrapper {
    transition: opacity 0.2s;
    justify-content: center;
    flex-direction: column;
    position: relative;
    padding: 0 4em;
    display: flex;
  }

  .hideSaveButton {
    pointer-events: none;
    opacity: 0;
  }
</style>
