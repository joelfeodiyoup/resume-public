import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold">CV Site: Joel Mundy</h1>
      <p className="mt-4 text-lg">
        This is my personal/CV site. I hope that it can add some more context about me.
      </p>
      <div className="mt-8">
        <Link to="/about">about me</Link>
      </div>
      <div className="mt-8">
        <Link to="/about">work experience</Link>
      </div>
      <div className="mt-8">
        <Link to="/blog">
          blog
        </Link> - here I outline some more detail around technical topics I'm interested in.
      </div>
      <div className="mt-8">
        <Link to="/demo-projects">
          demo projects
        </Link> - here I outline some more detail around technical topics I'm interested in.
      </div>
    </div>
  )
}
