ngImageInputWithPreview
======================

[![Build Status](https://travis-ci.org/deiwin/ngImageInputWithPreview.png)](https://travis-ci.org/deiwin/ngImageInputWithPreview)
[![Coverage Status](https://coveralls.io/repos/deiwin/ngImageInputWithPreview/badge.png?branch=master)](https://coveralls.io/r/deiwin/ngImageInputWithPreview?branch=master)
[![devDependency Status](https://david-dm.org/deiwin/ngImageInputWithPreview/dev-status.svg)](https://david-dm.org/deiwin/ngImageInputWithPreview#info=devDependencies)

A FileReader based Angular directive to easily preview and upload image files.

A live demo: http://deiwin.github.io/ngImageInputWithPreview/

Installation
----------

	npm install --save ng-image-input-with-preview

or

	bower install --save ng-image-input-with-preview

### Issues with installation:

If bower fails to load the module, try adding the following to your `bower.json`:
```javascript
"overrides": {
    "ng-image-input-with-preview": {
      "main": "./dist/ng-image-input-with-preview.js"
    }
}
```

Getting started
-------------

Include the dependency in your module definition:

```javascript
angular.module('app', [
   // ... other dependencies
  'ngImageInputWithPreview'
])
```

Then you can use the directive:

```html
<form name="myForm">
  <input type="file" name="myImage" image-with-preview
         ng-model="image"
         accept="image/jpeg,image/png"
         dimensions="height < 400 && width < 1800 && width > 2 * height"
         size="size < 2097152">
  <span class="error" ng-show="myForm.myImage.$error.image">
    Not a JPEG or a PNG!
  </span>
  <span class="error" ng-show="myForm.myImage.$error.dimensions">
    Invalid dimensions! Expecting a landscape image smaller than 1800x400.
  </span>
  <img ng-show="image.src" ng-src="{{image.src}}"/>
</form>

<script type="text/javascript" src="path/to/ng-image-input-with-preview.js"></script>
```

Options
-------

```html
<input type="file" image-with-preview
		ng-model="{string}"
		[accept="{string}"]>
```

### Parameters

| Name | Type | Description | Defaults to
| -----|------|-------------|------------
| ngModel (*required*) | `string` | Assignable angular expression to data-bind to. The data URL encoded image data will be available on the `src` property. If the angular expression is a string, it will be assumed to be an URL path to an image. The path will then be converted to an object with the path available on the `src` property and with the `isPath` property set to `true`. | - |
| accept | `string` | Works similarly to the [HTML specification](https://html.spec.whatwg.org/multipage/forms.html#attr-input-accept) to restrict the input to certain mime types. Sets `image` validation error key if the user selected file does not match. *NB: File extensions are currently not supported.* | image/jpeg,image/png |
| dimensions | `expression` | If this expression is evaluated to be false (or falsy) the `$error.dimensions` property will be set and the image will be considered invalid. The image's dimensions are available as `height` and `width`. | - |
| size | `experssion` | Specifically in bytes. If this expressions is evaluated to be false (or falsy) the `$error.size` property will be set and the image will be considered invalud. The image's size is available as `size`. | - |

Demo !
------

Clone this repo, run `npm install` and then start the demo server with
`grunt demo` and go to [http://localhost:8000/demo/](http://localhost:8000/demo/).
