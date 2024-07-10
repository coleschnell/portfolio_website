<script>
	import { format } from "d3";
	
	export let colorScale;
	export let title;
	export let tickFormat;
	export let marginTop = 18;
    export let marginLeft = 0;
	export let n = 256; // number of color-levels in legend	
	let width = 1; // width of color-rects inside legend
	
	// create ticks-array
	let ticks = colorScale.ticks(3);

	let innerWidth;

	// distance between each tick label to go from exactly
	// one end to exactly the other end
	let distance = n * width / (ticks.length - 1)
</script>

<svelte:window bind:innerWidth />

<div class="container" style="top: {innerWidth > 1200 ? "10px" : "-80px"}; right: {innerWidth > 1200 ? "10px" : "0"};">
<svg viewBox="-15 -25 285 70">
<!-- Position Legend inside the main SVG -->
<g>
	<!-- Add legend title -->
	<text
		x={marginLeft}
		y={marginTop - 25}
		font-weight="bold"
	>
		{title}
	</text>

	<!-- Add color gradient -->
	{#each Array(n) as _, index}
		{@const color = colorScale.interpolator()(index / (n - 1))} 
		<rect
			x={index * width}
			y="0"
			width={width}
			height="15"
			fill={color}
			stroke={color}
			/>
	{/each}

	<!-- Add ticks -->
	{#each ticks as tick, i}
		{@const xPosition = i * distance}
		
		<g transform="translate({xPosition}, 0)" text-anchor="middle">
			<line stroke="#000" y2="25" y1="0" />
			<text y="25" dy="1em">{format(tickFormat)(tick)}</text>
    </g>
	{/each}
</g>
</svg>
</div>

<style>
    .container{
        position: absolute;
        width: 250px;
        background-color: white;
        /* border: 1px solid #ccc; */
        font-size: 13px;
        /* background: rgba(255, 255, 255, 0.8); */
        padding: 0px;
        z-index: 15;
        height: 65px;
		/* border-radius: 5px; */
		box-shadow:  0.1px 0.2px 0.2px hsl(0deg 0% 0% / 0.1),
    0.4px 0.8px 0.9px -0.5px hsl(0deg 0% 0% / 0.09),
    0.8px 1.4px 1.6px -1px hsl(0deg 0% 0% / 0.09),
    1.4px 2.5px 2.8px -1.5px hsl(0deg 0% 0% / 0.08),
    2.3px 4.3px 4.8px -1.9px hsl(0deg 0% 0% / 0.07),
    3.8px 7.1px 8px -2.4px hsl(0deg 0% 0% / 0.07),
    6px 11.1px 12.5px -2.9px hsl(0deg 0% 0% / 0.06),
    9.1px 16.8px 18.9px -3.4px hsl(0deg 0% 0% / 0.05);
    }

    text{
        font-family: 'Graphik Web', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    }

</style>