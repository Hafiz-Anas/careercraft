import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { ContactFormData } from '@/types/portfolio'

// Create nodemailer transporter
const createTransporter = () => {
  return nodemailer.createTransporter({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false, // Use TLS
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })
}

// Email templates
const createEmailTemplate = (data: ContactFormData) => {
  return {
    subject: `Portfolio Contact: ${data.subject}`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Contact Form Submission</title>
          <style>
            body {
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #f8fafc;
            }
            .container {
              background: white;
              border-radius: 12px;
              padding: 30px;
              box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            }
            .header {
              text-align: center;
              margin-bottom: 30px;
              padding-bottom: 20px;
              border-bottom: 2px solid #e2e8f0;
            }
            .header h1 {
              color: #2d3748;
              margin: 0;
              font-size: 28px;
              font-weight: 600;
            }
            .header p {
              color: #718096;
              margin: 10px 0 0 0;
              font-size: 16px;
            }
            .field {
              margin-bottom: 20px;
            }
            .field-label {
              font-weight: 600;
              color: #4a5568;
              margin-bottom: 5px;
              display: block;
              font-size: 14px;
              text-transform: uppercase;
              letter-spacing: 0.5px;
            }
            .field-value {
              color: #2d3748;
              padding: 12px;
              background: #f7fafc;
              border-radius: 8px;
              border-left: 4px solid #3182ce;
              font-size: 16px;
            }
            .message-field {
              border-left-color: #38a169;
            }
            .footer {
              margin-top: 30px;
              padding-top: 20px;
              border-top: 1px solid #e2e8f0;
              text-align: center;
              color: #718096;
              font-size: 14px;
            }
            .timestamp {
              color: #a0aec0;
              font-size: 12px;
              font-style: italic;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎯 New Portfolio Contact</h1>
              <p>Someone reached out through your portfolio website</p>
            </div>
            
            <div class="field">
              <label class="field-label">👤 From</label>
              <div class="field-value">${data.name}</div>
            </div>
            
            <div class="field">
              <label class="field-label">📧 Email</label>
              <div class="field-value">
                <a href="mailto:${data.email}" style="color: #3182ce; text-decoration: none;">
                  ${data.email}
                </a>
              </div>
            </div>
            
            <div class="field">
              <label class="field-label">📝 Subject</label>
              <div class="field-value">${data.subject}</div>
            </div>
            
            <div class="field">
              <label class="field-label">💬 Message</label>
              <div class="field-value message-field">
                ${data.message.replace(/\n/g, '<br>')}
              </div>
            </div>
            
            <div class="footer">
              <p>This message was sent through your portfolio contact form.</p>
              <p class="timestamp">
                Received on ${new Date().toLocaleString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                  timeZoneName: 'short'
                })}
              </p>
            </div>
          </div>
        </body>
      </html>
    `,
    text: `
New Portfolio Contact Form Submission

From: ${data.name}
Email: ${data.email}
Subject: ${data.subject}

Message:
${data.message}

---
Received on ${new Date().toLocaleString()}
    `.trim()
  }
}

const createAutoReplyTemplate = (data: ContactFormData) => {
  return {
    subject: `Thanks for reaching out! - ${data.subject}`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Thanks for your message!</title>
          <style>
            body {
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #f8fafc;
            }
            .container {
              background: white;
              border-radius: 12px;
              padding: 30px;
              box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            }
            .header {
              text-align: center;
              margin-bottom: 30px;
            }
            .header h1 {
              color: #2d3748;
              margin: 0 0 10px 0;
              font-size: 28px;
              font-weight: 600;
            }
            .content {
              color: #4a5568;
              font-size: 16px;
              margin-bottom: 20px;
            }
            .highlight {
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
              background-clip: text;
              font-weight: 600;
            }
            .footer {
              margin-top: 30px;
              padding-top: 20px;
              border-top: 1px solid #e2e8f0;
              text-align: center;
              color: #718096;
              font-size: 14px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>✨ Thanks for reaching out!</h1>
            </div>
            
            <div class="content">
              <p>Hi <span class="highlight">${data.name}</span>,</p>
              
              <p>Thank you for your interest in my work! I've received your message about "<strong>${data.subject}</strong>" and I'm excited to learn more about your project.</p>
              
              <p>I typically respond to all inquiries within 24 hours. In the meantime, feel free to:</p>
              <ul>
                <li>📱 Connect with me on <a href="#" style="color: #3182ce;">LinkedIn</a></li>
                <li>🔍 Explore more of my work in my <a href="#" style="color: #3182ce;">portfolio</a></li>
                <li>📧 Add my email to your contacts to ensure my reply doesn't go to spam</li>
              </ul>
              
              <p>Looking forward to discussing how we can work together!</p>
              
              <p>Best regards,<br>
              <span class="highlight">Your Portfolio Owner</span></p>
            </div>
            
            <div class="footer">
              <p>This is an automated response. I'll get back to you personally soon!</p>
            </div>
          </div>
        </body>
      </html>
    `,
    text: `
Hi ${data.name},

Thanks for reaching out! I've received your message about "${data.subject}" and I'm excited to learn more about your project.

I typically respond to all inquiries within 24 hours. Looking forward to discussing how we can work together!

Best regards,
Your Portfolio Owner

---
This is an automated response. I'll get back to you personally soon!
    `.trim()
  }
}

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body: ContactFormData = await request.json()

    // Validate required fields
    if (!body.name || !body.email || !body.subject || !body.message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Check for required environment variables
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.error('SMTP credentials not configured')
      return NextResponse.json(
        { error: 'Email service not configured' },
        { status: 500 }
      )
    }

    // Create transporter
    const transporter = createTransporter()

    // Verify transporter configuration
    try {
      await transporter.verify()
    } catch (error) {
      console.error('SMTP configuration error:', error)
      return NextResponse.json(
        { error: 'Email service configuration error' },
        { status: 500 }
      )
    }

    // Prepare emails
    const notificationEmail = createEmailTemplate(body)
    const autoReplyEmail = createAutoReplyTemplate(body)

    // Send notification email to portfolio owner
    const recipientEmail = process.env.CONTACT_EMAIL || process.env.SMTP_USER
    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,
      to: recipientEmail,
      replyTo: body.email,
      subject: notificationEmail.subject,
      html: notificationEmail.html,
      text: notificationEmail.text,
    })

    // Send auto-reply to the person who contacted
    await transporter.sendMail({
      from: `"Portfolio" <${process.env.SMTP_USER}>`,
      to: body.email,
      subject: autoReplyEmail.subject,
      html: autoReplyEmail.html,
      text: autoReplyEmail.text,
    })

    // Log successful contact (you might want to store this in a database)
    console.log(`Contact form submission: ${body.name} (${body.email}) - ${body.subject}`)

    return NextResponse.json(
      { 
        success: true, 
        message: 'Message sent successfully' 
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('Contact form error:', error)
    
    return NextResponse.json(
      { 
        error: 'Failed to send message. Please try again later.' 
      },
      { status: 500 }
    )
  }
}

// Handle OPTIONS request for CORS
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}