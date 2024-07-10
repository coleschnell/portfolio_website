<script>
    import LineChart from "../_compotents/LineChart.svelte";
    import { onMount } from "svelte";
    import { format } from 'd3-format';
    import { text } from "svelte/internal";
    
    let pop_data
    
    onMount(async() => {
        pop_data = await fetch(
            "https://cdn.jsdelivr.net/gh/coleschnell/portfolio_website@latest/src/routes/scrollygraph/_assets/population_percent_change.json",
        ).then((d) => d.json());
    });
</script>
{#if pop_data}
<div>
    <LineChart 
        data={pop_data}
        title={'Population percent change, year-over-year'}
        source={"U.S. Census Bureau's Population Estimates (1980-2023)"}
        notes={'Shaded areas show recessions'}
        recessions={true}
        xtick_settings={{'start': 1980, 'end': 2023, 'jump': 10}}
        padding={{ top: 20, right: 93, bottom: 20, left: 20 }}
        formatLabelY={d => format(`.2`)(d).replace("G", "B").concat('%')}
    />  
</div>
{/if}
