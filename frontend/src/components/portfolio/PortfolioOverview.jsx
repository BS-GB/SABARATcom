import Container from "../ui/Container";

function PortfolioOverview({ project }) {
    return (
        <section className="relative overflow-hidden bg-white py-24 lg:py-32">
            {/* Background decoration */}
            <div
                className="
                    pointer-events-none
                    absolute
                    -right-40
                    top-20
                    h-80
                    w-80
                    rounded-full
                    bg-[#EAF6FC]
                    opacity-60
                    blur-3xl
                "
            />

            <Container>
                <div className="relative">

                    {/* =========================
                        Heading
                    ========================= */}
                    <div className="max-w-3xl">
                        <span
                            className="
                                sabarat-fade-up
                                inline-flex
                                rounded-full
                                border
                                border-[#5EA8CC]/20
                                bg-[#EAF6FC]
                                px-4
                                py-2
                                text-sm
                                font-semibold
                                text-[#5EA8CC]
                            "
                        >
                            Project Overview
                        </span>

                        <h2
                            className="
                                sabarat-fade-up
                                sabarat-delay-1
                                mt-5
                                text-4xl
                                font-extrabold
                                tracking-tight
                                text-slate-900
                                lg:text-5xl
                            "
                        >
                            A Closer Look at the Project
                        </h2>

                        <p
                            className="
                                sabarat-fade-up
                                sabarat-delay-2
                                mt-5
                                max-w-2xl
                                text-lg
                                leading-8
                                text-slate-600
                            "
                        >
                            Explore the key details, services, and strategic
                            elements that shaped this project from concept
                            to execution.
                        </p>
                    </div>


                    {/* =========================
                        Information Grid
                    ========================= */}
                    <div className="mt-14 grid gap-6 lg:grid-cols-3">

                        {/* Client */}
                        <div
                            className="
                                sabarat-fade-up
                                group
                                relative
                                overflow-hidden
                                rounded-3xl
                                border
                                border-slate-200
                                bg-white
                                p-7
                                shadow-sm
                                transition-all
                                duration-500
                                hover:-translate-y-2
                                hover:border-[#5EA8CC]/30
                                hover:shadow-xl
                            "
                        >
                            <div
                                className="
                                    mb-6
                                    flex
                                    h-12
                                    w-12
                                    items-center
                                    justify-center
                                    rounded-2xl
                                    bg-[#EAF6FC]
                                    text-[#5EA8CC]
                                    transition-transform
                                    duration-500
                                    group-hover:scale-110
                                "
                            >
                                <span className="text-lg font-bold">
                                    C
                                </span>
                            </div>

                            <p className="text-sm font-semibold uppercase tracking-wider text-slate-400">
                                Client
                            </p>

                            <p className="mt-2 text-xl font-bold text-slate-900">
                                {project.client}
                            </p>

                            <div
                                className="
                                    absolute
                                    -bottom-10
                                    -right-10
                                    h-28
                                    w-28
                                    rounded-full
                                    bg-[#EAF6FC]
                                    opacity-0
                                    blur-2xl
                                    transition-opacity
                                    duration-500
                                    group-hover:opacity-100
                                "
                            />
                        </div>


                        {/* Year */}
                        <div
                            className="
                                sabarat-fade-up
                                sabarat-delay-1
                                group
                                relative
                                overflow-hidden
                                rounded-3xl
                                border
                                border-slate-200
                                bg-white
                                p-7
                                shadow-sm
                                transition-all
                                duration-500
                                hover:-translate-y-2
                                hover:border-[#5EA8CC]/30
                                hover:shadow-xl
                            "
                        >
                            <div
                                className="
                                    mb-6
                                    flex
                                    h-12
                                    w-12
                                    items-center
                                    justify-center
                                    rounded-2xl
                                    bg-slate-100
                                    text-slate-700
                                    transition-transform
                                    duration-500
                                    group-hover:scale-110
                                "
                            >
                                <span className="text-lg font-bold">
                                    Y
                                </span>
                            </div>

                            <p className="text-sm font-semibold uppercase tracking-wider text-slate-400">
                                Year
                            </p>

                            <p className="mt-2 text-xl font-bold text-slate-900">
                                {project.year}
                            </p>

                            <div
                                className="
                                    absolute
                                    -bottom-10
                                    -right-10
                                    h-28
                                    w-28
                                    rounded-full
                                    bg-slate-100
                                    opacity-0
                                    blur-2xl
                                    transition-opacity
                                    duration-500
                                    group-hover:opacity-100
                                "
                            />
                        </div>


                        {/* Category */}
                        <div
                            className="
                                sabarat-fade-up
                                sabarat-delay-2
                                group
                                relative
                                overflow-hidden
                                rounded-3xl
                                border
                                border-slate-200
                                bg-white
                                p-7
                                shadow-sm
                                transition-all
                                duration-500
                                hover:-translate-y-2
                                hover:border-[#5EA8CC]/30
                                hover:shadow-xl
                            "
                        >
                            <div
                                className="
                                    mb-6
                                    flex
                                    h-12
                                    w-12
                                    items-center
                                    justify-center
                                    rounded-2xl
                                    bg-[#EAF6FC]
                                    text-[#5EA8CC]
                                    transition-transform
                                    duration-500
                                    group-hover:scale-110
                                "
                            >
                                <span className="text-lg font-bold">
                                    #
                                </span>
                            </div>

                            <p className="text-sm font-semibold uppercase tracking-wider text-slate-400">
                                Category
                            </p>

                            <p className="mt-2 text-xl font-bold text-[#5EA8CC]">
                                {project.categoryLabel}
                            </p>

                            <div
                                className="
                                    absolute
                                    -bottom-10
                                    -right-10
                                    h-28
                                    w-28
                                    rounded-full
                                    bg-[#EAF6FC]
                                    opacity-0
                                    blur-2xl
                                    transition-opacity
                                    duration-500
                                    group-hover:opacity-100
                                "
                            />
                        </div>

                    </div>


                    {/* =========================
                        Services
                    ========================= */}
                    <div
                        className="
                            sabarat-fade-up
                            sabarat-delay-3
                            mt-6
                            rounded-3xl
                            border
                            border-slate-200
                            bg-slate-50
                            p-7
                            lg:p-8
                        "
                    >
                        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

                            <div>
                                <p className="text-sm font-semibold uppercase tracking-wider text-slate-400">
                                    Services Delivered
                                </p>

                                <h3 className="mt-2 text-2xl font-bold text-slate-900">
                                    What We Worked On
                                </h3>
                            </div>


                            <div className="flex flex-wrap gap-2 lg:max-w-3xl lg:justify-end">
                                {project.services.map((service) => (
                                    <span
                                        key={service}
                                        className="
                                            rounded-full
                                            border
                                            border-slate-200
                                            bg-white
                                            px-4
                                            py-2
                                            text-sm
                                            font-semibold
                                            text-slate-600
                                            shadow-sm
                                            transition-all
                                            duration-300
                                            hover:-translate-y-0.5
                                            hover:border-[#5EA8CC]/30
                                            hover:bg-[#EAF6FC]
                                            hover:text-[#5EA8CC]
                                        "
                                    >
                                        {service}
                                    </span>
                                ))}
                            </div>

                        </div>
                    </div>

                </div>
            </Container>
        </section>
    );
}

export default PortfolioOverview;