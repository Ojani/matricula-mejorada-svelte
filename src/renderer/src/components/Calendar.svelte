<script>
  export let from = 6
  export let to = 20
  $: hours = to - from + 1

  const formatHour = (hour) => `${(hour % 12) + 1}:00${hour > 10 ? 'pm' : 'am'}`
</script>

<div class="wrapper">
  <!--eslint-disable-next-line no-unused-vars-->
  {#each { length: 8 } as _, i}
    <div class="day">
      <div class="timeBlock"></div>
      <!--eslint-disable-next-line no-unused-vars-->
      {#each { length: hours } as _, j}
        <div class="timeBlock">
          {#if i == 0}
            <span class="hour">{formatHour(from - 1 + j)}</span>
          {/if}
        </div>
      {/each}
    </div>
  {/each}
</div>

<style>
  .wrapper {
    justify-content: space-between;
    background: var(--bg);
    border-radius: 0.5em;
    overflow: hidden;
    display: flex;
    height: 100%;
    width: 100%;
  }

  .day {
    border-left: 1px solid var(--txt-light);
    justify-content: space-between;
    flex-direction: column;
    display: flex;
    width: 100%;
  }

  .day:first-child {
    background: var(--bg-dark);
    border-left: none;
  }

  .timeBlock {
    border-bottom: 1px solid var(--txt-light);
    position: relative;
    height: 100%;
  }

  .timeBlock:last-child {
    border-bottom: none;
  }

  .hour {
    transform: translate(-50%, -50%);
    background: var(--bg-light);
    border-radius: 1em;
    padding: 0.1em 0.5em;
    margin-left: 0.25em;
    position: absolute;
    font-size: 0.9em;
    left: 50%;
    top: 0;
  }
</style>
