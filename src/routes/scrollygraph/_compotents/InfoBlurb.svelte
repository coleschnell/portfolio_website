<script>
    import { escape_attribute_value } from "svelte/internal";

    export let props;
    export let color;
    export let prefix = "";
    export let opt_name;

</script>

<div class="inside">
    <div class="name text"><b>{prefix}{opt_name ? opt_name : props.name + " County, " + props.state}</b></div>
    {#if props.movedin == 0 && props.movedout == 0 && props.movednet == 0}
    <div class="text"><i>Not available or no migration</i></div>
    {:else}
    <div class="row-inside" style="box-shadow: inset 0 -1px 0 0 #fff, inset 0 -7px 0 0 {color(props.movedin)};">
        <div class='text'>To DeSoto</div>
        <div class='text'>{props.movedin.toLocaleString()}</div>
    </div>
    <div class="row-inside" style="box-shadow: inset 0 -1px 0 0 #fff, inset 0 -7px 0 0 {color(-props.movedout)};">
        <div class='text'>From DeSoto </div>
        <div class='text'>{props.movedout.toLocaleString()}</div>
    </div>
    <div class="row-inside" style="box-shadow: inset 0 -1px 0 0 #fff, inset 0 -7px 0 0 {color(props.movednet)};">
        <div class='text'>Net migration </div>
        <div class='text'>{props.movednet.toLocaleString()}</div>
    </div>
    {/if}
</div>

<style>
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