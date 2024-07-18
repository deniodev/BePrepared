-- AlterTable
ALTER TABLE "subscribers" ALTER COLUMN "device_id" DROP NOT NULL,
ALTER COLUMN "verified" SET DEFAULT false;
