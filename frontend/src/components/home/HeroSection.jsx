import Container from "../ui/Container";
import Button from "../ui/Button";
import { hero } from "../../data/hero";

function HeroSection() {
    return (
        <section className="overflow-hidden bg-white py-24">
            <Container>
                <div className="grid items-center gap-12 md:grid-cols-2">

                    {/* =========================
                        Left Side
                    ========================== */}
                    <div>

                        {/* Badge */}
                        <span
                            className="
                                inline-flex
                                animate-pulse
                                rounded-full
                                bg-[#EAF6FC]
                                px-4
                                py-2
                                text-sm
                                font-semibold
                                text-[#5EA8CC]
                            "
                        >
                            {hero.badge}
                        </span>

                        {/* Title */}
                        <h1
                            className="
                                mt-6
                                text-5xl
                                font-extrabold
                                leading-tight
                                text-slate-900
                                transition-all
                                duration-500
                                hover:-translate-y-1
                                lg:text-6xl
                            "
                        >
                            {hero.title}
                        </h1>

                        {/* Description */}
                        <p
                            className="
                                mt-6
                                max-w-xl
                                text-lg
                                leading-8
                                text-slate-600
                            "
                        >
                            {hero.subtitle}
                        </p>

                        {/* Buttons */}
                        <div className="mt-10 flex flex-wrap gap-4">

                            <Button>
                                {hero.primaryButton}
                            </Button>

                            <Button variant="outline">
                                {hero.secondaryButton}
                            </Button>

                        </div>

                    </div>

                    {/* =========================
                        Right Side
                    ========================== */}
                    <div className="flex justify-center">

                        <div
                            className="
                                flex
                                h-96
                                w-full
                                items-center
                                justify-center
                                rounded-2xl
                                bg-slate-100
                                transition-all
                                duration-500
                                hover:-translate-y-2
                                hover:shadow-xl
                            "
                        >
                            <div className="text-center">
                                <h3 className="text-xl font-bold text-slate-700">
                                    SABARAT
                                </h3>
                                <p className="mt-3 text-slate-500">
                                    Marketing • Advertising • Digital Solutions
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </Container>
        </section>
    );
}

export default HeroSection;