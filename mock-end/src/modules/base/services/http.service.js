export class HttpService {

  success(res, data) {
    res.status(200).json(data);
  }

  created(res, data) {
    res.status(201).json(data);
  }
  
  unauthorized(res) {
    res.status(401).send();
  }

  unexpectedError(res, body) {
    res.status(422).json({ errors: { body }});
  }

  notFound(res) {
    res.status(404).send();
  }

  serverError(res) {
    res.status(500).send();
  }
}