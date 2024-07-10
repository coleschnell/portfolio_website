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
    $: left = values => $xScale(values.slice(-1)[0].Date)/  Math.max(...$xRange);
    $: top = values => $yScale(values.slice(-1)[0].value) / Math.max(...$yRange);

</script>

{#each $data as group}
  <div
    class="label"
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
  <div class="text" style="transform: translatey({$z(group) == "All other domestic counties" ? "-33px" : "0"});">{cap($z(group))}</div>

</div>
{/each}

<style>
    * {
      font-family: 'Graphik Web', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    }
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
    align-items: flex-start;
    gap: 5px;
  }

  .text {
    line-height: 1rem;
    width: 90px;
    transform: translatey(0%);
  }

  .t20 {
    transform: translateY(var(--y-offset))translateX(var(--x-offset))translateY(calc(var(--overlap-offset) * -1));
  }
  .t-20 {
    transform: translateY(var(--y-offset))translateX(var(--x-offset))translateY(var(--overlap-offset));
  }
  .point {
    transform: translatey(100%);
    width: 6px; 
    height: 6px; 
  }
</style>