if [[ -d './dist' ]]; then
  echo 'Removing old build directory.'
  rm -r ./dist
fi

if [[ -f 'my_site.tar.gz' ]]; then
  echo 'Removing old build archive file.'
  rm ./my_site.tar.gz
fi

yarn run prod

cd resume
package-resume.sh
cd ..

cp -r resume/dist dist/resume

7z a -ttar my_site.tar dist
7z a -tgzip my_site.tar.gz my_site.tar
rm my_site.tar