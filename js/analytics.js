/**
 * Punnyam Charitable Trust - Analytics
 * Version: 1.0.0
 *
 * This file contains the Google Analytics implementation.
 * Replace 'G-XXXXXXXXXX' with your actual Google Analytics measurement ID
 * when ready to deploy.
 */

window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-XXXXXXXXXX', {
  'page_title': document.title,
  'anonymize_ip': true,
  'cookie_flags': 'SameSite=None;Secure'
}); 