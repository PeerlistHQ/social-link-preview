# Social Previews in NextJS

![Social Link Preview](/public/images/link-preview-example.png)

## WHY [Benefits]

1. Importance to user's information (sense of ownership)
2. Better SEO
3. Personalisation
4. Consistent brand identity
5. Better UX outside your website

## Which packages we will need?

1. React + NextJS
2. Puppeteer
3. Axios
4. AWS S3

## How we will achieve the goal

1. Save user data
2. Check if the fields that needs to be updated in a preview images are updated
3. Start generating preview image
4. Create an HTML and CSS for that along with user's updated data
5. Open the headless browser using puppeter
6. Add our HTML to that browser
7. Take a screenshot
8. Save that screenshot to some file storage (here s3)
9. Use that link to access the saved image and add it to the meta tags to respective page.
