import Container from "../ui/Container";
import Button from "../ui/Button";
import { Link } from "react-router-dom";

function PortfolioHero() {
    return (
        <section
            className="
                relative
                overflow-hidden
                bg-white
                py-24
                lg:py-32
            "
        >

            {/* =========================
                Background Decoration
            ========================= */}

            <div
                className="
                    pointer-events-none
                    absolute
                    left-1/2
                    top-0
                    h-[500px]
                    w-[500px]
                    -translate-x-1/2
                    rounded-full
                    bg-[#EAF6FC]
                    opacity-70
                    blur-3xl
                    animate-[heroGlow_8s_ease-in-out_infinite]
                "
            />

            <div
                className="
                    pointer-events-none
                    absolute
                    -left-32
                    top-1/3
                    h-64
                    w-64
                    rounded-full
                    bg-[#5EA8CC]/5
                    blur-3xl
                "
            />

            <div
                className="
                    pointer-events-none
                    absolute
                    -right-32
                    bottom-0
                    h-72
                    w-72
                    rounded-full
                    bg-[#8ED4F5]/10
                    blur-3xl
                "
            />


            <Container>

                <div className="relative mx-auto max-w-4xl text-center">

                    {/* =========================
                        Badge
                    ========================= */}

                    <span
                        className="
                            sabarat-fade-up
                            inline-flex
                            items-center
                            gap-2
                            rounded-full
                            border
                            border-[#5EA8CC]/20
                            bg-[#EAF6FC]
                            px-4
                            py-2
                            text-sm
                            font-semibold
                            text-[#5EA8CC]
                            shadow-sm
                        "
                    >
                        <span
                            className="
                                h-2
                                w-2
                                rounded-full
                                bg-[#5EA8CC]
                                animate-pulse
                            "
                        />

                        Our Portfolio
                    </span>


                    {/* =========================
                        Title
                    ========================= */}

                    <h1
                        className="
                            sabarat-fade-up
                            sabarat-delay-1
                            mt-6
                            text-5xl
                            font-extrabold
                            leading-[1.05]
                            tracking-tight
                            text-slate-900
                            sm:text-6xl
                            lg:text-7xl
                        "
                    >
                        Work That Makes

                        <span
                            className="
                                block
                                text-[#5EA8CC]
                            "
                        >
                            an Impact
                        </span>
                    </h1>


                    {/* =========================
                        Description
                    ========================= */}

                    <p
                        className="
                            sabarat-fade-up
                            sabarat-delay-2
                            mx-auto
                            mt-7
                            max-w-2xl
                            text-lg
                            leading-8
                            text-slate-600
                            lg:text-xl
                        "
                    >
                        Explore selected marketing campaigns, branding
                        projects, creative content, advertising campaigns,
                        and digital solutions created to help businesses grow.
                    </p>


                    {/* =========================
                        Actions
                    ========================= */}

                    <div
                        className="
                            sabarat-fade-up
                            sabarat-delay-3
                            mt-10
                            flex
                            flex-wrap
                            justify-center
                            gap-4
                        "
                    >

                        <Link to="/contact">
                            <Button
                                variant="primary"
                                size="lg"
                                className="
                                    shadow-lg
                                    shadow-[#5EA8CC]/20
                                    hover:-translate-y-1
                                    hover:shadow-xl
                                "
                            >
                                Start Your Project
                            </Button>
                        </Link>


                        <a href="#portfolio-projects">
                            <Button
                                variant="outline"
                                size="lg"
                                className="
                                    hover:-translate-y-1
                                "
                            >
                                Explore Our Work
                            </Button>
                        </a>

                    </div>


                    {/* =========================
                        Bottom Indicator
                    ========================= */}

                    <a
                        href="#portfolio-projects"
                        className="
                            sabarat-fade-up
                            sabarat-delay-3
                            mx-auto
                            mt-16
                            flex
                            w-fit
                            flex-col
                            items-center
                            gap-2
                            text-sm
                            font-medium
                            text-slate-400
                            transition-colors
                            duration-300
                            hover:text-[#5EA8CC]
                        "
                    >
                        <span>
                            Explore selected work
                        </span>

                        <span
                            className="
                                flex
                                h-9
                                w-6
                                items-start
                                justify-center
                                rounded-full
                                border
                                border-slate-300
                                p-1
                                
                            "
                        >
                            <span
                                className="
                                    h-1.5
                                    w-1.5
                                    rounded-full
                                    bg-[#5EA8CC]
                                    animate-bounce
                                "
                            />
                        </span>
                    </a>

                </div>

            </Container>
        </section>
    );
}

export default PortfolioHero;