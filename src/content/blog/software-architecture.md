---
title: SOLID Software architecture
date: 2026-05-28
slug: software-architecture
excerpt: 
---

`SOLID` is pretty popular, but what does it mean, in reality? How does it relate to hexagonal, N-tiered, etc, architecture?

This is not meant to be an encyclopedic definition. Those can be found elsewhere. These are my notes.

- **S**ingle responsibility
- **O**pen to extension, closed to modification
- **L**iskov substitution principle
- **I**nterface segregation principle
- **D**ependency inversion principle

## Single responsibility

A module should have only one reason to change - meaning one stakeholder, one business concern, one axis of change.

This isn't about "do one thing". It's about not mixing different concerns. **Don't give one module multiple reasons it might need to change**.

Things that can violate it:
- multiple teams need to touch the same file for unrelated features
- fixing a bug in one feature breaks another
- testing is difficult. you need to mock unrelated dependencies
- 'And' in class name

How hexagonal architecture helps to address this:
- separating business layer from infrastructure means that either can change without affecting the other.
- ports encourage you to think about responsibilities
- 'use cases' are naturally single-responsibility

## Open to Extension, closed to modification

The code should be written in a way that **adding new functionality is possible, without needing to modify existing functionality**.

An example: I recently had code handling events inline. To add new events, I'd need to modify existing code:

```typescript
// before: closed to extension
if (eventType === 'user.created') { /* handle */ }

// after: open to extension
eventBus.on(eventType, handler) // just register new handlers
```

To me, this requires some experience to avoid over-engineering: you could theoretically write your code so that absolutely anything could be changed (maybe, or that might be mathematically impossible). This probably increases the code complexity, and maybe it's not necessary, bringing in the 'yagni' principle https://martinfowler.com/bliki/Yagni.html . It just depends upon the context. OCP forces us to predict what will/won't change ahead of time, and we can get it wrong.

Achieving this principle is where it's useful to have good knowledge of programming design patterns. E.g. strategy pattern, template method, decorator, observer/event bus.

## Liskov substitution principle

If your code depends on an interface, **every implementation should be swappable without breaking assumptions**.

When I first saw this, I assumed it must relate to a confusing Russian mathematical theorem. But it's not so much, and personally I think this one is quite interesting in that the interface doesn't always capture everything, and thinking about this principle reveals that.

For example, things that can break this principle:
- implementations throwing particular kinds of inconsistent errors. E.g. "NotImplementedError". A fix for this could be that your implementation actually returns a specific interface stating the error, so that then the interface is more explicit to that behaviour
- one implementation may return a sorted list, while another doesn't. The consumer may decide to rely upon that behaviour, but since it's inconsistently applied, changing implementations breaks the assumption. The interface can't enforce that behaviour (I'm not currently aware of a language which can enforce that). A solution is to document it in interface comments. E.g. "returns sorted list". This is just a soft suggestion to the dev to help avoid breaking the principle. But it could help.

This is a nice principle since it helps to make the boundary between interfaces really well defined.

```typescript
interface Catalog {
  /**
   * Returns sorted list of items
   */
  items: Item[];
  update: Promise<{success: true, item: Item} | {success: false, error: string}>
}
```

## interface segregation principle

This says that we shouldn't force consumers of interfaces to rely upon methods/properties that they don't need. **Depend on the minimum that you need**.

An example of violating this would be where you have a "god" service that implements everything. I think we've all experienced it sometimes, and contributed to it.

Following this principle helps to improve code quality through minimising the effects when you need to change those interfaces.

Hexagonal architecture achieves this fairly obviously through its ports/adapters. The service itself defines the interface/port that it needs, and then a particular implementation/adapter for that port is found. The service only knows about the interface/port that it has itself defined. Perhaps the adapter has other public functionality, but from the perspective of the consumer, it only knows about the interface it has requested.

In comparison, N-tier tends to depend upon an infrastructure dependency explicitly, and has no control over what interface that thing is. In that case, the service needs to adapt itself to whatever that interface is.

## dependency inversion principle

**High-level business logic shouldn't depend on low-level infrastructure details**. Both should depend on abstractions (interfaces).

The "inversion" is that infrastructure depends on interfaces defined by business logic, reversing the traditional top-down dependency flow.

- `business logic -> defines the interface that it needs (port)`
- `interface <- is implemented by specific infrastructure code (adapter)`
- `Result: business logic -> port <- adapter`

This is the heart of hexagonal architecture. Code relies upon ports (interfaces), and infrastructure implements them (adapters). Benefits are that it makes testing easier, since those dependencies (interfaces) can be provided with different values.

Ways to violate this principle:
- `constructor(private repo: PostgresUserRepository) { /* ... */ }`
- additionally any direct dependencies to third parties violate this. E.g. `import { something } from SomePackage /* ... */ something()`. You should use judgement/experience to decide when to abstract that to allow more effectively swapping it out. Hexagonal ideas can help in creating ports/adapters allowing for that abstraction.