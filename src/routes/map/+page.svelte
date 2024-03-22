<script>
    import { onMount } from "svelte";
    import { geoPath, geoAlbersUsa } from "d3-geo";
    import { draw } from "svelte/transition";
    import { writable } from "svelte/store";

    const data_prefix =
        "https://raw.githubusercontent.com/coleschnell/portfolio_website/main";

    let width = 1000,
        height = 1000;

    let m = { x: 0, y: 0 };

    let tracts = [];
    let roads = [];
    let nbh = [];
    let colors = [];
    let colorful_neighborhoods = [];
    let path, projection;
    let hovered = false;
    let respondent_email, respondent_name;
    let add_new = false;
    let new_neighborhood;
    const cn = writable([]);

    let tooltip = { width: 500, height: 500 };

    let paintbrush = {
        name: "Not in a neighborhood",
        color: "#507e99",
        fill: "solid",
    };

    onMount(async () => {
        const shelby = await fetch(
            "/src/routes/map/_data/memphis_data_extra.GeoJSON",
        ).then((d) => d.json());

        projection = geoAlbersUsa().fitSize([width, height], shelby);
        path = geoPath().projection(projection);

        tracts = shelby.features.map((tract) => ({ ...tract, paintbrush }));

        tracts = tracts.map((tract) => {
            if (tract.properties.pop_tract === "0") {
                tract.paintbrush = {
                    name: "Not in a neighborhood",
                    color: "#507e99",
                    fill: "stripe",
                };
            }
            if (tract.properties.TRACTCE === "980402") {
                tract.paintbrush.name = "Shelby Farms";
                tract.paintbrush.color = "green";
            }
            return tract;
        });

        const shelby_roads = await fetch(
            data_prefix + "/src/routes/map/_data/shelby_roads.GeoJSON",
        ).then((d) => d.json());
        roads = shelby_roads.features;

        const neighborhoods = await fetch(
            data_prefix + "/src/routes/map/_data/neighborhoods.json",
        ).then((d) => d.json());
        nbh = neighborhoods;

        const get_colors = await fetch(
            data_prefix + "/src/routes/map/_data/colors.json",
        ).then((d) => d.json());
        colors = get_colors;

        colorful_neighborhoods = nbh.map((name, index) => {
            return { name: name, color: colors[index], fill: "solid" };
        });
        colorful_neighborhoods.push({
            name: "Not in a neighborhood",
            color: "#507e99",
            fill: "solid",
        });

        cn.set(colorful_neighborhoods);

        // console.log(roads.map((road) => {
        //     return road.properties.prefix + "-" + road.properties.number
        // }))
    });

    let roads_dictionary = {
        "US-79": "Summer Ave.",
        "US-70": "Poplar Ave.",
        "US-51": "Thomas St.",
        "US-72": "Winchester Rd.",
        "US-64": "Stage Rd.",
        "US-61": "Elvis Presley Blvd.",
        "US-78": "Lamar Ave.",
        "I-240": "I-240",
        "I-40": "I-40",
        "I-55": "I-55",
    };

    function mouseover(e, prop) {
        hovered = prop;
    }
    function mouseout() {
        hovered = false;
    }
    function mousemove(event) {
        m.x = event.clientX;
        m.y = event.clientY;
    }

    function change_color(e, neighborhood) {
        paintbrush = neighborhood;
    }

    function clean_results(tracts) {
        return tracts.map((tract) => {
            return {
                tract: tract.properties.TRACTCE,
                neighborhood: tract.paintbrush.name,
            };
        });
    }

    function formatNumber(number) {
        if (number < 0) {
            return "NA"; // Return NaN if number is less than zero
        } else {
            return Number(number).toLocaleString(); // Return the number itself otherwise
        }
    }

    function add_new_neighborhood() {
        colorful_neighborhoods.push({
            name: new_neighborhood,
            color: colors[colorful_neighborhoods.length - 2],
        });
        cn.set(colorful_neighborhoods);
        new_neighborhood = "";
    }

    // on:click tract paint & add to survey results & remove from survey results

    // submit to somewhere
</script>

<header>
    <h1>Paint by <s>Numbers</s> Neighborhoods: Memphis Edition</h1>
    <p>
        Click on a neighborhood (or add neighborhood and then click) on the
        right and then click on Census tract on the left to color in that tract.
        Color in neighborhoods until satisfied. At the bottom of the page, fill in name and email, and
        click submit. An email should pop-up: add any notes at the top, and hit
        send. Thanks for your help on my project.
    </p>
</header>

<div class="container">
    <div on:mousemove={(e) => mousemove(e)} class="map">
        <!-- svelte-ignore a11y-mouse-events-have-key-events -->
        <svg viewBox="0 0 1000 1000" on:mouseout={() => mouseout()}>
            <defs>
                <pattern
                    id="diagonal-stripe-2"
                    patternUnits="userSpaceOnUse"
                    width="10"
                    height="10"
                >
                    <image
                        xlink:href="data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPScxMCcgaGVpZ2h0PScxMCc+CiAgPHJlY3Qgd2lkdGg9JzEwJyBoZWlnaHQ9JzEwJyBmaWxsPSd3aGl0ZScvPgogIDxwYXRoIGQ9J00tMSwxIGwyLC0yCiAgICAgICAgICAgTTAsMTAgbDEwLC0xMAogICAgICAgICAgIE05LDExIGwyLC0yJyBzdHJva2U9J2JsYWNrJyBzdHJva2Utd2lkdGg9JzInLz4KPC9zdmc+"
                        x="0"
                        y="0"
                        width="10"
                        height="10"
                        opacity="0.4"
                    >
                    </image>
                </pattern>
                <pattern
                    id="diagonal-stripe-green"
                    patternUnits="userSpaceOnUse"
                    width="10"
                    height="10"
                >
                    <image
                        xlink:href="data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPScxMCcgaGVpZ2h0PScxMCc+CiAgPHJlY3Qgd2lkdGg9JzEwJyBoZWlnaHQ9JzEwJyBmaWxsPSd3aGl0ZScvPgogIDxwYXRoIGQ9J00tMSwxIGwyLC0yCiAgICAgICAgICAgTTAsMTAgbDEwLC0xMAogICAgICAgICAgIE05LDExIGwyLC0yJyBzdHJva2U9JyMyMjhCMjInIHN0cm9rZS13aWR0aD0nMicvPgo8L3N2Zz4="
                        x="0"
                        y="0"
                        width="10"
                        height="10"
                        opacity="0.4"
                    >
                    </image>
                </pattern>

            </defs>
            <!-- Tracts -->
            <g>
                {#each tracts as feature, i}
                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                    <path
                        d={path(feature)}
                        class="tract"
                        style="fill: {feature.paintbrush.color}"
                        on:mouseover={(e) => mouseover(e, feature.properties)}
                        on:click={() => (feature.paintbrush = paintbrush)}
                    />
                {/each}
                {#each tracts.filter((tract) => tract.paintbrush.fill === "stripe" && tract.paintbrush.color !== "green") as feature, i}
                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                    <path
                        d={path(feature)}
                        class="tract"
                        style="fill: url(#diagonal-stripe-2)"
                        on:mouseover={(e) => mouseover(e, feature.properties)}
                    />
                {/each}
                {#each tracts.filter((tract) => tract.paintbrush.fill === "stripe" && tract.paintbrush.color === "green") as feature, i}
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <path
                    d={path(feature)}
                    class="tract"
                    style="fill: url(#diagonal-stripe-green)"
                    on:mouseover={(e) => mouseover(e, feature.properties)}
                />
                {/each}
            </g>
            <!-- Roads -->
            <g fill="none" stroke="white">
                {#each roads as feature, i}
                    <path
                        d={path(feature)}
                        class="roads"
                        on:mouseover={(e) => mouseover(e, feature.properties)}
                    />
                {/each}
            </g>
        </svg>
        <!-- top: {m.y -
            (tooltip.height / 2 + 150)}px; left:{m.x -
            tooltip.width / 2}px" -->
        {#if hovered}
            <div
                class="tooltip card"
                style="height: {tooltip.height}; width: {tooltip.width}; top: 50px; left: 20px;">
                {#if hovered.TRACTCE}
                    {#if hovered.TRACTCE == "980402"}
                        <p><b>Census Tract #{hovered.TRACTCE}</b></p>
                        <p><b>Shelby Farms</b></p>
                    {:else if hovered.pop_tract == 0}
                        <p><b>Census Tract #{hovered.TRACTCE}</b></p>
                        <p><b>Population zero.</b></p>
                    {:else}
                        <p><b>Census Tract #{hovered.TRACTCE}</b></p>
                        <p>
                            <b>Pop:</b>
                            {formatNumber(hovered.pop_tract)} residents
                        </p>
                        <p>
                            <b>Median age:</b>
                            {formatNumber(hovered.med_age_tract)} y/o
                        </p>
                        <p>
                            <b>Average household size:</b>
                            {formatNumber(hovered.household_size)} members
                        </p>
                        <p>
                            <b>Median income:</b> ${formatNumber(
                                hovered.med_income_tract,
                            )}
                        </p>
                        <p>
                            <b>Average commute to work:</b>
                            {formatNumber(hovered.commute_to_work)} min.
                        </p>
                        {#if hovered.library}
                            <p><b>Library:</b> {hovered.library.replace(",", ", ")}</p>
                        {/if}
                        {#if hovered.largest_park}
                        <p><b>Largest park:</b> {hovered.largest_park}</p>
                        {/if}
                        {#if hovered.hospital}
                        <p><b>Hospital:</b> {hovered.hospital.replace(",", ", ")}</p>
                        {/if}
                        {#if hovered.planning_district}
                        <p><b>Memphis 3.0 planning district(s):</b> {hovered.planning_district.replace(",", ", ")}</p>
                        {/if}
                        {#if hovered.community_org}
                        <p><b>Community Organization(s):</b> {hovered.community_org.replace(",", ", ")}</p>
                        {/if}  
                    {/if}
                {:else}
                    <p>
                        <b
                            >{hovered.prefix +
                                "-" +
                                hovered.number +
                                (roads_dictionary[
                                    hovered.prefix + "-" + hovered.number
                                ][0] != "I"
                                    ? " / " +
                                      roads_dictionary[
                                          hovered.prefix + "-" + hovered.number
                                      ]
                                    : "")}</b
                        >
                    </p>
                {/if}
            </div>
        {/if}
    </div>

    <div class="neighborhoods">
        <ul>
            {#each $cn as neighborhood}
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <li
                    class="card {paintbrush == neighborhood ? 'selected' : ''}"
                    on:click={(e) => change_color(e, neighborhood)}
                >
                    <div
                        class="color"
                        style="background-color: {neighborhood.color};"
                    ></div>
                    <p>{neighborhood.name}</p>
                </li>
            {/each}
        </ul>

        <div class="input-container">
            <input
                bind:value={new_neighborhood}
                type="text"
                id="neigh"
                placeholder="Neighborhood"
            />
            <button on:click={() => add_new_neighborhood()}>Add</button>
        </div>
    </div>
</div>

<div class="input-container">
    <input
        bind:value={respondent_name}
        type="text"
        id="name"
        name="name"
        placeholder="Name"
    />
    <input
        bind:value={respondent_email}
        type="email"
        id="email"
        name="email"
        placeholder="Email"
    />
    <a
        class="button"
        href="mailto:cschnell@bizjournals.com?cc={respondent_email
            ? respondent_email
            : ''}&subject=Survey%20Results%20{respondent_name
            ? 'for ' + respondent_name
            : ''}&body={JSON.stringify(clean_results(tracts))}">Submit</a
    >
</div>

<footer>
    <p>Source(s): U.S. Census; Natural Earth</p>
    <a
        href="mailto:cschnell@bizjournals.com?subject=Reporting%20an%20Issue&body=Dear%20Support%2C%0A%0AI%20would%20like%20to%20report%20an%20issue%20I%20encountered%20while%20using%20your%20service.%0A%0AIssue%20Description%3A%20%0A%0ASteps%20to%20Reproduce%3A%20%0A%0AAdditional%20Information%3A%20%0A%0AThank%20you%20for%20your%20assistance.%0A%0AKind%20regards%2C%0A[Your%20Name]"
        >Report an Issue</a
    >
</footer>

<style>
    * {
        margin: 0;
        padding: 0;
    }

    header {
        padding: 20px;
    }

    .container {
        display: flex;
        gap: 50px; 
    }

    .map {
        position: relative;
        width: 50%;
        height: 100%;
    }

    .neighborhoods {
        display: flex;
        align-items: flex-start;
        justify-content: center;
        width: 44%;
        flex-direction: column-reverse;
        gap: 20px;
        height: 80vh;
        margin-bottom: 30px;
    }

    .neighborhoods > ul {
        display: flex;
        gap: 10px;
        flex-wrap: wrap;
        overflow-y: scroll;
    }

    .neighborhoods > ul > li {
        height: 50px;
        width: 150px;
        padding: 10px;
        margin: 2px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 20px;
    }

    .neighborhoods > ul > li > p {
        width: 70%;
    }

    .neighborhoods > ul > li:hover {
        cursor: pointer;
    }

    .neighborhoods > ul > li.selected {
        border: black 2px solid;
        margin: 0;
    }

    .color {
        height: 20px;
        width: 20px;
    }

    .tract {
        stroke: white;
        stroke-width: 1.5;
    }

    .tract:hover {
        cursor: pointer;
    }

    .roads {
        fill: none;
        stroke: #1a3d7f;
        stroke-width: 4;
        opacity: 1;
    }

    .roads:hover {
        stroke: black;
    }

    .tooltip {
        position: absolute;
        background-color: white;
        width: 200px;
        z-index: 1;
        display: flex;
        justify-content: center;
        flex-direction: column;
    }

    .tooltip > p {
        padding: 5px;
    }

    .card {
        box-shadow:
            rgba(0, 0, 0, 0.12) 0px 1px 3px,
            rgba(0, 0, 0, 0.24) 0px 1px 2px;
    }

    .input-container {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 25px;
    }

    .button {
        padding: 10px 20px;
        border: 2px solid #17202a;
        background-color: rgba(0, 0, 0, 0);
        cursor: pointer;
        border-radius: 3px;
        height: 40px;
        color: black;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 150px;
        font-size: 20px;
    }

    .button:hover {
        background-color: #1b2631;
        color: white;
    }

    input {
        padding: 10px 20px;
        border: 2px solid #17202a;
        background-color: rgba(0, 0, 0, 0);
        border-radius: 3px;
        height: 40px;
        color: black;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 150px;
        font-size: 20px;
    }

    button {
        height: 64px;
        padding: 10px 10px;
    }

    #email {
        width: 500px;
    }

    #name {
        width: 300px;
    }

    #neigh {
        width: 300px;
    }

    footer {
        padding: 20px;
        display: flex;
        justify-content: space-between;
    }
</style>
