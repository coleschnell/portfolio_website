<script>
  import { LayerCake, Svg, Html, groupLonger, flatten } from 'layercake';

  import { scaleOrdinal } from 'd3-scale';
  import { timeParse, timeFormat } from 'd3-time-format';
  import { format } from 'd3-format';

  import MultiLine from './_components/MultiLine.svelte';
  import AxisX from './_components/AxisX.svelte';
  import AxisY from './_components/AxisY.svelte';
  import Labels from './_components/GroupLabels.html.svelte';
  import SharedTooltip from './_components/SharedTooltip.html.svelte';
  import RecessionBars from './_components/RecessionBars.svelte'

  // This example loads csv data as json using @rollup/plugin-dsv
  import data from './_data/deposits.csv';

  /* --------------------------------------------
   * Set what is our x key to separate it from the other series
   */
  const xKey = 'report_date';
  const yKey = 'value';
  const zKey = 'bank';


  const xKeyCast = timeParse('%Y-%m-%d');

  const seriesNames = Object.keys(data[0]).filter(d => d !== xKey);
  const seriesColors = ['#ffe4b8', '#ffb3c0', '#ff7ac7', '#ff00cc'];

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

console.log(xticks)

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
</style>

<div class="chart-container">
  <LayerCake
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
</div>