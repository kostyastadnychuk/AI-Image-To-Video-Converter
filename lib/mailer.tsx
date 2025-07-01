import nodemailer from "nodemailer";
import { PasswordResetEmailTemplate } from "./PasswordResetEmailTemplate"; // Adjust the path as necessary
import { render } from '@react-email/render';

const naverUser = process.env.NAVER_USER;
const naverPassword = process.env.NAVER_PASSWORD;

if (!naverUser || !naverPassword) {
  throw new Error(
    "Required environment variables NAVER_USER or NAVER_PASSWORD are not set."
  );
}

interface PasswordResetEmailTemplateProps {
  resetLink: string;
  username: string;
}

const transporter = nodemailer.createTransport({
  host: 'smtp.naver.com',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: naverUser,
    pass: naverPassword,
  },
  tls: {
    rejectUnauthorized: false, // 자체 서명된 인증서를 허용
  },
});

export async function sendEmail(
  recipientEmail: string,
  subject: string,
  data: PasswordResetEmailTemplateProps
) {
  
  const htmlContent = render(
    <PasswordResetEmailTemplate
      resetLink={data.resetLink}
      username={data.username}
    />
  );

  try {
    const info = await transporter.sendMail({
      from: `"manningcompany" <${naverUser}>`,
      to: recipientEmail,
      subject: subject,
      html: htmlContent,
    });

    console.log(`Email sent to ${recipientEmail}: ${info.messageId}`);
  } catch (error) {
    console.error("Error sending email", error);
    throw error;
  }
}
