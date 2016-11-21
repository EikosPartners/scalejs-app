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
7. Add a Select that gets from a Data Source
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

`import 'scalejs.metadatafactory-common/dist/adapter/adapterModule';`

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

`import 'scalejs.metadatafactory-common/dist/adapter/adapterModule';`

Then add the following input JSON as a child of the adapter
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
Refresh the application to see the changes reflect.

With few lines of JSON we have an input on the form

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
        }
    ]
}
```