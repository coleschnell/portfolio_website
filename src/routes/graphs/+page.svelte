<script>
    import { onMount } from 'svelte';

    

    onMount(() => {
        let chart_params = {
            'title' : 'Bank deposits for Memphis-based community banks',
            'subhead' : 'null',
            'source' : 'FDIC',
            'notes' : 'Shaded area show the COVID-19 recession',
            'height' : "400px"
        }

        function objectToUrlParams(obj) {
            const params = [];

            for (const key in obj) {
                params.push(`${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`);
            }

            return params.join('&');
        }

        let chart = document.getElementById('chart')
        let src = chart?.getAttribute('src')
        let url = encodeURI(src + '/?' + objectToUrlParams(chart_params))  //'/?title=' + title)
        chart?.setAttribute('src', url)  

        chart?.setAttribute('title', chart_params.title ? chart_params.title : 'Untitled')
        chart?.setAttribute('height', chart_params.height ? chart_params.height : "300px")
    })


</script>


<div>
<iframe
    title="Untitled"
    id="chart"
    aria-label="Chart"
    src="http://localhost:5173/graphs/memphis-based-banks"
    scrolling="no"
    frameborder="0"
    style="width: 0; min-width:100% !important; border: none;"
    height="400px"
    data-external="1"
></iframe>

Lorem ipsum dolor sit amet consectetur adipisicing elit. Et illo, deserunt consequatur dignissimos blanditiis eaque tenetur provident illum error laboriosam cupiditate similique commodi ipsa voluptates ducimus magnam laudantium velit labore? Soluta dolorem ullam quidem iusto nobis, aspernatur dolor maxime, culpa numquam, id sit exercitationem odit enim quaerat asperiores impedit quas!
</div>


<style>
    div{
        width:612px
    }
</style>

