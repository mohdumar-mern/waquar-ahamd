const nodemailer = require("nodemailer");
const { EMAIL }  = require("../config/env");
const logger     = require("../utils/logger");

class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: EMAIL.HOST,
      port: EMAIL.PORT,
      secure: EMAIL.PORT == 465,
      auth: { user: EMAIL.USER, pass: EMAIL.PASS },
    });
  }

  async sendContactNotification(contact) {
    const html = `
      <h2 style="color:#e8000d">New Portfolio Inquiry</h2>
      <table>
        <tr><td><b>Name:</b></td>   <td>${contact.name}</td></tr>
        <tr><td><b>Email:</b></td>  <td>${contact.email}</td></tr>
        <tr><td><b>Subject:</b></td><td>${contact.subject}</td></tr>
        <tr><td><b>Budget:</b></td> <td>${contact.budget}</td></tr>
      </table>
      <p><b>Message:</b><br>${contact.message}</p>
    `;

    try {
      await this.transporter.sendMail({
        from   : EMAIL.FROM,
        to     : EMAIL.TO,
        subject: `[Portfolio] ${contact.subject} — from ${contact.name}`,
        html,
      });
      logger.info(`Contact email sent for: ${contact.email}`);
    } catch (err) {
      logger.error(`Email send failed: ${err.message}`);
    }
  }
}

module.exports = new EmailService();
