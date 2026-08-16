const USERS_KEY = "sabarat_users";
const SESSION_KEY = "sabarat_session";

/*
|--------------------------------------------------------------------------
| Discovery Storage
|--------------------------------------------------------------------------
|
| Frontend-only development storage.
|
| لاحقًا مع Laravel سيتم استبدال هذا الجزء بـ API حقيقي.
|
*/

const DISCOVERY_REQUESTS_KEY =
    "sabarat_discovery_requests";

/* =========================================================
   Helpers
========================================================= */

function normalizeEmail(email) {
    return String(email || "")
        .trim()
        .toLowerCase();
}

function getUsers() {
    try {
        const users =
            localStorage.getItem(
                USERS_KEY
            );

        if (!users) {
            return [];
        }

        const parsedUsers =
            JSON.parse(users);

        return Array.isArray(parsedUsers)
            ? parsedUsers
            : [];
    } catch (error) {
        console.error(
            "Failed to read users:",
            error
        );

        return [];
    }
}

function saveUsers(users) {
    localStorage.setItem(
        USERS_KEY,
        JSON.stringify(users)
    );
}

function getDiscoveryRequests() {
    try {
        const requests =
            localStorage.getItem(
                DISCOVERY_REQUESTS_KEY
            );

        if (!requests) {
            return [];
        }

        const parsedRequests =
            JSON.parse(requests);

        return Array.isArray(
            parsedRequests
        )
            ? parsedRequests
            : [];
    } catch (error) {
        console.error(
            "Failed to read discovery requests:",
            error
        );

        return [];
    }
}

function saveDiscoveryRequests(
    requests
) {
    localStorage.setItem(
        DISCOVERY_REQUESTS_KEY,
        JSON.stringify(requests)
    );
}

function createUserId() {
    return (
        "user_" +
        Date.now() +
        "_" +
        Math.random()
            .toString(36)
            .substring(2, 9)
    );
}

function createDiscoveryId() {
    return (
        "discovery_" +
        Date.now() +
        "_" +
        Math.random()
            .toString(36)
            .substring(2, 9)
    );
}

/* =========================================================
   Validation
========================================================= */

export function validateRegistration({
    name,
    email,
    password,
    passwordConfirmation,
    terms,
}) {
    const errors = {};

    const cleanName =
        String(name || "").trim();

    const cleanEmail =
        normalizeEmail(email);

    /* Name */

    if (!cleanName) {
        errors.name =
            "Please enter your full name.";
    } else if (
        cleanName.length < 2
    ) {
        errors.name =
            "Your name must contain at least 2 characters.";
    }

    /* Email */

    if (!cleanEmail) {
        errors.email =
            "Please enter your email address.";
    } else if (
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
            cleanEmail
        )
    ) {
        errors.email =
            "Please enter a valid email address.";
    }

    /* Password */

    if (!password) {
        errors.password =
            "Please create a password.";
    } else if (
        password.length < 8
    ) {
        errors.password =
            "Password must contain at least 8 characters.";
    } else if (
        !/[A-Z]/.test(password)
    ) {
        errors.password =
            "Password must contain at least one uppercase letter.";
    } else if (
        !/[a-z]/.test(password)
    ) {
        errors.password =
            "Password must contain at least one lowercase letter.";
    } else if (
        !/[0-9]/.test(password)
    ) {
        errors.password =
            "Password must contain at least one number.";
    }

    /* Confirmation */

    if (!passwordConfirmation) {
        errors.passwordConfirmation =
            "Please confirm your password.";
    } else if (
        password !==
        passwordConfirmation
    ) {
        errors.passwordConfirmation =
            "Passwords do not match.";
    }

    /* Terms */

    if (!terms) {
        errors.terms =
            "You must accept the terms and conditions.";
    }

    return errors;
}

export function validateLogin({
    email,
    password,
}) {
    const errors = {};

    const cleanEmail =
        normalizeEmail(email);

    if (!cleanEmail) {
        errors.email =
            "Please enter your email address.";
    } else if (
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
            cleanEmail
        )
    ) {
        errors.email =
            "Please enter a valid email address.";
    }

    if (!password) {
        errors.password =
            "Please enter your password.";
    }

    return errors;
}

/* =========================================================
   Register
========================================================= */

export function registerUser({
    name,
    email,
    password,
}) {
    const users = getUsers();

    const normalizedEmail =
        normalizeEmail(email);

    const existingUser =
        users.find(
            (user) =>
                user.email ===
                normalizedEmail
        );

    /* Prevent duplicate accounts */

    if (existingUser) {
        return {
            success: false,
            error:
                "An account with this email already exists. Please sign in instead.",
            code: "EMAIL_EXISTS",
        };
    }

    /*
     * Frontend development only.
     *
     * IMPORTANT:
     * This password storage will NOT be used
     * in production.
     *
     * Laravel will replace this completely.
     */

    const user = {
        id: createUserId(),

        name:
            String(name || "").trim(),

        email:
            normalizedEmail,

        password,

        role: "client",

        status: "active",

        createdAt:
            new Date().toISOString(),

        profile: {
            companyName: "",
            phone: "",
            location: "",
        },

        project: {
            status: "not_started",

            progress: 0,

            service: "",

            requirements: "",

            submittedAt: null,
        },
    };

    users.push(user);

    saveUsers(users);

    createSession(user);

    return {
        success: true,

        user: sanitizeUser(user),
    };
}

/* =========================================================
   Login
========================================================= */

export function loginUser({
    email,
    password,
}) {
    const users = getUsers();

    const normalizedEmail =
        normalizeEmail(email);

    const user =
        users.find(
            (item) =>
                item.email ===
                normalizedEmail
        );

    /*
     * User does not exist
     */

    if (!user) {
        return {
            success: false,

            error:
                "No account was found with this email address. Please create an account first.",

            code: "USER_NOT_FOUND",
        };
    }

    /*
     * Wrong password
     */

    if (
        user.password !==
        password
    ) {
        return {
            success: false,

            error:
                "The email or password is incorrect.",

            code: "INVALID_CREDENTIALS",
        };
    }

    /*
     * Create authenticated session
     */

    createSession(user);

    return {
        success: true,

        user: sanitizeUser(user),
    };
}

/* =========================================================
   Session
========================================================= */

function createSession(user) {
    const session = {
        userId: user.id,

        role: user.role,

        loginAt:
            new Date().toISOString(),
    };

    localStorage.setItem(
        SESSION_KEY,
        JSON.stringify(session)
    );
}

export function getCurrentUser() {
    try {
        const sessionData =
            localStorage.getItem(
                SESSION_KEY
            );

        if (!sessionData) {
            return null;
        }

        const session =
            JSON.parse(sessionData);

        const users = getUsers();

        const user =
            users.find(
                (item) =>
                    item.id ===
                    session.userId
            );

        if (!user) {
            clearSession();

            return null;
        }

        return sanitizeUser(user);
    } catch (error) {
        console.error(
            "Failed to read session:",
            error
        );

        return null;
    }
}

export function isAuthenticated() {
    return Boolean(
        getCurrentUser()
    );
}

export function logoutUser() {
    clearSession();
}

function clearSession() {
    localStorage.removeItem(
        SESSION_KEY
    );
}

/* =========================================================
   Current User ID
========================================================= */

export function getCurrentUserId() {
    try {
        const sessionData =
            localStorage.getItem(
                SESSION_KEY
            );

        if (!sessionData) {
            return null;
        }

        const session =
            JSON.parse(sessionData);

        return session.userId || null;
    } catch (error) {
        console.error(
            "Failed to get current user ID:",
            error
        );

        return null;
    }
}

/* =========================================================
   Update User
========================================================= */

export function updateCurrentUser(
    updates
) {
    const sessionData =
        localStorage.getItem(
            SESSION_KEY
        );

    if (!sessionData) {
        return {
            success: false,

            error:
                "No active session.",
        };
    }

    try {
        const session =
            JSON.parse(sessionData);

        const users = getUsers();

        const index =
            users.findIndex(
                (user) =>
                    user.id ===
                    session.userId
            );

        if (index === -1) {
            return {
                success: false,

                error:
                    "User not found.",
            };
        }

        users[index] = {
            ...users[index],
            ...updates,
        };

        saveUsers(users);

        return {
            success: true,

            user: sanitizeUser(
                users[index]
            ),
        };
    } catch (error) {
        console.error(
            "Failed to update user:",
            error
        );

        return {
            success: false,

            error:
                "Failed to update account.",
        };
    }
}

/* =========================================================
   Discovery Request
========================================================= */

/*
 * Save the complete Client Discovery form
 * for the currently authenticated client.
 *
 * This is the bridge between:
 *
 * ClientDiscoveryForm
 *          ↓
 * Authentication
 *          ↓
 * ClientDashboardPage
 *
 * Laravel will replace this function later.
 */

export function saveDiscoveryRequest(
    formData
) {
    const user =
        getCurrentUser();

    if (!user) {
        return {
            success: false,

            error:
                "You must sign in before submitting your discovery request.",

            code: "AUTH_REQUIRED",
        };
    }

    try {
        const requests =
            getDiscoveryRequests();

        const existingIndex =
            requests.findIndex(
                (request) =>
                    request.userId ===
                    user.id
            );

        const discoveryRequest = {
            id:
                existingIndex >= 0
                    ? requests[
                        existingIndex
                    ].id
                    : createDiscoveryId(),

            userId: user.id,

            status: "submitted",

            progress: 0,

            submittedAt:
                new Date().toISOString(),

            updatedAt:
                new Date().toISOString(),

            /*
             * Complete discovery form.
             *
             * We intentionally keep all fields
             * for the frontend dashboard.
             */

            formData:
                structuredClone(
                    formData
                ),
        };

        if (
            existingIndex >= 0
        ) {
            requests[
                existingIndex
            ] =
                discoveryRequest;
        } else {
            requests.push(
                discoveryRequest
            );
        }

        saveDiscoveryRequests(
            requests
        );

        /*
         * Update user's project summary
         */

        const selectedServices =
            Array.isArray(
                formData.services
            )
                ? formData.services
                : [];

        updateCurrentUser({
            profile: {
                ...(user.profile || {}),

                companyName:
                    formData.companyName ||
                    "",

                phone:
                    formData.phone ||
                    "",

                location:
                    formData.city ||
                    "",
            },

            project: {
                ...(user.project || {}),

                status: "submitted",

                progress: 0,

                service:
                    selectedServices.join(
                        ", "
                    ),

                requirements:
                    formData.expectations ||
                    "",

                submittedAt:
                    new Date().toISOString(),
            },
        });

        return {
            success: true,

            request:
                discoveryRequest,
        };
    } catch (error) {
        console.error(
            "Failed to save discovery request:",
            error
        );

        return {
            success: false,

            error:
                "Failed to save your discovery request.",
        };
    }
}

/* =========================================================
   Get Current Discovery Request
========================================================= */

export function getCurrentDiscoveryRequest() {
    const user =
        getCurrentUser();

    if (!user) {
        return null;
    }

    const requests =
        getDiscoveryRequests();

    const request =
        requests.find(
            (item) =>
                item.userId ===
                user.id
        );

    return request || null;
}

/* =========================================================
   Get Current Client Dashboard Data
========================================================= */

export function getClientDashboardData() {
    const user =
        getCurrentUser();

    if (!user) {
        return {
            authenticated: false,

            user: null,

            request: null,

            project: null,
        };
    }

    const request =
        getCurrentDiscoveryRequest();

    return {
        authenticated: true,

        user,

        request,

        project: {
            ...(user.project || {}),

            /*
             * If a discovery request exists,
             * make sure dashboard knows about it.
             */

            status:
                request?.status ||
                user.project
                    ?.status ||
                "not_started",

            progress:
                request
                    ? request.progress ??
                      0
                    : user.project
                        ?.progress ??
                      0,

            submittedAt:
                request?.submittedAt ||
                user.project
                    ?.submittedAt ||
                null,
        },

        /*
         * Complete form data
         */

        discovery:
            request?.formData ||
            null,
    };
}

/* =========================================================
   Update Discovery Request
========================================================= */

/*
 * Useful later for Dashboard:
 *
 * SABARAT team can change:
 *
 * submitted
 * reviewing
 * approved
 * in_progress
 * completed
 *
 * For now this is frontend simulation.
 */

export function updateDiscoveryRequest(
    updates
) {
    const user =
        getCurrentUser();

    if (!user) {
        return {
            success: false,

            error:
                "No active session.",
        };
    }

    try {
        const requests =
            getDiscoveryRequests();

        const index =
            requests.findIndex(
                (request) =>
                    request.userId ===
                    user.id
            );

        if (index === -1) {
            return {
                success: false,

                error:
                    "No discovery request was found.",
            };
        }

        requests[index] = {
            ...requests[index],

            ...updates,

            updatedAt:
                new Date().toISOString(),
        };

        saveDiscoveryRequests(
            requests
        );

        return {
            success: true,

            request:
                requests[index],
        };
    } catch (error) {
        console.error(
            "Failed to update discovery request:",
            error
        );

        return {
            success: false,

            error:
                "Failed to update discovery request.",
        };
    }
}

/* =========================================================
   Remove Sensitive Development Data
========================================================= */

function sanitizeUser(user) {
    if (!user) {
        return null;
    }

    const {
        password,
        ...safeUser
    } = user;

    return safeUser;
}

/* =========================================================
   Development Reset
========================================================= */

export function clearAllAuthData() {
    localStorage.removeItem(
        USERS_KEY
    );

    localStorage.removeItem(
        SESSION_KEY
    );

    localStorage.removeItem(
        DISCOVERY_REQUESTS_KEY
    );
}