import { CheckCircle2, Edit3, Send } from "lucide-react";

function DiscoveryReview({
    formData,
    onBack,
    onSubmit,
    onPrivacyChange,
    isSubmitting = false,
}) {
    const marketingGoals = Array.isArray(formData?.marketingGoals)
        ? formData.marketingGoals
        : [];

    const services = Array.isArray(formData?.services)
        ? formData.services
        : [];

    const challenges = Array.isArray(formData?.challenges)
        ? formData.challenges
        : [];

    const privacyAccepted = Boolean(formData?.privacyAccepted);

    return (
        <div className="mx-auto max-w-4xl py-8">

            {/* =====================================
                HEADER
            ====================================== */}

            <div className="text-center">

                <span className="inline-flex rounded-full bg-[#EAF6FC] px-4 py-2 text-sm font-bold text-[#5EA8CC]">
                    المراجعة النهائية
                </span>

                <h2 className="mt-5 text-4xl font-black tracking-tight text-slate-900">
                    راجع بياناتك قبل الإرسال
                </h2>

                <p className="mx-auto mt-4 max-w-2xl text-slate-500">
                    تأكد من صحة جميع البيانات المدخلة.
                    يمكنك العودة وتعديل أي معلومة قبل إرسال الطلب.
                </p>

            </div>

            {/* =====================================
                REVIEW CARDS
            ====================================== */}

            <div className="mt-10 space-y-5">

                {/* بيانات العميل */}
                <ReviewCard
                    title="بيانات العميل"
                    items={[
                        ["اسم الشركة", formData?.companyName],
                        ["مسؤول التواصل", formData?.contactName],
                        ["المسمى الوظيفي", formData?.jobTitle],
                        ["رقم الجوال", formData?.phone],
                        ["البريد الإلكتروني", formData?.email],
                        ["الموقع الإلكتروني", formData?.website],
                        ["المدينة", formData?.city],
                        ["تاريخ الاجتماع", formData?.meetingDate],
                    ]}
                />

                {/* النشاط التجاري */}
                <ReviewCard
                    title="النشاط التجاري"
                    items={[
                        ["مجال النشاط", formData?.businessField],
                        ["سنوات العمل", formData?.yearsInBusiness],
                        ["المنتجات والخدمات", formData?.productsServices],
                        ["الميزة التنافسية", formData?.competitiveAdvantage],
                    ]}
                />

                {/* الأهداف والخدمات والتحديات */}
                <ReviewCard
                    title="الأهداف والخدمات والتحديات"
                    items={[
                        ["الأهداف التسويقية", marketingGoals.length ? marketingGoals.join("، ") : ""],
                        ["الخدمات المطلوبة", services.length ? services.join("، ") : ""],
                        ["التحديات الحالية", challenges.length ? challenges.join("، ") : ""],
                    ]}
                />

                {/* الجمهور المستهدف */}
                <ReviewCard
                    title="الجمهور المستهدف"
                    items={[
                        ["العمر", formData?.audience?.age],
                        ["الجنس", formData?.audience?.gender],
                        ["المدينة / الدولة", formData?.audience?.location],
                        ["اللغة", formData?.audience?.language],
                        ["الاهتمامات", formData?.audience?.interests],
                        ["القدرة الشرائية", formData?.audience?.purchasingPower],
                    ]}
                />

                {/* التعاونات السابقة */}
                <ReviewCard
                    title="التعاونات السابقة"
                    items={[
                        ["سبق التعاون مع وكالة", formData?.previousCollaboration?.workedBefore],
                        ["اسم الوكالة", formData?.previousCollaboration?.agencyName],
                        ["سبب انتهاء التعاون", formData?.previousCollaboration?.reason],
                        ["النتيجة", formData?.previousCollaboration?.result],
                        ["ما المطلوب تحسينه", formData?.previousCollaboration?.improvement],
                    ]}
                />

                {/* الميزانية */}
                <ReviewCard
                    title="الميزانية المتوقعة"
                    items={[
                        ["نوع الميزانية", formData?.budget?.type],
                        ["من", formData?.budget?.from],
                        ["إلى", formData?.budget?.to],
                        ["العملة", formData?.budget?.currency],
                    ]}
                />

                {/* التوقعات */}
                <ReviewCard
                    title="توقعات المشروع"
                    items={[
                        ["التوقعات", formData?.expectations],
                    ]}
                />

                {/* المعلومات الإضافية */}
                <ReviewCard
                    title="معلومات إضافية"
                    items={[
                        ["القنوات المفضلة", Array.isArray(formData?.additional?.preferredChannels)
                            ? formData.additional.preferredChannels.join("، ")
                            : ""],
                        ["وسيلة التواصل المفضلة", formData?.additional?.preferredContact],
                        ["موعد بدء المشروع", formData?.additional?.startDate],
                        ["مصدر التعرف على SABARAT", formData?.additional?.source],
                        ["ملاحظات", formData?.additional?.notes],
                    ]}
                />

            </div>

            {/* =====================================
                PRIVACY / CONFIRMATION
            ====================================== */}

            <div
                className={`
                    mt-8 rounded-2xl border p-5 transition-all duration-300
                    ${privacyAccepted
                        ? "border-emerald-200 bg-emerald-50"
                        : "border-[#5EA8CC]/20 bg-[#EAF6FC]"
                    }
                `}
            >
                <label className="flex cursor-pointer items-start gap-4">

                    <input
                        type="checkbox"
                        checked={privacyAccepted}
                        onChange={(event) => {
                            onPrivacyChange(event.target.checked);
                        }}
                        className="mt-1 h-5 w-5 shrink-0 cursor-pointer accent-[#5EA8CC]"
                    />

                    <span className="text-sm leading-7 text-slate-600">
                        أقر بأن جميع المعلومات التي قدمتها صحيحة،
                        وأوافق على استخدام هذه البيانات لغرض دراسة
                        احتياج المشروع والتواصل معي من قبل فريق

                        <span className="font-bold text-[#5EA8CC]"> SABARAT</span>.
                    </span>

                </label>

            </div>

            {/* =====================================
                PRIVACY STATUS
            ====================================== */}

            <div className="mt-3 min-h-[28px]">

                {privacyAccepted ? (

                    <p className="flex items-center gap-2 text-sm font-semibold text-emerald-600">
                        <CheckCircle2 size={17} />
                        تم تأكيد الموافقة ويمكنك إرسال الطلب.
                    </p>

                ) : (

                    <p className="text-sm font-medium text-slate-400">
                        يجب تأكيد الموافقة على استخدام البيانات قبل إرسال الطلب.
                    </p>

                )}

            </div>

            {/* =====================================
                ACTIONS
            ====================================== */}

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">

                {/* تعديل */}
                <button
                    type="button"
                    onClick={onBack}
                    disabled={isSubmitting}
                    className="flex-1 rounded-xl border border-slate-200 bg-white px-6 py-4 font-bold text-slate-700 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#5EA8CC]/30 hover:bg-[#EAF6FC] hover:text-[#5EA8CC] hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50"
                >
                    <Edit3 size={18} className="ml-2 inline" />
                    تعديل البيانات
                </button>

                {/* إرسال */}
                <button
                    type="button"
                    onClick={onSubmit}
                    disabled={!privacyAccepted || isSubmitting}
                    className="group flex-1 rounded-xl bg-[#5EA8CC] px-6 py-4 font-bold text-white shadow-lg shadow-[#5EA8CC]/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#4d96ba] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-40"
                >
                    <span className="inline-flex items-center gap-2">

                        {isSubmitting ? (
                            <>
                                <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                                جاري إرسال الطلب...
                            </>
                        ) : (
                            <>
                                <Send size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
                                إرسال الطلب
                            </>
                        )}

                    </span>
                </button>

            </div>

            {/* =====================================
                SECURITY NOTE
            ====================================== */}

            <div className="mt-6 text-center">
                <p className="text-xs leading-6 text-slate-400">
                    سيتم استخدام البيانات المدخلة لدراسة احتياج
                    مشروعك والتواصل معك بخصوص الطلب فقط.
                </p>
            </div>

        </div>
    );
}

/* ==================================================
REVIEW CARD
================================================== */

function ReviewCard({ title, items = [] }) {
    return (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:border-[#5EA8CC]/20 hover:shadow-md">

            {/* Header */}
            <div className="mb-6 flex items-center gap-3">

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EAF6FC]">
                    <CheckCircle2 size={20} className="text-[#5EA8CC]" />
                </div>

                <h3 className="font-extrabold text-slate-900">
                    {title}
                </h3>

            </div>

            {/* Data */}
            <div className="grid gap-4 sm:grid-cols-2">

                {items.map(([label, value], index) => (

                    <div
                        key={`${label}-${index}`}
                        className="rounded-xl bg-slate-50 p-4 transition-colors duration-300 hover:bg-[#EAF6FC]/60"
                    >

                        <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                            {label}
                        </p>

                        <p className="mt-2 break-words leading-7 text-slate-700">
                            {value || "—"}
                        </p>

                    </div>

                ))}

            </div>

        </div>
    );
}

export default DiscoveryReview;