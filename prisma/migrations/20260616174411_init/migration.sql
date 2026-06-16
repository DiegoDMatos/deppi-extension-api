-- CreateEnum
CREATE TYPE "EnrollmentStatusEnum" AS ENUM ('PENDING', 'APPROVED', 'REJECTED', 'ACTIVE', 'COMPLETED', 'CANCELED');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "roles" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_roles" (
    "userId" TEXT NOT NULL,
    "roleId" TEXT NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_roles_pkey" PRIMARY KEY ("userId","roleId")
);

-- CreateTable
CREATE TABLE "permissions" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "permissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "role_permissions" (
    "roleId" TEXT NOT NULL,
    "permissionId" TEXT NOT NULL,

    CONSTRAINT "role_permissions_pkey" PRIMARY KEY ("roleId","permissionId")
);

-- CreateTable
CREATE TABLE "courses" (
    "id" TEXT NOT NULL,
    "institutionId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "actionType" TEXT NOT NULL,
    "thematicArea" TEXT NOT NULL,
    "extensionLine" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "minParticipants" INTEGER NOT NULL,
    "maxParticipants" INTEGER NOT NULL,
    "workload" INTEGER NOT NULL,
    "location" TEXT NOT NULL,
    "funding" TEXT,
    "institutionalProgram" TEXT,
    "offeringModel" TEXT NOT NULL,
    "targetMunicipalities" TEXT NOT NULL,
    "evaluationMethods" TEXT NOT NULL,
    "marketingMethods" TEXT NOT NULL,
    "activitiesPerformed" TEXT NOT NULL,
    "responsibleName" TEXT NOT NULL,
    "presentation" TEXT NOT NULL,
    "justification" TEXT NOT NULL,
    "targetAudience" TEXT NOT NULL,
    "generalObjective" TEXT NOT NULL,
    "specificObjective" TEXT NOT NULL,
    "methodology" TEXT NOT NULL,
    "coverImage" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "courses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "enrollments" (
    "id" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "enrollments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "enrollment_status_history" (
    "id" TEXT NOT NULL,
    "enrollment_id" TEXT NOT NULL,
    "previous_status" "EnrollmentStatusEnum",
    "new_status" "EnrollmentStatusEnum" NOT NULL,
    "changed_by" TEXT NOT NULL,
    "change_reason" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "enrollment_status_history_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "students" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "socialName" TEXT,
    "educationLevel" TEXT NOT NULL,
    "occupation" TEXT NOT NULL,
    "perCapitaIncome" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "students_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "civil_servants" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "registration" TEXT,
    "preferredName" TEXT,
    "institutionalEmail" TEXT NOT NULL,
    "siapeEmail" TEXT,
    "passwordRecoveryEmail" TEXT,
    "notificationEmail" TEXT,
    "googleClassroomEmail" TEXT,
    "institutionalPhones" TEXT[],
    "personalPhones" TEXT[],
    "isInPGD" BOOLEAN NOT NULL DEFAULT false,
    "suapDepartment" TEXT NOT NULL,
    "siapeAssignmentLocation" TEXT,
    "siapeExerciseLocation" TEXT,
    "employmentStatus" TEXT NOT NULL,
    "workRegime" TEXT,
    "workSchedule" TEXT,
    "operatesXRayEquipment" BOOLEAN NOT NULL DEFAULT false,
    "publicServiceStartDate" TIMESTAMP(3),
    "institutionAppointmentDate" TIMESTAMP(3),
    "institutionExerciseStartDate" TIMESTAMP(3),
    "positionAppointmentDate" TIMESTAMP(3),
    "positionExerciseStartDate" TIMESTAMP(3),
    "position" TEXT NOT NULL,
    "positionClass" TEXT NOT NULL,
    "standard" TEXT NOT NULL,
    "positionGroup" TEXT NOT NULL,
    "vacancyCode" TEXT NOT NULL,
    "bank" TEXT,
    "bankBranch" TEXT,
    "checkingAccount" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "civil_servants_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "roles_slug_key" ON "roles"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "permissions_slug_key" ON "permissions"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "students_userId_key" ON "students"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "civil_servants_userId_key" ON "civil_servants"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "civil_servants_registration_key" ON "civil_servants"("registration");

-- CreateIndex
CREATE UNIQUE INDEX "civil_servants_institutionalEmail_key" ON "civil_servants"("institutionalEmail");

-- CreateIndex
CREATE UNIQUE INDEX "civil_servants_siapeEmail_key" ON "civil_servants"("siapeEmail");

-- AddForeignKey
ALTER TABLE "user_roles" ADD CONSTRAINT "user_roles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_roles" ADD CONSTRAINT "user_roles_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "role_permissions" ADD CONSTRAINT "role_permissions_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "role_permissions" ADD CONSTRAINT "role_permissions_permissionId_fkey" FOREIGN KEY ("permissionId") REFERENCES "permissions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "enrollments" ADD CONSTRAINT "enrollments_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "courses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "enrollments" ADD CONSTRAINT "enrollments_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "students"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "enrollment_status_history" ADD CONSTRAINT "enrollment_status_history_enrollment_id_fkey" FOREIGN KEY ("enrollment_id") REFERENCES "enrollments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "students" ADD CONSTRAINT "students_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "civil_servants" ADD CONSTRAINT "civil_servants_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
