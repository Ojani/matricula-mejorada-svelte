<script>
  import { scale } from 'svelte/transition'

  export let section
  export let courseCode
  export let day
  export let from

  const leftMargin = (['D', 'L', 'M', 'W', 'J', 'V'].indexOf(day.toUpperCase()) + 1) * 12.5

  // Getting start time, end time, and duration of class
  function getTimes() {
    function formatHour(time) {
      const isPM = time.includes('pm')
      time = time.replace('pm', '')
      var [hour, minutes] = time.split(':')
      hour = Number(hour)
      minutes = Number(minutes)
      if ((isPM && hour != 12) || hour < 7) hour += 12
      return hour + minutes / 60
    }

    var [startTime, endTime] = section.hours.split('-')
    startTime = formatHour(startTime)
    endTime = formatHour(endTime)

    const duration = endTime - startTime
    return [startTime, endTime, duration]
  }

  let times = getTimes()

  let topMargin = (times[0] - from + 1) * 6.25
  let height = times[2] * 6.125
</script>

<div
  class="wrapper"
  transition:scale
  style={`left: ${leftMargin}%; top: ${topMargin}%; height: ${height}%;`}
>
  <p>{courseCode}</p>
  <!-- <p>{section.credits}</p> -->
  <!-- <p>{section.days}</p> -->
  <!-- <p>{section.hours}</p> -->
</div>

<style>
  .wrapper {
    border: 1px solid var(--txt-light);
    transition: background-color 0.2s;
    background: var(--bg-dark);
    border-radius: inherit;
    justify-content: center;
    align-items: center;
    position: absolute;
    overflow: hidden;
    cursor: pointer;
    font-size: 0.9em;
    padding: 0.2em;
    display: flex;
    width: 12.5%;
    opacity: 0.8;
  }

  .wrapper:hover {
    background: var(--bg-light);
  }

  p {
    margin: 0;
  }
</style>
