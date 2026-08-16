import Container from "../ui/Container";
import { CheckCircle2 } from "../../assets/icons";

function PortfolioResults({ project }) {
    return (
        <section className="relative overflow-hidden bg-slate-950 py-24 lg:py-32">

            {/* =========================
                Background Glow
            ========================= */}

            <div
                className="
                    pointer-events-none
                    absolute
                    -right-40
                    bottom-0
                    h-96
                    w-96
                    rounded-full
                    bg-[#8ED4F5]/10
                    blur-3xl
                "
            />

            <div
                className="
                    pointer-events-none
                    absolute
                    -left-40
                    top-0
                    h-80
                    w-80
                    rounded-full
                    bg-[#5EA8CC]/5
                    blur-3xl
                "
            />


            <Container>

                {/* =========================
                    Header
                ========================= */}

                <div
                    className="
                        relative
                        mx-auto
                        max-w-3xl
                        text-center
                    "
                >

                    <div
                        className="
                            sabarat-fade-up
                            flex
                            items-center
                            justify-center
                            gap-3
                        "
                    >
                        <span className="h-px w-10 bg-[#5EA8CC]" />

                        <span
                            className="
                                text-sm
                                font-bold
                                uppercase
                                tracking-[0.2em]
                                text-[#8ED4F5]
                            "
                        >
                            Results
                        </span>

                        <span className="h-px w-10 bg-[#5EA8CC]" />
                    </div>


                    <h2
                        className="
                            sabarat-fade-up
                            sabarat-delay-1
                            mt-6
                            text-4xl
                            font-extrabold
                            tracking-tight
                            text-white
                            lg:text-5xl
                        "
                    >
                        Turning Strategy

                        <span className="text-[#8ED4F5]">
                            {" "}Into Results.
                        </span>
                    </h2>


                    <p
                        className="
                            sabarat-fade-up
                            sabarat-delay-2
                            mt-6
                            text-lg
                            leading-8
                            text-slate-400
                        "
                    >
                        Our goal is not simply to deliver a project. We focus
                        on creating meaningful improvements that support the
                        client's business objectives.
                    </p>

                </div>


                {/* =========================
                    Results Grid
                ========================= */}

                <div className="relative mt-16 grid gap-5 md:grid-cols-2">

                    {project.results.map((result, index) => (
                        <div
                            key={result}
                            className="
                                sabarat-fade-up
                                group
                                relative
                                overflow-hidden
                                rounded-3xl
                                border
                                border-white/10
                                bg-white/[0.04]
                                p-7
                                backdrop-blur-sm
                                transition-all
                                duration-500
                                hover:-translate-y-2
                                hover:border-[#5EA8CC]/40
                                hover:bg-white/[0.07]
                                hover:shadow-[0_25px_70px_rgba(0,0,0,0.3)]
                            "
                            style={{
                                animationDelay: `${index * 120}ms`,
                            }}
                        >

                            {/* =========================
                                Background Number
                            ========================= */}

                            <div
                                className="
                                    pointer-events-none
                                    absolute
                                    -right-3
                                    -top-8
                                    text-8xl
                                    font-black
                                    leading-none
                                    text-white/[0.035]
                                    transition-all
                                    duration-500
                                    group-hover:-translate-y-1
                                    group-hover:text-[#5EA8CC]/10
                                "
                            >
                                {String(index + 1).padStart(2, "0")}
                            </div>


                            {/* =========================
                                Top Glow
                            ========================= */}

                            <div
                                className="
                                    pointer-events-none
                                    absolute
                                    -right-20
                                    -top-20
                                    h-40
                                    w-40
                                    rounded-full
                                    bg-[#5EA8CC]/10
                                    opacity-0
                                    blur-3xl
                                    transition-opacity
                                    duration-500
                                    group-hover:opacity-100
                                "
                            />


                            {/* =========================
                                Icon
                            ========================= */}

                            <div
                                className="
                                    relative
                                    flex
                                    h-14
                                    w-14
                                    items-center
                                    justify-center
                                    rounded-2xl
                                    border
                                    border-[#5EA8CC]/20
                                    bg-[#5EA8CC]/10
                                    transition-all
                                    duration-500
                                    group-hover:scale-110
                                    group-hover:border-[#8ED4F5]/30
                                    group-hover:bg-[#5EA8F5]/20
                                "
                            >
                                <CheckCircle2
                                    size={25}
                                    className="
                                        text-[#8ED4F5]
                                        transition-transform
                                        duration-500
                                        group-hover:rotate-6
                                    "
                                />
                            </div>


                            {/* =========================
                                Result
                            ========================= */}

                            <p
                                className="
                                    relative
                                    mt-7
                                    max-w-md
                                    text-lg
                                    font-semibold
                                    leading-8
                                    text-slate-200
                                    transition-colors
                                    duration-300
                                    group-hover:text-white
                                "
                            >
                                {result}
                            </p>


                            {/* =========================
                                Bottom Accent
                            ========================= */}

                            <div
                                className="
                                    mt-7
                                    h-px
                                    w-10
                                    bg-[#5EA8CC]
                                    transition-all
                                    duration-700
                                    group-hover:w-full
                                "
                            />

                        </div>
                    ))}

                </div>


                {/* =========================
                    Bottom Statement
                ========================= */}

                <div
                    className="
                        sabarat-fade-up
                        sabarat-delay-3
                        group
                        relative
                        mt-16
                        overflow-hidden
                        rounded-[2rem]
                        border
                        border-[#5EA8CC]/20
                        bg-[#5EA8CC]/10
                        p-8
                        text-center
                        transition-all
                        duration-500
                        hover:border-[#5EA8CC]/40
                        hover:bg-[#5EA8CC]/15
                        lg:p-10
                    "
                >

                    {/* Animated light */}
                    <div
                        className="
                            pointer-events-none
                            absolute
                            inset-y-0
                            -left-1/2
                            w-1/2
                            skew-x-[-20deg]
                            bg-gradient-to-r
                            from-transparent
                            via-white/[0.06]
                            to-transparent
                            transition-transform
                            duration-1000
                            group-hover:translate-x-[300%]
                        "
                    />


                    <div className="relative">

                        <p
                            className="
                                text-2xl
                                font-bold
                                tracking-tight
                                text-white
                                lg:text-3xl
                            "
                        >
                            Better strategy.

                            <span className="text-[#8ED4F5]">
                                {" "}Better execution.
                            </span>

                            <br className="hidden sm:block" />

                            Better results.
                        </p>


                        <p
                            className="
                                mx-auto
                                mt-4
                                max-w-2xl
                                leading-7
                                text-slate-400
                            "
                        >
                            Every project is an opportunity to create
                            something useful, memorable, and built around
                            real business goals.
                        </p>


                        {/* Decorative dots */}
                        <div className="mt-7 flex justify-center gap-2">

                            <span className="h-1.5 w-1.5 rounded-full bg-[#5EA8CC]" />

                            <span className="h-1.5 w-1.5 rounded-full bg-[#8ED4F5]" />

                            <span className="h-1.5 w-1.5 rounded-full bg-[#5EA8CC]/40" />

                        </div>

                    </div>

                </div>

            </Container>
        </section>
    );
}

export default PortfolioResults;