# Toolkit for Lunch Money

A Chrome extension that enhances the Lunch Money web app with additional features, inspired by [Toolkit for YNAB](https://github.com/toolkit-for-ynab/toolkit-for-ynab).

A current work in progress, there are currently no tests and I've only tested features with USD.

## Features

- Feature flag system for enabling/disabling individual enhancements
- Modular architecture for easy addition of new features

## Current Features

- Auto populate remaining split balance and adds buttons to recalculate split amounts based on the remaining balance.
- Improve legibility of the remaining amount display in split views.

## Setup

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Build the extension:
   ```
   npm run build
   ```
4. Load the extension in Chrome:
   - Open Chrome and navigate to `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked" and select the `dist` directory

## Creating New Features

1. Create a new folder under `src/content/features/` for your feature
2. Create a `settings.ts` file defining the feature properties and options
3. Create an `index.tsx` file with the React component that implements the feature
4. Register the feature in `src/content/features/features.ts`
5. Add the component to the render list in `src/content/index.tsx`

## License

MIT
