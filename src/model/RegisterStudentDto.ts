export interface RegisterStudentDto{
    name: string;
    email: string;
    password: string;
    socialName?: string;
    educationLevel: string;
    occupation: string;
    perCapitaIncome: number;
}