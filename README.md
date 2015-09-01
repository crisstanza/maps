# maps
Google maps.

##gh-pages:

<a target="_blank" href="http://crisstanza.github.io/maps">crisstanza.github.io/maps</a>


### Sync gh-pages:

```
git push --force origin master:gh-pages
git reset --hard origin/gh-pages
```


### Create gh-pages:

```
git checkout --orphan gh-pages
git add .
git commit -m "Initial commit."
git push origin gh-pages
git checkout master
```
