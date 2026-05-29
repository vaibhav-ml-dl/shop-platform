import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { useMemo, useState } from "react";
import { AuthButton } from "./components/AuthButton.jsx";
import { AuthField } from "./components/AuthField.jsx";
import { ThemeToggle } from "./components/ThemeToggle.jsx";

const screenVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -18 }
};

const initialValues = {
  login: { contact: "", password: "" },
  register: { fullName: "", email: "", phone: "", password: "", confirmPassword: "" }
};

export default function AuthApp() {
  const [mode, setMode] = useState("welcome");
  const [theme, setTheme] = useState("light");
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const isDark = theme === "dark";

  const appClassName = useMemo(
    () => `${isDark ? "dark " : ""}min-h-screen bg-slate-50 text-slate-950 dark:bg-slate-950 dark:text-white`,
    [isDark]
  );

  const handleChange = (formName, fieldName, fieldValue) => {
    setValues((current) => ({
      ...current,
      [formName]: { ...current[formName], [fieldName]: fieldValue }
    }));
  };

  const validateLogin = () => {
    const nextErrors = {};

    if (!values.login.contact.trim()) {
      nextErrors.contact = "Email or phone is required.";
    }

    if (values.login.password.length < 6) {
      nextErrors.password = "Password must be at least 6 characters.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const validateRegister = () => {
    const nextErrors = {};

    if (!values.register.fullName.trim()) {
      nextErrors.fullName = "Full name is required.";
    }

    if (!/^\S+@\S+\.\S+$/.test(values.register.email)) {
      nextErrors.email = "Enter a valid email address.";
    }

    if (!/^[0-9]{10,15}$/.test(values.register.phone)) {
      nextErrors.phone = "Enter a valid phone number.";
    }

    if (values.register.password.length < 6) {
      nextErrors.password = "Password must be at least 6 characters.";
    }

    if (values.register.confirmPassword !== values.register.password) {
      nextErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const continueAsGuest = () => {
    const localStaticHome = "http://127.0.0.1:5173/pages/index.html";
    const defaultHome = "../pages/index.html";
    const isLocalPreview = window.location.hostname === "127.0.0.1" && window.location.port === "4174";

    window.location.href = isLocalPreview ? localStaticHome : defaultHome;
  };

  const handleSubmit = (event, formName) => {
    event.preventDefault();

    if (formName === "login") {
      validateLogin();
      return;
    }

    validateRegister();
  };

  return (
    <div className={appClassName}>
      <main className="grid min-h-screen lg:grid-cols-[1.05fr_0.95fr]">
        <BrandPanel />

        <section className="flex min-h-screen items-center justify-center px-4 py-8 sm:px-6 lg:px-10">
          <div className="w-full max-w-md">
            <div className="mb-5 flex items-center justify-between">
              <Logo />
              <ThemeToggle theme={theme} onToggle={() => setTheme(isDark ? "light" : "dark")} />
            </div>

            <motion.div
              layout
              className="rounded-lg border border-slate-200 bg-white/92 p-5 shadow-soft backdrop-blur sm:p-7 dark:border-slate-800 dark:bg-slate-900/92"
            >
              <AnimatePresence mode="wait">
                {mode === "welcome" && (
                  <WelcomeScreen key="welcome" onLogin={() => setMode("login")} onRegister={() => setMode("register")} onGuest={continueAsGuest} />
                )}

                {mode === "login" && (
                  <LoginForm
                    key="login"
                    values={values.login}
                    errors={errors}
                    onBack={() => setMode("welcome")}
                    onRegister={() => setMode("register")}
                    onChange={(field, value) => handleChange("login", field, value)}
                    onSubmit={(event) => handleSubmit(event, "login")}
                  />
                )}

                {mode === "register" && (
                  <RegisterForm
                    key="register"
                    values={values.register}
                    errors={errors}
                    onBack={() => setMode("welcome")}
                    onLogin={() => setMode("login")}
                    onChange={(field, value) => handleChange("register", field, value)}
                    onSubmit={(event) => handleSubmit(event, "register")}
                  />
                )}
              </AnimatePresence>

              <p className="mt-6 text-center text-xs font-semibold leading-5 text-slate-500 dark:text-slate-400">
                By continuing, you agree to Terms & Privacy Policy
              </p>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
}

function Logo() {
  return (
    <a className="flex items-center gap-3" href="../pages/index.html">
      <span className="grid h-11 w-11 place-items-center rounded-lg bg-brand-500 text-sm font-black text-white shadow-lg shadow-brand-500/25">
        SP
      </span>
      <span>
        <span className="block text-base font-black">Shop Platform</span>
        <span className="block text-xs font-bold text-slate-500 dark:text-slate-400">Smart local shopping</span>
      </span>
    </a>
  );
}

function BrandPanel() {
  return (
    <aside className="relative hidden overflow-hidden bg-slate-950 p-10 text-white lg:flex lg:flex-col lg:justify-between">
      <div className="absolute left-10 top-24 h-72 w-72 rounded-full bg-brand-500/25 blur-3xl" />
      <div className="absolute bottom-16 right-10 h-80 w-80 rounded-full bg-emerald-400/15 blur-3xl" />
      <Logo />
      <div className="relative z-10 max-w-xl">
        <p className="mb-4 text-sm font-black uppercase text-brand-100">Local commerce, upgraded</p>
        <h1 className="text-5xl font-black leading-tight">Smart local shopping experience</h1>
        <p className="mt-5 max-w-md text-lg font-semibold leading-8 text-slate-300">
          Discover trusted nearby shops, compare local options, and move from search to purchase with a clean startup-grade experience.
        </p>
      </div>
      <div className="relative z-10 grid grid-cols-3 gap-4">
        {["Promoted shops", "Nearby search", "Guest access"].map((item) => (
          <div className="rounded-lg border border-white/10 bg-white/8 p-4 backdrop-blur" key={item}>
            <span className="text-sm font-bold text-slate-300">{item}</span>
          </div>
        ))}
      </div>
    </aside>
  );
}

function WelcomeScreen({ onLogin, onRegister, onGuest }) {
  return (
    <motion.div variants={screenVariants} initial="hidden" animate="visible" exit="exit" transition={{ duration: 0.24 }}>
      <p className="text-sm font-black uppercase text-brand-600 dark:text-brand-100">Welcome</p>
      <h1 className="mt-3 text-3xl font-black leading-tight sm:text-4xl">Start shopping smarter nearby.</h1>
      <p className="mt-3 text-base font-semibold leading-7 text-slate-500 dark:text-slate-400">Smart local shopping experience</p>

      <div className="mt-8 grid gap-3">
        <AuthButton onClick={onLogin}>Login</AuthButton>
        <AuthButton variant="secondary" onClick={onRegister}>Register</AuthButton>
        <AuthButton variant="ghost" onClick={onGuest}>Continue as Guest</AuthButton>
      </div>
    </motion.div>
  );
}

function LoginForm({ values, errors, onBack, onRegister, onChange, onSubmit }) {
  return (
    <motion.form variants={screenVariants} initial="hidden" animate="visible" exit="exit" transition={{ duration: 0.24 }} onSubmit={onSubmit}>
      <button className="mb-5 text-sm font-black text-brand-600 dark:text-brand-100" type="button" onClick={onBack}>Back</button>
      <h1 className="text-3xl font-black">Login</h1>
      <p className="mt-2 text-sm font-semibold text-slate-500 dark:text-slate-400">Enter your details to continue.</p>

      <div className="mt-6 grid gap-4">
        <AuthField label="Email / Phone" name="contact" value={values.contact} error={errors.contact} onChange={onChange} />
        <AuthField label="Password" name="password" type="password" value={values.password} error={errors.password} onChange={onChange} />
      </div>

      <div className="mt-3 flex justify-end">
        <button className="text-sm font-black text-brand-600 dark:text-brand-100" type="button">Forgot password?</button>
      </div>

      <AuthButton className="mt-5" type="submit">Login</AuthButton>
      <AuthButton className="mt-3" variant="secondary" type="button">Continue with Google</AuthButton>

      <p className="mt-5 text-center text-sm font-semibold text-slate-500 dark:text-slate-400">
        New here? <button className="font-black text-brand-600 dark:text-brand-100" type="button" onClick={onRegister}>Create account</button>
      </p>
    </motion.form>
  );
}

function RegisterForm({ values, errors, onBack, onLogin, onChange, onSubmit }) {
  return (
    <motion.form variants={screenVariants} initial="hidden" animate="visible" exit="exit" transition={{ duration: 0.24 }} onSubmit={onSubmit}>
      <button className="mb-5 text-sm font-black text-brand-600 dark:text-brand-100" type="button" onClick={onBack}>Back</button>
      <h1 className="text-3xl font-black">Create account</h1>
      <p className="mt-2 text-sm font-semibold text-slate-500 dark:text-slate-400">Join Shop Platform in a few steps.</p>

      <div className="mt-6 grid gap-4">
        <AuthField label="Full Name" name="fullName" value={values.fullName} error={errors.fullName} onChange={onChange} />
        <AuthField label="Email" name="email" type="email" value={values.email} error={errors.email} onChange={onChange} />
        <AuthField label="Phone Number" name="phone" type="tel" value={values.phone} error={errors.phone} onChange={onChange} />
        <AuthField label="Password" name="password" type="password" value={values.password} error={errors.password} onChange={onChange} />
        <AuthField label="Confirm Password" name="confirmPassword" type="password" value={values.confirmPassword} error={errors.confirmPassword} onChange={onChange} />
      </div>

      <AuthButton className="mt-5" type="submit">Create Account</AuthButton>
      <p className="mt-5 text-center text-sm font-semibold text-slate-500 dark:text-slate-400">
        Already registered? <button className="font-black text-brand-600 dark:text-brand-100" type="button" onClick={onLogin}>Login</button>
      </p>
    </motion.form>
  );
}
