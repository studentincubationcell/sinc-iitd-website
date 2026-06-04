"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { CheckCircle2 } from "lucide-react";
import { m, useReducedMotion } from "framer-motion";

const applySchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid IIT or personal email required"),
  year: z.string().min(1, "Select your year"),
  idea: z.string().min(20, "Tell us about your idea (min 20 characters)"),
  why: z.string().min(10, "Tell us why you want to join SInC"),
});

type ApplyForm = z.infer<typeof applySchema>;

export function ApplyForm() {
  const [submitted, setSubmitted] = useState(false);
  const reduceMotion = useReducedMotion();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ApplyForm>({
    resolver: zodResolver(applySchema),
  });

  async function onSubmit(data: ApplyForm) {
    await new Promise((r) => setTimeout(r, 1000));
    console.log("Apply form:", data);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <m.div
        initial={reduceMotion ? false : { scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="rounded-2xl border border-primary/20 bg-primary/5 p-12 text-center"
      >
        <CheckCircle2 className="h-16 w-16 text-primary mx-auto mb-6" />
        <h3 className="text-2xl font-bold">Application received!</h3>
        <p className="text-muted mt-3 max-w-md mx-auto">
          Thanks for applying to SInC. Our team will review your application and
          reach out within 5–7 business days.
        </p>
      </m.div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-2xl border border-border bg-card p-6 sm:p-8 space-y-5 shadow-sm"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="apply-name">Full name</Label>
          <Input id="apply-name" className="mt-1.5" {...register("name")} />
          {errors.name && (
            <p className="text-sm text-accent mt-1">{errors.name.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="apply-email">Email</Label>
          <Input
            id="apply-email"
            type="email"
            placeholder="you@iitd.ac.in"
            className="mt-1.5"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-sm text-accent mt-1">{errors.email.message}</p>
          )}
        </div>
      </div>
      <div>
        <Label htmlFor="apply-year">Year of study</Label>
        <select
          id="apply-year"
          className="mt-1.5 flex h-11 w-full rounded-xl border border-border bg-card px-4 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          {...register("year")}
        >
          <option value="">Select year</option>
          <option value="1">1st year</option>
          <option value="2">2nd year</option>
          <option value="3">3rd year</option>
          <option value="4">4th year</option>
          <option value="pg">Postgraduate</option>
          <option value="phd">PhD</option>
        </select>
        {errors.year && (
          <p className="text-sm text-accent mt-1">{errors.year.message}</p>
        )}
      </div>
      <div>
        <Label htmlFor="apply-idea">Your startup idea</Label>
        <Textarea
          id="apply-idea"
          placeholder="What problem are you solving? Who is your customer?"
          className="mt-1.5"
          {...register("idea")}
        />
        {errors.idea && (
          <p className="text-sm text-accent mt-1">{errors.idea.message}</p>
        )}
      </div>
      <div>
        <Label htmlFor="apply-why">Why SInC?</Label>
        <Textarea
          id="apply-why"
          placeholder="What do you hope to gain from joining?"
          className="mt-1.5"
          {...register("why")}
        />
        {errors.why && (
          <p className="text-sm text-accent mt-1">{errors.why.message}</p>
        )}
      </div>
      <Button type="submit" disabled={isSubmitting} size="lg" className="w-full">
        {isSubmitting ? "Submitting..." : "Submit application"}
      </Button>
    </form>
  );
}
