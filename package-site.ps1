npm run prod
7z a -ttar my_site.tar dist
7z a -tgzip my_site.tar.gz my_site.tar
Remove-Item my_site.tar