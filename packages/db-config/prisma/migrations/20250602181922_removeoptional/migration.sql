/*
  Warnings:

  - Made the column `title` on table `Form` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Form" ALTER COLUMN "title" SET NOT NULL;
