import { Link } from "react-router-dom";
import Button from "../ui/Button";
import Card from "../ui/Card";
import { ArrowRight } from "../../assets/icons";

function ServiceCard({ service }) {
    const Icon = service.icon;

    return (
        <Link
            to={`/services/${service.slug}`}
            className="block h-full"
        >
            <Card className="group h-full p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">

                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#EAF6FC] transition-all duration-300 group-hover:bg-[#5EA8CC]">
                    <Icon
                        size={30}
                        className="text-[#5EA8CC] transition-all duration-300 group-hover:scale-110 group-hover:text-white"
                    />
                </div>

                <h3 className="text-xl font-bold text-slate-900">
                    {service.title}
                </h3>

                <p className="mt-4 leading-7 text-slate-600">
                    {service.description}
                </p>

                <div className="mt-8">
                    <Button variant="primary">
                        <span className="flex items-center gap-2">
                            Learn More
                            <ArrowRight size={18} />
                        </span>
                    </Button>
                </div>

            </Card>
        </Link>
    );
}

export default ServiceCard;