import { useParams } from "react-router-dom";
import { services } from "../data/services";
import ServiceHero from "../components/service/ServiceHero";
import ServiceFeatures from "../components/service/ServiceFeatures";
import ServiceProcess from "../components/service/ServiceProcess";
import ServiceDetailsCTA from "../components/service/ServiceDetailsCTA";


function ServiceDetailsPage() {
    const { slug } = useParams();
    const service = services.find((item) => item.slug === slug);
    if (!service) {
        return <h1>Service Not Found</h1>;
    }

    return (



        <section className="py-24">

            <main className="text-4xl font-bold">

                <ServiceHero service={service} />
                <ServiceFeatures service={service} />
                <ServiceProcess />
                <ServiceDetailsCTA service={service} />
            </main>

        </section>
    );
}

export default ServiceDetailsPage;