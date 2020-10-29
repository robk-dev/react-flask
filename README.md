# React Flask

> This was a timed homework~

## Quickstart

```sh
docker build -t foo .
docker run -it --publish 8080:8080 foo
# it'll be running at localhost:8080
```

* Frontend using Material UI
* Building react and serving it as static files from flask - was going to do nginx but not enough time - broke some relative paths (manifest.json & favicon)
* Spent too much time trying to style inline form to look nice & align with table columns - gave up
* Spent too much time trying to serialize list of dicts into JSON (array of JSONs...)
* Ran out of time when I started writing tests for frontend..
      * to run them:

```sh
cd frontend
npm i
npm test
```

## If I had more time, I would've

* done the tests
* added a paragraph to display sorted column and order - just missed it and when I saw it, I decided icon would have to do
* added input/form validation on backend
* cleared the form after submission
* added toast messages with modal on errors
* full CRUD api + icons
* probably should've added maxWidth in some places - table resizes
* added tooltip/toast messages for input verification - left html required in input fields for tooltips
* published the packages to npm
* made the table and form easier to extend/reuse
* setup a production server, added nginx with separate hosting for static html
* changed folder structure for /routes and /models
* added more UI components to control them more granullarly and packaged each one as a lib with monorepo tools/rush.js
* (added csrf protection and authentication but outside the scope)
