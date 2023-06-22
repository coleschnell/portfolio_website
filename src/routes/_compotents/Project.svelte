<script>
    import Carousel from "./Carousel.svelte";
    let computer = true;

    export let images;
    export let address;
    export let title;
    export let description;
    export let stack;
    
</script>

<div class="container">
<div class="words">
    <h1><a href="{address}">{title}</a></h1>
    <ul class="stack">
        {#each stack as item}
        <li><img src="{item.image}" alt="{item.name}"></li>
        {/each}
    </ul>
    <ul>
        {#each description as item}
        <li>{item}</li>
        {/each}
    </ul>
</div>

<div class="buttons">

    <button
        on:click={() => computer = true}
        class="first { computer ? 'active' : '' }"
    >
        <span class="material-symbols-outlined">
            computer
            </span>
    </button>
    <button
        on:click={() => computer = false}
        class="last { !computer ? 'active' : '' }"
    >
        <span class="material-symbols-outlined">
        smartphone
        </span>
    </button>

</div>

<div class="carosel flex">

    <Carousel 
    pc = {computer}
    address = {address}
    images = {images}
    />

</div>

</div>

<style lang="sass">

    .container
        display: grid
        grid-template-columns: 1fr 1fr 50px
        grid-template-rows: 50px 1fr
        grid-template-areas: "words buttons nothing" "words carosel carosel"
        padding: 100px 0 0 0
        height: max(1000px, 80vh)
        .words
            grid-area: words
            display: flex
            flex-direction: column
            justify-content: start
            align-items: center
            gap: 30px
            width: 400px
            padding: 50px 0 0 0
            .stack
                list-style: none
                display: flex
                flex-direction: row
                justify-content: center
                align-items: center
                flex-wrap: wrap
                width: 100%
                gap: 20px
                img
                    height: 50px
                    width: auto
        .buttons
            grid-area: buttons
            display: flex
            flex-direction: row
            justify-content: center
            align-items: center
            gap: 1px
        .carosel
            grid-area: carosel

@media (max-width: 800px)
    .container
            display: flex
            flex-direction: column
            justify-content: start
            align-items: center
            gap: 10px
            padding: 30px 0 0 0
            .words
                padding: 0
                width: 100%

</style>