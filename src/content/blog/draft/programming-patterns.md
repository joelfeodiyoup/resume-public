---
title: Programming patterns and applications
date: 2026-05-27
slug: programming-patterns
excerpt: List or programming patterns plus applications
---

A listing of programming patterns and where I like to use them.

I won't list the technical details of each, since it's already been covered about 5 million times.

## Singleton

In `NextJS`, providers are singletons by default (injection scopes: https://docs.nestjs.com/fundamentals/injection-scopes). By configuring a different scope from default, NestJS will create a new instance per that scope. E.g. per request, or every time requested.

**Database connections**

**external API clients**

**caching layers**

**event buses**

## Prototype

## Builder

## Factory method

## Abstract Factory