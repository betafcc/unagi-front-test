# Unagi Frontend Test

## Steps

### 1. Show a single static card on `/collection` page
- ✅ Basic

Bonus points (can be done in arbitrary order):
- ✅ Add TS types/interfaces where applicable.
- ✅ Convert code to fetch the player image without having the full URL,
  but by generating it with the existing ID.

- Implement simple lazy loading for the player image, show loading indicator
  while the image is loading.

- ✅ Format player DOB in a human-readable way.

NOTE: there is an obvious way, by just doing `new Date().toLocaleDateString()`, which would give the format '6/26/2024' for 'en-us' and '26/06/2024' to almost everyone else, but I'm interpreting the "human-readable" to be something in the lines of "26 June 2024"/"26 juin 2024" for "en-us"/"fr"
