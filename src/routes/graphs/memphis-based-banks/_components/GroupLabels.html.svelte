<!--
  @component
  Generates HTML text labels for a nested data structure. It places the label near the y-value of the highest x-valued data point. This is useful for labeling the final point in a multi-series line chart, for example. It expects your data to be an array of objects where each has `values` field that is an array of data objects. It uses the `z` field accessor to pull the text label.
 -->
<script>
  import { getContext } from 'svelte';
  import { max } from 'd3-array';

  const { data, x, y, xScale, yScale, xRange, yRange, z, zGet } = getContext('LayerCake');

  /* --------------------------------------------
   * Title case the first letter
   */
  const cap = val => val.replace(/^\w/, d => d.toUpperCase());

  /* --------------------------------------------
   * Put the label on the highest value
   */
  // $: left = values => $xScale(max(values, $x)) /  Math.max(...$xRange);
  // $: top = values => $yScale(max(values, $y)) / Math.max(...$yRange);
    console.log($data[2])
    $: left = values => $xScale(values.slice(-1)[0].report_date)/  Math.max(...$xRange);
    $: top = values => $yScale(values.slice(-1)[0].value) / Math.max(...$yRange);
</script>

{#each $data as group}
  <div
    class="label 
    {group.bank == 'The Bank of Fayette County' ? "t20" : ""}
    {group.bank == 'Financial Federal Bank' ? "t-20" : ""}
    {group.bank == 'Commercial industrial loans' ? "t-20" : ""} 
    {group.bank == 'Commercial real estate loans' ? "t20" : ""} 
    "
    style="
      top:{top(group.values) * 100}%;
      left:{left(group.values) * 100}%;
      width: 205px;
    "
  >
  <div class="point"
       style="
       background-color: {$zGet(group)}; 
       "></div>
  <div>{cap($z(group))}</div>

</div>
{/each}

<style>
  :root{
    --overlap-offset: 8px;
    --x-offset: 4px;
    --y-offset: -11px;
  }

  .label {
    position: absolute;
    transform: translateY(var(--y-offset))translateX(var(--x-offset));
    font-size: 15px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    gap: 2px
  }
  .t20 {
    transform: translateY(var(--y-offset))translateX(var(--x-offset))translateY(calc(var(--overlap-offset) * -1));
  }
  .t-20 {
    transform: translateY(var(--y-offset))translateX(var(--x-offset))translateY(var(--overlap-offset));
  }
  .point {
    transform: translatey(-1.5px);
    width: 6px; 
    height: 6px; 
  }
</style>