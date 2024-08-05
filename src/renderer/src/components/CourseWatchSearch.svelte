<script>
  import FormItem from './FormItem.svelte'
  import Button from './Button.svelte'
  let courseCode = ''
</script>

<div>
  <h2>Buscar Curso</h2>
  <FormItem bind:value={courseCode} label="Código de Curso" placeholder="QUIM3131" />
  <span>
    <Button>Buscar</Button>
  </span>
</div>

<style>
  div {
    box-shadow: 0 0.2em 0.5em rgba(0, 0, 0, 0.5);
    transform: translateX(-50%);
    background: var(--bg-light);
    border-radius: inherit;
    position: absolute;
    padding: 1.25em 2em;
    width: 80%;
    left: 50%;
    top: 5em;
  }

  h2 {
    align-self: flex-start;
    margin-top: 0;
  }

  span {
    justify-content: center;
    margin-top: 0.5em;
    display: flex;
    width: 100%;
  }
</style>
