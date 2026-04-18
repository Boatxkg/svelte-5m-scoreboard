<script lang="ts">
    import Scoreboard from "./scoreboard.svelte";
    import logo from "../../assets/logo.png";

    import leftImg from "../../assets/Group99.svg";
    import rightImg from "../../assets/Group200.svg";

    import bottomLeft from '../../assets/bottomLeft.svg'
    import bottomRight from '../../assets/bottomRight.svg'

    import playerbox from '../../assets/playerbox.svg'
    import phonebox from '../../assets/phoneBOx.svg'

    import policebox from '../../assets/policeBox.svg'
    import medicalbox from '../../assets/medicalBox.svg'
    import counsilbox from '../../assets/counsilbox.svg'

    import origin from '../../assets/image.png'

    import asd from "../../assets/asd.jpeg";
    import { onMount } from "svelte";
    import { allState } from "../stores/stores";
    import gsap from "gsap";
    let logoEl: HTMLImageElement;
    let background: HTMLElement;
    let leftGuard: HTMLImageElement;
    let rightGuard: HTMLImageElement;
    let playername = $state('mayang pantevisung');
    let tl: gsap.core.Timeline;

    import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
    gsap.registerPlugin(ScrambleTextPlugin);
    onMount(() => {
        tl = gsap.timeline({
            paused: true,
            defaults: {
                ease: "back.out(1.2)",
            },
        });

        tl
            // === ENTER ===
            .add("enter")
            .from(logoEl, {}, "enter")
            .from([leftGuard, rightGuard], { opacity: 0 }, "enter")
            .from(background, { opacity: 0 }, "enter")
            // === MOVE LOGO ===
            .add("move")
            .to(
                logoEl,
                {
                    y: "20vh",
                    x: "-83vh",
                    scale: 2,
                    duration: 0.5,
                    ease: "back.inOut(1.1)",
                },
                "move",
            )
            // .to(logoEl,{rotate:-360,scale:0,duration:0.3 , ease:"backInOut(1.3)"})

            // === GUARD IN ===
            .add("guard", ">=+0")
            .to([leftGuard, rightGuard], { opacity: 1, duration: 0.5 }, "guard")
            .to(
                leftGuard,
                {
                    x: "-25vh",
                    duration: 0.27,
                    ease: "back.inOut(1.3)",
                },
                "guard",
            )
            .to(
                rightGuard,
                {
                    x: "25vh",
                    duration: 0.27,
                    ease: "back.inOut(1.3)",
                },
                "guard",
            )

            // === BG FADE ===
            .to(
                background,
                {
                    opacity: 1,
                    duration: 0.3,
                },
                "guard+=0.3",
            )
            // === FINAL LOGO ===
            .add("final")
            .fromTo('.stagger',
            {
                y:'0.5vh',
                opacity:0,
                stagger: 0.02,
            },
            {
                y:'0vh',
                opacity:1,
                stagger: 0.02,
            },'<')
            .to('.playername', 
            // {
            //         textContent: "WELCOME TO RAVEN",
            // },
            {
                    scrambleText: {
                        text: playername,
                        chars: "!@^()-<>$#%^&*{}_~|",
                        speed: 1
                    },
                    duration: 1
            }, 
            "final")
            .to(
                logoEl,
                {
                    y: "14vh",
                    x: "-63.5vh",
                    scale: 1,
                    duration: 0.27,
                },
                "final-=0.45",
            );
    });

    $effect(() => {
        if (tl) {
            if ($allState.isOpening) {
                tl.play();
            } else {
                tl.reverse();
            }
        }
    });
</script>

<main
    class="container-full w-[100vw] h-[100vh] flex justify-center items-start px-[2vh] py-[2vh] bg-gray-800 "
>

    <button
        class="toggle text-white p-5 bg-green-400/60 border border-green-400 absolute left-[50%]"
        onclick={() => {
            $allState.isOpening = !$allState.isOpening;
        }}>test</button
    >
    <img
        bind:this={logoEl}
        src={logo}
        alt=""
        class="absolute w-[6vh] h-[6vh] object-fit bg-slate-300/0 top-[2vh] right-[2vh] z-[9999]"
    />
    <section
        class="w-[51.2vh] h-[20vh] mt-[12vh] flex justify-center items-center"
    >
        <div class="main-bg stagger" bind:this={background}>

        <!-- image-section  -->
            <img
                src={asd}
                alt=""
                class="img-clip w-[12.9vh] h-[12.9vh] absolute left-[4.05vh] top-[4.25vh] opacity-100 stagger"
            />
            <!-- header name section  -->
            <div class="absolute w-full h-full pl-[20vh] pt-[4.2vh]">
                <h1 class="uppercase text-[#3AE998] font-['Conthrax'] header-text stagger">player name</h1>
                <p class="text-white text-[2vh] w-[26vh] h-[3vh] overflow-hidden text-ellipsis text-nowrap font-medium uppercase  mt-[0.5vh] playername stagger" 
                ></p>

                <div class="flex gap-[1vh] mt-[1.25vh]">
                    <div class="w-[12vh] relative stagger">
                        <img src={playerbox} alt="" class="w-full h-full">
                        <p class="absolute right-[0.5vh]  top-0 w-[8.7vh] h-full  z-40 flex font-medium items-center justify-center text-center text-[#3AE998] text-[1vh]">000000</p>
                    </div>
                    <div class="w-[12vh] relative stagger">
                        <img src={phonebox} alt="" class="w-full h-full">
                        <p class="absolute right-[0.5vh]  top-0 min-w-[8.7vh] max-w-[8.7vh] h-full z-40 flex font-medium items-center justify-center text-[#3AE998] uppercase text-[1vh] overflow-hidden text-ellipsis text-nowrap">UNEMPLOYED</p>
                    </div>
                </div>
                <div class="flex gap-[0.5vh] mx-[-0.5vh] mt-[1.4vh]">
                    <div class="w-[9.5vh] relative stagger">
                        <img src={policebox} alt="" class="w-full h-full">
                         <p class="absolute right-[0.5vh]  top-[0.7vh] w-[5.3vh] h-[60%]  z-40 text-center flex items-center justify-center font-medium text-[1vh] text-[#00AEEF] pb-[0.1vh]">00</p>
                    </div>
                    <div class="w-[9.5vh] relative stagger">
                        <img src={medicalbox} alt="" class="w-full h-full">
                        <p class="absolute right-[0.5vh]  top-[0.7vh] w-[5.3vh] h-[60%]  z-40 text-center flex items-center justify-center font-medium text-[1vh] text-[#FF6695] pb-[0.1vh]">00</p>
                    </div>
                    <div class="w-[9.5vh] relative stagger">
                        <img src={counsilbox} alt="" class="w-full h-full">
                        <p class="absolute right-[0.5vh]  top-[0.7vh] w-[5.3vh] h-[60%] z-40 text-center flex items-center justify-center font-medium text-[1vh] text-[#FFB600] pb-[0.1vh]">00</p>
                    </div>
                </div>
            </div>

            <!-- bottom-section  -->
            <div class="flex absolute bottom-[-3.3vh] items-center justify-center pl-[1.7vh]">
                <div class="bottomLeft w-[16.5vh] min-h-[3.5vh] bg-slate-300/0 stagger">
                    <div class="absolute flex z-40 pl-[2.5vh] w-full h-full items-center justify-start">
                        <p class="bottomText ">UID</p>
                        <p class="text-[#3AE998] min-w-[8.5vh]  mx-[1.7vh] text-center pb-[0.1vh] text-[1.5vh]">1234</p>
                    </div>
                    <img src={bottomLeft} alt="" class="w-full h-full">
                </div>
                <div class="bottomRight w-[31.4vh] min-h-[3.5vh]  bg-slate-300/0 stagger">
                    <div class="absolute flex z-40 pl-[4vh] w-full h-full items-center justify-start ">
                        <p class="bottomText">PLAYER ONLINE</p>
                        <p class="text-[#3AE998]  min-w-[7.9vh] mx-[1.2vh] text-center  pb-[0.1vh] text-[1.5vh]">1234</p>
                    </div>
                    <img src={bottomRight} alt="" class="w-full h-full">
                </div>
            </div>
        </div>
        <img
            bind:this={leftGuard}
            src={leftImg}
            alt=""
            class="leftGuard h-[24vh] w-auto object-contain "
        />
        <div class=""></div>
        <img
            bind:this={rightGuard}
            src={rightImg}
            alt=""
            class="rightGuard h-[24vh] w-auto object-contain "
        />
    </section>
</main>

<style>
    img {
        will-change: transform;
    }
    .rightGuard,
    .leftGuard {
        margin-top: 2.8vh;
        position: absolute;
        opacity: 0;
    }
    .main-bg {
        width: inherit;
        height: inherit;
        opacity: 0;
        background: url(../../assets/mainbg.svg);
        background-repeat: no-repeat;
        background-size: contain;
        position: relative;
        /* background-color: antiquewhite; */
    }
    .img-clip {
        -webkit-mask-image: url(../../assets/asdfasdf.png);
        -webkit-mask-size: contain;
        -webkit-mask-repeat: no-repeat;
    }
    .header-text{
        font-size: calc(19*var(--px-to-vh));
        text-shadow: 0vh 0vh .6vh #3AE998;
    }
    .bottomLeft , .bottomRight{
        filter: drop-shadow(0vh 0vh 0.2vh rgba(0,0,0,1));
    }
    .bottomText{
        font-family: 'Conthrax';
        font-size: calc(22*var(--px-to-vh));
        background: linear-gradient(to top , rgba(173,175,176,1) 0%,rgba(162,164,165,1), rgba(255,255,255,1));
        /* text-shadow: 0vh 0vh 0.1vh rgba(0,0,0,0.3); */
        filter: drop-shadow( 0vh 0vh 0.2vh rgba(0,0,0,0.8));
        line-height: 1.4vh;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }
</style>
