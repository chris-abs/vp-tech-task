# React + TypeScript + Vite

## Project running

- to get the project started locally we need a .env file with the following variable
  VITE_API_KEY=yj2bV48J40KsBpIMLvrZZ1j1KwxN4u3A83H8IBvI

- since this is a publicly available API, env variables aren't necessarily needed (+ adding it here makes it completely pointless), but can never be too careful with API keys and it would never normally be stored in plain text in a typical repo's readme.

- npm install

- npm run dev

## Further improvements

- fix a bug in which some of the filter options are removed as a user selects some of the same type, particularly noticable when selecting a style or price range.

- conditional to default rating to 0 when a score isn't provided.

- add dynamic slug routes to navigate a user to a specific product's page, would be good if a user can select a product > navigate to its product page and then customise fixures/ fittings based on available options of that specific product.

- many styling adjustments, adding more content to the product cards (especially sale prices & money saved during sales), stock options...
