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

// The getEventParam function returns a subquery that unnests event_params. 
// It takes 3 arguments : the event param name, the event param type (by default, "string" type) and the column name (by default, the event param name). 


const coalesceEventParam = (param, columnName = null) => {
    const paramName = columnName ? columnName : param;
    return `
    (SELECT COALESCE(value.string_value, 
    CAST(value.int_value AS STRING),
    CAST(value.float_value AS STRING),
    CAST(value.double_value AS STRING))
    FROM UNNEST(event_params) WHERE key ='${param}') AS epk_${param}`
}; 

// The coalesceEventParam function returns a subquery that unnests event_params when the value's data type is unknown. 
// It takes the same arguments, minus the event param type (since we are trying to find it). 


const getUserProperty = (
  userPropertyName,
  userPropertyType = "string",
  columnName = false
) => {
  let userPropertyTypeName = "";
  switch (userPropertyType) {
    case "string":
      userPropertyTypeName = "string_value";
      break;
    case "int":
      userPropertyTypeName = "int_value";
      break;
    case "double":
      userPropertyTypeName = "double_value";
      break;
    case "float":
      userPropertyTypeName = "float_value";
      break;
    default:
      throw "userType is not valid";
  }
  return `(SELECT value.${userPropertyTypeName} 
  FROM UNNEST(user_properties) WHERE key = '${userPropertyName}') AS upk_${
    columnName ? columnName : userPropertyName
  }`;
};  

// The getUserProperty function returns a subquery that unnests user_properties. 
// It takes 3 arguments : the user property name, the user property type (by default, "string" type) and the column name (by default, the user property name).  


const coalesceUserProperty = (property, columnName = null) => {
    const propertyName = columnName ? columnName : property;
    return `
    (SELECT COALESCE(value.string_value, 
    CAST(value.int_value AS STRING),
    CAST(value.float_value AS STRING),
    CAST(value.double_value AS STRING))
    FROM UNNEST(user_properties) WHERE key ='${property}') AS upk_${property}`
}; 

// The coalesceUserProperty function returns a subquery that unnests user_properties when the value's data type is unknown. 
// It takes the same arguments, minus the user property type (since we are trying to find it). 


const getItemParam = (
  itemParamName,
  itemParamType = "string",
  columnName = false
) => {
  let itemParamTypeName = "";
  switch (itemParamType) {
    case "string":
      itemParamTypeName = "string_value";
      break;
    case "int":
      itemParamTypeName = "int_value";
      break;
    case "double":
      itemParamTypeName = "double_value";
      break;
    case "float":
      itemParamTypeName = "float_value";
      break;
    default:
      throw "itemType is not valid";
  }
  return `(SELECT value.${itemParamTypeName} 
  FROM UNNEST(item_params) WHERE key = '${itemParamName}') AS ipk_${
    columnName ? columnName : itemParamName
  }`;
};  

// The getItemParam function returns a subquery that unnests item_params. 
// It takes 3 arguments : the item param name, the item param type (by default, "string" type) and the column name (by default, the item param name). 


const coalesceItemParam = (param, columnName = null) => {
    const paramName = columnName ? columnName : param;
    return `
    (SELECT COALESCE(value.string_value, 
    CAST(value.int_value AS STRING),
    CAST(value.float_value AS STRING),
    CAST(value.double_value AS STRING))
    FROM UNNEST(item_params) WHERE key ='${param}') AS ipk_${param}`
}; 

// The coalesceItemParam function returns a subquery that unnests item_params when the value's data type is unknown. 
// It takes the same arguments, minus the item param type (since we are trying to find it). 



const channelGrouping = (source,medium,campaign) => {
    return `
    CASE
      WHEN ${source} = '(direct)' AND (${medium} IN ('(not set)', '(none)')) THEN 'Direct'
      WHEN REGEXP_CONTAINS(${campaign}, 'cross-network') THEN 'Cross-network'
      WHEN (REGEXP_CONTAINS(${source},'alibaba|amazon|google shopping|shopify|etsy|ebay|stripe|walmart') OR REGEXP_CONTAINS(${campaign}, '^(.*(([^a-df-z]|^)shop|shopping).*)$')) AND REGEXP_CONTAINS(${medium}, '^(.*cp.*|ppc|paid.*)$') THEN 'Paid Shopping'
      WHEN REGEXP_CONTAINS(${source},'baidu|bing|duckduckgo|ecosia|google|yahoo|yandex')
    AND REGEXP_CONTAINS(${medium},'^(.*cp.*|ppc|paid.*)$') THEN 'Paid Search'
      WHEN REGEXP_CONTAINS(${source},'badoo|facebook|fb|instagram|linkedin|pinterest|tiktok|twitter|whatsapp') AND REGEXP_CONTAINS(${medium},'^(.*cp.*|ppc|paid.*)$') THEN 'Paid Social'
      WHEN REGEXP_CONTAINS(${source},'dailymotion|disneyplus|netflix|youtube|vimeo|twitch|vimeo|youtube')
    AND REGEXP_CONTAINS(${medium},'^(.*cp.*|ppc|paid.*)$') THEN 'Paid Video'
      WHEN ${medium} IN ('display', 'banner', 'expandable', 'interstitial', 'cpm') THEN 'Display'
      WHEN REGEXP_CONTAINS(${source},'alibaba|amazon|google shopping|shopify|etsy|ebay|stripe|walmart')
    OR REGEXP_CONTAINS(${campaign}, '^(.*(([^a-df-z]|^)shop|shopping).*)$') THEN 'Organic Shopping'
      WHEN REGEXP_CONTAINS(${source},'badoo|facebook|fb|instagram|linkedin|pinterest|tiktok|twitter|whatsapp') OR ${medium} IN ('social', 'social-network', 'social-media', 'sm', 'social network', 'social media') THEN 'Organic Social'
      WHEN REGEXP_CONTAINS(${source},'dailymotion|disneyplus|netflix|youtube|vimeo|twitch|vimeo|youtube')
    OR REGEXP_CONTAINS(${medium},'^(.*video.*)$') THEN 'Organic Video'
      WHEN REGEXP_CONTAINS(${source},'baidu|bing|duckduckgo|ecosia|google|yahoo|yandex') OR ${medium} = 'organic' THEN 'Organic Search'
      WHEN REGEXP_CONTAINS(${source},'email|e-mail|e_mail|e mail')
    OR REGEXP_CONTAINS(${medium},'email|e-mail|e_mail|e mail') THEN 'Email'
      WHEN ${medium} = 'affiliate' THEN 'Affiliates'
      WHEN ${medium} = 'referral' THEN 'Referral'
      WHEN ${medium} = 'audio' THEN 'Audio'
      WHEN ${medium} = 'sms' THEN 'SMS'
      WHEN ${medium} LIKE '%push' OR REGEXP_CONTAINS(${medium},'mobile|notification') THEN 'Mobile Push Notifications'
    ELSE
    'Unassigned'
    END`
  }



module.exports = { getEventParam, coalesceEventParam, getUserProperty, coalesceUserProperty, getItemParam, coalesceItemParam, channelGrouping };

// Functions must always be exported in order to be used in other files. 