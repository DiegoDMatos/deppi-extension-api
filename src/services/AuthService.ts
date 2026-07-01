import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../lib/prisma";
import { RegisterData } from "../model/Auth";
import { RegisterStudentDto } from "@/model/RegisterStudentDto";
import { RegisterCivilServantDto } from "@/model/RegisterCivilServantDto";

export class AuthService {

  async registerStudent(student: RegisterStudentDto) {

    const userAlreadyExists = await prisma.user.findUnique({
      where: {
        email: student.email
      }
    });

    if(userAlreadyExists){
      throw new Error("Usuário já existe");
    }

    const passwordHash = await bcrypt.hash(student.password, 10);

    const user = await prisma.user.create({
      data: {
        name: student.name,
        email: student.email,
        passwordHash,
        academicTitle: student.academicTitle,
        address: student.address,
        cpf: student.cpf,
        dateOfBirth: student.dateOfBirth,
        educationLevel: student.educationLevel,
        electoralSection: student.electoralSection,
        electoralZone: student.electoralZone,
        identityNumber: student.identityNumber,
        issueDate: student.issueDate,
        issuingAgency: student.issuingAgency,
        issuingState: student.issuingState,
        maritalStatus: student.maritalStatus,
        numberOfDependents: student.numberOfDependents,
        personalPhones: student.personalPhones,
        pisPasep: student.pisPasep,
        placeOfBirth: student.placeOfBirth,
        raceEthnicity: student.raceEthnicity,
        registrationName: student.registrationName,
        sex: student.sex,
        voterRegistrationNumber: student.voterRegistrationNumber,
        voterRegistrationState: student.voterRegistrationState,
        student: {
          create: {
            socialName: student.socialName,
            educationLevel: student.educationLevel,
            occupation: student.occupation,
            perCapitaIncome: student.perCapitaIncome
          }
        },

        roles: {
          create: {
            role: {
              connect: {
                slug: "ALUNO"
              }
            }
          }
        }
    }
    });

    return {
            id: user.id,
            name: user.name,
            email: user.email
        };
  }

  async registerDEPPI(civilServant: RegisterCivilServantDto) {

    const userAlreadyExists = await prisma.user.findUnique({
      where: {
        email: civilServant.email
      }
    });

    if(userAlreadyExists){
      throw new Error("Usuário já existe");
    }

    const passwordHash = await bcrypt.hash(civilServant.password, 10);

    const user = await prisma.user.create({
      data: {
        name: civilServant.name,
        email: civilServant.email,
        passwordHash,
        academicTitle: civilServant.academicTitle,
        address: civilServant.address,
        cpf: civilServant.cpf,
        dateOfBirth: new Date(civilServant.dateOfBirth),
        educationLevel: civilServant.educationLevel,
        electoralSection: civilServant.electoralSection,
        electoralZone: civilServant.electoralZone,
        identityNumber: civilServant.identityNumber,
        issueDate: new Date(civilServant.issueDate),
        issuingAgency: civilServant.issuingAgency,
        issuingState: civilServant.issuingState,
        maritalStatus: civilServant.maritalStatus,
        numberOfDependents: Number(civilServant.numberOfDependents),
        personalPhones: civilServant.personalPhones,
        pisPasep: civilServant.pisPasep,
        placeOfBirth: civilServant.placeOfBirth,
        raceEthnicity: civilServant.raceEthnicity,
        registrationName: civilServant.registrationName,
        sex: civilServant.sex,
        voterRegistrationNumber: civilServant.voterRegistrationNumber,
        voterRegistrationState: civilServant.voterRegistrationState,

        civilServant: {
          create: {
            registration: civilServant.registration,
            preferredName: civilServant.preferredName,
            institutionalEmail: civilServant.institutionalEmail,
            siapeEmail: civilServant.siapeEmail,
            passwordRecoveryEmail: civilServant.passwordRecoveryEmail,
            notificationEmail: civilServant.notificationEmail,
            googleClassroomEmail: civilServant.googleClassroomEmail,
            institutionalPhones: civilServant.institutionalPhones,
            isInPGD: civilServant.isInPGD,
            suapDepartment: civilServant.suapDepartment,
            siapeAssignmentLocation: civilServant.siapeAssignmentLocation,
            siapeExerciseLocation: civilServant.siapeExerciseLocation,
            employmentStatus: civilServant.employmentStatus,
            workRegime: civilServant.workRegime,
            workSchedule: civilServant.workSchedule,
            operatesXRayEquipment: civilServant.operatesXRayEquipment,
            publicServiceStartDate: civilServant.publicServiceStartDate
              ? new Date(civilServant.publicServiceStartDate)
              : undefined,
            institutionAppointmentDate: civilServant.institutionAppointmentDate
              ? new Date(civilServant.institutionAppointmentDate)
              : undefined,
            institutionExerciseStartDate: civilServant.institutionExerciseStartDate
              ? new Date(civilServant.institutionExerciseStartDate)
              : undefined,
            positionAppointmentDate: civilServant.positionAppointmentDate
              ? new Date(civilServant.positionAppointmentDate)
              : undefined,
            positionExerciseStartDate: civilServant.positionExerciseStartDate
              ? new Date(civilServant.positionExerciseStartDate)
              : undefined,
            position: civilServant.position,
            positionClass: civilServant.positionClass,
            standard: civilServant.standard,
            positionGroup: civilServant.positionGroup,
            vacancyCode: civilServant.vacancyCode,
            bank: civilServant.bank,
            bankBranch: civilServant.bankBranch,
            checkingAccount: civilServant.checkingAccount,
          }
        },

        roles: {
          create: {
            role: {
              connect: {
                slug: "DEPPI"
              }
            }
          }
        }
    }
    });

    return {
            id: user.id,
            name: user.name,
            email: user.email
        };
  }

  async registerProfessor(civilServant: RegisterCivilServantDto) {

    const userAlreadyExists = await prisma.user.findUnique({
      where: {
        email: civilServant.email
      }
    });

    if(userAlreadyExists){
      throw new Error("Usuário já existe");
    }

    const passwordHash = await bcrypt.hash(civilServant.password, 10);

    const user = await prisma.user.create({
      data: {
        name: civilServant.name,
        email: civilServant.email,
        passwordHash,
        academicTitle: civilServant.academicTitle,
        address: civilServant.address,
        cpf: civilServant.cpf,
        dateOfBirth: new Date(civilServant.dateOfBirth),
        educationLevel: civilServant.educationLevel,
        electoralSection: civilServant.electoralSection,
        electoralZone: civilServant.electoralZone,
        identityNumber: civilServant.identityNumber,
        issueDate: new Date(civilServant.issueDate),
        issuingAgency: civilServant.issuingAgency,
        issuingState: civilServant.issuingState,
        maritalStatus: civilServant.maritalStatus,
        numberOfDependents: Number(civilServant.numberOfDependents),
        personalPhones: civilServant.personalPhones,
        pisPasep: civilServant.pisPasep,
        placeOfBirth: civilServant.placeOfBirth,
        raceEthnicity: civilServant.raceEthnicity,
        registrationName: civilServant.registrationName,
        sex: civilServant.sex,
        voterRegistrationNumber: civilServant.voterRegistrationNumber,
        voterRegistrationState: civilServant.voterRegistrationState,

        civilServant: {
          create: {
            registration: civilServant.registration,
            preferredName: civilServant.preferredName,
            institutionalEmail: civilServant.institutionalEmail,
            siapeEmail: civilServant.siapeEmail,
            passwordRecoveryEmail: civilServant.passwordRecoveryEmail,
            notificationEmail: civilServant.notificationEmail,
            googleClassroomEmail: civilServant.googleClassroomEmail,
            institutionalPhones: civilServant.institutionalPhones,
            isInPGD: civilServant.isInPGD,
            suapDepartment: civilServant.suapDepartment,
            siapeAssignmentLocation: civilServant.siapeAssignmentLocation,
            siapeExerciseLocation: civilServant.siapeExerciseLocation,
            employmentStatus: civilServant.employmentStatus,
            workRegime: civilServant.workRegime,
            workSchedule: civilServant.workSchedule,
            operatesXRayEquipment: civilServant.operatesXRayEquipment,
            publicServiceStartDate: civilServant.publicServiceStartDate
              ? new Date(civilServant.publicServiceStartDate)
              : undefined,
            institutionAppointmentDate: civilServant.institutionAppointmentDate
              ? new Date(civilServant.institutionAppointmentDate)
              : undefined,
            institutionExerciseStartDate: civilServant.institutionExerciseStartDate
              ? new Date(civilServant.institutionExerciseStartDate)
              : undefined,
            positionAppointmentDate: civilServant.positionAppointmentDate
              ? new Date(civilServant.positionAppointmentDate)
              : undefined,
            positionExerciseStartDate: civilServant.positionExerciseStartDate
              ? new Date(civilServant.positionExerciseStartDate)
              : undefined,
            position: civilServant.position,
            positionClass: civilServant.positionClass,
            standard: civilServant.standard,
            positionGroup: civilServant.positionGroup,
            vacancyCode: civilServant.vacancyCode,
            bank: civilServant.bank,
            bankBranch: civilServant.bankBranch,
            checkingAccount: civilServant.checkingAccount,
          }
        },

        roles: {
          create: {
            role: {
              connect: {
                slug: "PROFESSOR"
              }
            }
          }
        }
    }
    });

    return {
            id: user.id,
            name: user.name,
            email: user.email
        };
  }

async login(email: string, password: string){

  const user = await prisma.user.findUnique({
    where: {
      email
    }
  });

  if(!user){
    throw new Error("Email ou senha inválidos");
  }

  const passwordMatch = await bcrypt.compare(
    password,
    user.passwordHash
  );

  if(!passwordMatch){
    throw new Error("Email ou senha inválidos");
  }

  const token = jwt.sign(
    {
      sub: user.id
    },
    process.env.JWT_SECRET!,
    {
      expiresIn: "1d"
    }
  );

  return {
    token
  };
}

}