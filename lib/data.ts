import siteData from "@/data/site.json";
import programsData from "@/data/programs.json";
import journeyData from "@/data/journey.json";
import eventsData from "@/data/events.json";
import startupsData from "@/data/startups.json";
import teamData from "@/data/team.json";
import aboutData from "@/data/about.json";
import {
  siteSchema,
  programSchema,
  journeyStepSchema,
  eventSchema,
  startupSchema,
  teamMemberSchema,
  type Site,
  type Program,
  type JourneyStep,
  type SiteEvent,
  type Startup,
  type TeamMember,
} from "./schemas";
import { z } from "zod";

export const site = siteSchema.parse(siteData) as Site;
export const programs = z.array(programSchema).parse(programsData) as Program[];
export const journeySteps = z
  .array(journeyStepSchema)
  .parse(journeyData) as JourneyStep[];
export const events = z.array(eventSchema).parse(eventsData) as SiteEvent[];
export const startups = z.array(startupSchema).parse(startupsData) as Startup[];
export const team = z.array(teamMemberSchema).parse(teamData) as TeamMember[];
export const about = aboutData;

export function getEvent(slug: string): SiteEvent | undefined {
  return events.find((e) => e.slug === slug);
}

export function getStartup(slug: string): Startup | undefined {
  return startups.find((s) => s.slug === slug);
}
