CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE "user_accounts" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "email" TEXT NOT NULL UNIQUE,
  "password_hash" TEXT NOT NULL,
  "display_name" TEXT NOT NULL,
  "timezone" TEXT NOT NULL,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "last_login_at" TIMESTAMPTZ
);

CREATE TABLE "relapse_events" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "user_id" UUID NOT NULL REFERENCES "user_accounts"("id") ON DELETE CASCADE,
  "occurred_at" TIMESTAMPTZ NOT NULL,
  "recorded_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "intensity" INTEGER NOT NULL,
  "notes" TEXT,
  "location_context" TEXT,
  "activity_context" TEXT,
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "deleted_at" TIMESTAMPTZ
);

CREATE INDEX "relapse_events_user_id_occurred_at_idx"
  ON "relapse_events" ("user_id", "occurred_at" DESC);

CREATE TABLE "trigger_catalog_items" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "user_id" UUID NOT NULL REFERENCES "user_accounts"("id") ON DELETE CASCADE,
  "label" TEXT NOT NULL,
  "normalized_label" TEXT NOT NULL,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "archived_at" TIMESTAMPTZ,
  UNIQUE ("user_id", "normalized_label")
);

CREATE TABLE "emotion_catalog_items" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "user_id" UUID NOT NULL REFERENCES "user_accounts"("id") ON DELETE CASCADE,
  "label" TEXT NOT NULL,
  "normalized_label" TEXT NOT NULL,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE ("user_id", "normalized_label")
);

CREATE TABLE "relapse_trigger_links" (
  "relapse_event_id" UUID NOT NULL REFERENCES "relapse_events"("id") ON DELETE CASCADE,
  "trigger_catalog_item_id" UUID NOT NULL REFERENCES "trigger_catalog_items"("id") ON DELETE CASCADE,
  PRIMARY KEY ("relapse_event_id", "trigger_catalog_item_id")
);

CREATE TABLE "relapse_emotion_links" (
  "relapse_event_id" UUID NOT NULL REFERENCES "relapse_events"("id") ON DELETE CASCADE,
  "emotion_catalog_item_id" UUID NOT NULL REFERENCES "emotion_catalog_items"("id") ON DELETE CASCADE,
  PRIMARY KEY ("relapse_event_id", "emotion_catalog_item_id")
);

