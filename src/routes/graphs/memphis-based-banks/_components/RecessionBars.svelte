<!-- 
    @component
 -->
 <script>
    import { getContext } from 'svelte';

    const { xScale, yScale, yRange } = getContext('LayerCake');


    const dates = {
        start: new Date("2020-02-01"),
        end: new Date("2020-04-01")
    }


 </script>


<rect
 width="{$xScale(dates.end) - $xScale(dates.start)}"
 height="{$yRange[0]}"
 x={$xScale(dates.start)}
 y={$yRange[1]}   
>
</rect>

<style>

    rect{
        fill: #666;
        fill-opacity: 0.15;
    }

</style>