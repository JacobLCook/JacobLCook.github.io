# JLCook Photography

Source for [jacoblcook.github.io](https://jacoblcook.github.io/), built with Jekyll on GitHub Pages.

## Adding photos

Drop the image into the right folder and push. That's it.

| Folder | Appears on |
|---|---|
| `photos/birds/` | Birds page |
| `photos/animals/` | Animals page |
| `photos/scenery/` | Scenery page |

- Name files descriptively with dashes, e.g. `grey-heron-flight.jpg`. The name is used as the image's alt text ("Grey heron flight"), and photos are shown in filename order.
- Filenames are case-sensitive on the live site, so stick to lowercase `.jpg`.

## Favourites

Edit `_data/favourites.yml`. Each entry points at a photo already in `photos/` and adds a title, caption, description and camera settings.

## Home page

The hero image and the two collection covers are set at the top of `index.html`.

## Archive

`_archive/` holds older photos that aren't on the site. Jekyll ignores folders starting with `_`, so nothing in there is published. Move a file into `photos/birds/` or `photos/scenery/` to bring it back.

## Running locally

```bash
bundle install
bundle exec jekyll serve
```
