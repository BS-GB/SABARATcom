import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    Activity,
    AlertCircle,
    ArrowLeft,
    ArrowRight,
    Bell,
    CalendarDays,
    Check,
    CheckCircle2,
    ChevronDown,
    ChevronLeft,
    CircleDollarSign,
    Clock3,
    CreditCard,
    Download,
    FileCheck2,
    FileText,
    FolderOpen,
    Headphones,
    Info,
    LayoutDashboard,
    LifeBuoy,
    LogOut,
    Mail,
    Menu,
    MessageCircle,
    Paperclip,
    Plus,
    Receipt,
    Send,
    Settings,
    ShieldCheck,
    Sparkles,
    Target,
    Upload,
    User,
    Users,
    Wallet,
    X,
    XCircle,
} from "lucide-react";

// =====================================================
// Storage Keys
// =====================================================

const DISCOVERY_KEY = "sabarat_client_discovery_form";
const PROJECT_KEY = "sabarat_client_project";
const NOTIFICATIONS_KEY = "sabarat_client_notifications";
const MESSAGES_KEY = "sabarat_client_messages";
const MEETINGS_KEY = "sabarat_client_meetings";
const FILES_KEY = "sabarat_client_files";
const INVOICES_KEY = "sabarat_client_invoices";
const REQUESTS_KEY = "sabarat_client_additional_requests";
const SUPPORT_KEY = "sabarat_client_support_tickets";
const APPROVALS_KEY = "sabarat_client_approvals";

// =====================================================
// Project Colors
// =====================================================

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
// Helpers
// =====================================================

function readStorage(key, fallback) {
    try {
        const value = localStorage.getItem(key);

        if (!value) {
            return fallback;
        }

        return JSON.parse(value);
    } catch (error) {
        console.error(`Failed to read ${key}`, error);
        return fallback;
    }
}

function writeStorage(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.error(`Failed to write ${key}`, error);
    }
}

function formatDate(date) {
    if (!date) {
        return "غير محدد";
    }

    try {
        return new Intl.DateTimeFormat("ar-SA", {
            year: "numeric",
            month: "long",
            day: "numeric",
        }).format(new Date(date));
    } catch {
        return "غير محدد";
    }
}

function formatMoney(value, currency = "USD") {
    const amount = Number(value || 0);

    return new Intl.NumberFormat("ar-SA", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
    }).format(amount) + ` ${currency}`;
}

function normalizeServiceName(service) {
    return String(service || "")
        .trim()
        .replace(/\s+/g, " ");
}

function getServiceIcon(service) {
    const value = String(service || "");

    if (value.includes("إدارة حسابات")) {
        return Users;
    }

    if (value.includes("محتوى")) {
        return FileText;
    }

    if (value.includes("إعلانات")) {
        return Target;
    }

    if (value.includes("Copywriting")) {
        return Mail;
    }

    if (value.includes("Reels")) {
        return Activity;
    }

    if (value.includes("هوية")) {
        return Sparkles;
    }

    if (value.includes("تصميم")) {
        return Sparkles;
    }

    if (value.includes("موقع")) {
        return LayoutDashboard;
    }

    return CheckCircle2;
}

// =====================================================
// Default Project
// =====================================================

function createDefaultProject(discovery) {
    const services = Array.isArray(discovery?.services)
        ? discovery.services.filter(Boolean).map(normalizeServiceName)
        : [];

    return {
        id: `project_${Date.now()}`,

        status: "pending_company_approval",

        companyApproved: false,
        paymentRequired: false,
        paymentStatus: "not_required",
        projectStarted: false,

        createdAt: new Date().toISOString(),
        approvedAt: null,
        paidAt: null,
        startedAt: null,

        progress: 0,

        currentStage: "بانتظار مراجعة الشركة",
        nextStage: "مراجعة واعتماد الطلب",
        expectedDate: null,

        services: services.map((service, index) => ({
            id: `service_${index + 1}`,
            name: service,
            status: "pending",
            progress: 0,
            manager: "سيتم التحديد بعد اعتماد المشروع",
            updatedAt: null,
        })),

        tasks: [],

        deliverables: [],

        approvals: [],

        timeline: [
            {
                id: "timeline_1",
                title: "إرسال نموذج الاحتياج",
                status: "completed",
                date: new Date().toISOString(),
            },
            {
                id: "timeline_2",
                title: "مراجعة الطلب من الإدارة",
                status: "current",
                date: null,
            },
            {
                id: "timeline_3",
                title: "اعتماد المشروع",
                status: "pending",
                date: null,
            },
            {
                id: "timeline_4",
                title: "الدفع",
                status: "pending",
                date: null,
            },
            {
                id: "timeline_5",
                title: "بدء التنفيذ",
                status: "pending",
                date: null,
            },
            {
                id: "timeline_6",
                title: "التسليم والموافقة",
                status: "pending",
                date: null,
            },
        ],
    };
}

// =====================================================
// Default Invoice
// =====================================================

function createInitialInvoice(discovery, project) {
    const budget = discovery?.budget || {};

    const from = Number(budget.from || 0);
    const to = Number(budget.to || 0);

    let amount = 0;

    if (from > 0 && to > 0) {
        amount = (from + to) / 2;
    } else if (from > 0) {
        amount = from;
    } else if (to > 0) {
        amount = to;
    }

    return {
        id: `INV-${Date.now()}`,
        projectId: project?.id || null,
        title: "الفاتورة الأولية للمشروع",
        amount,
        currency: budget.currency || "USD",
        paid: 0,
        remaining: amount,
        status: amount > 0 ? "pending" : "draft",
        dueDate: null,
        createdAt: new Date().toISOString(),
        description: "دفعة بدء تنفيذ المشروع بعد اعتماد الطلب.",
    };
}

// =====================================================
// Status Configuration
// =====================================================

const PROJECT_STATUS = {
    pending_company_approval: {
        label: "بانتظار اعتماد الشركة",
        color: "warning",
    },

    awaiting_payment: {
        label: "بانتظار الدفع",
        color: "warning",
    },

    ready_to_start: {
        label: "جاهز للبدء",
        color: "success",
    },

    in_progress: {
        label: "قيد التنفيذ",
        color: "primary",
    },

    awaiting_client_approval: {
        label: "بانتظار موافقتك",
        color: "warning",
    },

    completed: {
        label: "مكتمل",
        color: "success",
    },

    cancelled: {
        label: "ملغي",
        color: "danger",
    },
};

// =====================================================
// Main Component
// =====================================================

function ClientDashboardPage() {
    const navigate = useNavigate();

    // =================================================
    // Discovery
    // =================================================

    const [discovery] = useState(() =>
        readStorage(DISCOVERY_KEY, {})
    );

    // =================================================
    // Project
    // =================================================

    const [project, setProject] = useState(() => {
        const stored = readStorage(PROJECT_KEY, null);

        if (stored) {
            return stored;
        }

        return createDefaultProject(
            readStorage(DISCOVERY_KEY, {})
        );
    });

    // =================================================
    // Dashboard State
    // =================================================

    const [activeSection, setActiveSection] =
        useState("overview");

    const [sidebarOpen, setSidebarOpen] =
        useState(false);

    const [notificationsOpen, setNotificationsOpen] =
        useState(false);

    const [showProfileMenu, setShowProfileMenu] =
        useState(false);

    const [selectedService, setSelectedService] =
        useState(null);

    const [selectedFileCategory, setSelectedFileCategory] =
        useState("all");

    // =================================================
    // Notifications
    // =================================================

    const [notifications, setNotifications] =
        useState(() =>
            readStorage(NOTIFICATIONS_KEY, [])
        );

    // =================================================
    // Messages
    // =================================================

    const [messages, setMessages] =
        useState(() =>
            readStorage(MESSAGES_KEY, [])
        );

    const [messageText, setMessageText] =
        useState("");

    // =================================================
    // Meetings
    // =================================================

    const [meetings] =
        useState(() =>
            readStorage(MEETINGS_KEY, [])
        );

    // =================================================
    // Files
    // =================================================

    const [files, setFiles] =
        useState(() =>
            readStorage(FILES_KEY, [])
        );

    // =================================================
    // Invoices
    // =================================================

    const [invoices, setInvoices] =
        useState(() =>
            readStorage(INVOICES_KEY, [])
        );

    // =================================================
    // Additional Requests
    // =================================================

    const [additionalRequests, setAdditionalRequests] =
        useState(() =>
            readStorage(REQUESTS_KEY, [])
        );

    // =================================================
    // Support
    // =================================================

    const [supportTickets, setSupportTickets] =
        useState(() =>
            readStorage(SUPPORT_KEY, [])
        );

    // =================================================
    // Approvals
    // =================================================

    const [approvals, setApprovals] =
        useState(() =>
            readStorage(APPROVALS_KEY, [])
        );

    // =================================================
    // New Request
    // =================================================

    const [newRequestText, setNewRequestText] =
        useState("");

    // =================================================
    // Support
    // =================================================

    const [supportText, setSupportText] =
        useState("");

    // =================================================
    // Save Project
    // =================================================

    useEffect(() => {
        writeStorage(PROJECT_KEY, project);
    }, [project]);

    // =================================================
    // Save Dashboard Data
    // =================================================

    useEffect(() => {
        writeStorage(
            NOTIFICATIONS_KEY,
            notifications
        );
    }, [notifications]);

    useEffect(() => {
        writeStorage(
            MESSAGES_KEY,
            messages
        );
    }, [messages]);

    useEffect(() => {
        writeStorage(
            FILES_KEY,
            files
        );
    }, [files]);

    useEffect(() => {
        writeStorage(
            INVOICES_KEY,
            invoices
        );
    }, [invoices]);

    useEffect(() => {
        writeStorage(
            REQUESTS_KEY,
            additionalRequests
        );
    }, [additionalRequests]);

    useEffect(() => {
        writeStorage(
            SUPPORT_KEY,
            supportTickets
        );
    }, [supportTickets]);

    useEffect(() => {
        writeStorage(
            APPROVALS_KEY,
            approvals
        );
    }, [approvals]);

    // =================================================
    // Initialize Invoice
    // =================================================

    useEffect(() => {
        if (
            invoices.length === 0 &&
            project.status !== "pending_company_approval"
        ) {
            const invoice =
                createInitialInvoice(
                    discovery,
                    project
                );

            setInvoices([invoice]);
        }
    }, []);

    // =================================================
    // Listen To Company Dashboard Updates
    // =================================================

    useEffect(() => {
        const handleStorage = (event) => {
            if (
                event.key === PROJECT_KEY &&
                event.newValue
            ) {
                try {
                    setProject(
                        JSON.parse(
                            event.newValue
                        )
                    );
                } catch {
                    // Ignore invalid storage.
                }
            }

            if (
                event.key === APPROVALS_KEY &&
                event.newValue
            ) {
                try {
                    setApprovals(
                        JSON.parse(
                            event.newValue
                        )
                    );
                } catch {
                    // Ignore invalid storage.
                }
            }

            if (
                event.key === INVOICES_KEY &&
                event.newValue
            ) {
                try {
                    setInvoices(
                        JSON.parse(
                            event.newValue
                        )
                    );
                } catch {
                    // Ignore invalid storage.
                }
            }

            if (
                event.key === NOTIFICATIONS_KEY &&
                event.newValue
            ) {
                try {
                    setNotifications(
                        JSON.parse(
                            event.newValue
                        )
                    );
                } catch {
                    // Ignore invalid storage.
                }
            }
        };

        window.addEventListener(
            "storage",
            handleStorage
        );

        return () => {
            window.removeEventListener(
                "storage",
                handleStorage
            );
        };
    }, []);

    // =================================================
    // Calculations
    // =================================================

    const totalServices =
        project.services?.length || 0;

    const completedTasks =
        project.tasks?.filter(
            (task) =>
                task.status === "completed"
        ).length || 0;

    const activeTasks =
        project.tasks?.filter(
            (task) =>
                task.status === "in_progress"
        ).length || 0;

    const waitingTasks =
        project.tasks?.filter(
            (task) =>
                task.status === "waiting_client"
        ).length || 0;

    const remainingTasks =
        project.tasks?.filter(
            (task) =>
                task.status !== "completed"
        ).length || 0;

    const pendingApprovals =
        approvals.filter(
            (approval) =>
                approval.status === "pending"
        ).length;

    const unreadNotifications =
        notifications.filter(
            (notification) =>
                !notification.read
        ).length;

    const totalInvoices =
        invoices.reduce(
            (sum, invoice) =>
                sum + Number(invoice.amount || 0),
            0
        );

    const totalPaid =
        invoices.reduce(
            (sum, invoice) =>
                sum + Number(invoice.paid || 0),
            0
        );

    const totalRemaining =
        Math.max(
            totalInvoices - totalPaid,
            0
        );

    const projectProgress =
        project.status ===
            "pending_company_approval" ||
        project.status === "awaiting_payment"
            ? 0
            : Number(project.progress || 0);

    const currentStatus =
        PROJECT_STATUS[
            project.status
        ] || PROJECT_STATUS.pending_company_approval;

    // =================================================
    // Chart Data
    // =================================================

    const serviceChartData =
        useMemo(() => {
            return (
                project.services || []
            ).map((service) => ({
                ...service,
                progress:
                    project.status ===
                        "pending_company_approval" ||
                    project.status ===
                        "awaiting_payment"
                        ? 0
                        : Number(
                            service.progress ||
                            0
                        ),
            }));
        }, [
            project.services,
            project.status,
        ]);

    // =================================================
    // Add Notification
    // =================================================

    const addNotification = (
        title,
        message,
        type = "info"
    ) => {
        const notification = {
            id: `notification_${Date.now()}`,
            title,
            message,
            type,
            read: false,
            createdAt:
                new Date().toISOString(),
        };

        setNotifications((prev) => [
            notification,
            ...prev,
        ]);
    };

    // =================================================
    // Mark Notifications Read
    // =================================================

    const markNotificationsRead = () => {
        setNotifications((prev) =>
            prev.map((item) => ({
                ...item,
                read: true,
            }))
        );
    };

    // =================================================
    // Send Message
    // =================================================

    const sendMessage = () => {
        const text =
            messageText.trim();

        if (!text) {
            return;
        }

        const message = {
            id: `message_${Date.now()}`,
            sender: "client",
            senderName:
                discovery.contactName ||
                "العميل",
            text,
            createdAt:
                new Date().toISOString(),
            status: "sent",
        };

        setMessages((prev) => [
            ...prev,
            message,
        ]);

        setMessageText("");

        addNotification(
            "رسالة جديدة",
            "تم إرسال رسالتك إلى فريق SABARAT.",
            "message"
        );
    };

    // =================================================
    // Submit Additional Request
    // =================================================

    const submitAdditionalRequest = () => {
        const text =
            newRequestText.trim();

        if (!text) {
            return;
        }

        const request = {
            id: `request_${Date.now()}`,
            text,
            status: "pending",
            cost: 0,
            createdAt:
                new Date().toISOString(),
        };

        setAdditionalRequests(
            (prev) => [
                request,
                ...prev,
            ]
        );

        setNewRequestText("");

        addNotification(
            "طلب إضافي جديد",
            "تم إرسال طلبك إلى فريق SABARAT للمراجعة.",
            "request"
        );
    };

    // =================================================
    // Create Support Ticket
    // =================================================

    const createSupportTicket = () => {
        const text =
            supportText.trim();

        if (!text) {
            return;
        }

        const ticket = {
            id: `ticket_${Date.now()}`,
            title: "طلب دعم جديد",
            message: text,
            status: "open",
            createdAt:
                new Date().toISOString(),
        };

        setSupportTickets(
            (prev) => [
                ticket,
                ...prev,
            ]
        );

        setSupportText("");

        addNotification(
            "تذكرة دعم جديدة",
            "تم إنشاء تذكرة الدعم الخاصة بك.",
            "support"
        );
    };

    // =================================================
    // Client Approval
    // =================================================

    const submitApproval = (
        approvalId,
        status,
        comment = ""
    ) => {
        setApprovals((prev) =>
            prev.map((approval) =>
                approval.id === approvalId
                    ? {
                        ...approval,
                        status,
                        comment,
                        updatedAt:
                            new Date().toISOString(),
                    }
                    : approval
            )
        );

        const approval =
            approvals.find(
                (item) =>
                    item.id === approvalId
            );

        if (approval) {
            addNotification(
                status === "approved"
                    ? "تمت الموافقة"
                    : "تم طلب تعديل",
                approval.title,
                status === "approved"
                    ? "success"
                    : "warning"
            );
        }
    };

    // =================================================
    // Pay Invoice
    // =================================================

    const startPayment = (
        invoice
    ) => {
        if (!invoice) {
            return;
        }

        navigate(
            "/client-dashboard/payment",
            {
                state: {
                    invoice,
                    project,
                    discovery,
                },
            }
        );
    };

    // =================================================
    // Logout
    // =================================================

    const handleLogout = () => {
        navigate("/login");
    };

    // =================================================
    // Sidebar Items
    // =================================================

    const sidebarItems = [
        {
            id: "overview",
            label: "الرئيسية",
            icon: LayoutDashboard,
        },
        {
            id: "status",
            label: "حالة المشروع",
            icon: Activity,
        },
        {
            id: "services",
            label: "الخدمات المطلوبة",
            icon: Sparkles,
        },
        {
            id: "tasks",
            label: "المهام والتسليمات",
            icon: CheckCircle2,
        },
        {
            id: "approvals",
            label: "الموافقات",
            icon: FileCheck2,
            badge: pendingApprovals,
        },
        {
            id: "files",
            label: "الملفات والمستندات",
            icon: FolderOpen,
        },
        {
            id: "notifications",
            label: "الإشعارات",
            icon: Bell,
            badge: unreadNotifications,
        },
        {
            id: "messages",
            label: "الرسائل",
            icon: MessageCircle,
        },
        {
            id: "meetings",
            label: "الاجتماعات",
            icon: CalendarDays,
        },
        {
            id: "payments",
            label: "الفواتير والدفع",
            icon: Wallet,
        },
        {
            id: "requests",
            label: "الطلبات الإضافية",
            icon: Plus,
        },
        {
            id: "support",
            label: "الدعم",
            icon: LifeBuoy,
        },
        {
            id: "account",
            label: "بيانات الحساب",
            icon: User,
        },
    ];

    // =================================================
    // Render
    // =================================================

    return (
        <div
            dir="rtl"
            className="min-h-screen bg-[#F8FAFC] text-[#0F172A]"
        >
            {/* =================================================
                01. HEADER
            ================================================= */}

            <header className="sticky top-0 z-50 border-b border-[#E2E8F0] bg-white/95 backdrop-blur">
                <div className="flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            onClick={() =>
                                setSidebarOpen(true)
                            }
                            className="rounded-xl p-2 text-slate-600 hover:bg-[#EAF6FC] lg:hidden"
                        >
                            <Menu size={23} />
                        </button>

                        <div className="flex items-center gap-3">
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#5EA8CC] text-white shadow-lg shadow-[#5EA8CC]/20">
                                <Sparkles size={21} />
                            </div>

                            <div>
                                <p className="font-black">
                                    SABARAT
                                </p>

                                <p className="text-xs text-slate-500">
                                    بوابة العميل
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="hidden text-right md:block">
                        <p className="text-sm font-bold text-slate-500">
                            مرحبًا بك
                        </p>

                        <p className="font-black text-slate-900">
                            {discovery.companyName ||
                                "شركة العميل"}
                        </p>
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            onClick={() => {
                                setActiveSection(
                                    "notifications"
                                );
                                markNotificationsRead();
                            }}
                            className="relative rounded-xl p-3 text-slate-600 transition hover:bg-[#EAF6FC] hover:text-[#5EA8CC]"
                        >
                            <Bell size={20} />

                            {unreadNotifications >
                                0 && (
                                    <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#EF4444] px-1 text-[10px] font-black text-white">
                                        {
                                            unreadNotifications
                                        }
                                    </span>
                                )}
                        </button>

                        <div className="relative">
                            <button
                                type="button"
                                onClick={() =>
                                    setShowProfileMenu(
                                        (prev) =>
                                            !prev
                                    )
                                }
                                className="flex items-center gap-2 rounded-xl p-1.5 transition hover:bg-slate-50"
                            >
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EAF6FC] text-[#5EA8CC]">
                                    <User size={19} />
                                </div>

                                <ChevronDown
                                    size={16}
                                    className="hidden text-slate-400 sm:block"
                                />
                            </button>

                            {showProfileMenu && (
                                <div className="absolute left-0 top-14 w-52 overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white p-2 shadow-xl">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setActiveSection(
                                                "account"
                                            );
                                            setShowProfileMenu(
                                                false
                                            );
                                        }}
                                        className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-right text-sm font-bold hover:bg-[#EAF6FC]"
                                    >
                                        <Settings
                                            size={17}
                                        />
                                        إعدادات الحساب
                                    </button>

                                    <button
                                        type="button"
                                        onClick={
                                            handleLogout
                                        }
                                        className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-right text-sm font-bold text-[#EF4444] hover:bg-red-50"
                                    >
                                        <LogOut
                                            size={17}
                                        />
                                        تسجيل الخروج
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            {/* =================================================
                SIDEBAR
            ================================================= */}

            {sidebarOpen && (
                <button
                    type="button"
                    aria-label="إغلاق القائمة"
                    onClick={() =>
                        setSidebarOpen(false)
                    }
                    className="fixed inset-0 z-[55] bg-slate-950/40 lg:hidden"
                />
            )}

            <aside
                className={`
                    fixed
                    right-0
                    top-0
                    z-[60]
                    h-screen
                    w-80
                    border-l
                    border-[#E2E8F0]
                    bg-white
                    transition-transform
                    duration-300
                    lg:translate-x-0
                    ${
                        sidebarOpen
                            ? "translate-x-0"
                            : "translate-x-full"
                    }
                `}
            >
                <div className="flex h-full flex-col">
                    <div className="flex items-center justify-between border-b border-slate-100 p-5">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#5EA8CC] text-white">
                                <Sparkles
                                    size={18}
                                />
                            </div>

                            <div>
                                <p className="font-black">
                                    لوحة العميل
                                </p>

                                <p className="text-xs text-slate-400">
                                    SABARAT
                                </p>
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={() =>
                                setSidebarOpen(false)
                            }
                            className="rounded-xl p-2 text-slate-400 hover:bg-slate-100 lg:hidden"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    <div className="border-b border-slate-100 p-5">
                        <div className="rounded-2xl bg-[#EAF6FC] p-4">
                            <p className="text-xs font-bold text-[#5EA8CC]">
                                العميل
                            </p>

                            <p className="mt-1 font-black text-slate-900">
                                {discovery.companyName ||
                                    "شركة العميل"}
                            </p>

                            <p className="mt-1 text-xs text-slate-500">
                                {discovery.contactName ||
                                    "مسؤول التواصل"}
                            </p>

                            <div className="mt-4">
                                <StatusBadge
                                    status={
                                        project.status
                                    }
                                    label={
                                        currentStatus.label
                                    }
                                />
                            </div>
                        </div>
                    </div>

                    <nav className="flex-1 space-y-1 overflow-y-auto p-4">
                        {sidebarItems.map(
                            (item) => {
                                const Icon =
                                    item.icon;

                                const active =
                                    activeSection ===
                                    item.id;

                                return (
                                    <button
                                        type="button"
                                        key={item.id}
                                        onClick={() => {
                                            setActiveSection(
                                                item.id
                                            );
                                            setSidebarOpen(
                                                false
                                            );

                                            if (
                                                item.id ===
                                                "notifications"
                                            ) {
                                                markNotificationsRead();
                                            }
                                        }}
                                        className={`
                                            flex
                                            w-full
                                            items-center
                                            gap-3
                                            rounded-xl
                                            px-4
                                            py-3
                                            text-right
                                            text-sm
                                            font-bold
                                            transition
                                            ${
                                                active
                                                    ? "bg-[#EAF6FC] text-[#4A8EAE]"
                                                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                                            }
                                        `}
                                    >
                                        <Icon
                                            size={18}
                                        />

                                        <span className="flex-1">
                                            {
                                                item.label
                                            }
                                        </span>

                                        {item.badge >
                                            0 && (
                                            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#EF4444] px-1 text-[10px] font-black text-white">
                                                {
                                                    item.badge
                                                }
                                            </span>
                                        )}
                                    </button>
                                );
                            }
                        )}
                    </nav>

                    <div className="border-t border-slate-100 p-4">
                        <button
                            type="button"
                            onClick={() =>
                                setActiveSection(
                                    "support"
                                )
                            }
                            className="flex w-full items-center gap-3 rounded-xl bg-slate-50 p-4 text-right"
                        >
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#5EA8CC] shadow-sm">
                                <Headphones
                                    size={18}
                                />
                            </div>

                            <div>
                                <p className="text-sm font-black">
                                    تحتاج مساعدة؟
                                </p>

                                <p className="text-xs text-slate-500">
                                    فريق الدعم متاح لك
                                </p>
                            </div>
                        </button>
                    </div>
                </div>
            </aside>

            {/* =================================================
                MAIN
            ================================================= */}

            <main className="lg:mr-80">
                <div className="mx-auto max-w-[1600px] p-4 sm:p-6 lg:p-8">
                    {activeSection ===
                        "overview" && (
                        <OverviewSection
                            discovery={
                                discovery
                            }
                            project={
                                project
                            }
                            currentStatus={
                                currentStatus
                            }
                            projectProgress={
                                projectProgress
                            }
                            totalServices={
                                totalServices
                            }
                            completedTasks={
                                completedTasks
                            }
                            activeTasks={
                                activeTasks
                            }
                            remainingTasks={
                                remainingTasks
                            }
                            waitingTasks={
                                waitingTasks
                            }
                            pendingApprovals={
                                pendingApprovals
                            }
                            totalInvoices={
                                totalInvoices
                            }
                            totalPaid={
                                totalPaid
                            }
                            totalRemaining={
                                totalRemaining
                            }
                            serviceChartData={
                                serviceChartData
                            }
                            onNavigate={
                                setActiveSection
                            }
                        />
                    )}

                    {activeSection ===
                        "status" && (
                        <ProjectStatusSection
                            project={project}
                            progress={
                                projectProgress
                            }
                        />
                    )}

                    {activeSection ===
                        "services" && (
                        <ServicesSection
                            services={
                                serviceChartData
                            }
                            selectedService={
                                selectedService
                            }
                            setSelectedService={
                                setSelectedService
                            }
                            projectStarted={
                                project.projectStarted
                            }
                        />
                    )}

                    {activeSection ===
                        "tasks" && (
                        <TasksSection
                            project={
                                project
                            }
                        />
                    )}

                    {activeSection ===
                        "approvals" && (
                        <ApprovalsSection
                            approvals={
                                approvals
                            }
                            onApprove={(
                                id
                            ) =>
                                submitApproval(
                                    id,
                                    "approved"
                                )
                            }
                            onRequestEdit={(
                                id
                            ) =>
                                submitApproval(
                                    id,
                                    "revision_requested"
                                )
                            }
                        />
                    )}

                    {activeSection ===
                        "files" && (
                        <FilesSection
                            files={files}
                            setFiles={setFiles}
                            selectedCategory={
                                selectedFileCategory
                            }
                            setSelectedCategory={
                                setSelectedFileCategory
                            }
                        />
                    )}

                    {activeSection ===
                        "notifications" && (
                        <NotificationsSection
                            notifications={
                                notifications
                            }
                            onRead={
                                markNotificationsRead
                            }
                        />
                    )}

                    {activeSection ===
                        "messages" && (
                        <MessagesSection
                            messages={
                                messages
                            }
                            messageText={
                                messageText
                            }
                            setMessageText={
                                setMessageText
                            }
                            onSend={
                                sendMessage
                            }
                        />
                    )}

                    {activeSection ===
                        "meetings" && (
                        <MeetingsSection
                            meetings={
                                meetings
                            }
                        />
                    )}

                    {activeSection ===
                        "payments" && (
                        <PaymentsSection
                            invoices={
                                invoices
                            }
                            totalInvoices={
                                totalInvoices
                            }
                            totalPaid={
                                totalPaid
                            }
                            totalRemaining={
                                totalRemaining
                            }
                            onPay={
                                startPayment
                            }
                        />
                    )}

                    {activeSection ===
                        "requests" && (
                        <AdditionalRequestsSection
                            requests={
                                additionalRequests
                            }
                            text={
                                newRequestText
                            }
                            setText={
                                setNewRequestText
                            }
                            onSubmit={
                                submitAdditionalRequest
                            }
                        />
                    )}

                    {activeSection ===
                        "support" && (
                        <SupportSection
                            tickets={
                                supportTickets
                            }
                            text={
                                supportText
                            }
                            setText={
                                setSupportText
                            }
                            onSubmit={
                                createSupportTicket
                            }
                        />
                    )}

                    {activeSection ===
                        "account" && (
                        <AccountSummarySection
                            discovery={
                                discovery
                            }
                        />
                    )}
                </div>
            </main>
        </div>
    );
}

// =====================================================
// 02. OVERVIEW
// =====================================================

function OverviewSection({
    discovery,
    project,
    currentStatus,
    projectProgress,
    totalServices,
    completedTasks,
    activeTasks,
    remainingTasks,
    waitingTasks,
    pendingApprovals,
    totalInvoices,
    totalPaid,
    totalRemaining,
    serviceChartData,
    onNavigate,
}) {
    const projectNotStarted =
        !project.companyApproved ||
        !project.projectStarted ||
        project.status ===
            "pending_company_approval" ||
        project.status ===
            "awaiting_payment";

    return (
        <div className="space-y-8">
            {/* Header */}

            <SectionHeading
                eyebrow="لوحة التحكم"
                title={`مرحبًا ${discovery.contactName || "بك"}`}
                description="من هنا يمكنك متابعة مشروعك، الخدمات المطلوبة، الموافقات، الملفات، الفواتير وجميع التحديثات."
            />

            {/* Start State */}

            {projectNotStarted && (
                <div className="overflow-hidden rounded-[2rem] border border-[#EAF6FC] bg-gradient-to-br from-white to-[#EAF6FC] p-6 shadow-sm lg:p-8">
                    <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                        <div className="max-w-3xl">
                            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-black text-[#5EA8CC] shadow-sm">
                                <Clock3
                                    size={15}
                                />
                                المشروع لم يبدأ بعد
                            </div>

                            <h2 className="text-2xl font-black text-slate-950 sm:text-3xl">
                                {project.status ===
                                "pending_company_approval"
                                    ? "طلبك قيد المراجعة من فريق SABARAT"
                                    : "المشروع جاهز للانتقال إلى مرحلة التنفيذ بعد استكمال الدفع"}
                            </h2>

                            <p className="mt-3 leading-7 text-slate-600">
                                ستبقى نسبة الإنجاز
                                الحالية صفرًا حتى
                                يتم اعتماد الطلب
                                من إدارة الشركة
                                واستكمال متطلبات
                                بدء المشروع.
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={() =>
                                onNavigate(
                                    "payments"
                                )
                            }
                            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#5EA8CC] px-6 py-3.5 font-black text-white shadow-lg shadow-[#5EA8CC]/20 transition hover:-translate-y-0.5 hover:bg-[#4d96ba]"
                        >
                            عرض حالة الدفع
                            <ArrowLeft
                                size={18}
                            />
                        </button>
                    </div>
                </div>
            )}

            {/* Progress Overview */}

            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-6">
                <MetricCard
                    title="نسبة الإنجاز"
                    value={`${projectProgress}%`}
                    icon={Activity}
                    primary
                />

                <MetricCard
                    title="الخدمات"
                    value={
                        totalServices
                    }
                    icon={Sparkles}
                />

                <MetricCard
                    title="المهام المنجزة"
                    value={
                        completedTasks
                    }
                    icon={
                        CheckCircle2
                    }
                />

                <MetricCard
                    title="قيد التنفيذ"
                    value={
                        activeTasks
                    }
                    icon={Activity}
                />

                <MetricCard
                    title="المتبقي"
                    value={
                        remainingTasks
                    }
                    icon={Clock3}
                />

                <MetricCard
                    title="الموافقات"
                    value={
                        pendingApprovals
                    }
                    icon={
                        FileCheck2
                    }
                    danger={
                        pendingApprovals >
                        0
                    }
                />
            </div>

            {/* Charts */}

            <div className="grid gap-6 xl:grid-cols-3">
                <ProgressChart
                    progress={
                        projectProgress
                    }
                    status={
                        currentStatus.label
                    }
                />

                <StagesChart
                    project={
                        project
                    }
                />

                <PaymentChart
                    total={
                        totalInvoices
                    }
                    paid={
                        totalPaid
                    }
                    remaining={
                        totalRemaining
                    }
                />
            </div>

            {/* Services Progress */}

            <Card>
                <SectionTitle
                    title="تقدم الخدمات"
                    subtitle="الخدمات التي طلبتها من نموذج الاحتياج"
                />

                <div className="mt-6 space-y-5">
                    {serviceChartData.length ===
                    0 ? (
                        <EmptyState
                            icon={
                                Sparkles
                            }
                            title="لم يتم تحديد خدمات بعد"
                            description="ستظهر الخدمات المختارة من نموذج الاحتياج هنا."
                        />
                    ) : (
                        serviceChartData.map(
                            (
                                service
                            ) => (
                                <ServiceProgressRow
                                    key={
                                        service.id
                                    }
                                    service={
                                        service
                                    }
                                />
                            )
                        )
                    )}
                </div>
            </Card>

            {/* Current Status */}

            <div className="grid gap-6 lg:grid-cols-2">
                <Card>
                    <SectionTitle
                        title="حالة المشروع"
                        subtitle="آخر حالة معتمدة للمشروع"
                    />

                    <div className="mt-6 rounded-2xl bg-slate-50 p-5">
                        <StatusBadge
                            status={
                                project.status
                            }
                            label={
                                currentStatus.label
                            }
                        />

                        <h3 className="mt-4 text-xl font-black">
                            {
                                project.currentStage
                            }
                        </h3>

                        <p className="mt-2 text-sm leading-6 text-slate-500">
                            المرحلة القادمة:
                            {" "}
                            {
                                project.nextStage
                            }
                        </p>

                        {project.expectedDate && (
                            <div className="mt-4 flex items-center gap-2 text-sm font-bold text-slate-600">
                                <CalendarDays
                                    size={17}
                                />
                                الموعد المتوقع:
                                {" "}
                                {formatDate(
                                    project.expectedDate
                                )}
                            </div>
                        )}
                    </div>
                </Card>

                <Card>
                    <SectionTitle
                        title="ملخص الدفع"
                        subtitle="المعلومات المالية الحالية"
                    />

                    <div className="mt-6 grid grid-cols-3 gap-3">
                        <SmallStat
                            label="الإجمالي"
                            value={formatMoney(
                                totalInvoices,
                                discovery
                                    ?.budget
                                    ?.currency ||
                                    "USD"
                            )}
                        />

                        <SmallStat
                            label="المدفوع"
                            value={formatMoney(
                                totalPaid,
                                discovery
                                    ?.budget
                                    ?.currency ||
                                    "USD"
                            )}
                        />

                        <SmallStat
                            label="المتبقي"
                            value={formatMoney(
                                totalRemaining,
                                discovery
                                    ?.budget
                                    ?.currency ||
                                    "USD"
                            )}
                        />
                    </div>

                    <button
                        type="button"
                        onClick={() =>
                            onNavigate(
                                "payments"
                            )
                        }
                        className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-[#87BCD8] bg-[#EAF6FC] px-4 py-3 font-black text-[#4A8EAE] transition hover:bg-[#dff1fa]"
                    >
                        فتح الفواتير والدفع
                        <ArrowLeft
                            size={17}
                        />
                    </button>
                </Card>
            </div>
        </div>
    );
}

// =====================================================
// 03. PROGRESS CHART
// =====================================================

function ProgressChart({
    progress,
    status,
}) {
    const radius = 52;
    const circumference =
        2 * Math.PI * radius;

    const offset =
        circumference -
        (progress / 100) *
            circumference;

    return (
        <Card>
            <SectionTitle
                title="التقدم الإجمالي"
                subtitle="نسبة الإنجاز الحالية"
            />

            <div className="flex items-center justify-center py-8">
                <div className="relative h-40 w-40">
                    <svg
                        viewBox="0 0 140 140"
                        className="h-full w-full -rotate-90"
                    >
                        <circle
                            cx="70"
                            cy="70"
                            r={radius}
                            fill="none"
                            stroke="#EAF6FC"
                            strokeWidth="12"
                        />

                        <circle
                            cx="70"
                            cy="70"
                            r={radius}
                            fill="none"
                            stroke="#5EA8CC"
                            strokeWidth="12"
                            strokeLinecap="round"
                            strokeDasharray={
                                circumference
                            }
                            strokeDashoffset={
                                offset
                            }
                        />
                    </svg>

                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-3xl font-black">
                            {progress}%
                        </span>

                        <span className="text-xs font-bold text-slate-400">
                            مكتمل
                        </span>
                    </div>
                </div>
            </div>

            <div className="rounded-xl bg-slate-50 p-3 text-center text-xs font-bold text-slate-500">
                {status}
            </div>
        </Card>
    );
}

// =====================================================
// 04. STAGES CHART
// =====================================================

function StagesChart({
    project,
}) {
    const stages = [
        {
            label: "الطلب",
            status: "completed",
        },
        {
            label: "الاعتماد",
            status:
                project.companyApproved
                    ? "completed"
                    : "current",
        },
        {
            label: "الدفع",
            status:
                project.paymentStatus ===
                "paid"
                    ? "completed"
                    : project.companyApproved
                        ? "current"
                        : "pending",
        },
        {
            label: "التنفيذ",
            status:
                project.projectStarted
                    ? "completed"
                    : "pending",
        },
        {
            label: "التسليم",
            status:
                project.status ===
                "completed"
                    ? "completed"
                    : "pending",
        },
    ];

    return (
        <Card>
            <SectionTitle
                title="مراحل المشروع"
                subtitle="رحلة المشروع من الطلب إلى التسليم"
            />

            <div className="mt-7 space-y-5">
                {stages.map(
                    (
                        stage,
                        index
                    ) => (
                        <div
                            key={
                                stage.label
                            }
                            className="flex items-center gap-3"
                        >
                            <div
                                className={`
                                    flex
                                    h-9
                                    w-9
                                    shrink-0
                                    items-center
                                    justify-center
                                    rounded-full
                                    ${
                                        stage.status ===
                                        "completed"
                                            ? "bg-[#22C55E] text-white"
                                            : stage.status ===
                                                "current"
                                                ? "bg-[#5EA8CC] text-white"
                                                : "bg-slate-100 text-slate-400"
                                    }
                                `}
                            >
                                {stage.status ===
                                "completed" ? (
                                    <Check
                                        size={
                                            17
                                        }
                                    />
                                ) : (
                                    index +
                                    1
                                )}
                            </div>

                            <div className="flex-1">
                                <p className="text-sm font-black">
                                    {
                                        stage.label
                                    }
                                
                                </p>

                                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-100">
                                    <div
                                        className={`
                                            h-full
                                            rounded-full
                                            ${
                                                stage.status ===
                                                "completed"
                                                    ? "w-full bg-[#22C55E]"
                                                    : stage.status ===
                                                        "current"
                                                        ? "w-1/2 bg-[#5EA8CC]"
                                                        : "w-0"
                                            }
                                        `}
                                    />
                                </div>
                            </div>
                        </div>
                    )
                )}
            </div>
        </Card>
    );
}

// =====================================================
// 05. PAYMENT CHART
// =====================================================

function PaymentChart({
    total,
    paid,
    remaining,
}) {
    const percentage =
        total > 0
            ? Math.round(
                (paid / total) *
                    100
            )
            : 0;

    return (
        <Card>
            <SectionTitle
                title="المدفوعات"
                subtitle="حالة الالتزام المالي"
            />

            <div className="mt-7">
                <div className="flex items-end justify-between">
                    <span className="text-3xl font-black">
                        {percentage}%
                    </span>

                    <span className="text-xs font-bold text-slate-400">
                        من إجمالي الفواتير
                    </span>
                </div>

                <div className="mt-4 h-4 overflow-hidden rounded-full bg-slate-100">
                    <div
                        className="h-full rounded-full bg-[#22C55E] transition-all duration-700"
                        style={{
                            width: `${percentage}%`,
                        }}
                    />
                </div>

                <div className="mt-6 space-y-3">
                    <PaymentLine
                        label="الإجمالي"
                        value={total}
                    />

                    <PaymentLine
                        label="المدفوع"
                        value={paid}
                        success
                    />

                    <PaymentLine
                        label="المتبقي"
                        value={remaining}
                        warning
                    />
                </div>
            </div>
        </Card>
    );
}

// =====================================================
// 06. PROJECT STATUS
// =====================================================

function ProjectStatusSection({
    project,
    progress,
}) {
    return (
        <div className="space-y-8">
            <SectionHeading
                eyebrow="متابعة المشروع"
                title="حالة مشروعك"
                description="تابع المرحلة الحالية وما تم إنجازه وما سيحدث بعد ذلك."
            />

            <Card>
                <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                        <StatusBadge
                            status={
                                project.status
                            }
                            label={
                                PROJECT_STATUS[
                                    project
                                        .status
                                ]?.label ||
                                "غير محدد"
                            }
                        />

                        <h2 className="mt-4 text-2xl font-black">
                            {
                                project.currentStage
                            }
                        </h2>

                        <p className="mt-2 text-slate-500">
                            المرحلة القادمة:
                            {" "}
                            {
                                project.nextStage
                            }
                        </p>
                    </div>

                    <div className="text-center">
                        <p className="text-5xl font-black text-[#5EA8CC]">
                            {progress}%
                        </p>

                        <p className="mt-1 text-xs font-bold text-slate-400">
                            نسبة الإنجاز
                        </p>
                    </div>
                </div>
            </Card>

            <Card>
                <SectionTitle
                    title="خط سير المشروع"
                    subtitle="جميع المراحل المعتمدة"
                />

                <div className="mt-8 space-y-4">
                    {(
                        project.timeline ||
                        []
                    ).map(
                        (item) => (
                            <TimelineItem
                                key={
                                    item.id
                                }
                                item={
                                    item
                                }
                            />
                        )
                    )}
                </div>
            </Card>
        </div>
    );
}

// =====================================================
// 07. SERVICES
// =====================================================

function ServicesSection({
    services,
    selectedService,
    setSelectedService,
    projectStarted,
}) {
    return (
        <div className="space-y-8">
            <SectionHeading
                eyebrow="الخدمات"
                title="الخدمات المطلوبة"
                description="هذه الخدمات تم تحديدها بناءً على نموذج الاحتياج الذي قمت بتعبئته."
            />

            {services.length ===
            0 ? (
                <EmptyState
                    icon={Sparkles}
                    title="لا توجد خدمات محددة"
                    description="لم يتم اختيار خدمات في نموذج الاحتياج."
                />
            ) : (
                <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                    {services.map(
                        (service) => {
                            const Icon =
                                getServiceIcon(
                                    service.name
                                );

                            return (
                                <button
                                    type="button"
                                    key={
                                        service.id
                                    }
                                    onClick={() =>
                                        setSelectedService(
                                            service
                                        )
                                    }
                                    className="group rounded-[1.5rem] border border-[#E2E8F0] bg-white p-6 text-right shadow-sm transition hover:-translate-y-1 hover:border-[#87BCD8] hover:shadow-xl"
                                >
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EAF6FC] text-[#5EA8CC]">
                                            <Icon
                                                size={
                                                    21
                                                }
                                            />
                                        </div>

                                        <StatusBadge
                                            status={
                                                service.status ===
                                                "completed"
                                                    ? "completed"
                                                    : projectStarted
                                                        ? "in_progress"
                                                        : "pending_company_approval"
                                            }
                                            label={
                                                service.status ===
                                                "completed"
                                                    ? "مكتمل"
                                                    : projectStarted
                                                        ? "قيد التنفيذ"
                                                        : "بانتظار البدء"
                                            }
                                        />
                                    </div>

                                    <h3 className="mt-6 text-lg font-black">
                                        {
                                            service.name
                                        }
                                    </h3>

                                    <div className="mt-5">
                                        <div className="flex items-center justify-between text-xs font-bold text-slate-400">
                                            <span>
                                                التقدم
                                            </span>

                                            <span>
                                                {
                                                    service.progress
                                                }
                                                %
                                            </span>
                                        </div>

                                        <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
                                            <div
                                                className="h-full rounded-full bg-[#5EA8CC] transition-all"
                                                style={{
                                                    width: `${service.progress}%`,
                                                }}
                                            />
                                        </div>
                                    </div>

                                    <div className="mt-5 flex items-center justify-between text-xs text-slate-400">
                                        <span>
                                            المسؤول:
                                        </span>

                                        <span className="font-bold text-slate-600">
                                            {
                                                service.manager
                                            }
                                        </span>
                                    </div>
                                </button>
                            );
                        }
                    )}
                </div>
            )}

            {selectedService && (
                <Modal
                    title={
                        selectedService.name
                    }
                    onClose={() =>
                        setSelectedService(
                            null
                        )
                    }
                >
                    <div className="space-y-5">
                        <div className="rounded-2xl bg-[#EAF6FC] p-5">
                            <p className="text-sm font-bold text-slate-500">
                                نسبة الإنجاز
                            </p>

                            <p className="mt-1 text-4xl font-black text-[#5EA8CC]">
                                {
                                    selectedService.progress
                                }
                                %
                            </p>
                        </div>

                        <InfoRow
                            label="الحالة"
                            value={
                                selectedService.status
                            }
                        />

                        <InfoRow
                            label="المسؤول"
                            value={
                                selectedService.manager
                            }
                        />

                        <InfoRow
                            label="آخر تحديث"
                            value={
                                formatDate(
                                    selectedService.updatedAt
                                )
                            }
                        />
                    </div>
                </Modal>
            )}
        </div>
    );
}

// =====================================================
// 08. TASKS & DELIVERABLES
// =====================================================

function TasksSection({
    project,
}) {
    const tasks =
        project.tasks || [];

    const completed =
        tasks.filter(
            (item) =>
                item.status ===
                "completed"
        );

    const active =
        tasks.filter(
            (item) =>
                item.status ===
                "in_progress"
        );

    const waiting =
        tasks.filter(
            (item) =>
                item.status ===
                "waiting_client"
        );

    return (
        <div className="space-y-8">
            <SectionHeading
                eyebrow="التنفيذ"
                title="المهام والتسليمات"
                description="تعرف على الأعمال التي تم إنجازها والتي يعمل عليها الفريق وما يحتاج إلى إجراء منك."
            />

            <div className="grid gap-6 xl:grid-cols-3">
                <TaskColumn
                    title="منجز"
                    icon={CheckCircle2}
                    color="success"
                    tasks={
                        completed
                    }
                />

                <TaskColumn
                    title="قيد التنفيذ"
                    icon={Activity}
                    color="primary"
                    tasks={
                        active
                    }
                />

                <TaskColumn
                    title="بانتظار العميل"
                    icon={Clock3}
                    color="warning"
                    tasks={
                        waiting
                    }
                />
            </div>

            <Card>
                <SectionTitle
                    title="التسليمات"
                    subtitle="الملفات التي تم تجهيزها للمشروع"
                />

                {(
                    project.deliverables ||
                    []
                ).length ===
                0 ? (
                    <div className="mt-6">
                        <EmptyState
                            icon={
                                FileCheck2
                            }
                            title="لا توجد تسليمات حتى الآن"
                            description="ستظهر التسليمات هنا بعد بدء العمل واعتمادها من الفريق."
                        />
                    </div>
                ) : (
                    <div className="mt-6 grid gap-4 md:grid-cols-2">
                        {project.deliverables.map(
                            (
                                deliverable
                            ) => (
                                <div
                                    key={
                                        deliverable.id
                                    }
                                    className="rounded-2xl border border-slate-200 p-5"
                                >
                                    <div className="flex items-start justify-between">
                                        <FileText
                                            className="text-[#5EA8CC]"
                                        />

                                        <StatusBadge
                                            status={
                                                deliverable.status
                                            }
                                            label={
                                                deliverable.statusLabel ||
                                                deliverable.status
                                            }
                                        />
                                    </div>

                                    <h3 className="mt-4 font-black">
                                        {
                                            deliverable.title
                                        }
                                    </h3>

                                    <p className="mt-2 text-sm text-slate-500">
                                        {
                                            deliverable.description
                                        }
                                    </p>
                                </div>
                            )
                        )}
                    </div>
                )}
            </Card>
        </div>
    );
}

// =====================================================
// 09. APPROVALS
// =====================================================

function ApprovalsSection({
    approvals,
    onApprove,
    onRequestEdit,
}) {
    const pending =
        approvals.filter(
            (item) =>
                item.status ===
                "pending"
        );

    const approved =
        approvals.filter(
            (item) =>
                item.status ===
                "approved"
        );

    const revisions =
        approvals.filter(
            (item) =>
                item.status ===
                "revision_requested"
        );

    return (
        <div className="space-y-8">
            <SectionHeading
                eyebrow="الموافقات"
                title="الموافقات والتعديلات"
                description="ستجد هنا كل العناصر التي تحتاج إلى اعتمادك قبل الانتقال للمرحلة التالية."
            />

            <div className="grid gap-5 md:grid-cols-3">
                <MetricCard
                    title="بانتظار الموافقة"
                    value={
                        pending.length
                    }
                    icon={
                        Clock3
                    }
                    warning={
                        pending.length >
                        0
                    }
                />

                <MetricCard
                    title="تمت الموافقة"
                    value={
                        approved.length
                    }
                    icon={
                        CheckCircle2
                    }
                    success
                />

                <MetricCard
                    title="يحتاج تعديل"
                    value={
                        revisions.length
                    }
                    icon={
                        AlertCircle
                    }
                    warning={
                        revisions.length >
                        0
                    }
                />
            </div>

            <div className="space-y-5">
                {pending.length ===
                0 ? (
                    <EmptyState
                        icon={
                            FileCheck2
                        }
                        title="لا توجد موافقات معلقة"
                        description="لا يوجد حاليًا أي عنصر يحتاج إلى موافقتك."
                    />
                ) : (
                    pending.map(
                        (approval) => (
                            <ApprovalCard
                                key={
                                    approval.id
                                }
                                approval={
                                    approval
                                }
                                onApprove={() =>
                                    onApprove(
                                        approval.id
                                    )
                                }
                                onRequestEdit={() =>
                                    onRequestEdit(
                                        approval.id
                                    )
                                }
                            />
                        )
                    )
                )}
            </div>
        </div>
    );
}

// =====================================================
// 10. FILES
// =====================================================

function FilesSection({
    files,
    setFiles,
    selectedCategory,
    setSelectedCategory,
}) {
    const categories = [
        {
            id: "all",
            label: "الكل",
        },
        {
            id: "client",
            label: "ملفات العميل",
        },
        {
            id: "team",
            label: "ملفات الفريق",
        },
        {
            id: "deliverables",
            label: "التسليمات",
        },
        {
            id: "shared",
            label: "الملفات المشتركة",
        },
    ];

    const filteredFiles =
        selectedCategory ===
        "all"
            ? files
            : files.filter(
                (file) =>
                    file.category ===
                    selectedCategory
            );

    const handleUpload = (
        event
    ) => {
        const selected =
            Array.from(
                event.target.files ||
                    []
            );

        if (!selected.length) {
            return;
        }

        const newFiles =
            selected.map(
                (file) => ({
                    id: `file_${Date.now()}_${Math.random()}`,
                    name: file.name,
                    size: file.size,
                    type: file.type,
                    category:
                        "client",
                    uploadedBy:
                        "العميل",
                    createdAt:
                        new Date().toISOString(),
                })
            );

        setFiles((prev) => [
            ...newFiles,
            ...prev,
        ]);
    };

    return (
        <div className="space-y-8">
            <SectionHeading
                eyebrow="المستندات"
                title="الملفات والمستندات"
                description="ارفع ملفاتك واستعرض الملفات التي يشاركها معك فريق SABARAT."
            />

            <Card>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <SectionTitle
                            title="ملفات المشروع"
                            subtitle={`${filteredFiles.length} ملف`}
                        />
                    </div>

                    <label className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#5EA8CC] px-5 py-3 font-black text-white shadow-lg shadow-[#5EA8CC]/20">
                        <Upload
                            size={18}
                        />
                        رفع ملف

                        <input
                            type="file"
                            multiple
                            className="hidden"
                            onChange={
                                handleUpload
                            }
                        />
                    </label>
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                    {categories.map(
                        (category) => (
                            <button
                                type="button"
                                key={
                                    category.id
                                }
                                onClick={() =>
                                    setSelectedCategory(
                                        category.id
                                    )
                                }
                                className={`rounded-xl px-4 py-2 text-sm font-bold transition ${
                                    selectedCategory ===
                                    category.id
                                        ? "bg-[#EAF6FC] text-[#4A8EAE]"
                                        : "bg-slate-50 text-slate-500 hover:bg-slate-100"
                                }`}
                            >
                                {
                                    category.label
                                }
                            </button>
                        )
                    )}
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {filteredFiles.length ===
                    0 ? (
                        <div className="md:col-span-2 xl:col-span-3">
                            <EmptyState
                                icon={
                                    FolderOpen
                                }
                                title="لا توجد ملفات"
                                description="لم يتم رفع ملفات في هذا القسم بعد."
                            />
                        </div>
                    ) : (
                        filteredFiles.map(
                            (
                                file
                            ) => (
                                <div
                                    key={
                                        file.id
                                    }
                                    className="rounded-2xl border border-slate-200 p-5"
                                >
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EAF6FC] text-[#5EA8CC]">
                                            <FileText
                                                size={
                                                    20
                                                }
                                            />
                                        </div>

                                        <button
                                            type="button"
                                            className="rounded-lg p-2 text-slate-400 hover:bg-slate-50"
                                        >
                                            <Download
                                                size={
                                                    17
                                                }
                                            />
                                        </button>
                                    </div>

                                    <h3 className="mt-4 truncate font-black">
                                        {
                                            file.name
                                        }
                                    </h3>

                                    <div className="mt-2 text-xs text-slate-400">
                                        رفع بواسطة:
                                        {" "}
                                        {
                                            file.uploadedBy
                                        }
                                    </div>

                                    <div className="mt-1 text-xs text-slate-400">
                                        {
                                            formatDate(
                                                file.createdAt
                                            )
                                        }
                                    </div>
                                </div>
                            )
                        )
                    )}
                </div>
            </Card>
        </div>
    );
}

// =====================================================
// 11. NOTIFICATIONS
// =====================================================

function NotificationsSection({
    notifications,
}) {
    return (
        <div className="space-y-8">
            <SectionHeading
                eyebrow="التحديثات"
                title="الإشعارات"
                description="كل ما يخص مشروعك سيظهر هنا بشكل مرتب."
            />

            <Card>
                <div className="space-y-3">
                    {notifications.length ===
                    0 ? (
                        <EmptyState
                            icon={
                                Bell
                            }
                            title="لا توجد إشعارات"
                            description="ستظهر هنا تحديثات المشروع والموافقات والفواتير."
                        />
                    ) : (
                        notifications.map(
                            (
                                notification
                            ) => (
                                <NotificationRow
                                    key={
                                        notification.id
                                    }
                                    notification={
                                        notification
                                    }
                                />
                            )
                        )
                    )}
                </div>
            </Card>
        </div>
    );
}

// =====================================================
// 12. MESSAGES
// =====================================================

function MessagesSection({
    messages,
    messageText,
    setMessageText,
    onSend,
}) {
    return (
        <div className="space-y-8">
            <SectionHeading
                eyebrow="التواصل"
                title="الرسائل"
                description="تواصل مباشرة مع فريق SABARAT من داخل لوحة العميل."
            />

            <Card>
                <div className="h-[500px] overflow-y-auto rounded-2xl bg-slate-50 p-4">
                    {messages.length ===
                    0 ? (
                        <div className="flex h-full items-center justify-center">
                            <EmptyState
                                icon={
                                    MessageCircle
                                }
                                title="لا توجد رسائل"
                                description="ابدأ المحادثة مع فريق المشروع."
                            />
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {messages.map(
                                (
                                    message
                                ) => (
                                    <div
                                        key={
                                            message.id
                                        }
                                        className={`flex ${
                                            message.sender ===
                                            "client"
                                                ? "justify-start"
                                                : "justify-end"
                                        }`}
                                    >
                                        <div
                                            className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                                                message.sender ===
                                                "client"
                                                    ? "bg-[#5EA8CC] text-white"
                                                    : "bg-white text-slate-800 shadow-sm"
                                            }`}
                                        >
                                            <p className="text-sm leading-6">
                                                {
                                                    message.text
                                                }
                                            </p>

                                            <p
                                                className={`mt-2 text-[10px] ${
                                                    message.sender ===
                                                    "client"
                                                        ? "text-white/70"
                                                        : "text-slate-400"
                                                }`}
                                            >
                                                {formatDate(
                                                    message.createdAt
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                )
                            )}
                        </div>
                    )}
                </div>

                <div className="mt-4 flex gap-3">
                    <button
                        type="button"
                        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 hover:bg-slate-50"
                    >
                        <Paperclip
                            size={19}
                        />
                    </button>

                    <input
                        value={
                            messageText
                        }
                        onChange={(e) =>
                            setMessageText(
                                e.target.value
                            )
                        }
                        onKeyDown={(e) => {
                            if (
                                e.key ===
                                "Enter"
                            ) {
                                onSend();
                            }
                        }}
                        placeholder="اكتب رسالتك..."
                        className="flex-1 rounded-xl border border-slate-200 bg-white px-4 outline-none focus:border-[#5EA8CC] focus:ring-4 focus:ring-[#5EA8CC]/10"
                    />

                    <button
                        type="button"
                        onClick={
                            onSend
                        }
                        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#5EA8CC] text-white shadow-lg shadow-[#5EA8CC]/20"
                    >
                        <Send
                            size={18}
                        />
                    </button>
                </div>
            </Card>
        </div>
    );
}

// =====================================================
// 13. MEETINGS
// =====================================================

function MeetingsSection({
    meetings,
}) {
    const upcoming =
        meetings.filter(
            (meeting) =>
                meeting.status ===
                "upcoming"
        );

    const previous =
        meetings.filter(
            (meeting) =>
                meeting.status ===
                "completed"
        );

    return (
        <div className="space-y-8">
            <SectionHeading
                eyebrow="المواعيد"
                title="الاجتماعات"
                description="تابع الاجتماعات القادمة والسابقة وملاحظات فريق المشروع."
            />

            <div className="grid gap-6 lg:grid-cols-2">
                <Card>
                    <SectionTitle
                        title="الاجتماع القادم"
                        subtitle="أقرب موعد مع الفريق"
                    />

                    {upcoming.length ===
                    0 ? (
                        <div className="mt-6">
                            <EmptyState
                                icon={
                                    CalendarDays
                                }
                                title="لا يوجد اجتماع قادم"
                                description="سيظهر الموعد هنا عند جدولة اجتماع جديد."
                            />
                        </div>
                    ) : (
                        <div className="mt-6 space-y-4">
                            {upcoming.map(
                                (
                                    meeting
                                ) => (
                                    <MeetingCard
                                        key={
                                            meeting.id
                                        }
                                        meeting={
                                            meeting
                                        }
                                    />
                                )
                            )}
                        </div>
                    )}
                </Card>

                <Card>
                    <SectionTitle
                        title="الاجتماعات السابقة"
                        subtitle="السجل السابق"
                    />

                    {previous.length ===
                    0 ? (
                        <div className="mt-6">
                            <EmptyState
                                icon={
                                    CalendarDays
                                }
                                title="لا توجد اجتماعات سابقة"
                                description="سيظهر سجل الاجتماعات هنا."
                            />
                        </div>
                    ) : (
                        <div className="mt-6 space-y-4">
                            {previous.map(
                                (
                                    meeting
                                ) => (
                                    <MeetingCard
                                        key={
                                            meeting.id
                                        }
                                        meeting={
                                            meeting
                                        }
                                    />
                                )
                            )}
                        </div>
                    )}
                </Card>
            </div>
        </div>
    );
}

// =====================================================
// 14. INVOICES & PAYMENTS
// =====================================================

function PaymentsSection({
    invoices,
    totalInvoices,
    totalPaid,
    totalRemaining,
    onPay,
}) {
    const currency =
        invoices[0]?.currency ||
        "USD";

    return (
        <div className="space-y-8">
            <SectionHeading
                eyebrow="المالية"
                title="الفواتير والدفع"
                description="تابع قيمة المشروع والفواتير والمدفوعات والمتبقي."
            />

            <div className="grid gap-5 md:grid-cols-3">
                <MetricCard
                    title="إجمالي الفواتير"
                    value={formatMoney(
                        totalInvoices,
                        currency
                    )}
                    icon={
                        Receipt
                    }
                />

                <MetricCard
                    title="إجمالي المدفوع"
                    value={formatMoney(
                        totalPaid,
                        currency
                    )}
                    icon={
                        CheckCircle2
                    }
                    success
                />

                <MetricCard
                    title="المبلغ المتبقي"
                    value={formatMoney(
                        totalRemaining,
                        currency
                    )}
                    icon={
                        Wallet
                    }
                    warning={
                        totalRemaining >
                        0
                    }
                />
            </div>

            <Card>
                <SectionTitle
                    title="الفواتير"
                    subtitle="جميع الفواتير المرتبطة بالمشروع"
                />

                <div className="mt-6 overflow-x-auto">
                    {invoices.length ===
                    0 ? (
                        <EmptyState
                            icon={
                                Receipt
                            }
                            title="لا توجد فواتير"
                            description="ستظهر الفواتير هنا بعد اعتماد المشروع."
                        />
                    ) : (
                        <div className="min-w-[800px] overflow-hidden rounded-2xl border border-slate-200">
                            <div className="grid grid-cols-6 gap-4 bg-slate-50 px-5 py-4 text-xs font-black text-slate-500">
                                <span>
                                    الفاتورة
                                </span>

                                <span>
                                    التاريخ
                                </span>

                                <span>
                                    الإجمالي
                                </span>

                                <span>
                                    المدفوع
                                </span>

                                <span>
                                    المتبقي
                                </span>

                                <span>
                                    الحالة
                                </span>
                            </div>

                            {invoices.map(
                                (
                                    invoice
                                ) => {
                                    const remaining =
                                        Math.max(
                                            Number(
                                                invoice.amount ||
                                                    0
                                            ) -
                                            Number(
                                                invoice.paid ||
                                                    0
                                            ),
                                            0
                                        );

                                    return (
                                        <div
                                            key={
                                                invoice.id
                                            }
                                            className="grid grid-cols-6 items-center gap-4 border-t border-slate-100 px-5 py-5"
                                        >
                                            <div>
                                                <p className="font-black">
                                                    {
                                                        invoice.title
                                                    }
                                                </p>

                                                <p className="mt-1 text-xs text-slate-400">
                                                    {
                                                        invoice.id
                                                    }
                                                </p>
                                            </div>

                                            <span className="text-sm text-slate-500">
                                                {formatDate(
                                                    invoice.createdAt
                                                )}
                                            </span>

                                            <span className="font-bold">
                                                {formatMoney(
                                                    invoice.amount,
                                                    invoice.currency
                                                )}
                                            </span>

                                            <span className="font-bold text-[#22C55E]">
                                                {formatMoney(
                                                    invoice.paid,
                                                    invoice.currency
                                                )}
                                            </span>

                                            <span className="font-bold text-[#F59E0B]">
                                                {formatMoney(
                                                    remaining,
                                                    invoice.currency
                                                )}
                                            </span>

                                            <div>
                                                {remaining >
                                                    0 ? (
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            onPay(
                                                                invoice
                                                            )
                                                        }
                                                        className="inline-flex items-center gap-2 rounded-xl bg-[#5EA8CC] px-4 py-2 text-xs font-black text-white"
                                                    >
                                                        <CreditCard
                                                            size={
                                                                15
                                                            }
                                                        />
                                                        دفع
                                                    </button>
                                                ) : (
                                                    <StatusBadge
                                                        status="completed"
                                                        label="مدفوعة"
                                                    />
                                                )}
                                            </div>
                                        </div>
                                    );
                                }
                            )}
                        </div>
                    )}
                </div>
            </Card>

            <PaymentMethodsInfo />
        </div>
    );
}

// =====================================================
// 15. PAYMENT METHODS
// =====================================================

function PaymentMethodsInfo() {
    const methods = [
        {
            title: "البطاقة البنكية",
            description:
                "الدفع باستخدام Visa أو Mastercard أو البطاقات المدعومة.",
            icon: CreditCard,
        },
        {
            title: "تحويل بنكي",
            description:
                "تحويل المبلغ إلى الحساب البنكي الخاص بالشركة ثم إرفاق إثبات الدفع.",
            icon: Wallet,
        },
        {
            title: "محفظة إلكترونية",
            description:
                "الدفع من خلال المحفظة الإلكترونية المعتمدة من الشركة.",
            icon: CircleDollarSign,
        },
    ];

    return (
        <Card>
            <SectionTitle
                title="طرق الدفع المتاحة"
                subtitle="اختر الطريقة المناسبة لك عند فتح الفاتورة"
            />

            <div className="mt-6 grid gap-5 md:grid-cols-3">
                {methods.map(
                    (method) => {
                        const Icon =
                            method.icon;

                        return (
                            <div
                                key={
                                    method.title
                                }
                                className="rounded-2xl border border-slate-200 p-5 transition hover:-translate-y-1 hover:border-[#87BCD8] hover:shadow-lg"
                            >
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EAF6FC] text-[#5EA8CC]">
                                    <Icon
                                        size={
                                            21
                                        }
                                    />
                                </div>

                                <h3 className="mt-5 font-black">
                                    {
                                        method.title
                                    }
                                </h3>

                                <p className="mt-2 text-sm leading-6 text-slate-500">
                                    {
                                        method.description
                                    }
                                </p>
                            </div>
                        );
                    }
                )}
            </div>
        </Card>
    );
}

// =====================================================
// 16. ADDITIONAL REQUESTS
// =====================================================

function AdditionalRequestsSection({
    requests,
    text,
    setText,
    onSubmit,
}) {
    return (
        <div className="space-y-8">
            <SectionHeading
                eyebrow="طلبات إضافية"
                title="طلبات المشروع الإضافية"
                description="يمكنك طلب خدمة أو تعديل جديد خارج نطاق العمل الحالي."
            />

            <Card>
                <SectionTitle
                    title="إنشاء طلب جديد"
                    subtitle="سيقوم الفريق بمراجعته وتحديد التكلفة والمدة إن وجدت."
                />

                <textarea
                    value={text}
                    onChange={(e) =>
                        setText(
                            e.target.value
                        )
                    }
                    rows={5}
                    placeholder="اكتب تفاصيل الطلب..."
                    className="mt-6 w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 p-4 outline-none focus:border-[#5EA8CC] focus:bg-white focus:ring-4 focus:ring-[#5EA8CC]/10"
                />

                <button
                    type="button"
                    onClick={
                        onSubmit
                    }
                    className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[#5EA8CC] px-5 py-3 font-black text-white"
                >
                    <Plus size={18} />
                    إرسال الطلب
                </button>
            </Card>

            <Card>
                <SectionTitle
                    title="الطلبات السابقة"
                    subtitle={`${requests.length} طلب`}
                />

                <div className="mt-6 space-y-4">
                    {requests.length ===
                    0 ? (
                        <EmptyState
                            icon={
                                Plus
                            }
                            title="لا توجد طلبات إضافية"
                            description="ستظهر الطلبات التي تنشئها هنا."
                        />
                    ) : (
                        requests.map(
                            (
                                request
                            ) => (
                                <div
                                    key={
                                        request.id
                                    }
                                    className="rounded-2xl border border-slate-200 p-5"
                                >
                                    <div className="flex items-start justify-between gap-4">
                                        <p className="leading-7">
                                            {
                                                request.text
                                            }
                                        </p>

                                        <StatusBadge
                                            status={
                                                request.status
                                            }
                                            label={
                                                request.status ===
                                                "pending"
                                                    ? "قيد المراجعة"
                                                    : request.status
                                            }
                                        />
                                    </div>

                                    <div className="mt-4 flex flex-wrap gap-4 text-xs text-slate-400">
                                        <span>
                                            {
                                                formatDate(
                                                    request.createdAt
                                                )
                                            }
                                        </span>

                                        {request.cost >
                                            0 && (
                                            <span>
                                                التكلفة:
                                                {" "}
                                                {formatMoney(
                                                    request.cost
                                                )}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            )
                        )
                    )}
                </div>
            </Card>
        </div>
    );
}

// =====================================================
// 17. SUPPORT
// =====================================================

function SupportSection({
    tickets,
    text,
    setText,
    onSubmit,
}) {
    return (
        <div className="space-y-8">
            <SectionHeading
                eyebrow="الدعم"
                title="مركز الدعم"
                description="إذا واجهت أي مشكلة في المشروع أو الدفع أو الملفات، يمكنك فتح تذكرة."
            />

            <Card>
                <SectionTitle
                    title="فتح تذكرة دعم"
                    subtitle="سيقوم فريق الدعم بمتابعة طلبك"
                />

                <textarea
                    value={text}
                    onChange={(e) =>
                        setText(
                            e.target.value
                        )
                    }
                    rows={5}
                    placeholder="اشرح المشكلة أو الاستفسار..."
                    className="mt-6 w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 p-4 outline-none focus:border-[#5EA8CC] focus:bg-white focus:ring-4 focus:ring-[#5EA8CC]/10"
                />

                <button
                    type="button"
                    onClick={
                        onSubmit
                    }
                    className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[#5EA8CC] px-5 py-3 font-black text-white"
                >
                    <Send size={17} />
                    فتح التذكرة
                </button>
            </Card>

            <Card>
                <SectionTitle
                    title="تذاكر الدعم"
                    subtitle={`${tickets.length} تذكرة`}
                />

                <div className="mt-6 space-y-4">
                    {tickets.length ===
                    0 ? (
                        <EmptyState
                            icon={
                                LifeBuoy
                            }
                            title="لا توجد تذاكر"
                            description="ستظهر تذاكر الدعم هنا."
                        />
                    ) : (
                        tickets.map(
                            (
                                ticket
                            ) => (
                                <div
                                    key={
                                        ticket.id
                                    }
                                    className="rounded-2xl border border-slate-200 p-5"
                                >
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <h3 className="font-black">
                                                {
                                                    ticket.title
                                                }
                                            </h3>

                                            <p className="mt-2 text-sm leading-6 text-slate-500">
                                                {
                                                    ticket.message
                                                }
                                            </p>
                                        </div>

                                        <StatusBadge
                                            status={
                                                ticket.status
                                            }
                                            label={
                                                ticket.status ===
                                                "open"
                                                    ? "مفتوحة"
                                                    : "مغلقة"
                                            }
                                        />
                                    </div>

                                    <p className="mt-4 text-xs text-slate-400">
                                        {
                                            formatDate(
                                                ticket.createdAt
                                            )
                                        }
                                    </p>
                                </div>
                            )
                        )
                    )}
                </div>
            </Card>
        </div>
    );
}

// =====================================================
// 18. ACCOUNT SUMMARY
// =====================================================

function AccountSummarySection({
    discovery,
}) {
    return (
        <div className="space-y-8">
            <SectionHeading
                eyebrow="الحساب"
                title="بيانات الشركة"
                description="ملخص البيانات التي تم إدخالها في نموذج الاحتياج."
            />

            <div className="grid gap-6 lg:grid-cols-2">
                <Card>
                    <SectionTitle
                        title="المعلومات الأساسية"
                    />

                    <div className="mt-6 space-y-4">
                        <InfoRow
                            label="الشركة"
                            value={
                                discovery.companyName
                            }
                        />

                        <InfoRow
                            label="مسؤول التواصل"
                            value={
                                discovery.contactName
                            }
                        />

                        <InfoRow
                            label="المسمى الوظيفي"
                            value={
                                discovery.jobTitle
                            }
                        />

                        <InfoRow
                            label="الهاتف"
                            value={
                                discovery.phone
                            }
                        />

                        <InfoRow
                            label="البريد"
                            value={
                                discovery.email
                            }
                        />

                        <InfoRow
                            label="المدينة"
                            value={
                                discovery.city
                            }
                        />
                    </div>
                </Card>

                <Card>
                    <SectionTitle
                        title="النشاط التجاري"
                    />

                    <div className="mt-6 space-y-4">
                        <InfoRow
                            label="المجال"
                            value={
                                discovery.businessField
                            }
                        />

                        <InfoRow
                            label="سنوات العمل"
                            value={
                                discovery.yearsInBusiness
                            }
                        />

                        <InfoRow
                            label="المنتجات والخدمات"
                            value={
                                discovery.productsServices
                            }
                        />

                        <InfoRow
                            label="الميزة التنافسية"
                            value={
                                discovery.competitiveAdvantage
                            }
                        />
                    </div>
                </Card>

                <Card>
                    <SectionTitle
                        title="الأهداف"
                    />

                    <TagList
                        items={
                            discovery.marketingGoals
                        }
                    />
                </Card>

                <Card>
                    <SectionTitle
                        title="التحديات"
                    />

                    <TagList
                        items={
                            discovery.challenges
                        }
                    />
                </Card>

                <Card>
                    <SectionTitle
                        title="الخدمات"
                    />

                    <TagList
                        items={
                            discovery.services
                        }
                    />
                </Card>

                <Card>
                    <SectionTitle
                        title="الجمهور المستهدف"
                    />

                    <div className="mt-6 space-y-4">
                        <InfoRow
                            label="العمر"
                            value={
                                discovery
                                    .audience
                                    ?.age
                            }
                        />

                        <InfoRow
                            label="الجنس"
                            value={
                                discovery
                                    .audience
                                    ?.gender
                            }
                        />

                        <InfoRow
                            label="الموقع"
                            value={
                                discovery
                                    .audience
                                    ?.location
                            }
                        />

                        <InfoRow
                            label="الاهتمامات"
                            value={
                                discovery
                                    .audience
                                    ?.interests
                            }
                        />
                    </div>
                </Card>
            </div>
        </div>
    );
}

// =====================================================
// Reusable Components
// =====================================================

function Card({
    children,
    className = "",
}) {
    return (
        <section
            className={`rounded-[1.5rem] border border-[#E2E8F0] bg-white p-5 shadow-sm sm:p-6 ${className}`}
        >
            {children}
        </section>
    );
}

function SectionHeading({
    eyebrow,
    title,
    description,
}) {
    return (
        <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#5EA8CC]">
                {eyebrow}
            </p>

            <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
                {title}
            </h1>

            {description && (
                <p className="mt-3 max-w-3xl leading-7 text-slate-500">
                    {description}
                </p>
            )}
        </div>
    );
}

function SectionTitle({
    title,
    subtitle,
}) {
    return (
        <div>
            <h2 className="text-xl font-black">
                {title}
            </h2>

            {subtitle && (
                <p className="mt-1 text-sm text-slate-400">
                    {subtitle}
                </p>
            )}
        </div>
    );
}

function MetricCard({
    title,
    value,
    icon: Icon,
    primary = false,
    success = false,
    warning = false,
    danger = false,
}) {
    let iconClass =
        "bg-slate-50 text-slate-500";

    if (primary) {
        iconClass =
            "bg-[#EAF6FC] text-[#5EA8CC]";
    }

    if (success) {
        iconClass =
            "bg-green-50 text-[#22C55E]";
    }

    if (warning) {
        iconClass =
            "bg-amber-50 text-[#F59E0B]";
    }

    if (danger) {
        iconClass =
            "bg-red-50 text-[#EF4444]";
    }

    return (
        <div className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between gap-3">
                <div>
                    <p className="text-xs font-bold text-slate-400">
                        {title}
                    </p>

                    <p className="mt-2 text-2xl font-black text-slate-950">
                        {value}
                    </p>
                </div>

                <div
                    className={`flex h-11 w-11 items-center justify-center rounded-xl ${iconClass}`}
                >
                    <Icon size={19} />
                </div>
            </div>
        </div>
    );
}

function StatusBadge({
    status,
    label,
}) {
    const config =
        PROJECT_STATUS[
            status
        ];

    const color =
        config?.color || "primary";

    const styles = {
        primary:
            "bg-[#EAF6FC] text-[#4A8EAE]",
        success:
            "bg-green-50 text-[#15803D]",
        warning:
            "bg-amber-50 text-[#B45309]",
        danger:
            "bg-red-50 text-[#B91C1C]",
    };

    return (
        <span
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-black ${styles[color]}`}
        >
            <span className="h-1.5 w-1.5 rounded-full bg-current" />
            {label}
        </span>
    );
}

function ServiceProgressRow({
    service,
}) {
    return (
        <div>
            <div className="flex items-center justify-between gap-4">
                <div>
                    <p className="font-black">
                        {
                            service.name
                        }
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                        المسؤول:
                        {" "}
                        {
                            service.manager
                        }
                    </p>
                </div>

                <span className="font-black text-[#5EA8CC]">
                    {
                        service.progress
                    }
                    %
                </span>
            </div>

            <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
                <div
                    className="h-full rounded-full bg-[#5EA8CC] transition-all duration-700"
                    style={{
                        width: `${service.progress}%`,
                    }}
                />
            </div>
        </div>
    );
}

function PaymentLine({
    label,
    value,
    success,
    warning,
}) {
    return (
        <div className="flex items-center justify-between text-sm">
            <span className="font-bold text-slate-500">
                {label}
            </span>

            <span
                className={`font-black ${
                    success
                        ? "text-[#22C55E]"
                        : warning
                            ? "text-[#F59E0B]"
                            : "text-slate-900"
                }`}
            >
                {formatMoney(
                    value
                )}
            </span>
        </div>
    );
}

function SmallStat({
    label,
    value,
}) {
    return (
        <div className="rounded-xl bg-slate-50 p-4 text-center">
            <p className="text-[10px] font-bold text-slate-400">
                {label}
            </p>

            <p className="mt-1 text-sm font-black">
                {value}
            </p>
        </div>
    );
}

function TaskColumn({
    title,
    icon: Icon,
    tasks,
}) {
    return (
        <Card>
            <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EAF6FC] text-[#5EA8CC]">
                    <Icon size={18} />
                </div>

                <div>
                    <h3 className="font-black">
                        {title}
                    </h3>

                    <p className="text-xs text-slate-400">
                        {tasks.length} مهمة
                    </p>
                </div>
            </div>

            <div className="mt-5 space-y-3">
                {tasks.length ===
                0 ? (
                    <div className="rounded-xl bg-slate-50 p-5 text-center text-xs font-bold text-slate-400">
                        لا توجد مهام
                    </div>
                ) : (
                    tasks.map(
                        (task) => (
                            <div
                                key={
                                    task.id
                                }
                                className="rounded-xl border border-slate-100 p-4"
                            >
                                <p className="font-black">
                                    {
                                        task.title
                                    }
                                </p>

                                {task.description && (
                                    <p className="mt-1 text-xs leading-5 text-slate-500">
                                        {
                                            task.description
                                        }
                                    </p>
                                )}

                                {task.dueDate && (
                                    <p className="mt-3 text-[10px] font-bold text-slate-400">
                                        الموعد:
                                        {" "}
                                        {formatDate(
                                            task.dueDate
                                        )}
                                    </p>
                                )}
                            </div>
                        )
                    )
                )}
            </div>
        </Card>
    );
}

function ApprovalCard({
    approval,
    onApprove,
    onRequestEdit,
}) {
    return (
        <Card>
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                <div>
                    <StatusBadge
                        status="awaiting_client_approval"
                        label="بانتظار موافقتك"
                    />

                    <h3 className="mt-4 text-xl font-black">
                        {
                            approval.title
                        }
                    </h3>

                    <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">
                        {
                            approval.description
                        }
                    </p>

                    {approval.version && (
                        <p className="mt-3 text-xs font-bold text-slate-400">
                            الإصدار:
                            {" "}
                            {
                                approval.version
                            }
                        </p>
                    )}
                </div>

                <div className="flex flex-wrap gap-2">
                    <button
                        type="button"
                        onClick={
                            onApprove
                        }
                        className="inline-flex items-center gap-2 rounded-xl bg-[#22C55E] px-5 py-3 text-sm font-black text-white"
                    >
                        <Check
                            size={17}
                        />
                        موافقة
                    </button>

                    <button
                        type="button"
                        onClick={
                            onRequestEdit
                        }
                        className="inline-flex items-center gap-2 rounded-xl bg-amber-50 px-5 py-3 text-sm font-black text-amber-700"
                    >
                        <AlertCircle
                            size={17}
                        />
                        يحتاج تعديل
                    </button>
                </div>
            </div>
        </Card>
    );
}

function NotificationRow({
    notification,
}) {
    const icons = {
        success: CheckCircle2,
        warning: AlertCircle,
        message: MessageCircle,
        invoice: Receipt,
        request: Plus,
        support: LifeBuoy,
        info: Info,
    };

    const Icon =
        icons[
            notification.type
        ] || Bell;

    return (
        <div
            className={`flex gap-4 rounded-2xl p-4 ${
                notification.read
                    ? "bg-white"
                    : "bg-[#EAF6FC]"
            }`}
        >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-[#5EA8CC] shadow-sm">
                <Icon size={18} />
            </div>

            <div className="min-w-0 flex-1">
                <div className="flex flex-col justify-between gap-1 sm:flex-row">
                    <p className="font-black">
                        {
                            notification.title
                        }
                    </p>

                    <span className="text-[10px] text-slate-400">
                        {
                            formatDate(
                                notification.createdAt
                            )
                        }
                    </span>
                </div>

                <p className="mt-1 text-sm leading-6 text-slate-500">
                    {
                        notification.message
                    }
                </p>
            </div>

            {!notification.read && (
                <span className="mt-2 h-2 w-2 rounded-full bg-[#5EA8CC]" />
            )}
        </div>
    );
}

function MeetingCard({
    meeting,
}) {
    return (
        <div className="rounded-2xl border border-slate-200 p-5">
            <div className="flex items-start justify-between gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EAF6FC] text-[#5EA8CC]">
                    <CalendarDays
                        size={20}
                    />
                </div>

                <StatusBadge
                    status={
                        meeting.status ===
                        "upcoming"
                            ? "ready_to_start"
                            : "completed"
                    }
                    label={
                        meeting.status ===
                        "upcoming"
                            ? "قادم"
                            : "مكتمل"
                    }
                />
            </div>

            <h3 className="mt-5 font-black">
                {
                    meeting.title
                }
            </h3>

            <p className="mt-2 text-sm text-slate-500">
                {
                    meeting.date
                        ? formatDate(
                            meeting.date
                        )
                        : "غير محدد"
                }
            </p>

            {meeting.notes && (
                <p className="mt-3 rounded-xl bg-slate-50 p-3 text-xs leading-5 text-slate-500">
                    {
                        meeting.notes
                    }
                </p>
            )}

            {meeting.link && (
                <a
                    href={
                        meeting.link
                    }
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 inline-flex items-center gap-2 text-sm font-black text-[#5EA8CC]"
                >
                    دخول الاجتماع
                    <ArrowLeft
                        size={15}
                    />
                </a>
            )}
        </div>
    );
}

function TimelineItem({
    item,
}) {
    const completed =
        item.status ===
        "completed";

    const current =
        item.status ===
        "current";

    return (
        <div className="flex gap-4">
            <div className="flex flex-col items-center">
                <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                        completed
                            ? "bg-[#22C55E] text-white"
                            : current
                                ? "bg-[#5EA8CC] text-white"
                                : "bg-slate-100 text-slate-400"
                    }`}
                >
                    {completed ? (
                        <Check
                            size={18}
                        />
                    ) : current ? (
                        <Activity
                            size={17}
                        />
                    ) : (
                        <Clock3
                            size={17}
                        />
                    )}
                </div>
            </div>

            <div className="pb-5">
                <p className="font-black">
                    {item.title}
                </p>

                {item.date && (
                    <p className="mt-1 text-xs text-slate-400">
                        {formatDate(
                            item.date
                        )}
                    </p>
                )}
            </div>
        </div>
    );
}

function InfoRow({
    label,
    value,
}) {
    return (
        <div className="flex flex-col gap-1 border-b border-slate-100 pb-3 last:border-0">
            <span className="text-xs font-bold text-slate-400">
                {label}
            </span>

            <span className="text-sm font-bold text-slate-700">
                {value ||
                    "غير محدد"}
            </span>
        </div>
    );
}

function TagList({
    items,
}) {
    const list =
        Array.isArray(items)
            ? items
            : [];

    if (list.length === 0) {
        return (
            <p className="mt-5 text-sm text-slate-400">
                لا توجد بيانات.
            </p>
        );
    }

    return (
        <div className="mt-5 flex flex-wrap gap-2">
            {list.map(
                (item) => (
                    <span
                        key={item}
                        className="rounded-xl bg-[#EAF6FC] px-3 py-2 text-xs font-bold text-[#4A8EAE]"
                    >
                        {item}
                    </span>
                )
            )}
        </div>
    );
}

function EmptyState({
    icon: Icon,
    title,
    description,
}) {
    return (
        <div className="flex flex-col items-center justify-center rounded-2xl bg-slate-50 p-8 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-slate-300 shadow-sm">
                <Icon size={24} />
            </div>

            <h3 className="mt-4 font-black text-slate-700">
                {title}
            </h3>

            <p className="mt-2 max-w-md text-sm leading-6 text-slate-400">
                {description}
            </p>
        </div>
    );
}

function Modal({
    title,
    children,
    onClose,
}) {
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/50 p-4">
            <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-[2rem] bg-white p-6 shadow-2xl">
                <div className="flex items-center justify-between gap-4">
                    <h2 className="text-xl font-black">
                        {title}
                    </h2>

                    <button
                        type="button"
                        onClick={
                            onClose
                        }
                        className="rounded-xl p-2 text-slate-400 hover:bg-slate-100"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="mt-6">
                    {children}
                </div>
            </div>
        </div>
    );
}

// =====================================================
// Export
// =====================================================

export default ClientDashboardPage;