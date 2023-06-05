import React from 'react';

const jsonData = { /* Your JSON data here */ };

const JSONExporter = () => {
  return <pre>{JSON.stringify(jsonData, null, 2)}</pre>;
};

export default JSONExporter;