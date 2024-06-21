const GA4_DATABASE = 'projet-pole-dl-dataform'; // Change to the name of the GCP project your source table is stored in. 
const GA4_DATASET = 'source'; // Change to the name of the dataset your source table is stored in.
const GA4_TABLE = 'events_*'; // Change to the name of your source table. 

module.exports = {GA4_DATABASE, GA4_DATASET, GA4_TABLE}

// We defined 3 constants and exported them. They are used in the ga4_export.js file to declare our source. 