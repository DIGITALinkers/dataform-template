// We define constants to be used across the project for source table and event logic.

// Standard GA4 event parameter keys 
// Add, modify or delete the following event_params, according to your own source data

// List of known event params with explicit types
const knownParams = [
  // Basic session information
  { name: 'ga_session_id', type: 'int' },
  { name: 'ga_session_number', type: 'int' },

  // Session engagement data
  { name: 'engaged_session_event', type: 'int' },
  { name: 'engagement_time_msec', type: 'int' },

  // Session traffic sources data
  { name: 'medium', type: 'string' },
  { name: 'source', type: 'string' },
  { name: 'campaign', type: 'string' },

  // Basic page information
  { name: 'page_title', type: 'string' },
  { name: 'page_location', type: 'string' },
  { name: 'entrances', type: 'int' },

  // Scroll interactions data
  { name: 'percent_scrolled', type: 'int' },

  // Outbound clicks data
  { name: 'link_domain', type: 'string' },
  { name: 'link_url', type: 'string' },
  { name: 'outbound', type: 'string' },

  // Site search data
  { name: 'search_term', type: 'string' },

  // Video engagement data
  { name: 'video_provider', type: 'string' },
  { name: 'video_title', type: 'string' },
  { name: 'video_url', type: 'string' },
  { name: 'video_duration', type: 'int' },
  { name: 'video_percent', type: 'int' },

  // File download data
  { name: 'file_extension', type: 'string' },
  { name: 'file_name', type: 'string' },
  { name: 'link_text', type: 'string' },

  // Custom params 
  { name: 'custom_event_param_1', type: 'string' },
  { name: 'custom_event_param_2', type: 'int' },
  { name: 'custom_event_param_3', type: 'float' },
];

// List of dynamic or unknown-type event params (always cast as string)
const flexibleParams = [
    'session_engaged',
    'custom_flex_event_param',
];

// Defines custom event param flags to generate per session.
// For each {param, values}, creates flags like has_<param>_<value> and counts like <param>_<value>_count.
const customEventParamFlags = [
  { param: 'file_extension', values: ['pdf', 'docx'] },
  { param: 'video_provider', values: ['youtube', 'vimeo'] },
  { param: 'custom_event_param_1', values: ['pdp', 'plp'] },
];

const numericThresholdFlags = [
  { param: 'engagement_time_msec', threshold: 10000, name: 'engaged_10s' },
  { param: 'custom_event_param_2', threshold: 75, name: 'video_watched_75p' },
];

// Composite rules that combine multiple event attributes
const compositeEventFlags = [
  {
    name: 'view_pdp',
    conditions: [
      { field: 'event_name', operator: '=', value: 'page_view' },
      { field: 'epk_custom_event_param_1', operator: '=', value: 'pdp' }
    ]
  },
  {
    name: 'high_value_conversion',
    conditions: [
      { field: 'event_name', operator: '=', value: 'purchase' },
      { field: 'epk_custom_event_param_3', operator: '>', value: 100 }
    ]
  }
];


// List of known user properties with explicit types
const knownUserProperties = [
  { name: 'user_id', type: 'string' },
  { name: 'first_touch_timestamp', type: 'int' },
  { name: 'user_ltv', type: 'double' }, // example custom property
  { name: 'user_engaged', type: 'string' },
];

// List of dynamic or unknown-type user properties (cast as string)
const flexibleUserProperties = [
  'custom_user_property_1',
  'custom_user_property_2'
];


// Event names to track with flags and counts
const trackedEventNames = [
  'page_view',
  'scroll',
  'session_start',
  'user_engagement',
  'view_item',
  'add_to_cart',
  'purchase'
];

// Conversion events typically used for KPI metrics
const conversionEvents = [
  'purchase',
  'generate_lead',
  'sign_up',
  'begin_checkout',
  'add_payment_info'
];


// Session engagement threshold (in seconds)
const engagementThresholdSeconds = 10;


// ============================
// Derived session flag columns
// ============================

const sessionFlagColumns = [
  // Event name flags
  ...trackedEventNames.map(event => `has_${event}`),

  // Custom event param flags
  ...customEventParamFlags.flatMap(f =>
    f.values.map(v => `has_${f.param}_${v}`)
  ),

  // Numeric threshold flags
  ...numericThresholdFlags.map(f => `has_${f.name}`),

  // Composite flags
  ...compositeEventFlags.map(f => `has_${f.name}`)
];

// ============================
// Derived event count columns
// ============================

const sessionEventCountColumns = [
  // Event name counts
  ...trackedEventNames.map(event => `${event}_count`),

  // Custom event param counts
  ...customEventParamFlags.flatMap(f =>
    f.values.map(v => `${f.param}_${v}_count`)
  )
];

module.exports = {
  knownParams,
  flexibleParams,
  customEventParamFlags,
  numericThresholdFlags,
  compositeEventFlags,
  knownUserProperties,
  flexibleUserProperties,
  trackedEventNames,
  conversionEvents,
  engagementThresholdSeconds,
  sessionFlagColumns,
  sessionEventCountColumns
};
