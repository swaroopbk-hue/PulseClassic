---
name: Orval and js-yaml compatibility
description: Compatibility constraint for selecting a patched js-yaml version used by Orval.
---

Use a patched js-yaml 4.x release with Orval until Orval explicitly supports js-yaml 5.

**Why:** js-yaml 5 removes the default ESM export that current Orval releases import, causing code generation to fail at startup.

**How to apply:** When remediating js-yaml advisories in the OpenAPI generator toolchain, choose the newest patched 4.x release and verify code generation before considering a 5.x override.