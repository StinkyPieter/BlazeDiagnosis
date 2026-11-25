# BD-050 – Design Tokens Audit

**Issue:** #142  
**Area:** UX and Accessibility  
**Date:** 25 November 2026

## 1. Purpose

Review shared interface components and styles for consistent design tokens, spacing, typography, colours, and keyboard focus visibility.

## 2. Files reviewed

- `apps/web/src/app/globals.css`
- `apps/web/src/components/common/appShell.tsx`
- `apps/web/src/components/forms/formField.tsx`
- `apps/web/src/components/theme/themeToggle.tsx`
- `apps/web/src/components/ui/button.tsx`
- `apps/web/src/components/ui/input.tsx`
- `apps/web/src/components/ui/label.tsx`

## 3. Findings

### Shared design tokens

The global stylesheet defines semantic colour tokens, border colours, focus-ring colours, radius values, and a shared shadow. Light and dark theme values are present.

**Recommendation:** Continue reusing the existing tokens instead of introducing another design system.

### Application shell

The application shell uses semantic colours and shared spacing and radius utilities. It also includes a skip-to-content link and active navigation accessibility information.

**Recommendation:** Retain the existing shared styling and navigation accessibility features.

### Form fields

The form field component uses shared labels, semantic text colours, accessible descriptions, invalid-state information, and an alert role for errors.

**Recommendation:** Retain the existing implementation.

### Theme toggle

The theme toggle supports light and dark themes and uses the existing theme preference mechanism.

**Recommendation:** Retain the existing implementation.

### Button keyboard focus

The global stylesheet defines a `:focus-visible` rule with a 3px outline and an offset. The outline colour is controlled by the theme's ring token.

Browser testing confirmed that the button displays a visible orange outline during keyboard navigation.

**Finding:** The existing button focus indicator is working. Removing the button's `focus-visible:outline-none` class did not produce a demonstrated improvement because the global focus rule already provides the visible outline.

**Decision:** No button code change is required.

### Input keyboard focus

The shared input component suppresses the default outline and applies a two-pixel Tailwind focus ring with an offset.

**Recommendation:** Keep the existing input focus treatment and include it in future consistency reviews.

### Formatting consistency

Some reviewed JSX contains inconsistent quote and spacing styles.

**Recommendation:** Avoid broad formatting-only changes in this issue.

## 4. Code changes

No production component changes are being retained at this stage. The initial button change was reverted after testing showed that the existing global focus indicator already worked.

## 5. Verification

- TypeScript check: passed (`tsc --noEmit`, exit code 0).
- Git whitespace check: passed (`git diff --check`).
- Web test suite: 343 tests passed, 1 todo, and 12 test suites failed because the database client reported that `DATABASE_URL` was not configured.
- The test failures have not been established as being caused by this audit.

## 6. Remaining work

- Review representative screens in light and dark themes.
- Capture genuine screenshots of the existing focus behaviour.
- Identify any additional evidence-backed design-token inconsistencies.
- Complete available checks.
- Submit the audit and any justified improvements through a pull request.

## 7. Screenshot evidence

The following screenshots were captured from the running application:

- `screenshots/BD-050-homepage-dark-mode.png` – homepage in dark mode.
- `screenshots/BD-050-homepage-light-mode.png` – homepage in light mode.
- `screenshots/BD-050-keyboard-focus-after.png` – visible keyboard focus indicator on the showcase button.

The screenshots document the existing theme and keyboard focus behaviour. No before-and-after improvement is claimed.
