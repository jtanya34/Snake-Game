import React from 'react';

export const puke = (obj) => <pre>{JSON.stringify(obj, null, 2)}</pre>;
