sample-app
==========

A Symfony project created on August 1, 2016, 9:00 am.

TODO:
0. Create a public GIT repo so we can look it up later, and place the package files there before you begin the work.
If you cannot make it public for some reason, make sure to pack whole project along with .git folder when you're done, and send it back via email.

1. Currently, for the JS file to be reachable by the application, you need to copy it from `src/AppBundle/Resources/assets/js` to `web/bundles/app/js`. 
Please configure gulp and write a gulp task that we can run from app root folder that will copy this file from `src/AppBundle/Resources/assets/js` to `web/bundles/app/js`

  1. Add SCSS to CSS conversion to that gulp task 
Source SCSS: `src/AppBundle/Resources/assets/gfx/scss/main.scss`
Target CSS: `src/AppBundle/Resources/public/css/main.css`

  2. Create gulp task that copies images
Source assets: `src/AppBundle/Resources/assets/img`
Target assets: `web/assets/img`

2. Convert menu to sticky menu, 
Hint: the layout file is in `app/Resources/views/base.html.twig` 

3. The "Notify!" button should create a notification that lasts a moment(1 second or so) and disappear completely from the DOM, but it doesn't work. Please fix.
Hint: the HTML with the button is in: `app/Resources/views/default/index.html.twig`

4. For under 767px the menu should be converted to "hamburger" icon and expand when touched. Design according to the design file found in the app root `acme-checkout.pdf`. Hint: Icons and images are in assets folder.

5. Make "Add Product to Cart" increment the number near bag icon. That number should not lose its value after page refresh

6. Prepare a responsive checkout according to the design file `acme-checkout.pdf`. It should show the same amount of products you have in header. Beware! There're some tiny design bugs, hope you'll fix them :) .
Hint: HTML for that page is in `src/AppBundle/Resources/views/Checkout/cart.html.twig`. Font used in design is Roboto 400 (Regular) and Roboto 700 (Bold) - you can get them at `https://fonts.google.com/`.

   1. Implement data validation on all the checkout inputs, so the checkout button on the bottom is only enabled when data is valid.

**General Hints**:
- install PHP dependencies
- to run the app you only need php installed. go to the app root folder and run `php app/console server:run`
- to deploy CSS files from `src/AppBundle/Resources/public/css/`, use `php app/console assets:install`
