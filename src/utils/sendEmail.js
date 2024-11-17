import nodemailer from "nodemailer"

export const sendMail = async ({ to, subject, html }) => {
    const transporter = nodemailer.createTransport(
        {
            service: 'gmail',
            auth: {
                user: "abdom87078@gmail.com",
                pass: "qvhqecltgyzvyudx"
            }
        }
    )
    await transporter.sendMail({
        from: '"Abdalrahman Shabrawy" <abdom87078@gmail.com>',
        to,
        subject,
        html
        })
        console.log(html);
        
}