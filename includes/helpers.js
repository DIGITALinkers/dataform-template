const getEventParam = (
  eventParamName,
  eventParamType = "string",
  columnName = false
) => {
  let eventParamTypeName = "";
  switch (eventParamType) {
    case "string":
      eventParamTypeName = "string_value";
      break;
    case "int":
      eventParamTypeName = "int_value";
      break;
    case "double":
      eventParamTypeName = "double_value";
      break;
    case "float":
      eventParamTypeName = "float_value";
      break;
    default:
      throw "eventType is not valid";
  }
  return `(SELECT value.${eventParamTypeName} 
  FROM UNNEST(event_params) WHERE key = '${eventParamName}') AS epk_${
    columnName ? columnName : eventParamName
  }`;
};

const coalesceEventParam = (param) => {
    return `
    COALESCE((SELECT value.string_value FROM UNNEST(event_params) WHERE key ='${param}'), 
    CAST((SELECT value.int_value FROM UNNEST(event_params) WHERE key ='${param}') AS STRING)) AS epk_${param}`
};

module.exports = { getEventParam, coalesceEventParam };
