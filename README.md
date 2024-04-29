# LB Phone - App Templates

This repository contains templates for [LB Phone](https://store.lbphone.com/) apps, showcasing most functions provided by LB Phone.

## Templates

-   [react js](./lb-reactjs) - React app template
-   [react typescript](./lb-reactts) - React app template with TypeScript
-   [vanilla js](./lb-vanillajs) - Vanilla JavaScript app template

## Documentation

Custom apps in LB Phone automatically include access to a few functions and variables. Please note that when you use react, you need to use the `window.` prefix for these functions and variables.

The variables are:

-   `resourceName` - The name of the custom app resource, use this when fetching data.
-   `appName` - The app identifier, useful for notifications.

For a full list, see [LB Phone documentation](https://docs.lbphone.com/phone/custom-apps/).
