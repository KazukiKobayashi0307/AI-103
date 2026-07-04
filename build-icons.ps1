<#
  Azure AI-103 アプリ用アイコン一式を生成する。
  Node/Python 不在環境のため .NET System.Drawing を使用（PowerShellのみで完結）。
  元画像は角丸四角のアートワークが 1254x1254 の黒背景に「辺の中央は端まで、四隅だけ黒いくさび」
  という配置で入っている（実測: 角の丸め半径 ≈ 全体の 22.9%）。
  そのため「any」用途は角丸マスク(半径比 0.229)でクリップして四隅を透過にし、
  「maskable」用途はフルブリード正方形の中に安全マージンを取って縮小配置する。
#>
Add-Type -AssemblyName System.Drawing

$src = "C:\Users\81909\AzureAI103\icons\_source_master.png"
$outDir = "C:\Users\81909\AzureAI103\icons"
New-Item -ItemType Directory -Force -Path $outDir | Out-Null
$cornerRatio = 0.229

function Save-RoundedIcon([string]$srcPath, [int]$size, [string]$destPath, [double]$radiusRatio) {
  $srcImg = [System.Drawing.Image]::FromFile($srcPath)
  $bmp = New-Object System.Drawing.Bitmap $size, $size, ([System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
  $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
  $g.Clear([System.Drawing.Color]::Transparent)

  $r = [double]$size * $radiusRatio
  $d = $r * 2
  $path = New-Object System.Drawing.Drawing2D.GraphicsPath
  $path.AddArc(0, 0, $d, $d, 180, 90)
  $path.AddArc($size - $d, 0, $d, $d, 270, 90)
  $path.AddArc($size - $d, $size - $d, $d, $d, 0, 90)
  $path.AddArc(0, $size - $d, $d, $d, 90, 90)
  $path.CloseFigure()
  $g.SetClip($path)
  $g.DrawImage($srcImg, 0, 0, $size, $size)
  $g.ResetClip()
  $g.Dispose()
  $path.Dispose()
  $bmp.Save($destPath, [System.Drawing.Imaging.ImageFormat]::Png)
  $bmp.Dispose()
  $srcImg.Dispose()
}

function Save-Maskable([string]$srcPath, [int]$canvasSize, [string]$destPath, [double]$contentRatio) {
  # Android の適応アイコン(丸/角丸/四角など任意形状にクロップされ得る)向け:
  # 内側 safe zone(既定 contentRatio)に収まるよう元画像を縮小し、
  # 実際のアートワークから採取した色でフルブリード背景を塗る。
  $srcImg = [System.Drawing.Image]::FromFile($srcPath)
  $srcBmp = [System.Drawing.Bitmap]$srcImg
  $sample = $srcBmp.GetPixel(150, 150)  # 角丸の内側＝実際に見えているグラデーション色を採取

  $bmp = New-Object System.Drawing.Bitmap $canvasSize, $canvasSize, ([System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias

  $c1 = [System.Drawing.Color]::FromArgb(255, $sample.R, $sample.G, $sample.B)
  $c2 = [System.Drawing.Color]::FromArgb(255, [Math]::Max(0,$sample.R-30), [Math]::Max(0,$sample.G-15), [Math]::Min(255,$sample.B+20))
  $rect = New-Object System.Drawing.Rectangle 0, 0, $canvasSize, $canvasSize
  $brush = New-Object System.Drawing.Drawing2D.LinearGradientBrush $rect, $c1, $c2, 45
  $g.FillRectangle($brush, $rect)
  $brush.Dispose()

  $inner = [int]([Math]::Round($canvasSize * $contentRatio))
  $offset = [int](($canvasSize - $inner) / 2)
  $g.DrawImage($srcImg, $offset, $offset, $inner, $inner)
  $g.Dispose()
  $bmp.Save($destPath, [System.Drawing.Imaging.ImageFormat]::Png)
  $bmp.Dispose()
  $srcImg.Dispose()
}

# --- 通常アイコン（purpose: any / favicon / apple-touch-icon 等, 四隅は透過） ---
Save-RoundedIcon $src 512 "$outDir\icon-512.png" $cornerRatio
Save-RoundedIcon $src 192 "$outDir\icon-192.png" $cornerRatio
Save-RoundedIcon $src 180 "$outDir\apple-touch-icon.png" $cornerRatio
Save-RoundedIcon $src 32  "$outDir\favicon-32.png" $cornerRatio
Save-RoundedIcon $src 16  "$outDir\favicon-16.png" $cornerRatio

# --- Play Store 掲載用の高解像度アイコン(512x512, 角丸透過のフルブリード) ---
Copy-Item "$outDir\icon-512.png" "$outDir\playstore-icon-512.png" -Force

# --- maskable（Android アダプティブ アイコン安全域: content 72%） ---
Save-Maskable $src 512 "$outDir\icon-maskable-512.png" 0.72

Write-Host "done"
Get-ChildItem $outDir | Where-Object { $_.Name -ne "_source_master.png" } | Select-Object Name, Length
