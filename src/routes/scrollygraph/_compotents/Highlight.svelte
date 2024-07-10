<script>
    import InfoBlurb from "./InfoBlurb.svelte";

    export let p;
    export let ox;
    export let step;
    export let props;
    export let color;
    export let sticky;

    // presets

    export let angle = -90; // starts at 3 o'clock
    export let line_width = 50;
    export let prefix = "";
    export let style = "infoblurb";
    export let init_step = 1;
    export let init_ox = 560;
    export let opt_name = false;



    let left, top, end_x, end_y, offset_x, offset_y, trans;

    const translate_vals = {
        right: { x: 0, y: -50 },
        top: { x: -50, y: -100 },
        bottom: { x: -50, y: 0 },
        left: { x: -100, y: -50 },
    };

    $: {
        if ($ox == init_ox && step == init_step && p) {
            top =
                p.getBoundingClientRect().top -
                sticky.getBoundingClientRect().top;
            left =
                p.getBoundingClientRect().left -
                sticky.getBoundingClientRect().left;
            offset_x = Math.cos(angle * (Math.PI / 180)) * line_width;
            offset_y = Math.sin(angle * (Math.PI / 180)) * line_width;
            end_x = left + offset_x;
            end_y = top + offset_y;

            if (angle < -45 && angle > -135) {
                trans = translate_vals.top;
            }
            if (
                (angle < -135 && angle > -180) ||
                (angle < 180 && angle > 135)
            ) {
                trans = translate_vals.left;
            }
            if (angle < 135 && angle > 45) {
                trans = translate_vals.bottom;
            }
            if (angle < 45 && angle > -45) {
                trans = translate_vals.right;
            }
        }
    }
    

</script>
{#if $ox == init_ox && step == init_step}
    {#if style == "infoblurb"}
        <div
            class="dot"
            style="
                top: {top}px;
                left:{left}px;
                "
        ></div>
        <div
            class="line"
            style="
                width:{line_width}px;
                top: {top}px;
                left:{left}px;
                transform: translate(0%, -50%) rotate({angle}deg);
                "
        ></div>
        <div
            class="label"
            style="
                top: {end_y}px;
                left:{end_x}px;
                transform: translate({trans.x}%, {trans.y}%);
"
        >
            <InfoBlurb {color} {props} {prefix} {opt_name} />
        </div>
    {/if}
    {#if style == "label"}
        <div
            class="label-words"
            style="
                top: {top}px;
                left:{left}px;
        "
        >
            {opt_name ? opt_name : props.name}
        </div>
    {/if}
    {#if style == "pointer"}
    <div
    >
        <div
            class="dot"
            style="
            top: {top}px;
            left:{left}px;
            "
        ></div>
        <div
            class="line"
            style="
                width:{line_width}px;
                top: {top}px;
                left:{left}px;
                transform: translate(0%, -50%) rotate({angle}deg);
                "
        ></div>
        <div
            class="pointer-words"
            style="
                top: {end_y}px;
                left:{end_x}px;
                transform: translate({trans.x}%, {trans.y}%);
                "
        >
            {opt_name ? opt_name : props.name}
        </div>
</div>
    {/if}
{/if}

<style>
    @import url('https://fonts.googleapis.com/css2?family=Cedarville+Cursive&display=swap');

    .dot,.line,.label{
        box-shadow:  0.1px 0.2px 0.2px hsl(0deg 0% 0% / 0.1),
    0.4px 0.8px 0.9px -0.5px hsl(0deg 0% 0% / 0.09),
    0.8px 1.4px 1.6px -1px hsl(0deg 0% 0% / 0.09),
    1.4px 2.5px 2.8px -1.5px hsl(0deg 0% 0% / 0.08),
    2.3px 4.3px 4.8px -1.9px hsl(0deg 0% 0% / 0.07),
    3.8px 7.1px 8px -2.4px hsl(0deg 0% 0% / 0.07),
    6px 11.1px 12.5px -2.9px hsl(0deg 0% 0% / 0.06),
    9.1px 16.8px 18.9px -3.4px hsl(0deg 0% 0% / 0.05);
;
    }
    .dot {
        z-index:2;
        height: 8px;
        width: 8px;
        background-color: #7597ae;
        position: absolute;
        transform: translate(-50%, -50%);
        border-radius: 50%;
    }
    .line {
        z-index:1;
        height: 3px;
        background-color: #7597ae;
        position: absolute;
        transform-origin: center left;
    }
    .label {
        z-index:1;
        /* border: #7597ae solid 1px; */
        /* border-radius: 5px; */
        position: absolute;
        background-color: white;
        font-size: 13px;
        background: rgba(255, 255, 255, 1);
        padding: 8px;
        z-index: 15;
        min-width: 180px;
    }
    .label-words {
        font-size: 40px;
        color: white;
        font-family: "Cedarville Cursive", cursive;
        font-weight: 400;
        font-style: normal;
        position: absolute;
        transform: translate(-50%, -50%);
        line-height: 40px;
    }

    .pointer-words {
        padding: 0 4px;
        position: absolute;
        font-size: 18px;
        color: black;
        width: 100px;
        text-shadow:
            1px 1px 0 #fff,
            -1px 1px 0 #fff,
            2px 0 0 #fff,
            -2px 0 0 #fff;
    }

</style>
