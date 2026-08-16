import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    ArrowLeft,
    ArrowRight,
    CheckCircle2,
    FileText,
    Lock,
    Sparkles,
} from "lucide-react";

import {
    initialDiscoveryData,
    discoverySteps,
} from "../../data/discoveryForm";

import DiscoveryProgress from "./DiscoveryProgress";
import DiscoveryReview from "./DiscoveryReview";
import DiscoverySuccess from "./DiscoverySuccess";

// =====================================================
// Storage Keys
// =====================================================

const STORAGE_KEY =
    "sabarat_client_discovery_form";

const PENDING_DISCOVERY_KEY =
    "sabarat_pending_discovery";

// =====================================================
// Helpers
// =====================================================

function createInitialFormData() {
    return structuredClone(
        initialDiscoveryData
    );
}

function normalizeFormData(data) {
    const parsedData =
        data && typeof data === "object"
            ? data
            : {};

    const initial =
        createInitialFormData();

    return {
        ...initial,
        ...parsedData,

        social: {
            ...(initial.social || {}),
            ...(parsedData.social || {}),
        },

        competitors: Array.isArray(
            parsedData.competitors
        )
            ? [
                ...parsedData.competitors,
                "",
                "",
                "",
            ].slice(0, 3)
            : ["", "", ""],

        audience: {
            ...(initial.audience || {}),
            ...(parsedData.audience || {}),
        },

        previousCollaboration: {
            ...(initial.previousCollaboration || {}),
            ...(parsedData.previousCollaboration || {}),
        },

        budget: {
            ...(initial.budget || {}),
            ...(parsedData.budget || {}),
        },

        additional: {
            ...(initial.additional || {}),
            ...(parsedData.additional || {}),
        },

        brandStatus: Array.isArray(
            parsedData.brandStatus
        )
            ? parsedData.brandStatus
            : [],

        marketingGoals: Array.isArray(
            parsedData.marketingGoals
        )
            ? parsedData.marketingGoals
            : [],

        challenges: Array.isArray(
            parsedData.challenges
        )
            ? parsedData.challenges
            : [],

        services: Array.isArray(
            parsedData.services
        )
            ? parsedData.services
            : [],
    };
}

function getPendingDiscovery() {
    try {
        const stored =
            localStorage.getItem(
                PENDING_DISCOVERY_KEY
            );

        if (!stored) {
            return null;
        }

        return JSON.parse(stored);

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

function ClientDiscoveryForm() {

    const navigate =
        useNavigate();

    // =================================================
    // Form Data
    // =================================================

    const [formData, setFormData] =
        useState(() => {

            try {

                const savedData =
                    localStorage.getItem(
                        STORAGE_KEY
                    );

                if (!savedData) {
                    return createInitialFormData();
                }

                return normalizeFormData(
                    JSON.parse(savedData)
                );

            } catch (error) {

                console.error(
                    "Failed to load saved discovery data:",
                    error
                );

                return createInitialFormData();
            }
        });

    // =================================================
    // State
    // =================================================

    const [currentStep, setCurrentStep] =
        useState(1);

    const [showReview, setShowReview] =
        useState(false);

    const [submitted, setSubmitted] =
        useState(false);

    const [isSubmitting, setIsSubmitting] =
        useState(false);

    // =================================================
    // Refs
    // =================================================

    const stepContentRef =
        useRef(null);

    // =================================================
    // Auto Save
    // =================================================

    useEffect(() => {

        try {

            localStorage.setItem(
                STORAGE_KEY,
                JSON.stringify(formData)
            );

        } catch (error) {

            console.error(
                "Failed to save discovery data:",
                error
            );
        }

    }, [formData]);

    // =================================================
    // Scroll
    // =================================================

    useEffect(() => {

        if (
            !showReview &&
            stepContentRef.current
        ) {

            const element =
                stepContentRef.current;

            const top =
                element.getBoundingClientRect().top +
                window.scrollY -
                100;

            window.scrollTo({
                top,
                behavior: "smooth",
            });
        }

    }, [
        currentStep,
        showReview,
    ]);

    // =================================================
    // Update Simple Field
    // =================================================

    const updateField = (
        field,
        value
    ) => {

        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    // =================================================
    // Update Nested Field
    // =================================================

    const updateNestedField = (
        parent,
        field,
        value
    ) => {

        setFormData((prev) => ({
            ...prev,

            [parent]: {
                ...(prev[parent] || {}),
                [field]: value,
            },
        }));
    };

    // =================================================
    // Toggle Array
    // =================================================

    const toggleArrayValue = (
        field,
        value
    ) => {

        setFormData((prev) => {

            const current =
                Array.isArray(prev[field])
                    ? prev[field]
                    : [];

            const exists =
                current.includes(value);

            return {
                ...prev,

                [field]: exists
                    ? current.filter(
                        (item) =>
                            item !== value
                    )
                    : [
                        ...current,
                        value,
                    ],
            };
        });
    };

    // =================================================
    // Go To Step
    // =================================================

    const goToStep = (
        step
    ) => {

        const targetStep =
            Number(step);

        if (
            !Number.isInteger(
                targetStep
            )
        ) {
            return;
        }

        if (
            targetStep < 1 ||
            targetStep >
            discoverySteps.length
        ) {
            return;
        }

        setShowReview(false);
        setCurrentStep(targetStep);
    };

    // =================================================
    // Next
    // =================================================

    const nextStep = () => {

        if (
            currentStep <
            discoverySteps.length
        ) {

            goToStep(
                currentStep + 1
            );

            return;
        }

        setShowReview(true);
    };

    // =================================================
    // Previous
    // =================================================

    const previousStep = () => {

        if (currentStep > 1) {

            goToStep(
                currentStep - 1
            );
        }
    };

    // =================================================
    // Clear
    // =================================================

    const clearForm = () => {

        const confirmed =
            window.confirm(
                "هل أنت متأكد من حذف جميع البيانات المدخلة؟"
            );

        if (!confirmed) {
            return;
        }

        try {

            localStorage.removeItem(
                STORAGE_KEY
            );

            localStorage.removeItem(
                PENDING_DISCOVERY_KEY
            );

        } catch (error) {

            console.error(
                "Failed to clear discovery data:",
                error
            );
        }

        setFormData(
            createInitialFormData()
        );

        setCurrentStep(1);
        setShowReview(false);
        setSubmitted(false);
    };

    // =================================================
    // Submit
    // =================================================

    const submitForm =
        async () => {

            if (isSubmitting) {
                return;
            }

            // -----------------------------------------
            // Privacy Validation
            // -----------------------------------------

            if (
                !formData.privacyAccepted
            ) {

                alert(
                    "يرجى الموافقة على سياسة استخدام البيانات قبل إرسال الطلب."
                );

                return;
            }

            setIsSubmitting(true);

            try {

                // -------------------------------------
                // Freeze submitted data
                // -------------------------------------

                const submittedData =
                    structuredClone(
                        formData
                    );

                // -------------------------------------
                // Create Pending Discovery
                // -------------------------------------

                const pendingDiscovery = {

                    id:
                        `discovery_${Date.now()}`,

                    status:
                        "awaiting_authentication",

                    createdAt:
                        new Date().toISOString(),

                    data:
                        submittedData,
                };

                // -------------------------------------
                // Save complete discovery form
                // -------------------------------------

                localStorage.setItem(
                    STORAGE_KEY,
                    JSON.stringify(
                        submittedData
                    )
                );

                // -------------------------------------
                // Save pending discovery
                //
                // هذا الطلب لم يرتبط بالمستخدم
                // حتى الآن لأنه غير authenticated.
                // -------------------------------------

                localStorage.setItem(
                    PENDING_DISCOVERY_KEY,
                    JSON.stringify(
                        pendingDiscovery
                    )
                );

                // -------------------------------------
                // Verify pending data was saved
                // -------------------------------------

                const savedPendingDiscovery =
                    getPendingDiscovery();

                if (!savedPendingDiscovery) {

                    throw new Error(
                        "Pending discovery could not be saved."
                    );
                }

                // -------------------------------------
                // Temporary delay
                // -------------------------------------

                await new Promise(
                    (resolve) =>
                        setTimeout(
                            resolve,
                            400
                        )
                );

                // -------------------------------------
                // Go To Login
                //
                // مهم:
                // بعد تسجيل الدخول أو إنشاء الحساب
                // سيتم التعامل مع pending discovery.
                // -------------------------------------

                navigate(
                    "/login",
                    {
                        state: {

                            from:
                                "/client-discovery",

                            returnTo:
                                "/client-dashboard",

                            pendingDiscovery:
                                true,

                            pendingDiscoveryId:
                                savedPendingDiscovery.id,
                        },
                    }
                );

            } catch (error) {

                console.error(
                    "Discovery submission failed:",
                    error
                );

                alert(
                    "حدث خطأ أثناء تجهيز الطلب. بياناتك ما زالت محفوظة، حاول مرة أخرى."
                );

            } finally {

                setIsSubmitting(false);
            }
        };

    // =================================================
    // SUCCESS SCREEN
    // =================================================

    if (submitted) {

        return (
            <DiscoverySuccess
                formData={
                    formData
                }

                onPrint={() => {

                    navigate(
                        "/client-discovery/print",
                        {
                            state: {
                                formData:
                                    structuredClone(
                                        formData
                                    ),
                            },
                        }
                    );
                }}

                onNewRequest={() => {

                    try {

                        localStorage.removeItem(
                            STORAGE_KEY
                        );

                        localStorage.removeItem(
                            PENDING_DISCOVERY_KEY
                        );

                    } catch (error) {

                        console.error(
                            "Failed to clear discovery storage:",
                            error
                        );
                    }

                    setFormData(
                        createInitialFormData()
                    );

                    setCurrentStep(1);
                    setShowReview(false);
                    setSubmitted(false);

                    window.scrollTo({
                        top: 0,
                        behavior: "smooth",
                    });
                }}
            />
        );
    }

    // =================================================
    // Main UI
    // =================================================

    return (
        <section
            className="
                min-h-screen
                bg-slate-50
                px-4
                py-16
                sm:px-6
                lg:px-8
            "
        >

            <div className="mx-auto max-w-7xl">

                {/* Header */}

                <div
                    className="
                        mx-auto
                        max-w-3xl
                        text-center
                    "
                >

                    <span
                        className="
                            inline-flex
                            items-center
                            gap-2
                            rounded-full
                            bg-[#EAF6FC]
                            px-4
                            py-2
                            text-sm
                            font-bold
                            text-[#5EA8CC]
                        "
                    >
                        <Sparkles size={16} />

                        نموذج الاحتياج
                    </span>

                    <h1
                        className="
                            mt-6
                            text-4xl
                            font-black
                            tracking-tight
                            text-slate-950
                            sm:text-5xl
                            lg:text-6xl
                        "
                    >
                        دعنا نفهم مشروعك

                        <span className="text-[#5EA8CC]">
                            {" "}بشكل أفضل
                        </span>
                    </h1>

                    <p
                        className="
                            mx-auto
                            mt-5
                            max-w-2xl
                            text-lg
                            leading-8
                            text-slate-600
                        "
                    >
                        أخبرنا عن نشاطك،
                        أهدافك، جمهورك
                        والتحديات التي
                        تواجهها، وسيساعدنا
                        ذلك على بناء الحل
                        المناسب لمشروعك.
                    </p>

                </div>

                {/* Main Card */}

                <div
                    className="
                        mt-12
                        overflow-hidden
                        rounded-[2rem]
                        border
                        border-slate-200
                        bg-white
                        shadow-xl
                        shadow-slate-900/5
                    "
                >

                    {/* Top Bar */}

                    <div
                        className="
                            flex
                            flex-col
                            gap-4
                            border-b
                            border-slate-100
                            px-6
                            py-5
                            sm:flex-row
                            sm:items-center
                            sm:justify-between
                            lg:px-10
                        "
                    >

                        <div
                            className="
                                flex
                                items-center
                                gap-3
                            "
                        >

                            <div
                                className="
                                    flex
                                    h-11
                                    w-11
                                    items-center
                                    justify-center
                                    rounded-xl
                                    bg-slate-950
                                    text-white
                                "
                            >
                                <FileText
                                    size={20}
                                />
                            </div>

                            <div>

                                <p
                                    className="
                                        font-extrabold
                                        text-slate-900
                                    "
                                >
                                    Client Discovery Form
                                </p>

                                <p
                                    className="
                                        text-xs
                                        text-slate-500
                                    "
                                >
                                    SPT-FRM-001 • V1.0
                                </p>

                            </div>

                        </div>

                        <div
                            className="
                                flex
                                items-center
                                gap-2
                                text-xs
                                font-semibold
                                text-slate-500
                            "
                        >
                            <Lock size={14} />

                            بياناتك تعامل بسرية
                        </div>

                    </div>

                    {/* Progress */}

                    <div
                        className="
                            px-6
                            pt-8
                            lg:px-10
                        "
                    >

                        <DiscoveryProgress
                            currentStep={
                                currentStep
                            }
                            onStepChange={
                                goToStep
                            }
                        />

                        <div
                            className="
                                mt-7
                                flex
                                flex-wrap
                                justify-center
                                gap-2
                            "
                        >

                            {discoverySteps.map(
                                (
                                    step,
                                    index
                                ) => {

                                    const stepNumber =
                                        Number(
                                            step.id
                                        ) ||
                                        index + 1;

                                    const isActive =
                                        currentStep ===
                                        stepNumber;

                                    return (
                                        <button
                                            key={
                                                step.id ??
                                                stepNumber
                                            }
                                            type="button"
                                            onClick={() =>
                                                goToStep(
                                                    stepNumber
                                                )
                                            }
                                            aria-label={`الانتقال إلى القسم ${stepNumber}`}
                                            aria-current={
                                                isActive
                                                    ? "step"
                                                    : undefined
                                            }
                                            className={`

                                                flex
                                                h-10
                                                w-10
                                                items-center
                                                justify-center
                                                rounded-full
                                                border
                                                text-sm
                                                font-extrabold
                                                transition-all
                                                duration-300
                                                focus:outline-none
                                                focus:ring-4
                                                focus:ring-[#5EA8CC]/10

                                                ${
                                                    isActive
                                                        ? `
                                                            scale-105
                                                            border-[#5EA8CC]
                                                            bg-[#5EA8CC]
                                                            text-white
                                                            shadow-lg
                                                            shadow-[#5EA8CC]/20
                                                        `
                                                        : `
                                                            border-slate-200
                                                            bg-white
                                                            text-slate-500
                                                            hover:-translate-y-0.5
                                                            hover:border-[#5EA8CC]/40
                                                            hover:bg-[#EAF6FC]
                                                            hover:text-[#5EA8CC]
                                                        `
                                                }
                                            `}
                                        >
                                            {
                                                stepNumber
                                            }
                                        </button>
                                    );
                                }
                            )}

                        </div>

                        <p
                            className="
                                mt-3
                                text-center
                                text-xs
                                font-semibold
                                text-slate-400
                            "
                        >
                            اضغط على أي رقم
                            للانتقال مباشرة
                            إلى القسم المطلوب
                        </p>

                    </div>

                    {/* Content */}

                    <div
                        className="
                            px-6
                            pb-8
                            lg:px-10
                        "
                    >

                        {!showReview ? (

                            <div
                                ref={
                                    stepContentRef
                                }
                                className="
                                    min-h-[500px]
                                    scroll-mt-28
                                "
                            >

                                <StepContent
                                    currentStep={
                                        currentStep
                                    }
                                    formData={
                                        formData
                                    }
                                    updateField={
                                        updateField
                                    }
                                    updateNestedField={
                                        updateNestedField
                                    }
                                    toggleArrayValue={
                                        toggleArrayValue
                                    }
                                />

                            </div>

                        ) : (

                            <DiscoveryReview
                                formData={
                                    formData
                                }
                                onBack={() =>
                                    setShowReview(
                                        false
                                    )
                                }
                                onSubmit={
                                    submitForm
                                }
                                onPrivacyChange={(
                                    accepted
                                ) =>
                                    setFormData(
                                        (prev) => ({
                                            ...prev,
                                            privacyAccepted:
                                                accepted,
                                        })
                                    )
                                }
                                isSubmitting={
                                    isSubmitting
                                }
                            />

                        )}

                    </div>

                    {/* Navigation */}

                    {!showReview && (

                        <div
                            className="
                                flex
                                flex-col-reverse
                                gap-3
                                border-t
                                border-slate-100
                                bg-slate-50
                                px-6
                                py-5
                                sm:flex-row
                                sm:items-center
                                sm:justify-between
                                lg:px-10
                            "
                        >

                            <div
                                className="
                                    flex
                                    flex-wrap
                                    items-center
                                    gap-2
                                "
                            >

                                <button
                                    type="button"
                                    onClick={
                                        previousStep
                                    }
                                    disabled={
                                        currentStep ===
                                        1
                                    }
                                    className="
                                        inline-flex
                                        items-center
                                        justify-center
                                        gap-2
                                        rounded-xl
                                        px-5
                                        py-3
                                        font-bold
                                        text-slate-600
                                        transition-all
                                        duration-300
                                        hover:bg-white
                                        hover:text-slate-900
                                        disabled:cursor-not-allowed
                                        disabled:opacity-30
                                    "
                                >
                                    <ArrowLeft
                                        size={18}
                                    />

                                    السابق
                                </button>

                                <button
                                    type="button"
                                    onClick={
                                        clearForm
                                    }
                                    className="
                                        rounded-xl
                                        px-4
                                        py-3
                                        text-sm
                                        font-bold
                                        text-red-500
                                        transition
                                        hover:bg-red-50
                                    "
                                >
                                    مسح النموذج
                                </button>

                            </div>

                            <button
                                type="button"
                                onClick={
                                    nextStep
                                }
                                className="
                                    group
                                    inline-flex
                                    items-center
                                    justify-center
                                    gap-2
                                    rounded-xl
                                    bg-[#5EA8CC]
                                    px-7
                                    py-3.5
                                    font-bold
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

                                {
                                    currentStep ===
                                    discoverySteps.length
                                        ? "مراجعة الطلب"
                                        : "التالي"
                                }

                                <ArrowRight
                                    size={18}
                                    className="
                                        transition-transform
                                        duration-300
                                        group-hover:translate-x-1
                                    "
                                />

                            </button>

                        </div>
                    )}

                </div>

            </div>

        </section>
    );
}

// =====================================================
// Step Content
// =====================================================

function StepContent({
    currentStep,
    formData,
    updateField,
    updateNestedField,
    toggleArrayValue,
}) {

    switch (currentStep) {

        case 1:
            return (
                <ClientInformation
                    formData={formData}
                    updateField={
                        updateField
                    }
                    updateNestedField={
                        updateNestedField
                    }
                />
            );

        case 2:
            return (
                <BusinessOverview
                    formData={formData}
                    updateField={
                        updateField
                    }
                />
            );

        case 3:
            return (
                <ChoiceSection
                    number="03"
                    title="الوضع الحالي للعلامة التجارية"
                    description="اختر الحالات التي تصف وضع علامتك التجارية حاليًا."
                    values={[
                        "علامة تجارية جديدة",
                        "نشاط قائم يحتاج تطوير",
                        "إعادة بناء الهوية",
                        "إطلاق منتج جديد",
                        "حملة موسمية",
                        "التوسع إلى سوق جديد",
                    ]}
                    selected={
                        formData.brandStatus
                    }
                    onToggle={(value) =>
                        toggleArrayValue(
                            "brandStatus",
                            value
                        )
                    }
                />
            );

        case 4:
            return (
                <ChoiceSection
                    number="04"
                    title="الأهداف التسويقية للمشروع"
                    description="ما النتائج التي تريد تحقيقها؟"
                    values={[
                        "زيادة المبيعات",
                        "زيادة الوعي بالعلامة التجارية",
                        "زيادة العملاء المحتملين",
                        "رفع مستوى التفاعل",
                        "بناء الثقة والمصداقية",
                        "إطلاق منتج أو خدمة جديدة",
                        "هدف آخر",
                    ]}
                    selected={
                        formData.marketingGoals
                    }
                    onToggle={(value) =>
                        toggleArrayValue(
                            "marketingGoals",
                            value
                        )
                    }
                />
            );

        case 5:
            return (
                <AudienceStep
                    formData={formData}
                    updateNestedField={
                        updateNestedField
                    }
                />
            );

        case 6:
            return (
                <PreviousCollaboration
                    formData={formData}
                    updateNestedField={
                        updateNestedField
                    }
                />
            );

        case 7:
            return (
                <ChoiceSection
                    number="07"
                    title="التحديات الحالية"
                    description="حدد أهم التحديات التي تواجه نشاطك."
                    values={[
                        "ضعف المبيعات",
                        "ضعف الوصول للجمهور",
                        "ضعف المحتوى",
                        "ضعف الهوية البصرية",
                        "ضعف الإعلانات",
                        "ضعف التفاعل",
                        "منافسة قوية",
                        "أخرى",
                    ]}
                    selected={
                        formData.challenges
                    }
                    onToggle={(value) =>
                        toggleArrayValue(
                            "challenges",
                            value
                        )
                    }
                />
            );

        case 8:
            return (
                <ChoiceSection
                    number="08"
                    title="الخدمات المطلوبة"
                    description="اختر الخدمات التي تحتاجها من SABARAT."
                    values={[
                        "إدارة حسابات التواصل الاجتماعي",
                        "صناعة المحتوى",
                        "إدارة الحملات الإعلانية",
                        "كتابة المحتوى الإعلاني (Copywriting)",
                        "صناعة مقاطع Reels",
                        "تصميم الهوية البصرية",
                        "التصميم الجرافيكي",
                        "تطوير المواقع",
                        "أخرى",
                    ]}
                    selected={
                        formData.services
                    }
                    onToggle={(value) =>
                        toggleArrayValue(
                            "services",
                            value
                        )
                    }
                />
            );

        case 9:
            return (
                <BudgetStep
                    formData={formData}
                    updateNestedField={
                        updateNestedField
                    }
                />
            );

        case 10:
            return (
                <TextareaStep
                    title="توقعات المشروع"
                    description="ما النتيجة التي تتوقع تحقيقها من خلال التعاون مع SABARAT؟"
                    value={
                        formData.expectations ||
                        ""
                    }
                    onChange={(value) =>
                        updateField(
                            "expectations",
                            value
                        )
                    }
                />
            );

        case 11:
            return (
                <AdditionalStep
                    formData={formData}
                    updateNestedField={
                        updateNestedField
                    }
                />
            );

        default:
            return null;
    }
}

// =====================================================
// Field
// =====================================================

function Field({
    label,
    value,
    onChange,
    type = "text",
    placeholder = "",
}) {

    return (
        <label className="block">

            <span
                className="
                    mb-2
                    block
                    text-sm
                    font-bold
                    text-slate-700
                "
            >
                {label}
            </span>

            <input
                type={type}
                value={value ?? ""}
                onChange={(e) =>
                    onChange(
                        e.target.value
                    )
                }
                placeholder={
                    placeholder
                }
                className="
                    w-full
                    rounded-xl
                    border
                    border-slate-200
                    bg-slate-50
                    px-4
                    py-3.5
                    text-slate-900
                    outline-none
                    transition-all
                    duration-300
                    placeholder:text-slate-400
                    hover:border-slate-300
                    focus:border-[#5EA8CC]
                    focus:bg-white
                    focus:ring-4
                    focus:ring-[#5EA8CC]/10
                "
            />

        </label>
    );
}

// =====================================================
// STEP 1
// =====================================================

function ClientInformation({
    formData,
    updateField,
    updateNestedField,
}) {

    return (
        <div
            className="
                animate-[fadeIn_0.4s_ease-out]
                py-8
            "
        >

            <StepHeader
                number="01"
                title="بيانات العميل"
                description="ابدأ بإدخال المعلومات الأساسية التي تساعد فريق SABARAT على التواصل معك."
            />

            <div
                className="
                    grid
                    gap-5
                    md:grid-cols-2
                "
            >

                <Field
                    label="اسم الشركة / المؤسسة"
                    value={
                        formData.companyName
                    }
                    onChange={(value) =>
                        updateField(
                            "companyName",
                            value
                        )
                    }
                />

                <Field
                    label="اسم مسؤول التواصل"
                    value={
                        formData.contactName
                    }
                    onChange={(value) =>
                        updateField(
                            "contactName",
                            value
                        )
                    }
                />

                <Field
                    label="المسمى الوظيفي"
                    value={
                        formData.jobTitle
                    }
                    onChange={(value) =>
                        updateField(
                            "jobTitle",
                            value
                        )
                    }
                />

                <Field
                    label="رقم الجوال"
                    type="tel"
                    value={
                        formData.phone
                    }
                    onChange={(value) =>
                        updateField(
                            "phone",
                            value
                        )
                    }
                />

                <Field
                    label="البريد الإلكتروني"
                    type="email"
                    value={
                        formData.email
                    }
                    onChange={(value) =>
                        updateField(
                            "email",
                            value
                        )
                    }
                />

                <Field
                    label="الموقع الإلكتروني"
                    value={
                        formData.website
                    }
                    onChange={(value) =>
                        updateField(
                            "website",
                            value
                        )
                    }
                />

                <Field
                    label="المدينة"
                    value={
                        formData.city
                    }
                    onChange={(value) =>
                        updateField(
                            "city",
                            value
                        )
                    }
                />

                <Field
                    label="تاريخ الاجتماع"
                    type="date"
                    value={
                        formData.meetingDate
                    }
                    onChange={(value) =>
                        updateField(
                            "meetingDate",
                            value
                        )
                    }
                />

            </div>

            <div className="mt-10">

                <h3
                    className="
                        mb-5
                        text-xl
                        font-extrabold
                        text-slate-900
                    "
                >
                    مواقع التواصل الحالية
                </h3>

                <div
                    className="
                        grid
                        gap-5
                        md:grid-cols-2
                        lg:grid-cols-3
                    "
                >

                    {Object.entries(
                        formData.social || {}
                    ).map(
                        ([
                            key,
                            value,
                        ]) => (

                            <Field
                                key={key}
                                label={
                                    socialLabel(
                                        key
                                    )
                                }
                                value={
                                    value
                                }
                                placeholder="https://..."
                                onChange={(
                                    newValue
                                ) =>
                                    updateNestedField(
                                        "social",
                                        key,
                                        newValue
                                    )
                                }
                            />

                        )
                    )}

                </div>

            </div>

        </div>
    );
}

// =====================================================
// Social Labels
// =====================================================

function socialLabel(key) {

    const labels = {
        website:
            "الموقع الإلكتروني",

        instagram:
            "Instagram",

        facebook:
            "Facebook",

        x:
            "X",

        tiktok:
            "TikTok",

        youtube:
            "YouTube",

        linkedin:
            "LinkedIn",
    };

    return (
        labels[key] ||
        key
    );
}

// =====================================================
// STEP 2
// =====================================================

function BusinessOverview({
    formData,
    updateField,
}) {

    const competitors =
        Array.isArray(
            formData.competitors
        )
            ? [
                ...formData.competitors,
                "",
                "",
                "",
            ].slice(0, 3)
            : [
                "",
                "",
                "",
            ];

    return (
        <div
            className="
                animate-[fadeIn_0.4s_ease-out]
                py-8
            "
        >

            <StepHeader
                number="02"
                title="نبذة عن النشاط التجاري"
                description="ساعدنا على فهم نشاطك والسوق الذي تعمل فيه."
            />

            <div
                className="
                    grid
                    gap-5
                    md:grid-cols-2
                "
            >

                <Field
                    label="مجال النشاط"
                    value={
                        formData.businessField
                    }
                    placeholder="مثال: مطعم، متجر، عيادة، شركة تقنية..."
                    onChange={(value) =>
                        updateField(
                            "businessField",
                            value
                        )
                    }
                />

                <Field
                    label="سنوات العمل"
                    type="number"
                    value={
                        formData.yearsInBusiness
                    }
                    placeholder="مثال: 5"
                    onChange={(value) =>
                        updateField(
                            "yearsInBusiness",
                            value
                        )
                    }
                />

            </div>

            <div className="mt-6">

                <Textarea
                    label="أهم المنتجات أو الخدمات التي تقدمونها"
                    value={
                        formData.productsServices
                    }
                    onChange={(value) =>
                        updateField(
                            "productsServices",
                            value
                        )
                    }
                />

            </div>

            <div className="mt-10">

                <h3
                    className="
                        text-xl
                        font-extrabold
                        text-slate-900
                    "
                >
                    المنافسون الرئيسيون
                </h3>

                <p
                    className="
                        mt-2
                        text-sm
                        leading-6
                        text-slate-500
                    "
                >
                    اذكر ثلاثة منافسين
                    رئيسيين في السوق.
                </p>

                <div
                    className="
                        mt-5
                        grid
                        gap-5
                        md:grid-cols-3
                    "
                >

                    {competitors.map(
                        (
                            competitor,
                            index
                        ) => (

                            <Field
                                key={index}
                                label={`المنافس ${index + 1}`}
                                value={
                                    competitor
                                }
                                placeholder={`اسم المنافس ${index + 1}`}
                                onChange={(
                                    value
                                ) => {

                                    const updated =
                                        [
                                            ...competitors,
                                        ];

                                    updated[
                                        index
                                    ] = value;

                                    updateField(
                                        "competitors",
                                        updated
                                    );
                                }}
                            />

                        )
                    )}

                </div>

            </div>

            <div className="mt-8">

                <Textarea
                    label="ما الذي يميزكم عن المنافسين؟"
                    value={
                        formData.competitiveAdvantage
                    }
                    onChange={(value) =>
                        updateField(
                            "competitiveAdvantage",
                            value
                        )
                    }
                />

            </div>

        </div>
    );
}

// =====================================================
// Choice Section
// =====================================================

function ChoiceSection({
    number,
    title,
    description,
    values,
    selected,
    onToggle,
}) {

    return (
        <div
            className="
                animate-[fadeIn_0.4s_ease-out]
                py-8
            "
        >

            {number ? (
                <StepHeader
                    number={number}
                    title={title}
                    description={
                        description
                    }
                />
            ) : (
                <div className="mb-6">

                    {title && (
                        <h3
                            className="
                                text-xl
                                font-extrabold
                                text-slate-900
                            "
                        >
                            {title}
                        </h3>
                    )}

                    {description && (
                        <p className="mt-2 text-sm text-slate-500">
                            {
                                description
                            }
                        </p>
                    )}

                </div>
            )}

            <div
                className="
                    grid
                    gap-4
                    sm:grid-cols-2
                    lg:grid-cols-3
                "
            >

                {values.map(
                    (value) => {

                        const active =
                            Array.isArray(
                                selected
                            ) &&
                            selected.includes(
                                value
                            );

                        return (
                            <button
                                type="button"
                                key={value}
                                onClick={() =>
                                    onToggle(
                                        value
                                    )
                                }
                                className={`

                                    group
                                    relative
                                    overflow-hidden
                                    rounded-2xl
                                    border
                                    p-5
                                    text-right
                                    transition-all
                                    duration-300

                                    ${
                                        active
                                            ? `
                                                border-[#5EA8CC]
                                                bg-[#EAF6FC]
                                                shadow-lg
                                                shadow-[#5EA8CC]/10
                                            `
                                            : `
                                                border-slate-200
                                                bg-white
                                                hover:-translate-y-1
                                                hover:border-[#5EA8CC]/40
                                                hover:shadow-lg
                                            `
                                    }
                                `}
                            >

                                <div
                                    className="
                                        flex
                                        items-start
                                        gap-4
                                    "
                                >

                                    <div
                                        className={`

                                            mt-0.5
                                            flex
                                            h-6
                                            w-6
                                            shrink-0
                                            items-center
                                            justify-center
                                            rounded-full
                                            border-2
                                            transition-all
                                            duration-300

                                            ${
                                                active
                                                    ? `
                                                        border-[#5EA8CC]
                                                        bg-[#5EA8CC]
                                                        text-white
                                                    `
                                                    : `
                                                        border-slate-300
                                                        text-transparent
                                                    `
                                            }
                                        `}
                                    >
                                        <CheckCircle2
                                            size={14}
                                        />
                                    </div>

                                    <span
                                        className={`

                                            font-bold
                                            leading-6

                                            ${
                                                active
                                                    ? "text-[#3d7895]"
                                                    : "text-slate-700"
                                            }
                                        `}
                                    >
                                        {
                                            value
                                        }
                                    </span>

                                </div>

                            </button>
                        );
                    }
                )}

            </div>

        </div>
    );
}

// =====================================================
// Audience
// =====================================================

function AudienceStep({
    formData,
    updateNestedField,
}) {

    const audience =
        formData.audience || {};

    return (
        <div
            className="
                animate-[fadeIn_0.4s_ease-out]
                py-8
            "
        >

            <StepHeader
                number="05"
                title="الجمهور المستهدف"
                description="كلما فهمنا جمهورك بشكل أفضل، استطعنا بناء استراتيجية أدق."
            />

            <div
                className="
                    grid
                    gap-5
                    md:grid-cols-2
                "
            >

                <Field
                    label="العمر"
                    value={
                        audience.age
                    }
                    onChange={(value) =>
                        updateNestedField(
                            "audience",
                            "age",
                            value
                        )
                    }
                />

                <Field
                    label="الجنس"
                    value={
                        audience.gender
                    }
                    onChange={(value) =>
                        updateNestedField(
                            "audience",
                            "gender",
                            value
                        )
                    }
                />

                <Field
                    label="المدينة / الدولة"
                    value={
                        audience.location
                    }
                    onChange={(value) =>
                        updateNestedField(
                            "audience",
                            "location",
                            value
                        )
                    }
                />

                <Field
                    label="اللغة"
                    value={
                        audience.language
                    }
                    onChange={(value) =>
                        updateNestedField(
                            "audience",
                            "language",
                            value
                        )
                    }
                />

                <Field
                    label="الاهتمامات"
                    value={
                        audience.interests
                    }
                    onChange={(value) =>
                        updateNestedField(
                            "audience",
                            "interests",
                            value
                        )
                    }
                />

                <Field
                    label="القدرة الشرائية"
                    value={
                        audience.purchasingPower
                    }
                    onChange={(value) =>
                        updateNestedField(
                            "audience",
                            "purchasingPower",
                            value
                        )
                    }
                />

            </div>

        </div>
    );
}

// =====================================================
// Previous Collaboration
// =====================================================

function PreviousCollaboration({
    formData,
    updateNestedField,
}) {

    const data =
        formData.previousCollaboration ||
        {};

    return (
        <div
            className="
                animate-[fadeIn_0.4s_ease-out]
                py-8
            "
        >

            <StepHeader
                number="06"
                title="التعاونات السابقة"
                description="نريد معرفة التجارب السابقة حتى نستطيع تقديم تجربة أفضل."
            />

            <div
                className="
                    grid
                    gap-4
                    sm:grid-cols-2
                "
            >

                {[
                    "نعم",
                    "لا",
                ].map(
                    (value) => {

                        const active =
                            data.workedBefore ===
                            value;

                        return (
                            <button
                                type="button"
                                key={value}
                                onClick={() =>
                                    updateNestedField(
                                        "previousCollaboration",
                                        "workedBefore",
                                        value
                                    )
                                }
                                className={`

                                    rounded-2xl
                                    border
                                    p-6
                                    text-right
                                    font-bold
                                    transition-all
                                    duration-300

                                    ${
                                        active
                                            ? "border-[#5EA8CC] bg-[#EAF6FC] text-[#3d7895]"
                                            : "border-slate-200 bg-white text-slate-700 hover:border-[#5EA8CC]/40"
                                    }
                                `}
                            >

                                هل سبق لكم
                                التعاون مع وكالة
                                تسويق؟

                                <span
                                    className="
                                        mt-2
                                        block
                                        text-lg
                                    "
                                >
                                    {value}
                                </span>

                            </button>
                        );
                    }
                )}

            </div>

            {data.workedBefore ===
                "نعم" && (

                    <div
                        className="
                            mt-8
                            grid
                            gap-5
                            md:grid-cols-2
                        "
                    >

                        <Field
                            label="اسم الوكالة"
                            value={
                                data.agencyName
                            }
                            onChange={(
                                value
                            ) =>
                                updateNestedField(
                                    "previousCollaboration",
                                    "agencyName",
                                    value
                                )
                            }
                        />

                        <Field
                            label="سبب انتهاء التعاون"
                            value={
                                data.reason
                            }
                            onChange={(
                                value
                            ) =>
                                updateNestedField(
                                    "previousCollaboration",
                                    "reason",
                                    value
                                )
                            }
                        />

                        <Field
                            label="نتيجة التعاون"
                            value={
                                data.result
                            }
                            onChange={(
                                value
                            ) =>
                                updateNestedField(
                                    "previousCollaboration",
                                    "result",
                                    value
                                )
                            }
                        />

                        <Field
                            label="ما الذي ترغبون في تحسينه؟"
                            value={
                                data.improvement
                            }
                            onChange={(
                                value
                            ) =>
                                updateNestedField(
                                    "previousCollaboration",
                                    "improvement",
                                    value
                                )
                            }
                        />

                    </div>
                )}

        </div>
    );
}

// =====================================================
// Budget
// =====================================================

function BudgetStep({
    formData,
    updateNestedField,
}) {

    const budget =
        formData.budget || {
            type: "",
            from: "",
            to: "",
            currency: "USD",
        };

    const options = [
        "أقل من",
        "من",
        "مفتوحة حسب الخطة",
    ];

    return (
        <div
            className="
                animate-[fadeIn_0.4s_ease-out]
                py-8
            "
        >

            <StepHeader
                number="09"
                title="الميزانية المتوقعة"
                description="تساعدنا هذه المعلومة على اقتراح الحل والخطة الأنسب."
            />

            <div
                className="
                    grid
                    gap-4
                    sm:grid-cols-3
                "
            >

                {options.map(
                    (option) => {

                        const active =
                            budget.type ===
                            option;

                        return (
                            <button
                                type="button"
                                key={option}
                                onClick={() =>
                                    updateNestedField(
                                        "budget",
                                        "type",
                                        option
                                    )
                                }
                                className={`

                                    rounded-2xl
                                    border
                                    p-6
                                    text-center
                                    font-bold
                                    transition-all
                                    duration-300

                                    ${
                                        active
                                            ? "border-[#5EA8CC] bg-[#EAF6FC] text-[#3d7895]"
                                            : "border-slate-200 bg-white hover:border-[#5EA8CC]/40"
                                    }
                                `}
                            >
                                {
                                    option
                                }
                            </button>
                        );
                    }
                )}

            </div>

            <div
                className="
                    mt-8
                    grid
                    gap-5
                    md:grid-cols-3
                "
            >

                <Field
                    label="من"
                    value={
                        budget.from
                    }
                    onChange={(value) =>
                        updateNestedField(
                            "budget",
                            "from",
                            value
                        )
                    }
                />

                <Field
                    label="إلى"
                    value={
                        budget.to
                    }
                    onChange={(value) =>
                        updateNestedField(
                            "budget",
                            "to",
                            value
                        )
                    }
                />

                <label className="block">

                    <span
                        className="
                            mb-2
                            block
                            text-sm
                            font-bold
                            text-slate-700
                        "
                    >
                        العملة
                    </span>

                    <select
                        value={
                            budget.currency ||
                            "USD"
                        }
                        onChange={(e) =>
                            updateNestedField(
                                "budget",
                                "currency",
                                e.target.value
                            )
                        }
                        className="
                            w-full
                            rounded-xl
                            border
                            border-slate-200
                            bg-slate-50
                            px-4
                            py-3.5
                            outline-none
                            focus:border-[#5EA8CC]
                            focus:bg-white
                            focus:ring-4
                            focus:ring-[#5EA8CC]/10
                        "
                    >

                        <option value="USD">
                            USD
                        </option>

                        <option value="YER">
                            YER
                        </option>

                        <option value="SAR">
                            SAR
                        </option>

                        <option value="AED">
                            AED
                        </option>

                    </select>

                </label>

            </div>

        </div>
    );
}

// =====================================================
// Additional
// =====================================================

function AdditionalStep({
    formData,
    updateNestedField,
}) {

    const data =
        formData.additional || {
            preferredChannels: [],
            preferredContact: "",
            startDate: "",
            source: "",
            notes: "",
        };

    const channels =
        Array.isArray(
            data.preferredChannels
        )
            ? data.preferredChannels
            : [];

    return (
        <div
            className="
                animate-[fadeIn_0.4s_ease-out]
                py-8
            "
        >

            <StepHeader
                number="11"
                title="معلومات إضافية"
                description="بقيت بعض التفاصيل البسيطة قبل مراجعة طلبك."
            />

            <div className="space-y-8">

                <ChoiceSection
                    title="القنوات التسويقية المفضلة"
                    description=""
                    values={[
                        "Social Media",
                        "Website",
                        "Email",
                        "Search",
                        "Other",
                    ]}
                    selected={
                        channels
                    }
                    onToggle={(value) => {

                        const updated =
                            channels.includes(
                                value
                            )
                                ? channels.filter(
                                    (
                                        item
                                    ) =>
                                        item !==
                                        value
                                )
                                : [
                                    ...channels,
                                    value,
                                ];

                        updateNestedField(
                            "additional",
                            "preferredChannels",
                            updated
                        );
                    }}
                />

                <div
                    className="
                        grid
                        gap-5
                        md:grid-cols-2
                    "
                >

                    <Field
                        label="وسيلة التواصل المفضلة"
                        value={
                            data.preferredContact
                        }
                        onChange={(value) =>
                            updateNestedField(
                                "additional",
                                "preferredContact",
                                value
                            )
                        }
                    />

                    <Field
                        label="الموعد المتوقع لبدء المشروع"
                        value={
                            data.startDate
                        }
                        onChange={(value) =>
                            updateNestedField(
                                "additional",
                                "startDate",
                                value
                            )
                        }
                    />

                    <Field
                        label="كيف عرفتم عن SABARAT؟"
                        value={
                            data.source
                        }
                        onChange={(value) =>
                            updateNestedField(
                                "additional",
                                "source",
                                value
                            )
                        }
                    />

                </div>

                <Textarea
                    label="ملاحظات إضافية"
                    value={
                        data.notes
                    }
                    onChange={(value) =>
                        updateNestedField(
                            "additional",
                            "notes",
                            value
                        )
                    }
                />

            </div>

        </div>
    );
}

// =====================================================
// Step Header
// =====================================================

function StepHeader({
    number,
    title,
    description,
}) {

    return (
        <div className="mb-10">

            <div
                className="
                    flex
                    items-center
                    gap-4
                "
            >

                <span
                    className="
                        flex
                        h-12
                        w-12
                        shrink-0
                        items-center
                        justify-center
                        rounded-2xl
                        bg-slate-950
                        text-sm
                        font-black
                        text-white
                    "
                >
                    {number}
                </span>

                <div>

                    <p
                        className="
                            text-xs
                            font-bold
                            uppercase
                            tracking-[0.2em]
                            text-[#5EA8CC]
                        "
                    >
                        SABARAT DISCOVERY
                    </p>

                    <h2
                        className="
                            mt-1
                            text-3xl
                            font-black
                            text-slate-900
                        "
                    >
                        {title}
                    </h2>

                </div>

            </div>

            {description && (

                <p
                    className="
                        mt-4
                        max-w-2xl
                        leading-7
                        text-slate-500
                    "
                >
                    {description}
                </p>

            )}

        </div>
    );
}

// =====================================================
// Textarea
// =====================================================

function Textarea({
    label,
    value,
    onChange,
}) {

    return (
        <label className="block">

            <span
                className="
                    mb-2
                    block
                    text-sm
                    font-bold
                    text-slate-700
                "
            >
                {label}
            </span>

            <textarea
                value={
                    value ?? ""
                }
                onChange={(e) =>
                    onChange(
                        e.target.value
                    )
                }
                rows={5}
                className="
                    w-full
                    resize-none
                    rounded-xl
                    border
                    border-slate-200
                    bg-slate-50
                    px-4
                    py-4
                    text-slate-900
                    outline-none
                    transition-all
                    duration-300
                    placeholder:text-slate-400
                    hover:border-slate-300
                    focus:border-[#5EA8CC]
                    focus:bg-white
                    focus:ring-4
                    focus:ring-[#5EA8CC]/10
                "
            />

        </label>
    );
}

// =====================================================
// Textarea Step
// =====================================================

function TextareaStep({
    title,
    description,
    value,
    onChange,
}) {

    return (
        <div
            className="
                animate-[fadeIn_0.4s_ease-out]
                py-8
            "
        >

            <StepHeader
                number="10"
                title={title}
                description={
                    description
                }
            />

            <Textarea
                label="اكتب توقعاتك بالتفصيل"
                value={value}
                onChange={
                    onChange
                }
            />

        </div>
    );
}

// =====================================================
// Exports
// =====================================================

export {
    Field,
    Textarea,
};

export default ClientDiscoveryForm;