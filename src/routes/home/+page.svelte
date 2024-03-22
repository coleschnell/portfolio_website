<script>
    import { writable } from "svelte/store";
    import { fly } from "svelte/transition";
    import contact from "../_assets/contact";
    import Project from "../_compotents/Project.svelte";
    import articles from "../_assets/articles";

    const job = writable([
        {
            title: "Frontend Developer",
            visible: true
        }, 
        {
            title: "Data Journalist",
            visible: false
        }
    ]);

    const setJob = function(zerosum = true) {
        const jobs = ["Frontend Developer", "Data Journalist", "Reporter", "Economics Communicator", "Web Developer", "Writer", "Computional Journalist"];
        setTimeout(() => {
            zerosum = !zerosum;

            if (zerosum) {
                job.set([
                {
                    title: jobs.filter(d => d !== $job[1].title)[Math.floor(Math.random() * jobs.filter(d => d !== $job[1].title).length)],
                    visible: false 
                },
                {
                    title: $job[1].title,
                    visible: true
                }
            ])};

            if (!zerosum) {
                job.set([
                {
                    title: $job[0].title,
                    visible: true 
                },
                {
                    title: jobs.filter(d => d !== $job[0].title)[Math.floor(Math.random() * jobs.filter(d => d !== $job[1].title).length)],
                    visible: false
                }
            ])};

            setJob(zerosum);

            }, 1300);
    }

    setJob(true);

    let computer = false;

    let width = 1000;


</script>


<svelte:window bind:innerWidth={width} />
<div class="hero">

    <div class="left">
        <h1>
            Hey! I'm Cole. I'm a
        </h1>
    </div>

    <div class="right">
        <div class="job">
            {#if $job[0].visible}
                <h1 in:fly="{{y: width > 800 ? -100 : 0, x: width > 800 ? 0 : -100, delay: 500, duration: 300}}" out:fly="{{y: width > 800 ? 100 : 0, x: width > 800 ? 0 : 100, duration: 300}}">
                    {$job[0].title + "."}
                </h1>
            {/if}
            {#if $job[1].visible}
                <h1 in:fly="{{y: width > 800 ? -100 : 0, x: width > 800 ? 0 : -100, delay: 500, duration: 300}}" out:fly="{{y: width > 800 ? 100 : 0, x: width > 800 ? 0 : 100, duration: 300}}">
                    {$job[1].title + "."}
                </h1>
            {/if}
        </div>
    </div> 

</div>

<div class="jo">

    <div id="about">

        <div class="title">
            <h1>About</h1>
        </div>

        <div class="images">
            <picture>
                <source type="image/webp" srcset="https://raw.githubusercontent.com/cdemon12/portfolio_website/main/src/routes/_assets/cole.webp">
                <source type="image/jpeg" srcset="https://raw.githubusercontent.com/cdemon12/portfolio_website/main/src/routes/_assets/cole.jpg">
                <img src="https://raw.githubusercontent.com/cdemon12/portfolio_website/main/src/routes/_assets/cole.jpg" alt="Cole Schnell">
            </picture>
        </div>
        
        <div class="words">
            <h2>I'm Cole Schnell.</h2>

            <p>I am a data journalist with a Bachelor's degree in Journalism and Economics from the University of Missouri. I'm passionate about using data to tell intersectional and solutions-focused stories. I bring a unique perspective to my reporting, combining my background in both journalism and economics to shed light on pressing social and economic issues.</p>
            <p><a href="https://drive.google.com/u/0/uc?id=12dcKd6kKHVonv-jpZSVQNFVQ3mmhJSpd&export=download">Resume<span class="material-symbols-outlined download">download</span></a></p>

        </div>



    </div>

    <div id="projects">
        <h1>Projects</h1>

        <Project 
        address = {"https://lostinbuckeye.com"}
        images = {[{mobile:"src/routes/_assets/detour_phone_1", pc:"src/routes/_assets/detour_pc_1"}, {mobile:"src/routes/_assets/detour_phone_2", pc:"src/routes/_assets/detour_pc_2"}]}
        title={"Lost in Buckeye"}
        description={["Developed website for group reporting project on missing persons.","Scraped years of data from PDFs and HTML tables.","Analyzed the data and built an interactive dashboard."]}
        stack={[{name: "Svelte", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Svelte_Logo.svg/1702px-Svelte_Logo.svg.png"}, {name: "D3", image:"https://d3js.org/logo.svg"},{name: "R", image:"https://www.r-project.org/logo/Rlogo.svg"}, {name: "Sass", image: "https://sass-lang.com/assets/img/logos/logo-b6e1ef6e.svg"}, {name: "Mapbox", image: "data:image/svg+xml,%3Csvg xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22 viewBox%3D%220 0 790 180%22%3E%3Cpath d%3D%22M89.1 1.8C39.9 1.8 0 41.7 0 90.9 0 140.1 39.9 180 89.1 180c49.2 0 89.1-39.9 89.1-89.1 0-49.2-39.9-89.1-89.1-89.1zm457.8 19.7c-1.2 0-2.2 1-2.2 2.2v103.2c0 1.2 1 2.2 2.2 2.2h13.4c1.2 0 2.2-1 2.2-2.2v-7.1c6.9 7.2 16.4 11.3 26.3 11.3 20.9 0 37.9-18 37.9-40.3 0-22.3-17-40.2-37.9-40.2-10 0-19.5 4.1-26.3 11.3V23.7c0-1.2-1-2.2-2.2-2.2h-13.4zM98.3 36.4c11.4.3 22.9 4.8 31.7 13.7 17.7 17.7 18.3 45.7 1.4 62.7-30.5 30.5-84.8 20.7-84.8 20.7s-9.8-54.3 20.7-84.8c8.5-8.4 19.7-12.5 31-12.3zm160.3 14.2c-8.2 0-15.9 4-20.8 10.6v-6.4c0-1.2-1-2.2-2.2-2.2h-13.4c-1.2 0-2.2 1-2.2 2.2V127c0 1.2 1 2.2 2.2 2.2h13.4c1.2 0 2.2-1 2.2-2.2V83.8c.5-9.7 7.2-17.3 15.4-17.3 8.5 0 15.6 7.1 15.6 16.5v44c0 1.2 1 2.2 2.2 2.2h13.5c1.2 0 2.2-1 2.2-2.2l-.1-44.9c1.2-8.8 7.6-15.6 15.3-15.6 8.5 0 15.6 7.1 15.6 16.5v44c0 1.2 1 2.2 2.2 2.2h13.5c1.2 0 2.2-1 2.2-2.2l-.1-49.6c.3-14.8-12.3-26.8-27.9-26.8-10 .1-19.2 5.9-23.5 15-5-9.3-14.7-15.1-25.3-15zm127.9 0c-20.9 0-37.9 18-37.9 40.3 0 22.3 17 40.3 37.9 40.3 10 0 19.5-4.1 26.3-11.3v7.1c0 1.2 1 2.2 2.2 2.2h13.4c1.2 0 2.2-1 2.2-2.2V54.8c.1-1.2-.9-2.2-2.2-2.2H415c-1.2 0-2.2 1-2.2 2.2v7.1c-6.9-7.2-16.4-11.3-26.3-11.3zm106.1 0c-10 0-19.5 4.1-26.3 11.3v-7.1c0-1.2-1-2.2-2.2-2.2h-13.4c-1.2 0-2.2 1-2.2 2.2V158c0 1.2 1 2.2 2.2 2.2h13.4c1.2 0 2.2-1 2.2-2.2v-38.2c6.9 7.2 16.4 11.3 26.3 11.3 20.9 0 37.9-18 37.9-40.3 0-22.3-17-40.2-37.9-40.2zm185.5 0c-22.7 0-41 18-41 40.3 0 22.3 18.4 40.3 41 40.3s41-18 41-40.3c0-22.3-18.3-40.3-41-40.3zm45.4 2c-1.1 0-2 .9-2 2 0 .4.1.8.3 1.1l23 35-23.3 35.4c-.6.9-.4 2.2.6 2.8.3.2.7.3 1.1.3h15.5c1.2 0 2.3-.6 2.9-1.6l13.8-23.1 13.8 23.1c.6 1 1.7 1.6 2.9 1.6h15.5c1.1 0 2-.9 2-2 0-.4-.1-.7-.3-1.1L766 90.7l23-35c.6-.9.4-2.2-.6-2.8-.3-.2-.7-.3-1.1-.3h-15.5c-1.2 0-2.3.6-2.9 1.6l-13.5 22.7-13.5-22.7c-.6-1-1.7-1.6-2.9-1.6h-15.5zM99.3 54l-8.7 18-17.9 8.7 17.9 8.7 8.7 18 8.8-18 17.9-8.7-17.9-8.7-8.8-18zm290.3 12.7c12.7 0 23 10.7 23.2 23.9v.6c-.1 13.2-10.5 23.9-23.2 23.9-12.8 0-23.2-10.8-23.2-24.2 0-13.4 10.4-24.2 23.2-24.2zm99.8 0c12.8 0 23.2 10.8 23.2 24.2 0 13.4-10.4 24.2-23.2 24.2-12.7 0-23-10.7-23.2-23.9v-.6c.2-13.2 10.5-23.9 23.2-23.9zm96.3 0c12.8 0 23.2 10.8 23.2 24.2 0 13.4-10.4 24.2-23.2 24.2-12.7 0-23-10.7-23.2-23.9v-.6c.2-13.2 10.5-23.9 23.2-23.9zm92.2 0c12.8 0 23.2 10.8 23.2 24.2 0 13.4-10.4 24.2-23.2 24.2-12.8 0-23.2-10.8-23.2-24.2 0-13.4 10.4-24.2 23.2-24.2z%22 fill%3D%22%234264fb%22%2F%3E%3C%2Fsvg%3E%0A"}]}
        />

        <Project
        address={"https://columbiamissourian.vercel.app/missouri-syphilis-dashboard/"}
        images = {[{mobile:"src/routes/_assets/syphilis_phone_1", pc:"src/routes/_assets/syphilis_pc_1"}, {mobile:"src/routes/_assets/syphilis_phone_2", pc:"src/routes/_assets/syphilis_pc_2"}]}
        title={"Syphilis in Missouri: A scroll through seven years of data"}
        description={["A data visualization project that explores the rise of syphilis in Missouri from 2015 to 2022."]}
        stack={[{name: "Svelte", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Svelte_Logo.svg/1702px-Svelte_Logo.svg.png"}, {name: "D3", image:"https://d3js.org/logo.svg"},{name: "R", image:"https://www.r-project.org/logo/Rlogo.svg"}, {name: "Sass", image: "https://sass-lang.com/assets/img/logos/logo-b6e1ef6e.svg"}]}
        />

    </div>

    <div id="articles">

        <h1>Articles</h1>

        <ul>
            {#each articles as article}
                <li>
                    <a href="{article?.url}">{article?.title}</a>
                </li>
            {/each}
        </ul>


    </div>

    <div id="contact">

        <h1>Let's Talk!</h1>

        <div class="words">
            <p>I'm always looking for new opportunities to collaborate. If you have a project you'd like to work on, or just want to chat, feel free to reach out!</p>

        <ul> 
            {#each contact as icon}
                <li><a href="{icon?.url}"><ion-icon name="{icon?.icon}"></ion-icon></a></li>
            {/each}
        </ul>
    
        </div>

    </div>



</div>

<style lang="sass">

    .hero
        display: flex
        flex-direction: row
        justify-content: center
        align-items: center
        width: 100%
        height: 100vh
        gap: 10px

    .left, .right
        height: 100%
        width: calc(50% - 10px)
        display: flex
        align-items: center


    .left
        position: sticky
        justify-content: end

    .right
        justify-content: start

    .job
        position: relative
        display: flex
        flex-direction: column
        justify-content: center
        align-items: start
        width: 100%
        h1
            position: absolute

    .jo
        display: flex
        flex-direction: column
        justify-content: center
        align-items: center
        width: 80%
        margin: 0 auto
        padding-top: 100px

    #about
        display: grid
        grid-template-columns: 1fr 1fr
        grid-template-rows: 100px 1fr
        grid-template-areas: "title title" "img words"
        padding: 100px 0 0 0
        grid-gap: 50px
        .title
            grid-area: title
            display: flex
            justify-content: center
            align-items: center
            h1
                text-align: center
        .words
            grid-area: words
            width: min(400px, 80%)
            text-align: center
            display: flex
            flex-direction: column
            justify-content: center
            align-items: center
            gap: 30px
            height: 400px
        .images
            grid-area: img
            display: flex
            justify-content: end
            align-items: center
            img
                width: 400px
                height: auto
                border-radius: 50%

    #projects
        display: flex
        flex-direction: column
        justify-content: center
        align-items: center
        padding: 150px 0 0 0
        height: max(160vh, 1400px)
        h1
            grid-area: title
            text-align: center

    #articles
        display: flex
        flex-direction: column
        justify-content: center
        align-items: center
        padding: 100px 0 0 0
        width: 100%
        gap: 10px
        h1
            grid-area: title
            text-align: center
            width: 100%


    #contact
        display: flex
        justify-content: center
        align-items: center
        gap: 50px
        padding-top: 100px
        height: max(40vh, 500px)
        width: min(90%, 1000px)
        h1
            grid-area: title
            text-align: center
            display: flex
            flex-direction: row
            justify-content: center
            align-items: center
        .words
            grid-area: words
            display: flex
            flex-direction: column
            justify-content: center
            align-items: center
            gap: 30px
            width: 50%
            ul
                display: flex
                flex-direction: row
                justify-content: center
                align-items: center
                gap: 30px
                list-style: none

    .download
        transform: translateY(4px)

@media (max-width: 800px)
    .hero
        flex-direction: column
        gap: 0px
        height: 100vh

    .left, .right
        height: 50%
        width: 80%


    .left
        position: sticky
        align-items: end

    .right
        align-items: start

    .job
        justify-content: start

    #about
        display: flex
        flex-direction: column
        justify-content: center
        align-items: center
    
    #contact
        flex-direction: column
        padding-top: 150px
        .words
            width: 90%

    
</style>