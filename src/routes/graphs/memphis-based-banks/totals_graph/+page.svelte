<script>
  import { LayerCake, Svg, Html, groupLonger, flatten } from 'layercake';

  import { scaleOrdinal } from 'd3-scale';
  import { timeParse, timeFormat } from 'd3-time-format';
  import { format } from 'd3-format';

  import MultiLine from '../_components/MultiLine.svelte';
  import AxisX from '../_components/AxisX.svelte';
  import AxisY from '../_components/AxisY.svelte';
  import Labels from '../_components/GroupLabels.html.svelte';
  import SharedTooltip from '../_components/SharedTooltip.html.svelte';
  import RecessionBars from '../_components/RecessionBars.svelte';

  import { page } from '$app/stores';


  // This example loads csv data as json using @rollup/plugin-dsv
  import data from '../_data/totals.csv';

  /* --------------------------------------------
   * Set what is our x key to separate it from the other series
   */
  const xKey = 'report_date';
  const yKey = 'value';
  const zKey = 'bank';


  const xKeyCast = timeParse('%Y-%m-%d');

  const seriesNames = Object.keys(data[0]).filter(d => d !== xKey);
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
  const formatLabelY = d => format(`$.3~s`)(d).replace("G", "B");

  const groupedData = groupLonger(data, seriesNames, {
    groupTo: zKey,
    valueTo: yKey
  });

  // Function to create an array of dates from 2014 to 2023 with June 30th
    function createDatesArray() {
        const datesArray = [];
        for (let year = 2014; year <= 2023; year = year+3) {
            // Note: Months are zero-indexed in JavaScript, so June is represented as 5
            const date = new Date(year, 5, 30);
            datesArray.push(date);
        }
        return datesArray;
    }

// Call the function to create the dates array
const xticks = createDatesArray();


const q = $page.url.searchParams

const title = decodeURIComponent(q.get('title'))
const subhead = decodeURIComponent(q.get('subhead'))
const source = decodeURIComponent(q.get('source'))
const notes = decodeURIComponent(q.get('notes'))

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
  }


  * {
    font-family: Graphik Web,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;
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

<div class="chart-container">
  {#if title !== 'null'}
  <h3 class="chart-title">{title}</h3>
  {/if}  <LayerCake
    padding={{ top: 20, right: 210, bottom: 20, left: 45 }}
    x={xKey}
    y={yKey}
    z={zKey}
    yDomain={[0, null]}
    zScale={scaleOrdinal()}
    zRange={seriesColors}
    flatData={flatten(groupedData, 'values')}
    data={groupedData}
  >
    <Svg>
      <RecessionBars/>
      <AxisX
        gridlines={false}
        ticks={xticks}
        format={formatLabelX}
        snapLabels={false}
        tickMarks
      />
      <AxisY
        ticks={4}
        format={formatLabelY}
        labelPosition = {'above'}
        tickGutter={5}
      />
      <MultiLine/>
    </Svg>

    <Html>
      <Labels/>
      <SharedTooltip
        formatTitle={timeFormat('%b. %e, %Y')}
        dataset={data}
        formatValue={formatLabelY}
      />
    </Html>
  </LayerCake>
  <div class="footnotes">
    {#if source !== 'null'}
    <div>Source: {source}</div>
    {/if}
    {#if notes !== 'null'}
    <div>Notes: {notes}</div>
    {/if}
  </div>
</div>