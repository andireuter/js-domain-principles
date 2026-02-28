# Basketball Ubiquitous Language (Generic)

Use these terms as neutral examples when scaffolding domain models:

- **Possession**: one offensive sequence for a team.
- **Play Event**: a discrete action (cut, screen, pass, shot, turnover).
- **Shot Clock**: time constraint for a possession.
- **Court Zone**: where an action occurs (`paint`, `midrange`, `corner-three`, `top-three`).
- **Quarter**: period index for event grouping.
- **Fast Break**: transition context (can become a value object flag).
- **Pick-and-Roll**: tactical pattern (can be modeled as a play type).

Guideline:
- Keep names domain-specific but generic enough to rename in another business domain.
- Keep examples framework-agnostic and persistence-agnostic.
