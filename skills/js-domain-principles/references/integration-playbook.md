# Integration Playbook

## Objective
Integrate `@andireuter/js-domain-principles` so new and legacy features follow DDD boundaries.

## Bootstrap flow
1. Install package:
```bash
npm install @andireuter/js-domain-principles
```
2. Create one bounded context first (do not redesign the whole monolith in one pass).
3. Build the first vertical slice:
- value object
- entity
- aggregate
- use-case
- repository interface + infrastructure adapter
- tests

## Codex prompts that work well
- "Create a bounded context for possession tracking with value objects, entities, aggregates, use-cases, repositories, and tests using `@andireuter/js-domain-principles`."
- "Refactor this service method into `UseCase<Result<T>>` and move invariants into domain models."
- "Add `ValidationDecorator` validators for this DTO before aggregate mutation."

## Migration strategy
1. Pick one unstable use-case.
2. Define DTO input shape and `Result` output shape.
3. Move rule-by-rule into domain methods.
4. Keep old API contract stable while replacing internals.
5. Add tests for old behavior parity and new failure branches.

## Review checklist for pull requests
- Are all invariants in domain code?
- Is `Result` returned from use-cases?
- Is input validated before domain mutation?
- Are repository contracts in domain and implementations in infrastructure?
- Are there tests for both happy path and failures?
