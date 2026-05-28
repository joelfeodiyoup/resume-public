import { createFileRoute } from '@tanstack/react-router'
import { demoProjectsContent } from '../lib/blog'

export const Route = createFileRoute('/demo-projects/')({
  component: RouteComponent,
})

function RouteComponent() {
  return demoProjectsContent.allContent.map(project => (
    <div>{project.title}</div>
  ))
}
