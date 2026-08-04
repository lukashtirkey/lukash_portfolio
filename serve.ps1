$port = 5500
$root = "c:\lukash_portfolio"
$url  = "http://localhost:$port/"

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add($url)
$listener.Start()

Write-Host ""
Write-Host "======================================" -ForegroundColor Cyan
Write-Host "  Portfolio running at: $url" -ForegroundColor Green
Write-Host "  Press Ctrl+C to stop the server" -ForegroundColor Yellow
Write-Host "======================================" -ForegroundColor Cyan
Write-Host ""

$mimeTypes = @{
    ".html" = "text/html"
    ".css"  = "text/css"
    ".js"   = "application/javascript"
    ".jpg"  = "image/jpeg"
    ".jpeg" = "image/jpeg"
    ".png"  = "image/png"
    ".gif"  = "image/gif"
    ".svg"  = "image/svg+xml"
    ".ico"  = "image/x-icon"
    ".json" = "application/json"
    ".woff" = "font/woff"
    ".woff2"= "font/woff2"
    ".ttf"  = "font/ttf"
    ".md"   = "text/plain"
}

while ($listener.IsListening) {
    $context  = $listener.GetContext()
    $request  = $context.Request
    $response = $context.Response

    $localPath = $request.Url.LocalPath
    if ($localPath -eq "/") { $localPath = "/index.html" }

    $filePath = Join-Path $root $localPath.TrimStart("/")

    if (Test-Path $filePath -PathType Leaf) {
        $ext      = [System.IO.Path]::GetExtension($filePath).ToLower()
        $mime     = if ($mimeTypes[$ext]) { $mimeTypes[$ext] } else { "application/octet-stream" }
        $bytes    = [System.IO.File]::ReadAllBytes($filePath)

        $response.ContentType   = $mime
        $response.ContentLength64 = $bytes.Length
        $response.StatusCode    = 200
        $response.OutputStream.Write($bytes, 0, $bytes.Length)
        Write-Host "200 GET $localPath" -ForegroundColor Gray
    } else {
        $response.StatusCode = 404
        $msg  = [System.Text.Encoding]::UTF8.GetBytes("404 - Not Found")
        $response.OutputStream.Write($msg, 0, $msg.Length)
        Write-Host "404 GET $localPath" -ForegroundColor Red
    }

    $response.OutputStream.Close()
}
