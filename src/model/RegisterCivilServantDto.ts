export interface RegisterCivilServantDto {
    name: string;
    email: string;
    password: string;
    
    registration?: string;
    preferredName?: string;
    institutionalEmail: string;
    siapeEmail?: string;
    passwordRecoveryEmail?: string;
    notificationEmail?: string;
    googleClassroomEmail?: string;
    institutionalPhones: string[];
    isInPGD: boolean;
    suapDepartment: string;
    siapeAssignmentLocation?: string;
    siapeExerciseLocation?: string;
    employmentStatus: string;
    workRegime?: string;
    workSchedule?: string;
    operatesXRayEquipment: boolean;
    publicServiceStartDate?: string;
    institutionAppointmentDate?: string;
    institutionExerciseStartDate?: string;
    positionAppointmentDate?: string;
    positionExerciseStartDate?: string;
    position: string;
    positionClass: string;
    standard: string;
    positionGroup: string;
    vacancyCode: string;
    bank?: string;
    bankBranch?: string;
    checkingAccount?: string;
}