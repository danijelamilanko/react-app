import {schema} from 'normalizr';

export const jobSchema = new schema.Entity(
    {},
    {idAttribute: '_id'}
);