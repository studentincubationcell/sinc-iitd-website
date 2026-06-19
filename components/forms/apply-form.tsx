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
import { cn } from "@/lib/utils";

const applySchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid IIT or personal email required"),
  year: z.string().min(1, "Select your year"),
  idea: z.string().min(20, "Tell us about your idea (min 20 characters)"),
  why: z.string().min(10, "Tell us why you want to join SInC"),
});

type ApplyForm = z.infer<typeof applySchema>;

const fieldClass = "";

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
        className="brutal-block-lg bg-accent-lime p-12 text-center"
      >
        <CheckCircle2 className="h-16 w-16 text-foreground mx-auto mb-6" />
        <h3 className="text-2xl font-black tracking-tight">Application received!</h3>
        <p className="text-foreground/75 mt-3 max-w-md mx-auto">
          Thanks for applying to SInC. Our team will review your application and
          reach out within 5–7 business days.
        </p>
      </m.div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="apply-name" className="text-foreground/90">
            Full name
          </Label>
          <Input
            id="apply-name"
            className={cn("mt-1.5", fieldClass)}
            {...register("name")}
          />
          {errors.name && (
            <p className="text-sm text-destructive mt-1">{errors.name.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="apply-email" className="text-foreground/90">
            Email
          </Label>
          <Input
            id="apply-email"
            type="email"
            placeholder="you@iitd.ac.in"
            className={cn("mt-1.5", fieldClass)}
            {...register("email")}
          />
          {errors.email && (
            <p className="text-sm text-destructive mt-1">{errors.email.message}</p>
          )}
        </div>
      </div>
      <div>
        <Label htmlFor="apply-year" className="text-foreground/90">
          Year of study
        </Label>
        <select
          id="apply-year"
          className={cn(
            "mt-1.5 flex h-11 w-full rounded-none border-2 border-border-ink bg-background px-4 text-sm transition-all duration-150 focus-visible:outline-none focus-visible:border-foreground focus-visible:shadow-[3px_3px_0_0_#0a0a0a]"
          )}
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
          <p className="text-sm text-destructive mt-1">{errors.year.message}</p>
        )}
      </div>
      <div>
        <Label htmlFor="apply-idea" className="text-foreground/90">
          Your startup idea
        </Label>
        <Textarea
          id="apply-idea"
          placeholder="What problem are you solving? Who is your customer?"
          className={cn("mt-1.5", fieldClass)}
          {...register("idea")}
        />
        {errors.idea && (
          <p className="text-sm text-destructive mt-1">{errors.idea.message}</p>
        )}
      </div>
      <div>
        <Label htmlFor="apply-why" className="text-foreground/90">
          Why SInC?
        </Label>
        <Textarea
          id="apply-why"
          placeholder="What do you hope to gain from joining?"
          className={cn("mt-1.5", fieldClass)}
          {...register("why")}
        />
        {errors.why && (
          <p className="text-sm text-destructive mt-1">{errors.why.message}</p>
        )}
      </div>
      <Button type="submit" disabled={isSubmitting} variant="club" size="lg" className="w-full">
        {isSubmitting ? "Submitting..." : "Submit application"}
      </Button>
    </form>
  );
}
