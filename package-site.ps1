yarn run prod

Set-Location resume
.\package-resume.ps1
Set-Location ..

if (Test-Path .\dist\resume) {
  Remove-Item -Recurse .\dist\resume
}

Copy-Item -Recurse -Force .\resume\dist .\dist\resume
Copy-item -Path '.\robots.txt' -Destination '.\dist'

7z a -ttar my_site.tar dist
7z a -tgzip my_site.tar.gz my_site.tar
Remove-Item my_site.tar