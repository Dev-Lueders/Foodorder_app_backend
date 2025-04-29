//This Function extracts the nested name value from the nested populated fields the field value is more recognizable and readable content

function Pop_Fields(docs, fieldsMap) {
  return docs.map(doc => {
    const obj = doc.toObject();                       // Convert to plain object
    for (const [refField, outputField] of Object.entries(fieldsMap)) {
      obj[outputField] = obj[refField]?.name || null;
      delete obj[refField];
    }
    return obj;
  });
}

module.exports = Pop_Fields;