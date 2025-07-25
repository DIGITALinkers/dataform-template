// We defined constants to be used across the project for source table and event logic.

// Source table configuration
const GA4_DATABASE = 'projet-pole-dl-dataform'; // Change to the name of the GCP project your source table is stored in. 
const GA4_DATASET = 'source'; // Change to the name of the dataset your source table is stored in.
const GA4_TABLE = 'events_*'; // Change to the name of your source table. 

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
];

// List of dynamic or unknown-type event params (cast as string)
const flexibleParams = [
    'session_engaged',
    'custom_event_param_1',
    'custom_event_param_2'
];


// Defines custom event param flags to generate per session.
// For each {param, values}, creates flags like has_<param>_<value> and counts like <param>_<value>_count.
const customEventParamFlags = [
  { param: 'file_extension', values: ['pdf', 'docx'] },
  { param: 'video_provider', values: ['youtube', 'vimeo'] },
  // { param: 'custom_event_param_1', values: ['A', 'B', 'C'] },
  // { param: 'custom_event_param_2', values: ['X', 'Y'] }
];

const numericThresholdFlags = [
  { param: 'engagement_time_msec', threshold: 10000, name: 'engaged_10s' },
  { param: 'video_percent', threshold: 75, name: 'video_watched_75p' }
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


module.exports = {
  GA4_DATABASE,
  GA4_DATASET,
  GA4_TABLE,
  knownParams,
  flexibleParams,
  customEventParamFlags,
  numericThresholdFlags,
  knownUserProperties,
  flexibleUserProperties,
  trackedEventNames,
  conversionEvents,
  engagementThresholdSeconds,
};
