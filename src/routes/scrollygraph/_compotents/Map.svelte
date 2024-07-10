<script>
    import { onMount } from "svelte";
    import { geoPath, geoAlbersUsa } from "d3-geo";
    import { feature } from "topojson";
    import { tweened } from "svelte/motion";
    import { cubicOut } from "svelte/easing";
    import { createEventDispatcher } from "svelte";
    import Highlight from "./Highlight.svelte";

    export let step = 0;
    export let sticky;

    const data_prefix = "";

    const tweenOptions = {
        delay: 0,
        duration: 1000,
        easing: cubicOut,
    };

    let width = 100,
        height = 100,
        projection,
        counties = [],
        states = [],
        path,
        point,
        map,
        map_height,
        p,
        point_elements = {},
        highlight_props,
        innerWidth,
        ox = tweened(598, tweenOptions),
        oy = tweened(376, tweenOptions),
        w = tweened(20, tweenOptions),
        h = tweened(20, tweenOptions);

    function change_viewBox(new_ox, new_oy, new_w, new_h) {
        ox.set(new_ox);
        oy.set(new_oy);
        w.set(new_w);
        h.set(new_h);
    }

    function zoom_level(level) {
        if (level == "us") {
            change_viewBox(0, -100, 1000, 700);
        }
        if (level == "midsouth") {
            change_viewBox(560, 350, 100, 100);
        }
        if (level == "local") {
            change_viewBox(598, 376, 20, 20);
        }
        if (level == "nashville") {
            change_viewBox(580, 335, 160, 160);
        }
    }

    export let color;

    const dispatch = createEventDispatcher();

    // const color = scaleQuantize([-200, 200], schemeBlues[9]);

    onMount(async () => {
        const us = await fetch(
            "https://cdn.jsdelivr.net/npm/us-atlas@3/counties-albers-10m.json",
        ).then((d) => d.json());

        const flows = await fetch(
            "https://cdn.jsdelivr.net/gh/coleschnell/portfolio_website@master/src/routes/scrollygraph/_assets/flow_15y.json",
        ).then((d) => d.json());

        projection = geoAlbersUsa().fitSize([width, height], us);
        path = geoPath();

        const state_abbreviations_fips = {
            "01": "Ala.",
            "02": "Alaska",
            "04": "Ariz.",
            "05": "Ark.",
            "06": "Calif.",
            "08": "Colo.",
            "09": "Conn.",
            "10": "Del.",
            "12": "Fla.",
            "13": "Ga.",
            "15": "Hawaii",
            "16": "Idaho",
            "17": "Ill.",
            "18": "Ind.",
            "19": "Iowa",
            "20": "Kan.",
            "21": "Ky.",
            "22": "La.",
            "23": "Maine",
            "24": "Md.",
            "25": "Mass.",
            "26": "Mich.",
            "27": "Minn.",
            "28": "Miss.",
            "29": "Mo.",
            "30": "Mont.",
            "31": "Neb.",
            "32": "Nev.",
            "33": "N.H.",
            "34": "N.J.",
            "35": "N.M.",
            "36": "N.Y.",
            "37": "N.C.",
            "38": "N.D.",
            "39": "Ohio",
            "40": "Okla.",
            "41": "Ore.",
            "42": "Pa.",
            "44": "R.I.",
            "45": "S.C.",
            "46": "S.D.",
            "47": "Tenn.",
            "48": "Texas",
            "49": "Utah",
            "50": "Vt.",
            "51": "Va.",
            "53": "Wash.",
            "54": "W.Va.",
            "55": "Wis.",
            "56": "Wyo.",
        };

        counties = feature(us, us.objects.counties).features.map((county) => {
            county.properties.movedin = flows.MOVEDIN[county.id]
                ? flows.MOVEDIN[county.id]
                : 0;
            county.properties.movedout = flows.MOVEDOUT[county.id]
                ? flows.MOVEDOUT[county.id]
                : 0;
            county.properties.movednet = flows.MOVEDNET[county.id]
                ? flows.MOVEDNET[county.id]
                : 0;
            county.properties.state = state_abbreviations_fips[county.id.slice(0,2)]
            county.properties.point = path.centroid(county);
            return county;
        });

        states = feature(us, us.objects.states).features;

        highlight_props = [
            {
                id: "47157",
                init_step: 0,
                init_ox: 598,
                style: "label",
                name: "Shelby Co.",
            },
            {
                id: "28033",
                init_step: 0,
                init_ox: 598,
                style: "label",
                name: "DeSoto Co.",
            },
            {
                id: "28137",
                init_step: 0,
                init_ox: 598,
                style: "label",
                name: "Mississippi",
            },
            {
                id: "47157",
                init_step: 2,
                init_ox: 560,
                angle: -165,
                name: "1. Shelby County, Tenn.",
            },
            {
                id: "28027",
                init_step: 3,
                init_ox: 560,
                angle: -165,
                name: "2. Coahoma County, Miss.",
            },
            {
                id: "28143",
                init_step: 3,
                init_ox: 560,
                angle: 25,
                line_width: 100,
                name: "3. Tunica County, Miss.",
            },
            {
                id: "28133",
                init_step: 3,
                init_ox: 560,
                angle: 25,
                name: "4. Sunflower County, Miss.",
            },
            {
                id: "34003",
                init_step: 4,
                init_ox: 0,
                angle: -150,
                name: "5. Bergen County, N.J.",
            },
            {
                id: "28105",
                init_step: 6,
                init_ox: 580,
                angle: 10,
                name: "1. Oktibbeha County, Miss.",
            },
            {
                id: "47037",
                init_step: 7,
                init_ox: 580,
                angle: 91,
                name: "2. Davidson County, Tenn.",
            },
            {
                id: "28093",
                init_step: 8,
                init_ox: 580,
                angle: 44,
                name: "3. Marshall County, Miss.",
            },
            {
                id: "28059",
                init_step: 8,
                init_ox: 580,
                angle: 0,
                name: "4. Jackson County, Miss.",
            },
            {
                id: "47035",
                init_step: 8,
                init_ox: 580,
                angle: 46,
                name: "5. Cumberland County, Tenn.",
            },
            {
                id: "02020",
                init_step: 9,
                init_ox: 0,
                angle: -30,
                name: "Anchorage Municipality, Alaska",
            },
        ];
    });

    function handleMousemove(feature) {
        return function handleMousemoveFn(e) {
            // When the element gets raised, it flashes 0,0 for a second so skip that
            if (e.layerX !== 0 && e.layerY !== 0) {
                dispatch("mousemove", {
                    e,
                    props: feature.properties,
                    id: feature.id,
                });
            }
        };
    }

    $: {
        if (step >= 1 && step <= 3) {
            zoom_level("midsouth");
        }
        if (step == 0) {
            zoom_level("local");
        }
        if (step == 4) {
            zoom_level("us");
        }
        if (step >= 5 && step <= 8) {
            zoom_level("nashville");
        }
        if (step >= 9) {
            zoom_level("us");
        }
    }

    // lines + dots

</script>


<svelte:window bind:innerWidth />

<!-- <button on:click={() => (step = step - 1)}>last step</button>
<button on:click={() => (step = step + 1)}>next step</button> -->

<!-- {#each Object.entries(point_elements) as [id, p]}
    {@const props = highlight_props.filter((x) => x.id == id)[0]} -->

<!-- svelte-ignore a11y-mouse-events-have-key-events -->
<div bind:clientHeight={map_height}>
    <svg
        id="map"
        viewBox="{$ox} {$oy} {$w} {$h}"
        on:mouseout={() => dispatch("mouseout")}
    >
        <g>
            {#each states.filter((state) => state.id == "28") as feature, i}
                <path
                    d={path(feature)}
                    class="state"
                    fill="#b9c9d5"
                    fill-opacity={step == 0 || step == undefined ? 1 : 0}
                />
            {/each}
            {#each counties as feature, i}
                {@const desoto = feature.id == "28033"}
                {@const shelby = feature.id == "47157"}
                <path
                    d={path(feature)}
                    class={desoto ? "desoto" : "county"}
                    stroke-opacity={desoto
                        ? 1
                        : shelby && (step == 0 || step == undefined)
                          ? 1
                          : step < 1 || step == undefined
                            ? 0
                            : 1}
                    fill-opacity={desoto
                        ? 1
                        : shelby && (step == 0 || step == undefined)
                          ? 1
                          : step < 1 || step == undefined
                            ? 0
                            : 1}
                    fill={desoto
                        ? "#256788"
                        : shelby && (step < 1 || step == undefined)
                          ? "#b9c9d5"
                          : feature.properties.movednet == 0
                            ? "#D3D3D3"
                            : color(feature.properties.movednet)}
                    on:mouseover={(e) =>
                        dispatch("mousemove", {
                            e,
                            props: feature.properties,
                            id: feature.id,
                        })}
                    on:mousemove={handleMousemove(feature)}
                    role="tooltip"
                />
            {/each}
            {#each states as feature, i}
                <path
                    d={path(feature)}
                    class="state"
                    fill="none"
                    style="stroke-width: {step == 0 ? 0.4 : 0.6};"
                />
            {/each}
        </g>

        {#if highlight_props}
            <g>
                {#each counties.filter((county) => highlight_props
                        .map((x) => x.id)
                        .includes(county.id)) as county, index}
                    <circle
                        cx={county.properties.point[0]}
                        cy={county.properties.point[1]}
                        r="0"
                        bind:this={point_elements[county.id]}
                    />
                {/each}
            </g>
        {/if}
    </svg>
</div>

{#if highlight_props}
    {#each highlight_props as props}
        {@const ele = point_elements[props.id]}
        <Highlight
            {color}
            p={ele}
            {ox}
            step={step == undefined ? 0 : step}
            {sticky}
            opt_name={props.name ? props.name : undefined}
            style={props.style ? props.style : (innerWidth > 1200 ?  "infoblurb" : "pointer")}
            init_ox={props.init_ox || props.init_ox == 0
                ? props.init_ox
                : undefined}
            init_step={props.init_step || props.init_step == 0
                ? props.init_step
                : undefined}
            angle={props.angle ? props.angle : undefined}
            line_width={props.line_width ? props.line_width : undefined}
            prefix={props.prefix ? props.prefix : undefined}
            props={counties.filter((county) => county.id == props.id)[0]
                .properties}
        />
    {/each}
{/if}

<style>
    .county {
        stroke: white;
        stroke-width: 0.1;
        transition: all 1s ease-out;
    }
    .state {
        stroke: white;
        transition: all 1s ease-out;
    }
    .desoto {
        z-index: 10;
        stroke: white;
        stroke-width: 0.3;
        stroke-opacity: 1;
        box-shadow:
            rgba(0, 0, 0, 0.4) 0px 2px 4px,
            rgba(0, 0, 0, 0.3) 0px 7px 13px -3px,
            rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
    }
    .more-info-text {
        position: absolute;
        left: 50%;
        transform: translatex(-50%);
        font-family: "Graphik Web", "Helvetica Neue", Helvetica, Arial,
            sans-serif;
        font-size: 13px;
        font-weight: bold;
        border: none;
    }
</style>
