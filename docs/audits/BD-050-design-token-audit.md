# BD-050 – Design Tokens Audit

**Issue:** #142  
**Area:** UX and Accessibility  
**Updated:** 27 November 2026

## 1. Purpose

Review shared interface components and styles for consistent design tokens, spacing, typography, colours, and keyboard focus visibility.

## 2. Files reviewed

- `apps/web/src/app/globals.css`
- `apps/web/src/components/common/appShell.tsx`
- `apps/web/src/components/common/statCard.tsx`
- `apps/web/src/components/common/featureDashboard.tsx`
- `apps/web/src/components/forms/formField.tsx`
- `apps/web/src/components/theme/themeToggle.tsx`
- `apps/web/src/components/ui/button.tsx`
- `apps/web/src/components/ui/card.tsx`
- `apps/web/src/components/ui/input.tsx`
- `apps/web/src/components/ui/label.tsx`
- `apps/web/src/components/dashboard/mvp-demo/dashboardPanel.tsx`

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

### Card typography and accessibility

The shared `CardTitle` component defaults to an H2 heading.

The audit identified statistic labels in `StatCard` and `DashboardPanel` that were being rendered as H2 headings even though they function as descriptive labels rather than section headings.

**Improvement implemented:**

- Added a reusable `CardLabel` component to `card.tsx`.
- Updated `statCard.tsx` to use `CardLabel`.
- Updated `dashboardPanel.tsx` to use `CardLabel`.
- Preserved `CardTitle` for actual card headings.

The new component renders labels as paragraph elements while retaining consistent typography through the existing Tailwind classes.

This avoids introducing unnecessary headings for these statistic labels.

### Formatting consistency

Some reviewed JSX contains inconsistent quote and spacing styles.

**Recommendation:** Avoid broad formatting-only changes in this issue.

## 4. Code changes

The following production files were updated:

- `apps/web/src/components/ui/card.tsx`
- `apps/web/src/components/common/statCard.tsx`
- `apps/web/src/components/dashboard/mvp-demo/dashboardPanel.tsx`

A new test file was added:

- `apps/web/src/components/ui/card.test.tsx`

The new test verifies that:

1. `CardLabel` renders as a paragraph.
2. `CardTitle` continues to render as an H2 heading.

## 5. Verification

- TypeScript check: passed (`tsc --noEmit`, exit code 0).
- Git whitespace check: passed (`git diff --check`).
- New Card component tests: 2 passed.
- Existing full web test suite: previously reported 343 tests passed, 1 todo, and 12 failed test suites because `DATABASE_URL` was not configured.
- The full suite has not yet been rerun after the latest changes.
- The station dashboard could not be visually inspected because the application reported the missing `DATABASE_URL` configuration.

The database configuration issue has not been established as being caused by this audit.

## 6. Remaining work

- Complete visual verification of accessible dashboard screens.
- Capture genuine before-and-after screenshots for the CardLabel improvement if a suitable accessible screen can be used.
- Review the final changes.
- Run the available checks again.
- Submit the audit and justified improvements through a pull request.

## 7. Screenshot evidence

Previously captured screenshots:

- `screenshots/BD-050-homepage-dark-mode.png` – homepage in dark mode.
- `screenshots/BD-050-homepage-light-mode.png` – homepage in light mode.
- `screenshots/BD-050-keyboard-focus-after.png` – visible keyboard focus indicator on the showcase button.

These screenshots document the existing theme and keyboard focus behaviour. They do not demonstrate the new CardLabel improvement, and no before-and-after visual comparison is claimed.