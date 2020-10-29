FROM node:12 as build

RUN mkdir -p /app
WORKDIR /app

COPY /frontend/package*.json /app/
RUN npm ci

COPY /frontend/ /app
RUN npm run build

FROM python:3.8 as prod

RUN mkdir -p /app
WORKDIR /app

RUN pip install pipenv

COPY /flask-server/  /app

RUN pipenv lock --requirements > requirements.txt
RUN pip install -r requirements.txt

COPY --from=build /app/build /app

EXPOSE 8080
ENTRYPOINT ["python"]
CMD ["/app/app.py"]