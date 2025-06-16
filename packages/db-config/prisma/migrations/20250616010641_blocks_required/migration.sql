/*
  Warnings:

  - Made the column `blocks` on table `Form` required. This step will fail if there are existing NULL values in that column.


*/
  UPDATE "Form" SET "blocks" = '[]' WHERE "blocks" IS NULL;
-- AlterTable
ALTER TABLE "Form" ALTER COLUMN "blocks" SET NOT NULL;
