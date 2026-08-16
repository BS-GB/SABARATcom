import Container from "../ui/Container";
import Button from "../ui/Button";
import { ArrowRight } from "../../assets/icons";
import { Link } from "react-router-dom";

function PortfolioCTA({ project }) {
    return (
        <section className="relative overflow-hidden bg-slate-50 py-24 lg:py-32">

            {/* =========================
                Background Glow
            ========================= */}

            <div
                className="
                    pointer-events-none
                    absolute
                    left-1/2
                    top-1/2
                    h-[500px]
                    w-[500px]
                    -translate-x-1/2
                    -translate-y-1/2
                    rounded-full
                    bg-[#5EA8CC]/10
                    blur-3xl
                "
            />


            <Container>

                {/* =========================
                    Main CTA
                ========================= */}

                <div
                    className="
                        sabarat-fade-up
                        group
                        relative
                        overflow-hidden
                        rounded-[2.5rem]
                        bg-slate-950
                        px-6
                        py-16
                        text-center
                        shadow-2xl
                        lg:px-16
                        lg:py-20
                    "
                >

                    {/* =========================
                        Decorative circles
                    ========================= */}

                    <div
                        className="
                            pointer-events-none
                            absolute
                            -right-24
                            -top-24
                            h-72
                            w-72
                            rounded-full
                            border
                            border-[#5EA8CC]/20
                            transition-transform
                            duration-1000
                            ease-out
                            group-hover:scale-125
                        "
                    />

                    <div
                        className="
                            pointer-events-none
                            absolute
                            -bottom-28
                            -left-24
                            h-80
                            w-80
                            rounded-full
                            border
                            border-[#8ED4F5]/10
                            transition-transform
                            duration-1000
                            ease-out
                            group-hover:scale-125
                        "
                    />


                    {/* Inner glow */}

                    <div
                        className="
                            pointer-events-none
                            absolute
                            left-1/2
                            top-1/2
                            h-72
                            w-72
                            -translate-x-1/2
                            -translate-y-1/2
                            rounded-full
                            bg-[#5EA8CC]/10
                            opacity-0
                            blur-3xl
                            transition-opacity
                            duration-700
                            group-hover:opacity-100
                        "
                    />


                    {/* =========================
                        Content
                    ========================= */}

                    <div className="relative mx-auto max-w-3xl">

                        {/* Badge */}

                        <span
                            className="
                                inline-flex
                                rounded-full
                                border
                                border-[#5EA8CC]/30
                                bg-[#5EA8CC]/10
                                px-4
                                py-2
                                text-sm
                                font-semibold
                                text-[#8ED4F5]
                                transition-all
                                duration-300
                                group-hover:border-[#8ED4F5]/40
                                group-hover:bg-[#5EA8CC]/20
                            "
                        >
                            {project
                                ? "Ready to Start?"
                                : "Let's Work Together"}
                        </span>


                        {/* Heading */}

                        <h2
                            className="
                                mt-6
                                text-4xl
                                font-extrabold
                                leading-tight
                                tracking-tight
                                text-white
                                lg:text-5xl
                            "
                        >
                            {project ? (
                                <>
                                    Have a project

                                    <span className="text-[#8ED4F5]">
                                        {" "}in mind?
                                    </span>
                                </>
                            ) : (
                                <>
                                    Ready to grow

                                    <span className="text-[#8ED4F5]">
                                        {" "}your business?
                                    </span>
                                </>
                            )}
                        </h2>


                        {/* Description */}

                        <p
                            className="
                                mx-auto
                                mt-6
                                max-w-2xl
                                text-lg
                                leading-8
                                text-slate-400
                            "
                        >
                            {project
                                ? "Let's build something meaningful for your business. Tell us about your goals and we'll help turn your idea into reality."
                                : "Whether you need marketing, advertising, branding, content, or a digital solution, our team is ready to help you move forward."}
                        </p>


                        {/* =========================
                            Buttons
                        ========================= */}

                        <div className="mt-10 flex flex-wrap justify-center gap-4">

                            {/* Primary */}

                            <Link to="/client-discovery">

                                <Button
                                    size="lg"
                                    className="group/button"
                                >
                                    <span className="flex items-center gap-2">

                                        {project
                                            ? "Start Your Project"
                                            : "Request a Quote"}

                                        <ArrowRight
                                            size={19}
                                            className="
                                                transition-transform
                                                duration-300
                                                group-hover/button:translate-x-1.5
                                            "
                                        />

                                    </span>
                                </Button>

                            </Link>


                            {/* Secondary */}

                            <Link to="/portfolio">

                                <Button
                                    variant="outline"
                                    size="lg"
                                    className="
                                        border-white/20
                                        text-white
                                        transition-all
                                        duration-300
                                        hover:border-white
                                        hover:bg-white
                                        hover:text-slate-900
                                    "
                                >
                                    {project
                                        ? "Explore More Projects"
                                        : "View Our Work"}
                                </Button>

                            </Link>

                        </div>


                        {/* =========================
                            Project Reference
                        ========================= */}

                        {project && (
                            <div className="mt-8">

                                <p className="text-sm text-slate-500">
                                    Inspired by{" "}
                                    <span
                                        className="
                                            font-semibold
                                            text-slate-300
                                            transition-colors
                                            duration-300
                                            group-hover:text-[#8ED4F5]
                                        "
                                    >
                                        {project.title}
                                    </span>
                                </p>

                            </div>
                        )}


                        {/* =========================
                            Bottom Indicator
                        ========================= */}

                        <div className="mt-10 flex items-center justify-center gap-2">

                            <span className="h-1.5 w-1.5 rounded-full bg-[#5EA8CC]" />

                            <span className="h-1.5 w-8 rounded-full bg-[#8ED4F5]" />

                            <span className="h-1.5 w-1.5 rounded-full bg-[#5EA8F5]/40" />

                        </div>

                    </div>

                </div>

            </Container>

        </section>
    );
}

export default PortfolioCTA;