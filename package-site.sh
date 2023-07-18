yarn run prod

cd resume
package-resume.sh
cd ..

rm -r dist/resume
cp -r resume/dist dist/resume
cp robots.txt dist

7z a -ttar my_site.tar dist
7z a -tgzip my_site.tar.gz my_site.tar
rm my_site.tar