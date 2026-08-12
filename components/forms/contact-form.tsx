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
import { cn } from "@/lib/utils";

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactForm = z.infer<typeof contactSchema>;

const fieldClass = "";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
  });

  async function onSubmit(data: ContactForm) {
    await new Promise((r) => setTimeout(r, 800));
    console.log("Contact form:", data);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="soft-card bg-accent-tint p-8 text-center">
        <CheckCircle2 className="h-12 w-12 text-foreground mx-auto mb-4" />
        <h3 className="text-xl font-bold tracking-tight">Message sent!</h3>
        <p className="text-muted mt-2">We&apos;ll get back to you soon.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <Label htmlFor="name" className="text-foreground/90">
          Name
        </Label>
        <Input id="name" className={cn("mt-1.5", fieldClass)} {...register("name")} />
        {errors.name && (
          <p className="text-sm text-destructive mt-1">{errors.name.message}</p>
        )}
      </div>
      <div>
        <Label htmlFor="email" className="text-foreground/90">
          Email
        </Label>
        <Input
          id="email"
          type="email"
          className={cn("mt-1.5", fieldClass)}
          {...register("email")}
        />
        {errors.email && (
          <p className="text-sm text-destructive mt-1">{errors.email.message}</p>
        )}
      </div>
      <div>
        <Label htmlFor="message" className="text-foreground/90">
          Message
        </Label>
        <Textarea
          id="message"
          className={cn("mt-1.5", fieldClass)}
          {...register("message")}
        />
        {errors.message && (
          <p className="text-sm text-destructive mt-1">{errors.message.message}</p>
        )}
      </div>
      <Button type="submit" disabled={isSubmitting} variant="club" className="w-full">
        {isSubmitting ? "Sending..." : "Send message"}
      </Button>
    </form>
  );
}
