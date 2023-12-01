import { Request, Response, NextFunction } from 'express';
//import HttpException from 'utils/exceptions/http.exception'

// message constant
import HttpCode from '../constants/http-code'
import HttpMessage from '../constants/http-message'
import { verifyToken } from '../validations/token.validation';
import HttpException from '../utils/exceptions/http.exception';
import Message from '../constants/message';

// http constant

class AuthenticatedMiddleware {
  public async verifyTokenAndAuthorization(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    verifyToken(req, res, () => {
      if (req?.user != undefined && (req?.user?.id === req?.params?.id || req?.user?.isAdmin)) {
        return next()
      }

      return next(
        new HttpException(
          HttpCode.FORBIDDEN,
          HttpMessage.FORBIDDEN,
          HttpMessage.NOT_ALLOWED,
        ),
      )
    })
  }

  public async verifyTokenAndAdmin(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    verifyToken(req, res, () => {
      return next()
      // if (req?.user != undefined && req?.user?.isAdmin) {
      //   return next()
      // }

      // return next(
      //   new HttpException(
      //     HttpCode.FORBIDDEN,
      //     HttpMessage.FORBIDDEN,
      //     Message.TOKEN_NOT_VALID,
      //   ),
      // )
    })
  }
}

export default AuthenticatedMiddleware;
