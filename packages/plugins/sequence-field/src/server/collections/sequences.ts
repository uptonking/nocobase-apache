export default {
  name: 'sequences',
  fields: [
    {
      name: 'collection',
      type: 'string',
    },
    {
      name: 'field',
      type: 'string',
    },
    {
      name: 'key',
      type: 'integer',
    },
    {
      name: 'current',
      type: 'bigInt',
    },
    {
      name: 'lastGeneratedAt',
      type: 'date',
    },
  ],
};
