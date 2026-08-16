import Card from "../ui/Card";

function WhyChooseCard({ item }) {
    const Icon = item.icon;

    return (
        <Card className="h-full p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#EAF6FC]">
                <Icon
                    size={28}
                    className="text-[#5EA8CC] "
                />
            </div>

            <h3 className="text-2xl font-bold text-slate-900">
                {item.title}
            </h3>

            <p className="mt-4 leading-7 text-slate-600">
                {item.description}
            </p>
        </Card>
    );
}

export default WhyChooseCard;