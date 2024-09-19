<!--
  @component
  Generates a tooltip that works on multiseries datasets, like multiline charts. It creates a tooltip showing the name of the series and the current value. It finds the nearest data point using the [QuadTree.html.svelte](https://layercake.graphics/components/QuadTree.html.svelte) component.
 -->
<script>
  import { getContext } from 'svelte';
  import { format } from 'd3-format';

  import QuadTree from './QuadTree.html.svelte';

  const { data, width, yScale, config, zGet } = getContext('LayerCake');

  const commas = format(',');
  const titleCase = d => d.replace(/^\w/, w => w.toUpperCase());

  /** @type {Function} [formatTitle=d => d] - A function to format the tooltip title, which is `$config.x`. */
  export let formatTitle = d => d;

  /** @type {Function} [formatValue=d => isNaN(+d) ? d : commas(d)] - A function to format the value. */
  export let formatValue = d => isNaN(+d) ? d : commas(d);

  /** @type {Function} [formatKey=d => titleCase(d)] - A function to format the series name. */
  export let formatKey = d => titleCase(d);

  /** @type {Number} [offset=-20] - A y-offset from the hover point, in pixels. */
  export let offset = -20;

  /** @type {Array} [dataset] - The dataset to work off ofdefaults to $data if left unset. You can pass something custom in here in case you don't want to use the main data or it's in a strange format. */
  export let dataset = undefined;

  const w = 60;
  const w2 = w / 2;

  /* --------------------------------------------
   * Sort the keys by the highest value
   */
  function sortResult(result) {
    if (Object.keys(result).length === 0) return [];
    const rows = Object.keys(result).filter(d => d !== $config.x).map(key => {
      return {
        key,
        value: result[key]
      };
    }).sort((a, b) => b.value - a.value);

    return rows;
  }

</script>

<style>
  .tooltip-but-cool {
    position: absolute;
    font-size: 14px;
    pointer-events: none;
    transform: translate(-50%, -95%);
    z-index: 15;
    pointer-events: none;
    text-shadow:
            1px 1px 0 #fff,
            -1px 1px 0 #fff,
            2px 0 0 #fff,
            -2px 0 0 #fff;
  }
  .line {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 1px;
    border-left: 1px dotted #666;
    pointer-events: none;
  }
  .tooltip,
  .line {
    transition: left 250ms ease-out, top 250ms ease-out;
  }
  .title {
    font-weight: bold;
  }
  .key {
    color: #999;
  }
  .data {
    transform: translate(-50%, -100%);
    width: 50px;
  }
  .point {
    position: absolute;
    pointer-events: none;
    transform: translate(-50%, -50%);
    z-index: 15;
    pointer-events: none;
    width: 8px; 
    height: 8px; 
    background-color: black; 
    border-radius: 50%;
    transition: left 250ms ease-out, top 250ms ease-out;
  }
</style>


<QuadTree
  dataset={$data.flatMap(obj => obj.values)}
  y = "y"
  searchRadius = 500
  let:x
  let:y
  let:visible
  let:found
  let:e
>
{#if visible === true}

  <div 
  class="tooltip-but-cool data"
  style="
  display: { visible ? 'block' : 'none' };
  top:{y}px;
  left:{Math.min(Math.max(22, x+14), $width)}px;
  z-index:100
  "
  >
    {formatValue(found.value)}
  </div>

  <div
  class="tooltip-but-cool"
  style="
    width:1.5px;
    height:6px;
    background-color: #aaa;
    display: { visible ? 'block' : 'none' };
    top:{$yScale(0)}px;
    left:{x}px;"
  >

</div>

  <div
  class="tooltip-but-cool"
  style="
    width:{w}px;
    display: { visible ? 'block' : 'none' };
    top:{$yScale(0)}px;
    left:{Math.min(Math.max(w2, x+5), $width - w2)}px;"
  >
  {formatTitle(found.Date)}
  </div>

  <div class="point"
      style="
      display: { visible ? 'block' : 'none' };
      top:{y}px;
      left:{x}px;"
  ></div>

{/if}
</QuadTree>

<!-- <QuadTree
  dataset={dataset || $data}
  y = "y"
  let:x
  let:y
  let:visible
  let:found
  let:e
>
<div class="tooltip-but-cool">
  X: {x}, Y: {y}
</div>
  {@const foundSorted = sortResult(found)}
  {#if visible === true}
    <div
      style="left:{x}px;"
      class="line"></div>
    <div
      class="tooltip-but-cool"
      style="
        width:{w}px;
        display: { visible ? 'block' : 'none' };
        top:{$yScale(0)}px;
        left:{Math.min(Math.max(w2, x), $width - w2)}px;"
      >
      <b>{formatTitle(found[$config.x])}</b>
    </div>
    {#each foundSorted as row}
    <div 
      class="tooltip data"
      style="
      display: { visible ? 'block' : 'none' };
      top:{$yScale(row.value)}px;
      left:{x}px;
      border: 3px solid {$zGet($data.filter(x => x.bank === row.key)[0])};
      "
      >
        {formatValue(row.value)}
        {found}
      </div>


      <div class="point"
          style="
          display: { visible ? 'block' : 'none' };
          top:{$yScale(row.value)}px;
          left:{x}px;
          background-color: {$zGet($data.filter(x => x.bank === row.key)[0])}"
      ></div>

    {/each}
  {/if}
</QuadTree> -->

