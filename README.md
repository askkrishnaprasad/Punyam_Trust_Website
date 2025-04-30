# Punnyam Charitable Trust Website

This repository contains the website for Punnyam Charitable Trust, a non-profit organization dedicated to helping underprivileged children.

## Repository Structure

```
├── assets/             # All website assets
│   ├── balabhavan/     # Balabhavan-specific images
│   ├── events/         # Event images
│   └── images/         # General website images
├── css/                # CSS stylesheets
├── html/               # HTML files for each page
├── js/                 # JavaScript files
├── json/               # JSON data files
├── index.html          # Root redirect to main page
└── serve.py            # Local development server
```

## Running Locally

You can run this website locally using the included Python server:

```bash
python3 serve.py
```

Then visit http://localhost:8000 in your web browser.

## Pages

- **Home**: Main landing page
- **Donation**: Information about how to donate
- **News**: Latest updates and events
- **Bala Bhavan**: Information about the children's home
  - Overview
  - Building
  - Recognition
  - Beneficiaries
- **Contact**: Contact information and form

## Deployment

To deploy to GitHub Pages:

1. Push the repository to GitHub
2. Enable GitHub Pages for the repository
3. The site will be available at https://[username].github.io/[repository-name]

## Technology Stack

- HTML5
- CSS3 with Bootstrap 5
- JavaScript
- Python (for local development server) 