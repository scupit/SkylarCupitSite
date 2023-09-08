if (Test-Path '.\dist') {
  Write-Output "Removing old build directory."
  Remove-Item -Recurse '.\dist'
}

if (Test-Path .\my_site.tar.gz) {
  Write-Output "Removing old build archive file."
  Remove-Item -Recurse '.\my_site.tar.gz'
}

yarn run prod

Set-Location resume
.\package-resume.ps1
Set-Location ..

Copy-Item -Recurse -Force '.\resume\dist' '.\dist\resume'

7z a -ttar 'my_site.tar' dist
7z a -tgzip 'my_site.tar.gz' 'my_site.tar'
Remove-Item 'my_site.tar'