-- CreateTable
CREATE TABLE "CivilServant" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "registration" TEXT,
    "preferredName" TEXT,
    "institutionalEmail" TEXT,
    "siapeEmail" TEXT,
    "passwordRecoveryEmail" TEXT,
    "notificationEmail" TEXT,
    "googleClassroomEmail" TEXT,
    "institutionalPhones" TEXT[],
    "personalPhones" TEXT[],
    "isInPGD" BOOLEAN NOT NULL DEFAULT false,
    "suapDepartment" TEXT,
    "siapeAssignmentLocation" TEXT,
    "siapeExerciseLocation" TEXT,
    "employmentStatus" TEXT,
    "workRegime" TEXT,
    "workSchedule" TEXT,
    "operatesXRayEquipment" BOOLEAN NOT NULL DEFAULT false,
    "publicServiceStartDate" TIMESTAMP(3),
    "institutionAppointmentDate" TIMESTAMP(3),
    "institutionExerciseStartDate" TIMESTAMP(3),
    "positionAppointmentDate" TIMESTAMP(3),
    "positionExerciseStartDate" TIMESTAMP(3),
    "position" TEXT,
    "positionClass" TEXT,
    "standard" TEXT,
    "positionGroup" TEXT,
    "vacancyCode" TEXT,
    "bank" TEXT,
    "bankBranch" TEXT,
    "checkingAccount" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CivilServant_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CivilServant_userId_key" ON "CivilServant"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "CivilServant_registration_key" ON "CivilServant"("registration");

-- CreateIndex
CREATE UNIQUE INDEX "CivilServant_institutionalEmail_key" ON "CivilServant"("institutionalEmail");

-- CreateIndex
CREATE UNIQUE INDEX "CivilServant_siapeEmail_key" ON "CivilServant"("siapeEmail");

-- AddForeignKey
ALTER TABLE "CivilServant" ADD CONSTRAINT "CivilServant_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
