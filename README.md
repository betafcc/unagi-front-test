# Unagi Frontend Test

## Steps

### 1. Show a single static card on `/collection` page
- ✅ Basic

Bonus points (can be done in arbitrary order):
- ✅ Add TS types/interfaces where applicable.
- ✅ Convert code to fetch the player image without having the full URL,
  but by generating it with the existing ID.

- ✅ Implement simple lazy loading for the player image, show loading indicator
  while the image is loading.

This one was pretty hard and I was surprised there wasn't an easy lib to handle the behaviour I wanted, here is what I implemented:

Images only start loading when the img element is on the screen, and, while image is not loaded, render a loading skeleton

Check [the source file](./src/pages/LazyImage.tsx)

- ✅ Format player DOB in a human-readable way.

NOTE: there is an obvious way, by just doing `new Date().toLocaleDateString()`, which would give the format '6/26/2024' for 'en-us' and '26/06/2024' to almost everyone else, but I'm interpreting the "human-readable" to be something in the lines of "26 June 2024"/"26 juin 2024" for "en-us"/"fr"
