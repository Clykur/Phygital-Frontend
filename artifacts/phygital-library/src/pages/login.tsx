import React from "react"
import { useAuth } from "@/context/auth-context"
import { useLocation, Link } from "wouter"
import { toast } from "sonner"
import { ApiError } from "@/lib/api"
import { afterAuthPath } from "@/lib/sign-in-return"
import { Loader2, ArrowLeft } from "lucide-react"
import { HUB_KIND_OPTIONS, type HubKindValue } from "@/lib/hub-display"
import { motion, AnimatePresence } from "framer-motion"

export default function AnimatedAuthPage() {
    const [, setLocation] = useLocation()
    const { login, register, logout } = useAuth()
    const [mode, setMode] = React.useState<'login' | 'register'>('login')
    const [role, setRole] = React.useState<'student' | 'hubOwner'>('student')

    // Form state
    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [name, setName] = React.useState("")
    const [confirmPassword, setConfirmPassword] = React.useState("")
    const [hubName, setHubName] = React.useState("")
    const [hubLocation, setHubLocation] = React.useState("")
    const [hubKind, setHubKind] = React.useState<HubKindValue>("other")
    const [busy, setBusy] = React.useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (busy) return

        if (mode === 'register' && password !== confirmPassword) {
            toast.error("Passwords do not match")
            return
        }

        setBusy(true)
        try {
            if (mode === 'login') {
                const user = await login(email, password)

                // Role validation
                const isStudentUI = role === 'student'
                const isHubOwnerUI = role === 'hubOwner'

                const isUserRole = user.baseRole === 'user'
                const isHubRole = user.baseRole === 'hub' || user.baseRole === 'super_admin'

                if (isStudentUI && !isUserRole) {
                    logout()
                    toast.error("This is a Hub Owner account. Please select 'Hub Owner' to log in.")
                    return
                }

                if (isHubOwnerUI && !isHubRole) {
                    logout()
                    toast.error("This is a Student account. Please select 'Student' to log in.")
                    return
                }

                toast.success(`Welcome back, ${user.name}!`)
                setLocation(afterAuthPath(user))
            } else {
                if (role === 'student') {
                    const user = await register({
                        name,
                        email,
                        password,
                        accountType: "user"
                    })
                    toast.success("Account created successfully!")
                    setLocation(afterAuthPath(user))
                } else {
                    const user = await register({
                        name,
                        email,
                        password,
                        accountType: "hub",
                        hubName: hubName.trim(),
                        hubLocation: hubLocation.trim(),
                        hubKind
                    })
                    toast.success("Hub account created successfully!")
                    setLocation(afterAuthPath(user))
                }
            }
        } catch (err) {
            toast.error(err instanceof ApiError ? err.message : "Authentication failed")
        } finally {
            setBusy(false)
        }
    }

    return (
        <div className="min-h-screen bg-white flex items-center justify-center overflow-hidden selection:bg-primary/30">
            <div className={`relative w-full min-h-screen lg:h-screen overflow-hidden bg-primary flex flex-col lg:flex-row ${mode === 'login' ? '' : 'lg:flex-row-reverse'}`}>
                <Link href="/">
                    <button className="absolute top-6 left-6 z-50 flex items-center gap-2 text-white hover:opacity-80 transition-opacity">
                        <ArrowLeft className="h-5 w-5" />
                        <span className="font-bold">Back</span>
                    </button>
                </Link>
                {/* Floating Background Circles */}
                <div className="absolute top-10 left-10 w-40 h-40 bg-primary/10 rounded-none blur-3xl animate-pulse" />
                <div className="absolute bottom-10 right-10 w-52 h-52 bg-primary/10 rounded-none blur-3xl animate-pulse" />

                {/* Login/Register Section */}
                <motion.div
                    layout
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="relative z-10 flex-1 flex flex-col items-center py-12 px-8 lg:px-20 lg:py-16 lg:h-screen lg:overflow-y-auto bg-primary transition-colors duration-500"
                >
                    <div className="w-full max-w-md text-white my-auto">
                        <div className="mb-8">
                            <h1 className="text-4xl font-bold tracking-tight text-white">
                                {mode === 'login' ? 'Welcome Back' : 'Create Account'}
                            </h1>
                            <p className="text-blue-100 mt-3 text-sm">
                                {mode === 'login'
                                    ? 'Login to continue your learning journey.'
                                    : 'Register to access your hub dashboard.'}
                            </p>
                        </div>

                        {/* Role Selector */}
                        <div className="mb-6">
                            <label className="text-sm text-blue-100 block mb-3 font-medium">
                                Select Role
                            </label>

                            <div className="grid grid-cols-2 gap-3">
                                <button
                                    onClick={() => setRole('student')}
                                    className={`rounded-none py-3 font-semibold transition-all duration-300 ${role === 'student'
                                        ? 'bg-white text-primary shadow-lg shadow-black/10 scale-105'
                                        : 'bg-white/10 text-white hover:bg-white/20'
                                        }`}
                                >
                                    Student
                                </button>

                                <button
                                    onClick={() => setRole('hubOwner')}
                                    className={`rounded-none py-3 font-semibold transition-all duration-300 ${role === 'hubOwner'
                                        ? 'bg-white text-primary shadow-lg shadow-black/10 scale-105'
                                        : 'bg-white/10 text-white hover:bg-white/20'
                                        }`}
                                >
                                    Hub Owner
                                </button>
                            </div>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <AnimatePresence mode="wait">
                                {mode === 'register' && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ type: "spring", stiffness: 400, damping: 40 }}
                                    >
                                        <label className="text-sm text-blue-100 block mb-2 font-medium">
                                            Full Name
                                        </label>
                                        <input
                                            type="text"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            placeholder="Enter your full name"
                                            required
                                            className="w-full rounded-none bg-white border-none px-5 py-4 outline-none focus:ring-4 focus:ring-white/20 transition-all text-slate-900"
                                        />
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <div>
                                <label className="text-sm text-blue-100 block mb-2 font-medium">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    required
                                    className="w-full rounded-none bg-white border-none px-5 py-4 outline-none focus:ring-4 focus:ring-white/20 transition-all text-slate-900"
                                />
                            </div>

                            <AnimatePresence mode="wait">
                                {mode === 'register' && role === 'hubOwner' && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ type: "spring", stiffness: 400, damping: 40 }}
                                        className="space-y-5"
                                    >
                                        <div>
                                            <label className="text-sm text-blue-100 block mb-2 font-medium">
                                                Hub Name
                                            </label>
                                            <input
                                                type="text"
                                                value={hubName}
                                                onChange={(e) => setHubName(e.target.value)}
                                                placeholder="e.g. Central Library"
                                                required
                                                className="w-full rounded-none bg-white border-none px-5 py-4 outline-none focus:ring-4 focus:ring-white/20 transition-all text-slate-900"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-sm text-blue-100 block mb-2 font-medium">
                                                Hub Location
                                            </label>
                                            <input
                                                type="text"
                                                value={hubLocation}
                                                onChange={(e) => setHubLocation(e.target.value)}
                                                placeholder="City or Campus"
                                                required
                                                className="w-full rounded-none bg-white border-none px-5 py-4 outline-none focus:ring-4 focus:ring-white/20 transition-all text-slate-900"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-sm text-blue-100 block mb-2 font-medium">
                                                Hub Type
                                            </label>
                                            <select
                                                value={hubKind}
                                                onChange={(e) => setHubKind(e.target.value as HubKindValue)}
                                                required
                                                className="w-full rounded-none bg-white border-none px-5 py-4 outline-none focus:ring-4 focus:ring-white/20 transition-all text-slate-900 appearance-none cursor-pointer"
                                            >
                                                {HUB_KIND_OPTIONS.map((opt) => (
                                                    <option key={opt.value} value={opt.value}>
                                                        {opt.label}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <div>
                                <label className="text-sm text-blue-100 block mb-2 font-medium">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter your password"
                                    required
                                    className="w-full rounded-none bg-white border-none px-5 py-4 outline-none focus:ring-4 focus:ring-white/20 transition-all text-slate-900"
                                />
                            </div>

                            <AnimatePresence mode="wait">
                                {mode === 'register' && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ type: "spring", stiffness: 400, damping: 40 }}
                                    >
                                        <label className="text-sm text-blue-100 block mb-2 font-medium">
                                            Confirm Password
                                        </label>
                                        <input
                                            type="password"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            placeholder="Confirm password"
                                            required
                                            className="w-full rounded-none bg-white border-none px-5 py-4 outline-none focus:ring-4 focus:ring-white/20 transition-all text-slate-900"
                                        />
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <button
                                type="submit"
                                disabled={busy}
                                className="w-full flex items-center justify-center gap-2 rounded-none py-4 font-bold bg-white text-primary hover:bg-blue-50 hover:scale-[1.02] transition-all duration-300 shadow-xl shadow-black/10 disabled:opacity-50 disabled:hover:scale-100"
                            >
                                {busy && <Loader2 className="h-5 w-5 animate-spin" />}
                                {mode === 'login' ? 'Login' : 'Create Account'}
                            </button>
                        </form>

                        {/* Toggle */}
                        <div className="mt-8 text-center text-sm text-blue-100">
                            {mode === 'login'
                                ? "Don't have an account?"
                                : 'Already have an account?'}

                            <button
                                onClick={() =>
                                    setMode(mode === 'login' ? 'register' : 'login')
                                }
                                className="ml-2 text-white hover:underline font-bold"
                            >
                                {mode === 'login' ? 'Register' : 'Login'}
                            </button>
                        </div>
                    </div>
                </motion.div>

                {/* Illustration Section */}
                <motion.div
                    layout
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="relative flex-1 overflow-hidden hidden lg:flex items-center justify-center lg:h-screen bg-white transition-colors duration-500"
                >
                    {/* Decorative Shapes */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-none -mr-32 -mt-32" />
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-none -ml-48 -mb-48" />

                    {/* Main Illustration */}
                    <div className="relative z-10 flex flex-col items-center text-center px-10">
                        {/* New Illustration Container */}
                        <div className="relative w-full max-w-[480px] mb-8">
                            <img
                                src="/images/Login-rafiki.png"
                                alt="Login Illustration"
                                className="w-full h-auto drop-shadow-2xl"
                            />
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}
