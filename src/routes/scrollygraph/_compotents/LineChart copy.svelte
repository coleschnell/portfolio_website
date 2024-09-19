<script>
  import { LayerCake, Svg, Html, groupLonger, flatten } from 'layercake';

  import { scaleOrdinal } from 'd3-scale';
  import { timeParse, timeFormat } from 'd3-time-format';
  import { format } from 'd3-format';

  import MultiLine from './MultiLine.svelte';
  import AxisX from './AxisX.svelte';
  import AxisY from './AxisY.svelte';
  import Labels from './GroupLabels.html.svelte';
  import SharedTooltip from './SharedTooltip.html.svelte';
  import RecessionBars from './RecessionBars.svelte'

  let footnote_height = 0, title_height = 0;


  // This example loads csv data as json using @rollup/plugin-dsv
  export let data;
  export let title = 'null';
  export let source = 'null';
  export let notes = 'null';
  export let xtick_settings = {'start': 0, 'end': 100, 'jump': 1};
  export let yticks = 7
  export let recessions = false;
  export let padding={ top: 20, right: 120, bottom: 20, left: 45 }
  export let formatLabelY = d => format(`.3~s`)(d).replace("G", "B").concat('%');
  export let labels = true;
  export let yDomain = [null, null]
  export let title_position = 'left'
  export let margin = { top: 0, right: 0, bottom: 0, left: 0 }


  data.forEach(x => {
    x.Date = x.Date + 86400000
  })

  /* --------------------------------------------
   * Set what is our x key to separate it from the other series
   */
  const xKey = 'Date';
  const yKey = 'value';
  const zKey = 'place';

  const xKeyCast = timeParse('%Y');

  const seriesNames = Object.keys(data[0]).filter(d => d !== xKey);
  // const seriesColors = ['#ffe4b8', '#ffb3c0', '#ff7ac7', '#ff00cc'];

  const seriesColors = [
    "#B29C58",
    "#1e4357", // --co-bizj-blue-700
    // "#16242c",  // --co-bizj-blue-900
    "#b9c9d5", // --co-bizj-blue-100
    "#D4C48A",
    // "#95aec1", // --co-bizj-blue-200
    "#7597ae", // --co-bizj-blue-300
    // "#517f9a", // --co-bizj-blue-400
    "#256788", // --co-bizj-blue-500
    // "#22546d", // --co-bizj-blue-600
    // "#1e4357", // --co-bizj-blue-700
    // "#1b3341", // --co-bizj-blue-800
  ];


  /* --------------------------------------------
   * Cast values
   */
  data.forEach(d => {
    d[xKey] = typeof d[xKey] === 'string'
      ? xKeyCast(d[xKey])
      : d[xKey];

    seriesNames.forEach(name => {
      d[name] = +d[name];
    });
  });

  const formatLabelX = timeFormat('%Y');

  const groupedData = groupLonger(data, seriesNames, {
    groupTo: zKey,
    valueTo: yKey
  });

  // Function to create an array of dates from 2014 to 2023 with June 30th
    function createDatesArray() {
        const datesArray = [];
        for (let year = xtick_settings.start; year <= xtick_settings.end; year = year + xtick_settings.jump) {
            // Note: Months are zero-indexed in JavaScript, so June is represented as 5
            const date = new Date(year-1, 12, 1);
            datesArray.push(date);
        }
        return datesArray;
    }

// Call the function to create the dates array
const xticks = createDatesArray();

</script>

<style>
  /*
    The wrapper div needs to have an explicit width and height in CSS.
    It can also be a flexbox child or CSS grid element.
    The point being it needs dimensions since the <LayerCake> element will
    expand to fill it.
  */
  .chart-container {
    width: 100%;
    height: 300px;
    z-index: 10;
  }


  * {
    font-family: 'Graphik Web', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }
  .footnotes{
    font-size: 12.5px;
    color: #666;
    display: flex;
    width: calc(100% - 20px);
    flex-direction: column;
    justify-content: space-between;
    padding: 10px 0px;
  }

  .footnotes > div {
    line-height: 15px;
  }

  .chart-title{
    font-size: 20px;
  }
</style>

<div class="chart-container" style="margin: {margin.top}px {margin.right}px {margin.bottom + footnote_height + title_height}px {margin.left}px;">
  {#if title !== 'null'}
  <h3 class="chart-title" style="text-align: {title_position};" bind:clientHeight={title_height}>{title}</h3>
  {/if}
  <LayerCake
    {padding}
    x={xKey}
    y={yKey}
    z={zKey}
    yDomain={yDomain}
    zScale={scaleOrdinal()}
    zRange={seriesColors}
    flatData={flatten(groupedData, 'values')}
    data={groupedData}
  >
    <Svg>
      {#if recessions}
      <RecessionBars/>
      {/if}
      <AxisX
        gridlines={false}
        ticks={xticks}
        format={formatLabelX}
        snapLabels={false}
        tickMarks
      />
      <AxisY
        ticks={yticks}
        format={formatLabelY}
        labelPosition = {'above'}
        tickGutter={5}
      />
      <MultiLine/>
    </Svg>
    <Html>
      {#if labels}
      <Labels/>
      {/if}
      <SharedTooltip
      formatTitle={timeFormat('%Y')}
      dataset={data}
      formatValue={formatLabelY}
      />
    </Html>
  </LayerCake>
  <div class="footnotes" bind:clientHeight={footnote_height}>
    {#if source !== 'null'}
    <div>Source: {source}</div>
    {/if}
    {#if notes !== 'null'}
    <div>Notes: {notes}</div>
    {/if}
  </div>
</div>