<script>
    import LineChart from "./_compotents/LineChart.svelte";
    import { onMount } from "svelte";
    import { format } from 'd3-format';
    import { text } from "svelte/internal";
    import { timeFormat } from 'd3-time-format';

    
    let data
    
    onMount(async() => {
        data = await fetch(
            "src/routes/line_charts/_assets/office_vacancy.json",
        ).then((d) => d.json());
    });

    function getQuarter(d) {
        d = d || new Date();
        var m = Math.floor(timeFormat('%m')(d)/3) + 1;
        return m > 4? m - 4 : m;
    }

</script>
{#if data}
<div>
    <LineChart 
        {data}
        title={'Office vacancy rate, downtown vs. Memphis'}
        source={"CoStar"}
        notes={'Shaded areas show recessions.'}
        recessions={true}
        yDomain = {[0, 16]}
        xtick_settings={{'start': 2014, 'end': 2024, 'jump': 2}}
        padding={{ top: 20, right: 93, bottom: 20, left: 30 }}
        formatLabelY={d => format(`.2`)(d).replace("G", "B").concat('%')}
        formatYaxis = {d => format(`.2f`)(d).replace("G", "B").concat('%')}
        formatLabelX = {d => timeFormat('%Y')(d) + " Q"  + getQuarter(d)}
    />  
</div>
{/if}
