import { createFileRoute, Link, notFound } from '@tanstack/react-router'
import { blogContent } from '../lib/blog'

export const Route = createFileRoute('/blog/$slug')({
  loader: ({ params }) => {
    const post = blogContent.getContent(params.slug)
    if (!post) throw notFound()
    return post
  },
  component: BlogPost,
})

function BlogPost() {
  const post = Route.useLoaderData()

  return (
    <div className="mx-auto max-w-4xl p-8">
      <Link to="/blog" className="mb-8 inline-block text-blue-600 hover:underline">
        ← Back to blog
      </Link>

      <article className="prose prose-lg max-w-none">
        <h1 className="mb-2 text-4xl font-bold">{post.title}</h1>
        <time className="mb-8 block text-gray-600">
          {new Date(post.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </time>

        <div
          className="mt-8"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
      </article>
    </div>
  )
}
