# Seba Nexa BD — All Essential Services, One Place

A production-grade, fast, bilingual Bangladesh service directory providing verified portals, citizen charters, and helplines for government, private, and community services.

## Overview
- **Brand**: Seba Nexa BD (সেবা নেক্সা বিডি)
- **Tagline**: All Essential Services, One Place. (সকল প্রয়োজনীয় সেবা, এক ঠিকানায়)
- **Languages**: English and Bangla (বাংলা) with instantaneous locale switching.
- **Sectors**: Government (সরকারি), Private (বেসরকারি), and Community (স্বেচ্ছাসেবী / সামাজিক).
- **Transparency**: Clear verification status badges (`Verified`, `Review Needed`, `Unverified`), independent directory disclaimer, no fake ratings or inflated statistics.

## Dataset Structure
Located in `/data`:
- `categories.json`: Core service sectors and classifications.
- `subcategories.json`: Specialized service groupings.
- `official-sources.json`: Authentic departmental domains and authority bodies.
- `services.json`: Service catalog entries with localized descriptions, requirements, helplines, and official links.
- `services-review.csv`: Verification status and audit log.

## Features
- **Instant Client Search**: Dual-language search across English and Bangla terms, keywords, provider names, and category tags.
- **Dynamic Filtering**: Filter by category, sector (Government, Private, Community), and verification status.
- **Service Details**: Safe external links (`rel="noopener noreferrer"`), step-by-step citizen requirements, hotline quick-dial, and official provider citations.
- **Responsive Architecture**: Desktop-first layout optimized down to compact mobile phones without horizontal overflow.
- **Zero API Dependency**: Pure static compilation ready for Vercel, GitHub Pages, or containerized deployments.
