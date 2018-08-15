# DataDash
DataDash is a specification for interactive dashboards. This repository includes an engine which serves to the specification, and a display which consumes the specification.

# DataDash API Version 1

## Filter
Many queries require a filter. A filter is an object where the keys are the names of columns, and the values are objects describing the rules to filter that column on.
V1 supports four filter operations in each column:
- match: true if the value literally matches
- regex: true if the regex returns true
- less: true if the value is less
- greater: true if the value is greater.

These can be stacked, such as `height:{less:5,greater:1}` which returns all values between 1 and 5, noninclusive.

Records meet the filter if ALL filter rules are met.

## Methods

The following methods are part of the V1 Specification. Implementations may have additional parameters or methods, for authenticaiton, for example.

### /v1/datasets
*Returns a list of datasets avaliable*

Engines can support more than one dataset. As a result, calls to any data-fetching method should specify which dataset it uses. This call allows a user to see the options avaliable. 
#### Params
*None*
#### Returns
List of strings, each being a dataset.

### /v1/summary
*Returns a list of columns (keys) in the dataset*

Some operations require specifying a column; this lets users see which columns are avaliable for a dataset.
#### Params
- dataset -- the selected dataset
#### Returns
List of strings, each being a column in the dataset.


### /v1/tabular
*Returns data in tabular form matching the filter*

Some operations require specifying a column; this lets users see which columns are avaliable for a dataset.
#### Params
- dataset -- the selected dataset
- start -- the number of record to start on (beware numbers will change with change in filter)
- len -- the number of records to return
- filter -- The active filter
#### Returns
List of objects, each being a record.


### /v1/counteach
*Returns how many records match the filter for each value of a column*

#### Params
- dataset -- the selected dataset
- col -- the column to get the count on
- filter -- The active filter
#### Returns
An object: keys are values of the specified column, values are counts matching the filter.

