# Using cosine similarity to match headlines and petition content

Experimenting with various ways to get consistent search results from headline input matching to government petitions. Will be eventually incorporated in my chrome extension.

Involves cleansing of the strings and using cosine similarity code from https://medium.com/@sumn2u/cosine-similarity-in-ember-js-2ba419d06462 to match headlines to petitions. Have used various string matrix algorithms and seem to be getting best results from the current code.

Commands currently in console.
Scrapes all open petitions from https://petition.parliament.uk/ (The site provides json data but only 50 petitions per page)
```
execute()
```
```
cosine("insert headline here")
```

Currently returns the matching petition with matching float from 0 to 1
