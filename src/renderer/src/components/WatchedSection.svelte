<script>
  import { fade, fly } from 'svelte/transition'
  import ButtonSection from './ButtonSection.svelte'
  import Pin from '../assets/Pin.svg.svelte'
  import { onMount } from 'svelte'
  export let isSkeleton = false
  export let sections = [
    {
      courseCode: 'QUIM 3131',
      courseName: 'QUIMICA GENERAL I',
      section: '010',
      room: 'Q 245',
      days: 'LWV',
      hours: '7:30-8:20',
      credits: '3',
      professor: 'MARTHA LOPEZ MORENO',
      spacesAvailable: 54,
      spacesTaken: 54,
      spacesLeft: 0
    },
    {
      courseCode: 'QUIM 3131',
      courseName: 'QUIMICA GENERAL I',
      section: '020',
      room: 'Q 245',
      days: 'LWV',
      hours: '7:30-8:20',
      credits: '3',
      professor: 'MARTHA LOPEZ MORENO',
      spacesAvailable: 54,
      spacesTaken: 54,
      spacesLeft: 0
    },
    {
      courseCode: 'QUIM 3131',
      courseName: 'QUIMICA GENERAL I',
      section: '030',
      room: 'Q 245',
      days: 'LWV',
      hours: '7:30-8:20',
      credits: '3',
      professor: 'MARTHA LOPEZ MORENO',
      spacesAvailable: 54,
      spacesTaken: 54,
      spacesLeft: 0
    }
  ]

  // the pinned section will always be the first one in the array
  $: pinnedSection = sections[0]

  let showAllSections = true
  let sectionList
  let appearAbove
  let wrapper

  // Making the section list appear above so that it doesn't go out of screen
  onMount(() => {
    appearAbove =
      sectionList &&
      sectionList.getBoundingClientRect().bottom >
        wrapper.parentElement.parentElement.getBoundingClientRect().bottom

    showAllSections = false
  })

  function pinSection(sectionIndex) {
    ;[sections[0], sections[sectionIndex]] = [sections[sectionIndex], sections[0]]
  }
</script>

<div
  bind:this={wrapper}
  class="wrapper"
  on:mouseleave={() => (showAllSections = false)}
  role="contentinfo"
>
  {#key pinnedSection}
    <div
      in:fly={{ y: -25, delay: appearAbove ? 100 : 0 }}
      class="pinnedSection"
      class:showingSections={showAllSections}
    >
      <ButtonSection>
        <span
          on:mouseenter={() => (showAllSections = true)}
          role="contentinfo"
          style="flex: 8"
          class="courseName">{pinnedSection.courseCode}</span
        >
        <span style="flex: 4" class="section">{pinnedSection.section}</span>
        <span style="flex: 5" class="room">{pinnedSection.room}</span>
        <span style="flex: 5" class="days">{pinnedSection.days}</span>
        <span style="flex: 3" class="credits">{pinnedSection.credits}</span>
        <span style="flex: 12" class="professor">{pinnedSection.professor.toLowerCase()}</span>
        <span style="flex: 5" class="spaces"
          >{pinnedSection.spacesLeft} / {pinnedSection.spacesAvailable}</span
        >
      </ButtonSection>
    </div>
  {/key}

  {#if showAllSections}
    <div
      class="sectionList"
      bind:this={sectionList}
      class:appearAbove
      transition:fade={{ duration: 100 }}
    >
      {#each sections as section, sectionIndex (section.section)}
        <!-- Filtering out the pinned section (the first one in ther array) -->
        {#if sectionIndex > 0}
          <div class="unpinnedSection" in:fly={{ y: -25, delay: appearAbove ? 0 : 100 }}>
            <button style="flex: 8" class="pinSection" on:click={() => pinSection(sectionIndex)}
              ><Pin /></button
            >
            <span style="flex: 4" class="section">{section.section}</span>
            <span style="flex: 5" class="room">{section.room}</span>
            <span style="flex: 5" class="days">{section.days}</span>
            <span style="flex: 3" class="credits">{section.credits}</span>
            <span style="flex: 12" class="professor">{section.professor.toLowerCase()}</span>
            <span style="flex: 5" class="spaces"
              >{section.spacesLeft} / {section.spacesAvailable}</span
            >
          </div>
        {/if}
      {/each}
    </div>
  {/if}
</div>

<style>
  .wrapper {
    border-radius: 2em;
    width: 90%;
  }

  .pinnedSection {
    outline: 2px dashed rgba(0, 0, 0, 0);
    border-radius: inherit;
    transition: 0.2s;
  }

  .pinnedSection.showingSections {
    outline-color: var(--txt-light);
  }

  .pinSection {
    all: unset;
  }

  span,
  .pinSection {
    background: var(--bg-light);
    justify-content: center;
    align-items: center;
    height: 2.75rem;
    display: flex;
    width: 100%;
  }

  .pinSection {
    background: var(--bg);
    transition: 0.2s;
    cursor: pointer;
  }

  .pinSection:hover {
    filter: brightness(1.5);
  }

  .professor {
    text-transform: capitalize;
  }

  .courseName {
    background: var(--bg-dark);
  }

  .sectionList {
    box-shadow: 0 0.3em 1em rgba(0, 0, 0, 0.5);
    border: 1px solid var(--txt-light);
    background: var(--bg-dark);
    flex-direction: column;
    border-radius: 0.5em;
    overflow-y: scroll;
    position: absolute;
    max-height: 50%;
    width: inherit;
    display: flex;
  }

  .sectionList.appearAbove {
    box-shadow: 0 -0.3em 1em rgba(0, 0, 0, 0.5);
    transform: translateY(calc(-100% - 2.75rem));
  }

  .unpinnedSection {
    box-sizing: content-box;
    display: flex;
  }

  .unpinnedSection + .unpinnedSection {
    border-top: 1px solid var(--txt-light);
  }
</style>
