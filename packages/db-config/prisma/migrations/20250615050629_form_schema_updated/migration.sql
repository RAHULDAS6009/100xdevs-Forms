/*
  Warnings:

  - Added the required column `cover` to the `Form` table without a default value. This is not possible if the table is not empty.
  - Added the required column `logo` to the `Form` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Form" ADD COLUMN     "cover" TEXT NOT NULL,
ADD COLUMN     "logo" TEXT NOT NULL;
