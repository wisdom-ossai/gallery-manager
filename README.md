# Gallery Manager

## A node js application built with Epressjs, Bootstrap 4

### App Requirements

1. Home Page that allow users to upload images, browse already uploaded images which is sorted from newest to oldes

2. Image Detail Page that shows details of each selected image to show the image title, description, and a large image display

3. A consistent shared sidebar that is visible on both pages to show general statistics about the site, such as: most popular images, and most recent comments.

## Routes

1. GET /(index) - home (render the homepage of the site)
2. GET /images - image.getAll (render the page for all uploaded images)
3. GET /images/image_id - image.getById (render the page for a specific image)
4. POST /images - image.add (when a user submits and uploads a new image)
5. POST /images/image_id/like - image.like (when a user clicks the Like button)
6. POST /images/image_id/comment - image.comment (when a user posts a comment)
