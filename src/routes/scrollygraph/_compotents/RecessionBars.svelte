<!-- 
    @component
 -->
 <script>
    import { getContext } from 'svelte';

    const { xScale, yScale, yRange } = getContext('LayerCake');


    const dates = [{
        start: new Date("2020-02-01"),
        end: new Date("2020-04-01")
    },
    {
        start: new Date("1980-01-01"),
        end: new Date("1980-07-01")
    },
    {
        start: new Date("1981-07-01"),
        end: new Date("1982-11-01")
    },
    {
        start: new Date("1990-07-01"),
        end: new Date("1991-03-01")
    },
    {
        start: new Date("2001-03-01"),
        end: new Date("2001-11-01")
    },
    {
        start: new Date("2007-12-01"),
        end: new Date("2009-06-01")
    }
]


 </script>

{#each dates as date}
<rect
 width="{$xScale(date.end) - $xScale(date.start)}"
 height="{$yRange[0]}"
 x={$xScale(date.start)}
 y={$yRange[1]}   
>
</rect>
{/each}
<style>

    rect{
        fill: #666;
        fill-opacity: 0.15;
    }

</style>