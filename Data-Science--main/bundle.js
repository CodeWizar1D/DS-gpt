import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const distDir = path.join(__dirname, 'dist')

const distHtmlPath = path.join(distDir, 'index.html')
if (!fs.existsSync(distHtmlPath)) {
  console.error('dist/index.html not found!')
  process.exit(1)
}

let html = fs.readFileSync(distHtmlPath, 'utf8')

// Extract the inlined script tag
const scriptMatch = html.match(/<script[\s\S]*?<\/script>/i)
if (!scriptMatch) {
  console.error('No script tag found in dist/index.html')
  process.exit(1)
}

const rawScript = scriptMatch[0]
// Remove type="module" so it runs as a standard synchronous script everywhere
const cleanScript = rawScript.replace(/<script[^>]*>/, '<script>')

// Remove script from its current location
html = html.replace(rawScript, '')

// Replace <body>...</body> to ensure <div id="root"></div> comes BEFORE <script>
html = html.replace(/<body>[\s\S]*?<\/body>/i, `<body>
  <div id="root"></div>
  ${cleanScript}
</body>`)

const bundlePath = path.join(distDir, 'index_bundle.html')
fs.writeFileSync(bundlePath, html, 'utf8')
console.log(`Successfully generated clean bundle at dist/index_bundle.html (${html.length} bytes)`)
