# E2E Testing Glossary

This document defines the core terminology used for End-to-End testing strategies in this project. It is strictly a glossary of terms and concepts.

### Responsive Testing

The process of verifying that the UI layout gracefully adapts to dynamic changes in viewport dimensions (e.g., resizing a browser window).
* **Domain Subject:** Desktop Browser Engines (Chromium, WebKit, Firefox).
* **Constraint:** This relies on programmatic resizing of the browser window. It cannot be executed within a Mobile Environment because mobile devices have fixed physical viewport dimensions.

### Mobile Environment Testing

The process of verifying UI behavior under true mobile constraints, such as enforced `isMobile` flags, touch events, and fixed device pixel ratios.
* **Domain Subject:** Mobile Device Emulators (Mobile Chrome, Mobile Safari).
* **Constraint:** Focuses on mobile-specific interactions (e.g., hamburger menus, touch navigation) and is skipped on desktop engines where these constraints do not apply.
