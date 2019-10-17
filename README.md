# Budget Classifier Webapp

## Overview

This app is to reduce friction in Jesse's budget tracking process.  The user emails in budget tracker entries and receives back an email with the entries categorized.  

This app utilizes an API endpoing in a seperate app [here](https://github.com/jginsberg3/budget-classifier-api) to make the actual categorizations.  This app is to handle recieving the emails, formatting the data, and delivering the results.

## How to Use the App

The user emails in their budget tracker entries.  The entries must be in the body of the email, not in an attachment.  The entries must be in plain text and follow a format like this:

```
To add to budget tracker

- 9/2 $4.36 bagel and coffee breakfast 
- 9/2 $9.99 grocery shopping
```

### Notes about the format:
- the info can have headers and footers
- the actual budget entries must be on seperate lines
- the budget entries must have a "$" character in them (this is how the app finds the lines to use as entires)
- the format for each entry must be as follows:
  
  1. date (using "/")
  2. ammount (Must include "$".  The "." is optional.)
  3. description

  *for reference, the regex used to parse each entry line is: `(\d+\/\d+) (\$\S{1,}) (.+$)`

The user will receive back an email at the same email address they used to send in their entries.  The csv will include the 3 parts of the entry the user sent in as well as a 4th part which is the predicted category for each entry.  