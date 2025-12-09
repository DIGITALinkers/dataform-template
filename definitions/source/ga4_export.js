declare({
    database: 'projet-pole-dl-dataform', // Change to the name of the GCP project your source table is stored in.
    schema: 'source', // Change to the name of the dataset your source table is stored in.
    name: 'events_*', // Change to the name of your source table. 
});