# LINCX CONTROLS

Lincx Controls are javascript files that help add more functions to the Lincx template that help users engage more with the ads.

## Guide to add new control:

1. Each Control should live inside a seperate folder inside src/ directory: *Example:* /src/control-name/index.js
2. Go to webpack.config.js and add new entry to the list of entries

## LIST OF CONTROLS AND HOW TO USE THEM:

### 1. CREDIT SCORE MODAL CONTROL:

This control help users to choose their credit score either in a modal that run on the load or a dropdown inside the content:

This control relay on a div with an id of: *#dropdown-credit-score*
