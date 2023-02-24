import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "romainviravaud@gmail.com",
    pass: "Lulubea17081989$",
  },
  tls: {
    rejectUnauthorized: false,
  },
});
