---
title: Debugging strategies
date: 2026-05-28
slug: debugging-strategies
excerpt: 
---

Debugging is very ubiquitous. Nevertheless, I think it can be worth being conscious of the tools/approaches/options available.

As with everyone, we learn what works well, based on experience, and choose the right tool based on that.

These are some I've found useful

## typescript

Usually it's more of a preventative thing. But I have worked on codebases that had runtime errors due to insufficient tsconfig settings. You can actually have nested tsconfig settings, so you can technically turn some on for subdirectories and see which errors might exist. Usually the error should point you to the exact spot where the error occurred, which would give a good hint at the error. But, still, it can sometimes be useful.

After resolving some production bug, it could also be worth looking at typescript to see if you're using it in the best way possible, to prevent the issues before they reach there. e.g.:
- check module boundaries (user input, api responses, etc)
- graphql servers can return their schema, allowing a client to verify that the shape of their queries is valid. Otherwise, usually the graphql server will just error when it receives something it doesn't expect
- tRPC (https://trpc.io/) to add typescript typing to api requests - to be honest, I haven't used it, but it looks compelling
- increase strictness of tsconfig settings. Common ones I've seen not used: noUncheckedIndexedAccess, strictNullChecks (oddly), etc.

## chrome dev tools

Personally I use it heavily in developing new code and debugging.

## source tab

Attach debugger breakpoints in your code to inspect the code at run time.

You should also have sourcemaps generated from your build tool, so that you can virtually step through the original files, rather than the aggregated / minified code that is possibly actually running.

## network tab

Beyond the obvious uses, sometimes using simulated slow network can find the cause of odd errors.

For gql, I have found it really handy to add `?method=${methodName}` to the endpoint URL. It should be ignored by the server, but can be very useful to speed up identification of specific requests.

- api calls
- slow requests 
- failed requests

## profiler / performance tab

For finding CPU bottlenecks, memory leaks, or which functions are taking the most time. Record a profile while reproducing slow behaviour, then look for hot spots in the flame graph.

## console

I feel a little bit dirty every time I write a console log to debug. I have memories from my first job when a senior observed it with disgust and asked why I wasn't setting a breakpoint in the code. Still, there are times when it's the most practical thing.

## Logging strategies

Personally I've been frustrated by bad logging before which wastes time. Whenever I can, I would attach a debugger and go directly to the cause.

However, I have found logging useful:
- identifying specific customer's issues. E.g. there was once a display issue which, through the logs, I found was caused only from a very specific iphone/browser combination, which led to discovering an unsupported css property.
- debugging issues that only occur in production for specific customers and data. E.g. some corrupted customer data in production
- environments I can't easily attach a debugger to: for example ci/cd where node version changes can break builds

## APM - application performance monitoring

As the name suggests, it's to monitor performance across a whole application. In my experience it requires hooking up fairly specifically which code boundaries you want, to choose your granularity. But this is the tool if you want to find specific parts of your codebase that are slow, so that then you can dig down deeper.

- opentelemetry / jaeger

## SQL ANALYZE / SQL EXPLAIN

When a database query is slow, these commands show you the query execution plan - how the database actually processes your query.

`EXPLAIN` shows the plan without running it
`EXPLAIN ANALYZE` runs it and shows actual timing.

Look for:
- sequential scans on large tables (usually need an index)
- high cost operations
- missing indexes on JOIN/WHERE columns

## Git bisect

Find which commit broke something.

## Docker logs

Obviously if something is not working right in docker, then docker logs will be useful.

`docker logs <container-id>` or `docker-compose logs` to see stdout/stderr from containers.

## Distributed tracing

When a request spans multiple services, you need to trace it across boundaries.

Tools:
- OpenTelemetry / Jaeger
- Correlation IDs (pass requestId through all services)
- Distributed logs aggregation (ELK stack, Datadog)

Key debugging approaches:
- trace a single request across services to see where it fails
- look for partial failures (service A succeeded, service B failed)
- check for timing issues (timeouts, race conditions)
- watch for inconsistent state (data in service A doesn't match service B)