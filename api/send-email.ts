import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  suburb?: string;
  message?: string;
  type?: string;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  const sendTo = process.env.SEND_TO;
  const sendFrom = process.env.SEND_FROM;

  if (!resendApiKey || !sendTo || !sendFrom) {
    console.error('Missing environment variables');
    return res.status(500).json({ error: 'Server configuration error' });
  }

  try {
    const data: ContactFormData = req.body;
    const { name, email, phone, suburb, message, type } = data;

    if (!name || !email || !phone) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const resend = new Resend(resendApiKey);

    const formType = type || 'Contact Form';
    const subjectLine = `New ${formType} Submission from ${name}`;

    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #1a1f36; color: white; padding: 30px; text-align: center; }
            .header h1 { margin: 0; font-size: 24px; }
            .content { padding: 30px; background: #f9f9f9; }
            .field { margin-bottom: 20px; }
            .label { font-weight: bold; color: #666; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; }
            .value { font-size: 16px; margin-top: 5px; }
            .footer { padding: 20px; text-align: center; color: #999; font-size: 12px; }
            .message-box { background: white; padding: 15px; border-left: 3px solid #b8a369; margin-top: 5px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>PDCON - New Enquiry</h1>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">Form Type</div>
                <div class="value">${formType}</div>
              </div>
              <div class="field">
                <div class="label">Name</div>
                <div class="value">${name}</div>
              </div>
              <div class="field">
                <div class="label">Email</div>
                <div class="value"><a href="mailto:${email}">${email}</a></div>
              </div>
              <div class="field">
                <div class="label">Phone</div>
                <div class="value"><a href="tel:${phone}">${phone}</a></div>
              </div>
              ${suburb ? `
              <div class="field">
                <div class="label">Property Suburb</div>
                <div class="value">${suburb}</div>
              </div>
              ` : ''}
              ${message ? `
              <div class="field">
                <div class="label">Message</div>
                <div class="message-box">${message.replace(/\n/g, '<br>')}</div>
              </div>
              ` : ''}
            </div>
            <div class="footer">
              <p>This email was sent from the PDCON website contact form.</p>
            </div>
          </div>
        </body>
      </html>
    `;

    const { error } = await resend.emails.send({
      from: sendFrom,
      to: sendTo,
      replyTo: email,
      subject: subjectLine,
      html: emailHtml,
    });

    if (error) {
      console.error('Resend error:', error);
      return res.status(500).json({ error: 'Failed to send email' });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
