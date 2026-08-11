const markdownRequest = (request) =>
  request.method === 'GET' || request.method === 'HEAD'

const getMarkdownPath = (pathname) => {
  if (pathname === '/') return '/markdown/home.md'
  if (pathname === '/portfolio') return '/markdown/portfolio.md'
  if (pathname === '/blog') return '/markdown/blog.md'

  const projectMatch = pathname.match(/^\/portfolio\/([^/]+)\/?$/)
  if (projectMatch) return `/markdown/portfolio/${projectMatch[1]}.md`

  const articleMatch = pathname.match(/^\/blog\/([^/]+)\/?$/)
  if (articleMatch) return `/markdown/blog/${articleMatch[1]}.md`

  return null
}

export async function onRequest(context) {
  const { request, env } = context
  const acceptsMarkdown = request.headers.get('Accept')?.toLowerCase().includes('text/markdown')

  if (!acceptsMarkdown || !markdownRequest(request) || !env.ASSETS) {
    return context.next()
  }

  const markdownPath = getMarkdownPath(new URL(request.url).pathname)
  if (!markdownPath) return context.next()

  const assetUrl = new URL(request.url)
  assetUrl.pathname = markdownPath
  const assetRequest = new Request(assetUrl, request)
  const markdownResponse = await env.ASSETS.fetch(assetRequest)

  if (!markdownResponse.ok) return context.next()

  const headers = new Headers(markdownResponse.headers)
  headers.set('Content-Type', 'text/markdown; charset=utf-8')
  headers.set('Vary', 'Accept')

  return new Response(markdownResponse.body, {
    status: markdownResponse.status,
    statusText: markdownResponse.statusText,
    headers,
  })
}
