const express = require('express');
const request = require('request');
const Rx = require('@reactivex/rxjs');

const router = express.Router();

const baseUrl = 'https://swapi.co/api/people/';

router.get('/', (req, res) => 
  Rx.Observable.create((observer) => {
    let name = req.query.name;
    let url = baseUrl
      if (name) {
        url = url + "?search=" + name;
      }
    request(
      url,
      {
        method: 'GET',
        json: true,
      },
      (error, response, body) => {
        if (error) {
          observer.error(error);
        } else if (response.statusCode >= 500) {
          observer.error(response);
        } else if (response.statusCode === 404) {
          observer.next(null);
        } else if (response.statusCode >= 400 && response.statusCode < 500) {
          observer.next({
            statusCode: body.statusCode,
            code: body.code,
          });
        } else {
          observer.next(body);
        }

        observer.complete();
      },
    );
  }).subscribe(
    response => res.send(response.results),
    err => res.send(err.message),
  )
)

module.exports = router;
