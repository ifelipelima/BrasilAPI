import { AggregateError } from 'bluebird';

import app from '@/app';

import BaseError from '@/errors/BaseError';
import BadRequestError from '@/errors/BadRequestError';
import InternalError from '@/errors/InternalError';
import NotFoundError from '@/errors/NotFoundError';

import isbnFacade from '@/services/isbn';
import { isValidIsbn } from '@/services/isbn/tools';

async function getBookByIsbn(request, response) {
  try {
    const requestedIsbn = request.query.isbn.replace(/-/g, '');
    const providers = request.query.providers
      ? request.query.providers.split(',')
      : null;

    if (!isValidIsbn(requestedIsbn)) {
      throw new BadRequestError({ message: 'ISBN inválido' });
    }

    const result = await isbnFacade.search(requestedIsbn, providers);

    return response.status(200).json(result);
  } catch (error) {
    if (error instanceof BaseError) {
      throw error;
    }

    if (error instanceof AggregateError || Array.isArray(error)) {
      const errors = error.errors || error;
      const isNotFound = errors.some((err) => err instanceof NotFoundError);

      if (isNotFound) {
        throw new NotFoundError({ message: 'ISBN não encontrado' });
      }
    }

    throw new InternalError({
      message: 'Todos os serviços de ISBN retornaram erro.',
    });
  }
}

export default app().get(getBookByIsbn);
