# Template for creating GA4 reports in Dataform

## Overview

This Dataform project shows:
* How to flatten all nested fields in the GA4 export schema.
* How to create native GA4 reports based on those flattened tables.

## Starting a Dataform project

Here are 10 simple steps to follow to setup a Dataform project: 
1. In GCP's left menu select BigQuery > Dataform.
2. Enable the Dataform API.
3. Click "Create repository" > set name and location.
4. Once the repo is created, copy the service account email > in GCP's left menu, select IAM and Admin > IAM > enable checkbox "Include Google-provided role grants" > click pencil (edit) > add roles: 
 * BigQuery Data Editor
 * BigQuery Data Viewer
 * BigQuery Job User
 * Secret Manager Secret Accessor > click "Save". 
5. In Github, create a new repository.
6. In Github, click "Settings" > "Developer settings" > "Fine-grained tokens" > set Token name, expiration date, select the repository you created in step 5, and grant permissions: 
 * Administration - Read and write
 * Commit statuses - Read-only
 * Contents - Read and write
 * Deployments - Read-only
 * Metadata - Read-only > click "Generate token".
7. In GCP, open the Secret Manager page > enable API > click "Create secret" > set name to "dataform" and paste GitHub developer token value to Secret Value field > click "Create Secret".
8. Back in Dataform, click "Connect with Git" > copy paste from Github the step 5 repo's URL > set default branch name to "main" > select "dataform" Secret field > click "Create a link".
9. Click "Create Development Workspace" > set "Workspace id"/
10. Click "Initialize workspace".

## Dataform Directories

There are 5 directories in our Dataform project, each with a different purpose: 
* Source : used to declare the source table, namely the GA4 export schema.
* Staging : used to clean, standardize and flatten raw data coming from GA4, for downstream use.
* Reporting : used to generate reports, based on staged tables, that help support business decision-making.
* Assertions : used to run data quality checks on the staged data.
* Includes : used to define constants and helpers for organizing reusable code and maintaining consistent configurations across the project.

## Setup files 

There are 4 javascript files used in our initial setup: 
* [dataform.json](/dataform.json): used to define default destination datasets and useful variables, such as the number of days to refresh when processing incremental data. 
* [constants.js](/constants.js): used to define data sources.
* [ga4_export.js](/ga4_export.js): used to declare data sources (based on values defined in the constants.js file).
* [helpers.js](/helpers.js): used to define reusable functions that aid in accelerating development workflows.

## Table configurations

All staging and reporting tables are configured in sqlx files in the following javascript format:  

``` javascript
config {
    type: "incremental",
    schema: "staging", 
    name: "flat_events",
    description: "Table of flattened GA4 events",
    uniqueKey: ["unique_event_id"],
    bigquery: {
        partitionBy: "date_partition",
        updatePartitionFilter: "date_partition >= DATE_SUB(CURRENT_DATE(), INTERVAL 7 DAY)"
    },
    tags: ['ga4']
}
```

Here's a breakdown of what each section means: 

* Type: specifies the table type 
 * Table: standard storage for persistent structured data, typically representing raw or processed datasets.
 * Incremental: specialized table updated incrementally, often used for efficiently handling continuous data updates without reprocessing the entire dataset. 
 * View: virtual table defined by a SQL query, serving as a dynamic representation of data from underlying tables within the dataset.
 * Materialized view: precomputed snapshot of data stored as a table, enhancing query performance by storing aggregated or transformed data for rapid access and reducing computation during query execution.
* Schema: specifies the dataset where the table will be created or located within the BigQuery project.
* Name: defines the name of the table, used to reference it in queries and operations.
* Description: provides a description of the table, explaining its contents or purpose.
* uniqueKey: specifies the column(s) that uniquely identifies each row in the table. When performing incremental updates to the table, having a uniqueKey allows the system to efficiently identify and update only the records that have changed or are new.
* partitionBy: specifies the column to partition the table by in BigQuery, improving query performance by partitioning data based on this column.
* updatePartitionFilter: defines a filter condition for updating partitions, ensuring only recent data within the last 7 days is considered for incremental updates.
* tags: provides tags or labels associated with the table, which can be used for organization or categorization purposes.
