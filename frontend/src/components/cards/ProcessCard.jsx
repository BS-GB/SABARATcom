import Card from "../ui/Card";

function ProcessCard({ step }) {
    const Icon = step.icon;

    return (
        <Card className="group h-full p-8 text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#EAF6FC] transition-all duration-300 group-hover:bg-[#5EA8CC]">
                <Icon
                    size={30}
                    className="text-[#5EA8CC] transition-all duration-300 group-hover:scale-110 group-hover:text-white"
                />
            </div>
            <span className="mt-6 block text-sm font-bold tracking-widest text-[#5EA8CC]">
                STEP {step.id}
            </span>
            <h3 className="mt-3 text-2xl font-bold text-slate-900">
                {step.title}
            </h3>
            <p className="mt-4 leading-7 text-slate-600">
                {step.description}
            </p>
        </Card>
    );
}

export default ProcessCard;