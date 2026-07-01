/*
  Warnings:

  - You are about to drop the column `educationLevel` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `personalPhones` on the `civil_servants` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[cpf]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[pisPasep]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[identityNumber]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[voterRegistrationNumber]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `academicTitle` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `address` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cpf` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dateOfBirth` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `educationLevel` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `electoralSection` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `electoralZone` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `identityNumber` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `issueDate` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `issuingAgency` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `issuingState` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `maritalStatus` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `numberOfDependents` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pisPasep` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `placeOfBirth` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `raceEthnicity` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `registrationName` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sex` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `voterRegistrationNumber` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `voterRegistrationState` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Student" DROP COLUMN "educationLevel";

-- AlterTable
ALTER TABLE "civil_servants" DROP COLUMN "personalPhones";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "academicTitle" TEXT NOT NULL,
ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "bloodType" TEXT,
ADD COLUMN     "cpf" TEXT NOT NULL,
ADD COLUMN     "dateOfBirth" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "educationLevel" TEXT NOT NULL,
ADD COLUMN     "electoralSection" TEXT NOT NULL,
ADD COLUMN     "electoralZone" TEXT NOT NULL,
ADD COLUMN     "fatherName" TEXT,
ADD COLUMN     "identityNumber" TEXT NOT NULL,
ADD COLUMN     "issueDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "issuingAgency" TEXT NOT NULL,
ADD COLUMN     "issuingState" TEXT NOT NULL,
ADD COLUMN     "maritalStatus" TEXT NOT NULL,
ADD COLUMN     "motherName" TEXT,
ADD COLUMN     "numberOfDependents" INTEGER NOT NULL,
ADD COLUMN     "personalPhones" TEXT[],
ADD COLUMN     "pisPasep" TEXT NOT NULL,
ADD COLUMN     "placeOfBirth" TEXT NOT NULL,
ADD COLUMN     "raceEthnicity" TEXT NOT NULL,
ADD COLUMN     "registrationName" TEXT NOT NULL,
ADD COLUMN     "rhFactor" TEXT,
ADD COLUMN     "sex" TEXT NOT NULL,
ADD COLUMN     "voterRegistrationNumber" TEXT NOT NULL,
ADD COLUMN     "voterRegistrationState" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "users_cpf_key" ON "users"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "users_pisPasep_key" ON "users"("pisPasep");

-- CreateIndex
CREATE UNIQUE INDEX "users_identityNumber_key" ON "users"("identityNumber");

-- CreateIndex
CREATE UNIQUE INDEX "users_voterRegistrationNumber_key" ON "users"("voterRegistrationNumber");
