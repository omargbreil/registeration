import nodemailer from "nodemailer";


export const sendEmail = async(dest , message) =>
{
    let transporter = nodemailer.createTransport(
        {
            service:"gmail",
            auth:
            {
                user:`${process.env.senderEmail}`,
                pass:`${process.env.senderPass}`
            }

        }
    );

    let info = await transporter.sendMail(
        {
            from:`${process.env.senderEmail}`,
            to:dest,
            html:message,
            text:"have a good day",
            subject:"hope you are happy"

        }
    )
    return info
}