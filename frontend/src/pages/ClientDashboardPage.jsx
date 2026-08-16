import {
    Activity,
    ArrowLeft,
    ArrowRight,
    Bell,
    BriefcaseBusiness,
    CalendarDays,
    Check,
    CheckCircle2,
    ChevronLeft,
    ChevronRight,
    Clock3,
    Code2,
    CreditCard,
    FileCheck2,
    FileText,
    FolderOpen,
    Globe2,
    HelpCircle,
    LayoutDashboard,
    LogOut,
    Mail,
    MessageCircle,
    MoreHorizontal,
    Paperclip,
    PenLine,
    Plus,
    Receipt,
    Search,
    Send,
    Settings,
    ShieldCheck,
    Sparkles,
    Target,
    TicketCheck,
    TrendingUp,
    Upload,
    User,
    Users,
    WalletCards,
    X,
} from "lucide-react";

import {
    Link,
    useSearchParams,
} from "react-router-dom";

import { useState } from "react";


const BRAND = "#5EA8CC";
const BRAND_DARK = "#3D7895";
const BRAND_SOFT = "#EAF6FC";
const BRAND_TINT = "#F8FCFE";

const TOKENS = {
    section: "mb-8",
    card: "rounded-3xl border border-slate-200 bg-white shadow-lg shadow-slate-900/5",
    cardPad: "p-6 sm:p-8",
    cardPadSm: "p-5",
    darkCard: "rounded-3xl bg-slate-950 text-white",
    iconBox:
        "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#EAF6FC] text-[#5EA8CC]",
    iconBoxSm:
        "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#EAF6FC] text-[#5EA8CC]",
    eyebrow:
        "text-[10px] font-black uppercase tracking-[0.2em] text-[#5EA8CC]",
    pillActive:
        "flex w-fit items-center gap-2 rounded-full bg-[#EAF6FC] px-3 py-2 text-xs font-black text-[#3D7895]",
    ctaDark:
        "flex items-center justify-center gap-2 rounded-xl bg-slate-950 px-4 py-3 text-xs font-black text-white transition hover:bg-[#5EA8CC]",
    ctaOutline:
        "flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-xs font-black text-slate-700 transition hover:border-[#5EA8CC]/30 hover:text-[#5EA8CC]",
    ctaBrand:
        "inline-flex items-center justify-center gap-2 rounded-xl bg-[#5EA8CC] px-5 py-3.5 text-sm font-black text-white shadow-lg shadow-[#5EA8CC]/20 transition hover:-translate-y-1 hover:bg-[#4D96BA]",
};

// =====================================================
// Temporary Client Data
// =====================================================

const client = {
    name: "SABARAT Client",
    company: "Your Company",
    email: "client@example.com",
};

const project = {
    name: "Marketing & Digital Growth",
    service: "Digital Marketing",
    status: "Discovery",
    statusLabel: "جاري تحليل احتياج المشروع",
    progress: 28,
    requirementsProgress: 62,
    startDate: "لم يبدأ بعد",
    lastUpdate: "منذ اليوم",
    manager: "SABARAT Team",
};

const workspaceStats = {
    projects: 1,
    activeProjects: 1,
    files: 12,
    approvals: 2,
    messages: 3,
    meetings: 1,
    invoices: 2,
    pendingAmount: "$0",
};

const navigationGroups = [
    {
        title: "مساحة العمل",
        items: [
            { label: "الرئيسية", icon: LayoutDashboard, to: "/client-dashboard" },
            { label: "المشاريع", icon: BriefcaseBusiness, to: "/client-projects", badge: "1" },
            { label: "الخدمات", icon: Sparkles, to: "/client-services" },
            { label: "المهام", icon: CheckCircle2, to: "/client-tasks", badge: "4" },
            { label: "متطلبات المشروع", icon: Target, to: "/client-discovery", badge: "مهم" },
        ],
    },
    {
        title: "التسويق والمحتوى",
        items: [
            { label: "التقويم والمحتوى", icon: CalendarDays, to: "/client-content" },
            { label: "الحملات الإعلانية", icon: TrendingUp, to: "/client-campaigns" },
            { label: "التقارير والتحليلات", icon: Activity, to: "/client-reports" },
        ],
    },
    {
        title: "التطوير والأنظمة",
        items: [
            { label: "المواقع", icon: Globe2, to: "/client-websites" },
            { label: "الأنظمة", icon: Code2, to: "/client-systems" },
            { label: "طلبات التطوير", icon: Plus, to: "/client-feature-requests" },
            { label: "المشاكل والأخطاء", icon: TicketCheck, to: "/client-bugs" },
        ],
    },
    {
        title: "الملفات والموافقات",
        items: [
            { label: "الملفات", icon: Paperclip, to: "/client-files" },
            { label: "الموافقات", icon: FileCheck2, to: "/client-approvals", badge: "2" },
        ],
    },
    {
        title: "التواصل",
        items: [
            { label: "الرسائل", icon: MessageCircle, to: "/client-messages", badge: "3" },
            { label: "الاجتماعات", icon: CalendarDays, to: "/client-meetings" },
            { label: "الدعم", icon: HelpCircle, to: "/client-support" },
        ],
    },
    {
        title: "المالية",
        items: [
            { label: "العروض", icon: FileText, to: "/client-proposals" },
            { label: "العقود", icon: FileCheck2, to: "/client-contracts" },
            { label: "الفواتير", icon: Receipt, to: "/client-invoices" },
            { label: "المدفوعات", icon: CreditCard, to: "/client-payments" },
        ],
    },
];

const activities = [
    {
        title: "تم إرسال نموذج الاحتياج",
        description: "تم استلام معلومات نشاطك وأهدافك التسويقية.",
        date: "اليوم",
        completed: true,
        icon: FileCheck2,
    },
    {
        title: "تحليل المشروع",
        description: "يقوم فريق SABARAT بمراجعة احتياجات المشروع.",
        date: "قيد التنفيذ",
        completed: true,
        icon: Target,
    },
    {
        title: "إعداد الاستراتيجية",
        description: "سيتم إعداد التوجه التسويقي المناسب لمشروعك.",
        date: "التالي",
        completed: false,
        icon: Sparkles,
    },
    {
        title: "الإنتاج والتنفيذ",
        description: "تصميم المحتوى وتنفيذ الخدمات المتفق عليها.",
        date: "لاحقًا",
        completed: false,
        icon: FolderOpen,
    },
    {
        title: "المراجعة والموافقة",
        description: "مراجعة الأعمال واعتماد المخرجات النهائية.",
        date: "لاحقًا",
        completed: false,
        icon: CheckCircle2,
    },
];

const requirementSections = [
    {
        title: "معلومات النشاط",
        description: "المعلومات الأساسية الخاصة بنشاطك التجاري.",
        icon: BuildingIcon,
        status: "مكتمل",
        progress: 100,
        items: ["اسم الشركة أو النشاط", "نوع النشاط", "وصف النشاط", "موقع الشركة", "بيانات التواصل"],
    },
    {
        title: "أهداف المشروع",
        description: "الأهداف التي تريد تحقيقها من المشروع.",
        icon: Target,
        status: "مطلوب",
        progress: 60,
        items: ["الهدف الرئيسي", "الأهداف التسويقية", "النتائج المتوقعة", "مؤشرات النجاح"],
    },
    {
        title: "الجمهور المستهدف",
        description: "ساعدنا على فهم العملاء الذين تستهدفهم.",
        icon: Users,
        status: "مطلوب",
        progress: 45,
        items: ["الفئة العمرية", "الموقع الجغرافي", "الاهتمامات", "السلوك الشرائي", "نوع العملاء"],
    },
    {
        title: "الخدمات المطلوبة",
        description: "حدد الخدمات التي تحتاج إليها.",
        icon: Sparkles,
        status: "مكتمل",
        progress: 100,
        items: ["إدارة حسابات التواصل الاجتماعي", "صناعة المحتوى", "الحملات الإعلانية", "Reels", "التصميم الجرافيكي"],
    },
    {
        title: "الهوية التجارية",
        description: "المعلومات المتعلقة بالعلامة التجارية.",
        icon: PenLine,
        status: "مطلوب",
        progress: 55,
        items: ["الشعار", "الألوان", "الخطوط", "Brand Guidelines", "أسلوب التواصل"],
    },
    {
        title: "المنافسون",
        description: "معلومات عن المنافسين والسوق.",
        icon: Users,
        status: "مطلوب",
        progress: 40,
        items: ["المنافسون الرئيسيون", "روابط المنافسين", "نقاط القوة", "نقاط الضعف", "الميزة التنافسية"],
    },
    {
        title: "الميزانية والمدة",
        description: "المعلومات المالية والزمنية للمشروع.",
        icon: WalletCards,
        status: "مطلوب",
        progress: 50,
        items: ["الميزانية المتوقعة", "تاريخ البداية", "الموعد المطلوب", "مدة المشروع"],
    },
    {
        title: "الملفات والمرفقات",
        description: "شارك الملفات المهمة مع فريق SABARAT.",
        icon: Upload,
        status: "مطلوب",
        progress: 30,
        items: ["الشعار", "صور المنتجات", "ملفات الهوية", "المستندات", "ملفات أخرى"],
    },
];

const quickActions = [
    { title: "طلب خدمة", description: "اطلب خدمة جديدة من SABARAT", icon: Plus, to: "/client-services" },
    { title: "رفع ملف", description: "أرسل ملفات المشروع للفريق", icon: Upload, to: "/client-files" },
    { title: "طلب اجتماع", description: "احجز موعدًا مع فريق SABARAT", icon: CalendarDays, to: "/client-meetings" },
    { title: "إرسال رسالة", description: "تواصل مع فريق المشروع", icon: Send, to: "/client-messages" },
];

const pendingApprovals = [
    { title: "خطة المحتوى الشهرية", type: "Content Plan", date: "اليوم" },
    { title: "التصميم الإعلاني", type: "Social Media Design", date: "أمس" },
];

const recentFiles = [
    { name: "SABARAT_Project_Brief.pdf", type: "PDF", size: "2.4 MB", date: "اليوم" },
    { name: "Brand_Assets.zip", type: "ZIP", size: "18.6 MB", date: "أمس" },
    { name: "Marketing_Strategy.docx", type: "DOCX", size: "1.8 MB", date: "منذ يومين" },
];

const services = [
    { title: "إدارة التواصل الاجتماعي", category: "Social Media", status: "نشطة", progress: 35, icon: MessageCircle },
    { title: "صناعة المحتوى", category: "Content", status: "قيد الإعداد", progress: 20, icon: Sparkles },
    { title: "التطوير الرقمي", category: "Development", status: "متاحة", progress: 0, icon: Code2 },
];

const upcomingMeetings = [
    { title: "اجتماع استراتيجية التسويق", date: "الخميس، 20 أغسطس", time: "11:00 صباحًا", type: "Google Meet" },
];

const notifications = [
    { title: "مطلوب اعتماد", description: "لديك عمليتان بانتظار المراجعة.", icon: CheckCircle2 },
    { title: "تم تحديث المشروع", description: "تم تحديث مرحلة المشروع إلى Discovery.", icon: Activity },
    { title: "ملف جديد", description: "تمت إضافة ملف جديد إلى مشروعك.", icon: FileText },
];

// =====================================================
// Main
// =====================================================

function ClientDashboardPage() {
    const [searchParams] = useSearchParams();
    const status = searchParams.get("status");

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [notificationsOpen, setNotificationsOpen] = useState(false);

    return (
        <main dir="rtl" className="min-h-screen bg-[#F6F9FC] text-slate-900">
            {/* =================================================
                Mobile Overlay
            ================================================= */}

            {sidebarOpen && (
                <button
                    type="button"
                    aria-label="إغلاق القائمة"
                    onClick={() => setSidebarOpen(false)}
                    className="fixed inset-0 z-40 bg-slate-950/50 backdrop-blur-sm lg:hidden"
                />
            )}

            {/* =================================================
                Sidebar
            ================================================= */}

            <aside
                className={`
                    fixed inset-y-0 right-0 z-50 flex w-[290px] flex-col
                    border-l border-slate-200 bg-white shadow-2xl
                    transition-transform duration-300 lg:translate-x-0
                    ${sidebarOpen ? "translate-x-0" : "translate-x-full"}
                `}
            >
                {/* Logo */}

                <div className="flex h-20 shrink-0 items-center justify-between border-b border-slate-100 px-6">
                    <Link to="/" className="text-2xl font-black tracking-tight text-[#5EA8CC]">
                        SABARAT
                        <span className="mt-1 block text-[9px] font-black tracking-[0.25em] text-slate-400">
                            CLIENT WORKSPACE
                        </span>
                    </Link>

                    <button
                        type="button"
                        onClick={() => setSidebarOpen(false)}
                        className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 lg:hidden"
                    >
                        <X size={18} />
                    </button>
                </div>

                {/* Client */}

                <div className="px-4 pt-5">
                    <div className="flex items-center gap-3 rounded-2xl border border-[#5EA8CC]/10 bg-[#EAF6FC] p-3">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-sm font-black text-[#5EA8CC] shadow-sm">
                            {client.name.charAt(0)}
                        </div>

                        <div className="min-w-0">
                            <p className="truncate text-sm font-black text-slate-900">{client.name}</p>
                            <p className="mt-1 truncate text-[11px] font-semibold text-slate-500">{client.company}</p>
                        </div>
                    </div>
                </div>

                {/* Navigation */}

                <nav className="mt-5 flex-1 overflow-y-auto px-4 pb-4">
                    {navigationGroups.map((group) => (
                        <div key={group.title} className="mb-5">
                            <p className="mb-2 px-3 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                                {group.title}
                            </p>

                            <div className="space-y-1">
                                {group.items.map((item) => {
                                    const Icon = item.icon;

                                    return (
                                        <Link
                                            key={item.label}
                                            to={item.to}
                                            onClick={() => setSidebarOpen(false)}
                                            className="group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-bold text-slate-600 transition-all duration-200 hover:bg-[#EAF6FC] hover:text-[#3D7895]"
                                        >
                                            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-50 text-slate-400 transition group-hover:bg-white group-hover:text-[#5EA8CC]">
                                                <Icon size={17} />
                                            </span>

                                            <span className="flex-1">{item.label}</span>

                                            {item.badge && (
                                                <span className="rounded-full bg-[#5EA8CC] px-2 py-0.5 text-[9px] font-black text-white">
                                                    {item.badge}
                                                </span>
                                            )}
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    ))}

                    <div className="border-t border-slate-100 pt-5">
                        <p className="mb-2 px-3 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                            الحساب
                        </p>

                        <Link
                            to="/client-profile"
                            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-50"
                        >
                            <User size={18} />
                            الحساب الشخصي
                        </Link>

                        <Link
                            to="/client-settings"
                            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-50"
                        >
                            <Settings size={18} />
                            الإعدادات
                        </Link>

                        <button
                            type="button"
                            className="mt-1 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-bold text-red-500 hover:bg-red-50"
                        >
                            <LogOut size={18} />
                            تسجيل الخروج
                        </button>
                    </div>
                </nav>

                {/* Help */}

                <div className="shrink-0 p-4">
                    <div className="rounded-2xl bg-slate-950 p-4 text-white">
                        <HelpCircle size={20} className="text-[#8ED4F5]" />

                        <p className="mt-3 text-sm font-black">تحتاج إلى مساعدة؟</p>

                        <p className="mt-1 text-[11px] leading-5 text-slate-400">
                            فريق SABARAT جاهز لمساعدتك في أي وقت.
                        </p>

                        <Link
                            to="/client-support"
                            className="mt-3 flex w-full items-center justify-center rounded-lg bg-white/10 px-3 py-2 text-xs font-black transition hover:bg-white/20"
                        >
                            التواصل مع الدعم
                        </Link>
                    </div>
                </div>
            </aside>

            {/* =================================================
                Main Area
            ================================================= */}

            <div className="lg:mr-[290px]">
                {/* =================================================
                    Header
                ================================================= */}

                <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur-xl">
                    <div className="flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center gap-3">
                            <button
                                type="button"
                                onClick={() => setSidebarOpen(true)}
                                className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 lg:hidden"
                            >
                                <ChevronLeft size={19} />
                            </button>

                            <div className="hidden sm:block">
                                <p className="text-xs font-bold text-slate-400">مساحة العميل</p>
                                <p className="mt-1 text-sm font-black text-slate-900">{project.name}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 sm:gap-3">
                            <button
                                type="button"
                                className="hidden h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 hover:text-[#5EA8CC] sm:flex"
                            >
                                <Search size={18} />
                            </button>

                            <div className="relative">
                                <button
                                    type="button"
                                    onClick={() => setNotificationsOpen((value) => !value)}
                                    className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 hover:text-[#5EA8CC]"
                                >
                                    <Bell size={18} />
                                    <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[#5EA8CC]" />
                                </button>

                                {notificationsOpen && (
                                    <div className="absolute left-0 top-12 z-50 w-[320px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
                                        <div className="flex items-center justify-between border-b border-slate-100 p-4">
                                            <p className="text-sm font-black">الإشعارات</p>
                                            <span className="text-[10px] font-bold text-[#5EA8CC]">3 جديدة</span>
                                        </div>

                                        <div>
                                            {notifications.map((notification) => {
                                                const Icon = notification.icon;

                                                return (
                                                    <div
                                                        key={notification.title}
                                                        className="flex gap-3 border-b border-slate-50 p-4 hover:bg-slate-50"
                                                    >
                                                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#EAF6FC] text-[#5EA8CC]">
                                                            <Icon size={16} />
                                                        </div>

                                                        <div>
                                                            <p className="text-xs font-black text-slate-900">
                                                                {notification.title}
                                                            </p>
                                                            <p className="mt-1 text-[11px] leading-5 text-slate-500">
                                                                {notification.description}
                                                            </p>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>

                                        <Link
                                            to="/client-notifications"
                                            className="flex items-center justify-center p-3 text-xs font-black text-[#5EA8CC]"
                                        >
                                            عرض جميع الإشعارات
                                        </Link>
                                    </div>
                                )}
                            </div>

                            <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-2 py-1.5">
                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#EAF6FC] text-xs font-black text-[#5EA8CC]">
                                    {client.name.charAt(0)}
                                </div>

                                <span className="hidden text-xs font-black text-slate-700 md:block">
                                    {client.name}
                                </span>
                            </div>
                        </div>
                    </div>
                </header>

                {/* =================================================
                    Content
                ================================================= */}

                <div className="mx-auto max-w-[1600px] px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
                    {/* =================================================
                        1. Welcome
                    ================================================= */}

                    <section className={TOKENS.section}>
                        <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
                            <div>
                                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#5EA8CC]/20 bg-[#EAF6FC] px-3 py-1.5 text-xs font-black text-[#3D7895]">
                                    <Sparkles size={14} />
                                    مساحة العميل
                                </div>

                                <h1 className="text-3xl font-black tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
                                    مرحبًا بعودتك،
                                    <span className="text-[#5EA8CC]"> عميل SABARAT</span>
                                </h1>

                                <p className="mt-4 max-w-4xl text-sm leading-7 text-slate-500 sm:text-base">
                                    من هنا يمكنك إدارة مشاريعك وخدماتك وملفاتك وموافقاتك وتقاريرك وفواتيرك والتواصل
                                    مباشرة مع فريق SABARAT.
                                </p>
                            </div>

                            <Link to="/client-discovery" className={TOKENS.ctaBrand}>
                                إكمال متطلبات المشروع
                                <ArrowRight size={17} />
                            </Link>
                        </div>

                        {(status === "login" || status === "registered") && (
                            <div className="mt-6 flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
                                <CheckCircle2 size={20} className="mt-0.5 shrink-0 text-emerald-600" />

                                <div>
                                    <p className="font-black text-emerald-950">
                                        {status === "registered" ? "تم إنشاء حسابك بنجاح." : "تم تسجيل الدخول بنجاح."}
                                    </p>
                                    <p className="mt-1 text-sm text-emerald-700">مساحة مشروعك جاهزة الآن.</p>
                                </div>
                            </div>
                        )}
                    </section>

                    {/* =================================================
                        2. Quick Actions
                    ================================================= */}

                    <section className={TOKENS.section}>
                        <SectionHeading
                            eyebrow="QUICK ACTIONS"
                            title="ماذا تريد أن تفعل؟"
                            description="الوصول السريع إلى أهم الإجراءات في مساحة العميل."
                        />

                        <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                            {quickActions.map((action) => {
                                const Icon = action.icon;

                                return (
                                    <Link
                                        key={action.title}
                                        to={action.to}
                                        className={`group ${TOKENS.card} ${TOKENS.cardPadSm} transition-all duration-300 hover:-translate-y-1 hover:border-[#5EA8CC]/30 hover:shadow-xl`}
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className={TOKENS.iconBox}>
                                                <Icon size={20} />
                                            </div>

                                            <ArrowLeft
                                                size={16}
                                                className="text-slate-300 transition group-hover:text-[#5EA8CC]"
                                            />
                                        </div>

                                        <h3 className="mt-5 text-sm font-black text-slate-900">{action.title}</h3>
                                        <p className="mt-2 text-[11px] leading-5 text-slate-500">
                                            {action.description}
                                        </p>
                                    </Link>
                                );
                            })}
                        </div>
                    </section>

                    {/* =================================================
                        3. Project Overview (status + progress + stage)
                    ================================================= */}

                    <section className={`${TOKENS.section} overflow-hidden ${TOKENS.card}`}>
                        <div className="grid lg:grid-cols-[1.4fr_0.6fr]">
                            <div className={TOKENS.cardPad}>
                                <p className={TOKENS.eyebrow}>المشروع الحالي</p>

                                <div className="mt-2 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                    <div>
                                        <h2 className="text-2xl font-black text-slate-950 sm:text-3xl">
                                            {project.name}
                                        </h2>
                                        <p className="mt-2 text-sm text-slate-500">{project.service}</p>
                                    </div>

                                    <span className={TOKENS.pillActive}>
                                        <span className="h-2 w-2 animate-pulse rounded-full bg-[#5EA8CC]" />
                                        {project.statusLabel}
                                    </span>
                                </div>

                                <div className="mt-10">
                                    <div className="mb-3 flex items-center justify-between">
                                        <span className="text-sm font-bold text-slate-500">نسبة إنجاز المشروع</span>
                                        <span className="text-lg font-black text-[#5EA8CC]">{project.progress}%</span>
                                    </div>

                                    <ProgressBar value={project.progress} />
                                </div>

                                <div className="mt-6 rounded-2xl border border-slate-100 bg-slate-50 p-5">
                                    <div className="mb-2 flex items-center justify-between">
                                        <span className="text-xs font-bold text-slate-500">اكتمال متطلبات المشروع</span>
                                        <span className="text-sm font-black text-[#5EA8CC]">
                                            {project.requirementsProgress}%
                                        </span>
                                    </div>

                                    <ProgressBar value={project.requirementsProgress} height="h-2.5" />

                                    <p className="mt-2 text-[11px] text-slate-400">
                                        كلما اكتملت المعلومات، تمكن الفريق من إعداد استراتيجية أدق لمشروعك.
                                    </p>
                                </div>

                                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                                    <ProjectMeta icon={CalendarDays} label="بداية المشروع" value={project.startDate} />
                                    <ProjectMeta icon={Clock3} label="آخر تحديث" value={project.lastUpdate} />
                                    <ProjectMeta icon={Users} label="مدير المشروع" value={project.manager} />
                                </div>
                            </div>

                            <div className={`bg-slate-950 text-white ${TOKENS.cardPad}`}>
                                <p className={TOKENS.eyebrow}>المرحلة الحالية</p>
                                <h3 className="mt-3 text-2xl font-black">Discovery</h3>

                                <p className="mt-3 text-sm leading-7 text-slate-400">
                                    تم استلام معلومات مشروعك ويقوم فريق SABARAT الآن بتحليل الاحتياج قبل الانتقال إلى
                                    مرحلة الاستراتيجية.
                                </p>

                                <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#5EA8CC]/10 text-[#5EA8CC]">
                                            <Target size={19} />
                                        </div>

                                        <div>
                                            <p className="text-sm font-black">الخطوة التالية</p>
                                            <p className="mt-1 text-xs text-slate-500">إعداد الاستراتيجية</p>
                                        </div>
                                    </div>
                                </div>

                                <Link
                                    to="/client-projects"
                                    className="mt-5 flex items-center justify-center gap-2 rounded-xl bg-white/10 px-4 py-3 text-xs font-black transition hover:bg-white/15"
                                >
                                    فتح المشروع
                                    <ArrowLeft size={15} />
                                </Link>
                            </div>
                        </div>
                    </section>

                    {/* =================================================
                        4. Workspace Stats
                    ================================================= */}

                    <section className={TOKENS.section}>
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                            <DashboardStat
                                icon={FolderOpen}
                                label="المشاريع"
                                value={workspaceStats.projects}
                                description={`${workspaceStats.activeProjects} مشروع نشط`}
                            />
                            <DashboardStat
                                icon={FileText}
                                label="الملفات"
                                value={workspaceStats.files}
                                description="ملفات ومرفقات المشروع"
                            />
                            <DashboardStat
                                icon={CheckCircle2}
                                label="الموافقات"
                                value={workspaceStats.approvals}
                                description="أعمال بانتظار مراجعتك"
                                accent
                            />
                            <DashboardStat
                                icon={MessageCircle}
                                label="الرسائل"
                                value={workspaceStats.messages}
                                description="رسائل تحتاج إلى المتابعة"
                            />
                        </div>
                    </section>

                    {/* =================================================
                        5. Approvals + Meetings
                    ================================================= */}

                    <section className={TOKENS.section}>
                        <div className="grid gap-6 lg:grid-cols-2">
                            <div className={`${TOKENS.card} ${TOKENS.cardPad}`}>
                                <SectionHeading
                                    eyebrow="APPROVALS"
                                    title="الموافقات المطلوبة"
                                    description="راجع الأعمال التالية واعتمدها أو اطلب التعديلات."
                                />

                                <div className="mt-6 space-y-3">
                                    {pendingApprovals.map((approval) => (
                                        <Link
                                            key={approval.title}
                                            to="/client-approvals"
                                            className="group flex items-center gap-3 rounded-2xl border border-slate-100 p-4 transition hover:border-[#5EA8CC]/20 hover:bg-[#F8FCFE]"
                                        >
                                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                                                <PenLine size={18} />
                                            </div>

                                            <div className="min-w-0 flex-1">
                                                <p className="truncate text-sm font-black text-slate-900">
                                                    {approval.title}
                                                </p>
                                                <p className="mt-1 text-[11px] text-slate-400">{approval.type}</p>
                                            </div>

                                            <span className="text-[10px] font-bold text-slate-400">
                                                {approval.date}
                                            </span>

                                            <ChevronLeft
                                                size={16}
                                                className="text-slate-300 group-hover:text-[#5EA8CC]"
                                            />
                                        </Link>
                                    ))}
                                </div>

                                <Link to="/client-approvals" className={`mt-5 ${TOKENS.ctaDark}`}>
                                    عرض جميع الموافقات
                                    <ArrowLeft size={15} />
                                </Link>
                            </div>

                            <div className={`${TOKENS.card} ${TOKENS.cardPad}`}>
                                <SectionHeading
                                    eyebrow="MEETINGS"
                                    title="الاجتماعات القادمة"
                                    description="تابع اجتماعاتك ومواعيد التواصل مع فريق SABARAT."
                                />

                                <div className="mt-6">
                                    {upcomingMeetings.map((meeting) => (
                                        <div
                                            key={meeting.title}
                                            className="rounded-2xl border border-[#5EA8CC]/15 bg-[#F8FCFE] p-5"
                                        >
                                            <div className="flex gap-4">
                                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-[#5EA8CC] shadow-sm">
                                                    <CalendarDays size={21} />
                                                </div>

                                                <div>
                                                    <p className="text-sm font-black text-slate-900">
                                                        {meeting.title}
                                                    </p>
                                                    <p className="mt-2 text-xs font-bold text-slate-500">
                                                        {meeting.date}
                                                    </p>
                                                    <p className="mt-1 text-xs text-slate-400">{meeting.time}</p>

                                                    <span className="mt-3 inline-flex rounded-full bg-white px-3 py-1 text-[10px] font-black text-[#3D7895]">
                                                        {meeting.type}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <Link to="/client-meetings" className={`mt-5 ${TOKENS.ctaOutline}`}>
                                    إدارة الاجتماعات
                                    <ArrowLeft size={15} />
                                </Link>
                            </div>
                        </div>
                    </section>

                    {/* =================================================
                        6. Services
                    ================================================= */}

                    <section className={TOKENS.section}>
                        <div className="mb-5 flex items-end justify-between">
                            <SectionHeading
                                eyebrow="ACTIVE SERVICES"
                                title="خدماتك"
                                description="الخدمات الحالية والمتاحة ضمن مساحة العميل."
                            />

                            <Link
                                to="/client-services"
                                className="hidden items-center gap-2 text-xs font-black text-[#5EA8CC] sm:flex"
                            >
                                استعراض جميع الخدمات
                                <ArrowLeft size={15} />
                            </Link>
                        </div>

                        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                            {services.map((service) => {
                                const Icon = service.icon;

                                return (
                                    <Link
                                        key={service.title}
                                        to="/client-services"
                                        className={`${TOKENS.card} ${TOKENS.cardPadSm} transition hover:-translate-y-1 hover:border-[#5EA8CC]/25`}
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className={TOKENS.iconBox}>
                                                <Icon size={20} />
                                            </div>

                                            <span
                                                className={`rounded-full px-2.5 py-1 text-[9px] font-black ${
                                                    service.status === "نشطة"
                                                        ? "bg-emerald-50 text-emerald-600"
                                                        : service.status === "قيد الإعداد"
                                                        ? "bg-amber-50 text-amber-600"
                                                        : "bg-slate-100 text-slate-500"
                                                }`}
                                            >
                                                {service.status}
                                            </span>
                                        </div>

                                        <p className="mt-5 text-[10px] font-black uppercase tracking-wider text-[#5EA8CC]">
                                            {service.category}
                                        </p>

                                        <h3 className="mt-1 text-sm font-black text-slate-900">{service.title}</h3>

                                        {service.progress > 0 && (
                                            <div className="mt-5">
                                                <div className="mb-2 flex justify-between">
                                                    <span className="text-[10px] font-bold text-slate-400">
                                                        التقدم
                                                    </span>
                                                    <span className="text-[10px] font-black text-[#5EA8CC]">
                                                        {service.progress}%
                                                    </span>
                                                </div>

                                                <ProgressBar value={service.progress} height="h-2" />
                                            </div>
                                        )}
                                    </Link>
                                );
                            })}
                        </div>
                    </section>

                    {/* =================================================
                        7. Requirements
                    ================================================= */}

                    <section className={TOKENS.section}>
                        <div className="mb-5 flex items-end justify-between">
                            <SectionHeading
                                eyebrow="PROJECT DISCOVERY"
                                title="متطلبات المشروع"
                                description="جميع المعلومات التي يحتاجها فريق SABARAT لفهم مشروعك."
                            />

                            <Link
                                to="/client-discovery"
                                className="hidden items-center gap-2 text-xs font-black text-[#5EA8CC] sm:flex"
                            >
                                فتح نموذج المتطلبات
                                <ArrowLeft size={15} />
                            </Link>
                        </div>

                        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                            {requirementSections.map((section) => {
                                const Icon = section.icon;
                                const complete = section.status === "مكتمل";

                                return (
                                    <Link
                                        key={section.title}
                                        to="/client-discovery"
                                        className={`group ${TOKENS.card} ${TOKENS.cardPadSm} transition-all duration-300 hover:-translate-y-1 hover:border-[#5EA8CC]/30 hover:shadow-xl`}
                                    >
                                        <div className="flex items-start justify-between">
                                            <div className={TOKENS.iconBox}>
                                                <Icon size={20} />
                                            </div>

                                            <span
                                                className={`rounded-full px-2 py-1 text-[9px] font-black ${
                                                    complete
                                                        ? "bg-emerald-50 text-emerald-600"
                                                        : "bg-amber-50 text-amber-600"
                                                }`}
                                            >
                                                {section.status}
                                            </span>
                                        </div>

                                        <h3 className="mt-5 text-sm font-black text-slate-900">{section.title}</h3>
                                        <p className="mt-2 text-[11px] leading-5 text-slate-500">
                                            {section.description}
                                        </p>

                                        <div className="mt-4">
                                            <div className="mb-2 flex items-center justify-between">
                                                <span className="text-[9px] font-bold text-slate-400">
                                                    اكتمال القسم
                                                </span>
                                                <span className="text-[9px] font-black text-[#5EA8CC]">
                                                    {section.progress}%
                                                </span>
                                            </div>

                                            <ProgressBar value={section.progress} height="h-1.5" />
                                        </div>

                                        <div className="mt-4 flex items-center justify-between">
                                            <span className="text-[10px] font-bold text-slate-400">
                                                {section.items.length} عناصر
                                            </span>

                                            <ArrowLeft
                                                size={15}
                                                className="text-slate-300 transition group-hover:text-[#5EA8CC]"
                                            />
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    </section>

                    {/* =================================================
                        8. Files + Communication
                    ================================================= */}

                    <section className={TOKENS.section}>
                        <div className="grid gap-6 lg:grid-cols-2">
                            <div className={`${TOKENS.card} ${TOKENS.cardPad}`}>
                                <div className="flex items-start justify-between">
                                    <SectionHeading
                                        eyebrow="RECENT FILES"
                                        title="آخر الملفات"
                                        description="أحدث الملفات المضافة إلى مساحة مشروعك."
                                    />

                                    <Link to="/client-files" className="text-xs font-black text-[#5EA8CC]">
                                        عرض الكل
                                    </Link>
                                </div>

                                <div className="mt-6 space-y-3">
                                    {recentFiles.map((file) => (
                                        <div
                                            key={file.name}
                                            className="flex items-center gap-3 rounded-xl border border-slate-100 p-3 hover:bg-slate-50"
                                        >
                                            <div className={TOKENS.iconBoxSm}>
                                                <FileText size={18} />
                                            </div>

                                            <div className="min-w-0 flex-1">
                                                <p className="truncate text-xs font-black text-slate-800">
                                                    {file.name}
                                                </p>
                                                <p className="mt-1 text-[10px] text-slate-400">
                                                    {file.type} • {file.size} • {file.date}
                                                </p>
                                            </div>

                                            <button
                                                type="button"
                                                className="rounded-lg p-2 text-slate-300 hover:bg-slate-100 hover:text-slate-600"
                                            >
                                                <MoreHorizontal size={17} />
                                            </button>
                                        </div>
                                    ))}
                                </div>

                                <Link
                                    to="/client-files"
                                    className="mt-5 flex items-center justify-center gap-2 rounded-xl border border-dashed border-[#5EA8CC]/30 bg-[#F8FCFE] px-4 py-3 text-xs font-black text-[#3D7895]"
                                >
                                    <Upload size={15} />
                                    رفع ملف جديد
                                </Link>
                            </div>

                            <div className={`${TOKENS.card} ${TOKENS.cardPad}`}>
                                <SectionHeading
                                    eyebrow="COMMUNICATION"
                                    title="التواصل مع الفريق"
                                    description="تواصل مباشرة مع فريق SABARAT المسؤول عن مشروعك."
                                />

                                <div className="mt-6 rounded-2xl bg-slate-950 p-6 text-white">
                                    <div className="flex items-center gap-4">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#5EA8CC]/10 text-[#8ED4F5]">
                                            <MessageCircle size={22} />
                                        </div>

                                        <div>
                                            <p className="text-sm font-black">SABARAT Project Team</p>
                                            <p className="mt-1 text-[11px] text-slate-400">
                                                فريق المشروع متاح لمتابعة طلباتك.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="mt-6 flex items-center gap-2 text-[11px] font-bold text-emerald-400">
                                        <span className="h-2 w-2 rounded-full bg-emerald-400" />
                                        الفريق متاح
                                    </div>

                                    <Link
                                        to="/client-messages"
                                        className="mt-5 flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-xs font-black text-slate-950 transition hover:bg-[#EAF6FC]"
                                    >
                                        <Send size={15} />
                                        فتح المحادثة
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* =================================================
                        9. Timeline + Finance
                    ================================================= */}

                    <section className={TOKENS.section}>
                        <div className="grid gap-6 lg:grid-cols-3">
                            <div className={`${TOKENS.card} ${TOKENS.cardPad} lg:col-span-2`}>
                                <SectionHeading
                                    eyebrow="PROJECT TIMELINE"
                                    title="مراحل تنفيذ المشروع"
                                    description="تابع مشروعك خطوة بخطوة حتى التسليم النهائي."
                                />

                                <div className="mt-8 space-y-1">
                                    {activities.map((activity, index) => {
                                        const Icon = activity.icon;

                                        return (
                                            <div
                                                key={activity.title}
                                                className="relative flex gap-4 rounded-2xl p-4 transition hover:bg-slate-50"
                                            >
                                                {index < activities.length - 1 && (
                                                    <div className="absolute right-[31px] top-16 h-[calc(100%-30px)] w-px bg-slate-100" />
                                                )}

                                                <div
                                                    className={`relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
                                                        activity.completed
                                                            ? "bg-[#5EA8CC] text-white"
                                                            : "border border-slate-200 bg-white text-slate-400"
                                                    }`}
                                                >
                                                    <Icon size={18} />
                                                </div>

                                                <div className="flex-1 pt-1">
                                                    <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                                                        <p className="text-sm font-black text-slate-900">
                                                            {activity.title}
                                                        </p>
                                                        <span className="text-[11px] font-bold text-[#5EA8CC]">
                                                            {activity.date}
                                                        </span>
                                                    </div>

                                                    <p className="mt-1 text-xs leading-6 text-slate-500">
                                                        {activity.description}
                                                    </p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            <div className={`${TOKENS.card} ${TOKENS.cardPad}`}>
                                <SectionHeading
                                    eyebrow="FINANCE"
                                    title="المالية"
                                    description="ملخص سريع للحالة المالية لحسابك."
                                />

                                <div className="mt-6 space-y-3">
                                    <FinanceRow icon={FileText} label="العروض" value="0" to="/client-proposals" />
                                    <FinanceRow icon={FileCheck2} label="العقود" value="1" to="/client-contracts" />
                                    <FinanceRow
                                        icon={Receipt}
                                        label="الفواتير"
                                        value={workspaceStats.invoices}
                                        to="/client-invoices"
                                    />
                                    <FinanceRow
                                        icon={CreditCard}
                                        label="المبلغ المستحق"
                                        value={workspaceStats.pendingAmount}
                                        to="/client-payments"
                                    />
                                </div>

                                <Link to="/client-invoices" className={`mt-5 ${TOKENS.ctaDark}`}>
                                    فتح الإدارة المالية
                                    <ArrowLeft size={15} />
                                </Link>
                            </div>
                        </div>
                    </section>

                    {/* =================================================
                        10. Performance Overview
                    ================================================= */}

                    <section className={TOKENS.section}>
                        <SectionHeading
                            eyebrow="PERFORMANCE"
                            title="نظرة عامة على الخدمات"
                            description="مؤشرات مختصرة تساعدك على متابعة أداء خدمات SABARAT."
                        />

                        <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                            <PerformanceCard icon={TrendingUp} title="الحملات" value="0" label="حملات نشطة" />
                            <PerformanceCard icon={Sparkles} title="المحتوى" value="0" label="محتويات قيد التنفيذ" />
                            <PerformanceCard icon={Globe2} title="المواقع" value="0" label="مشاريع مواقع" />
                            <PerformanceCard icon={Code2} title="الأنظمة" value="0" label="أنظمة قيد التطوير" />
                        </div>
                    </section>

                    {/* =================================================
                        11. Security
                    ================================================= */}

                    <section className={`${TOKENS.card} bg-slate-950 p-6 text-white sm:p-8`}>
                        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                            <div className="flex items-start gap-4">
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#5EA8CC]/10 text-[#5EA8CC]">
                                    <ShieldCheck size={23} />
                                </div>

                                <div>
                                    <h2 className="text-xl font-black">مساحة عميل آمنة</h2>
                                    <p className="mt-2 max-w-3xl text-sm leading-7 text-slate-400">
                                        معلومات مشروعك وملفاتك ومحادثاتك وإجراءات الموافقة ستكون ضمن مساحة العميل
                                        الخاصة بك.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 text-xs font-bold text-[#8ED4F5]">
                                <CheckCircle2 size={15} />
                                Client workspace protected
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </main>
    );
}

// =====================================================
// Progress Bar
// =====================================================

function ProgressBar({ value, height = "h-3" }) {
    return (
        <div className={`${height} overflow-hidden rounded-full bg-slate-100`}>
            <div
                className="h-full rounded-full bg-gradient-to-r from-[#5EA8CC] to-[#8ED4F5]"
                style={{ width: `${value}%` }}
            />
        </div>
    );
}

// =====================================================
// Section Heading
// =====================================================

function SectionHeading({ eyebrow, title, description }) {
    return (
        <div>
            <p className={TOKENS.eyebrow}>{eyebrow}</p>
            <h2 className="mt-2 text-xl font-black text-slate-950">{title}</h2>

            {description && (
                <p className="mt-2 text-xs leading-6 text-slate-500">{description}</p>
            )}
        </div>
    );
}

// =====================================================
// Project Meta
// =====================================================

function ProjectMeta({ icon: Icon, label, value }) {
    return (
        <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
            <div className="flex items-center gap-2 text-[#5EA8CC]">
                <Icon size={15} />
                <span className="text-[10px] font-black text-slate-400">{label}</span>
            </div>

            <p className="mt-2 text-xs font-black text-slate-700">{value}</p>
        </div>
    );
}

// =====================================================
// Dashboard Stat
// =====================================================

function DashboardStat({ icon: Icon, label, value, description, accent }) {
    return (
        <section
            className={`group ${TOKENS.card} p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#5EA8CC]/20 ${
                accent ? "ring-1 ring-[#5EA8CC]/15" : ""
            }`}
        >
            <div className="flex items-center justify-between">
                <div className={TOKENS.iconBox}>
                    <Icon size={20} />
                </div>

                <MoreHorizontal size={18} className="text-slate-300" />
            </div>

            <p className="mt-5 text-3xl font-black text-slate-950">{value}</p>
            <p className="mt-1 text-sm font-black text-slate-700">{label}</p>
            <p className="mt-2 text-[11px] text-slate-400">{description}</p>
        </section>
    );
}

// =====================================================
// Finance Row
// =====================================================

function FinanceRow({ icon: Icon, label, value, to }) {
    return (
        <Link
            to={to}
            className="flex items-center gap-3 rounded-xl border border-slate-100 p-3 transition hover:bg-slate-50"
        >
            <div className={TOKENS.iconBoxSm}>
                <Icon size={17} />
            </div>

            <span className="flex-1 text-xs font-bold text-slate-600">{label}</span>
            <span className="text-xs font-black text-slate-900">{value}</span>
            <ChevronLeft size={15} className="text-slate-300" />
        </Link>
    );
}

// =====================================================
// Performance Card
// =====================================================

function PerformanceCard({ icon: Icon, title, value, label }) {
    return (
        <section className={`${TOKENS.card} p-5`}>
            <div className={TOKENS.iconBox}>
                <Icon size={20} />
            </div>

            <p className="mt-5 text-xs font-black text-slate-400">{title}</p>
            <p className="mt-1 text-2xl font-black text-slate-950">{value}</p>
            <p className="mt-1 text-[10px] font-bold text-slate-400">{label}</p>
        </section>
    );
}

// =====================================================
// Building Icon
// =====================================================

function BuildingIcon({ size = 20 }) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <path d="M9 21V9h6v12" />
            <path d="M7 7h.01" />
            <path d="M17 7h.01" />
            <path d="M7 11h.01" />
            <path d="M17 11h.01" />
        </svg>
    );
}

export default ClientDashboardPage;