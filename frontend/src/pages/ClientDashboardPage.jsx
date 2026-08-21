import { useEffect, useMemo, useState } from "react";
import {
    Activity,
    Bell,
    CalendarDays,
    Check,
    CheckCircle2,
    ChevronLeft,
    ChevronRight,
    ClipboardCheck,
    Clock3,
    CreditCard,
    Download,
    FileCheck2,
    FileText,
    FolderOpen,
    Headphones,
    LayoutDashboard,
    LogOut,
    Menu,
    MessageCircle,
    Paperclip,
    Plus,
    Receipt,
    RefreshCw,
    Send,
    Settings,
    ShieldCheck,
    Sparkles,
    User,
    Users,
    WalletCards,
    X,
    Landmark,
    Smartphone,
    Copy,
    ExternalLink,
    AlertCircle,
    CircleDollarSign,
    CircleCheck,
    CircleX,
    Upload,
    Eye,
} from "lucide-react";

// =====================================================
// 01. Client Portal Settings
// =====================================================

const DISCOVERY_KEY = "sabarat_client_discovery_form";
const PROJECT_KEY = "sabarat_client_project_state";
const PAYMENT_KEY = "sabarat_client_payment_state";

const COLORS = {
    primary: "#87BCD8",
    primaryDark: "#5EA8CC",
    primaryLight: "#EAF6FC",
    white: "#FFFFFF",
    background: "#F8FAFC",
    text: "#0F172A",
    textLight: "#64748B",
    border: "#E2E8F0",
    success: "#22C55E",
    warning: "#F59E0B",
    danger: "#EF4444",
};

// =====================================================
// 02. Project Statuses
// =====================================================

const STATUS = {
    approval: "بانتظار اعتماد الشركة",
    payment: "بانتظار الدفع",
    paymentReview: "بانتظار مراجعة الدفع",
    ready: "جاهز للبدء",
    planning: "مرحلة التخطيط",
    progress: "قيد التنفيذ",
    review: "مراجعة داخلية",
    clientApproval: "بانتظار موافقة العميل",
    revision: "بحاجة إلى تعديل",
    delivered: "تم التسليم",
    completed: "مكتمل",
};

// =====================================================
// 03. Sidebar Navigation
// =====================================================

const NAV = [
    ["overview", "نظرة عامة", LayoutDashboard],
    ["progress", "تقدم المشروع", Activity],
    ["services", "الخدمات المطلوبة", Sparkles],
    ["tasks", "المهام والتسليمات", ClipboardCheck],
    ["approvals", "الموافقات", FileCheck2],
    ["files", "الملفات والمستندات", FolderOpen],
    ["notifications", "الإشعارات", Bell],
    ["messages", "الرسائل", MessageCircle],
    ["meetings", "الاجتماعات", CalendarDays],
    ["invoices", "الفواتير والدفع", WalletCards],
    ["payment", "طرق الدفع", CreditCard],
    ["requests", "الطلبات الإضافية", Plus],
    ["support", "الدعم الفني", Headphones],
    ["company", "بيانات الشركة", Users],
];

// =====================================================
// 04. Read / Write Helpers
// =====================================================

function read(key, fallback = null) {
    try {
        const raw = localStorage.getItem(key);
        return raw ? JSON.parse(raw) : fallback;
    } catch {
        return fallback;
    }
}

function write(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch {
        // Will be replaced with Laravel API later
    }
}

// =====================================================
// 05. Discovery Data
// =====================================================

function discoveryData() {
    const d = read(DISCOVERY_KEY, {});
    return {
        companyName: d.companyName || "عميل SABARAT",
        contactName: d.contactName || "مسؤول التواصل",
        jobTitle: d.jobTitle || "",
        phone: d.phone || "",
        email: d.email || "",
        website: d.website || "",
        city: d.city || "",
        meetingDate: d.meetingDate || "",
        accountManager: d.accountManager || "",
        businessField: d.businessField || "غير محدد",
        yearsInBusiness: d.yearsInBusiness || "",
        productsServices: d.productsServices || "",
        competitors: Array.isArray(d.competitors) ? d.competitors : [],
        competitiveAdvantage: d.competitiveAdvantage || "",
        brandStatus: Array.isArray(d.brandStatus) ? d.brandStatus : [],
        marketingGoals: Array.isArray(d.marketingGoals) ? d.marketingGoals : [],
        challenges: Array.isArray(d.challenges) ? d.challenges : [],
        services: Array.isArray(d.services) ? d.services : [],
        audience: d.audience || {},
        budget: d.budget || {},
        expectations: d.expectations || "",
        additional: d.additional || {},
        social: d.social || {},
        privacyAccepted: Boolean(d.privacyAccepted),
    };
}

// =====================================================
// 06. Build Services from Discovery
// =====================================================

function buildServices(discovery) {
    const selected = Array.isArray(discovery.services) && discovery.services.length ? discovery.services : [];
    return selected.map((name, index) => ({
        id: `service-${index}-${Date.now()}`,
        name,
        status: "بانتظار اعتماد المشروع",
        progress: 0,
        owner: "سيتم التعيين بعد الاعتماد",
        updatedAt: "لم يبدأ",
        description: `الخدمة "${name}" ضمن نطاق احتياجك الحالي.`,
    }));
}

// =====================================================
// 07. Initial Project State
// =====================================================

function initialProject(discovery) {
    return {
        id: `project-${Date.now()}`,
        companyApproved: false,
        paymentCompleted: false,
        paymentUnderReview: false,
        projectCreated: false,
        status: STATUS.approval,
        currentStage: "اعتماد المشروع",
        nextStage: "اعتماد المشروع من إدارة SABARAT",
        expectedDate: "سيتم تحديده بعد اعتماد المشروع والدفع",
        progress: 0,
        completedTasks: 0,
        services: buildServices(discovery),
        tasks: [],
        approvals: [],
        files: [],
        notifications: [
            {
                id: `notification-${Date.now()}`,
                type: "project",
                title: "تم استلام نموذج الاحتياج",
                text: "تم استلام بيانات مشروعك بنجاح. سيقوم فريق SABARAT بمراجعة الطلب قبل بدء أي مرحلة تنفيذ.",
                time: "الآن",
                read: false,
            },
        ],
        messages: [],
        meetings: [],
        invoices: [],
        requests: [],
        tickets: [],
        timeline: [
            { id: "submitted", title: "تم إرسال نموذج الاحتياج", status: "completed", date: new Date().toISOString() },
            { id: "company-approval", title: "اعتماد المشروع من الشركة", status: "current", date: null },
            { id: "payment", title: "إتمام الدفع", status: "locked", date: null },
            { id: "planning", title: "التخطيط", status: "locked", date: null },
            { id: "execution", title: "التنفيذ", status: "locked", date: null },
            { id: "approval", title: "موافقة العميل", status: "locked", date: null },
            { id: "delivery", title: "التسليم النهائي", status: "locked", date: null },
        ],
    };
}

// =====================================================
// 08. Initial Payment State
// =====================================================

function initialPayment(discovery) {
    const currency = discovery.budget?.currency || "USD";
    return {
        selectedMethod: "",
        transactionNumber: "",
        proofFile: null,
        proofFileName: "",
        notes: "",
        submitted: false,
        reviewed: false,
        approved: false,
        status: "غير متاح",
        amount: 0,
        currency,
        submittedAt: null,
        reviewedAt: null,
    };
}

// =====================================================
// 09. Get Project
// =====================================================

function getProject(discovery) {
    const saved = read(PROJECT_KEY, null);
    if (!saved) return initialProject(discovery);

    const base = initialProject(discovery);
    return {
        ...base,
        ...saved,
        services: Array.isArray(saved.services) ? saved.services : base.services,
        tasks: Array.isArray(saved.tasks) ? saved.tasks : [],
        approvals: Array.isArray(saved.approvals) ? saved.approvals : [],
        files: Array.isArray(saved.files) ? saved.files : [],
        notifications: Array.isArray(saved.notifications) ? saved.notifications : base.notifications,
        messages: Array.isArray(saved.messages) ? saved.messages : [],
        meetings: Array.isArray(saved.meetings) ? saved.meetings : [],
        invoices: Array.isArray(saved.invoices) ? saved.invoices : [],
        requests: Array.isArray(saved.requests) ? saved.requests : [],
        tickets: Array.isArray(saved.tickets) ? saved.tickets : [],
        timeline: Array.isArray(saved.timeline) ? saved.timeline : base.timeline,
    };
}

// =====================================================
// 10. Calculate Project State
// =====================================================

function calculate(project) {
    if (!project.companyApproved) {
        return {
            progress: 0,
            status: STATUS.approval,
            currentStage: "اعتماد المشروع",
            nextStage: "اعتماد المشروع من إدارة SABARAT",
            expectedDate: "سيتم تحديده بعد الاعتماد",
        };
    }

    if (project.companyApproved && !project.paymentCompleted) {
        return {
            progress: 0,
            status: project.paymentUnderReview ? STATUS.paymentReview : STATUS.payment,
            currentStage: project.paymentUnderReview ? "مراجعة الدفع" : "بانتظار الدفع",
            nextStage: project.paymentUnderReview ? "تأكيد الدفع من الإدارة" : "إتمام الدفع",
            expectedDate: "سيتم تحديد الموعد بعد تأكيد الدفع",
        };
    }

    if (project.paymentCompleted && !project.projectCreated) {
        return {
            progress: 0,
            status: STATUS.ready,
            currentStage: "جاهز للبدء",
            nextStage: "التخطيط",
            expectedDate: project.expectedDate || "قريبًا",
        };
    }

    const tasks = Array.isArray(project.tasks) ? project.tasks : [];
    const completed = tasks.filter(task => task.status === "منجز").length;
    const progress = tasks.length
        ? Math.round((completed / tasks.length) * 100)
        : Number(project.progress || 0);

    return {
        progress: Math.max(0, Math.min(100, progress)),
        status: project.status || STATUS.progress,
        currentStage: project.currentStage || STATUS.progress,
        nextStage: project.nextStage || "المراجعة",
        expectedDate: project.expectedDate || "قيد التحديد",
    };
}

// =====================================================
// 11. Main ClientDashboardPage
// =====================================================

export default function ClientDashboardPage() {
    const discovery = useMemo(() => discoveryData(), []);
    const [section, setSection] = useState("overview");
    const [mobileSidebar, setMobileSidebar] = useState(false);
    const [project, setProject] = useState(() => getProject(discovery));
    const [payment, setPayment] = useState(() => read(PAYMENT_KEY, initialPayment(discovery)));

    useEffect(() => { write(PROJECT_KEY, project); }, [project]);
    useEffect(() => { write(PAYMENT_KEY, payment); }, [payment]);

    const state = calculate(project);
    const unread = project.notifications.filter(item => !item.read).length;
    const pendingApprovals = project.approvals.filter(item => item.status === "بانتظار الموافقة").length;

    const selectSection = id => { setSection(id); setMobileSidebar(false); };

    const addNotification = (title, text, type = "project") => {
        setProject(prev => ({
            ...prev,
            notifications: [
                { id: `notification-${Date.now()}-${Math.random()}`, type, title, text, time: "الآن", read: false },
                ...(prev.notifications || []),
            ],
        }));
    };

    const approveProject = () => {
        setProject(prev => ({
            ...prev,
            companyApproved: true,
            paymentCompleted: false,
            paymentUnderReview: false,
            projectCreated: false,
            status: STATUS.payment,
            currentStage: "بانتظار الدفع",
            nextStage: "إتمام الدفع",
            timeline: prev.timeline.map(item =>
                item.id === "company-approval"
                    ? { ...item, status: "completed", date: new Date().toISOString() }
                    : item.id === "payment"
                        ? { ...item, status: "current" }
                        : item
            ),
        }));
        addNotification("تم اعتماد مشروعك", "تم اعتماد طلبك من إدارة SABARAT. يمكنك الآن الانتقال إلى قسم الدفع لإكمال الإجراءات وبدء المشروع.", "approval");
        setSection("overview");
    };

    const submitPayment = () => {
        if (!project.companyApproved) return;
        if (!payment.selectedMethod) { alert("يرجى اختيار طريقة الدفع أولًا."); return; }
        if (!payment.amount || Number(payment.amount) <= 0) { alert("يرجى إدخال مبلغ الدفع."); return; }

        setPayment(prev => ({
            ...prev,
            submitted: true,
            reviewed: false,
            approved: false,
            status: "بانتظار مراجعة الإدارة",
            submittedAt: new Date().toISOString(),
        }));
        setProject(prev => ({
            ...prev,
            paymentUnderReview: true,
            paymentCompleted: false,
            status: STATUS.paymentReview,
            currentStage: "مراجعة الدفع",
            nextStage: "تأكيد الدفع من الإدارة",
        }));
        addNotification("تم إرسال إثبات الدفع", "تم إرسال بيانات عملية الدفع بنجاح، وسيقوم الفريق المالي بمراجعتها.", "payment");
    };

    const confirmPayment = () => {
        if (!project.companyApproved) return;
        setPayment(prev => ({ ...prev, submitted: true, reviewed: true, approved: true, status: "تم تأكيد الدفع", reviewedAt: new Date().toISOString() }));
        setProject(prev => ({
            ...prev,
            paymentUnderReview: false,
            paymentCompleted: true,
            projectCreated: true,
            status: STATUS.planning,
            currentStage: "التخطيط",
            nextStage: "بدء التنفيذ",
            timeline: prev.timeline.map(item => {
                if (item.id === "payment") return { ...item, status: "completed", date: new Date().toISOString() };
                if (item.id === "planning") return { ...item, status: "current" };
                return item;
            }),
            notifications: [
                { id: `notification-${Date.now()}`, type: "payment", title: "تم تأكيد الدفع", text: "تم تأكيد عملية الدفع. أصبح مشروعك جاهزًا للانتقال إلى التخطيط والتنفيذ.", time: "الآن", read: false },
                ...prev.notifications,
            ],
        }));
        setSection("overview");
    };

    const sendMessage = text => {
        if (!text || !text.trim()) return;
        const message = {
            id: `message-${Date.now()}`,
            sender: "client",
            text: text.trim(),
            time: new Date().toLocaleString("ar-YE"),
            status: "تم الإرسال",
        };
        setProject(prev => ({ ...prev, messages: [...prev.messages, message] }));
        addNotification("رسالة جديدة للفريق", "تم إرسال رسالتك إلى فريق SABARAT.", "message");
    };

    const handleApproval = (id, status, note) => {
        setProject(prev => ({
            ...prev,
            approvals: prev.approvals.map(item =>
                item.id === id
                    ? { ...item, status, clientNote: note, updatedAt: new Date().toLocaleString("ar-YE") }
                    : item
            ),
            notifications: [
                {
                    id: `notification-${Date.now()}`,
                    type: "approval",
                    title: status === "تمت الموافقة" ? "تم اعتماد التسليم" : "تم طلب تعديل",
                    text: status === "تمت الموافقة" ? "تم إرسال موافقتك إلى فريق SABARAT." : "تم إرسال ملاحظات التعديل إلى الفريق.",
                    time: "الآن",
                    read: false,
                },
                ...prev.notifications,
            ],
        }));
    };

    const markNotificationsRead = () => {
        setProject(prev => ({ ...prev, notifications: prev.notifications.map(item => ({ ...item, read: true })) }));
    };

    return (
        <div dir="rtl" className="min-h-screen bg-[#F8FAFC] text-[#0F172A]">
            <Header
                discovery={discovery}
                status={state.status}
                unread={unread}
                onMenu={() => setMobileSidebar(true)}
                onNotifications={() => selectSection("notifications")}
            />

            <div className="flex min-h-[calc(100vh-5rem)]">
                <Sidebar
                    open={mobileSidebar}
                    onClose={() => setMobileSidebar(false)}
                    section={section}
                    select={selectSection}
                    discovery={discovery}
                    unread={unread}
                    pending={pendingApprovals}
                    status={state.status}
                />

                {mobileSidebar && (
                    <button
                        type="button"
                        onClick={() => setMobileSidebar(false)}
                        className="fixed inset-0 z-40 bg-slate-950/40 backdrop-blur-sm lg:hidden"
                        aria-label="إغلاق القائمة"
                    />
                )}

                <main className="min-w-0 flex-1">
                    <div className="mx-auto max-w-[1500px] p-4 sm:p-6 lg:p-8">
                        {section === "overview" && (
                            <Overview discovery={discovery} project={project} state={state} pending={pendingApprovals} select={selectSection} />
                        )}
                        {section === "progress" && <Progress project={project} state={state} discovery={discovery} />}
                        {section === "services" && <Services services={project.services} />}
                        {section === "tasks" && <Tasks tasks={project.tasks} />}
                        {section === "approvals" && <Approvals approvals={project.approvals} onApproval={handleApproval} />}
                        {section === "files" && <Files files={project.files} />}
                        {section === "notifications" && <Notifications notifications={project.notifications} markRead={markNotificationsRead} />}
                        {section === "messages" && <Messages messages={project.messages} send={sendMessage} />}
                        {section === "meetings" && <Meetings meetings={project.meetings} />}
                        {section === "invoices" && <Payments project={project} discovery={discovery} selectPayment={() => selectSection("payment")} />}
                        {section === "payment" && (
                            <PaymentMethods
                                project={project}
                                discovery={discovery}
                                payment={payment}
                                setPayment={setPayment}
                                submitPayment={submitPayment}
                                confirmPayment={confirmPayment}
                            />
                        )}
                        {section === "requests" && <Requests project={project} setProject={setProject} />}
                        {section === "support" && <Support project={project} setProject={setProject} />}
                        {section === "company" && <Company discovery={discovery} />}
                    </div>
                </main>
            </div>
        </div>
    );
}

// =====================================================
// 15. Header
// =====================================================

function Header({ discovery, status, unread, onMenu, onNotifications }) {
    const initials = (discovery.companyName || "S").trim().charAt(0).toUpperCase();

    return (
        <header className="sticky top-0 z-30 border-b border-[#E2E8F0] bg-white/95 backdrop-blur-xl">
            <div className="flex h-20 items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
                <div className="flex min-w-0 items-center gap-3">
                    <button
                        type="button"
                        onClick={onMenu}
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#E2E8F0] bg-white text-[#0F172A] transition-all duration-300 hover:border-[#87BCD8] hover:bg-[#EAF6FC] lg:hidden"
                        aria-label="فتح القائمة"
                    >
                        <Menu size={21} />
                    </button>
                    <div className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#0F172A] text-white shadow-lg shadow-slate-900/10 sm:flex">
                        <Sparkles size={20} />
                    </div>
                    <div className="min-w-0">
                        <p className="truncate text-sm font-black text-[#0F172A] sm:text-base">بوابة عميل SABARAT</p>
                        <p className="hidden truncate text-xs font-medium text-[#64748B] sm:block">متابعة مشروعك وخدماتك من مكان واحد</p>
                    </div>
                </div>

                <div className="hidden min-w-0 items-center gap-3 md:flex">
                    <div className="max-w-[220px] text-right">
                        <p className="truncate text-sm font-black text-[#0F172A]">{discovery.companyName}</p>
                        <p className="truncate text-xs text-[#64748B]">{discovery.contactName}</p>
                    </div>
                    <StatusBadge status={status} />
                </div>

                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        onClick={onNotifications}
                        className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-[#E2E8F0] bg-white text-[#64748B] transition-all duration-300 hover:border-[#87BCD8] hover:bg-[#EAF6FC] hover:text-[#5EA8CC]"
                        aria-label="الإشعارات"
                    >
                        <Bell size={19} />
                        {unread > 0 && (
                            <span className="absolute -right-1 -top-1 flex min-h-5 min-w-5 items-center justify-center rounded-full bg-[#EF4444] px-1 text-[10px] font-black text-white shadow-lg">
                                {unread > 9 ? "9+" : unread}
                            </span>
                        )}
                    </button>
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EAF6FC] text-[#5EA8CC] ring-1 ring-[#87BCD8]/30">
                        <span className="text-sm font-black">{initials}</span>
                    </div>
                </div>
            </div>
        </header>
    );
}

// =====================================================
// 16. Status Badge
// =====================================================

function StatusBadge({ status }) {
    const config = {
        [STATUS.approval]: { icon: Clock3, className: "bg-amber-50 text-amber-700 border-amber-200" },
        [STATUS.payment]: { icon: CreditCard, className: "bg-blue-50 text-blue-700 border-blue-200" },
        [STATUS.paymentReview]: { icon: RefreshCw, className: "bg-violet-50 text-violet-700 border-violet-200" },
        [STATUS.ready]: { icon: CheckCircle2, className: "bg-emerald-50 text-emerald-700 border-emerald-200" },
        [STATUS.planning]: { icon: ClipboardCheck, className: "bg-sky-50 text-sky-700 border-sky-200" },
        [STATUS.progress]: { icon: Activity, className: "bg-sky-50 text-sky-700 border-sky-200" },
        [STATUS.review]: { icon: Eye, className: "bg-purple-50 text-purple-700 border-purple-200" },
        [STATUS.clientApproval]: { icon: FileCheck2, className: "bg-amber-50 text-amber-700 border-amber-200" },
        [STATUS.revision]: { icon: RefreshCw, className: "bg-orange-50 text-orange-700 border-orange-200" },
        [STATUS.delivered]: { icon: CheckCircle2, className: "bg-emerald-50 text-emerald-700 border-emerald-200" },
        [STATUS.completed]: { icon: CheckCircle2, className: "bg-emerald-50 text-emerald-700 border-emerald-200" },
    };

    const item = config[status] || { icon: Clock3, className: "bg-slate-50 text-slate-600 border-slate-200" };
    const Icon = item.icon;

    return (
        <span className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-black ${item.className}`}>
            <Icon size={14} /> {status}
        </span>
    );
}

// =====================================================
// 17. Sidebar
// =====================================================

function Sidebar({ open, onClose, section, select, discovery, unread, pending, status }) {
    return (
        <aside
            className={`
        fixed inset-y-0 right-0 z-50 w-[290px] border-l border-[#E2E8F0] bg-white shadow-2xl shadow-slate-950/10
        transition-transform duration-300
        lg:sticky lg:top-20 lg:z-20 lg:block lg:h-[calc(100vh-5rem)] lg:translate-x-0 lg:shadow-none
        ${open ? "translate-x-0" : "translate-x-full"}
      `}
        >
            <div className="flex h-full flex-col">
                <div className="flex items-center justify-between border-b border-[#E2E8F0] px-5 py-5">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0F172A] text-white">
                            <LayoutDashboard size={18} />
                        </div>
                        <div>
                            <p className="text-sm font-black text-[#0F172A]">لوحة العميل</p>
                            <p className="mt-0.5 text-[11px] font-medium text-[#64748B]">إدارة المشروع</p>
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="flex h-9 w-9 items-center justify-center rounded-lg text-[#64748B] hover:bg-slate-100 lg:hidden"
                        aria-label="إغلاق القائمة"
                    >
                        <X size={18} />
                    </button>
                </div>

                <div className="mx-4 mt-5 rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-4">
                    <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#EAF6FC] font-black text-[#5EA8CC]">
                            {(discovery.companyName || "S").charAt(0).toUpperCase()}
                        </div>
                        <div className="min-w-0">
                            <p className="truncate text-sm font-black text-[#0F172A]">{discovery.companyName}</p>
                            <p className="mt-1 truncate text-xs text-[#64748B]">{discovery.contactName}</p>
                        </div>
                    </div>
                    <div className="mt-3"><StatusBadge status={status} /></div>
                </div>

                <nav className="flex-1 overflow-y-auto px-3 py-5">
                    <p className="px-3 pb-3 text-[10px] font-black uppercase tracking-[0.18em] text-[#94A3B8]">أقسام المشروع</p>
                    <div className="space-y-1">
                        {NAV.map(([id, label, Icon]) => {
                            const active = section === id;
                            const badge = id === "notifications" ? unread : id === "approvals" ? pending : 0;
                            return (
                                <button
                                    key={id}
                                    type="button"
                                    onClick={() => select(id)}
                                    className={`
                    group relative flex w-full items-center gap-3 rounded-xl px-3.5 py-3 text-right transition-all duration-300
                    ${active ? "bg-[#EAF6FC] text-[#3D7895] shadow-sm" : "text-[#64748B] hover:bg-slate-50 hover:text-[#0F172A]"}
                  `}
                                >
                                    {active && <span className="absolute right-0 top-1/2 h-7 w-1 -translate-y-1/2 rounded-l-full bg-[#5EA8CC]" />}
                                    <span className={`
                    flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-all duration-300
                    ${active ? "bg-white text-[#5EA8CC] shadow-sm" : "bg-slate-50 text-[#64748B] group-hover:bg-white"}
                  `}>
                                        <Icon size={17} />
                                    </span>
                                    <span className="min-w-0 flex-1 text-sm font-bold">{label}</span>
                                    {badge > 0 && (
                                        <span className="flex min-h-5 min-w-5 items-center justify-center rounded-full bg-[#EF4444] px-1 text-[10px] font-black text-white">
                                            {badge > 9 ? "9+" : badge}
                                        </span>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </nav>

                <div className="border-t border-[#E2E8F0] p-4">
                    <div className="rounded-2xl border border-[#EAF6FC] bg-[#EAF6FC] p-4">
                        <div className="flex items-start gap-3">
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-[#5EA8CC]">
                                <ShieldCheck size={18} />
                            </div>
                            <div>
                                <p className="text-xs font-black text-[#3D7895]">بياناتك محمية</p>
                                <p className="mt-1 text-[11px] leading-5 text-[#64748B]">يتم التعامل مع بيانات مشروعك بسرية وأمان.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    );
}

// =====================================================
// 18. Overview
// =====================================================

function Overview({ discovery, project, state, pending, select }) {
    const completedTasks = project.tasks.filter(task => task.status === "منجز").length;
    const activeTasks = project.tasks.filter(task => task.status === "قيد التنفيذ").length;
    const waitingTasks = project.tasks.filter(task => task.status === "بانتظار العميل").length;

    return (
        <div className="space-y-6 animate-[dashboardIn_0.45s_ease-out]">
            <section className="relative overflow-hidden rounded-[2rem] border border-[#E2E8F0] bg-white p-6 shadow-sm sm:p-8">
                <div className="pointer-events-none absolute -left-20 -top-24 h-64 w-64 rounded-full bg-[#EAF6FC] blur-3xl" />
                <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                        <div className="inline-flex items-center gap-2 rounded-full bg-[#EAF6FC] px-3 py-1.5 text-xs font-black text-[#5EA8CC]">
                            <Sparkles size={14} /> بوابة مشروعك
                        </div>
                        <h1 className="mt-4 text-3xl font-black tracking-tight text-[#0F172A] sm:text-4xl">
                            أهلاً بك، <span className="text-[#5EA8CC]">{discovery.contactName}</span>
                        </h1>
                        <p className="mt-3 max-w-2xl text-sm leading-7 text-[#64748B] sm:text-base">
                            من هنا يمكنك متابعة مشروع <strong className="text-[#0F172A]">{discovery.companyName}</strong> ومعرفة ما تم إنجازه وما يحتاج إلى إجراء منك.
                        </p>
                    </div>
                    <div className="shrink-0 rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-4">
                        <p className="text-xs font-bold text-[#64748B]">حالة المشروع</p>
                        <div className="mt-2"><StatusBadge status={state.status} /></div>
                    </div>
                </div>
            </section>

            <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <StatCard title="نسبة الإنجاز" value={`${state.progress}%`} icon={Activity} description={state.progress === 0 ? "لم يبدأ التنفيذ" : "من إجمالي المشروع"} progress={state.progress} featured />
                <StatCard title="الخدمات المطلوبة" value={project.services.length} icon={Sparkles} description="الخدمات المختارة من نموذج الاحتياج" />
                <StatCard title="المهام المنجزة" value={completedTasks} icon={CheckCircle2} description={`${activeTasks} قيد التنفيذ`} />
                <StatCard title="بانتظارك" value={waitingTasks + pending} icon={Clock3} description="إجراءات تحتاج مراجعتك" warning={waitingTasks + pending > 0} />
            </section>

            <section className="grid gap-6 xl:grid-cols-[1.45fr_0.8fr]">
                <ProjectProgressCard project={project} state={state} select={select} />
                <ProjectStatusCard project={project} state={state} />
            </section>

            <ServicesPreview services={project.services} select={select} />
            <ActionCenter project={project} state={state} select={select} />
        </div>
    );
}

// =====================================================
// 19. Stat Card
// =====================================================

function StatCard({ title, value, icon: Icon, description, progress, featured = false, warning = false }) {
    return (
        <div className={`
      group relative overflow-hidden rounded-2xl border p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg
      ${featured ? "border-[#87BCD8]/50 bg-white" : "border-[#E2E8F0] bg-white"}
    `}>
            <div className="flex items-start justify-between gap-4">
                <div>
                    <p className="text-xs font-bold text-[#64748B]">{title}</p>
                    <p className="mt-2 text-3xl font-black tracking-tight text-[#0F172A]">{value}</p>
                </div>
                <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${warning ? "bg-amber-50 text-amber-600" : "bg-[#EAF6FC] text-[#5EA8CC]"}`}>
                    <Icon size={20} />
                </div>
            </div>
            {typeof progress === "number" && (
                <div className="mt-5">
                    <div className="h-2 overflow-hidden rounded-full bg-[#EAF6FC]">
                        <div className="h-full rounded-full bg-[#5EA8CC] transition-all duration-1000" style={{ width: `${progress}%` }} />
                    </div>
                </div>
            )}
            <p className="mt-3 text-xs font-medium leading-5 text-[#94A3B8]">{description}</p>
        </div>
    );
}

// =====================================================
// 20. Project Progress Card
// =====================================================

function ProjectProgressCard({ project, state, select }) {
    const radius = 70;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (state.progress / 100) * circumference;

    return (
        <section className="rounded-[2rem] border border-[#E2E8F0] bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
                <div className="relative mx-auto h-44 w-44 shrink-0 sm:mx-0">
                    <svg className="h-full w-full -rotate-90" viewBox="0 0 180 180">
                        <circle cx="90" cy="90" r={radius} fill="none" stroke="#EAF6FC" strokeWidth="14" />
                        <circle
                            cx="90" cy="90" r={radius} fill="none" stroke="#5EA8CC" strokeWidth="14" strokeLinecap="round"
                            strokeDasharray={circumference} strokeDashoffset={offset}
                            className="transition-all duration-1000 ease-out"
                        />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-4xl font-black text-[#0F172A]">{state.progress}%</span>
                        <span className="mt-1 text-xs font-bold text-[#64748B]">الإنجاز</span>
                    </div>
                </div>
                <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-black uppercase tracking-[0.16em] text-[#5EA8CC]">Project Progress</span>
                        <StatusBadge status={state.status} />
                    </div>
                    <h2 className="mt-3 text-2xl font-black text-[#0F172A]">حالة مشروعك الآن</h2>
                    <p className="mt-2 text-sm leading-6 text-[#64748B]">
                        {state.progress === 0
                            ? "لم يتم احتساب أي إنجاز تنفيذي حتى الآن. سيبدأ احتساب التقدم بعد اعتماد المشروع وإتمام الدفع وبدء التنفيذ."
                            : "يتم تحديث نسبة الإنجاز وفق المهام والمراحل التي يعتمدها فريق SABARAT."}
                    </p>
                    <div className="mt-5 flex flex-wrap gap-3">
                        <button
                            type="button"
                            onClick={() => select("progress")}
                            className="inline-flex items-center gap-2 rounded-xl bg-[#5EA8CC] px-4 py-2.5 text-sm font-black text-white shadow-lg shadow-[#5EA8CC]/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#4D96BA]"
                        >
                            عرض تفاصيل التقدم <ChevronLeft size={16} />
                        </button>
                        {!project.companyApproved && (
                            <button
                                type="button"
                                onClick={() => select("notifications")}
                                className="inline-flex items-center gap-2 rounded-xl border border-[#E2E8F0] bg-white px-4 py-2.5 text-sm font-black text-[#64748B] transition-all hover:bg-[#F8FAFC]"
                            >
                                متابعة الاعتماد
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}

// =====================================================
// 21. Project Status Card
// =====================================================

function ProjectStatusCard({ project, state }) {
    return (
        <section className="rounded-[2rem] border border-[#E2E8F0] bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between gap-3">
                <div>
                    <p className="text-xs font-black text-[#5EA8CC]">PROJECT STATUS</p>
                    <h2 className="mt-1 text-xl font-black text-[#0F172A]">مسار المشروع</h2>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EAF6FC] text-[#5EA8CC]">
                    <Activity size={18} />
                </div>
            </div>
            <div className="mt-6 space-y-4">
                {project.timeline.map((item, index) => {
                    const completed = item.status === "completed";
                    const current = item.status === "current";
                    return (
                        <div key={item.id} className="flex items-start gap-3">
                            <div className="flex flex-col items-center">
                                <div className={`
                  flex h-8 w-8 items-center justify-center rounded-full border-2 text-xs font-black transition-all duration-500
                  ${completed ? "border-[#22C55E] bg-[#22C55E] text-white" : current ? "border-[#5EA8CC] bg-[#EAF6FC] text-[#5EA8CC] shadow-md shadow-[#5EA8CC]/20" : "border-[#E2E8F0] bg-white text-[#CBD5E1]"}
                `}>
                                    {completed ? <Check size={15} /> : index + 1}
                                </div>
                                {index < project.timeline.length - 1 && (
                                    <div className={`mt-1 h-7 w-px ${completed ? "bg-[#22C55E]/40" : "bg-[#E2E8F0]"}`} />
                                )}
                            </div>
                            <div className="min-w-0 flex-1 pb-1">
                                <p className={`text-sm font-black ${completed ? "text-[#0F172A]" : current ? "text-[#3D7895]" : "text-[#94A3B8]"}`}>{item.title}</p>
                                <p className="mt-1 text-[11px] text-[#94A3B8]">{completed ? "تم الإنجاز" : current ? "المرحلة الحالية" : "سيتم فتحها لاحقًا"}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className="mt-5 rounded-xl bg-[#F8FAFC] p-4">
                <div className="flex items-center gap-2 text-xs font-black text-[#64748B]">
                    <Clock3 size={15} className="text-[#5EA8CC]" /> المرحلة الحالية
                </div>
                <p className="mt-2 text-sm font-black text-[#0F172A]">{state.currentStage}</p>
                <p className="mt-1 text-xs text-[#64748B]">التالية: {state.nextStage}</p>
            </div>
        </section>
    );
}

// =====================================================
// 22. Services Preview
// =====================================================

function ServicesPreview({ services, select }) {
    return (
        <section className="rounded-[2rem] border border-[#E2E8F0] bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <p className="text-xs font-black text-[#5EA8CC]">REQUESTED SERVICES</p>
                    <h2 className="mt-1 text-xl font-black text-[#0F172A]">الخدمات المطلوبة</h2>
                </div>
                <button
                    type="button"
                    onClick={() => select("services")}
                    className="inline-flex items-center gap-2 text-sm font-black text-[#5EA8CC] hover:text-[#3D7895]"
                >
                    عرض جميع الخدمات <ChevronLeft size={16} />
                </button>
            </div>
            {services.length === 0 ? (
                <EmptyState icon={Sparkles} title="لم يتم اختيار خدمات بعد" description="ستظهر الخدمات التي اخترتها في نموذج الاحتياج هنا." />
            ) : (
                <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {services.slice(0, 6).map(service => <ServiceMiniCard key={service.id} service={service} />)}
                </div>
            )}
        </section>
    );
}

// =====================================================
// 23. Service Mini Card
// =====================================================

function ServiceMiniCard({ service }) {
    return (
        <div className="group rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-4 transition-all duration-300 hover:-translate-y-1 hover:border-[#87BCD8]/50 hover:bg-white hover:shadow-md">
            <div className="flex items-start justify-between gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EAF6FC] text-[#5EA8CC]">
                    <Sparkles size={18} />
                </div>
                <span className="rounded-full bg-white px-2.5 py-1 text-[10px] font-black text-[#64748B] ring-1 ring-[#E2E8F0]">{service.progress || 0}%</span>
            </div>
            <h3 className="mt-4 line-clamp-2 text-sm font-black leading-6 text-[#0F172A]">{service.name}</h3>
            <p className="mt-1 line-clamp-2 text-xs leading-5 text-[#64748B]">{service.status}</p>
            <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white">
                <div className="h-full rounded-full bg-[#5EA8CC] transition-all duration-700" style={{ width: `${service.progress || 0}%` }} />
            </div>
        </div>
    );
}

// =====================================================
// 24. Action Center
// =====================================================

function ActionCenter({ project, state, select }) {
    const actions = [];

    if (!project.companyApproved) {
        actions.push({
            icon: Clock3,
            title: "المشروع بانتظار الاعتماد",
            text: "سيتم فتح الخطوات التالية بعد اعتماد طلبك من إدارة SABARAT.",
            section: "notifications",
            type: "warning",
        });
    }

    if (project.companyApproved && !project.paymentCompleted) {
        actions.push({
            icon: CreditCard,
            title: project.paymentUnderReview ? "الدفع قيد المراجعة" : "إتمام الدفع لبدء المشروع",
            text: project.paymentUnderReview ? "تم إرسال إثبات الدفع وينتظر المراجعة." : "أكمل عملية الدفع حتى يتمكن الفريق من بدء التنفيذ.",
            section: "payment",
            type: "primary",
        });
    }

    if (project.paymentCompleted && project.approvals.some(item => item.status === "بانتظار الموافقة")) {
        actions.push({
            icon: FileCheck2,
            title: "لديك تسليم بانتظار الموافقة",
            text: "يرجى مراجعة التسليم وإرسال الموافقة أو طلب التعديل.",
            section: "approvals",
            type: "warning",
        });
    }

    if (project.tasks.some(task => task.status === "بانتظار العميل")) {
        actions.push({
            icon: ClipboardCheck,
            title: "هناك إجراء مطلوب منك",
            text: "توجد مهام بانتظار بيانات أو قرار من طرفك.",
            section: "tasks",
            type: "warning",
        });
    }

    if (actions.length === 0) {
        actions.push({
            icon: CheckCircle2,
            title: "لا توجد إجراءات عاجلة",
            text: "كل شيء يسير حسب الخطة الحالية. سنخبرك عند وجود أي تحديث.",
            section: "notifications",
            type: "success",
        });
    }

    const styles = {
        warning: "border-amber-200 bg-amber-50/60 text-amber-700",
        primary: "border-[#87BCD8]/40 bg-[#EAF6FC] text-[#3D7895]",
        success: "border-emerald-200 bg-emerald-50/60 text-emerald-700",
    };

    return (
        <section className="rounded-[2rem] border border-[#E2E8F0] bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EAF6FC] text-[#5EA8CC]">
                    <Bell size={19} />
                </div>
                <div>
                    <p className="text-xs font-black text-[#5EA8CC]">ACTION CENTER</p>
                    <h2 className="mt-1 text-xl font-black text-[#0F172A]">ماذا تحتاج أن تفعل؟</h2>
                </div>
            </div>
            <div className="mt-5 grid gap-3 lg:grid-cols-2">
                {actions.map((action, index) => {
                    const Icon = action.icon;
                    return (
                        <button
                            key={index}
                            type="button"
                            onClick={() => select(action.section)}
                            className={`flex items-start gap-4 rounded-2xl border p-4 text-right transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md ${styles[action.type]}`}
                        >
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white">
                                <Icon size={18} />
                            </div>
                            <div className="min-w-0 flex-1">
                                <p className="text-sm font-black">{action.title}</p>
                                <p className="mt-1 text-xs leading-5 text-[#64748B]">{action.text}</p>
                            </div>
                            <ChevronLeft size={17} className="mt-1 shrink-0 opacity-60" />
                        </button>
                    );
                })}
            </div>
        </section>
    );
}

// =====================================================
// 25. Progress Page
// =====================================================

function Progress({ project, state, discovery }) {
    const completed = project.tasks.filter(task => task.status === "منجز").length;
    const total = project.tasks.length;

    return (
        <div className="space-y-6 animate-[dashboardIn_0.45s_ease-out]">
            <PageTitle eyebrow="PROJECT PROGRESS" title="تقدم المشروع" description="تفاصيل مرئية ومباشرة عن مراحل العمل ونسبة الإنجاز." />

            <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
                <section className="rounded-[2rem] border border-[#E2E8F0] bg-white p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs font-black text-[#5EA8CC]">OVERALL PROGRESS</p>
                            <h2 className="mt-1 text-xl font-black text-[#0F172A]">الإنجاز الإجمالي</h2>
                        </div>
                        <span className="text-3xl font-black text-[#5EA8CC]">{state.progress}%</span>
                    </div>
                    <div className="mt-8 h-5 overflow-hidden rounded-full bg-[#EAF6FC]">
                        <div className="h-full rounded-full bg-gradient-to-l from-[#5EA8CC] to-[#87BCD8] transition-all duration-1000 ease-out" style={{ width: `${state.progress}%` }} />
                    </div>
                    <div className="mt-4 flex items-center justify-between text-xs font-bold text-[#94A3B8]">
                        <span>البداية</span>
                        <span>التنفيذ الكامل</span>
                    </div>
                    <div className="mt-8 grid gap-3 sm:grid-cols-3">
                        <ProgressMetric label="منجز" value={completed} icon={CheckCircle2} />
                        <ProgressMetric label="إجمالي المهام" value={total} icon={ClipboardCheck} />
                        <ProgressMetric label="الخدمات" value={project.services.length} icon={Sparkles} />
                    </div>
                </section>

                <section className="rounded-[2rem] border border-[#E2E8F0] bg-[#0F172A] p-6 text-white shadow-xl shadow-slate-900/10">
                    <p className="text-xs font-black text-[#87BCD8]">CURRENT STAGE</p>
                    <h2 className="mt-3 text-2xl font-black">{state.currentStage}</h2>
                    <p className="mt-3 text-sm leading-7 text-slate-300">
                        {state.progress === 0
                            ? "لم يبدأ التنفيذ حتى الآن. يتم فتح مراحل التنفيذ تلقائيًا بعد اكتمال شروط بدء المشروع."
                            : "فريق SABARAT يعمل على تنفيذ نطاق المشروع وفق الخطة المعتمدة."}
                    </p>
                    <div className="mt-7 rounded-2xl bg-white/5 p-4">
                        <p className="text-xs font-bold text-slate-400">المرحلة التالية</p>
                        <p className="mt-2 text-sm font-black">{state.nextStage}</p>
                    </div>
                    <div className="mt-4 rounded-2xl bg-white/5 p-4">
                        <p className="text-xs font-bold text-slate-400">الموعد المتوقع</p>
                        <p className="mt-2 text-sm font-black">{state.expectedDate}</p>
                    </div>
                </section>
            </div>

            <section className="rounded-[2rem] border border-[#E2E8F0] bg-white p-6 shadow-sm">
                <PageSectionHeader title="تقدم كل خدمة" description="يتم تحديث كل خدمة بشكل مستقل حسب المهام التي يعتمدها فريق SABARAT." icon={Sparkles} />
                <div className="mt-6 space-y-4">
                    {project.services.length === 0 ? (
                        <EmptyState icon={Sparkles} title="لا توجد خدمات" description="ستظهر الخدمات بعد إرسال نموذج الاحتياج." />
                    ) : (
                        project.services.map(service => <ServiceProgressRow key={service.id} service={service} />)
                    )}
                </div>
            </section>

            <Timeline timeline={project.timeline} />
        </div>
    );
}

// =====================================================
// 26. Progress Metric
// =====================================================

function ProgressMetric({ label, value, icon: Icon }) {
    return (
        <div className="rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-4">
            <div className="flex items-center gap-2 text-xs font-bold text-[#64748B]">
                <Icon size={15} className="text-[#5EA8CC]" /> {label}
            </div>
            <p className="mt-2 text-2xl font-black text-[#0F172A]">{value}</p>
        </div>
    );
}

// =====================================================
// 27. Service Progress Row
// =====================================================

function ServiceProgressRow({ service }) {
    const progress = Number(service.progress || 0);
    return (
        <div className="rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0">
                    <h3 className="text-sm font-black text-[#0F172A]">{service.name}</h3>
                    <p className="mt-1 text-xs text-[#64748B]">{service.status}</p>
                </div>
                <div className="flex items-center gap-4">
                    <span className="text-xs font-black text-[#5EA8CC]">{progress}%</span>
                    <span className="text-xs text-[#94A3B8]">{service.owner}</span>
                </div>
            </div>
            <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-white">
                <div className="h-full rounded-full bg-[#5EA8CC] transition-all duration-700" style={{ width: `${progress}%` }} />
            </div>
        </div>
    );
}

// =====================================================
// 28. Timeline
// =====================================================

function Timeline({ timeline }) {
    return (
        <section className="rounded-[2rem] border border-[#E2E8F0] bg-white p-6 shadow-sm">
            <PageSectionHeader title="مراحل المشروع" description="مسار واضح من إرسال الطلب وحتى التسليم النهائي." icon={Activity} />
            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {timeline.map((item, index) => {
                    const completed = item.status === "completed";
                    const current = item.status === "current";
                    return (
                        <div key={item.id} className={`
              relative rounded-2xl border p-5 transition-all duration-300
              ${completed ? "border-emerald-200 bg-emerald-50/50" : current ? "border-[#87BCD8]/50 bg-[#EAF6FC]" : "border-[#E2E8F0] bg-[#F8FAFC]"}
            `}>
                            <div className={`flex h-10 w-10 items-center justify-center rounded-xl font-black ${completed ? "bg-[#22C55E] text-white" : current ? "bg-[#5EA8CC] text-white" : "bg-white text-[#94A3B8]"}`}>
                                {completed ? <Check size={18} /> : index + 1}
                            </div>
                            <h3 className="mt-4 text-sm font-black text-[#0F172A]">{item.title}</h3>
                            <p className="mt-2 text-xs leading-5 text-[#64748B]">{completed ? "تم إنجاز المرحلة" : current ? "المرحلة الحالية" : "سيتم فتح المرحلة لاحقًا"}</p>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}

// =====================================================
// 29. Page Title
// =====================================================

function PageTitle({ eyebrow, title, description }) {
    return (
        <div className="rounded-[2rem] border border-[#E2E8F0] bg-white p-6 shadow-sm sm:p-8">
            <p className="text-xs font-black tracking-[0.16em] text-[#5EA8CC]">{eyebrow}</p>
            <h1 className="mt-2 text-3xl font-black text-[#0F172A]">{title}</h1>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-[#64748B]">{description}</p>
        </div>
    );
}

// =====================================================
// 30. Page Section Header
// =====================================================

function PageSectionHeader({ title, description, icon: Icon }) {
    return (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EAF6FC] text-[#5EA8CC]">
                    <Icon size={18} />
                </div>
                <div>
                    <h2 className="text-xl font-black text-[#0F172A]">{title}</h2>
                    {description && <p className="mt-1 text-xs leading-5 text-[#64748B]">{description}</p>}
                </div>
            </div>
        </div>
    );
}

// =====================================================
// 31. Empty State
// =====================================================

function EmptyState({ icon: Icon, title, description }) {
    return (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-[#E2E8F0] bg-[#F8FAFC] px-6 py-12 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-[#87BCD8] shadow-sm">
                <Icon size={24} />
            </div>
            <h3 className="mt-4 text-sm font-black text-[#0F172A]">{title}</h3>
            <p className="mt-2 max-w-md text-xs leading-6 text-[#64748B]">{description}</p>
        </div>
    );
}

// =====================================================
// 32. Services Component
// =====================================================

function Services({ services }) {
    return (
        <div className="space-y-6 animate-[dashboardIn_0.45s_ease-out]">
            <PageTitle eyebrow="SERVICES" title="الخدمات المطلوبة" description="جميع الخدمات التي تم اختيارها في نموذج الاحتياج مع حالة كل خدمة." />
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {services.length === 0 ? (
                    <div className="md:col-span-2 xl:col-span-3">
                        <EmptyState icon={Sparkles} title="لا توجد خدمات" description="لم يتم اختيار أي خدمات بعد. سيتم عرض الخدمات بعد إرسال نموذج الاحتياج." />
                    </div>
                ) : (
                    services.map(service => <ServiceCard key={service.id} service={service} />)
                )}
            </div>
        </div>
    );
}

// =====================================================
// 33. Service Card
// =====================================================

function ServiceCard({ service }) {
    return (
        <div className="group rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#87BCD8]/50 hover:shadow-lg">
            <div className="flex items-start justify-between gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#EAF6FC] text-[#5EA8CC]">
                    <Sparkles size={20} />
                </div>
                <StatusBadge status={service.status} />
            </div>
            <h3 className="mt-5 text-lg font-black text-[#0F172A]">{service.name}</h3>
            <p className="mt-2 text-sm leading-6 text-[#64748B]">{service.description}</p>
            <div className="mt-5">
                <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-[#64748B]">الإنجاز</span>
                    <span className="text-[#5EA8CC]">{service.progress}%</span>
                </div>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-[#EAF6FC]">
                    <div className="h-full rounded-full bg-[#5EA8CC] transition-all duration-700" style={{ width: `${service.progress}%` }} />
                </div>
            </div>
            <div className="mt-5 border-t border-[#E2E8F0] pt-4">
                <div className="flex items-center justify-between text-xs">
                    <span className="text-[#64748B]">المسؤول</span>
                    <span className="font-bold text-[#0F172A]">{service.owner}</span>
                </div>
                <div className="mt-2 flex items-center justify-between text-xs">
                    <span className="text-[#64748B]">آخر تحديث</span>
                    <span className="font-bold text-[#0F172A]">{service.updatedAt}</span>
                </div>
            </div>
        </div>
    );
}

// =====================================================
// 34. Tasks Component
// =====================================================

function Tasks({ tasks }) {
    return (
        <div className="space-y-6 animate-[dashboardIn_0.45s_ease-out]">
            <PageTitle eyebrow="TASKS" title="المهام والتسليمات" description="جميع المهام المرتبطة بالمشروع وحالتها." />
            {tasks.length === 0 ? (
                <EmptyState icon={ClipboardCheck} title="لا توجد مهام" description="سيتم إنشاء المهام بعد بدء تنفيذ المشروع." />
            ) : (
                <div className="space-y-3">
                    {tasks.map(task => <TaskItem key={task.id} task={task} />)}
                </div>
            )}
        </div>
    );
}

// =====================================================
// 35. Task Item
// =====================================================

function TaskItem({ task }) {
    return (
        <div className="flex flex-col gap-4 rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm transition-all duration-300 hover:border-[#87BCD8]/50 hover:shadow-md sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0 flex-1">
                <h3 className="font-black text-[#0F172A]">{task.title}</h3>
                {task.description && <p className="mt-1 text-sm leading-6 text-[#64748B]">{task.description}</p>}
                {task.dueDate && <p className="mt-2 text-xs text-[#94A3B8]">تاريخ الاستحقاق: {task.dueDate}</p>}
            </div>
            <StatusBadge status={task.status} />
        </div>
    );
}

// =====================================================
// 36. Approvals Component
// =====================================================

function Approvals({ approvals, onApproval }) {
    return (
        <div className="space-y-6 animate-[dashboardIn_0.45s_ease-out]">
            <PageTitle eyebrow="APPROVALS" title="الموافقات" description="العناصر التي تحتاج إلى موافقتك للمتابعة." />
            {approvals.length === 0 ? (
                <EmptyState icon={FileCheck2} title="لا توجد موافقات" description="سيتم إضافة عناصر للموافقة عليها خلال مراحل المشروع." />
            ) : (
                <div className="grid gap-4 lg:grid-cols-2">
                    {approvals.map(approval => <ApprovalItem key={approval.id} approval={approval} onApproval={onApproval} />)}
                </div>
            )}
        </div>
    );
}

// =====================================================
// 37. Approval Item
// =====================================================

function ApprovalItem({ approval, onApproval }) {
    const [note, setNote] = useState("");
    const isPending = approval.status === "بانتظار الموافقة";

    return (
        <div className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm transition-all duration-300 hover:border-[#87BCD8]/50 hover:shadow-md">
            <div className="flex items-start justify-between gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EAF6FC] text-[#5EA8CC]">
                    <FileCheck2 size={19} />
                </div>
                <StatusBadge status={approval.status} />
            </div>
            <h3 className="mt-4 font-black text-[#0F172A]">{approval.title}</h3>
            <p className="mt-2 text-sm leading-6 text-[#64748B]">{approval.description}</p>
            {approval.clientNote && (
                <p className="mt-3 rounded-xl bg-[#F8FAFC] p-3 text-sm text-[#64748B]">
                    <span className="font-bold">ملاحظتك: </span>{approval.clientNote}
                </p>
            )}
            {isPending && (
                <div className="mt-5 space-y-3">
                    <textarea
                        placeholder="أضف ملاحظاتك (اختياري)..."
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        className="w-full rounded-xl border border-[#E2E8F0] p-3 text-sm outline-none transition focus:border-[#5EA8CC] focus:ring-4 focus:ring-[#5EA8CC]/10"
                        rows={2}
                    />
                    <div className="flex gap-2">
                        <button
                            type="button"
                            onClick={() => onApproval(approval.id, "تمت الموافقة", note)}
                            className="flex-1 rounded-xl bg-[#22C55E] px-4 py-2.5 text-sm font-black text-white transition hover:bg-[#16A34A]"
                        >
                            موافقة
                        </button>
                        <button
                            type="button"
                            onClick={() => onApproval(approval.id, "يحتاج تعديل", note)}
                            className="flex-1 rounded-xl bg-[#F59E0B] px-4 py-2.5 text-sm font-black text-white transition hover:bg-[#D97706]"
                        >
                            طلب تعديل
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

// =====================================================
// 38. Files Component
// =====================================================

function Files({ files }) {
    return (
        <div className="space-y-6 animate-[dashboardIn_0.45s_ease-out]">
            <PageTitle eyebrow="FILES" title="الملفات والمستندات" description="جميع ملفات المشروع المشتركة." />
            {files.length === 0 ? (
                <EmptyState icon={FolderOpen} title="لا توجد ملفات" description="سيتم إضافة الملفات والمستندات خلال مراحل المشروع." />
            ) : (
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {files.map(file => <FileItem key={file.id} file={file} />)}
                </div>
            )}
        </div>
    );
}

// =====================================================
// 39. File Item
// =====================================================

function FileItem({ file }) {
    return (
        <div className="group flex items-center gap-4 rounded-2xl border border-[#E2E8F0] bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#87BCD8]/50 hover:shadow-md">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#EAF6FC] text-[#5EA8CC]">
                <FileText size={19} />
            </div>
            <div className="min-w-0 flex-1">
                <p className="truncate font-black text-[#0F172A]">{file.name}</p>
                <p className="mt-1 text-xs text-[#64748B]">{file.size || "حجم غير محدد"} • {file.date || "بدون تاريخ"}</p>
            </div>
            <button type="button" className="rounded-xl p-2 text-[#64748B] transition hover:bg-[#F8FAFC] hover:text-[#5EA8CC]">
                <Download size={18} />
            </button>
        </div>
    );
}

// =====================================================
// 40. Notifications Component
// =====================================================

function Notifications({ notifications, markRead }) {
    return (
        <div className="space-y-6 animate-[dashboardIn_0.45s_ease-out]">
            <PageTitle eyebrow="NOTIFICATIONS" title="الإشعارات" description="جميع التحديثات والتنبيهات الخاصة بمشروعك." />
            {notifications.length === 0 ? (
                <EmptyState icon={Bell} title="لا توجد إشعارات" description="ستظهر هنا جميع تحديثات مشروعك." />
            ) : (
                <div className="space-y-3">
                    {notifications.map(notification => <NotificationItem key={notification.id} notification={notification} markRead={markRead} />)}
                </div>
            )}
        </div>
    );
}

// =====================================================
// 41. Notification Item
// =====================================================

function NotificationItem({ notification, markRead }) {
    return (
        <div className={`
      flex gap-4 rounded-2xl border p-5 transition-all duration-300 hover:shadow-md
      ${notification.read ? "border-[#E2E8F0] bg-white" : "border-[#87BCD8]/30 bg-[#EAF6FC]/40"}
    `}>
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-[#5EA8CC]">
                <Bell size={19} />
            </div>
            <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-start justify-between gap-2">
                    <h3 className="font-black text-[#0F172A]">{notification.title}</h3>
                    <span className="text-xs font-bold text-[#94A3B8]">{notification.time}</span>
                </div>
                <p className="mt-2 text-sm leading-6 text-[#64748B]">{notification.text}</p>
                {!notification.read && (
                    <button type="button" onClick={() => markRead()} className="mt-3 text-xs font-bold text-[#5EA8CC] transition hover:text-[#3D7895]">
                        تحديد كمقروء
                    </button>
                )}
            </div>
            {!notification.read && <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-[#5EA8CC]" />}
        </div>
    );
}

// =====================================================
// 42. Messages Component
// =====================================================

function Messages({ messages, send }) {
    const [text, setText] = useState("");

    const handleSend = () => {
        if (!text.trim()) return;
        send(text);
        setText("");
    };

    return (
        <div className="space-y-6 animate-[dashboardIn_0.45s_ease-out]">
            <PageTitle eyebrow="MESSAGES" title="الرسائل" description="التواصل المباشر مع فريق SABARAT." />
            <div className="overflow-hidden rounded-[2rem] border border-[#E2E8F0] bg-white shadow-sm">
                <div className="h-[480px] space-y-4 overflow-y-auto p-5">
                    {messages.length === 0 ? (
                        <EmptyState icon={MessageCircle} title="ابدأ المحادثة" description="يمكنك التواصل مباشرة مع فريق المشروع." />
                    ) : (
                        messages.map(message => <MessageItem key={message.id} message={message} />)
                    )}
                </div>
                <div className="border-t border-[#E2E8F0] bg-[#F8FAFC] p-4">
                    <div className="flex items-center gap-2">
                        <button type="button" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#E2E8F0] bg-white text-[#64748B] transition hover:border-[#87BCD8] hover:text-[#5EA8CC]">
                            <Paperclip size={18} />
                        </button>
                        <input
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            onKeyDown={(e) => { if (e.key === "Enter") handleSend(); }}
                            placeholder="اكتب رسالتك..."
                            className="h-11 flex-1 rounded-xl border border-[#E2E8F0] bg-white px-4 text-sm outline-none transition focus:border-[#5EA8CC] focus:ring-4 focus:ring-[#5EA8CC]/10"
                        />
                        <button
                            type="button"
                            onClick={handleSend}
                            disabled={!text.trim()}
                            className="flex h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-[#5EA8CC] px-5 text-sm font-black text-white transition hover:bg-[#4D96BA] disabled:cursor-not-allowed disabled:opacity-40"
                        >
                            <Send size={17} /> إرسال
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

// =====================================================
// 43. Message Item
// =====================================================

function MessageItem({ message }) {
    const isClient = message.sender === "client";
    return (
        <div className={`flex ${isClient ? "justify-start" : "justify-end"}`}>
            <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${isClient ? "bg-[#EAF6FC] text-[#0F172A]" : "bg-[#0F172A] text-white"}`}>
                <p className="text-sm leading-6">{message.text}</p>
                <div className="mt-2 flex items-center gap-2 text-[10px] opacity-60">
                    <span>{message.time}</span>
                    {isClient && <Check size={13} />}
                </div>
            </div>
        </div>
    );
}

// =====================================================
// 44. Meetings Component
// =====================================================

function Meetings({ meetings }) {
    return (
        <div className="space-y-6 animate-[dashboardIn_0.45s_ease-out]">
            <PageTitle eyebrow="MEETINGS" title="الاجتماعات" description="جميع الاجتماعات المتعلقة بالمشروع." />
            {meetings.length === 0 ? (
                <EmptyState icon={CalendarDays} title="لا توجد اجتماعات" description="سيتم عرض الاجتماعات القادمة والسابقة هنا." />
            ) : (
                <div className="grid gap-4 md:grid-cols-2">
                    {meetings.map(meeting => <MeetingItem key={meeting.id} meeting={meeting} />)}
                </div>
            )}
        </div>
    );
}

// =====================================================
// 45. Meeting Item
// =====================================================

function MeetingItem({ meeting }) {
    return (
        <div className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#87BCD8]/50 hover:shadow-md">
            <div className="flex items-start justify-between gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EAF6FC] text-[#5EA8CC]">
                    <CalendarDays size={19} />
                </div>
                <StatusBadge status={meeting.status || "pending"} />
            </div>
            <h3 className="mt-4 font-black text-[#0F172A]">{meeting.title}</h3>
            <div className="mt-4 space-y-2 text-sm text-[#64748B]">
                <p>📅 {meeting.date}</p>
                {meeting.time && <p>🕐 {meeting.time}</p>}
                {meeting.duration && <p>⏱ {meeting.duration}</p>}
            </div>
            {meeting.link && (
                <a href={meeting.link} target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#5EA8CC] px-4 py-2.5 text-sm font-black text-white transition hover:bg-[#4D96BA]">
                    دخول الاجتماع <ChevronLeft size={16} />
                </a>
            )}
        </div>
    );
}

// =====================================================
// 46. Payments Component
// =====================================================

function Payments({ project, discovery, selectPayment }) {
    const total = project.invoices.reduce((sum, inv) => sum + Number(inv.amount || 0), 0);
    const paid = project.invoices.filter(inv => inv.status === "مدفوعة").reduce((sum, inv) => sum + Number(inv.amount || 0), 0);
    const remaining = Math.max(total - paid, 0);

    return (
        <div className="space-y-6 animate-[dashboardIn_0.45s_ease-out]">
            <PageTitle eyebrow="PAYMENTS" title="الفواتير والدفع" description="إدارة الفواتير والمدفوعات الخاصة بمشروعك." />
            <div className="grid gap-4 md:grid-cols-3">
                <StatCard title="إجمالي الفواتير" value={`${total} ${discovery.budget?.currency || "USD"}`} icon={Receipt} />
                <StatCard title="المدفوع" value={`${paid} ${discovery.budget?.currency || "USD"}`} icon={CheckCircle2} />
                <StatCard title="المتبقي" value={`${remaining} ${discovery.budget?.currency || "USD"}`} icon={AlertCircle} warning={remaining > 0} />
            </div>

            {!project.companyApproved && (
                <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
                    <p className="text-sm font-bold text-amber-700">⚠️ الدفع غير متاح حتى يتم اعتماد المشروع من الإدارة.</p>
                </div>
            )}

            {project.companyApproved && !project.paymentCompleted && (
                <button
                    type="button"
                    onClick={selectPayment}
                    className="inline-flex items-center gap-2 rounded-xl bg-[#5EA8CC] px-6 py-3 font-black text-white shadow-lg shadow-[#5EA8CC]/20 transition hover:-translate-y-0.5 hover:bg-[#4D96BA]"
                >
                    إتمام الدفع <CreditCard size={18} />
                </button>
            )}

            <div className="space-y-3">
                {project.invoices.length === 0 ? (
                    <EmptyState icon={Receipt} title="لا توجد فواتير" description="سيتم إصدار الفواتير خلال مراحل المشروع." />
                ) : (
                    project.invoices.map(invoice => <InvoiceItem key={invoice.id} invoice={invoice} />)
                )}
            </div>
        </div>
    );
}

// =====================================================
// 47. Invoice Item
// =====================================================

function InvoiceItem({ invoice }) {
    return (
        <div className="flex flex-col gap-4 rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm transition-all duration-300 hover:border-[#87BCD8]/50 hover:shadow-md sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EAF6FC] text-[#5EA8CC]">
                    <Receipt size={19} />
                </div>
                <div>
                    <h3 className="font-black text-[#0F172A]">{invoice.number || "فاتورة"}</h3>
                    <p className="mt-1 text-sm text-[#64748B]">{invoice.description}</p>
                </div>
            </div>
            <div className="flex flex-wrap items-center gap-4">
                <div className="text-right">
                    <p className="text-xs text-[#64748B]">المبلغ</p>
                    <p className="font-black text-[#0F172A]">{invoice.amount} {invoice.currency}</p>
                </div>
                <StatusBadge status={invoice.status} />
                {invoice.status === "بانتظار الدفع" && (
                    <button type="button" className="rounded-xl bg-[#5EA8CC] px-4 py-2 text-sm font-black text-white transition hover:bg-[#4D96BA]">
                        دفع
                    </button>
                )}
            </div>
        </div>
    );
}

// =====================================================
// 48. PaymentMethods Component
// =====================================================

function PaymentMethods({ project, discovery, payment, setPayment, submitPayment, confirmPayment }) {
    const [amount, setAmount] = useState(payment.amount || 0);
    const [method, setMethod] = useState(payment.selectedMethod || "");
    const [proof, setProof] = useState(null);
    const [notes, setNotes] = useState(payment.notes || "");

    const handleSubmit = () => {
        setPayment({ ...payment, amount, selectedMethod: method, notes, proofFile: proof });
        submitPayment();
    };

    if (!project.companyApproved) {
        return (
            <div className="space-y-6 animate-[dashboardIn_0.45s_ease-out]">
                <PageTitle eyebrow="PAYMENT" title="طرق الدفع" description="اختر طريقة الدفع المناسبة." />
                <EmptyState icon={CreditCard} title="الدفع غير متاح" description="يجب اعتماد المشروع من الإدارة أولاً." />
            </div>
        );
    }

    if (project.paymentCompleted) {
        return (
            <div className="space-y-6 animate-[dashboardIn_0.45s_ease-out]">
                <PageTitle eyebrow="PAYMENT" title="طرق الدفع" description="اختر طريقة الدفع المناسبة." />
                <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-center">
                    <CheckCircle2 className="mx-auto text-emerald-600" size={48} />
                    <h2 className="mt-4 text-2xl font-black text-emerald-700">تم تأكيد الدفع</h2>
                    <p className="mt-2 text-emerald-600">تمت عملية الدفع بنجاح. المشروع جاهز للبدء.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6 animate-[dashboardIn_0.45s_ease-out]">
            <PageTitle eyebrow="PAYMENT" title="طرق الدفع" description="اختر طريقة الدفع المناسبة." />

            {project.paymentUnderReview && (
                <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
                    <div className="flex items-center gap-3">
                        <RefreshCw className="animate-spin text-amber-600" size={24} />
                        <div>
                            <h3 className="font-black text-amber-700">الدفع قيد المراجعة</h3>
                            <p className="text-sm text-amber-600">تم إرسال إثبات الدفع، بانتظار مراجعة الإدارة.</p>
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={confirmPayment}
                        className="mt-4 rounded-xl bg-[#5EA8CC] px-6 py-2.5 text-sm font-black text-white transition hover:bg-[#4D96BA]"
                    >
                        ✅ تأكيد الدفع (للاختبار)
                    </button>
                </div>
            )}

            <div className="grid gap-4 md:grid-cols-2">
                {[
                    { id: "bank", title: "حوالة بنكية", icon: Landmark, description: "تحويل المبلغ إلى الحساب البنكي للشركة." },
                    { id: "wallet", title: "محفظة رقمية", icon: Smartphone, description: "الدفع عبر المحافظ الإلكترونية." },
                    { id: "card", title: "بطاقة بنكية", icon: CreditCard, description: "الدفع عبر البطاقة البنكية." },
                    { id: "cash", title: "دفع مباشر", icon: WalletCards, description: "اتفاق الدفع المباشر مع الإدارة." },
                ].map((option) => {
                    const Icon = option.icon;
                    const isSelected = method === option.id;
                    return (
                        <button
                            key={option.id}
                            type="button"
                            onClick={() => setMethod(option.id)}
                            className={`
                group rounded-2xl border p-5 text-right transition-all duration-300 hover:-translate-y-1 hover:shadow-lg
                ${isSelected ? "border-[#5EA8CC] bg-[#EAF6FC] shadow-md" : "border-[#E2E8F0] bg-white"}
              `}
                        >
                            <div className="flex items-start justify-between gap-3">
                                <div className={`
                  flex h-12 w-12 items-center justify-center rounded-xl transition
                  ${isSelected ? "bg-[#5EA8CC] text-white" : "bg-[#F8FAFC] text-[#64748B] group-hover:bg-[#EAF6FC] group-hover:text-[#5EA8CC]"}
                `}>
                                    <Icon size={21} />
                                </div>
                                {isSelected && <CheckCircle2 className="text-[#5EA8CC]" size={20} />}
                            </div>
                            <h3 className="mt-4 font-black text-[#0F172A]">{option.title}</h3>
                            <p className="mt-2 text-sm leading-6 text-[#64748B]">{option.description}</p>
                        </button>
                    );
                })}
            </div>

            <div className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm">
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-bold text-[#64748B]">المبلغ</label>
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(Number(e.target.value))}
                            placeholder="0.00"
                            className="mt-2 w-full rounded-xl border border-[#E2E8F0] p-3 text-lg font-bold outline-none transition focus:border-[#5EA8CC] focus:ring-4 focus:ring-[#5EA8CC]/10"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-[#64748B]">إثبات الدفع (اختياري)</label>
                        <input
                            type="file"
                            onChange={(e) => setProof(e.target.files?.[0] || null)}
                            className="mt-2 w-full rounded-xl border border-[#E2E8F0] p-3 text-sm outline-none transition focus:border-[#5EA8CC]"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-[#64748B]">ملاحظات</label>
                        <textarea
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            placeholder="أضف أي ملاحظات إضافية..."
                            rows={3}
                            className="mt-2 w-full rounded-xl border border-[#E2E8F0] p-3 text-sm outline-none transition focus:border-[#5EA8CC] focus:ring-4 focus:ring-[#5EA8CC]/10"
                        />
                    </div>
                    <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={!method || !amount || amount <= 0}
                        className="w-full rounded-xl bg-[#5EA8CC] px-6 py-3.5 font-black text-white transition hover:-translate-y-0.5 hover:bg-[#4D96BA] disabled:cursor-not-allowed disabled:opacity-40"
                    >
                        إرسال طلب الدفع
                    </button>
                </div>
            </div>
        </div>
    );
}

// =====================================================
// 49. Requests Component
// =====================================================

function Requests({ project, setProject }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = () => {
        if (!title.trim() || !description.trim()) {
            alert("يرجى ملء جميع الحقول.");
            return;
        }
        const request = {
            id: `request-${Date.now()}`,
            title: title.trim(),
            description: description.trim(),
            status: "بانتظار المراجعة",
            date: new Date().toLocaleString("ar-YE"),
        };
        setProject({ ...project, requests: [...project.requests, request] });
        setTitle("");
        setDescription("");
    };

    return (
        <div className="space-y-6 animate-[dashboardIn_0.45s_ease-out]">
            <PageTitle eyebrow="REQUESTS" title="الطلبات الإضافية" description="إرسال طلبات جديدة خارج نطاق المشروع الأساسي." />
            {!project.companyApproved && (
                <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
                    <p className="text-sm font-bold text-amber-700">⚠️ الطلبات الإضافية غير متاحة حتى يتم اعتماد المشروع.</p>
                </div>
            )}
            {project.companyApproved && (
                <div className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-bold text-[#64748B]">عنوان الطلب</label>
                            <input
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="مثال: طلب تصميم إضافي"
                                className="mt-2 w-full rounded-xl border border-[#E2E8F0] p-3 text-sm outline-none transition focus:border-[#5EA8CC] focus:ring-4 focus:ring-[#5EA8CC]/10"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-[#64748B]">تفاصيل الطلب</label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="اشرح ما تحتاجه بالتفصيل..."
                                rows={4}
                                className="mt-2 w-full rounded-xl border border-[#E2E8F0] p-3 text-sm outline-none transition focus:border-[#5EA8CC] focus:ring-4 focus:ring-[#5EA8CC]/10"
                            />
                        </div>
                        <button
                            type="button"
                            onClick={handleSubmit}
                            className="inline-flex items-center gap-2 rounded-xl bg-[#5EA8CC] px-6 py-3 font-black text-white transition hover:-translate-y-0.5 hover:bg-[#4D96BA]"
                        >
                            <Plus size={18} /> إرسال الطلب
                        </button>
                    </div>
                </div>
            )}
            {project.requests.length > 0 && (
                <div className="space-y-3">
                    <h2 className="text-xl font-black text-[#0F172A]">الطلبات السابقة</h2>
                    {project.requests.map(request => <RequestItem key={request.id} request={request} />)}
                </div>
            )}
        </div>
    );
}

// =====================================================
// 50. Request Item
// =====================================================

function RequestItem({ request }) {
    return (
        <div className="flex flex-col gap-3 rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm transition-all duration-300 hover:border-[#87BCD8]/50 hover:shadow-md sm:flex-row sm:items-center sm:justify-between">
            <div>
                <h3 className="font-black text-[#0F172A]">{request.title}</h3>
                <p className="mt-1 text-sm leading-6 text-[#64748B]">{request.description}</p>
                <p className="mt-2 text-xs text-[#94A3B8]">{request.date}</p>
            </div>
            <StatusBadge status={request.status} />
        </div>
    );
}

// =====================================================
// 51. Support Component
// =====================================================

function Support({ project, setProject }) {
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = () => {
        if (!subject.trim() || !message.trim()) {
            alert("يرجى ملء جميع الحقول.");
            return;
        }
        const ticket = {
            id: `ticket-${Date.now()}`,
            subject: subject.trim(),
            message: message.trim(),
            status: "مفتوحة",
            date: new Date().toLocaleString("ar-YE"),
            updatedAt: new Date().toLocaleString("ar-YE"),
        };
        setProject({ ...project, tickets: [...project.tickets, ticket] });
        setSubject("");
        setMessage("");
    };

    return (
        <div className="space-y-6 animate-[dashboardIn_0.45s_ease-out]">
            <PageTitle eyebrow="SUPPORT" title="الدعم الفني" description="احصل على المساعدة من فريق الدعم." />
            <div className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm">
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-bold text-[#64748B]">الموضوع</label>
                        <input
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            placeholder="مثال: مشكلة في رفع الملفات"
                            className="mt-2 w-full rounded-xl border border-[#E2E8F0] p-3 text-sm outline-none transition focus:border-[#5EA8CC] focus:ring-4 focus:ring-[#5EA8CC]/10"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-[#64748B]">تفاصيل المشكلة</label>
                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="اشرح المشكلة بالتفصيل..."
                            rows={4}
                            className="mt-2 w-full rounded-xl border border-[#E2E8F0] p-3 text-sm outline-none transition focus:border-[#5EA8CC] focus:ring-4 focus:ring-[#5EA8CC]/10"
                        />
                    </div>
                    <button
                        type="button"
                        onClick={handleSubmit}
                        className="inline-flex items-center gap-2 rounded-xl bg-[#5EA8CC] px-6 py-3 font-black text-white transition hover:-translate-y-0.5 hover:bg-[#4D96BA]"
                    >
                        <Headphones size={18} /> فتح تذكرة دعم
                    </button>
                </div>
            </div>
            {project.tickets.length > 0 && (
                <div className="space-y-3">
                    <h2 className="text-xl font-black text-[#0F172A]">التذاكر السابقة</h2>
                    {project.tickets.map(ticket => <TicketItem key={ticket.id} ticket={ticket} />)}
                </div>
            )}
        </div>
    );
}

// =====================================================
// 52. Ticket Item
// =====================================================

function TicketItem({ ticket }) {
    return (
        <div className="flex flex-col gap-3 rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm transition-all duration-300 hover:border-[#87BCD8]/50 hover:shadow-md sm:flex-row sm:items-center sm:justify-between">
            <div>
                <h3 className="font-black text-[#0F172A]">{ticket.subject}</h3>
                <p className="mt-1 text-sm leading-6 text-[#64748B]">{ticket.message}</p>
                <p className="mt-2 text-xs text-[#94A3B8]">آخر تحديث: {ticket.updatedAt}</p>
            </div>
            <StatusBadge status={ticket.status === "مفتوحة" ? "warning" : "completed"} label={ticket.status} />
        </div>
    );
}

// =====================================================
// 53. Company Component
// =====================================================

function Company({ discovery }) {
    return (
        <div className="space-y-6 animate-[dashboardIn_0.45s_ease-out]">
            <PageTitle eyebrow="COMPANY" title="بيانات الشركة" description="جميع المعلومات المسجلة عن شركتك." />
            <div className="grid gap-5 md:grid-cols-2">
                <InfoCard
                    title="معلومات الشركة"
                    items={[
                        { label: "اسم الشركة", value: discovery.companyName },
                        { label: "مسؤول التواصل", value: discovery.contactName },
                        { label: "المسمى الوظيفي", value: discovery.jobTitle || "غير محدد" },
                        { label: "الهاتف", value: discovery.phone || "غير محدد" },
                        { label: "البريد الإلكتروني", value: discovery.email || "غير محدد" },
                        { label: "الموقع الإلكتروني", value: discovery.website || "غير محدد" },
                        { label: "المدينة", value: discovery.city || "غير محدد" },
                    ]}
                />
                <InfoCard
                    title="النشاط التجاري"
                    items={[
                        { label: "مجال النشاط", value: discovery.businessField },
                        { label: "سنوات العمل", value: discovery.yearsInBusiness || "غير محدد" },
                        { label: "المنتجات والخدمات", value: discovery.productsServices || "غير محدد" },
                        { label: "الميزة التنافسية", value: discovery.competitiveAdvantage || "غير محدد" },
                    ]}
                />
                <InfoCard
                    title="الجمهور المستهدف"
                    items={[
                        { label: "الفئة العمرية", value: discovery.audience?.age || "غير محدد" },
                        { label: "الجنس", value: discovery.audience?.gender || "غير محدد" },
                        { label: "الموقع", value: discovery.audience?.location || "غير محدد" },
                        { label: "اللغة", value: discovery.audience?.language || "غير محدد" },
                        { label: "الاهتمامات", value: discovery.audience?.interests || "غير محدد" },
                        { label: "القدرة الشرائية", value: discovery.audience?.purchasingPower || "غير محدد" },
                    ]}
                />
                <InfoCard
                    title="الأهداف والتحديات"
                    items={[
                        { label: "الأهداف التسويقية", value: discovery.marketingGoals?.length ? discovery.marketingGoals.join("، ") : "غير محدد" },
                        { label: "التحديات", value: discovery.challenges?.length ? discovery.challenges.join("، ") : "غير محدد" },
                        { label: "الخدمات المطلوبة", value: discovery.services?.length ? discovery.services.join("، ") : "غير محدد" },
                        { label: "حالة العلامة التجارية", value: discovery.brandStatus?.length ? discovery.brandStatus.join("، ") : "غير محدد" },
                    ]}
                />
                <InfoCard
                    title="الميزانية"
                    items={[
                        { label: "نوع الميزانية", value: discovery.budget?.type || "غير محدد" },
                        { label: "الحد الأدنى", value: discovery.budget?.from || "غير محدد" },
                        { label: "الحد الأعلى", value: discovery.budget?.to || "غير محدد" },
                        { label: "العملة", value: discovery.budget?.currency || "غير محدد" },
                    ]}
                />
                <InfoCard
                    title="معلومات إضافية"
                    items={[
                        { label: "التوقعات", value: discovery.expectations || "غير محدد" },
                        { label: "التواصل المفضل", value: discovery.additional?.preferredContact || "غير محدد" },
                        { label: "موعد البدء المتوقع", value: discovery.additional?.startDate || "غير محدد" },
                        { label: "مصدر التعريف", value: discovery.additional?.source || "غير محدد" },
                    ]}
                />
            </div>
        </div>
    );
}

// =====================================================
// 54. Info Card
// =====================================================

function InfoCard({ title, items }) {
    return (
        <div className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm">
            <h3 className="text-lg font-black text-[#0F172A]">{title}</h3>
            <div className="mt-4 space-y-3">
                {items.map((item, index) => (
                    <div key={index} className="flex items-start justify-between gap-3 border-b border-[#F1F5F9] pb-3 last:border-0 last:pb-0">
                        <span className="text-sm font-bold text-[#64748B]">{item.label}</span>
                        <span className="max-w-[60%] text-right text-sm font-bold text-[#0F172A]">{item.value}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}