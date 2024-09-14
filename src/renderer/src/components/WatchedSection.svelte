<script>
  import { fade, fly } from 'svelte/transition'
  import { watchedCourses } from '../lib/store'
  import ButtonSection from './ButtonSection.svelte'
  import Pin from '../assets/Pin.svg.svelte'
  import { onMount } from 'svelte'
  export let courseCode
  export let sections
  export let semester

  // the pinned section will always be the first one in the array
  $: pinnedSection = sections && sections[0]

  let showAllSections = true
  let sectionList
  let appearAbove
  let wrapper

  onMount(() => {
    // Making the section list appear above so that it doesn't go out of screen
    appearAbove =
      sectionList &&
      sectionList.getBoundingClientRect().bottom >
        wrapper.parentElement.parentElement.getBoundingClientRect().bottom

    showAllSections = false

    // searchiing for course sections if they're not available
    if (!sections) {
      window.electronAPI
        .getSections({ courseCode, semester })
        .then(({ sectionsObjects, error }) => {
          if (error) {
            alert(error)
          } else {
            $watchedCourses[courseCode] = sectionsObjects
          }
        })
    }
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
      {#if sections}
        <ButtonSection>
          <span
            on:mouseenter={() => (showAllSections = true)}
            role="contentinfo"
            style="flex: 8"
            class="courseName">{courseCode}</span
          >
          <span
            on:mouseenter={() => (showAllSections = false)}
            role="contentinfo"
            style="flex: 4"
            class="section">{pinnedSection.section || ''}</span
          >
          <span
            on:mouseenter={() => (showAllSections = false)}
            role="contentinfo"
            style="flex: 5"
            class="room">{pinnedSection.room || ''}</span
          >
          <span
            on:mouseenter={() => (showAllSections = false)}
            role="contentinfo"
            style="flex: 5"
            class="days">{pinnedSection.days || ''}</span
          >
          <span
            on:mouseenter={() => (showAllSections = false)}
            role="contentinfo"
            style="flex: 3"
            class="credits">{pinnedSection.credits || ''}</span
          >
          <span
            on:mouseenter={() => (showAllSections = false)}
            role="contentinfo"
            style="flex: 12"
            class="professor">{pinnedSection.professor?.toLowerCase() || ''}</span
          >
          <span
            on:mouseenter={() => (showAllSections = false)}
            role="contentinfo"
            style="flex: 5"
            class="spaces">{pinnedSection.spacesLeft} / {pinnedSection.spacesAvailable}</span
          >
        </ButtonSection>
      {:else}
        <div class="skeletonSection" in:fly={{ y: -25, delay: appearAbove ? 0 : 100 }}>
          <ButtonSection>
            <span style="flex: 8" class="courseName">{courseCode}</span>
            <span style="flex: 4"><p></p></span>
            <span style="flex: 5"><p></p></span>
            <span style="flex: 5"><p></p></span>
            <span style="flex: 3"><p></p></span>
            <span style="flex: 12"><p></p></span>
            <span style="flex: 5"><p></p></span>
          </ButtonSection>
        </div>
      {/if}
    </div>
  {/key}

  {#if sections && showAllSections}
    <div
      class="sectionList"
      bind:this={sectionList}
      class:appearAbove
      transition:fade={{ duration: 130 }}
    >
      {#each sections as section, sectionIndex (section.section)}
        <!-- Filtering out the pinned section (the first one in ther array) -->
        {#if sectionIndex > 0}
          <div class="unpinnedSection" in:fly={{ y: -25, delay: appearAbove ? 0 : 100 }}>
            <button style="flex: 8" class="pinSection" on:click={() => pinSection(sectionIndex)}
              ><Pin /></button
            >
            <span style="flex: 4" class="section">{section.section || ''}</span>
            <span style="flex: 5" class="room">{section.room || ''}</span>
            <span style="flex: 5" class="days">{section.days || ''}</span>
            <span style="flex: 3" class="credits">{section.credits || ''}</span>
            <span style="flex: 12" class="professor"
              >{section.professor?.toLowerCase() || ''}</span
            >
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
    z-index: 1;
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

  .skeletonSection span {
    justify-content: center;
    align-items: center;
    display: flex;
  }

  p {
    background: rgba(255, 255, 255, 0.08);
    border-radius: 0.2em;
    position: relative;
    overflow: hidden;
    height: 50%;
    width: 65%;
  }

  p::before {
    background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0),
      rgba(255, 255, 255, 0.2),
      rgba(255, 255, 255, 0)
    );
    position: absolute;
    height: 100%;
    content: '';
    width: 100%;
    animation: skeleton 1.5s linear infinite;
  }

  @keyframes skeleton {
    0%,
    50% {
      left: -100%;
    }
    100% {
      left: 100%;
    }
  }
</style>
