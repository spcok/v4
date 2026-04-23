import { pgTable, text, uuid, boolean, timestamp, numeric, integer } from 'drizzle-orm/pg-core';

const createSchema = (cfg: any) => cfg;
const table = (cfg: any) => cfg;

// --- DRIZZLE ORM SCHEMA (Physical Database Structure) ---

export const animals = pgTable('animals', {
  id: uuid('id').primaryKey().defaultRandom(),
  entityType: text('entity_type').notNull().default('INDIVIDUAL'),
  parentMobId: uuid('parent_mob_id').notNull(),
  censusCount: integer('census_count').notNull().default(1),
  name: text('name').notNull().default('unknown'),
  species: text('species').notNull().default('unknown'),
  latinName: text('latin_name').notNull().default('unknown'),
  category: text('category').notNull().default('unknown'),
  location: text('location').notNull().default('unknown'),
  imageUrl: text('image_url').notNull().default('-1'),
  distributionMapUrl: text('distribution_map_url'),
  hazardRating: text('hazard_rating').notNull().default('unknown'),
  isVenomous: boolean('is_venomous').notNull().default(false),
  weightUnit: text('weight_unit').notNull().default('g'),
  flyingWeightG: numeric('flying_weight_g').notNull().default('-1'),
  winterWeightG: numeric('winter_weight_g').notNull().default('-1'),
  averageTargetWeight: numeric('average_target_weight').notNull().default('-1'),
  dateOfBirth: timestamp('date_of_birth').notNull(),
  isDobUnknown: boolean('is_dob_unknown').notNull().default(false),
  gender: text('gender').notNull().default('unknown'),
  microchipId: text('microchip_id').notNull().default('unknown'),
  ringNumber: text('ring_number').notNull().default('unknown'),
  hasNoId: boolean('has_no_id').notNull().default(false),
  redListStatus: text('red_list_status').notNull().default('UNK'),
  description: text('description').array().notNull().default(['none']),
  specialRequirements: text('special_requirements').array().notNull().default(['none']),
  criticalHusbandryNotes: text('critical_husbandry_notes').array().notNull().default(['none']),
  ambientTempOnly: boolean('ambient_temp_only').notNull().default(false),
  targetDayTempC: numeric('target_day_temp_c').notNull().default('-1'),
  targetNightTempC: numeric('target_night_temp_c').notNull().default('-1'),
  waterTippingTemp: numeric('water_tipping_temp'),
  targetHumidityMinPercent: numeric('target_humidity_min_percent'),
  targetHumidityMaxPercent: numeric('target_humidity_max_percent'),
  mistingFrequency: text('misting_frequency'),
  acquisitionDate: timestamp('acquisition_date').notNull(),
  acquisitionType: text('acquisition_type').notNull().default('unknown'),
  origin: text('origin').notNull().default('unknown'),
  originLocation: text('origin_location').notNull().default('unknown'),
  lineageUnknown: boolean('lineage_unknown').notNull().default(false),
  sireId: uuid('sire_id').notNull(),
  damId: uuid('dam_id').notNull(),
  isBoarding: boolean('is_boarding').notNull().default(false),
  isQuarantine: boolean('is_quarantine').notNull().default(false),
  displayOrder: integer('display_order').notNull().default(0),
  archived: boolean('archived').notNull().default(false),
  archiveReason: text('archive_reason').notNull().default('unknown'),
  archiveType: text('archive_type').notNull().default('unknown'),
  archivedAt: timestamp('archived_at').notNull(),
  // ZLA-1981 Mandatory Fields
  is_deleted: boolean('is_deleted').notNull().default(false),
  user_initials: text('user_initials').notNull().default('XX'),
  created_at: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updated_at: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});

export const dailyLogs = pgTable('daily_logs', {
  id: uuid('id').primaryKey().defaultRandom(),
  animalId: uuid('animal_id').notNull(),
  logType: text('log_type').notNull(),
  logDate: timestamp('log_date', { withTimezone: true }).notNull(),
  notes: text('notes'),
  weightGrams: numeric('weight_grams'),
  weightUnit: text('weight_unit'),
  baskingTempC: numeric('basking_temp_c'),
  coolTempC: numeric('cool_temp_c'),
  temperatureC: numeric('temperature_c'),
  is_deleted: boolean('is_deleted').notNull().default(false),
  user_initials: text('user_initials').notNull().default('XX'),
  created_at: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updated_at: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: text('email').notNull().unique(),
  name: text('name'),
  initials: text('initials').notNull().default('XX'),
  role: text('role').default('KEEPER'),
  is_deleted: boolean('is_deleted').default(false),
  created_at: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updated_at: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});

// --- TANSTACK DB SCHEMA (Reactive UI Map) ---

export const rootSchema = createSchema({
  tables: {
    animals: table({
      columns: {
        id: { type: 'string' },
        name: { type: 'string' },
        species: { type: 'string' },
        location: { type: 'string' },
        is_deleted: { type: 'boolean' },
        user_initials: { type: 'string' },
      },
    }),
    daily_logs: table({
      columns: {
        id: { type: 'string' },
        animalId: { type: 'string' },
        logType: { type: 'string' },
        is_deleted: { type: 'boolean' },
      },
    }),
    users: table({
      columns: {
        id: { type: 'string' },
        email: { type: 'string' },
        initials: { type: 'string' },
        is_deleted: { type: 'boolean' },
      },
    }),
  },
});