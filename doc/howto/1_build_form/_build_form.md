# How to build a Form with Scalejs and PJSON

Building a form with Scalejs and PJSON is simple once you know how it's done. 
Read this tutorial to learn how to do it.

You should already have an application with a Scalejs/PJSON setup.
In this tutorial I will be starting from [scalejs seed](https://github.com/EikosPartners/scalejs-app) appliction which is a very basic setup for Scalejs. 
You can also clone the results from this tutorial from the `form-example` branch.

## Tutorial Steps
1. Get Common
2. Add an Adapter
3. Add an Input
4. Add another Input
5. Add a Validation
6. Add a Rendered Expression
7. Add a Select that gets values from JSON
8. Add a Select that gets from a Store
9. Add a List
10. Post your Form Data
11. Retrieve your Form Data
12. ?

## 1. Get Common

If you do not already have common, you must have it in order to use the form elements.

`npm install --save scalejs.metadatafactory-common`

This will give you access to all of the [common](https://github.com/EikosPartners/scalejs.metadataFactory-common)
modules.
You can import the modules in the same location where others are imported.
In our sample app, that location is the `modules.js` file.

The seed application in this tutorial is already importing common in order to use the template module.

## 2. Add an Adapter

The [adapter](https://eikospartners.github.io/scalejs.metadataFactory-common/doc/module-adapter.html)
module allows for tracking of the other components which will be necessary to gather the data for a POST and use expressions.

First ensure the Adapter is being imported into your application

```JavaScript
import 'scalejs.metadatafactory-common/dist/adapter/adapterModule';
```

Now in your JSON file you will add the adapter:

```JSON
{
    "type": "adapter",
    "children": [
        
    ]
}
```

## 3. Add an Input

The [input](https://eikospartners.github.io/scalejs.metadataFactory-common/doc/module-input.html)
component is used to gather user data input. It supports many functionality, as any input functionality (large and small)
will be baked into the options of an inputViewModel.

We will start off with a very simple input. Again, ensure the Input is being imported into your application.

```JavaScript
import 'scalejs.metadatafactory-common/dist/input/inputModule';
```

In addition to this, our input module relies on an autocomplete package that is currently not configured correctly. 
As a work around to this, we must add the following to your *webpack.config* `resolve.alias` fields.

```JavaScript
'jquery-ui/autocomplete':  path.join(__dirname, 'node_modules/jquery-ui/ui/widgets/autocomplete.js')`
```

Because we made changes to webpack.config you need to restart npm for the changes to take effect.

Add the following input JSON as a child of the adapter

```JSON
{
    "type": "adapter",
    "children": [
        {            
            "id": "name",
            "type": "input",
            "inputType": "text",
            "label": "What is your Name?"
        }
    ]
}
```

Refresh your application to see the new input.

![One input down](./1_add_input.jpg)

## 4. Add another Input

A form rarely has just one question so let's add another field.
This time we will use the datepicker type.

```JSON
{
    "type": "adapter",
    "children": [
        {            
            "id": "name",
            "type": "input",
            "inputType": "text",
            "label": "What is your Name?"
        },
        {            
            "id": "birthday",
            "type": "input",
            "inputType": "datepicker",
            "label": "What is your Birthday?"
        }
    ]
}
```

Now you will see two inputs on the page. One of them is of type datepicker.

![Two inputs down](./2_add_another_input.jpg)

## 5. Add a Validation

Forms are great but one thing we need is to be able to add validations.
For most of your validation needs, you can use one of the ones specified in [Knockout-Validation](https://github.com/Knockout-Contrib/Knockout-Validation).

In addition to this, we also have expression validations which utilize the context of the PJSON form
to allow you to write conditional validations against other values which are already in the form.

```JSON
{
    "type": "adapter",
    "children": [
        {            
            "id": "name",
            "type": "input",
            "inputType": "text",
            "label": "What is your Name?",
            "options": {
                "validations": {
                    "required": true
                }
            }
        },
        {            
            "id": "birthday",
            "type": "input",
            "inputType": "datepicker",
            "label": "What is your Birthday?"
        }
    ]
}
```
![Validations](./3_add_validation.jpg)

## 6. Add Rendered Expression

All PJSON Components have the capability to use rendered expressions.
A rendered expression is an expression (again, based on context) which
will determine whether or not the component will be rendered.

Once an input is not rendered, it also will not be available within the data
context, so if you still need adapter tracking, you'll need to set `trackIfHidden` to true.

For these changes I'll add an additional input that will determine whether or not we need
to gather the user's birthday.

```JSON
{
    "type": "adapter",
    "children": [
        {            
            "id": "name",
            "type": "input",
            "inputType": "text",
            "label": "What is your Name?",
            "options": {
                "validations": {
                    "required": true
                }
            }
        },
        {            
            "id": "isHuman",
            "type": "input",
            "inputType": "radio",
            "label": "Are you Human?"
        },
        {            
            "id": "birthday",
            "rendered": "isHuman",
            "type": "input",
            "inputType": "datepicker",
            "label": "What is your Birthday?"
        }
    ]
}
```

![should it be rendered?](./4_add_rendered.jpg)


![it's rendered](./5_add_rendered_cont.jpg)

We added a radio input, which when we do not add any options defaults to Yes/No text
and underlying value of true/false. 
Note this is the first time we have used the ids I have been adding with each input.
Every input with an **id** is tracked by the parent adapter. In order to leverage the values
from other inputs, you use the id. For the rendered expression for our birthday input,
we are using `isHuman`, which evaluated to the value of the **isHuman** input. Which is true/false or empty.
The expression will only evaluate to **true** if the user selects yes, but there are plenty of other 
ways one can write and leverage expressions and this is where the flexibility and power of PJSON really shines.


## 7. Add a Select that gets from JSON

Now that we have added a few inputs we might want to start doing something
more complex, such as getting values for a select from a reference data endpoint.

To make it easy let's just start off by adding a select that will get from a local data source (i.e. from PJSON).

```JSON
{
    "type": "adapter",
    "children": [
        {            
            "id": "name",
            "type": "input",
            "inputType": "text",
            "label": "What is your Name?",
            "options": {
                "validations": {
                    "required": true
                }
            }
        },
        {            
            "id": "isHuman",
            "type": "input",
            "inputType": "radio",
            "label": "Are you Human?"
        },
        {            
            "id": "birthday",
            "rendered": "isHuman",
            "type": "input",
            "inputType": "datepicker",
            "label": "What is your Birthday?"
        },
        {            
            "id": "color",
            "type": "input",
            "inputType": "select",
            "label": "Select the best color:",
            "options": {
                "values": [
                    "Red",
                    "Orange",
                    "Yellow",
                    "Green",
                    "Blue",
                    "Purple"
                ]
            }
        }
    ]
}
```

That was almost too easy. Better yet if these values were coming from a server
so that we could change the options the user can select from without modifying our UI assets.

## 8. Add a Select that gets from a Store

In step 7 we added a select that simply gets its options from the JSON.
Now we will add an extra step to get these values from a REST call.

In order to do this, I will add a simple endpoint to our mock backend to retrieve the values:

```JavaScript
/* GET Colors */
app.get('/colors', (req, res, next) => {
    res.send({
        data: [
            {
                value: 0,
                text: 'Red'
            },
            {
                value: 1,
                text: 'Orange'
            },
            {
                value: 2,
                text: 'Yellow'
            },
            {
                value: 3,
                text: 'Green'
            },
            {
                value: 4,
                text: 'Blue'
            },
            {
                value: 5,
                text: 'Purple'
            }
        ]
    })
});
```

After a server restart and I have verified this data is coming in as desired, now I will add a store to our PJSON
and hook the Select source into this.

A `store` is a PJSON Data Component that takes in a dataSourceEndpoint object and populates a key 
within the `scalejs.noticeboard` under a specified `storeKey`.

The first step when using a new component is to ensure it is being imported with your other modules:

```JavaScript
import 'scalejs.metadatafactory-common/dist/store/storeModule';
```

Underneath the hood, the `store` relies on an `action`, more specifically, an `ajax` action to perform its data-service call.

To that end, we need two more imports to satisfy the prerequisites we need to use store:

```JavaScript
import 'scalejs.metadatafactory-common/dist/action/actionModule';
import 'scalejs.metadatafactory-common/dist/action/actions/ajax';
```

Now that we have imported store, action, and an ajax action, and also assuming your PJSON/Scalejs Setup has a proper dataservice (such as the one included in the tutorial seed),
we can use this JSON to populate our select:

```JSON
{
    "type": "adapter",
    "children": [
        {
            "type": "store",
            "keyMap": {
                "resultsKey": "data"
            },
            "storeKey": "colorsSource",
            "dataSourceEndpoint": {
                "target": {
                    "uri": "colors"
                }
            }
        },
        {            
            "id": "name",
            "type": "input",
            "inputType": "text",
            "label": "What is your Name?",
            "options": {
                "validations": {
                    "required": true
                }
            }
        },
        {            
            "id": "isHuman",
            "type": "input",
            "inputType": "radio",
            "label": "Are you Human?"
        },
        {            
            "id": "birthday",
            "rendered": "isHuman",
            "type": "input",
            "inputType": "datepicker",
            "label": "What is your Birthday?"
        },
        {            
            "id": "color",
            "type": "input",
            "inputType": "select",
            "label": "Select the best color:",
            "options": {
                "values": {
                    "fromArray": "store.colorsSource",
                    "textKey": "text",
                    "valueKey": "value"
                }
            }
        }
    ]
}
```

![Select the best color from the server](./6_add_select_store.jpg)

## 9. Add a List

Now that we have covered basic inputs, one more form feature we would like to show before we move into Persisting our form data is to have a list entry.
That means you want to gather multiple answers from the user that they enter in a list format.
You have two options for list entry, `list` and `listAdvanced`. We will cover these more indepth in our APIs and other docs, with the main difference being that 
`listAdvanced` gives you a tabular view of your list as well as the ability to populate additional headers and footers.

For our simple tutorial we will only use a `list`. A List takes in an array of `items` which are other PJSON components, namely, inputs.

Again we will start off by importing the module we desire:

```JavaScript
import 'scalejs.metadatafactory-common/dist/list/listModule';
```

In our JSON we will add 2 components - a `textLabel` component to have a label without the input,
and a `list` component. Within the List's `items` array, we will specify an `input` and for aesthetic purposes we will hide the label.

```JSON
{
    "type": "adapter",
    "children": [
        {
            "type": "store",
            "keyMap": {
                "resultsKey": "data"
            },
            "storeKey": "colorsSource",
            "dataSourceEndpoint": {
                "target": {
                    "uri": "colors"
                }
            }
        },
        {            
            "id": "name",
            "type": "input",
            "inputType": "text",
            "label": "What is your Name?",
            "options": {
                "validations": {
                    "required": true
                }
            }
        },
        {            
            "id": "isHuman",
            "type": "input",
            "inputType": "radio",
            "label": "Are you Human?"
        },
        {            
            "id": "birthday",
            "rendered": "isHuman",
            "type": "input",
            "inputType": "datepicker",
            "label": "What is your Birthday?"
        },
        {            
            "id": "color",
            "type": "input",
            "inputType": "select",
            "label": "Select the best color:",
            "options": {
                "values": {
                    "fromArray": "store.colorsSource",
                    "textKey": "text",
                    "valueKey": "value"
                }
            }
        },
        {
            "type": "input",
            "inputType": "textLabel",
            "label": "Please list your friends:"
        },
        {
            "id": "friends",
            "type": "list",
            "items": [
                {
                    "id": "name",
                    "type": "input",
                    "inputType": "text",
                    "options": {
                        "showLabel": false
                    }
                }
            ]
        }
    ]
}
```

![Add items to a list](./7_add_list.jpg)


<!--```JSON

```-->