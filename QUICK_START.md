# ⚡ Quick Start — Email Form Deployment

## 3-Minute Setup

### What You Need:
- ✅ A web hosting account with PHP (almost all have it)
- ✅ SSH access or FTP client
- ✅ Email address: `isholegg@gmail.com` (where emails go)

### Step 1: Upload (60 seconds)

Using FTP or SSH, upload the entire `landingDeveloper/` folder:

```bash
# Via SSH/SCP:
scp -r landingDeveloper/ user@yourhost.com:~/public_html/

# Or via FTP:
# Drag-and-drop the entire landingDeveloper/ folder
```

**Result:** Files should be at:
- `http://yoursite.com/index.html`
- `http://yoursite.com/api/send_message.php`

### Step 2: Set Permissions (30 seconds)

SSH into your hosting and run:

```bash
chmod 755 ~/public_html/landingDeveloper/api/
chmod 644 ~/public_html/landingDeveloper/api/send_message.php
```

### Step 3: Test (60 seconds)

1. Open browser → `http://yoursite.com`
2. Scroll to **"Get in Touch"** section
3. Fill form + click **"Send Message"**
4. Check inbox at `isholegg@gmail.com`

✅ **Done!** Emails now go to your inbox automatically.

---

## ✓ It Should Work If:

- [ ] Form shows success message ✅
- [ ] You receive email within 10 seconds ✅
- [ ] Email includes all form fields ✅
- [ ] Reply-To shows user's email ✅

---

## ✗ If It Doesn't Work:

### Emails Not Arriving?

1. **Check spam folder** (most common issue)

2. **Verify domain reputation:**
   ```bash
   # Ask your host: "Is SPF/DKIM configured for my domain?"
   ```

3. **Check PHP is enabled:**
   - Create `test.php` with: `<?php phpinfo(); ?>`
   - Upload and open in browser
   - Look for "mail" section

4. **Enable debug logging:**
   - Edit `api/send_message.php` (after line 7)
   - Add: `ini_set('error_log', __DIR__ . '/mail_errors.log');`
   - Check `api/mail_errors.log` for errors

### Form Shows Error?

1. Check browser console (F12 → Console)
2. Verify file path: `http://yoursite.com/api/send_message.php`
3. Check server error logs (in hosting control panel)

### Still Not Working?

Use **Alternative: SMTP Method**

Get SMTP credentials from your host, then:

1. Download PHPMailer: https://github.com/PHPMailer/PHPMailer/releases
2. Extract to `landingDeveloper/api/vendor/PHPMailer/`
3. Edit `api/send_message_phpmailer.php` with your SMTP details
4. Change form to call: `api/send_message_phpmailer.php`

---

## 📋 What Each File Does

| File | Purpose |
|------|---------|
| `index.html` | Contact form (no changes needed) |
| `script.js` | Form submission to PHP (updated) |
| `api/send_message.php` | Email handler (new) |
| `api/send_message_phpmailer.php` | SMTP alternative (new) |
| `*.md` | Documentation (new) |

---

## 🔐 Security (Built-In)

✅ Spam prevention (10 msgs/hour)  
✅ Input validation  
✅ Email header injection blocking  
✅ HTML entity encoding  
✅ Error logging without exposing details  

No additional security configuration needed.

---

## 🎯 Customization

### Change Recipient Email

Edit line 28 in `api/send_message.php`:

```php
$recipient_email = 'your-email@gmail.com'; // Change here
```

### Change Rate Limit

Edit line 29 in `api/send_message.php`:

```php
$max_requests_per_hour = 10; // Or any number
```

### Change Email Subject

Edit line ~105 in `api/send_message.php`:

```php
$subject = 'New Contact from ' . $name; // Customize
```

---

## 📞 If You Need Help

1. **Email not arriving?** → Ask hosting: "Is mail() enabled?"
2. **Form not submitting?** → Check server error logs
3. **Spam folder?** → Add SPF/DKIM DNS records
4. **Technical issues?** → See `EMAIL_INTEGRATION.md`

---

## ✅ Final Checklist

- [ ] Files uploaded to `landingDeveloper/`
- [ ] `api/` folder permissions set to 755
- [ ] Form tested on live domain
- [ ] Email received at destination
- [ ] Checked spam folder
- [ ] Customized recipient email (if needed)

**That's it!** Your form is now live and collecting emails. 🎉

For more details, see:
- `README_EMAIL.md` — Full summary
- `DEPLOYMENT_GUIDE.md` — Complete guide
- `EMAIL_INTEGRATION.md` — Advanced & troubleshooting
