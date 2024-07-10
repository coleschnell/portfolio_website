<script>
    import LineChart from "../_compotents/LineChart.svelte";
    import { onMount } from "svelte";
    import { format } from 'd3-format';
    
    
    let net_movers_data

    onMount(async() => {

        net_movers_data = await fetch(
            "https://cdn.jsdelivr.net/gh/coleschnell/portfolio_website@latest/src/routes/scrollygraph/_assets/net_movers.json",
        ).then((d) => d.json());

    });
</script>

{#if net_movers_data}
<div>
    <LineChart 
        data={net_movers_data}
        title={'Net migration, 5-year rolling average'}
        source={"U.S. Census Bureau's 5-year American Community Survey Migration Flows (2006-2010, 2011-2015, 2016-2020)"}
        xtick_settings={{'start': 2010, 'end': 2020, 'jump': 2}}
        padding={{ top: 20, right: 200, bottom: 20, left: 35 }}
        formatLabelY={d => format(`.3~s`)(d).replace("G", "B")}
    />  
</div>
{/if}
