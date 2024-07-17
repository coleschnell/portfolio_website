<script>
    import Legend from "../_compotents/Legend.svelte";
    import Map from "../_compotents/Map.svelte";
    import { scaleSequential } from "d3-scale";
    import { interpolatePiYG } from "d3-scale-chromatic";
    import Tooltip from "../_compotents/Tooltip.svelte";
    import Scrolly from "../_compotents/Scrolly.svelte";
    import { onMount } from "svelte";
    import Sticky from "sticky-js";

    const color = scaleSequential(interpolatePiYG).domain([-2000, 2000]);

    let value = 0, sticky, sticky_element, steps_height;
    onMount(async() => {
        sticky = new Sticky(".sticky");
    });

    $: console.log(value)

    const steps = [
    '',
    '<p class="content__segment combx paywall__content">The U.S. Census Bureau\'s American Community Survey (ACS) measured county-to-county migration flows from 2006 to 2020. The net migration – or number of net movers – is the number of people who moved to a county minus the number of people left for another county.</p><p class="content__segment combx paywall__content">Green represents counties that DeSoto had positive net migration (or net movers) – more people moved from that county to DeSoto than moved to the county from DeSoto.</p>',
    '<p class="content__segment combx paywall__content">Shelby County was the biggest loser, in terms of net migration to DeSoto. The Tennessee county had a net migration of about 19,190 residents to DeSoto from 2006 to 2020.</p>',
    '<p class="content__segment combx paywall__content">Shelby lost significantly more net movers than the next three counties. Those places, all in Mississippi, had a combined net migration of 7,370 from 2006 to 2020.</p>',
    '<p class="content__segment combx paywall__content">Over 1,000 miles away, Bergen County – where Newark is located and the largest county in New Jersey – had the fifth-largest net migration in favor of DeSoto.</p>',
    '<p class="content__segment combx paywall__content">DeSoto is not so alluring that every local county has flocks of movers to it. For instance, university students seem to be leaving for college and not returning home to DeSoto after college.</p><p class="content__segment combx paywall__content">Pink represents counties that DeSoto had negative net migration (or net movers) – more people moved to that county from DeSoto than moved from the county to DeSoto.</p>',
    '<p class="content__segment combx paywall__content">Oktibbeha County, where Mississippi State University is located, gained 4,025 residents from DeSoto and lost only 820 residents to DeSoto, gaining 3,205 net movers in the exchange from 2006 to 2020.</p>',
    '<p class="content__segment combx paywall__content">Davidson County, the second-largest Tennessee county following Shelby, attracted the second-most net movers, gaining 2,300 residents from DeSoto over the 15 years studied.</p>',
    '<p class="content__segment combx paywall__content">Adjacent to DeSoto, Marshall County had the third-most negative net movers, exchanging 14,690 movers, including those who were leaving and those coming. Whereas, both farther away, the counties with the fourth- and fifth-most negative net movers exchanged less than 2,000 residents each; nearly all were residents who moved away from DeSoto.</p>',
    '<p class="content__segment combx paywall__content">The farthest U.S. county to have migration with DeSoto was Anchorage, Alaska. However, 1,520 net movers came to DeSoto from other nations in the 15 years, compared to total domestic net migration of 34,295.</p>',
    '',
]
    let evt;
    let hideTooltip = true;

</script>

<section style="padding: 0;">
    <div class="section-container" data-sticky-container style="margin: 0; z-index:{value != steps.length-1 ? 10 : -10}">
        <div class="steps-container" bind:clientHeight={steps_height} style="z-index:{value != steps.length-1 ? 10 : -10}">
            <Scrolly bind:value>
                {#each steps as text, i}
                    <div class="step" class:active={value === i} style="visibility:{ i == steps.length-1 ? "hidden" : "visible"};">
                        {#if i != 0}
                        <div class="step-content">{@html text}</div>
                        {/if}
                    </div>
                {/each}
            </Scrolly>
        </div>
        <div class="sticky" bind:this={sticky_element} data-margin-top="200" style="left: unset !important;">
            {#if hideTooltip !== true && value == 10}
                <Tooltip {evt} {color} />
            {/if}
            {#if value > 0}
            <Legend colorScale={color} title={"Net migration to DeSoto"} tickFormat={`.2~s`} />
            {/if}
            <Map
                {color}
                sticky={sticky_element}
                step={value}
                on:mousemove={(event) => (evt = hideTooltip = event)}
                on:mouseout={() => (hideTooltip = true)}
            />
            <div class="source">
                Source: U.S. Census Bureau's 5-year American Community Survey Migration Flows (2006-2010, 2011-2015, 2016-2020)
            </div>
        </div>
    </div>
</section>


<style>
    /* article {
        position: relative;
        width: 672px;
        margin: 50px auto;
        background-color: whitesmoke;
    } */

    * {
    font-family: Graphik Web,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;
  }

    :global(body) {
        overflow-x: hidden;
    }

    .spacer {
        height: 200px;
    }

    section {
        width: 100%;
        max-width: 672px;
    }

    .sticky {
        width: 100%;
        max-width: 672px;
        margin: 0 !important;
        position: relative;
        transition: top 1s;
        z-index: 0;
        /* position: sticky;
      top: 0;
      left: 0; */
    }

    .section-container {
        margin-top: 1em;
        text-align: center;
        transition: background 100ms;
        display: flex;
    }

    .step {
        height: 80vh;
        display: flex;
        place-items: center;
        justify-content: center;
    }

    .step-content {
        background: whitesmoke;
        color: #ccc;
        border-radius: 5px;
        padding: 0.5rem 1rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        transition: background 500ms ease;
        box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.2);
        text-align: left;
        width: 75%;
        margin: auto;
        max-width: 500px;
        font-family: 'Guardian Text Egyptian ACBJ Web',Georgia,'Times New Roman',serif;
    }

    .step-content > p{
        margin: 0 !important;
    }

    .step.active .step-content {
        background: white;
        color: black;
    }

    .steps-container{
        height: 100%;
    }


    .steps-container {
        flex: 1 1 40%;
    }

    .source{
        position: absolute;
        left: 0px;
        font-size: 12.5px;
        color: #666;
        width: calc(100% - 20px);
        padding: 10px 0px;
        line-height: 15px;
        text-align: left;
    }
    
    /* Comment out the following line to always make it 'text-on-top' */
    /* @media screen and (max-width: 768px) { */
    .section-container {
        flex-direction: column-reverse;
    }
    .sticky {
        width: 95%;
        margin: auto;
    }
</style>
