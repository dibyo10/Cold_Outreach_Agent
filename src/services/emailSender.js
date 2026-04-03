import { createTransport} from "./emailTransport.js";

const transporter = createTransport();

export async function sendEmail({to , subject , body}){

    if(!to||!subject||!body){
        throw new Error("Invalid email payload")
    }
    try{
        const info = await transporter.sendMail({
            from: `"Dibyo" <${process.env.SMTP_USER}>`,
            to,
            subject,
            text:body,

        });
        return {
            success: true,
            messageId: info.messageId,
        };
    } catch (error) {
        return {
            success: false,
            error: error.message,
        };
    }
}