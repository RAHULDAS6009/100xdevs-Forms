-- AlterTable
ALTER TABLE "Form" ADD COLUMN     "submissions" TEXT[] DEFAULT ARRAY[]::TEXT[];
