# Email Form Integration — Deployment Guide

## Overview

Your contact form now sends emails via PHP. The solution includes:
- **`api/send_message.php`** — secure email endpoint with validation and rate limiting
- **`script.js`** — updated to send data to the PHP API
- Security features: input sanitization, rate limiting, email header injection prevention

---

## ⚙️ Setup & Deployment

### Step 1: Verify PHP Mail Configuration

Before uploading, ensure your hosting provider supports the PHP `mail()` function. Most basic PHP hosts have this enabled by default.

**To test mail support:**
Create a simple test file `test_mail.php` with this content:
```php
<?php
echo 'Mail function available: ' . (function_exists('mail') ? 'YES ✓' : 'NO ✗');
echo '<br>PHP Version: ' . phpversion();
?>
```

Upload it, visit it in your browser, and check the output. Then delete it.

### Step 2: Upload Files to Hosting

Upload the entire `landingDeveloper/` folder structure to your hosting:

```
your-domain.com/
  ├── index.html
  ├── styles.css
  ├── script.js
  └── api/
      └── send_message.php
```

**Important:** Make sure the `api/` folder exists and `send_message.php` has proper permissions (644).

### Step 3: Verify Permissions

Ensure that:
- `api/` folder is readable and writable: `chmod 755 api/`
- `send_message.php` is readable: `chmod 644 api/send_message.php`

### Step 4: Test the Form

1. Open your domain in a browser (e.g., `https://yoursite.com/`)
2. Scroll to the **"Get in Touch"** section
3. Fill in the form and click **"Send Message"**
4. Check your inbox at `isholegg@gmail.com`

**Troubleshooting:**
- **Message: "Failed to send message. Please try again later..."**
  - Contact your hosting provider; they may have mail restrictions
  - Ask them to enable the `mail()` function or provide SMTP credentials
  
- **No email received**
  - Check spam/junk folder
  - Verify sender domain is not blacklisted (hosting provider can help)
  - Check error logs: contact your host's support

---

## 🔒 Security Features

The PHP script includes:

| Feature | Details |
|---------|---------|
| **Input Validation** | Checks for empty/invalid fields, message length limits (10–5000 chars) |
| **Email Validation** | Strict format checking using PHP's `FILTER_VALIDATE_EMAIL` |
| **Rate Limiting** | Max 10 messages per hour per IP address |
| **Header Injection Prevention** | Sanitizes inputs to prevent email header manipulation |
| **Error Logging** | Failed sends are logged (no user details exposed) |

---

## 📧 Email Content Example

When a user submits the form, you'll receive an email like:

```
Subject: New Contact Form Submission from John Smith

Hi Oleg,

You have a new message from your portfolio website:

---
Name: John Smith
Email: john@example.com
---

Message:
Hi Oleg, I'm interested in your services for a web development project...

---
Submitted at: 2025-11-18 14:30:45 (UTC)
IP Address: 192.168.1.1
```

---

## 🔧 Customization

### Change Recipient Email

Edit `api/send_message.php` line 28:
```php
$recipient_email = 'your-email@gmail.com'; // Change this
```

### Change Rate Limit

Edit `api/send_message.php` line 29:
```php
$max_requests_per_hour = 10; // Change to your preferred limit
```

### Change Email Subject Format

Edit `api/send_message.php` around line 102:
```php
$subject = 'New Contact: ' . $name; // Customize the subject
```

---

## 🌐 Using a Custom Domain Email

If you want emails to come **from** a custom domain (instead of your hoster's default):

1. Your hosting provider should support SPF/DKIM records
2. Add these DNS records:
   - **SPF record:** `v=spf1 include:your-host.com ~all`
   - **DKIM:** Ask your hosting provider for setup instructions

3. In `api/send_message.php`, modify line 30:
   ```php
   $sender_email = 'contact@yourdomain.com'; // Use your custom domain
   ```

---

## 📞 Support

If emails aren't sending:
1. Check your hosting provider's mail relay policies
2. Ask them if they use mail filtering or require SMTP authentication
3. Some hosts limit `mail()` function; ask for SMTP credentials instead
4. Ensure no third-party email protection blocks your domain

---

## 🚀 Alternative: SMTP (if mail() doesn't work)

If your host doesn't support `mail()`, ask them for SMTP credentials and I can create an alternative script using `PHPMailer` (more reliable).

---

## Summary

✅ **Upload files** → **Test form** → **Check inbox** → **Done!**

The form is now fully functional and ready for production use.
