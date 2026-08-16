import { Link } from "react-router-dom";
import { ArrowLeft, Frown } from "lucide-react";

import Container from "../components/ui/Container";

function NotFoundPage() {
    return (
        <main className="min-h-screen bg-slate-950 text-white">
            <Container>
                <section className="flex min-h-screen items-center justify-center py-20">
                    <div className="w-full max-w-2xl text-center">

                        {/* 404 مع الوجه الحزين */}
                        <div className="relative mx-auto w-fit">

                            <div className="absolute inset-0 -z-10 rounded-full bg-[#5EA8CC]/10 blur-3xl" />

                            {/* إضافة الأيقونة هنا لتتوسط رقم 404 */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <Frown 
                                    size={64} 
                                    className="text-[#5EA8CC]/40 animate-pulse sm:size-24" 
                                />
                            </div>

                            <p className="text-[8rem] font-black leading-none tracking-tighter text-[#5EA8CC]/20 sm:text-[12rem]">
                                404
                            </p>

                        </div>

                        {/* Content */}
                        <div className="-mt-8 sm:-mt-12">

                            <p className="text-sm font-black uppercase tracking-[0.25em] text-[#5EA8CC]">
                                SABARAT
                            </p>

                            <h1 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
                                Page Not Found
                            </h1>

                            <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-slate-400 sm:text-base">
                                The page you are looking for does not exist
                                or may have been moved.
                            </p>

                            {/* CTA */}
                            <Link
                                to="/"
                                className="
                                    group
                                    mt-8
                                    inline-flex
                                    items-center
                                    justify-center
                                    gap-3
                                    rounded-xl
                                    bg-[#5EA8CC]
                                    px-6
                                    py-3.5
                                    font-black
                                    text-white
                                    shadow-lg
                                    shadow-[#5EA8CC]/20
                                    transition-all
                                    duration-300
                                    hover:-translate-y-1
                                    hover:bg-[#4d96ba]
                                    hover:shadow-xl
                                "
                            >
                                <ArrowLeft
                                    size={18}
                                    className="
                                        transition-transform
                                        duration-300
                                        group-hover:-translate-x-1
                                    "
                                />

                                Back to Home
                            </Link>

                        </div>

                    </div>
                </section>
            </Container>
        </main>
    );
}

export default NotFoundPage;