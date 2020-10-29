# React Flask

## Quickstart

```sh
docker build -t foo .
docker run -it --publish 8080:8080 --name react-flask foo
```

* Frontend using Material UI
* Building react and serving it as static files from flask - was going to do nginx but notenough time - broke some relative paths
* Spent too much time trying to style inline form to look nice & align with table columns
* Spent too much time trying to serializing list of dicts into JSON
* Ran out of time when I started writing tests for frontend..
    * to run them:
```sh
cd frontend
npm i
npm test
```

## If I had more time, I would've

- added a paragraph to display sorted column - just missed it and thought icon would be enough
- done the tests
- added input/form validation on backend
- cleared the form after submission
- added toast messages with modal on errors
- full CRUD api + icons
- added tooltip/toast messages for input verification - left html required in input fields for tooltips
- published the packages to npm
- made the table and form easier to extend/reuse
- setup a production server, added nginx with separate hosting for static html
- changed folder structure for /routes and /models