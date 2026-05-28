import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/about/')({
  component: RouteComponent,
})

const content: {title: React.ReactNode, content: React.ReactNode}[] = [
  {title: "background", content: <>
    <p>I was born in Australia and grew up there. In 2023 I moved to Germany.</p>
  </>},
  {title: "interests", content: <>
    <p>I try to have a lot of different interests in life</p>
    <ul>
      <li>cycling - I once spent 2-3 months cycling from Calais, France, to Vienna, Austria</li>
      <li>running - I once completed a 58km ultramarathon</li>
      <li>jazz guitar - in 2007 I studied jazz guitar at a conservatory. I've kept up the interest, reading about jazz music theory, styles, etc</li>
      <li>juggling - sometime last year I just wondered if I could learn how to juggle, and it turns out that almost anyone can</li>
      <li>reading - I personally see a lot of value in continually reading. I usually have 10-25 books in my 'current' collection in my Kindle. Some topics I like are fiction/science fiction classics, history, etc</li>
      <li>drawing - I picked up this hobby again as an adult</li>
    </ul>
  </>}
]

function RouteComponent() {
  return content.map((c, i) => (
    <div key={`content-${i}`}>
      <h2>{c.title}</h2>
      <div>{c.content}</div>
    </div>
  ))
}
