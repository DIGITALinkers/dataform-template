# Template for creating GA4 reports in Dataform

## Overview

This Dataform project shows:
* How to flatten all fields of the GA4 export schema
* How to create native GA4 reports based on those flattened tables

## Dataform Directories

There are 5 Dataform directories in our project, each with a different purpose: 
* Source : used to declare the source table, namely the GA4 export schema
* Staging : used to clean, standardize and flatten raw data coming from GA4 for downstream use
* Reporting : used to generate reports, based on staged tables, that help support business decision-making
* Assertions : used to run data quality checks
* Includes : used to define constants and helpers for organizing reusable code and maintaining consistent configurations across the project

## Datasets in BigQuery

#### Source datasets
Source datasets are defined in the [constants.js](/constants.js) file, and declared in the [ga4_export.js](/ga4_export.js) file.
The number of days to look back on when processing incremental data is set in the [dataform.json](/dataform.json) file (default is 3).

#### Destination datasets
Destination datasets are controled by the "schema" value defined in each table's configuration, or by default, by the "defaultSchema" value defined in the [dataform.json](/dataform.json) file. 
