import { Link } from "react-router-dom";
import { ArrowLeft, ShieldCheck } from "lucide-react";

import Container from "../components/ui/Container";

function AuthLayout({
    children,
    title,
    description,
    footerText,
    footerLinkText,
    footerLinkTo,
}) {
    return (
        <main className="min-h-screen bg-slate-950 text-white">
            <div className="relative min-h-screen overflow-hidden">

                {/* =====================================================
                    Background Effects
                ===================================================== */}

                <div className="pointer-events-none absolute -left-40 -top-40 h-96 w-96 rounded-full bg-[#5EA8CC]/10 blur-3xl" />

                <div className="pointer-events-none absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-[#5EA8CC]/10 blur-3xl" />

                <div className="pointer-events-none absolute left-1/2 top-1/2 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#5EA8CC]/[0.03] blur-3xl" />

                {/* Decorative Grid */}
                <div className="pointer-events-none absolute inset-0 opacity-[0.025]">
                    <div
                        className="h-full w-full"
                        style={{
                            backgroundImage:
                                "linear-gradient(#94a3b8 1px, transparent 1px), linear-gradient(90deg, #94a3b8 1px, transparent 1px)",
                            backgroundSize: "50px 50px",
                        }}
                    />
                </div>

                <Container>
                    <div className="relative flex min-h-screen items-center justify-center py-12">

                        <div className="w-full max-w-md">

                            {/* =====================================================
                                Brand
                            ===================================================== */}

                            <div className="mb-8 text-center">

                                <Link
                                    to="/"
                                    className="group inline-flex items-center"
                                >
                                    <span className="text-3xl font-black tracking-tight text-[#5EA8CC] transition duration-300 group-hover:text-white">
                                        SABARAT
                                    </span>
                                </Link>

                                <p className="mt-2 text-[11px] font-bold uppercase tracking-[0.25em] text-slate-500">
                                    Digital Marketing & Creative Solutions
                                </p>

                            </div>

                            {/* =====================================================
                                Main Card
                            ===================================================== */}

                            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.045] p-6 shadow-2xl shadow-black/30 backdrop-blur-2xl sm:p-8">

                                {/* Card Glow */}
                                <div className="pointer-events-none absolute -right-24 -top-24 h-48 w-48 rounded-full bg-[#5EA8CC]/10 blur-3xl" />

                                <div className="relative z-10">

                                    {/* Header */}

                                    <div className="mb-8">

                                        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#5EA8CC]/20 bg-[#5EA8CC]/10 px-3 py-1.5 text-xs font-bold text-[#5EA8CC]">
                                            <ShieldCheck size={14} />
                                            Secure Client Area
                                        </div>

                                        <h1 className="text-2xl font-black tracking-tight text-white sm:text-3xl">
                                            {title}
                                        </h1>

                                        <p className="mt-3 text-sm leading-7 text-slate-400">
                                            {description}
                                        </p>

                                    </div>

                                    {children}

                                </div>

                            </div>

                            {/* =====================================================
                                Footer Link
                            ===================================================== */}

                            {footerText && footerLinkText && footerLinkTo && (
                                <div className="mt-6 text-center text-sm text-slate-500">

                                    {footerText}{" "}

                                    <Link
                                        to={footerLinkTo}
                                        className="font-black text-[#5EA8CC] transition hover:text-white"
                                    >
                                        {footerLinkText}
                                    </Link>

                                </div>
                            )}

                            {/* =====================================================
                                Back
                            ===================================================== */}

                            <div className="mt-6 text-center">

                                <Link
                                    to="/"
                                    className="group inline-flex items-center gap-2 text-xs font-bold text-slate-500 transition hover:text-white"
                                >
                                    <ArrowLeft
                                        size={15}
                                        className="transition group-hover:-translate-x-1"
                                    />

                                    Back to website
                                </Link>

                            </div>

                        </div>

                    </div>
                </Container>

            </div>
        </main>
    );
}

export default AuthLayout;