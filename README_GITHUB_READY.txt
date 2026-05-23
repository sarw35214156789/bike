# Bike Hub GitHub Ready Website with Admin Panel

Upload these files to GitHub repository root:

- index.html
- admin.html
- assets/

Do not upload only the ZIP file.

## Admin Login
URL: admin.html

Username:
bikehubadmin

Password:
BikeHub@2026

## Features
- Modern product area
- Search, filter, sort
- Cart
- Checkout demo
- Cash on Delivery
- Card Payment demo
- Admin add/update/remove products
- Admin real product photo upload
- Admin order status update
- Download orders CSV
- Monthly report

## Important
This is for GitHub Pages/static hosting.
It uses browser localStorage.
Data is saved in the same browser only.

For real shared online admin + real database, use PHP + MySQL cPanel version.


## Product Inspect and Zoom

Customers can click a product photo or the zoom icon to open an item inspection popup.
The popup includes:
- large product photo
- hover zoom
- zoom in / zoom out / reset buttons
- product category
- price and old price
- stock count
- add to cart button

## WhatsApp Ordering Added

This version includes:
- Floating WhatsApp order button
- Order Cart on WhatsApp button
- Order This Item on WhatsApp button inside product inspect popup
- Clean customer footer without visible admin link
- Admin credentials removed from the visible login page

Before publishing, edit this file:

assets/js/store.js

Find:

const WHATSAPP_PHONE = "94770000000";

Replace it with your real WhatsApp number in international format without + sign.

Example:
const WHATSAPP_PHONE = "94771234567";

Admin page is still available directly:
admin.html

Admin login:
Username: bikehubadmin
Password: BikeHub@2026
