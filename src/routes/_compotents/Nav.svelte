<script>
    import { fly } from "svelte/transition";

    let open = false

</script>


<div class="nav">
    <ul>
        <li
            on:click={() => open = !open}
            on:keydown={() => open = !open}
        ><span class="material-symbols-outlined">
            {#if !open}
            menu
            {/if}
            {#if open}
            close
            {/if}
        </span></li>
        <li><h2><a href="/">Cole Schnell</a></h2></li>
        <li><h2><a href="mailto:hey@coles.dev">Let's talk!</a></h2></li>
    </ul>

    {#if open}
    <ul class="dropdown">
        {#each ["About", "Projects", "Articles", "Contact"] as item, i}
        <li
         in:fly="{{y: -100 * i, duration: 500, delay: 100}}"
         out:fly="{{y: -100 * i, duration: 500, delay: 100}}"
        >
            <h2><a href="#{item.toLowerCase()}">{item}</a></h2>
        </li>
        {/each}
    </ul>
    {/if}
</div>



<style lang="sass">

    .nav
        width: 100%
        height: 50px
        position: fixed
        z-index: 1
        backdrop-filter: blur(10px)

    ul
        display: flex
        flex-direction: column
        justify-content: space-between
        align-items: center
        flex-direction: row
        list-style: none
        padding: 0 20px 0 20px
        height: 100%

    .material-symbols-outlined
        cursor: pointer

    .dropdown
        flex-direction: column
        align-items: start
        height: 10rem
        a
            transition: all 0.5s ease-in-out
            font-size: 1.5rem
            &:hover
                font-size: 1.7rem
                transition: all 0.5s ease-in-out
        



</style>