# Shopping app Web

A front end app for a shopping application. The projects consists of a front end tier that will
use a static json file until the front end is in a good place. Only then will a backend tier be created to replace pulling data from the static file.

## Requirements

### Refer to img01 for landing page
User should be able to add product
List of products is obtained from the backend API

### Refer to img02
User should be able to update ‘No of Cartons’.
Minimum value is 1
Maximum value is 100
Accept integer number only
User should be able to remove the added items.
User should be able to see ‘Total Cost’ being updated
‘Value’ = ‘Unit Cost’ * ‘Units in Carton’ * ‘No of Cartons’
‘Total Cost’ = add all ‘Value’
User should be able to see ‘Total Products’ being updated

## Data
Use the ‘payload.json’ as a mock response payload from the backend - NodeJS to retrieve the list of products for the landing page.