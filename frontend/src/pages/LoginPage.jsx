import { useState } from "react";
import {
    ArrowRight,
    LockKeyhole,
    AlertCircle,
    CheckCircle2,
    ShieldCheck,
} from "lucide-react";
import {
    Link,
    useLocation,
    useNavigate,
} from "react-router-dom";

import AuthLayout from "../layouts/AuthLayout";
import AuthInput from "../layouts/AuthInput";
import PasswordInput from "../layouts/PasswordInput";

import {
    loginUser,
    validateLogin,
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

function LoginPage() {
    const navigate =
        useNavigate();

    const location =
        useLocation();

    // =================================================
    // Discovery Flow
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
            email: "",
            password: "",
            remember: false,
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
    // Handle Change
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
        setSuccessMessage("");
    };

    // =================================================
    // Handle Submit
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
            // Validate
            // -----------------------------------------

            const validationErrors =
                validateLogin(
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
            // Login
            // -----------------------------------------

            try {

                setIsLoading(true);

                const result =
                    loginUser({
                        email:
                            formData.email,

                        password:
                            formData.password,
                    });

                if (!result.success) {

                    setGeneralError(
                        result.error ||
                        "Unable to sign in."
                    );

                    return;
                }

                // -------------------------------------
                // Discovery Flow
                // -------------------------------------

                if (
                    isDiscoveryFlow &&
                    pendingDiscovery
                ) {

                    /*
                     * الطلب مكتمل من ClientDiscoveryForm
                     * لكنه لم يرتبط بالحساب بشكل دائم بعد.
                     *
                     * في هذه المرحلة نحافظ عليه ونضيف
                     * بيانات الحساب الذي قام بتسجيل الدخول.
                     *
                     * لاحقًا Laravel سيستبدل هذه العملية
                     * بربط حقيقي في قاعدة البيانات.
                     */

                    const updatedPendingDiscovery = {
                        ...pendingDiscovery,

                        status:
                            "awaiting_account_link",

                        accountEmail:
                            formData.email,

                        linkedAt:
                            new Date().toISOString(),
                    };

                    localStorage.setItem(
                        PENDING_DISCOVERY_KEY,

                        JSON.stringify(
                            updatedPendingDiscovery
                        )
                    );

                    // ---------------------------------
                    // Keep Discovery Data
                    // ---------------------------------

                    const savedDiscovery =
                        localStorage.getItem(
                            DISCOVERY_KEY
                        );

                    if (
                        !savedDiscovery &&
                        pendingDiscovery.data
                    ) {

                        localStorage.setItem(
                            DISCOVERY_KEY,

                            JSON.stringify(
                                pendingDiscovery.data
                            )
                        );
                    }

                    // ---------------------------------
                    // Success
                    // ---------------------------------

                    setSuccessMessage(
                        "Signed in successfully. Your discovery request is ready to continue."
                    );

                    // ---------------------------------
                    // Dashboard
                    // ---------------------------------

                    setTimeout(() => {

                        navigate(
                            "/client-dashboard",
                            {
                                replace: true,

                                state: {
                                    from:
                                        "/login",

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
                // Normal Login
                // -------------------------------------

                setSuccessMessage(
                    "Signed in successfully. Welcome back to SABARAT."
                );

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
                    "Login failed:",
                    error
                );

                setGeneralError(
                    "Something went wrong while signing in."
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
            title="Welcome back"
            description={
                isDiscoveryFlow
                    ? "Sign in to continue with your completed discovery request."
                    : "Sign in to your SABARAT account and continue managing your projects."
            }
            footerText="Don't have an account?"
            footerLinkText="Create account"
            footerLinkTo="/register"
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
                                طلب الاحتياج محفوظ
                            </p>

                            <p
                                className="
                                    mt-1
                                    leading-6
                                    text-[#4b7890]
                                "
                            >
                                لديك طلب احتياج مكتمل.
                                سجّل الدخول حتى نستطيع
                                ربطه بحسابك ومتابعته من
                                لوحة العميل.
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
                        placeholder="Enter your password"
                        autoComplete="current-password"
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
                    Remember / Forgot
                ================================================= */}

                <div
                    className="
                        flex
                        items-center
                        justify-between
                        gap-4
                    "
                >

                    <label
                        className="
                            flex
                            cursor-pointer
                            items-center
                            gap-2
                            text-sm
                            text-slate-400
                        "
                    >

                        <input
                            type="checkbox"
                            name="remember"
                            checked={
                                formData.remember
                            }
                            onChange={
                                handleChange
                            }
                            className="
                                h-4
                                w-4
                                rounded
                                border-white/20
                                bg-white/5
                                accent-[#5EA8CC]
                            "
                        />

                        Remember me

                    </label>

                    <button
                        type="button"
                        className="
                            text-sm
                            font-bold
                            text-[#5EA8CC]
                            transition
                            hover:text-white
                        "
                    >
                        Forgot password?
                    </button>

                </div>

                {/* =================================================
                    Login Button
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
                        ? "Signing in..."
                        : isDiscoveryFlow
                            ? "Sign in & continue"
                            : "Sign in"}

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
                    Security
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

                    <LockKeyhole
                        size={14}
                    />

                    Secure account access

                </div>

                {/* =================================================
                    Register Shortcut
                ================================================= */}

                <p
                    className="
                        text-center
                        text-xs
                        text-slate-600
                    "
                >

                    New to SABARAT?{" "}

                    <Link
                        to="/register"
                        state={
                            isDiscoveryFlow
                                ? {
                                    pendingDiscovery:
                                        true,
                                }
                                : undefined
                        }
                        className="
                            font-bold
                            text-[#5EA8CC]
                            transition
                            hover:text-white
                        "
                    >
                        Create your account
                    </Link>

                </p>

            </form>

        </AuthLayout>
    );
}

export default LoginPage;