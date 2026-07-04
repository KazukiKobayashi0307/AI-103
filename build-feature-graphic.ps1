<#
  Google Play の「フィーチャー グラフィック」(1024x500, 必須アセット) を生成する。
#>
Add-Type -AssemblyName System.Drawing

$outDir = "C:\Users\81909\AzureAI103\icons"
$iconPath = "$outDir\icon-512.png"
$destPath = "$outDir\feature-graphic-1024x500.png"

$w = 1024; $h = 500
$bmp = New-Object System.Drawing.Bitmap $w, $h, ([System.Drawing.Imaging.PixelFormat]::Format24bppRgb)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic

# 背景グラデーション（アイコンから採取した teal→blue）
$c1 = [System.Drawing.Color]::FromArgb(255, 60, 191, 198)
$c2 = [System.Drawing.Color]::FromArgb(255, 18, 90, 190)
$rect = New-Object System.Drawing.Rectangle 0, 0, $w, $h
$brush = New-Object System.Drawing.Drawing2D.LinearGradientBrush $rect, $c1, $c2, 35
$g.FillRectangle($brush, $rect)
$brush.Dispose()

# うっすら光る円(装飾)
$glow = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(28, 255, 255, 255))
$g.FillEllipse($glow, 700, -180, 520, 520)
$glow.Dispose()

# アイコンを左側に配置
$icon = [System.Drawing.Image]::FromFile($iconPath)
$iconSize = 380
$iconX = 56
$iconY = [int](($h - $iconSize) / 2)
# ドロップシャドウ風の丸背景
$shadowBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(40, 0, 0, 0))
$g.FillEllipse($shadowBrush, $iconX - 14, $iconY - 6, $iconSize + 28, $iconSize + 28)
$shadowBrush.Dispose()
$g.DrawImage($icon, $iconX, $iconY, $iconSize, $iconSize)
$icon.Dispose()

# テキスト
$textX = $iconX + $iconSize + 56
$titleFont = [System.Drawing.Font]::new("Yu Gothic UI", [single]58, [System.Drawing.FontStyle]::Bold)
$subFont = [System.Drawing.Font]::new("Yu Gothic UI", [single]30, [System.Drawing.FontStyle]::Bold)
$tagFont = [System.Drawing.Font]::new("Yu Gothic UI", [single]19, [System.Drawing.FontStyle]::Regular)
$white = [System.Drawing.Brushes]::White
$whiteSoft = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(235, 255, 255, 255))

$g.DrawString("Azure AI-103", $titleFont, $white, $textX, 148)
$g.DrawString("対策アプリ", $subFont, $whiteSoft, $textX, 226)

$tagBg = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(60, 255, 255, 255))
$tagRect = New-Object System.Drawing.RectangleF $textX, 300, 430, 46
$g.FillRectangle($tagBg, $tagRect)
$tagBg.Dispose()
$g.DrawString("重箱の隅まで対策 ／ 誤答の背景まで徹底解説", $tagFont, $white, $textX + 16, 311)

$titleFont.Dispose(); $subFont.Dispose(); $tagFont.Dispose(); $whiteSoft.Dispose()
$g.Dispose()
$bmp.Save($destPath, [System.Drawing.Imaging.ImageFormat]::Png)
$bmp.Dispose()
Write-Host "feature graphic saved: $destPath"
