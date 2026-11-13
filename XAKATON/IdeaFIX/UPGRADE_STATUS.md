# Fix Idea — upgrade, 13.11.2026

## Implemented

- Mandatory outcome/rejection reason is checked on server and in Postgres. Authors retain access to their outcome and event history.
- Responsible person is visible on list and detail. Routing supports department + category, named owner, backup, department lead and company director/admin fallback. Absent people are skipped for new assignments. Private draft insights stay private and unassigned.
- Two SLA clocks (first response and resolution), Monday–Friday in Asia/Almaty. One working day means 24 hours excluding weekends. Holidays and office-hour calendars require company input. Existing historical dates are not rewritten.
- Idempotent escalation every 60 seconds while the function is running and when opening notifications/analytics. A sleeping function performs catch-up on its next request; this is not an always-on external scheduler. Overdue filter and visible escalation history are included.
- Accessible published duplicate search using normalized token cosine; join/follow instead of creating a duplicate. Related-cluster analytics respects record visibility.
- Dedicated completed-improvements gallery, quarter counter, real elapsed business time and author. Legacy completion dates stay unknown.
- Durable in-app notifications for assignment, comments/clarifications, status and escalation. Scope is checked again when notifications are read.
- Analytics shows outcome percentage, median first response/decision, departments/categories, overdue bottlenecks and repeated problems. CSV export protects against spreadsheet formula injection.
- Leased outbox worker with bounded retry and explicit simulated transport. No automatic external messages are sent. Real Bitrix task integrations remain explicit existing actions.
- Version checks on status/workflow/assignment changes, database append-only audit, file extension allowlist, size limits, per-user creation rate limit, local draft saving, retry/empty states.
- Only one GitHub workflow deploys. Builds run an isolated Postgres workflow test before publishing production.

## Access matrix

| Role | Access | Writes |
|---|---|---|
| Employee | Own records, ideas/projects permitted within own department, explicit company-wide publications | Own draft, comments where permitted, follow and votes |
| Department lead | Own department and explicitly shared director ideas | Own department workflow/assignment; own department meeting material |
| Director/admin | Business records within existing privacy rules; personal employee insights remain private | Company routing, SLA, role management per existing director rules |

Anonymous submissions continue to omit the author. They cannot receive personalized replies/tracking. We do not silently make existing anonymous users identifiable. Changes to anonymity policy require an explicit product decision.

## Honest demo and dependencies

The official text of records A-001…A-020 was not supplied with this plan; do not fabricate their content or claim a dataset import. Existing demo records stay labelled DEMO. Integration tests use their own synthetic namespace on the isolated Neon branch, never production.

Demo access still requires normal login: no password-free role switch or destructive reset is enabled on production. A disposable demo environment and the official dataset should be prepared before the five-minute pitch. Recorded fallback video is still a human presentation deliverable, not a claim of an existing recording.

## Five-minute demo

1. 0:00–0:40: submit an idea; show similar records and join.
2. 0:40–1:20: show named owner, routing fallback and deadlines.
3. 1:20–2:00: request clarification, author response and history.
4. 2:00–2:40: overdue filter, one escalation and notification.
5. 2:40–3:20: motivated rejection; author sees outcome.
6. 3:20–4:10: medians, department bottlenecks, repeated problems and CSV.
7. 4:10–5:00: completed-improvements gallery and rollout roadmap.

## Pilot and measurement

Proposed targets, not observed outcomes: at least 90% considered, first response within 2 business days, one implemented improvement per department per quarter. Establish the actual baseline with the company first. Pilot: 1–2 departments for six weeks; review adoption, SLA and recorded outcomes weekly. Then decide on company rollout, surveys/NPS and actual Bitrix/1C integration field mappings. The pitch should distinguish implemented features, simulated transport and these future phases.

## Run and validate

Copy `.env.example` to `.env`, configure a development Postgres URL and use `make dev`. `npm run test:unit` runs deterministic checks. `scripts/check-upgrade-branch.mjs` retrieves only the isolated branch connection using the CI Neon secret, then runs `upgrade.integration.test.mjs`. Production publishing is gated on this test. No credentials belong in the repository.
