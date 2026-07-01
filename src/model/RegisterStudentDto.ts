export interface RegisterStudentDto{
    name: string;
    email: string;
    password: string;

    personalPhones: string[];
    cpf: string;
    registrationName: string;
    dateOfBirth: Date;
    maritalStatus: string;
    placeOfBirth: string;   
    sex: string;
    bloodType?: string;
    rhFactor?: string;   
    numberOfDependents: number;   
    raceEthnicity: string;
    fatherName?: string;  
    motherName?: string;
    pisPasep: string;
    academicTitle: string;
    educationLevel: string;   
    address: string;
    identityNumber: string;
    issuingAgency: string;
    issuingState: string;
    issueDate: Date;
    voterRegistrationNumber: string;
    electoralZone: string;
    electoralSection: string;
    voterRegistrationState: string;  

    socialName?: string;
    occupation: string;
    perCapitaIncome: number;
}