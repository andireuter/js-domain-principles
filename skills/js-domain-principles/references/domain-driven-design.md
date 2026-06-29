# Domain-Driven Design with `@andireuter/js-domain-principles`

## Primitive mapping
| DDD concept | Package primitive | Why to use it |
| --- | --- | --- |
| Entity | `Entity<T>` | Represent identity-based objects whose state changes over time. |
| Aggregate root | `AggregateRoot<T>` | Protect consistency boundaries and invariants. |
| Value object | `ValueObject<T>` | Represent immutable concepts with equality by value. |
| Identifier | `EntityId` | Keep domain identity independent from persistence engine details. |
| Repository contract | `IRepository<T>` | Hide persistence and keep application logic domain-centric. |
| Domain policy | `DomainService` | Express domain rules that do not belong to one entity. |
| Application orchestration | `UseCase<T>` | Run application workflows and return `Result<T>`. |
| Validation flow | `IValidator<T>`, `ValidationDecorator<T>` | Validate DTO input before domain mutation. |
| Success/failure contract | `Result<T>` | Model recoverable outcomes without throwing across layers. |

## Layering rules
- `domain/`: no framework, transport, or database imports.
- `application/`: orchestrate use-cases, DTO validation, transaction boundaries.
- `infrastructure/`: persistence adapters, mappers, API or queue integration.

## Modeling sequence
1. Start with ubiquitous language and invariants.
2. Create value object factories with validation and `Result.fail` branches.
3. Create aggregate methods that enforce invariants for state transitions.
4. Create use-cases that validate DTOs and call aggregate behavior.
5. Add repositories and mappers as integration boundaries.

## Smell checklist
- Controller directly mutates entity props.
- Repository logic appears in use-case.
- Raw external payload is passed directly into aggregate constructor.
- Domain rules depend on HTTP headers, queue metadata, or framework context.
