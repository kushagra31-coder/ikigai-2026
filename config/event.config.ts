import { z } from 'zod';
import { BRANDING_CONFIG } from './branding.config';
import { ASSETS_CONFIG } from './assets.config';
import { TIMELINE_CONFIG } from './timeline.config';
import { TRACKS_CONFIG } from './tracks.config';
import { LEADERSHIP_CONFIG } from './leadership.config';
import { DOWNLOADS_CONFIG } from './downloads.config';
import { SPONSORS_CONFIG } from './sponsors.config';
import { SOCIAL_CONFIG } from './social.config';
import { THEME_CONFIG } from './theme.config';
import { RULEBOOK_CONFIG } from './rulebook.config';
import { FEATURES_CONFIG } from './features.config';
import { STATISTICS_CONFIG } from './statistics.config';
import { REGISTRATION_CONFIG } from './registration.config';
import { CONTACTS_CONFIG } from './contacts.config';

// 1. Define schemas for strict validation
const TrackSchema = z.object({
  id: z.string(),
  title: z.string(),
  shortTitle: z.string(),
  icon: z.string(),
  color: z.string(),
  description: z.string(),
  problemStatementUrl: z.string()
});

const SponsorSchema = z.object({
  name: z.string(),
  logo: z.string(),
  website: z.string(),
  category: z.string(),
  priority: z.number()
});

const DownloadSchema = z.object({
  title: z.string(),
  description: z.string(),
  type: z.string(),
  size: z.string(),
  url: z.string(),
  icon: z.string(),
  visibility: z.string()
});

const EventConfigSchema = z.object({
  branding: z.any(),
  assets: z.any(),
  timeline: z.array(z.any()),
  tracks: z.array(TrackSchema).refine((items) => new Set(items.map((i) => i.id)).size === items.length, {
    message: "Tracks must have unique IDs."
  }),
  leadership: z.array(z.any()),
  downloads: z.array(DownloadSchema).refine((items) => new Set(items.map((i) => i.url)).size === items.length, {
    message: "Downloads must have unique URLs."
  }),
  sponsors: z.array(SponsorSchema).refine((items) => new Set(items.map((i) => i.name)).size === items.length, {
    message: "Sponsors must have unique names."
  }),
  social: z.any(),
  theme: z.any(),
  rulebook: z.any(),
  features: z.any(),
  statistics: z.any(),
  registration: z.any(),
  contacts: z.any()
});

// 2. Aggregate all modular configs
export const IKIGAI2026_CONFIG = {
  branding: BRANDING_CONFIG,
  assets: ASSETS_CONFIG,
  timeline: TIMELINE_CONFIG,
  tracks: TRACKS_CONFIG,
  leadership: LEADERSHIP_CONFIG,
  downloads: DOWNLOADS_CONFIG,
  sponsors: SPONSORS_CONFIG,
  social: SOCIAL_CONFIG,
  theme: THEME_CONFIG,
  rulebook: RULEBOOK_CONFIG,
  features: FEATURES_CONFIG,
  statistics: STATISTICS_CONFIG,
  registration: REGISTRATION_CONFIG,
  contacts: CONTACTS_CONFIG
};

// 3. Validate at runtime/build-time
const validation = EventConfigSchema.safeParse(IKIGAI2026_CONFIG);
if (!validation.success) {
  console.error("❌ CRITICAL: Configuration validation failed!");
  console.error(validation.error.format());
  if (typeof process !== "undefined" && process.env.NODE_ENV !== "test") {
    // Fail build if config is invalid, except in test runners if desired
    process.exit(1);
  }
}

// 4. Export as EVENT_CONFIG for backward compatibility with existing codebase
export const EVENT_CONFIG = {
  ...IKIGAI2026_CONFIG.branding,
  name: IKIGAI2026_CONFIG.branding.eventName,
  type: IKIGAI2026_CONFIG.branding.eventType,
  organizers: IKIGAI2026_CONFIG.branding.organizer.institute,
  venue: IKIGAI2026_CONFIG.branding.organizer.location,
  prizePool: IKIGAI2026_CONFIG.statistics.prizePool,
  teamSize: {
    min: 2,
    max: 4,
    mandatoryCondition: 'Each team MUST include at least one female participant.'
  },
  timeline: {
    registrationDeadline: IKIGAI2026_CONFIG.registration.closes,
    finalRoundStart: IKIGAI2026_CONFIG.timeline.find(t => t.id === 'grand-finale')?.start || "",
    finalRoundEnd: IKIGAI2026_CONFIG.timeline.find(t => t.id === 'grand-finale')?.end || "",
    hackathonDurationHours: IKIGAI2026_CONFIG.statistics.hours,
  },
  tracks: IKIGAI2026_CONFIG.tracks.map(t => ({
    id: t.id,
    name: t.title,
    icon: t.icon
  })),
  sponsors: IKIGAI2026_CONFIG.sponsors.map(s => s.name),
  judgingCriteria: IKIGAI2026_CONFIG.rulebook.judging.map(j => ({
    id: `C_${j.name.toUpperCase().replace(/\s/g, '_')}`,
    name: j.name,
    weight: j.weight / 100
  })),
  eligibility: IKIGAI2026_CONFIG.rulebook.eligibility.join(' '),
  description: IKIGAI2026_CONFIG.branding.mission,
  contacts: IKIGAI2026_CONFIG.contacts.generalSupport,
  faqs: IKIGAI2026_CONFIG.branding.faqs
};

export default IKIGAI2026_CONFIG;
