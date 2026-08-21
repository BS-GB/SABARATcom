import { Check } from "lucide-react";
import { discoverySteps } from "../../data/discoveryForm";

function DiscoveryProgress({ currentStep, onStepChange }) {
    return (
        <div className="mb-10">

            {/* Desktop Progress */}
            <div className="hidden lg:flex items-center justify-between">

                {discoverySteps.map((step, index) => {

                    const completed = currentStep > step.id;
                    const active = currentStep === step.id;

                    return (
                        <div
                            key={step.id}
                            className="flex flex-1 items-center"
                        >

                            <button
                                type="button"
                                onClick={() => onStepChange?.(step.id)}
                                className="flex flex-col items-center group"
                                aria-label={`الانتقال إلى ${step.title}`}
                            >

                                <div
                                    className={`
                                        flex h-11 w-11 items-center justify-center
                                        rounded-full border-2
                                        text-sm font-bold
                                        transition-all duration-500
                                        group-hover:scale-105
                                        ${completed
                                            ? "border-[#5EA8CC] bg-[#5EA8CC] text-white"
                                            : active
                                                ? "border-[#5EA8CC] bg-white text-[#5EA8CC] shadow-lg shadow-[#5EA8CC]/20"
                                                : "border-slate-200 bg-white text-slate-400 hover:border-[#5EA8CC]/40"
                                        }
                                    `}
                                >
                                    {completed ? (
                                        <Check size={18} />
                                    ) : (
                                        step.id
                                    )}
                                </div>

                                <span
                                    className={`
                                        mt-3 hidden xl:block text-xs font-semibold
                                        ${active
                                            ? "text-[#5EA8CC]"
                                            : "text-slate-400"
                                        }
                                    `}
                                >
                                    {step.title}
                                </span>

                            </button>

                            {index !== discoverySteps.length - 1 && (
                                <div
                                    className={`
                                        mx-2 h-[2px] flex-1
                                        transition-colors duration-500
                                        ${currentStep > step.id
                                            ? "bg-[#5EA8CC]"
                                            : "bg-slate-200"
                                        }
                                    `}
                                />
                            )}

                        </div>
                    );
                })}

            </div>

            {/* Mobile Progress */}
            <div className="lg:hidden">

                <div className="flex items-center justify-between">

                    <div>
                        <p className="text-xs font-bold uppercase tracking-widest text-[#5EA8CC]">
                            الخطوة {currentStep} / {discoverySteps.length}
                        </p>

                        <h2 className="mt-1 text-xl font-extrabold text-slate-900">
                            {discoverySteps[currentStep - 1]?.title || ""}
                        </h2>
                    </div>

                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#EAF6FC] text-sm font-extrabold text-[#5EA8CC]">
                        {Math.round((currentStep / discoverySteps.length) * 100)}%
                    </div>

                </div>

                <div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-200">

                    <div
                        className="h-full rounded-full bg-[#5EA8CC] transition-all duration-500"
                        style={{
                            width: `${(currentStep / discoverySteps.length) * 100}%`,
                        }}
                    />

                </div>

            </div>

        </div>
    );
}

export default DiscoveryProgress;