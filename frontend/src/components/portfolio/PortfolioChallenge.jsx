import Container from "../ui/Container";

function PortfolioChallenge({ project }) {
    return (
        <section className="relative overflow-hidden bg-slate-50 py-24 lg:py-32">

            {/* =========================
                Background Decoration
            ========================= */}

            <div
                className="
                    pointer-events-none
                    absolute
                    -left-32
                    bottom-10
                    h-72
                    w-72
                    rounded-full
                    bg-[#8ED4F5]/10
                    blur-3xl
                "
            />

            <div
                className="
                    pointer-events-none
                    absolute
                    right-0
                    top-0
                    h-64
                    w-64
                    rounded-full
                    bg-[#5EA8CC]/5
                    blur-3xl
                "
            />


            <Container>

                <div className="relative grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">

                    {/* =========================
                        Left Content
                    ========================= */}

                    <div className="sabarat-fade-up">

                        {/* Section Label */}
                        <div className="flex items-center gap-3">

                            <span className="h-px w-10 bg-[#5EA8CC]" />

                            <span
                                className="
                                    text-sm
                                    font-bold
                                    uppercase
                                    tracking-[0.2em]
                                    text-[#5EA8CC]
                                "
                            >
                                The Challenge
                            </span>

                        </div>


                        {/* Heading */}
                        <h2
                            className="
                                sabarat-fade-up
                                sabarat-delay-1
                                mt-6
                                max-w-xl
                                text-4xl
                                font-extrabold
                                leading-[1.1]
                                tracking-tight
                                text-slate-900
                                lg:text-5xl
                            "
                        >
                            Every great project

                            <span className="text-[#5EA8CC]">
                                {" "}starts with a challenge.
                            </span>
                        </h2>


                        {/* Description */}
                        <p
                            className="
                                sabarat-fade-up
                                sabarat-delay-2
                                mt-6
                                max-w-xl
                                text-lg
                                leading-8
                                text-slate-600
                            "
                        >
                            Before creating the solution, we focused on
                            understanding the business, its audience, and the
                            real problems standing between the brand and its
                            goals.
                        </p>


                        {/* Strategy Indicator */}
                        <div
                            className="
                                sabarat-fade-up
                                sabarat-delay-3
                                mt-10
                                flex
                                items-center
                                gap-4
                            "
                        >

                            <div className="flex -space-x-2">

                                <span
                                    className="
                                        h-10
                                        w-10
                                        rounded-full
                                        border-2
                                        border-slate-50
                                        bg-[#5EA8CC]
                                    "
                                />

                                <span
                                    className="
                                        h-10
                                        w-10
                                        rounded-full
                                        border-2
                                        border-slate-50
                                        bg-slate-800
                                    "
                                />

                                <span
                                    className="
                                        h-10
                                        w-10
                                        rounded-full
                                        border-2
                                        border-slate-50
                                        bg-slate-300
                                    "
                                />

                            </div>


                            <div>
                                <p className="text-sm font-bold text-slate-900">
                                    Strategy First
                                </p>

                                <p className="mt-1 text-sm text-slate-500">
                                    Understand → Plan → Execute
                                </p>
                            </div>

                        </div>

                    </div>


                    {/* =========================
                        Challenge Card
                    ========================= */}

                    <div
                        className="
                            sabarat-fade-up
                            sabarat-delay-2
                            group
                            relative
                        "
                    >

                        {/* Glow */}
                        <div
                            className="
                                pointer-events-none
                                absolute
                                -inset-5
                                rounded-[2rem]
                                bg-[#5EA8CC]/10
                                opacity-0
                                blur-3xl
                                transition-opacity
                                duration-700
                                group-hover:opacity-100
                            "
                        />


                        {/* Card */}
                        <div
                            className="
                                relative
                                overflow-hidden
                                rounded-[2rem]
                                border
                                border-slate-200
                                bg-white
                                p-8
                                shadow-sm
                                transition-all
                                duration-500
                                group-hover:-translate-y-2
                                group-hover:border-[#5EA8CC]/30
                                group-hover:shadow-2xl
                                lg:p-10
                            "
                        >

                            {/* Top Accent */}
                            <div
                                className="
                                    absolute
                                    left-0
                                    top-0
                                    h-1
                                    w-full
                                    origin-left
                                    scale-x-50
                                    bg-[#5EA8CC]
                                    transition-transform
                                    duration-500
                                    group-hover:scale-x-100
                                "
                            />


                            {/* Icon */}
                            <div
                                className="
                                    flex
                                    h-16
                                    w-16
                                    items-center
                                    justify-center
                                    rounded-2xl
                                    bg-[#EAF6FC]
                                    transition-all
                                    duration-500
                                    group-hover:rotate-6
                                    group-hover:scale-110
                                "
                            >
                                <span
                                    className="
                                        text-2xl
                                        font-black
                                        text-[#5EA8CC]
                                    "
                                >
                                    ?
                                </span>
                            </div>


                            {/* Eyebrow */}
                            <p
                                className="
                                    mt-8
                                    text-xs
                                    font-bold
                                    uppercase
                                    tracking-[0.2em]
                                    text-slate-400
                                "
                            >
                                Project Challenge
                            </p>


                            {/* Card Heading */}
                            <h3
                                className="
                                    mt-3
                                    text-2xl
                                    font-extrabold
                                    text-slate-900
                                "
                            >
                                What needed to be solved?
                            </h3>


                            {/* Actual Challenge */}
                            <p
                                className="
                                    mt-5
                                    text-lg
                                    leading-8
                                    text-slate-600
                                "
                            >
                                {project.challenge}
                            </p>


                            {/* Bottom Indicator */}
                            <div
                                className="
                                    mt-8
                                    flex
                                    items-center
                                    gap-3
                                    border-t
                                    border-slate-100
                                    pt-6
                                "
                            >

                                <span
                                    className="
                                        h-2
                                        w-2
                                        rounded-full
                                        bg-[#5EA8CC]
                                        shadow-[0_0_0_5px_#EAF6FC]
                                    "
                                />

                                <span
                                    className="
                                        text-sm
                                        font-semibold
                                        text-slate-500
                                    "
                                >
                                    A challenge worth solving.
                                </span>

                            </div>

                        </div>

                    </div>

                </div>

            </Container>
        </section>
    );
}

export default PortfolioChallenge;