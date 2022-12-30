import 'dotenv/config';
import * as jwt from 'jsonwebtoken';

export class JwtService {
  sing(payload) {
    const token = jwt.default.sign(payload, String(process.env.JWT_TOKEN), { expiresIn: '2h' });
    return token;
  }

  verify(token) {
    return new Promise((resolve, reject) => {
      jwt.verify(token, String(process.env.JWT_TOKEN), (err, decoded) => {
        err || !decoded ? reject(err) : resolve(decoded);
      });
    })
  }
}