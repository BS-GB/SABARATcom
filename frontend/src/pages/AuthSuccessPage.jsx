import {
    ArrowRight,
    CheckCircle2,
    LogIn,
    UserPlus,
} from "lucide-react";
import {
    Link,
    useLocation,
} from "react-router-dom";

function AuthSuccessPage() {

    const location = useLocation();

    const type =
        location.state?.type === "register"
            ? "register"
            : "login";

    const isRegistration =
        type === "register";

    return (
        <div className="text-center">

            {/* =====================================================
                Success Icon
            ===================================================== */}

            <div className="mb-7 flex justify-center">

                <div
                    className="
                        flex
                        h-16
                        w-16
                        items-center
                        justify-center
                        rounded-2xl
                        bg-emerald-400/10
                        text-emerald-400
                        shadow-lg
                        shadow-emerald-500/10
                    "
                >
                    <CheckCircle2 size={32} />
                </div>

            </div>

            {/* =====================================================
                Title
            ===================================================== */}

            <h1
                className="
                    text-2xl
                    font-black
                    tracking-tight
                    text-white
                    sm:text-3xl
                "
            >
                {isRegistration
                    ? "Account created successfully"
                    : "Signed in successfully"
                }
            </h1>

            {/* =====================================================
                Description
            ===================================================== */}

            <p
                className="
                    mx-auto
                    mt-4
                    max-w-sm
                    text-sm
                    leading-7
                    text-slate-400
                "
            >
                {isRegistration
                    ? "Your SABARAT account is ready. You can now continue to your client dashboard and review your progress."
                    : "Welcome back to SABARAT. Continue to your client dashboard to see your current progress."
                }
            </p>

            {/* =====================================================
                Status
            ===================================================== */}

            <div
                className="
                    mt-7
                    rounded-2xl
                    border
                    border-white/5
                    bg-white/[0.02]
                    p-5
                    text-left
                "
            >

                <div className="flex items-start gap-3">

                    <div
                        className="
                            mt-0.5
                            text-[#5EA8CC]
                        "
                    >
                        {isRegistration ? (
                            <UserPlus size={20} />
                        ) : (
                            <LogIn size={20} />
                        )}
                    </div>

                    <div>

                        <p
                            className="
                                text-sm
                                font-black
                                text-white
                            "
                        >
                            {isRegistration
                                ? "Registration completed"
                                : "Authentication completed"
                            }
                        </p>

                        <p
                            className="
                                mt-1
                                text-xs
                                leading-6
                                text-slate-500
                            "
                        >
                            Your next step is the client dashboard.
                        </p>

                    </div>

                </div>

            </div>

            {/* =====================================================
                Continue
            ===================================================== */}

            <Link
                to="/client-dashboard"
                className="
                    group
                    mt-7
                    inline-flex
                    w-full
                    items-center
                    justify-center
                    gap-3
                    rounded-xl
                    bg-[#5EA8CC]
                    px-5
                    py-3.5
                    font-black
                    text-white
                    shadow-lg
                    shadow-[#5EA8CC]/20
                    transition-all
                    duration-300
                    hover:-translate-y-0.5
                    hover:bg-[#4d96ba]
                    hover:shadow-xl
                "
            >

                Continue to Client Dashboard

                <ArrowRight
                    size={18}
                    className="
                        transition-transform
                        duration-300
                        group-hover:translate-x-1
                    "
                />

            </Link>

        </div>
    );
}

export default AuthSuccessPage;