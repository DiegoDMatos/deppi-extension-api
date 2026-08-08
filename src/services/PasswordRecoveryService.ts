import { prisma } from "../lib/prisma";
import { randomBytes } from "crypto";

export class PasswordRecoveryService {

    async forgotPassword(email: string): Promise<void> {
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        });

        if (!user){
            return;
        }

        const token = randomBytes(32).toString("hex");
    }
}