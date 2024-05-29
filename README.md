# Living Room/BBD Team Interview - Take Home Assignment

## Note
  - This webpage was built and tested for the Chrome browser

## Link to Webpage

- http://jamils-take-home-assignment.s3-website-us-east-1.amazonaws.com/

## Navigation

- Arrow Keys
    - up, down,left, and right will allow you to navigate around from tile to tile
- Enter Key
    - For "Content" tiles it will display a modal with some information on the content you have selected
    - "Collection" tiles (2nd row) would normally link to a page where we would fetch the content by collection id and display similar to our home page
    - For now selecting these tiles will console log the collection id with a comment.
- Esc Key
    - Will exit the modal
 
## Local Build

### Prerequisites
1. `npm version >= 10.5.0` installed

### Instructions
1. Clone the repository
-     git clone git@github.com:jamilgonzalez/take-home-assignment.git
  
2. Install webpack dependencies
-     npm --install
3. Run build
-     npm run build
4. In your browser go to `file:///{replace-with-path-to-file}/take-home-assignment/public/index.html`
