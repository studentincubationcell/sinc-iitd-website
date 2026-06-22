import siteData from "@/data/site.json";
import programsData from "@/data/programs.json";
import journeyData from "@/data/journey.json";
import eventsData from "@/data/events.json";
import startupsData from "@/data/startups.json";
import teamData from "@/data/team.json";
import aboutData from "@/data/about.json";
import networkData from "@/data/network.json";
import resourcesData from "@/data/resources.json";
import cohortData from "@/data/cohort.json";
import opportunitiesData from "@/data/opportunities.json";
import contentMapData from "@/data/content-map.json";
import {
  siteSchema,
  programSchema,
  journeyStepSchema,
  eventSchema,
  startupSchema,
  teamMemberSchema,
  networkSchema,
  resourceSchema,
  cohortSchema,
  opportunitiesSchema,
  contentMapSchema,
  type Site,
  type Program,
  type JourneyStep,
  type SiteEvent,
  type Startup,
  type TeamMember,
  type Network,
  type Resource,
  type Cohort,
  type Opportunities,
  type ContentMap,
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
export const network = networkSchema.parse(networkData) as Network;
export const resources = z.array(resourceSchema).parse(resourcesData) as Resource[];
export const cohort = cohortSchema.parse(cohortData) as Cohort;
export const opportunities = opportunitiesSchema.parse(opportunitiesData) as Opportunities;
export const contentMap = contentMapSchema.parse(contentMapData) as ContentMap;

export function getEvent(slug: string): SiteEvent | undefined {
  return events.find((e) => e.slug === slug);
}

export function getStartup(slug: string): Startup | undefined {
  return startups.find((s) => s.slug === slug);
}
