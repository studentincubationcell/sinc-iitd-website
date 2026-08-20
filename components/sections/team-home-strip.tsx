import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { team } from "@/lib/data";
import { isTeamMemberFilled, sortTeamMembers } from "@/lib/team-utils";

export function TeamHomeStrip() {
  const people = sortTeamMembers(team.filter(isTeamMemberFilled)).filter((member) =>
    Boolean(member.image)
  );
  if (people.length === 0) return null;

  return (
    <section className="border-y border-border bg-card">
      <div className="mx-auto max-w-[96rem] px-5 py-12 sm:px-8 lg:px-12 lg:py-16">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-muted">
              People
            </p>
            <p className="mt-2 max-w-lg text-2xl tracking-tight text-foreground sm:text-3xl">
              Run by students at IIT Delhi.
            </p>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-muted">
              Coordinators and executives — the same people you will actually meet on campus.
            </p>
          </div>
          <Link
            href="/team"
            className="inline-flex items-center gap-2 text-sm font-semibold text-foreground transition-colors hover:text-brand-blue"
          >
            Meet the team
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <ul className="mt-8 grid grid-cols-4 gap-3 sm:grid-cols-7 sm:gap-4">
          {people.map((member) => {
            const label = member.expertise || member.role;
            return (
              <li key={member.id}>
                <Link
                  href="/team"
                  className="group block h-full"
                  title={`${member.name} · ${label}`}
                >
                  <span className="block aspect-[3/4] overflow-hidden border border-border bg-accent-tint">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={member.image as string}
                      alt=""
                      className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-[1.03]"
                      loading="lazy"
                    />
                  </span>
                  <span className="mt-2 block text-[12px] font-semibold leading-snug tracking-tight text-foreground sm:text-[13px]">
                    {member.name}
                  </span>
                  <span className="mt-0.5 block truncate text-[10px] uppercase tracking-[0.12em] text-muted sm:text-[11px]">
                    {label}
                  </span>
                  <span className="sr-only">
                    {member.name}, {label}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
