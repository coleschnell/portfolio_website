<script>
    import { line } from "d3";
    import { curveBasis } from "d3-shape";

    let data = [
        { x: 0, y: 80 },
        { x: 100, y: 100 },
        { x: 200, y: 30 },
        { x: 300, y: 50 },
        { x: 400, y: 40 },
        { x: 500, y: 80}
    ]

    let path = line()
        .x(d => d.x)
        .y(d => d.y)
        .curve(curveBasis);

    let pathData = path(data);


</script>

<div class="body">
    <svg>
        <path d={pathData} fill="none" stroke="black" />
    </svg>
</div>

<style lang="sass">

.body 
    height: 100vh
    width: 100px

svg 
    width: 100%
    height: 100%



</style>
