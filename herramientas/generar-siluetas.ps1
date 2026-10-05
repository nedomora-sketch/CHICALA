# Genera siluetas\siluetas-data.js a partir de las imágenes de la carpeta siluetas.
# Nombre esperado: Silueta_<Nombre en inglés>.png  (también .jpg, .jpeg, .webp)
# Ejecutar de nuevo cada vez que se agregue, quite o cambie una imagen.
$dir = Join-Path $PSScriptRoot 'siluetas'
$mime = @{ '.png'='image/png'; '.jpg'='image/jpeg'; '.jpeg'='image/jpeg'; '.webp'='image/webp' }
$items = @(); $names = @{}; $omitidos = @()

Get-ChildItem $dir -File | Where-Object { $mime.ContainsKey($_.Extension.ToLower()) } | Sort-Object Name | ForEach-Object {
  if ($_.BaseName -notmatch '^(?i)silueta[_ -]+(?<n>[A-Za-z][A-Za-z ]*)$') {
    $omitidos += "$($_.Name)  (el nombre debe ser Silueta_<Nombre>.png)"; return
  }
  $raw = $Matches['n'].Trim()
  $name = (Get-Culture).TextInfo.ToTitleCase($raw.ToLower())
  if ($names.ContainsKey($name)) { $omitidos += "$($_.Name)  (duplicado de $($names[$name]))"; return }
  $names[$name] = $_.Name
  $b64 = [Convert]::ToBase64String([IO.File]::ReadAllBytes($_.FullName))
  $items += "  `"$name`": `"data:$($mime[$_.Extension.ToLower()]);base64,$b64`""
}

$js = "window.SILUETAS = {`n" + ($items -join ",`n") + "`n};`n"
[IO.File]::WriteAllText((Join-Path $dir 'siluetas-data.js'), $js, [Text.UTF8Encoding]::new($false))

Write-Output "Siluetas cargadas ($($names.Count)): $(($names.Keys | Sort-Object) -join ', ')"
if ($omitidos.Count) { Write-Warning ("Omitidos:`n  " + ($omitidos -join "`n  ")) }
