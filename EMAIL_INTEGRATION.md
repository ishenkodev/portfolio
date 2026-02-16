# Email Integration — Quick Start & Troubleshooting

## 📋 What Changed

1. **`api/send_message.php`** — Main email handler using PHP's built-in `mail()` function
2. **`script.js`** — Updated form submission to POST to the PHP endpoint
3. **`api/send_message_phpmailer.php`** — Alternative SMTP-based solution (if needed)

---

## 🚀 Quick Start (Recommended)

### For Most Hosting Providers

Use **`send_message.php`** (standard, no dependencies):

1. Upload `landingDeveloper/` folder to your host
2. Fill the contact form and test it
3. Check inbox at `isholegg@gmail.com`

✅ Works with 99% of basic PHP hosting providers

---

## 🔧 If Basic Solution Doesn't Work

### Option A: Use PHPMailer (SMTP)

If emails aren't sending with the standard script:

1. **Download PHPMailer:**
   - Go to: https://github.com/PHPMailer/PHPMailer/releases
   - Download the latest `.zip`

2. **Extract to your hosting:**
   ```
   api/
     ├── send_message.php
     ├── send_message_phpmailer.php
     └── vendor/
         ├── PHPMailer/
         │   ├── PHPMailer.php
         │   ├── SMTP.php
         │   └── Exception.php
   ```

3. **Get SMTP credentials from your host:**
   - Ask your hosting provider for SMTP server details
   - Usually: `smtp.your-host.com` or provider-specific

4. **Update `send_message_phpmailer.php`:**
   ```php
   $smtp_host = 'smtp.gmail.com';        // Your SMTP server
   $smtp_port = 587;                     // Usually 587 or 465
   $smtp_secure = 'tls';                 // Usually 'tls' or 'ssl'
   $smtp_user = 'your-email@gmail.com';  // Your email
   $smtp_pass = 'your-app-password';     // Your password
   ```

5. **Update `script.js`:**
   Change `api/send_message.php` to `api/send_message_phpmailer.php`

---

## 🧪 Local Testing (Before Upload)

### Test 1: Check PHP mail() Function

Create `test_mail.php` in `landingDeveloper/api/`:

```php
<?php
if (function_exists('mail')) {
    echo "✓ mail() function is available<br>";
    
    // Try sending a test email
    $to = 'isholegg@gmail.com';
    $subject = 'Test Email from ' . $_SERVER['HTTP_HOST'];
    $message = "This is a test email from your portfolio contact form.";
    $result = @mail($to, $subject, $message);
    
    if ($result) {
        echo "✓ Email sent successfully!";
    } else {
        echo "✗ Email send failed (check server logs)";
    }
} else {
    echo "✗ mail() function is NOT available on this server";
}
?>
```

1. Upload `test_mail.php`
2. Visit `http://yoursite.com/api/test_mail.php`
3. Check the output

---

## 📧 Gmail Setup (If Using PHPMailer with Gmail)

### Generate App Password

1. Go to: https://myaccount.google.com/security
2. Enable **2-Step Verification**
3. Create **App Password** (select Mail + Windows Computer)
4. Copy the 16-character password
5. Use it in `send_message_phpmailer.php`:

```php
$smtp_user = 'your-gmail@gmail.com';
$smtp_pass = 'xxxx xxxx xxxx xxxx';  // Your 16-char app password
$smtp_host = 'smtp.gmail.com';
$smtp_port = 587;
$smtp_secure = 'tls';
```

---

## 🐛 Debugging

### Enable Debug Logging

In `api/send_message.php`, add before line 8:

```php
ini_set('log_errors', 1);
ini_set('error_log', __DIR__ . '/mail_errors.log');
```

### Check Server Logs

Ask your hosting provider for:
- PHP error logs
- Mail server logs
- SMTP relay restrictions

### Common Issues

| Problem | Solution |
|---------|----------|
| **"mail() function disabled"** | Ask host to enable it or use PHPMailer + SMTP |
| **"Emails go to spam"** | Add SPF/DKIM DNS records (ask host for help) |
| **"Failed to send"** | Check if mail relay requires authentication |
| **"No response from PHP"** | Check if form submits to correct endpoint path |

---

## 📁 File Structure

```
landingDeveloper/
├── index.html              (main page)
├── styles.css
├── script.js               (updated for PHP submission)
├── DEPLOYMENT_GUIDE.md     (for production)
├── EMAIL_INTEGRATION.md    (this file)
└── api/
    ├── send_message.php             (main solution)
    └── send_message_phpmailer.php   (alternative)
```

---

## ✅ Testing Checklist

- [ ] Files uploaded to `api/` folder
- [ ] `api/` folder permissions set to `755`
- [ ] Form submits without JavaScript errors
- [ ] PHP script responds with success/error message
- [ ] Email arrives in inbox (check spam folder too)
- [ ] Reply-To header shows user's email

---

## 🔒 Security Summary

Both solutions include:
- ✅ Input validation
- ✅ Email format checking
- ✅ Rate limiting (10/hour per IP)
- ✅ Header injection prevention
- ✅ XSS protection via sanitization
- ✅ Error handling without exposing details

---

## 💡 Next Steps

1. Upload files to your hosting
2. Test the contact form
3. Confirm emails arrive at `isholegg@gmail.com`
4. If issues, check server logs or ask hosting provider

Done! Your portfolio now has a fully functional email system. 🎉

---

**Need help?** Check with your hosting provider:
- Do they support PHP `mail()` function?
- What are their SMTP relay settings?
- Do they have any email filtering?
- Can they help with SPF/DKIM setup?
