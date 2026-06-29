---
name: js-domain-principles
description: Integrate `@andireuter/js-domain-principles` into TypeScript codebases using domain-driven design patterns and clean boundaries (`domain`, `application`, `infrastructure`). Use when bootstrapping a new bounded context, refactoring service logic into entities/aggregates/use-cases, creating reusable DDD templates, or asking Codex to generate DDD-first code that follows this package's primitives.
---

# DDD JS Domain Principles

## Overview

Build and refactor TypeScript systems around DDD with the primitives from this repository: `Entity`, `AggregateRoot`, `ValueObject`, `EntityId`, `Result`, `UseCase`, `IValidator`, and `ValidationDecorator`.

## Install and Baseline

1. Install the package:

```bash
npm install @andireuter/js-domain-principles
```

2. Start with one bounded context and this folder layout:

```text
/src
  /application
    dto/
    useCase/
    validator/
  /domain
    aggregate/
    domainService/
    entity/
    repository/
    valueObject/
  /infrastructure
    mapper/
    persistence/
```

## Execute Workflow

1. Define ubiquitous language and invariants first.
2. Model value objects for constrained concepts (for basketball: `ShotClock`, `CourtZone`).
3. Model entities and aggregate roots for identity and consistency boundaries.
4. Implement `UseCase<T>` orchestrators that return `Result<T>`.
5. Validate DTOs with `ValidationDecorator` before touching domain models.
6. Add repositories and mappers in infrastructure only.
7. Add tests for `Result.ok` and `Result.fail` branches.

## Boundaries and Rules

- Keep `domain/` free of API, DB, transport, and framework imports.
- Keep business invariants in entities/aggregates/value objects, not controllers or handlers.
- Keep exception-heavy code at boundaries; return `Result.fail` to callers.
- Keep mapping logic in `infrastructure/mapper` to avoid leaking external shapes into domain.

## Use References

- Read `references/domain-driven-design.md` for concept-to-class mapping.
- Read `references/integration-playbook.md` for integration and Codex prompts.
- Read `references/basketball-ubiquitous-language.md` for generic basketball terminology.

## Use Templates

Copy all templates into a target project:

```bash
./skills/js-domain-principles/scripts/copy_templates.sh <target-project-root>
```

Templates in `assets/templates/` are generic basketball-themed examples (`Possession`, `PlayEvent`, `ShotClock`) so they can be renamed to any domain.

## Completion Checklist

- Model each invariant in exactly one domain method or factory.
- Keep aggregate mutations behind explicit methods.
- Return `Result` from use-cases and validators.
- Hide persistence details behind repository interfaces.
- Cover success and failure scenarios in tests.
