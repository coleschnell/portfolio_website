<!--
  @component
  Generates a hover tooltip. It creates a slot with an exposed variable via `let:detail` that contains information about the event. Use the slot to populate the body of the tooltip using the exposed variable `detail`.
 -->
 <script>
    import InfoBlurb from "./InfoBlurb.svelte";

    /** @type {Object} evt - A svelte event created via [`dispatch`](https://svelte.dev/docs#createEventDispatcher) with event information under `evt.detail.e`. */
    export let evt = {};
  
    /** @type {Number} [offset=-35] - A y-offset from the hover point, in pixels. */
    export let offset = -35;

    export let color;

  </script>
  
  {#if evt.detail}
    <div
      class="tooltip"
      style="
        top:{evt.detail.e.layerY + offset}px;
        left:{evt.detail.e.layerX}px;
      "
    >
    {#if evt.detail.id != "28033"}
    <InfoBlurb {color} props={evt.detail.props} />
    {/if}
    {#if evt.detail.id == "28033"}
    <div class="inside">
        <div class="name"><b>DeSoto County</b></div>
        <!-- <div class="name">Total domestic migration:</div>
        <div class="row-inside" style="box-shadow: inset 0 -1px 0 0 #fff, inset 0 -7px 0 0 {color(32798)};">
            <div class='text'>To DeSoto</div>
            <div class='text'>163,990</div>
        </div>
        <div class="row-inside" style="box-shadow: inset 0 -1px 0 0 #fff, inset 0 -7px 0 0 {color(-28456)};">
            <div class='text'>From DeSoto</div>
            <div class='text'>142,280</div>
        </div>
        <div class="row-inside" style="box-shadow: inset 0 -1px 0 0 #fff, inset 0 -7px 0 0 {color(4342)};">
            <div class='text'>Net migration </div>
            <div class='text'>21,710</div>
        </div> -->
    </div>

    {/if}
    </div>
    {/if}
  
  <style>
    .tooltip {
      position: absolute;
      width: 150px;
      border: 1px solid #ccc;
      font-size: 13px;
      background: rgba(255, 255, 255, 0.85);
      transform: translate(-50%, -100%);
      padding: 5px;
      z-index: 15;
    }
    .inside{
        display: flex;
        flex-direction: column;
        width: 100%;
    }
    .row-inside{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        height: 21px;
        text-shadow: 1px 1px 0 #fff, -1px 1px 0 #fff, 2px 0 0 #fff, -2px 0 0 #fff;
        /* line-height: 10px; */
    }
    .name{
        width: 100%;
        text-align: left;
    }
    .text{
        font-family: 'Graphik Web', 'Helvetica Neue', Helvetica, Arial, sans-serif;
        padding: 0;
    }
  </style>