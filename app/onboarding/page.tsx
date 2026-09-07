"use client";

import { useActionState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { OnboardingAction } from "../actions";
import { SubmissionResult, useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { onboardingSchema } from "../lib/zodSchemas";
import { SubmitButton } from "../components/SubmitButtons";
import { CryptoGenLogo } from "@/app/components/ui/CryptoGenLogo";
import { ShieldCheck, UserRound } from "lucide-react";

export default function OnboardingRoute() {
  const [lastResult, action] = useActionState(
    (state: SubmissionResult<string[]> | undefined, payload: FormData) =>
      OnboardingAction(state ?? {}, payload),
    undefined
  );
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: onboardingSchema });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  const inputClass =
    "h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 placeholder:text-slate-400 transition focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-400/25 dark:border-slate-700 dark:bg-slate-900 dark:text-white";

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-50/70 p-4 dark:bg-slate-950">
      {/* Subtle grid + glow backdrop */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)] dark:bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)]" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-indigo-100/60 blur-3xl dark:bg-indigo-500/10" />

      <div className="relative z-10 w-full max-w-md">
        {/* Brand + heading */}
        <div className="mb-8 flex flex-col items-center text-center">
          <CryptoGenLogo size={36} />
          <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700 dark:border-indigo-500/20 dark:bg-indigo-500/10 dark:text-indigo-300">
            Profile Setup
          </div>
          <h1 className="mt-4 text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Welcome to CryptoGen
          </h1>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            We need the following information to set up your profile.
          </p>
        </div>

        {/* Form card */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 md:p-8">
          <form
            id={form.id}
            onSubmit={form.onSubmit}
            action={action}
            noValidate
            className="space-y-5"
          >
            {/* Full Name */}
            <div className="space-y-2">
              <Label
                htmlFor={fields.fullName.id}
                className="text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                Full Name
              </Label>
              <div className="relative">
                <UserRound className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <Input
                  id={fields.fullName.id}
                  name={fields.fullName.name}
                  defaultValue={fields.fullName.initialValue}
                  key={fields.fullName.key}
                  placeholder="John Doe"
                  className={`${inputClass} pl-10`}
                />
              </div>
              {fields.fullName.errors && (
                <p className="text-[13px] text-rose-600 dark:text-rose-400">
                  {fields.fullName.errors}
                </p>
              )}
            </div>

            {/* Username */}
            <div className="space-y-2">
              <Label
                htmlFor={fields.userName.id}
                className="text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                Username
              </Label>
              <div className="flex">
                <span className="inline-flex items-center rounded-l-xl border border-r-0 border-slate-200 bg-slate-50 px-3 text-[13px] font-medium text-slate-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400">
                  CryptoGen.com/
                </span>
                <Input
                  id={fields.userName.id}
                  placeholder="Enter a user name"
                  className={`${inputClass} rounded-l-none`}
                  name={fields.userName.name}
                  key={fields.userName.key}
                  defaultValue={fields.userName.initialValue}
                />
              </div>
              {fields.userName.errors && (
                <p className="text-[13px] text-rose-600 dark:text-rose-400">
                  {fields.userName.errors}
                </p>
              )}
            </div>

            {/* Submit */}
            <SubmitButton
              text="Submit"
              className="group relative h-11 w-full overflow-hidden rounded-xl bg-slate-900 font-semibold text-white hover:bg-black dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100"
            />

            {/* Security note */}
            <div className="flex items-start gap-2 rounded-xl border border-slate-200 bg-slate-50/70 px-3.5 py-2.5 text-xs leading-relaxed text-slate-500 dark:border-slate-700 dark:bg-slate-800/50 dark:text-slate-400">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-indigo-500" />
              For security and operational reasons, each device is permitted to have
              only one account. This helps ensure the integrity of our platform and
              provides a seamless experience for all users.
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}