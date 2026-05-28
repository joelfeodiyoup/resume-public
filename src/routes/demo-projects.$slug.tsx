import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/demo-projects/$slug')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/demo-projects/$slug"!</div>
}
