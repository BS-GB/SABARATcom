import Container from "../ui/Container";
import { stats } from "../../data/stats";

function TrustedSection() {
    return (
        <section className="bg-slate-50 py-20">
            <Container>
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-slate-900">
                        Trusted by Businesses Across Industries
                    </h2>
                    
                    <p className="mt-4 text-slate-600">
                        We help brands grow through strategy, creativity, and technology.
                    </p>
                </div>

                <div className="mt-16 grid gap-8 text-center sm:grid-cols-2 lg:grid-cols-4">
                    {stats.map((item) => (
                        <div
                            key={item.id}
                            className="rounded-xl bg-white p-8 shadow-sm"
                        >
                            <h3 className="text-4xl font-bold text-blue-600">
                                {item.value}
                            </h3>

                            <p className="mt-2 text-slate-600">
                                {item.label}
                            </p>
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    );
}

export default TrustedSection;