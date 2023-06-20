
<script>
    import { fly } from "svelte/transition";

    export let pc = false;

    export let images = [{mobile:"src/routes/_assets/detour_phone_1.jpg", pc:"src/routes/_assets/detour_pc_1.jpg"}, {mobile:"src/routes/_assets/detour_phone_2.jpg", pc:"src/routes/_assets/detour_pc_2.jpg"}]

    let i = 0

    $: current_image = images[i]

    let width;

    let direction = "down";

    export let address = "lostinbuckeye.com"

</script>
<div class="body">

<div class="buttons flex">

    
    <button
    on:click={() => direction = "up"}
    on:click={() => i == images.length - 1 ? i = 0 : i = i + 1}
    on:keydown={() => i == images.length - 1 ? i = 0 : i = i + 1}
    >
    <span class="material-symbols-outlined">
        arrow_upward
        </span>
    </button>
    <button
    on:click={() => direction = "down"}
    on:click={() => i == 0 ? i = images.length - 1 : i = i - 1}
    on:keydown={() => i == 0 ? i = images.length - 1 : i = i - 1}
    >
    <span class="material-symbols-outlined">
        arrow_downward
        </span>
    </button>
</div>

    {#each ["pc", "mobile"] as device}

    {#if pc && device == "pc" || !pc && device == "mobile"}

    {#each images as image}

    {#if image == current_image}
    <div class="image"
    in:fly="{{y: direction === "up" ? 100 : -100, delay: 500, duration: 300}}" 
    out:fly="{{y: direction === "up" ? -100 : 100, duration: 300}}"
    >
        {#if pc}
        <ul class="browser"
        style="width: {width - 4}px;"
        >
            <li>
                <span class="material-symbols-outlined">
                    chevron_left
                </span>
            </li>
            <li>
                <span class="material-symbols-outlined">
                    chevron_right
                </span>
            </li>
            <li>
                <span class="material-symbols-outlined">
                    refresh
                </span>
            </li>
            <li class="addressbox">
                {address}
            </li>
            <li>
                <span class="material-symbols-outlined"
                style="transform: translateY(-7px);"
                >
                    minimize
                </span>
            </li>
            <li>
                <span class="material-symbols-outlined">
                    close
                </span>
            </li>
        </ul> 
        {/if}

        {#if !pc}
        <ul class="mobile browser"
        style="width: {width - 4}px;"
        >
            <li>
                <span class="material-symbols-outlined">
                    home
                    </span>
            </li>
            <li class="addressbox">
                {address}
            </li>
            <li>
                <span class="material-symbols-outlined">
                    more_vert
                </span>
            </li>
        </ul>

        {/if}

        <div bind:clientWidth={width}>
            <img
            class="{pc ? 'browser-border' : 'phone-border'}"
            src="{pc ? image.pc : image.mobile}" alt="">
        </div>

    </div>

    {/if}

{/each}

{/if}

{/each}

</div>

<style lang="sass">

    .body
        display: grid
        grid-template-columns: 500px 50px
        grid-template-rows: 1fr
        grid-template-areas: "image buttons"



    .buttons
        grid-area: buttons
        flex-direction: column
        button
            border: none
            background: none
            transition: all 0.3s ease-in-out
            &:hover
                color: #000
                transform: scale(1.3)
                transition: all 0.3s ease-in-out

    .image
        grid-area: image
        display: flex
        flex-direction: column
        justify-content: center
        align-items: center
        img
            max-width: 500px
            max-height: 400px
            object-fit: cover
            margin: 0
            padding: 0


    .browser
        height: 20px
        width: calc(100% - 1px)
        border-radius: 5px 5px 0 0
        border: 2px solid #000
        list-style: none
        display: flex
        flex-direction: row
        justify-content: start
        align-items: center
        span
            font-size: 20px
            padding: 0 3px
            margin: 0
            color: #000
            display: flex
            flex-direction: row
            justify-content: center
            align-items: center
        .addressbox
            width: 100%
            text-align: left
            font-size: 12px
            font-weight: 600
            color: #000
            letter-spacing: 1px
            padding: 0 0 0 5px
            margin: 0
            display: flex
            flex-direction: row
            justify-content: start
            align-items: end
            transform: translateY(2px)
            white-space: nowrap
            overflow: hidden
    .mobile
        .addressbox
            justify-content: start
            

            




</style>