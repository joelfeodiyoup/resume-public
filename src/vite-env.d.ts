/// <reference types="vite/client" />

declare module '*.md' {
  const attributes: Record<string, any>
  const html: string
  export { attributes, html }
}
