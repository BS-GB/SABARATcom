import Container from "../ui/Container";
import Button from "../ui/Button";
import { Link } from "react-router-dom";

function ServicesCTA() {
    return (
        <section className="bg-slate-900 py-24">
            <Container>
                <div className="mx-auto max-w-4xl text-center">

                    <span className="inline-flex rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-[#8CC9E5]">
                        Let's Work Together
                    </span>

                    <h2 className="mt-6 text-4xl font-bold leading-tight text-white lg:text-5xl">
                        Ready to Grow Your Business?
                    </h2>

                    <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-300">
                        Whether you need a powerful marketing campaign,
                        a stronger brand, or a modern digital solution,
                        SABARAT is ready to help you turn your ideas into
                        real results.
                    </p>

                    <div className="mt-10 flex flex-wrap justify-center gap-4">

                        <Link to="/contact">
                            <Button
                                variant="primary"
                                size="lg"
                            >
                                Request a Free Consultation
                            </Button>
                        </Link>

                        <Link to="/portfolio">
                            <Button
                                variant="outline"
                                size="lg"
                                className="border-white text-white hover:bg-white hover:text-slate-900"
                            >
                                View Our Work
                            </Button>
                        </Link>

                    </div>

                </div>
            </Container>
        </section>
    );
}

export default ServicesCTA;