import Container from "../ui/Container";
import Button from "../ui/Button";
import { Link } from "react-router-dom";
import { CheckCircle2 } from "../../assets/icons";

function ServiceHero({ service }) {
    const Icon = service.icon;

    return (
        <section className="relative overflow-hidden bg-slate-950 py-24 lg:py-32">

            {/* Background decoration */}
            <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[#5EA8CC]/20 blur-3xl" />

            <div className="pointer-events-none absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-[#EAF6FC]/10 blur-3xl" />

            <Container>
                <div className="relative grid items-center gap-16 lg:grid-cols-2">

                    {/* =========================
                        Left Content
                    ========================== */}
                    <div>

                        {/* Breadcrumb */}
                        <div className="mb-8 flex items-center gap-2 text-sm text-slate-400">
                            <Link
                                to="/services"
                                className="transition-colors hover:text-white"
                            >
                                Services
                            </Link>

                            <span>/</span>

                            <span className="text-slate-300">
                                {service.title}
                            </span>
                        </div>

                        {/* Icon + Label */}
                        <div className="mb-7 flex items-center gap-4">

                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#5EA8CC]/15 ring-1 ring-[#5EA8CC]/30">
                                <Icon
                                    size={28}
                                    className="text-[#8CC9E5]"
                                />
                            </div>

                            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-[#8CC9E5]">
                                Our Service
                            </span>

                        </div>

                        {/* Title */}
                        <h1 className="max-w-3xl text-5xl font-extrabold leading-tight tracking-tight text-white lg:text-6xl">
                            {service.title}
                        </h1>

                        {/* Description */}
                        <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300">
                            {service.description}
                        </p>

                        {/* Quick Features */}
                        <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3">

                            {service.features?.slice(0, 3).map((feature) => (
                                <div
                                    key={feature}
                                    className="flex items-center gap-2 text-sm text-slate-300"
                                >
                                    <CheckCircle2
                                        size={18}
                                        className="text-[#8CC9E5]"
                                    />

                                    <span>{feature}</span>
                                </div>
                            ))}

                        </div>

                        {/* Buttons */}
                        <div className="mt-10 flex flex-wrap gap-4">

                            <Link to="/contact">
                                <Button
                                    variant="primary"
                                    size="lg"
                                >
                                    Request a Quote
                                </Button>
                            </Link>

                            <Link to="/portfolio">
                                <Button
                                    variant="outline"
                                    size="lg"
                                    className="border-white/400 text-white hover:bg-white hover:text-slate-900"
                                >
                                    View Portfolio
                                </Button>
                            </Link>

                        </div>

                    </div>

                    {/* =========================
                        Right Visual
                    ========================== */}
                    <div className="relative">

                        {/* Main Card */}
                        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-sm">

                            {/* Top decoration */}
                            <div className="flex items-center justify-between">

                                <span className="text-sm font-medium text-slate-400">
                                    SABARAT
                                </span>

                                <div className="h-2 w-2 rounded-full bg-[#8CC9E5] shadow-[0_0_15px_#8CC9E5]" />

                            </div>

                            {/* Icon */}
                            <div className="mt-16 flex justify-center">

                                <div className="flex h-32 w-32 items-center justify-center rounded-[2rem] bg-[#5EA8CC]/10 ring-1 ring-[#5EA8CC]/20">

                                    <Icon
                                        size={64}
                                        strokeWidth={1.5}
                                        className="text-[#8CC9E5]"
                                    />

                                </div>

                            </div>

                            {/* Text */}
                            <div className="mt-10 text-center">

                                <h2 className="text-2xl font-bold text-white">
                                    {service.title}
                                </h2>

                                <p className="mt-3 text-sm leading-6 text-slate-400">
                                    Professional solutions designed to help your
                                    business grow and achieve measurable results.
                                </p>

                            </div>

                            {/* Bottom Stats */}
                            <div className="mt-10 grid grid-cols-3 gap-3">

                                <div className="rounded-2xl bg-white/5 p-4 text-center">
                                    <div className="text-xl font-bold text-white">
                                        01
                                    </div>

                                    <div className="mt-1 text-xs text-slate-500">
                                        Strategy
                                    </div>
                                </div>

                                <div className="rounded-2xl bg-white/5 p-4 text-center">
                                    <div className="text-xl font-bold text-white">
                                        02
                                    </div>

                                    <div className="mt-1 text-xs text-slate-500">
                                        Execution
                                    </div>
                                </div>

                                <div className="rounded-2xl bg-white/5 p-4 text-center">
                                    <div className="text-xl font-bold text-white">
                                        03
                                    </div>

                                    <div className="mt-1 text-xs text-slate-500">
                                        Results
                                    </div>
                                </div>

                            </div>

                        </div>

                    </div>

                </div>
            </Container>
        </section>
    );
}

export default ServiceHero;