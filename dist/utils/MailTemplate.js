"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailTemplate = void 0;
class MailTemplate {
    verificationTemplate(userName, otp) {
        const template = `
        <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
          <div style="margin:50px auto;width:70%;padding:20px 0">
            <div style="border-bottom:1px solid #eee">
              <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">API by Raiza</a>
            </div>
            <p style="font-size:1.1em">Hi, ${userName}</p>
            <p>Terima kasih telah mencoba aplikasi saya, berikut adalah Kode OTP untuk verifikasi akun anda</p>
            <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${otp}</h2>
            <p style="font-size:0.9em;">Regards,<br />Raiza Farhan</p>
            <hr style="border:none;border-top:1px solid #eee" />
          </div>
        </div>
      `;
        return template;
    }
}
exports.MailTemplate = MailTemplate;
//# sourceMappingURL=MailTemplate.js.map