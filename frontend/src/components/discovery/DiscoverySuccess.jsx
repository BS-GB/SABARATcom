import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    CheckCircle2,
    Download,
    Printer,
    RotateCcw,
    LogIn,
    UserPlus,
} from "lucide-react";
import DiscoveryPDF from "./DiscoveryPDF";

function DiscoverySuccess({ formData, onNewRequest }) {

    const navigate = useNavigate();
    const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

    // =================================================
    // Print
    // =================================================

    const handlePrint = () => {
        window.print();
    };

    // =================================================
    // PDF
    // =================================================

    const handleDownloadPDF = async () => {

        if (isGeneratingPDF) return;

        try {
            setIsGeneratingPDF(true);
            await DiscoveryPDF({ formData });
        } catch (error) {
            console.error("PDF generation failed:", error);
            alert("حدث خطأ أثناء إنشاء ملف PDF. تأكد من اتصال المتصفح بالصفحة ثم حاول مرة أخرى.");
        } finally {
            setIsGeneratingPDF(false);
        }
    };

    // =================================================
    // Go to Login
    // =================================================

    const goToLogin = () => {
        navigate("/login", {
            state: {
                from: "/client-discovery",
                returnTo: "/client-dashboard",
                pendingDiscovery: true,
                discoveryData: formData,
            },
        });
    };

    // =================================================
    // Go to Register
    // =================================================

    const goToRegister = () => {
        navigate("/register", {
            state: {
                from: "/client-discovery",
                returnTo: "/client-dashboard",
                pendingDiscovery: true,
                discoveryData: formData,
            },
        });
    };

    return (
        <main className="min-h-screen bg-slate-100 px-4 py-12 sm:px-6 lg:px-8">

            {/* =========================================
                Screen Header
            ========================================== */}

            <div className="no-print mx-auto mb-8 max-w-5xl">

                <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-900/5 sm:p-8">

                    <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">

                        <div>

                            <div className="flex items-center gap-3">

                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600">
                                    <CheckCircle2 size={26} />
                                </div>

                                <div>

                                    <h1 className="text-2xl font-black text-slate-950">
                                        تم إرسال النموذج بنجاح
                                    </h1>

                                    <p className="mt-1 text-sm text-slate-500">
                                        تم حفظ بيانات اكتشاف احتياجات العميل بنجاح.
                                    </p>

                                </div>

                            </div>

                        </div>

                        <div className="flex flex-wrap gap-3">

                            <button
                                type="button"
                                onClick={handlePrint}
                                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 font-bold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
                            >
                                <Printer size={18} />
                                طباعة
                            </button>

                            <button
                                type="button"
                                onClick={handleDownloadPDF}
                                disabled={isGeneratingPDF}
                                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#5EA8CC] px-5 py-3 font-bold text-white shadow-lg shadow-[#5EA8CC]/20 transition hover:bg-[#4d96ba] disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                <Download size={18} />
                                {isGeneratingPDF ? "جاري إنشاء PDF..." : "تحميل نسخة PDF"}
                            </button>

                        </div>

                    </div>

                </div>

            </div>

            {/* =========================================
                Login / Register Prompt
            ========================================== */}

            <div className="no-print mx-auto mb-8 max-w-5xl">

                <div className="rounded-[2rem] border-2 border-[#5EA8CC]/30 bg-[#EAF6FC] p-8 text-center shadow-lg">

                    <h2 className="text-2xl font-black text-slate-900">
                        🎯 خطوتك القادمة
                    </h2>

                    <p className="mx-auto mt-3 max-w-2xl text-lg leading-8 text-slate-600">
                        لتفعيل مشروعك ومتابعة تقدمه، يرجى إنشاء حساب أو تسجيل الدخول.
                    </p>

                    <p className="mt-2 text-sm text-slate-500">
                        سيتم ربط نموذج الاحتياج الخاص بك بحسابك تلقائياً.
                    </p>

                    <div className="mt-6 flex flex-wrap items-center justify-center gap-4">

                        <button
                            type="button"
                            onClick={goToLogin}
                            className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-950 px-8 py-4 font-bold text-white shadow-lg shadow-slate-950/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-slate-800"
                        >
                            <LogIn size={20} />
                            تسجيل الدخول
                        </button>

                        <span className="text-sm font-bold text-slate-400">أو</span>

                        <button
                            type="button"
                            onClick={goToRegister}
                            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#5EA8CC] px-8 py-4 font-bold text-white shadow-lg shadow-[#5EA8CC]/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#4d96ba]"
                        >
                            <UserPlus size={20} />
                            إنشاء حساب جديد
                        </button>

                    </div>

                    <p className="mt-4 text-xs text-slate-400">
                        🔒 بياناتك محفوظة بأمان. يمكنك العودة لاحقاً لإكمال التسجيل.
                    </p>

                </div>

            </div>

            {/* =========================================
                Printable Document
            ========================================== */}

            <div
                id="discovery-print-area"
                dir="rtl"
                className="mx-auto max-w-5xl rounded-[2rem] bg-white p-6 shadow-xl shadow-slate-900/5 sm:p-10"
            >

                {/* Document Header */}
                <div className="border-b border-slate-200 pb-8">

                    <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

                        <div>

                            <p className="text-sm font-bold tracking-[0.15em] text-[#5EA8CC]">
                                SABARAT DISCOVERY
                            </p>

                            <h2 className="mt-2 text-3xl font-black text-slate-950">
                                نموذج اكتشاف احتياجات العميل
                            </h2>

                            <p className="mt-2 text-sm text-slate-500">
                                Client Discovery Form
                            </p>

                        </div>

                        <div className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm">

                            <p className="font-bold text-slate-700">
                                🎉 تم استلام نموذجك بنجاح
                            </p>

                            <p className="mt-1 text-slate-500">
                                سجل الدخول أو أنشئ حساباً لتفعيل مشروعك
                            </p>

                            <p className="mt-3 font-bold text-[#5EA8CC]">
                                ✨ خطوتك القادمة: التسجيل أو تسجيل الدخول
                            </p>

                        </div>

                    </div>

                </div>

                {/* Client Data */}
                <Section number="01" title="بيانات العميل">

                    <InfoGrid>

                        <InfoItem label="اسم الشركة / المؤسسة" value={formData.companyName} />
                        <InfoItem label="اسم مسؤول التواصل" value={formData.contactName} />
                        <InfoItem label="المسمى الوظيفي" value={formData.jobTitle} />
                        <InfoItem label="رقم الجوال" value={formData.phone} />
                        <InfoItem label="البريد الإلكتروني" value={formData.email} />
                        <InfoItem label="الموقع الإلكتروني" value={formData.website} />
                        <InfoItem label="المدينة" value={formData.city} />
                        <InfoItem label="تاريخ الاجتماع" value={formatDate(formData.meetingDate)} />

                    </InfoGrid>

                    <div className="mt-6">

                        <h3 className="mb-4 text-lg font-black text-slate-900">
                            مواقع التواصل الحالية
                        </h3>

                        <InfoGrid>

                            {Object.entries(formData.social || {}).map(([key, value]) => (
                                <InfoItem key={key} label={socialLabel(key)} value={value} />
                            ))}

                        </InfoGrid>

                    </div>

                </Section>

                {/* Business */}
                <Section number="02" title="نبذة عن النشاط التجاري">

                    <InfoGrid>

                        <InfoItem label="مجال النشاط" value={formData.businessField} />
                        <InfoItem label="سنوات العمل" value={formData.yearsInBusiness} />

                    </InfoGrid>

                    <TextInfo label="أهم المنتجات أو الخدمات" value={formData.productsServices} />

                    <div className="mt-6">

                        <h3 className="mb-4 text-lg font-black text-slate-900">
                            المنافسون الرئيسيون
                        </h3>

                        <InfoGrid>

                            {(formData.competitors || []).map((competitor, index) => (
                                <InfoItem key={index} label={`المنافس ${index + 1}`} value={competitor} />
                            ))}

                        </InfoGrid>

                    </div>

                    <TextInfo label="ما الذي يميزكم عن المنافسين؟" value={formData.competitiveAdvantage} />

                </Section>

                {/* Brand */}
                <Section number="03" title="الوضع الحالي للعلامة التجارية">
                    <ListInfo values={formData.brandStatus} />
                </Section>

                {/* Goals */}
                <Section number="04" title="الأهداف التسويقية">
                    <ListInfo values={formData.marketingGoals} />
                </Section>

                {/* Audience */}
                <Section number="05" title="الجمهور المستهدف">

                    <InfoGrid>

                        <InfoItem label="العمر" value={formData.audience?.age} />
                        <InfoItem label="الجنس" value={formData.audience?.gender} />
                        <InfoItem label="المدينة / الدولة" value={formData.audience?.location} />
                        <InfoItem label="اللغة" value={formData.audience?.language} />
                        <InfoItem label="الاهتمامات" value={formData.audience?.interests} />
                        <InfoItem label="القدرة الشرائية" value={formData.audience?.purchasingPower} />

                    </InfoGrid>

                </Section>

                {/* Previous */}
                <Section number="06" title="التعاونات السابقة">

                    <InfoGrid>

                        <InfoItem label="هل سبق التعاون مع وكالة؟" value={formData.previousCollaboration?.workedBefore} />
                        <InfoItem label="اسم الوكالة" value={formData.previousCollaboration?.agencyName} />
                        <InfoItem label="سبب انتهاء التعاون" value={formData.previousCollaboration?.reason} />
                        <InfoItem label="نتيجة التعاون" value={formData.previousCollaboration?.result} />

                    </InfoGrid>

                    <TextInfo label="ما الذي ترغبون في تحسينه؟" value={formData.previousCollaboration?.improvement} />

                </Section>

                {/* Challenges */}
                <Section number="07" title="التحديات الحالية">
                    <ListInfo values={formData.challenges} />
                </Section>

                {/* Services */}
                <Section number="08" title="الخدمات المطلوبة">
                    <ListInfo values={formData.services} />
                </Section>

                {/* Budget */}
                <Section number="09" title="الميزانية المتوقعة">

                    <InfoGrid>

                        <InfoItem label="نوع الميزانية" value={formData.budget?.type} />
                        <InfoItem label="من" value={formData.budget?.from} />
                        <InfoItem label="إلى" value={formData.budget?.to} />
                        <InfoItem label="العملة" value={formData.budget?.currency} />

                    </InfoGrid>

                </Section>

                {/* Expectations */}
                <Section number="10" title="توقعات المشروع">
                    <TextInfo label="توقعات العميل" value={formData.expectations} />
                </Section>

                {/* Additional */}
                <Section number="11" title="معلومات إضافية">

                    <InfoGrid>

                        <InfoItem label="القنوات التسويقية المفضلة" value={(formData.additional?.preferredChannels || []).join("، ")} />
                        <InfoItem label="وسيلة التواصل المفضلة" value={formData.additional?.preferredContact} />
                        <InfoItem label="الموعد المتوقع لبدء المشروع" value={formData.additional?.startDate} />
                        <InfoItem label="كيف عرفتم عن SABARAT؟" value={formData.additional?.source} />

                    </InfoGrid>

                    <TextInfo label="ملاحظات إضافية" value={formData.additional?.notes} />

                </Section>

                {/* Footer */}
                <div className="mt-10 border-t border-slate-200 pt-6 text-center">

                    <p className="text-sm font-bold text-slate-600">
                        SABARAT
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                        Client Discovery Document
                    </p>

                </div>

            </div>

            {/* New Request */}
            <div className="no-print mx-auto mt-8 max-w-5xl text-center">

                <button
                    type="button"
                    onClick={onNewRequest}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3 font-bold text-slate-700 transition hover:bg-slate-50"
                >
                    <RotateCcw size={18} />
                    إنشاء نموذج جديد
                </button>

            </div>

            {/* Print CSS */}
            <style>
                {`
                    @media print {

                        @page {
                            size: A4;
                            margin: 12mm;
                        }

                        html, body {
                            background: #ffffff !important;
                            margin: 0 !important;
                            padding: 0 !important;
                        }

                        body * {
                            visibility: hidden !important;
                        }

                        #discovery-print-area,
                        #discovery-print-area * {
                            visibility: visible !important;
                        }

                        #discovery-print-area {
                            display: block !important;
                            width: 100% !important;
                            max-width: none !important;
                            margin: 0 !important;
                            padding: 0 !important;
                            border: 0 !important;
                            border-radius: 0 !important;
                            box-shadow: none !important;
                            background: #ffffff !important;
                        }

                        .no-print {
                            display: none !important;
                        }

                        #discovery-print-area section {
                            break-inside: avoid;
                            page-break-inside: avoid;
                        }

                        #discovery-print-area .print-card {
                            break-inside: avoid;
                            page-break-inside: avoid;
                        }
                    }
                `}
            </style>

        </main>
    );
}

// =====================================================
// Sub-components
// =====================================================

function Section({ number, title, children }) {
    return (
        <section className="print-card mt-8 border-b border-slate-200 pb-8">

            <div className="mb-5 flex items-center gap-3">

                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-950 text-xs font-black text-white">
                    {number}
                </span>

                <h2 className="text-xl font-black text-slate-950">
                    {title}
                </h2>

            </div>

            {children}

        </section>
    );
}

function InfoGrid({ children }) {
    return (
        <div className="grid gap-4 sm:grid-cols-2">
            {children}
        </div>
    );
}

function InfoItem({ label, value }) {
    const displayValue = value === null || value === undefined || String(value).trim() === ""
        ? "—"
        : String(value);

    return (
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">

            <p className="text-xs font-bold text-slate-400">
                {label}
            </p>

            <p className="mt-2 break-words text-sm font-bold leading-6 text-slate-800">
                {displayValue}
            </p>

        </div>
    );
}

function TextInfo({ label, value }) {
    const displayValue = value === null || value === undefined || String(value).trim() === ""
        ? "—"
        : String(value);

    return (
        <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-4">

            <p className="text-xs font-bold text-slate-400">
                {label}
            </p>

            <p className="mt-2 whitespace-pre-wrap break-words text-sm font-bold leading-7 text-slate-800">
                {displayValue}
            </p>

        </div>
    );
}

function ListInfo({ values }) {
    const items = Array.isArray(values)
        ? values.filter(item => item !== null && item !== undefined && String(item).trim() !== "")
        : [];

    if (!items.length) {
        return (
            <p className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm font-bold text-slate-400">
                —
            </p>
        );
    }

    return (
        <div className="grid gap-3 sm:grid-cols-2">

            {items.map((item, index) => (

                <div key={`${item}-${index}`} className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4">

                    <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-[#5EA8CC]" />

                    <span className="text-sm font-bold leading-6 text-slate-800">
                        {item}
                    </span>

                </div>

            ))}

        </div>
    );
}

function formatDate(value) {
    if (!value) return "—";

    try {
        const date = new Date(`${value}T00:00:00`);
        if (Number.isNaN(date.getTime())) return value;
        return date.toLocaleDateString("ar-YE", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    } catch {
        return value;
    }
}

function socialLabel(key) {
    const labels = {
        website: "الموقع الإلكتروني",
        instagram: "Instagram",
        facebook: "Facebook",
        x: "X",
        tiktok: "TikTok",
        youtube: "YouTube",
        linkedin: "LinkedIn",
    };
    return labels[key] || key;
}

export default DiscoverySuccess;