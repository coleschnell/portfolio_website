<script>
import LineChart from "../_compotents/LineChart.svelte";
import { onMount } from "svelte";
import { format } from 'd3-format';

let race_pop_desoto, race_pop_shebly

onMount(async() => {
    race_pop_desoto = await fetch(
        "https://cdn.jsdelivr.net/gh/coleschnell/portfolio_website@latest/src/routes/scrollygraph/_assets/desoto_pop_race.json",
    ).then((d) => d.json());

    race_pop_shebly = await fetch(
        "https://cdn.jsdelivr.net/gh/coleschnell/portfolio_website@latest/src/routes/scrollygraph/_assets/shelby_pop_race.json",
    ).then((d) => d.json());
});

</script>

<h3 class="chart-title">Black and White population percent change, year-over-year</h3>
<div class='sidebyside'>
{#if race_pop_desoto}
    <LineChart 
        data={race_pop_desoto}
        title={'DeSoto County'}
        title_position = 'center'
        labels = {false}
        xtick_settings={{'start': 2010, 'end': 2023, 'jump': 4}}
        yticks={[-4, -2, 0, 2, 4, 6, 8, 10, 12]}
        yDomain = {[-4,12]}
        padding={{ top: 20, right: 15, bottom: 0, left: 30 }}
        margin={{ top: 0, right: 0, bottom: 40, left: 0 }}
        formatLabelY={d => format(`.2`)(d).replace("G", "B").concat('%')}
    />  
{/if}
{#if race_pop_shebly}
    <LineChart 
        data={race_pop_shebly}
        title={'Shelby County'}
        title_position = 'center'
        labels = {false}
        xtick_settings={{'start': 2010, 'end': 2023, 'jump': 4}}
        yticks={[-4, -2, 0, 2, 4, 6, 8, 10, 12]}
        yDomain = {[-4,12]}
        padding={{ top: 20, right: 15, bottom: 0, left: 30 }}
        margin={{ top: 0, right: 0, bottom: 40, left: 0 }}
        formatLabelY={d => format(`.2`)(d).replace("G", "B").concat('%')}
    />  
{/if}
</div>
<div class="legend"><div class='legend-group'><div class="square" style="background-color: #B29C58;"></div>Black residents</div><div class='legend-group'><div class="square" style="background-color: #1e4357;"></div>White residents</div></div>
<div class="footnotes">
    <div>Source: Census Bureau's 5-year American Community Survey (2010-2022)</div>
</div>

<style>
      .sidebyside{
        display: flex;
        flex-direction: row;
        gap: 10px
    }

    .chart-title{
    font-size: 20px;
    margin-bottom: 5px;
    font-family: 'Graphik Web', 'Helvetica Neue', Helvetica, Arial, sans-serif;

  }

  .legend{
    font-size: 15px;
    display: flex;
    width: calc(100% - 20px);
    flex-direction: row;
    justify-content: center;
    padding: 10px 0px 0px 0px;
    gap: 10px;
    font-family: 'Graphik Web', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  .footnotes, .legend{
    transform: translateY(-40px);
  }

  .legend-group{
    display: flex;
    gap: 5px;
  }

  .square{
    transform: translatey(7px);
    width: 10px; 
    height: 10px;
  }

  .footnotes > div{
    font-size: 12.5px;
    color: #666;
    display: flex;
    width: calc(100% - 20px);
    flex-direction: column;
    justify-content: space-between;
    font-family: 'Graphik Web', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    line-height: 15px;
  }

</style>