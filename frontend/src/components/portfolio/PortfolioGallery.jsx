import Container from "../ui/Container";

function PortfolioGallery({ project }) {
    const gallery = project?.gallery ?? [];

    if (gallery.length === 0) {
        return (
            <section className="bg-slate-50 py-24 lg:py-32">
                <Container>
                    <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center">
                        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#5EA8CC]">
                            Project Gallery
                        </p>

                        <h2 className="mt-4 text-3xl font-extrabold text-slate-900">
                            Visuals Coming Soon
                        </h2>

                        <p className="mx-auto mt-4 max-w-xl leading-7 text-slate-600">
                            We are preparing the project visuals and will
                            showcase them here soon.
                        </p>
                    </div>
                </Container>
            </section>
        );
    }

    return (
        <section className="relative overflow-hidden bg-slate-50 py-24 lg:py-32">

            {/* =========================
                Background Decoration
            ========================= */}

            <div
                className="
                    pointer-events-none
                    absolute
                    -left-40
                    top-20
                    h-80
                    w-80
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
                    h-96
                    w-96
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
                        sabarat-fade-up
                        relative
                        flex
                        flex-col
                        justify-between
                        gap-6
                        md:flex-row
                        md:items-end
                    "
                >

                    <div>

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
                                Project Gallery
                            </span>

                        </div>


                        <h2
                            className="
                                mt-5
                                text-4xl
                                font-extrabold
                                tracking-tight
                                text-slate-900
                                lg:text-5xl
                            "
                        >
                            A Closer Look
                        </h2>


                        <p
                            className="
                                mt-4
                                max-w-xl
                                text-lg
                                leading-8
                                text-slate-600
                            "
                        >
                            Explore selected visuals from this project and
                            discover the details behind the final experience.
                        </p>

                    </div>


                    {/* Visual Counter */}

                    <div
                        className="
                            flex
                            items-center
                            gap-3
                            self-start
                            rounded-full
                            border
                            border-slate-200
                            bg-white
                            px-4
                            py-2
                            shadow-sm
                            md:self-auto
                        "
                    >
                        <span className="h-2 w-2 rounded-full bg-[#5EA8CC]" />

                        <span className="text-sm font-semibold text-slate-500">
                            {gallery.length} Visuals
                        </span>
                    </div>

                </div>


                {/* =========================
                    Gallery
                ========================= */}

                <div className="mt-14 grid gap-5 lg:grid-cols-12">

                    {/* =========================
                        Main Image
                    ========================= */}

                    <div
                        className="
                            sabarat-fade-up
                            group
                            relative
                            overflow-hidden
                            rounded-[2rem]
                            border
                            border-slate-200
                            bg-slate-900
                            shadow-xl
                            lg:col-span-7
                        "
                    >

                        {/* Glow */}

                        <div
                            className="
                                pointer-events-none
                                absolute
                                -inset-5
                                z-0
                                rounded-[2rem]
                                bg-[#5EA8CC]/10
                                opacity-0
                                blur-2xl
                                transition-opacity
                                duration-700
                                group-hover:opacity-100
                            "
                        />


                        <img
                            src={gallery[0]}
                            alt={`${project.title} preview 1`}
                            loading="lazy"
                            className="
                                relative
                                z-10
                                h-[420px]
                                w-full
                                object-cover
                                transition-transform
                                duration-1000
                                ease-out
                                group-hover:scale-105
                                lg:h-[560px]
                            "
                        />


                        {/* Dark Gradient */}

                        <div
                            className="
                                pointer-events-none
                                absolute
                                inset-0
                                z-20
                                bg-gradient-to-t
                                from-slate-950/80
                                via-slate-950/10
                                to-transparent
                            "
                        />


                        {/* Featured Label */}

                        <div
                            className="
                                absolute
                                left-6
                                top-6
                                z-30
                                rounded-full
                                border
                                border-white/20
                                bg-slate-950/40
                                px-4
                                py-2
                                text-xs
                                font-bold
                                uppercase
                                tracking-[0.15em]
                                text-white
                                backdrop-blur-md
                            "
                        >
                            Featured
                        </div>


                        {/* Main Content */}

                        <div
                            className="
                                absolute
                                bottom-0
                                left-0
                                right-0
                                z-30
                                p-7
                                lg:p-8
                            "
                        >

                            <p className="text-sm font-semibold text-white/60">
                                01 / {String(gallery.length).padStart(2, "0")}
                            </p>

                            <h3
                                className="
                                    mt-2
                                    text-2xl
                                    font-bold
                                    text-white
                                    lg:text-3xl
                                "
                            >
                                {project.title}
                            </h3>

                        </div>

                    </div>


                    {/* =========================
                        Secondary Images
                    ========================= */}

                    <div className="grid gap-5 lg:col-span-5">

                        {gallery.slice(1).map((image, index) => (

                            <div
                                key={image}
                                className="
                                    sabarat-fade-up
                                    group
                                    relative
                                    overflow-hidden
                                    rounded-[2rem]
                                    border
                                    border-slate-200
                                    bg-slate-900
                                    shadow-lg
                                "
                                style={{
                                    animationDelay: `${(index + 1) * 120}ms`,
                                }}
                            >

                                <img
                                    src={image}
                                    alt={`${project.title} preview ${index + 2}`}
                                    loading="lazy"
                                    className="
                                        h-[260px]
                                        w-full
                                        object-cover
                                        transition-transform
                                        duration-1000
                                        ease-out
                                        group-hover:scale-110
                                        lg:h-full
                                    "
                                />


                                {/* Overlay */}

                                <div
                                    className="
                                        absolute
                                        inset-0
                                        bg-gradient-to-t
                                        from-slate-950/50
                                        via-transparent
                                        to-transparent
                                        opacity-60
                                        transition-opacity
                                        duration-500
                                        group-hover:opacity-100
                                    "
                                />


                                {/* Image Number */}

                                <div
                                    className="
                                        absolute
                                        right-5
                                        top-5
                                        flex
                                        h-11
                                        w-11
                                        translate-y-2
                                        items-center
                                        justify-center
                                        rounded-full
                                        border
                                        border-white/30
                                        bg-white/90
                                        text-sm
                                        font-bold
                                        text-slate-900
                                        opacity-0
                                        shadow-xl
                                        backdrop-blur-md
                                        transition-all
                                        duration-500
                                        group-hover:translate-y-0
                                        group-hover:opacity-100
                                    "
                                >
                                    {String(index + 2).padStart(2, "0")}
                                </div>


                                {/* Bottom indicator */}

                                <div
                                    className="
                                        absolute
                                        bottom-5
                                        left-5
                                        h-1
                                        w-8
                                        rounded-full
                                        bg-white
                                        transition-all
                                        duration-500
                                        group-hover:w-20
                                    "
                                />

                            </div>

                        ))}

                    </div>

                </div>


                {/* =========================
                    Gallery Footer
                ========================= */}

                <div
                    className="
                        sabarat-fade-up
                        mt-10
                        flex
                        flex-col
                        items-start
                        justify-between
                        gap-4
                        border-t
                        border-slate-200
                        pt-6
                        sm:flex-row
                        sm:items-center
                    "
                >

                    <p className="text-sm text-slate-500">
                        Selected visuals from the{" "}
                        <span className="font-semibold text-slate-700">
                            {project.title}
                        </span>{" "}
                        project.
                    </p>


                    <div className="flex items-center gap-2">

                        {gallery.map((_, index) => (
                            <span
                                key={index}
                                className={`
                                    h-1.5
                                    rounded-full
                                    transition-all
                                    duration-300
                                    ${
                                        index === 0
                                            ? "w-8 bg-[#5EA8CC]"
                                            : "w-1.5 bg-slate-300"
                                    }
                                `}
                            />
                        ))}

                    </div>

                </div>

            </Container>
        </section>
    );
}

export default PortfolioGallery;