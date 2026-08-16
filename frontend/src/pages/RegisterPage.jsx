import { useState } from "react";
import {
    ArrowRight,
    AlertCircle,
    Check,
    CheckCircle2,
    ShieldCheck,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

import AuthLayout from "../layouts/AuthLayout";
import AuthInput from "../layouts/AuthInput";
import PasswordInput from "../layouts/PasswordInput";

import {
    registerUser,
    validateRegistration,
} from "../services/authService";

// =====================================================
// Storage Keys
// =====================================================

const PENDING_DISCOVERY_KEY =
    "sabarat_pending_discovery";

const DISCOVERY_KEY =
    "sabarat_client_discovery_form";

// =====================================================
// Helpers
// =====================================================

function getPendingDiscovery() {
    try {
        const stored =
            localStorage.getItem(
                PENDING_DISCOVERY_KEY
            );

        if (!stored) {
            return null;
        }

        const parsed =
            JSON.parse(stored);

        if (
            !parsed ||
            typeof parsed !== "object"
        ) {
            return null;
        }

        return parsed;
    } catch (error) {
        console.error(
            "Failed to read pending discovery:",
            error
        );

        return null;
    }
}

// =====================================================
// Main Component
// =====================================================

function RegisterPage() {

    const navigate =
        useNavigate();

    const location =
        useLocation();

    // =================================================
    // Detect Discovery Flow
    // =================================================

    const pendingDiscovery =
        getPendingDiscovery();

    const isDiscoveryFlow =
        Boolean(
            pendingDiscovery
        ) ||
        location.state?.pendingDiscovery ===
            true;

    // =================================================
    // Form
    // =================================================

    const [formData, setFormData] =
        useState({
            name: "",
            email: "",
            password: "",
            passwordConfirmation: "",
            terms: false,
        });

    // =================================================
    // State
    // =================================================

    const [errors, setErrors] =
        useState({});

    const [generalError, setGeneralError] =
        useState("");

    const [successMessage, setSuccessMessage] =
        useState("");

    const [isLoading, setIsLoading] =
        useState(false);

    // =================================================
    // Change
    // =================================================

    const handleChange = (event) => {

        const {
            name,
            value,
            type,
            checked,
        } = event.target;

        setFormData((current) => ({
            ...current,

            [name]:
                type === "checkbox"
                    ? checked
                    : value,
        }));

        setErrors((current) => ({
            ...current,
            [name]: "",
        }));

        setGeneralError("");
    };

    // =================================================
    // Submit
    // =================================================

    const handleSubmit =
        async (event) => {

            event.preventDefault();

            if (isLoading) {
                return;
            }

            setErrors({});
            setGeneralError("");
            setSuccessMessage("");

            // -----------------------------------------
            // Validation
            // -----------------------------------------

            const validationErrors =
                validateRegistration(
                    formData
                );

            if (
                Object.keys(
                    validationErrors
                ).length > 0
            ) {
                setErrors(
                    validationErrors
                );

                return;
            }

            // -----------------------------------------
            // Register
            // -----------------------------------------

            try {

                setIsLoading(true);

                const result =
                    registerUser({
                        name:
                            formData.name,

                        email:
                            formData.email,

                        password:
                            formData.password,
                    });

                if (!result.success) {

                    setGeneralError(
                        result.error ||
                        "Unable to create your account."
                    );

                    return;
                }

                // -------------------------------------
                // Success
                // -------------------------------------

                setSuccessMessage(
                    isDiscoveryFlow
                        ? "Your account has been created. Your discovery request is being prepared."
                        : "Your SABARAT account has been created successfully."
                );

                // -------------------------------------
                // Discovery Flow
                // -------------------------------------

                if (
                    isDiscoveryFlow &&
                    pendingDiscovery
                ) {

                    /*
                     * لا نحذف الطلب هنا.
                     *
                     * الطلب ما زال يحتاج إلى الربط
                     * بالحساب الذي تم إنشاؤه.
                     *
                     * authService / Laravel سيقوم لاحقًا
                     * بهذه العملية بشكل دائم.
                     */

                    const updatedPendingDiscovery = {
                        ...pendingDiscovery,

                        status:
                            "awaiting_account_link",

                        accountEmail:
                            formData.email,

                        accountName:
                            formData.name,
                    };

                    localStorage.setItem(
                        PENDING_DISCOVERY_KEY,

                        JSON.stringify(
                            updatedPendingDiscovery
                        )
                    );

                    // ---------------------------------
                    // Keep discovery data
                    // ---------------------------------

                    const savedDiscovery =
                        localStorage.getItem(
                            DISCOVERY_KEY
                        );

                    if (!savedDiscovery) {

                        localStorage.setItem(
                            DISCOVERY_KEY,

                            JSON.stringify(
                                pendingDiscovery.data ||
                                {}
                            )
                        );
                    }

                    // ---------------------------------
                    // Continue to Dashboard
                    // ---------------------------------

                    setTimeout(() => {

                        navigate(
                            "/client-dashboard",
                            {
                                replace: true,

                                state: {
                                    from:
                                        "/register",

                                    discoveryCreated:
                                        true,

                                    pendingDiscovery:
                                        true,
                                },
                            }
                        );

                    }, 900);

                    return;
                }

                // -------------------------------------
                // Normal Registration
                // -------------------------------------

                setTimeout(() => {

                    navigate(
                        "/client-dashboard",
                        {
                            replace: true,
                        }
                    );

                }, 900);

            } catch (error) {

                console.error(
                    "Registration failed:",
                    error
                );

                setGeneralError(
                    "Something went wrong while creating your account."
                );

            } finally {

                setIsLoading(false);
            }
        };

    // =================================================
    // UI
    // =================================================

    return (
        <AuthLayout
            title="Create your account"
            description={
                isDiscoveryFlow
                    ? "Create your SABARAT account to continue with your completed discovery request."
                    : "Create your SABARAT account and start your journey with our team."
            }
            footerText="Already have an account?"
            footerLinkText="Sign in"
            footerLinkTo="/login"
        >

            <form
                onSubmit={
                    handleSubmit
                }
                className="space-y-5"
            >

                {/* =================================================
                    Discovery Notice
                ================================================= */}

                {isDiscoveryFlow && (
                    <div
                        className="
                            flex
                            items-start
                            gap-3
                            rounded-xl
                            border
                            border-[#5EA8CC]/20
                            bg-[#EAF6FC]
                            p-4
                            text-sm
                            text-[#3d7895]
                        "
                    >

                        <ShieldCheck
                            size={19}
                            className="
                                mt-0.5
                                shrink-0
                            "
                        />

                        <div>

                            <p
                                className="
                                    font-extrabold
                                "
                            >
                                طلبك محفوظ
                            </p>

                            <p
                                className="
                                    mt-1
                                    leading-6
                                    text-[#4b7890]
                                "
                            >
                                أكملت نموذج الاحتياج.
                                بعد إنشاء الحساب
                                سنتمكن من ربط طلبك
                                بحسابك في لوحة العميل.
                            </p>

                        </div>

                    </div>
                )}

                {/* =================================================
                    General Error
                ================================================= */}

                {generalError && (
                    <div
                        className="
                            flex
                            items-start
                            gap-3
                            rounded-xl
                            border
                            border-red-400/20
                            bg-red-400/10
                            p-4
                            text-sm
                            text-red-300
                        "
                    >

                        <AlertCircle
                            size={18}
                            className="
                                mt-0.5
                                shrink-0
                            "
                        />

                        <p>
                            {generalError}
                        </p>

                    </div>
                )}

                {/* =================================================
                    Success
                ================================================= */}

                {successMessage && (
                    <div
                        className="
                            flex
                            items-start
                            gap-3
                            rounded-xl
                            border
                            border-emerald-400/20
                            bg-emerald-400/10
                            p-4
                            text-sm
                            text-emerald-300
                        "
                    >

                        <CheckCircle2
                            size={18}
                            className="
                                mt-0.5
                                shrink-0
                            "
                        />

                        <p>
                            {successMessage}
                        </p>

                    </div>
                )}

                {/* =================================================
                    Name
                ================================================= */}

                <div>

                    <AuthInput
                        label="Full name"
                        name="name"
                        value={
                            formData.name
                        }
                        onChange={
                            handleChange
                        }
                        placeholder="Your full name"
                        autoComplete="name"
                    />

                    {errors.name && (
                        <p
                            className="
                                mt-2
                                text-xs
                                font-semibold
                                text-red-400
                            "
                        >
                            {errors.name}
                        </p>
                    )}

                </div>

                {/* =================================================
                    Email
                ================================================= */}

                <div>

                    <AuthInput
                        label="Email address"
                        name="email"
                        type="email"
                        value={
                            formData.email
                        }
                        onChange={
                            handleChange
                        }
                        placeholder="you@example.com"
                        autoComplete="email"
                    />

                    {errors.email && (
                        <p
                            className="
                                mt-2
                                text-xs
                                font-semibold
                                text-red-400
                            "
                        >
                            {errors.email}
                        </p>
                    )}

                </div>

                {/* =================================================
                    Password
                ================================================= */}

                <div>

                    <PasswordInput
                        label="Password"
                        name="password"
                        value={
                            formData.password
                        }
                        onChange={
                            handleChange
                        }
                        placeholder="Create a strong password"
                        autoComplete="new-password"
                    />

                    {errors.password && (
                        <p
                            className="
                                mt-2
                                text-xs
                                font-semibold
                                text-red-400
                            "
                        >
                            {errors.password}
                        </p>
                    )}

                </div>

                {/* =================================================
                    Confirm Password
                ================================================= */}

                <div>

                    <PasswordInput
                        label="Confirm password"
                        name="passwordConfirmation"
                        value={
                            formData.passwordConfirmation
                        }
                        onChange={
                            handleChange
                        }
                        placeholder="Repeat your password"
                        autoComplete="new-password"
                    />

                    {errors.passwordConfirmation && (
                        <p
                            className="
                                mt-2
                                text-xs
                                font-semibold
                                text-red-400
                            "
                        >
                            {
                                errors.passwordConfirmation
                            }
                        </p>
                    )}

                </div>

                {/* =================================================
                    Terms
                ================================================= */}

                <div>

                    <label
                        className="
                            flex
                            cursor-pointer
                            items-start
                            gap-3
                            rounded-xl
                            border
                            border-white/5
                            bg-white/[0.02]
                            p-4
                            transition
                            hover:border-white/10
                            hover:bg-white/[0.04]
                        "
                    >

                        <input
                            type="checkbox"
                            name="terms"
                            checked={
                                formData.terms
                            }
                            onChange={
                                handleChange
                            }
                            className="
                                mt-0.5
                                h-4
                                w-4
                                shrink-0
                                accent-[#5EA8CC]
                            "
                        />

                        <span
                            className="
                                text-xs
                                leading-6
                                text-slate-400
                            "
                        >
                            I agree to the terms
                            and conditions and
                            understand that my
                            information will be
                            handled securely.
                        </span>

                    </label>

                    {errors.terms && (
                        <p
                            className="
                                mt-2
                                text-xs
                                font-semibold
                                text-red-400
                            "
                        >
                            {errors.terms}
                        </p>
                    )}

                </div>

                {/* =================================================
                    Register Button
                ================================================= */}

                <button
                    type="submit"
                    disabled={
                        isLoading
                    }
                    className="
                        group
                        flex
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
                        disabled:cursor-not-allowed
                        disabled:opacity-60
                    "
                >

                    {isLoading
                        ? "Creating account..."
                        : isDiscoveryFlow
                            ? "Create account & continue"
                            : "Create account"}

                    {!isLoading && (
                        <ArrowRight
                            size={18}
                            className="
                                transition-transform
                                duration-300
                                group-hover:translate-x-1
                            "
                        />
                    )}

                </button>

                {/* =================================================
                    Trust
                ================================================= */}

                <div
                    className="
                        flex
                        items-center
                        justify-center
                        gap-2
                        pt-2
                        text-xs
                        text-slate-600
                    "
                >

                    <Check size={14} />

                    Your information is protected

                </div>

            </form>

        </AuthLayout>
    );
}

export default RegisterPage;