import Container from "../ui/Container";
import Button from "../ui/Button";
import { Link } from "react-router-dom";
import { ArrowRight } from "../../assets/icons";

function PortfolioDetailsHero({ project }) {
    return (
        <section
            className="
                relative
                overflow-hidden
                bg-slate-950
                py-24
                text-white
                lg:py-32
            "
        >

            {/* =========================
                Background Glow
            ========================= */}

            <div
                className="
                    pointer-events-none
                    absolute
                    -left-40
                    top-0
                    h-[500px]
                    w-[500px]
                    rounded-full
                    bg-[#5EA8CC]/10
                    blur-3xl
                "
            />

            <div
                className="
                    pointer-events-none
                    absolute
                    -right-40
                    bottom-0
                    h-[500px]
                    w-[500px]
                    rounded-full
                    bg-[#8ED4F5]/5
                    blur-3xl
                "
            />

            <Container>

                <div className="relative grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">


                    {/* =========================
                        Content
                    ========================= */}

                    <div className="relative">

                        {/* Category */}
                        <span
                            className="
                                sabarat-fade-up
                                inline-flex
                                items-center
                                gap-2
                                rounded-full
                                border
                                border-[#5EA8CC]/30
                                bg-[#5EA8CC]/10
                                px-4
                                py-2
                                text-sm
                                font-semibold
                                text-[#8ED4F5]
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

                            {project.categoryLabel}
                        </span>


                        {/* Title */}
                        <h1
                            className="
                                sabarat-fade-up
                                sabarat-delay-1
                                mt-6
                                max-w-3xl
                                text-5xl
                                font-extrabold
                                leading-[1.05]
                                tracking-tight
                                text-white
                                sm:text-6xl
                                lg:text-7xl
                            "
                        >
                            {project.title}
                        </h1>


                        {/* Description */}
                        <p
                            className="
                                sabarat-fade-up
                                sabarat-delay-2
                                mt-7
                                max-w-xl
                                text-lg
                                leading-8
                                text-slate-300
                                lg:text-xl
                            "
                        >
                            {project.description}
                        </p>


                        {/* Tags */}
                        <div
                            className="
                                sabarat-fade-up
                                sabarat-delay-2
                                mt-8
                                flex
                                flex-wrap
                                gap-2
                            "
                        >
                            {project.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="
                                        rounded-full
                                        border
                                        border-white/10
                                        bg-white/5
                                        px-4
                                        py-2
                                        text-sm
                                        font-medium
                                        text-slate-200
                                        backdrop-blur-sm
                                        transition-all
                                        duration-300
                                        hover:border-[#5EA8CC]/40
                                        hover:bg-[#5EA8CC]/10
                                        hover:text-[#8ED4F5]
                                    "
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>


                        {/* Actions */}
                        <div
                            className="
                                sabarat-fade-up
                                sabarat-delay-3
                                mt-10
                                flex
                                flex-wrap
                                gap-4
                            "
                        >

                            <Link to="/contact">
                                <Button
                                    variant="primary"
                                    size="lg"
                                    className="
                                        group
                                        shadow-lg
                                        shadow-[#5EA8CC]/20
                                        hover:-translate-y-1
                                        hover:shadow-xl
                                    "
                                >
                                    <span className="flex items-center gap-2">

                                        Start a Project

                                        <ArrowRight
                                            size={18}
                                            className="
                                                transition-transform
                                                duration-300
                                                group-hover:translate-x-1
                                            "
                                        />

                                    </span>
                                </Button>
                            </Link>


                            <Link to="/portfolio">
                                <Button
                                    variant="outline"
                                    size="lg"
                                    className="
                                        border-white/20
                                        text-white
                                        hover:-translate-y-1
                                        hover:bg-white
                                        hover:text-slate-900
                                    "
                                >
                                    Back to Portfolio
                                </Button>
                            </Link>

                        </div>


                        {/* Project Meta */}
                        <div
                            className="
                                sabarat-fade-up
                                sabarat-delay-3
                                mt-12
                                flex
                                flex-wrap
                                gap-8
                                border-t
                                border-white/10
                                pt-8
                            "
                        >

                            <div>
                                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                                    Client
                                </p>

                                <p className="mt-2 font-semibold text-slate-200">
                                    {project.client}
                                </p>
                            </div>


                            <div>
                                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                                    Year
                                </p>

                                <p className="mt-2 font-semibold text-slate-200">
                                    {project.year}
                                </p>
                            </div>


                            <div>
                                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                                    Services
                                </p>

                                <p className="mt-2 font-semibold text-slate-200">
                                    {project.services.length} Services
                                </p>
                            </div>

                        </div>

                    </div>


                    {/* =========================
                        Project Image
                    ========================= */}

                    <div
                        className="
                            sabarat-fade-up
                            sabarat-delay-2
                            relative
                        "
                    >

                        {/* Outer Glow */}
                        <div
                            className="
                                pointer-events-none
                                absolute
                                -inset-4
                                rounded-[2rem]
                                bg-[#5EA8CC]/10
                                blur-2xl
                            "
                        />


                        {/* Image Container */}
                        <div
                            className="
                                group
                                relative
                                overflow-hidden
                                rounded-[2rem]
                                border
                                border-white/10
                                bg-slate-900
                                shadow-2xl
                            "
                        >

                            <img
                                src={project.image}
                                alt={project.title}
                                className="
                                    h-[400px]
                                    w-full
                                    object-cover
                                    transition-transform
                                    duration-700
                                    ease-out
                                    group-hover:scale-105
                                    sm:h-[460px]
                                    lg:h-[560px]
                                "
                            />


                            {/* Image Overlay */}
                            <div
                                className="
                                    pointer-events-none
                                    absolute
                                    inset-0
                                    bg-gradient-to-t
                                    from-slate-950/40
                                    via-transparent
                                    to-transparent
                                "
                            />

                        </div>


                        {/* Floating Project Label */}
                        <div
                            className="
                                absolute
                                -bottom-6
                                left-6
                                rounded-2xl
                                border
                                border-white/10
                                bg-slate-900/90
                                px-5
                                py-4
                                shadow-xl
                                backdrop-blur-xl
                                sm:left-8
                            "
                        >
                            <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                                Featured Project
                            </p>

                            <p className="mt-1 font-bold text-white">
                                {project.title}
                            </p>
                        </div>


                        {/* Decorative Elements */}
                        <div
                            className="
                                pointer-events-none
                                absolute
                                -bottom-8
                                -left-8
                                -z-0
                                h-32
                                w-32
                                rounded-full
                                bg-[#5EA8CC]/20
                                blur-3xl
                            "
                        />

                        <div
                            className="
                                pointer-events-none
                                absolute
                                -right-8
                                -top-8
                                -z-0
                                h-32
                                w-32
                                rounded-full
                                bg-[#8ED4F5]/10
                                blur-3xl
                            "
                        />

                    </div>

                </div>

            </Container>
        </section>
    );
}

export default PortfolioDetailsHero;