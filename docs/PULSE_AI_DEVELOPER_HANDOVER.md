# Pulse.ai Executive Dashboard

## Developer Handover and Project Summary

**Document status:** Current implementation audit  
**Primary product artifact:** `artifacts/pulse-ai-dashboard`  
**Related scaffold:** `artifacts/api-server`, `lib/api-spec`, `lib/api-client-react`, `lib/db`  
**Important:** The current product is a polished, responsive front-end prototype. Most displayed business data is hardcoded, and the dashboard is not connected to a production backend, authentication provider, or persistent database.

---

## 1. Project Overview

### What the application is

Pulse.ai is an enterprise executive dashboard prototype for reviewing consolidated business performance, operational insights, decision requests, and AI-assistant concepts from one interface.

The product has two closely matched editions:

1. **Executive Edition** — a PIH consolidated executive view across seven businesses.
2. **UCC Business Edition** — a UCC-focused view across four companies/business units.

Both editions use the same main dashboard shell, navigation model, interaction patterns, and responsive layout. Edition-specific branding, identity, copy, insights, and Group Performance data are selected at runtime.

### Purpose

The interface is intended to help senior leadership:

- Review key enterprise KPIs.
- Compare group or business-unit performance.
- Surface high-priority insights.
- Review and act on decision requests.
- Access a conceptual “Ask Pulse” assistant.
- Switch between executive-level and UCC business-level reporting.

### Intended users

- Group presidents and chief executives.
- Business-unit leaders.
- Senior operating executives.
- Executive-office and strategy teams.
- Decision owners and approvers.

The interface displays named executive identities for demonstration purposes, but these identities are not authenticated accounts.

### Business use case

The product demonstrates a future executive operating system that combines:

- Consolidated financial and operating metrics.
- AI-generated or curated insights.
- Portfolio and business-unit comparisons.
- Decision approval workflows.
- Contextual assistant experiences.
- Navigation to projects, dashboards, artifacts, data connections, memories, and skills.

Only a subset of those concepts currently has a dedicated implementation.

### Current stage

The application is best classified as a **high-fidelity, interactive front-end prototype**:

- Core dashboard views are visually polished.
- Desktop and mobile layouts are implemented.
- Light and dark themes are implemented.
- Executive and UCC Business editions are implemented.
- Major interactions work through local React state.
- All business data is static/demo data.
- Ask Pulse does not call an AI model.
- Decision actions do not persist.
- Authentication and role enforcement are not implemented.
- The API server only exposes a health endpoint.
- The database package has no application schema.

---

## 2. Original Requirements and Final Product Direction

This section consolidates the final requirements reflected in the conversation history and current implementation.

### 2.1 Overall application requirements

- Build a premium enterprise dashboard for Pulse.ai.
- Present a consolidated executive overview with KPIs, insights, company performance, decisions, and agents.
- Maintain two closely matched editions:
  - PIH Executive Edition.
  - UCC Business Edition.
- Keep both editions within the same product and component structure.
- Create a polished, presentation-ready experience rather than a generic admin template.

### 2.2 UI and UX requirements

- Premium, restrained, executive visual language.
- Strong editorial hierarchy and large serif headings.
- Calm neutral backgrounds with dark navy typography.
- Compact but readable controls.
- Subtle shadows, borders, and transitions.
- Avoid excessive decoration.
- Preserve interaction consistency across light and dark themes.
- Keep important controls usable with keyboard and touch.

### 2.3 Dashboard requirements

- Personalized executive greeting.
- Edition-specific masthead and identity.
- Rotating Insights feature card.
- KPI summary for revenue, EBITDA/profit, budget achievement, forecast, and time-versus-achievement.
- Period controls for Today, MTD, and YTD.
- Group Performance section with:
  - Line/Bar presentation.
  - Orbit presentation.
  - Hover/focus details.
  - Selected-group state.
  - Positive/negative/stable trend coloring.
  - Existing highest/lowest KPI highlighting preserved.
- Decisions summary carousel.
- Agent cards.
- Floating Ask Pulse launcher.

### 2.4 UCC Business Edition requirements

- Reuse the Executive dashboard structure.
- Show the UCC brand identity and executive greeting.
- Use colored UCC branding in light theme and white branding in dark theme.
- Provide UCC-specific insight content.
- Rename Group Performance context to companies/business units.
- Use the supplied UCC unit metrics:
  - Infrastructure: QAR 2.42B, 98%, On track.
  - Contracting: QAR 1.87B, 96%, On track.
  - Hospitality: QAR 0.93B, 89%, Watch.
  - Services: QAR 0.60B, 103%, Ahead of plan.
- Preserve Line/Bar and Orbit interactions.

### 2.5 Navigation requirements

- Persistent left navigation.
- Collapsible desktop sidebar.
- Drawer navigation on mobile.
- Ask Pulse available from:
  - Sidebar.
  - Keyboard shortcut.
  - Floating launcher.
- Edition switch in the header.
- Theme switch in the header.
- Profile menu.

### 2.6 Decision workflow requirements

- Dedicated Executive Decision Desk.
- Searchable and filterable request queue.
- Priority-aware decision cards.
- Rich request detail with:
  - Context.
  - Key impacts.
  - Supporting documents.
  - Workflow history.
  - Requester metadata.
- Context-specific actions for approval, risk, and signal requests.
- Contextual Ask Pulse panel.
- Responsive queue/detail behavior.

### 2.7 Mobile and responsive requirements

- Adapt the full dashboard to phone, tablet, and desktop.
- Replace desktop navigation with a mobile drawer.
- Keep touch targets usable.
- Convert dense layouts into scrollable or stacked mobile layouts.
- Provide mobile-specific Orbit navigation.
- Respect safe-area insets for the floating Ask Pulse control.

### 2.8 Animation and interaction requirements

- Rotating Insights carousel.
- Page-turn/3D transition treatment for Insights.
- Animated Orbit visualization.
- Agent marquees with pause behavior.
- Smooth sidebar and assistant-panel transitions.
- Floating Ask Pulse typing animation approximately once every ten seconds.
- Reduced-motion support.

### 2.9 Ask Pulse launcher requirements

- CSS-rendered chat/message icon rather than using the original reference image directly.
- Blue circular outer container.
- Smooth, continuous rounded speech-bubble shape.
- Three centered, evenly aligned dots.
- Pulse blue/dark-blue treatment with no green accent.
- Bubble geometry must remain visually stable while only the dots animate.
- Approved geometry is treated as final and should not be structurally changed without an explicit new request.

### 2.10 Theme requirements

- Full light and dark presentation.
- Theme-aware logos.
- Theme-aware text, borders, cards, shadows, charts, and status colors.
- Dark mode defaults on small screens unless a query parameter explicitly selects a theme.

### 2.11 Data and integration expectations

The current version demonstrates the intended experience with static values. A production version will need:

- Real KPI and trend feeds.
- Real insight generation or retrieval.
- Persistent decision requests and actions.
- Authentication and authorization.
- User and role data.
- Actual document access.
- AI model integration for Ask Pulse.
- Live refresh timestamps.

---

## 3. What Has Been Implemented

### Status legend

- **Implemented:** Works in the browser using real local UI logic.
- **Static/demo:** Fully rendered but backed by hardcoded content.
- **Prototype-only:** Simulates an action with local state or a toast.
- **Not implemented:** Requires backend, persistence, authentication, or another system.

| Requirement | Status | Current implementation | Relevant files |
|---|---|---|---|
| Executive dashboard shell | Implemented | Responsive sidebar, header, dashboard content, theme and edition state | `src/PulseDashboard.tsx`, `src/pulse.css`, `src/pulse-overrides.css` |
| UCC Business Edition | Implemented with static data | Query/state-driven edition with UCC branding, copy, insights, and units | `src/PulseDashboard.tsx` |
| KPI period switching | Implemented with static data | Today/MTD/YTD changes values from local datasets | `src/PulseDashboard.tsx` |
| Insights carousel | Implemented with static data | Manual navigation, progress controls, 8-second autoplay, 3D transition | `src/PulseDashboard.tsx`, `src/pulse.css`, `src/pulse-overrides.css` |
| Group Performance bars | Implemented with static data | Selection, keyboard activation, hover/focus tooltip, highlighted extremes | `src/PulseDashboard.tsx`, `src/pulse.css`, `src/pulse-overrides.css` |
| Group Performance Orbit | Implemented with static data | Interactive nodes, selected group, responsive/mobile controls | same files as above |
| Trend indicator coloring | Implemented | All trends are color-coded; existing highest/lowest override behavior remains | `src/pulse-overrides.css` |
| Group analysis input | Prototype-only | Expandable prompt area; submission shows a toast | `src/PulseDashboard.tsx` |
| Decisions summary | Implemented with static data | Previous/next carousel and entry into Decision Desk | `src/PulseDashboard.tsx` |
| Decision Desk queue | Implemented with static data | Search, priority filtering, selection, responsive queue/detail layout | `src/DecisionsWorkspace.tsx`, `src/decisions.css` |
| Decision actions | Prototype-only | Buttons produce toasts; no mutation or persistence | `src/DecisionsWorkspace.tsx` |
| Decision attachments | Prototype-only | Attachment selection produces a toast; no real download | `src/DecisionsWorkspace.tsx` |
| Contextual decision assistant | Prototype-only | Deterministic local responses based on prompt keywords | `src/DecisionsWorkspace.tsx` |
| Ask Pulse screen | Prototype-only | Input, chips, selectors, and agents respond locally or with toasts | `src/PulseDashboard.tsx` |
| Ask Pulse AI integration | Not implemented | No model or API request | — |
| Floating Ask Pulse launcher | Implemented | Opens Ask Pulse, custom blue speech-bubble icon, animated dots | `src/PulseDashboard.tsx`, `src/pulse-overrides.css` |
| Desktop navigation | Implemented | Persistent/collapsible sidebar | `src/PulseDashboard.tsx`, `src/pulse-overrides.css` |
| Mobile navigation | Implemented | Drawer, backdrop, focus handling, scroll lock | same files as above |
| Secondary sidebar screens | Not implemented | Most selections return to the Glance content | `src/PulseDashboard.tsx` |
| Light/dark themes | Implemented | Local theme state and `.pulse-ref3d.light/.dark` rules | `src/PulseDashboard.tsx`, CSS files |
| Authentication | Not implemented | No login, session, SSO, or protected route | — |
| Roles/authorization | Not implemented | Displayed titles are content only, not security roles | — |
| Backend dashboard APIs | Not implemented | API only exposes health | `artifacts/api-server` |
| Database persistence | Not implemented | Drizzle package exists, but no product tables | `lib/db` |
| Automated tests | Not implemented | No test files or test scripts located | — |

---

## 4. Application Screens and Views

### Routing model

The application has one actual Wouter route:

- `/` → `PulseDashboard`
- Any unmatched path → `NotFound`

Internal screens are selected through local state and some query parameters rather than separate routes.

Supported query-driven startup state:

- `?edition=business`
- `?theme=light`
- `?theme=dark`
- `?view=decisions`
- `?view=ask-pulse`
- `?groupView=orbit`

Not all local state is persisted back into the URL.

### 4.1 Glance — Executive Edition

**Purpose:** Consolidated PIH executive overview.

**Main sections:**

1. Masthead and greeting.
2. Insights carousel.
3. Enterprise position KPI row.
4. Group Performance.
5. Decisions summary.
6. Agents marquee.
7. Floating Ask Pulse launcher.

**Data:** Hardcoded in `PulseDashboard.tsx`.

**Interactions:**

- Today/MTD/YTD period selection.
- Insights carousel controls and autoplay.
- Group selection through bars or Orbit nodes.
- Bar tooltip on hover/focus.
- Line/Bar and Orbit view switch.
- Group question area.
- Decision carousel navigation.
- Entry to Decision Desk.
- Agent card selection toast.
- Floating Ask Pulse navigation.

**Responsive behavior:**

- Desktop uses fixed/sidebar layout.
- Tablet uses a drawer-trigger navigation.
- KPI and content grids compress or stack.
- Agent cards become touch-scrollable on small screens.
- Orbit converts into a simplified mobile constellation.

**Unfinished functionality:**

- Values are not loaded from an API.
- Refresh timestamp is static.
- Group questions do not call an analysis service.
- Agent cards do not open working agents.

### 4.2 Glance — UCC Business Edition

**Purpose:** UCC-focused operating overview using the same shell.

**Differences from Executive Edition:**

- UCC logo and theme-aware logo switching.
- “Good Morning, Boyd Merrett.”
- UCC Business View masthead.
- UCC-specific Insights.
- “UCC at a Glance” title.
- “Companies and Business Units” Group Performance section.
- Four UCC operating units.
- Business-specific profile identity and role copy.

**Entry:**

- Header edition switch.
- `?edition=business`.

**Implementation status:** Functional presentation with hardcoded data.

### 4.3 Ask Pulse

**Purpose:** Demonstrate an enterprise assistant landing experience.

**Main sections:**

- Heading and prompt composer.
- Rotating placeholder text.
- Attachment control.
- Model selector.
- Submit control.
- Project selector.
- Suggested prompt chips.
- “Our Agents” cards/marquee.
- Recent Tasks in the sidebar.

**Interactions:**

- Submit clears the field and shows a toast.
- Attachment/model/project controls show toasts.
- Suggested prompts populate or simulate assistant actions.
- Agent cards show selection feedback.
- Keyboard shortcut `Cmd/Ctrl + K` opens the view.

**Data:** Hardcoded placeholders, agents, prompts, and recent tasks.

**Not implemented:**

- LLM request.
- Streaming response.
- Conversation persistence.
- File upload.
- Model selection behavior.
- Project-aware retrieval.

### 4.4 Executive Decision Desk

**Purpose:** Review executive requests and simulate actions.

**Main sections:**

- Searchable request queue.
- All Requests/Priority filter.
- Selected decision detail.
- Request metadata.
- Context and key impacts.
- Supporting documents.
- Context-specific action controls.
- Workflow/audit timeline.
- Contextual Ask Pulse panel.

**Interactions:**

- Search by title, description, platform, or requester.
- Filter priority requests.
- Select a queue item.
- Navigate previous/next.
- Open and close contextual assistant.
- Send contextual assistant prompts.
- Trigger decision actions and attachment toasts.

**Data:** Nine hardcoded decision records in `DecisionsWorkspace.tsx`.

**Responsive behavior:**

- Desktop: queue and detail side by side.
- Tablet: stacked or horizontally scrollable queue.
- Mobile: queue-first/detail-second navigation with sticky controls.

**Not implemented:**

- Server-side request retrieval.
- Approval persistence.
- Audit-event persistence.
- Attachments/downloads.
- Notifications.
- Assignment changes.
- Real AI response generation.

### 4.5 Placeholder navigation destinations

The following sidebar entries are visible but do not have distinct screens:

- Projects.
- Scheduled Tasks.
- Dashboards.
- Live Artifacts.
- Connected Apps & Data.
- Memories.
- Skills Library.
- Settings.

Selecting these currently falls through to the Glance dashboard content.

---

## 5. Component Inventory

### `App`

**File:** `artifacts/pulse-ai-dashboard/src/App.tsx`

**Purpose:** Application providers and top-level routing.

**Provides:**

- TanStack Query client.
- Tooltip provider.
- Wouter router.
- Error boundary.
- Toast renderer.

**Current coupling:** Query infrastructure is present but not used for product data.

### `PulseDashboard`

**File:** `artifacts/pulse-ai-dashboard/src/PulseDashboard.tsx`

**Purpose:** Main application shell and most product views.

**Responsibilities:**

- Sidebar and mobile drawer.
- Header.
- Theme state.
- Edition state.
- Active view state.
- Glance dashboard.
- Ask Pulse view.
- Insights carousel.
- KPI period state.
- Group bars and Orbit.
- Decision summary.
- Agent marquees.
- Floating Ask Pulse button.

**Important state includes:**

- Theme.
- Edition.
- Active navigation item.
- Sidebar collapsed/open state.
- Insights index/transition state.
- KPI period.
- Group view and selected group.
- Hovered group.
- Profile menu.
- Ask Pulse prompt state.

**Reusability:** Tightly coupled. This is a large product component and would benefit from decomposition before major backend integration.

### `DecisionsWorkspace`

**File:** `artifacts/pulse-ai-dashboard/src/DecisionsWorkspace.tsx`

**Purpose:** Complete Decision Desk experience.

**Responsibilities:**

- Static decision dataset.
- Queue search and filter.
- Selected decision detail.
- Responsive queue/detail behavior.
- Action controls.
- Supporting documents.
- Workflow timeline.
- Contextual assistant state and local responses.

**Reusability:** Tightly coupled to the decision screen and its local data format.

### `ErrorBoundary`

**File:** `src/components/error-boundary.tsx`

**Purpose:** Catch route-level rendering errors and reset when location changes.

### UI primitives

**Folder:** `src/components/ui/`

The project includes a broad collection of Radix/shadcn-style primitives such as:

- Toast.
- Tooltip.
- Dialog.
- Select.
- Tabs.
- Buttons.
- Inputs.
- Popovers.
- Scroll areas.

Many are template dependencies and are not all used by the current Pulse screens.

### Hooks

- `src/hooks/use-mobile.tsx` — generic viewport check.
- `src/hooks/use-toast.ts` — toast API.

### Not separately componentized

The following visible concepts currently live inside `PulseDashboard.tsx` rather than separate reusable files:

- Sidebar.
- Header.
- Insights carousel.
- KPI row.
- Group bars.
- Group Orbit.
- Decision summary card.
- Ask Pulse view.
- Agent card/marquee.
- Floating assistant launcher.

---

## 6. Project and Folder Structure

```text
/
├── artifacts/
│   ├── pulse-ai-dashboard/        # Primary product web app
│   │   ├── public/
│   │   │   └── images/            # Runtime dashboard imagery
│   │   ├── src/
│   │   │   ├── components/        # Error boundary and UI primitives
│   │   │   ├── hooks/             # Mobile and toast hooks
│   │   │   ├── lib/               # Small utilities
│   │   │   ├── pages/             # Not-found page
│   │   │   ├── App.tsx            # Providers and routing
│   │   │   ├── main.tsx           # React entry point
│   │   │   ├── PulseDashboard.tsx # Main shell and dashboard/Ask Pulse
│   │   │   ├── DecisionsWorkspace.tsx
│   │   │   ├── index.css          # Tailwind/base token layer
│   │   │   ├── pulse.css          # Base dashboard visual system
│   │   │   ├── pulse-overrides.css# Current shell/refinements/responsiveness
│   │   │   ├── pulse-dark.css     # Stale/unreferenced legacy stylesheet
│   │   │   └── decisions.css      # Decision Desk styling
│   │   ├── package.json
│   │   ├── vite.config.ts
│   │   └── .replit-artifact/artifact.toml
│   ├── api-server/                # Express scaffold; health endpoint only
│   └── mockup-sandbox/            # Canvas/design preview artifact
├── lib/
│   ├── api-spec/                  # OpenAPI contract; health only
│   ├── api-zod/                   # Generated schemas
│   ├── api-client-react/          # Generated client; not used by dashboard
│   └── db/                        # Drizzle/PostgreSQL setup; no product schema
├── attached_assets/               # Imported logos and reference assets
├── docs/                          # Handover documentation
├── package.json                   # Workspace scripts
└── pnpm-workspace.yaml            # Workspace package configuration
```

### Recommended starting points

1. `artifacts/pulse-ai-dashboard/src/App.tsx`
2. `artifacts/pulse-ai-dashboard/src/PulseDashboard.tsx`
3. `artifacts/pulse-ai-dashboard/src/DecisionsWorkspace.tsx`
4. `artifacts/pulse-ai-dashboard/src/pulse-overrides.css`
5. `artifacts/pulse-ai-dashboard/src/decisions.css`
6. `artifacts/api-server/src/app.ts`
7. `lib/api-spec/openapi.yaml`
8. `lib/db/src/schema/index.ts`

---

## 7. Technology Stack

### Application framework

- React 19.
- TypeScript.
- Vite.

### Workspace and package management

- pnpm workspace.
- Multiple artifacts and shared libraries.

### Routing

- Wouter.
- Only the root route is a real product route.
- Most screen navigation is local state.

### Styling

- Tailwind CSS 4 infrastructure.
- Large custom CSS stylesheets.
- CSS variables and theme classes.
- CSS Grid and Flexbox.
- CSS keyframes and transforms.
- Inline style variables for chart sizing.

The visible Pulse experience is primarily custom CSS, not Tailwind utility markup.

### UI primitives

- Radix UI packages.
- shadcn-style local components.
- Sonner/Radix toast infrastructure.

### Icons

- Lucide React.
- CSS-rendered/masked Ask Pulse launcher mark.

### Charts and visualization

- Group bars are custom DOM/CSS.
- Orbit is custom DOM/CSS.
- Some chart-like marks use inline SVG.
- Recharts is installed but is not the main implementation for current dashboard visuals.

### Animation

- CSS keyframes and transitions.
- CSS 3D transforms.
- Framer Motion is installed, but the visible dashboard motion is primarily CSS.

### State management

- React component state.
- No global state library.
- TanStack Query provider exists but currently has no dashboard data queries.

### Forms

- Inputs are managed through local React state.
- React Hook Form and Zod are installed but not central to the current product flows.

### Backend scaffold

- Express 5.
- OpenAPI.
- Generated Zod/client packages.
- PostgreSQL and Drizzle ORM scaffolding.
- Pino HTTP logging.

---

## 8. Design System and Styling

### Main styling files

- `src/index.css` — Tailwind import and general HSL tokens.
- `src/pulse.css` — dashboard foundation and legacy/reference styling.
- `src/pulse-overrides.css` — current shell, refinements, themes, responsive behavior, and recent design changes.
- `src/decisions.css` — Decision Desk.
- `src/pulse-dark.css` — appears stale and is not imported by the current app.

Because `pulse-overrides.css` loads after `pulse.css`, it generally has final control over the dashboard presentation.

### Core Executive tokens

Defined near the beginning of `pulse-overrides.css`.

#### Light

- Background: `#faf9f6`
- Main ink: `#142534`
- Muted text: `#707b85`
- Divider/border: `#e6e2db`
- Warm accent: `#cda465`
- Dark blue: `#1f3b57`

#### Dark

- Background: `#0b1116`
- Main ink: `#e8ecef`
- Muted text: `#83919e`
- Divider/border: `#2a343d`
- Light theme-blue text: `#8eb3d6`

### Pulse launcher palette

Approved launcher treatment uses:

- `#36638D`
- `#203B55`
- `#1E3658`

The speech-bubble geometry and dot arrangement are approved and should not be structurally modified without an explicit request.

### Status colors

Current Group Performance conventions:

- Positive: green (`#2b9b6f`; dark variant `#55c995`)
- Negative: red (`#cf4358`; dark variant `#f06d7f`)
- Stable: Pulse blue (`#36638d`; dark variant `#7fa9ce`)

The existing highest and lowest group classes have stronger selectors and intentionally continue to control both KPI value and trend color.

### Typography

Imported font families include:

- DM Sans.
- Fraunces.
- Space Grotesk.

Named fallbacks also include:

- Google Sans.
- Product Sans.

Google Sans/Product Sans are not bundled and may fall back depending on the browser.

General usage:

- Fraunces: editorial headings.
- DM Sans/Google Sans-style stack: shell and body copy.
- Space Grotesk: numeric/display values.

### Shape language

- Main cards: commonly 16px radius.
- Large windows/panels: approximately 21–22px.
- Smaller controls: 4–12px depending on context.
- Circular controls: 50%.
- Group bars: compact rounded corners.

### Shadows

- Light theme uses low-opacity, broad shadows.
- Dark theme uses deeper black shadows with restrained highlights.
- Floating launcher uses layered outer shadow, subtle ring, and inset highlight.

### Icons

- Product/navigation icons: Lucide.
- Floating Ask Pulse bubble: CSS mask path.
- Group trend arrows: text arrow glyphs in the trend label.

### Theme mechanism

The root dashboard receives either:

- `.pulse-ref3d.light`
- `.pulse-ref3d.dark`

Theme state is initialized from:

1. `?theme=light|dark`, or
2. viewport width, with dark as the small-screen default.

Theme selection is not persisted to storage.

---

## 9. Responsive Behavior

### Desktop

- Persistent left sidebar.
- Sidebar can collapse to a narrow icon rail.
- Header controls remain visible.
- KPI cards display in a wide row.
- Group Performance uses full bars or Orbit.
- Decision Desk uses queue and detail panes.
- Agent sections use animated marquees.

### Tablet

- Navigation moves toward drawer behavior.
- Dashboard grids reduce column count.
- Controls remain touch-sized.
- Decision queue/detail layout begins stacking.
- Dense content may use horizontal scrolling.

### Mobile

- Sidebar becomes an off-canvas drawer.
- Backdrop and close control are provided.
- Body scrolling is locked while the drawer is open.
- KPI layouts stack or reflow.
- Insight card receives a larger mobile presentation area.
- Group controls are touch-sized.
- Orbit changes from a desktop orbital map into a simpler mobile arrangement.
- Previous/next arrows and dots are available for group navigation.
- Decision Desk uses queue-first/detail-second navigation.
- Agent marquees become horizontal touch-scroll areas.
- Floating Ask Pulse respects the safe-area inset.

### Important breakpoints

The styles use several breakpoints rather than one centralized scale:

- 1100px.
- 1025px / 1024px.
- 900px.
- 768px.
- 760px.
- 720px.
- 640px.
- 560px.

### Remaining responsive risks

- Very long translated copy has not been tested.
- Dynamic backend values may be longer than current fixtures.
- Browser/font fallback differences can affect numeric density.
- Secondary placeholder pages do not yet have layouts.
- Real file/document names may require stronger overflow handling.

---

## 10. Animations and Special Interactions

### Insights carousel

**Behavior:**

- Autoplays approximately every eight seconds.
- Supports manual progress/tab selection.
- Uses a page-turn/3D transition.

**Technique:** React timers and local state plus CSS transforms/keyframes.

**Files:** `PulseDashboard.tsx`, `pulse.css`, `pulse-overrides.css`.

### Group Orbit

**Behavior:**

- Decorative rings drift.
- Nodes float subtly.
- Nodes respond to selection and hover/focus.
- Mobile presentation replaces the full orbital geometry.

**Technique:** DOM elements, CSS transforms, pseudo-elements, and keyframes.

### Group bar interactions

**Behavior:**

- Hover/focus selects or previews a group.
- Tooltip displays additional performance values.
- Highest and lowest KPI records receive existing positive/negative emphasis.
- Every trend indicator is color-coded.

**Technique:** React local state and CSS classes.

### Agent marquees

**Behavior:**

- Repeated agent cards move continuously on desktop.
- Animation pauses on hover.
- Mobile uses touch scrolling.

**Technique:** Duplicated arrays and CSS marquee keyframes.

### Sidebar and mobile drawer

**Behavior:**

- Desktop collapse/expand.
- Mobile slide-in drawer.
- Backdrop.
- Escape handling.
- Focus management and body scroll locking.

**Technique:** React state/effects and CSS transitions.

### Decision assistant panel

**Behavior:** Slides into view and maintains a local transcript.

**Technique:** React state and CSS transition.

### Floating Ask Pulse launcher

**Behavior:**

- Fixed near the bottom center.
- Opens Ask Pulse and smoothly scrolls to the top.
- Three dots animate briefly within an approximately ten-second cycle.
- The bubble silhouette stays stationary.

**Technique:** CSS mask path, CSS keyframes, and React navigation state.

**Accessibility:** Animation is disabled under `prefers-reduced-motion`.

### Reduced-motion handling

Reduced-motion rules disable or minimize:

- Marquee animation.
- Floating launcher dot animation.
- Some carousel and panel transitions.
- Other decorative motion.

---

## 11. Data

### Hardcoded application data

Most product data is declared directly in source files.

#### `PulseDashboard.tsx`

Contains:

- Today/MTD/YTD enterprise KPI datasets.
- Executive insight slides.
- UCC insight slides.
- Decision summary records.
- Agent definitions.
- Ask Pulse prompt suggestions.
- Ask Pulse rotating placeholders.
- Recent tasks.
- Seven executive group records for each period.
- Four UCC business-unit records.

#### `DecisionsWorkspace.tsx`

Contains:

- Nine full decision records.
- Requester metadata.
- Context and impact copy.
- Supporting document metadata.
- Workflow timelines.
- Decision types and actions.

### Dynamic calculations

The UI calculates or derives:

- Pace difference from achieved percentage minus elapsed percentage.
- Highest and lowest group values using the group `height` field.
- Selected group based on interaction state.
- Filtered decision results.
- Active insight and transition state.
- Edition-specific group selection/highlight rules.

### Local/static assets

Primary assets include:

- Pulse logo.
- UCC colored logo.
- UCC white logo.
- Insights background image.
- Favicon and robots file.

Imported logo files are referenced through the `@assets` alias, which points to root `attached_assets`.

### What must be replaced for production

- KPI datasets.
- Group/business-unit values.
- Insight copy and confidence/status metadata.
- Decisions.
- Requesters and roles.
- Attachments.
- Workflow/audit events.
- Agent catalog.
- Recent tasks.
- Refresh time.
- Ask Pulse responses.

These should move behind typed API contracts rather than being replaced with direct ad hoc fetch calls throughout components.

---

## 12. APIs and Backend Integration

### Current API usage by the dashboard

There is no active product API usage in the Pulse dashboard source:

- No dashboard `fetch`.
- No Axios calls.
- No generated client usage.
- No business-data query hooks.
- No mutations.

TanStack Query and `@workspace/api-client-react` are installed but unused by the current product features.

### API server

**Location:** `artifacts/api-server`

**Framework:** Express 5.

**Current endpoint:**

- `GET /api/healthz`

**Current middleware:**

- JSON parsing.
- URL-encoded parsing.
- CORS.
- Pino HTTP logging.

### API contract

**Location:** `lib/api-spec/openapi.yaml`

The OpenAPI specification currently describes only the health endpoint.

### Generated client

**Location:** `lib/api-client-react`

The generated client currently covers the health endpoint and is not consumed by the dashboard.

### Database

**Location:** `lib/db`

The package configures PostgreSQL and Drizzle, but the schema has no Pulse product tables.

### Environment variable names

Do not store or document values in source control.

#### Dashboard

- `PORT`
- `BASE_PATH`
- `NODE_ENV` (optional runtime/build behavior)
- `REPL_ID` (Replit development tooling behavior)

#### API server

- `PORT`
- `NODE_ENV`
- `LOG_LEVEL`

#### Database

- `DATABASE_URL`

The workspace also has a `SESSION_SECRET` available in the Replit environment, but the current source does not implement session authentication around it. Never expose its value.

### Recommended integration boundaries

A production backend will likely need typed resources for:

- Users and roles.
- Executive profiles.
- Editions/organizations.
- KPI snapshots and periods.
- Insights.
- Business units/groups.
- Decisions.
- Decision actions.
- Workflow/audit events.
- Attachments.
- Agents.
- Assistant conversations/messages.
- Projects and recent tasks.

Any API change should begin in the OpenAPI contract, followed by regenerated types/client code.

---

## 13. Authentication and Roles

### Current state

Authentication is **not implemented**.

There is no:

- Login page.
- SSO integration.
- Session middleware.
- User identity endpoint.
- Protected route.
- Role guard.
- Authorization check.
- Logout action.

The displayed executive names, requester names, titles, and `role` HTML attributes are presentation/accessibility data, not security controls.

### Intended future roles

Earlier design material suggests executive/leadership role concepts, but there is no authoritative role model in code. The incoming developer should confirm:

- Identity provider.
- SSO method.
- Organization/tenant model.
- User roles.
- Decision permissions.
- Edition access.
- Data visibility rules.
- Audit requirements.

before implementing authentication.

### Security implications

Decision actions must not be treated as safe merely because the interface hides or shows a button. Production authorization must be enforced on the server for every read and mutation.

---

## 14. Build, Run, and Verification

### Dashboard commands

From the workspace root:

```bash
pnpm --filter @workspace/pulse-ai-dashboard run dev
pnpm --filter @workspace/pulse-ai-dashboard run typecheck
PORT=5173 BASE_PATH=/pulse-ai-dashboard/ pnpm --filter @workspace/pulse-ai-dashboard run build
```

The managed Replit workflow provides its own `PORT` and `BASE_PATH`.

### API commands

```bash
pnpm --filter @workspace/api-server run dev
pnpm --filter @workspace/api-server run build
```

### Workspace commands

```bash
pnpm run typecheck
pnpm run build
```

### Known build warnings

The dashboard build has recently completed successfully while reporting non-fatal warnings concerning:

- The `/__mockup/images/pulse-insights-background.png` path not resolving at build time.
- Tooltip source-map location reporting.

The image path should be changed to the dashboard-owned public asset before production deployment to remove the mockup-artifact dependency.

### Tests

No automated test suite was located. Current verification relies on:

- TypeScript typecheck.
- Production builds.
- Browser screenshots.
- Browser console inspection.
- Manual responsive interaction checks.

---

## 15. Known Gaps and Technical Risks

### Highest priority

1. **No real backend integration**
   - All business data and decisions are fixtures.

2. **No authentication or authorization**
   - The app cannot safely expose real executive data.

3. **No persistence**
   - Decision actions, assistant messages, and preferences are lost.

4. **No automated tests**
   - Visual and interaction regressions are currently detected manually.

5. **Large coupled components**
   - `PulseDashboard.tsx` owns too many unrelated product responsibilities.

### Additional risks

- Most sidebar destinations are placeholders.
- API CORS is permissive.
- API error handling/security controls are minimal.
- Database schema is empty.
- Ask Pulse is simulated.
- Decision attachments do not resolve to stored files.
- Theme is not persisted.
- Only selected local state is represented in the URL.
- “Refreshed” time is hardcoded.
- External Google Fonts introduce a runtime network dependency.
- The dashboard references a mockup-server image path.
- `pulse-dark.css` appears stale and references a missing stylesheet.
- Several installed dependencies are unused by current screens.

---

## 16. Recommended Development Sequence

### Phase 1 — Stabilize the existing prototype

- Fix the Insights background path to use the dashboard-owned public image.
- Remove or formally deprecate stale CSS.
- Split `PulseDashboard.tsx` into focused components without changing visuals.
- Add tests for theme, edition, period, Group Performance, and Decision Desk behavior.
- Document the final domain terminology: revenue vs profit, group vs company/business unit.

### Phase 2 — Define the production data contract

- Confirm KPI source systems and refresh expectations.
- Confirm decision workflow states and permissions.
- Confirm organization/edition model.
- Extend OpenAPI before building endpoints.
- Generate updated Zod and React client code.
- Define the Drizzle schema and migrations.

### Phase 3 — Authentication and access

- Select and configure the approved identity provider.
- Implement session handling.
- Add user and role endpoints.
- Protect dashboard and API routes.
- Enforce organization and decision permissions server-side.

### Phase 4 — Replace fixtures incrementally

Recommended order:

1. User/profile/edition.
2. KPI periods.
3. Insights.
4. Group Performance.
5. Decision queue/detail.
6. Decision actions and workflow timeline.
7. Attachments.
8. Agents/recent tasks.

Each migration should include loading, empty, error, and stale-data states.

### Phase 5 — Ask Pulse

- Define model/provider strategy.
- Define approved enterprise data sources.
- Add conversation/session APIs.
- Implement streaming responses.
- Add retrieval/context rules.
- Add source citations and permission-aware retrieval.
- Add audit and retention rules.

---

## 17. Handover Checklist

Before the incoming developer begins implementation, confirm:

- [ ] Which edition(s) will ship first.
- [ ] Production identity provider and SSO requirements.
- [ ] Executive and administrator role definitions.
- [ ] KPI source systems and API owners.
- [ ] Data refresh frequency.
- [ ] Decision workflow and approval authority.
- [ ] Required audit retention.
- [ ] Attachment storage and access policy.
- [ ] Ask Pulse model/provider and data-governance requirements.
- [ ] Production deployment environment.
- [ ] Monitoring and analytics requirements.
- [ ] Accessibility compliance target.
- [ ] Browser/device support matrix.

---

## 18. Final Notes for the Incoming Developer

- Treat the existing visual output as intentional. Many details were refined through repeated review.
- Preserve the Executive and UCC edition relationship rather than forking them into unrelated applications.
- Do not alter the current highest/lowest Group Performance highlight behavior while extending trend styling.
- Preserve the approved floating Ask Pulse icon geometry.
- Avoid replacing typed workspace API infrastructure with scattered direct network calls.
- Do not infer authentication from displayed profile names or titles.
- Do not treat toast-driven actions as completed product functionality.
- Verify both themes and both editions after UI changes.
- Verify desktop, tablet, and mobile behavior after any structural layout change.
