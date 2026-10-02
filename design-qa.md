# Prototype v2 — internal design QA

final result: passed

- Source visual: ../deliverables/edp-redesign-phase1/concept-demo.png (1586 × 992).
- Governing refinement: user's second-pass brief; simplify the selected difference, disclose evidence on demand.
- Actual browser captures: /workspace/scratch/edp-prototype-desktop.jpg (1348 × 926), /workspace/scratch/edp-prototype-mobile.jpg (390 × 844).
- Desktop CSS viewport: 1363 × 936. Mobile CSS viewport: 390 × 844; additional 320 × 844 check.
- State: price selected, four pending, evidence closed. Both source and desktop implementation normalized to 900px width in ../qa-comparison.jpg.
- Full-view comparison: preserved paper/copper/graphite, document-to-finding flow, product shell, selected rail. Source excerpt, arithmetic, long disclaimers and unaffected lines intentionally removed from primary comparison.
- Focused comparison: 120 and 135 remain dominant; units appear once beneath each value; USD 225 is isolated from optional evidence. Mobile retains the same reading order.

## Required surfaces

- Typography: existing local IBM Plex Sans and Mono; large numeric values and distinct title hierarchy. Mobile document labels increased from 8 to 10px after initial capture.
- Spacing: selected finding separated from four-item rail. Mobile rail reflows to 2 × 2; no horizontal overflow at 390 or 320px.
- Tokens: paper #F4F1EB, surface #FFFEFA, ink #172126, copper #9A562C. Selection and review remain distinguishable by text and shape.
- Assets: local fonts and existing Lucide icons; no stock photo. Hero visual is semantic frontend document-comparison UI, as explicitly requested instead of a raster.
- Copy: fixture values and excerpts preserved; missing evidence and approval qualified to the received package. No invented pricing or service-level claim.

## Fixes and verification

- Initial modal lacked centered margins after reset. Added margin:auto; desktop bounds 720 × 510.5 centered at x321.5/y212.75; mobile bounds 352 × 522.75 centered at x19/y160.625.
- Closing example after source reveal could expose the separate source modal. Clear both states on example close; verified zero open dialogs.
- Initial fragment link did not scroll after React mount. Scroll to product after mount for product/demo/finding fragments; verified mobile reload.
- Tested all four selections on desktop and mobile, each comparison, source open/close, source tabs, optional explanation/calculation, Escape, example reveal/close, 4→3 pending and undo to 4.
- Tested three initially collapsed FAQ answers and additional-question disclosure/re-collapse.
- Browser console inspected: no application warnings/errors; browser-extension metadata errors excluded.
- Build, lint and all 11 existing fixture/source tests pass.
- No actionable P0/P1/P2 issues remain. Production deployment is unchanged.
