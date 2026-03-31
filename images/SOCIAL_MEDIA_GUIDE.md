# PARMAFIX – Social Media Linking Guide
## How to Connect Your Website to Facebook, TikTok, Instagram & WhatsApp

---

## 1. FACEBOOK
**Your page:** facebook.com/parmafix  
*(Create this page first at facebook.com/pages/create)*

### In your website, update ALL Facebook links:
Find this in index.html:
```
href="https://facebook.com/parmafix"
```
Replace `parmafix` with your **exact Facebook page username**.

Example:
```
href="https://facebook.com/ParmafixLTD"
```

---

## 2. INSTAGRAM
**Your handle:** instagram.com/parmafix  
*(Create this account at instagram.com)*

### In your website, update ALL Instagram links:
Find this in index.html:
```
href="https://instagram.com/parmafix"
```
Replace `parmafix` with your **exact Instagram username**.

---

## 3. TIKTOK
**Your handle:** tiktok.com/@parmafix  
*(Create this account at tiktok.com)*

### In your website, update ALL TikTok links:
Find this in index.html:
```
href="https://tiktok.com/@parmafix"
```
Replace `@parmafix` with your **exact TikTok username**.

---

## 4. WHATSAPP
**Your number:** 0729 402 030  
**International format:** +254729402030

Your website already uses this format:
```
href="https://wa.me/254729402030?text=Hello%20Parmafix!%20I%20need%20a%20quote."
```

### ✅ This is already correctly set up. No changes needed.

**How it works:**
- When someone clicks the WhatsApp button, it opens WhatsApp on their phone
- The message "Hello Parmafix! I need a quote." is pre-typed for them
- They just hit Send

### To change the pre-filled message:
Find `?text=Hello%20Parmafix!%20I%20need%20a%20quote.`  
Edit the text after `?text=` (use `%20` for spaces, `%0A` for new lines)

---

## 5. GOOGLE MAP
### To update the map to your exact location:

**Step 1:** Go to https://maps.google.com  
**Step 2:** Search for your exact address (Juja Farm Road, Nairobi)  
**Step 3:** Click your location pin  
**Step 4:** Click "Share" → "Embed a map"  
**Step 5:** Copy the `<iframe>` code  
**Step 6:** In index.html, replace the existing `<iframe>` inside `.map-wrap` with your new one

---

## 6. EMAIL
Find this in index.html:
```
href="mailto:info@parmafix.co.ke"
```
Update with your actual email address.

---

## 7. PHONE NUMBER
Your number is already set as **0729 402 030** throughout the site.  
If it changes, search for `0729402030` and `0729 402 030` in index.html and replace all.

---

## QUICK CHECKLIST BEFORE GOING LIVE
- [ ] Facebook page created → update all `facebook.com/parmafix` links
- [ ] Instagram account created → update all `instagram.com/parmafix` links  
- [ ] TikTok account created → update all `tiktok.com/@parmafix` links
- [ ] WhatsApp works on number 0729402030 ✅ (already set)
- [ ] Google Map updated with exact Juja Farm Road pin
- [ ] Email `info@parmafix.co.ke` is active
- [ ] Domain `parmafix.co.ke` is registered and hosting set up

---

## HOW TO HOST YOUR WEBSITE

### Option A: Free (for testing)
1. Go to https://netlify.com
2. Drag and drop your folder containing `index.html` and `style.css`
3. Your site goes live immediately with a free URL

### Option B: On parmafix.co.ke domain
1. Register domain at Safaricom, Truehost, or Kenya Webmaster Group
2. Upload `index.html` and `style.css` via File Manager in cPanel
3. Site goes live at www.parmafix.co.ke

---

*Parmafix Ltd · Juja Farm Road, Nairobi · Tel: 0729 402 030*
