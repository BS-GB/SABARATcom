import Container from "../ui/Container";
import { CheckCircle2 } from "../../assets/icons";

function PortfolioApproach({ project }) {
    const steps = [
        {
            number: "01",
            title: "Strategy",
            description:
                "We analyze the business, audience, competitors, and goals to create a clear direction for the project.",
        },
        {
            number: "02",
            title: "Execution",
            description:
                "Our creative and technical team turns the strategy into campaigns, content, branding, or digital experiences.",
        },
        {
            number: "03",
            title: "Optimization",
            description:
                "We measure performance, identify opportunities, and continuously improve the final result.",
        },
    ];

    return (
        <section className="relative overflow-hidden bg-white py-24 lg:py-32">

            {/* =========================
                Background Decoration
            ========================= */}

            <div
                className="
                    pointer-events-none
                    absolute
                    left-1/2
                    top-0
                    h-72
                    w-72
                    -translate-x-1/2
                    rounded-full
                    bg-[#EAF6FC]
                    opacity-70
                    blur-3xl
                "
            />

            <div
                className="
                    pointer-events-none
                    absolute
                    -right-40
                    bottom-0
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
                                text-[#5EA8CC]
                            "
                        >
                            Our Approach
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
                            text-slate-900
                            lg:text-5xl
                        "
                    >
                        From Strategy

                        <span className="text-[#5EA8CC]">
                            {" "}to Results.
                        </span>
                    </h2>


                    <p
                        className="
                            sabarat-fade-up
                            sabarat-delay-2
                            mt-6
                            text-lg
                            leading-8
                            text-slate-600
                        "
                    >
                        We combine strategy, creativity, technology, and
                        continuous optimization to turn business challenges
                        into meaningful results.
                    </p>

                </div>


                {/* =========================
                    Process Steps
                ========================= */}

                <div className="relative mt-20">

                    {/* Desktop connecting line */}
                    <div
                        className="
                            pointer-events-none
                            absolute
                            left-[16.66%]
                            right-[16.66%]
                            top-12
                            hidden
                            h-px
                            bg-gradient-to-r
                            from-slate-200
                            via-[#5EA8CC]/40
                            to-slate-200
                            lg:block
                        "
                    />


                    <div className="grid gap-8 lg:grid-cols-3">

                        {steps.map((step, index) => (
                            <div
                                key={step.number}
                                className={`
                                    sabarat-fade-up
                                    group
                                    relative
                                `}
                                style={{
                                    animationDelay: `${index * 150}ms`,
                                }}
                            >

                                {/* =========================
                                    Step Number
                                ========================= */}

                                <div
                                    className="
                                        relative
                                        z-10
                                        mx-auto
                                        flex
                                        h-24
                                        w-24
                                        items-center
                                        justify-center
                                        rounded-full
                                        border-8
                                        border-white
                                        bg-slate-950
                                        shadow-xl
                                        transition-all
                                        duration-500
                                        group-hover:scale-110
                                        group-hover:bg-[#5EA8CC]
                                        group-hover:shadow-[0_15px_40px_rgba(94,168,204,0.25)]
                                    "
                                >

                                    <span
                                        className="
                                            text-lg
                                            font-extrabold
                                            text-white
                                        "
                                    >
                                        {step.number}
                                    </span>

                                </div>


                                {/* =========================
                                    Step Card
                                ========================= */}

                                <div
                                    className="
                                        relative
                                        mt-8
                                        overflow-hidden
                                        rounded-3xl
                                        border
                                        border-slate-200
                                        bg-slate-50
                                        p-8
                                        text-center
                                        transition-all
                                        duration-500
                                        group-hover:-translate-y-2
                                        group-hover:border-[#5EA8CC]/30
                                        group-hover:bg-white
                                        group-hover:shadow-2xl
                                    "
                                >

                                    {/* Top accent */}
                                    <div
                                        className="
                                            absolute
                                            left-0
                                            top-0
                                            h-1
                                            w-full
                                            origin-left
                                            scale-x-0
                                            bg-[#5EA8CC]
                                            transition-transform
                                            duration-500
                                            group-hover:scale-x-100
                                        "
                                    />


                                    <h3
                                        className="
                                            text-2xl
                                            font-extrabold
                                            text-slate-900
                                            transition-colors
                                            duration-300
                                            group-hover:text-[#5EA8CC]
                                        "
                                    >
                                        {step.title}
                                    </h3>


                                    <p
                                        className="
                                            mt-4
                                            leading-7
                                            text-slate-600
                                        "
                                    >
                                        {step.description}
                                    </p>


                                    {/* Bottom indicator */}
                                    <div
                                        className="
                                            mt-7
                                            flex
                                            items-center
                                            justify-center
                                            gap-2
                                        "
                                    >
                                        <CheckCircle2
                                            size={18}
                                            className="
                                                text-[#5EA8CC]
                                                transition-transform
                                                duration-300
                                                group-hover:scale-110
                                            "
                                        />

                                        <span
                                            className="
                                                text-sm
                                                font-semibold
                                                text-slate-500
                                            "
                                        >
                                            SABARAT Process
                                        </span>
                                    </div>

                                </div>

                            </div>
                        ))}

                    </div>
                </div>


                {/* =========================
                    Project-Specific Approach
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
                        border-white/10
                        bg-slate-950
                        p-8
                        text-white
                        shadow-2xl
                        lg:p-10
                    "
                >

                    {/* Glow */}
                    <div
                        className="
                            pointer-events-none
                            absolute
                            -right-20
                            -top-20
                            h-64
                            w-64
                            rounded-full
                            bg-[#5EA8CC]/10
                            blur-3xl
                            transition-opacity
                            duration-700
                            group-hover:bg-[#5EA8CC]/20
                        "
                    />


                    {/* Top accent */}
                    <div
                        className="
                            absolute
                            left-0
                            top-0
                            h-1
                            w-full
                            bg-gradient-to-r
                            from-[#5EA8CC]
                            via-[#8ED4F5]
                            to-transparent
                        "
                    />


                    <div
                        className="
                            relative
                            grid
                            items-center
                            gap-8
                            lg:grid-cols-[1fr_auto]
                        "
                    >

                        <div>

                            <div className="flex items-center gap-3">

                                <span
                                    className="
                                        flex
                                        h-2
                                        w-2
                                        rounded-full
                                        bg-[#8ED4F5]
                                        shadow-[0_0_0_6px_rgba(142,212,245,0.08)]
                                    "
                                />

                                <p
                                    className="
                                        text-sm
                                        font-bold
                                        uppercase
                                        tracking-[0.2em]
                                        text-[#8ED4F5]
                                    "
                                >
                                    Applied To This Project
                                </p>

                            </div>


                            <p
                                className="
                                    mt-5
                                    max-w-4xl
                                    text-lg
                                    leading-8
                                    text-slate-300
                                    lg:text-xl
                                "
                            >
                                {project.approach}
                            </p>

                        </div>


                        {/* Icon */}
                        <div
                            className="
                                hidden
                                h-20
                                w-20
                                items-center
                                justify-center
                                rounded-2xl
                                border
                                border-white/10
                                bg-white/5
                                backdrop-blur-sm
                                transition-all
                                duration-500
                                group-hover:scale-110
                                group-hover:border-[#8ED4F5]/30
                                lg:flex
                            "
                        >
                            <CheckCircle2
                                size={36}
                                className="
                                    text-[#8ED4F5]
                                    transition-transform
                                    duration-500
                                    group-hover:rotate-6
                                "
                            />
                        </div>

                    </div>

                </div>

            </Container>
        </section>
    );
}

export default PortfolioApproach;