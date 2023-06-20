<script>
    import Nav from "./_compotents/Nav.svelte";
    import Footer from "./_compotents/Footer.svelte";

</script>

   
<div class="body">

    <Nav />

   <article>

        <slot />

    </article>

    <Footer />

</div>



<style lang="sass">

    $primary: red

    *
        margin: 0
        padding: 0

    .body
        width: 100%
        position: absolute
        top: 0
        left: 0
        background-image: linear-gradient(to bottom right, #F9E79F, #6C3483)

    article
        grid-area: main
        width: 100%
        position: relative
        top: 0
        left: 0



</style>

