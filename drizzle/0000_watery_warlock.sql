CREATE TYPE "public"."methodEnum" AS ENUM('POST', 'PUT', 'GET');--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "integrations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(60) NOT NULL,
	"method" "methodEnum" NOT NULL,
	"url" varchar(255) NOT NULL,
	"headers" jsonb,
	"sourceSchemaId" uuid NOT NULL,
	"targetSchemaId" uuid NOT NULL,
	"mappingTemplate" jsonb,
	"jsonata" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "jsonSchema" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(60) NOT NULL,
	"schema" jsonb,
	"metadata" jsonb
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tenants" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"code" varchar(40) NOT NULL,
	"name" varchar(60) NOT NULL,
	"metadata" jsonb,
	CONSTRAINT "tenants_code_unique" UNIQUE("code")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"tenantId" uuid NOT NULL,
	"name" varchar(60) NOT NULL,
	"email" varchar(40) NOT NULL,
	"enabled" boolean DEFAULT true NOT NULL,
	"createdAt" time DEFAULT now() NOT NULL,
	"updatedAt" time DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "integrations" ADD CONSTRAINT "integrations_sourceSchemaId_jsonSchema_id_fk" FOREIGN KEY ("sourceSchemaId") REFERENCES "public"."jsonSchema"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "integrations" ADD CONSTRAINT "integrations_targetSchemaId_jsonSchema_id_fk" FOREIGN KEY ("targetSchemaId") REFERENCES "public"."jsonSchema"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users" ADD CONSTRAINT "users_tenantId_tenants_id_fk" FOREIGN KEY ("tenantId") REFERENCES "public"."tenants"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
