import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "proyectoromain@gmail.com",
    pass: "yskipbxcsmpwwgfr",
  },
  tls: {
    rejectUnauthorized: false,
  },
});
