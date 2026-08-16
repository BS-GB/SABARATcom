import {
    ArrowRight,
    CheckCircle2,
    Lightbulb,
    Target,
    Users,
    Sparkles,
    Rocket,
} from "lucide-react";

import { Link } from "react-router-dom";
import Container from "../components/ui/Container";

function AboutPage() {
    return (
        <main className="min-h-screen overflow-hidden bg-white text-slate-950">

            {/* =====================================================
                Hero
            ===================================================== */}

            <section className="relative overflow-hidden bg-slate-950 py-24 text-white sm:py-32">

                {/* Background Effects */}

                <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-[#5EA8CC]/10 blur-3xl" />

                <div className="pointer-events-none absolute -bottom-40 -right-20 h-[30rem] w-[30rem] rounded-full bg-[#5EA8CC]/10 blur-3xl" />

                <div className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.03] blur-3xl" />

                <Container>

                    <div className="relative mx-auto max-w-4xl text-center">

                        <div className="animate-[fadeIn_0.8s_ease-out]">

                            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm font-black tracking-wide text-[#5EA8CC] backdrop-blur-sm">

                                <Sparkles size={16} />

                                SABARAT

                            </span>

                        </div>

                        <h1 className="mt-7 text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">

                            We Turn Ideas Into
                            <span className="block text-[#5EA8CC]">
                                Meaningful Brands.
                            </span>

                        </h1>

                        <p className="mx-auto mt-7 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">

                            SABARAT is a creative digital agency focused on
                            building brands, experiences, and digital solutions
                            that help businesses move forward.

                        </p>

                        <div className="mx-auto mt-8 h-1 w-16 rounded-full bg-[#5EA8CC]" />

                    </div>

                </Container>

            </section>


            {/* =====================================================
                Who We Are
            ===================================================== */}

            <section className="relative overflow-hidden py-20 sm:py-28">

                <Container>

                    <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">

                        {/* Text */}

                        <div>

                            <p className="text-sm font-black uppercase tracking-[0.2em] text-[#5EA8CC]">
                                Who We Are
                            </p>

                            <h2 className="mt-4 max-w-2xl text-3xl font-black leading-tight tracking-tight text-slate-950 sm:text-4xl">

                                A creative team built around
                                <span className="text-[#5EA8CC]">
                                    {" "}ideas, people, and impact.
                                </span>

                            </h2>

                            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-500">

                                We believe great work starts with understanding.
                                We listen, explore, and transform ideas into
                                clear digital experiences that connect businesses
                                with the people they want to reach.

                            </p>

                            <p className="mt-4 max-w-2xl text-base leading-8 text-slate-500">

                                From the first idea to the final result,
                                we combine creativity, strategy, and technology
                                to create work that feels purposeful.

                            </p>

                        </div>


                        {/* Visual */}

                        <div className="relative">

                            <div className="absolute -inset-6 rounded-[3rem] bg-[#5EA8CC]/10 blur-3xl" />

                            <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-950 p-8 shadow-2xl">

                                <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-[#5EA8CC]/10 blur-3xl" />

                                <div className="relative">

                                    <p className="text-sm font-bold text-[#5EA8CC]">
                                        OUR APPROACH
                                    </p>

                                    <h3 className="mt-4 text-3xl font-black text-white">
                                        Think.
                                        <br />
                                        Create.
                                        <br />
                                        Deliver.
                                    </h3>

                                    <div className="mt-8 grid grid-cols-2 gap-4">

                                        <Stat
                                            value="Creative"
                                            label="Mindset"
                                        />

                                        <Stat
                                            value="Digital"
                                            label="Experience"
                                        />

                                        <Stat
                                            value="Human"
                                            label="Connection"
                                        />

                                        <Stat
                                            value="Real"
                                            label="Impact"
                                        />

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </Container>

            </section>


            {/* =====================================================
                What We Believe
            ===================================================== */}

            <section className="bg-slate-50 py-20 sm:py-28">

                <Container>

                    <div className="mx-auto max-w-3xl text-center">

                        <p className="text-sm font-black uppercase tracking-[0.2em] text-[#5EA8CC]">
                            What We Believe
                        </p>

                        <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
                            Simple principles.
                            <br />
                            <span className="text-[#5EA8CC]">
                                Meaningful results.
                            </span>
                        </h2>

                        <p className="mt-5 leading-8 text-slate-500">
                            We keep our philosophy simple and let the quality
                            of our work speak for itself.
                        </p>

                    </div>


                    <div className="mx-auto mt-12 grid max-w-6xl gap-5 md:grid-cols-3">

                        <BeliefCard
                            icon={Lightbulb}
                            title="Think Differently"
                            description="We look beyond the obvious to find ideas that make brands memorable."
                        />

                        <BeliefCard
                            icon={Target}
                            title="Stay Focused"
                            description="Every creative decision should serve a clear purpose and move the project forward."
                        />

                        <BeliefCard
                            icon={Users}
                            title="Put People First"
                            description="We create experiences that feel natural, useful, and meaningful to real people."
                        />

                    </div>

                </Container>

            </section>


            {/* =====================================================
                How We Work
            ===================================================== */}

            <section className="py-20 sm:py-28">

                <Container>

                    <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">

                        <div>

                            <p className="text-sm font-black uppercase tracking-[0.2em] text-[#5EA8CC]">
                                How We Work
                            </p>

                            <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">

                                From idea
                                <span className="text-[#5EA8CC]">
                                    {" "}to impact.
                                </span>

                            </h2>

                            <p className="mt-5 max-w-md leading-8 text-slate-500">

                                We keep the process clear, collaborative,
                                and focused on creating something that matters.

                            </p>

                        </div>


                        <div className="space-y-5">

                            <ProcessCard
                                number="01"
                                title="Understand"
                                description="We learn about your business, audience, goals, and challenges."
                            />

                            <ProcessCard
                                number="02"
                                title="Create"
                                description="We turn insights into creative ideas, strategies, and digital experiences."
                            />

                            <ProcessCard
                                number="03"
                                title="Deliver"
                                description="We refine, launch, and help turn the final idea into something real."
                            />

                        </div>

                    </div>

                </Container>

            </section>


            {/* =====================================================
                Why SABARAT
            ===================================================== */}

            <section className="bg-slate-950 py-20 text-white sm:py-28">

                <Container>

                    <div className="grid items-center gap-12 lg:grid-cols-2">

                        <div>

                            <p className="text-sm font-black uppercase tracking-[0.2em] text-[#5EA8CC]">
                                Why SABARAT
                            </p>

                            <h2 className="mt-4 text-3xl font-black leading-tight sm:text-4xl">

                                More than a service.
                                <span className="block text-[#5EA8CC]">
                                    A creative partner.
                                </span>

                            </h2>

                            <p className="mt-6 max-w-xl leading-8 text-slate-300">

                                We don't believe in one-size-fits-all solutions.
                                Every business has its own story, challenges,
                                and ambitions — and our work starts there.

                            </p>

                        </div>


                        <div className="grid gap-4 sm:grid-cols-2">

                            <Feature
                                text="Creative thinking"
                            />

                            <Feature
                                text="Clear communication"
                            />

                            <Feature
                                text="Purpose-driven design"
                            />

                            <Feature
                                text="Digital-first mindset"
                            />

                            <Feature
                                text="Collaborative process"
                            />

                            <Feature
                                text="Long-term vision"
                            />

                        </div>

                    </div>

                </Container>

            </section>


            {/* =====================================================
                CTA
            ===================================================== */}

            <section className="relative overflow-hidden py-20 sm:py-28">

                <Container>

                    <div className="group relative overflow-hidden rounded-[2rem] bg-slate-950 px-6 py-16 text-center text-white shadow-2xl sm:px-12">

                        <div className="pointer-events-none absolute -left-24 -top-24 h-80 w-80 rounded-full bg-[#5EA8CC]/10 blur-3xl transition duration-700 group-hover:scale-125" />

                        <div className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-[#5EA8CC]/10 blur-3xl transition duration-700 group-hover:scale-125" />

                        <div className="relative z-10 mx-auto max-w-3xl">

                            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#5EA8CC]/10 text-[#5EA8CC]">

                                <Rocket size={26} />

                            </div>

                            <h2 className="mt-6 text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">

                                Ready to build something
                                <span className="text-[#5EA8CC]">
                                    {" "}great?
                                </span>

                            </h2>

                            <p className="mx-auto mt-5 max-w-2xl leading-8 text-slate-300">

                                Explore our services and discover how SABARAT
                                can help bring your next idea to life.

                            </p>

                            <Link
                                to="/services"
                                className="mt-8 inline-flex items-center justify-center gap-3 rounded-xl bg-[#5EA8CC] px-7 py-4 font-black text-white shadow-xl shadow-[#5EA8CC]/20 transition duration-300 hover:-translate-y-1 hover:bg-[#4d96ba] hover:shadow-2xl hover:shadow-[#5EA8CC]/30"
                            >

                                Explore Our Services

                                <ArrowRight
                                    size={19}
                                    className="transition duration-300 group-hover:translate-x-1"
                                />

                            </Link>

                        </div>

                    </div>

                </Container>

            </section>

        </main>
    );
}


/* =========================================================
   Stat
========================================================= */

function Stat({
    value,
    label,
}) {
    return (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">

            <p className="font-black text-white">
                {value}
            </p>

            <p className="mt-1 text-xs font-bold text-slate-400">
                {label}
            </p>

        </div>
    );
}


/* =========================================================
   Belief Card
========================================================= */

function BeliefCard({
    icon: Icon,
    title,
    description,
}) {
    return (
        <div className="group rounded-[1.5rem] border border-slate-200 bg-white p-7 shadow-sm transition duration-500 hover:-translate-y-2 hover:border-[#5EA8CC]/30 hover:shadow-2xl hover:shadow-slate-900/10">

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#5EA8CC]/10 text-[#5EA8CC] transition duration-500 group-hover:scale-110 group-hover:bg-[#5EA8CC] group-hover:text-white">

                <Icon size={25} />

            </div>

            <h3 className="mt-6 text-xl font-black text-slate-950">
                {title}
            </h3>

            <p className="mt-3 text-sm leading-7 text-slate-500">
                {description}
            </p>

        </div>
    );
}


/* =========================================================
   Process Card
========================================================= */

function ProcessCard({
    number,
    title,
    description,
}) {
    return (
        <div className="group flex gap-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-500 hover:-translate-y-1 hover:border-[#5EA8CC]/30 hover:shadow-xl">

            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-950 text-sm font-black text-white transition duration-300 group-hover:bg-[#5EA8CC]">

                {number}

            </div>

            <div>

                <h3 className="text-lg font-black text-slate-950">
                    {title}
                </h3>

                <p className="mt-2 text-sm leading-7 text-slate-500">
                    {description}
                </p>

            </div>

        </div>
    );
}


/* =========================================================
   Feature
========================================================= */

function Feature({
    text,
}) {
    return (
        <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 transition duration-300 hover:-translate-y-1 hover:border-[#5EA8CC]/30 hover:bg-white/[0.07]">

            <CheckCircle2
                size={19}
                className="shrink-0 text-[#5EA8CC]"
            />

            <span className="text-sm font-bold text-slate-200">
                {text}
            </span>

        </div>
    );
}


export default AboutPage;