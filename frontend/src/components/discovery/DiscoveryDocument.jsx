import React, { forwardRef } from "react";

const DiscoveryDocument = forwardRef(function DiscoveryDocument(
    { formData = {} },
    ref
) {
    const social = formData.social || {};
    const audience = formData.audience || {};
    const previous = formData.previousCollaboration || {};
    const budget = formData.budget || {};
    const additional = formData.additional || {};

    const value = (item) => {
        if (
            item === null ||
            item === undefined ||
            item === ""
        ) {
            return "—";
        }

        return String(item);
    };

    const arrayValue = (items) => {
        if (!Array.isArray(items) || items.length === 0) {
            return "—";
        }

        return items.join("، ");
    };

    const FieldRow = ({ label, children }) => (
        <div className="border-b border-slate-200 py-3 last:border-b-0">
            <div className="mb-1 text-sm font-bold text-slate-500">
                {label}
            </div>

            <div className="break-words text-base font-semibold text-slate-900">
                {children}
            </div>
        </div>
    );

    const Section = ({
        number,
        title,
        children,
    }) => (
        <section className="mb-8 overflow-hidden rounded-2xl border border-slate-200 bg-white">
            <div className="flex items-center gap-3 border-b border-slate-200 bg-slate-950 px-5 py-4 text-white">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#5EA8CC] text-sm font-black">
                    {number}
                </span>

                <h2 className="text-lg font-black">
                    {title}
                </h2>
            </div>

            <div className="px-5 py-2">
                {children}
            </div>
        </section>
    );

    return (
        <div
            ref={ref}
            dir="rtl"
            lang="ar"
            className="mx-auto w-full max-w-[794px] bg-slate-100 p-6 text-right"
            style={{
                fontFamily:
                    "Arial, Tahoma, sans-serif",
            }}
        >
            {/* Document Header */}

            <div className="mb-8 overflow-hidden rounded-2xl bg-slate-950 text-white">
                <div className="px-6 py-8">
                    <div className="text-sm font-bold tracking-widest text-[#5EA8CC]">
                        SABARAT DISCOVERY
                    </div>

                    <h1 className="mt-3 text-3xl font-black">
                        نموذج اكتشاف احتياجات العميل
                    </h1>

                    <p className="mt-2 text-sm text-slate-400">
                        Client Discovery Form
                    </p>

                    <div className="mt-6 grid gap-3 sm:grid-cols-2">
                        <div className="rounded-xl bg-white/10 p-4">
                            <div className="text-xs text-slate-400">
                                رقم النموذج
                            </div>

                            <div className="mt-1 font-bold">
                                SPT-FRM-001
                            </div>
                        </div>

                        <div className="rounded-xl bg-white/10 p-4">
                            <div className="text-xs text-slate-400">
                                الإصدار
                            </div>

                            <div className="mt-1 font-bold">
                                V1.0
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Step 01 */}

            <Section
                number="01"
                title="بيانات العميل"
            >
                <FieldRow label="اسم الشركة / المؤسسة">
                    {value(formData.companyName)}
                </FieldRow>

                <FieldRow label="اسم مسؤول التواصل">
                    {value(formData.contactName)}
                </FieldRow>

                <FieldRow label="المسمى الوظيفي">
                    {value(formData.jobTitle)}
                </FieldRow>

                <FieldRow label="رقم الجوال">
                    {value(formData.phone)}
                </FieldRow>

                <FieldRow label="البريد الإلكتروني">
                    {value(formData.email)}
                </FieldRow>

                <FieldRow label="الموقع الإلكتروني">
                    {value(formData.website)}
                </FieldRow>

                <FieldRow label="المدينة">
                    {value(formData.city)}
                </FieldRow>

                <FieldRow label="تاريخ الاجتماع">
                    {value(formData.meetingDate)}
                </FieldRow>

                <FieldRow label="مسؤول الحساب">
                    {value(formData.accountManager)}
                </FieldRow>

                <FieldRow label="مواقع التواصل الحالية">
                    <div className="space-y-2">
                        <div>
                            <strong>Website:</strong>{" "}
                            {value(social.website)}
                        </div>

                        <div>
                            <strong>Instagram:</strong>{" "}
                            {value(social.instagram)}
                        </div>

                        <div>
                            <strong>Facebook:</strong>{" "}
                            {value(social.facebook)}
                        </div>

                        <div>
                            <strong>X:</strong>{" "}
                            {value(social.x)}
                        </div>

                        <div>
                            <strong>TikTok:</strong>{" "}
                            {value(social.tiktok)}
                        </div>

                        <div>
                            <strong>YouTube:</strong>{" "}
                            {value(social.youtube)}
                        </div>

                        <div>
                            <strong>LinkedIn:</strong>{" "}
                            {value(social.linkedin)}
                        </div>
                    </div>
                </FieldRow>
            </Section>

            {/* Step 02 */}

            <Section
                number="02"
                title="النشاط التجاري"
            >
                <FieldRow label="مجال النشاط">
                    {value(formData.businessField)}
                </FieldRow>

                <FieldRow label="سنوات العمل">
                    {value(formData.yearsInBusiness)}
                </FieldRow>

                <FieldRow label="أهم المنتجات أو الخدمات">
                    {value(formData.productsServices)}
                </FieldRow>

                <FieldRow label="المنافسون الرئيسيون">
                    <div className="space-y-2">
                        {(formData.competitors || []).map(
                            (competitor, index) => (
                                <div key={index}>
                                    المنافس {index + 1}:{" "}
                                    {value(competitor)}
                                </div>
                            )
                        )}
                    </div>
                </FieldRow>

                <FieldRow label="الميزة التنافسية">
                    {value(
                        formData.competitiveAdvantage
                    )}
                </FieldRow>
            </Section>

            {/* Step 03 */}

            <Section
                number="03"
                title="العلامة التجارية"
            >
                <FieldRow label="الوضع الحالي للعلامة التجارية">
                    {arrayValue(formData.brandStatus)}
                </FieldRow>
            </Section>

            {/* Step 04 */}

            <Section
                number="04"
                title="الأهداف التسويقية"
            >
                <FieldRow label="الأهداف التسويقية">
                    {arrayValue(formData.marketingGoals)}
                </FieldRow>
            </Section>

            {/* Step 05 */}

            <Section
                number="05"
                title="الجمهور المستهدف"
            >
                <FieldRow label="العمر">
                    {value(audience.age)}
                </FieldRow>

                <FieldRow label="الجنس">
                    {value(audience.gender)}
                </FieldRow>

                <FieldRow label="المدينة / الدولة">
                    {value(audience.location)}
                </FieldRow>

                <FieldRow label="اللغة">
                    {value(audience.language)}
                </FieldRow>

                <FieldRow label="الاهتمامات">
                    {value(audience.interests)}
                </FieldRow>

                <FieldRow label="القدرة الشرائية">
                    {value(audience.purchasingPower)}
                </FieldRow>
            </Section>

            {/* Step 06 */}

            <Section
                number="06"
                title="التعاونات السابقة"
            >
                <FieldRow label="هل سبق التعاون مع وكالة تسويق؟">
                    {value(previous.workedBefore)}
                </FieldRow>

                {previous.workedBefore === "نعم" && (
                    <>
                        <FieldRow label="اسم الوكالة">
                            {value(previous.agencyName)}
                        </FieldRow>

                        <FieldRow label="سبب انتهاء التعاون">
                            {value(previous.reason)}
                        </FieldRow>

                        <FieldRow label="نتيجة التعاون">
                            {value(previous.result)}
                        </FieldRow>

                        <FieldRow label="ما الذي ترغبون في تحسينه؟">
                            {value(previous.improvement)}
                        </FieldRow>
                    </>
                )}
            </Section>

            {/* Step 07 */}

            <Section
                number="07"
                title="التحديات الحالية"
            >
                <FieldRow label="التحديات">
                    {arrayValue(formData.challenges)}
                </FieldRow>
            </Section>

            {/* Step 08 */}

            <Section
                number="08"
                title="الخدمات المطلوبة"
            >
                <FieldRow label="الخدمات">
                    {arrayValue(formData.services)}
                </FieldRow>
            </Section>

            {/* Step 09 */}

            <Section
                number="09"
                title="الميزانية"
            >
                <FieldRow label="نوع الميزانية">
                    {value(budget.type)}
                </FieldRow>

                <FieldRow label="من">
                    {value(budget.from)}
                </FieldRow>

                <FieldRow label="إلى">
                    {value(budget.to)}
                </FieldRow>

                <FieldRow label="العملة">
                    {value(budget.currency)}
                </FieldRow>
            </Section>

            {/* Step 10 */}

            <Section
                number="10"
                title="توقعات المشروع"
            >
                <FieldRow label="التوقعات">
                    {value(formData.expectations)}
                </FieldRow>
            </Section>

            {/* Step 11 */}

            <Section
                number="11"
                title="معلومات إضافية"
            >
                <FieldRow label="القنوات التسويقية المفضلة">
                    {arrayValue(
                        additional.preferredChannels
                    )}
                </FieldRow>

                <FieldRow label="وسيلة التواصل المفضلة">
                    {value(
                        additional.preferredContact
                    )}
                </FieldRow>

                <FieldRow label="الموعد المتوقع لبدء المشروع">
                    {value(
                        additional.startDate
                    )}
                </FieldRow>

                <FieldRow label="كيف عرفتم عن SABARAT؟">
                    {value(additional.source)}
                </FieldRow>

                <FieldRow label="ملاحظات إضافية">
                    {value(additional.notes)}
                </FieldRow>
            </Section>

            {/* Privacy */}

            <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-5">
                <div className="text-sm font-bold text-slate-500">
                    الموافقة على سياسة استخدام البيانات
                </div>

                <div className="mt-2 font-bold text-slate-900">
                    {formData.privacyAccepted
                        ? "تمت الموافقة"
                        : "لم تتم الموافقة"}
                </div>
            </div>

            {/* Footer */}

            <div className="border-t border-slate-300 pt-5 text-center text-xs text-slate-500">
                <p>
                    SABARAT — Client Discovery Form
                </p>

                <p className="mt-1">
                    هذا المستند يحتوي على معلومات قدمها العميل
                    لأغراض دراسة الاحتياج والتخطيط للمشروع.
                </p>
            </div>
        </div>
    );
});

export default DiscoveryDocument;