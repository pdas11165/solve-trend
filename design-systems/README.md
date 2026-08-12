# Solve Trend Design System — Business Documents

`solve-trend-ds.css` — a print-first design system for invoices, quotes, statements of work, proposals and client reports.

## Why it exists

Every client-facing document should look like it came from the same company. This file is the single source of truth for that. Change a token here and every document updates.

## How to use it

Two options.

**Linked** — for documents you keep in this repo:

```html
<link rel="stylesheet" href="../design-systems/solve-trend-ds.css">
<body class="st-doc">
  <div class="st-sheet"> … </div>
</body>
```

**Inlined** — for anything you send to a client. Paste the CSS into a `<style>` block so the file is self-contained and renders identically on their machine with no missing stylesheet.

Invoices sent to clients should always be inlined.

## Architecture

Three layers, and the order matters:

1. **Primitives** (`--st-neutral-400`, `--st-space-4`) — raw values. Never reference these in markup.
2. **Semantic** (`--st-ink-muted`, `--st-surface-sunken`, `--st-border`) — what a thing *means*. Use these.
3. **Components** (`.st-table`, `.st-option`, `.st-totals`) — composed classes.

If you find yourself writing a hex code or a pixel value in a document, a token is missing. Add it here rather than working around it.

## The rules

- **Tabular numerals everywhere money appears.** Columns must align. `font-variant-numeric: tabular-nums` is set on `body.st-doc` and reinforced on `.st-td-right` and `.st-totals`.
- **Serif for display, sans for everything else.** `--st-font-display` is used at h1 and h2 only. Below that a serif competes with the data underneath it.
- **The amber accent marks exactly one thing per document** — the recommended option. If two things are amber, neither reads as recommended.
- **Semantic colour means status, never decoration.** Green for zero-cost or paid, red for overdue. Nothing else gets colour.
- **Print is not an afterthought.** Every component carries `page-break-inside: avoid` where a split would look broken. Test with Cmd+P before sending anything.
- **No motion, no hover states.** These are documents. Half of them will be printed.

## Components

| Class | Use for |
|---|---|
| `.st-sheet` | The document body. One per file. |
| `.st-masthead` | Logo left, document type and number right. |
| `.st-meta` | Definition list for invoice number, dates, terms. |
| `.st-party` | Bill-from / bill-to address blocks. |
| `.st-table` | Line items. Use `.st-td-desc` for the description cell and `.st-td-right` for money. |
| `.st-totals` | Right-aligned subtotal / tax / total. Add `.st-total-row` to the final pair. |
| `.st-options` + `.st-option` | Tiered pricing cards. Add `.st-option--recommended` to exactly one. |
| `.st-callout` | Notes that need to be read. `.st-callout--warn` for anything about money or risk. |
| `.st-badge` | Inline status. `--zero` for no-cost line items. |
| `.st-sign` | Signature and date block. |

## Changing the brand colour

Edit the three `--st-brand-*` primitives at the top. Everything downstream — borders, callouts, badges, the logo mark — follows automatically. Do not override brand colour at the component level.

## Reference implementation

`bssi/invoices/BSSI-INVOICE-ST-2026-001.html` — a three-option invoice with pass-through cost schedule. Copy it as the starting point for the next one.
