import Container from "../ui/Container";
import Button from "../ui/Button";
import { Link } from "react-router-dom";
import { servicesHero } from "../../data/ServicesHero";

function ServicesHero() {
    return (
        <section className="bg-white py-24">
            <Container>
                <div className="mx-auto max-w-4xl text-center">

                    {/* Badge */}
                    <span
                        className="
                            inline-flex
                            rounded-full
                            bg-[#EAF6FC]
                            px-4
                            py-2
                            text-sm
                            font-semibold
                            text-[#5EA8CC]
                        "
                    >
                        {servicesHero.badge}
                    </span>

                    {/* Title */}
                    <h1
                        className="
                            mt-6
                            text-5xl
                            font-extrabold
                            leading-tight
                            text-slate-900
                            lg:text-6xl
                        "
                    >
                        {servicesHero.title}
                    </h1>

                    {/* Description */}
                    <p
                        className="
                            mx-auto
                            mt-6
                            max-w-3xl
                            text-lg
                            leading-8
                            text-slate-600
                        "
                    >
                        {servicesHero.description}
                    </p>

                    {/* Actions */}
                    <div className="mt-10 flex flex-wrap justify-center gap-4">

                        <Link to="/contact">
                            <Button
                                variant="primary"
                                size="lg"
                            >
                                {servicesHero.primaryButton}
                            </Button>
                        </Link>

                        <Link to="/portfolio">
                            <Button
                                variant="outline"
                                size="lg"
                            >
                                {servicesHero.secondaryButton}
                            </Button>
                        </Link>

                    </div>

                </div>
            </Container>
        </section>
    );
}

export default ServicesHero;