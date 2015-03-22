ngImageInputWithPreview
======================

[![Build Status](https://travis-ci.org/deiwin/ngImageInputWithPreview.png)](https://travis-ci.org/deiwin/ngImageInputWithPreview)
[![Coverage Status](https://coveralls.io/repos/deiwin/ngImageInputWithPreview/badge.png?branch=master)](https://coveralls.io/r/deiwin/ngImageInputWithPreview?branch=master)
[![devDependency Status](https://david-dm.org/deiwin/ngImageInputWithPreview/dev-status.svg)](https://david-dm.org/deiwin/ngImageInputWithPreview#info=devDependencies)

A FileReader based Angular directive to easily preview and upload image files.


Installation
----------

	npm install --save ng-image-input-with-preview

or

	bower install --save ng-image-input-with-preview

Getting started
-------------

```
<form name="myForm">
	<input type="file" name="myImage" image-with-preview ng-model="image" accept="image/jpeg,image/png">
	<span class="error" ng-show="myForm.myImage.$error.image">
		Not a JPEG or a PNG!
	</span>
	<img ng-show="image.src" ng-src="{{image.src}}"/>
</form>

<script type="text/javascript" src="path/to/ng-image-input-with-preview.js"></script>
```

Demo !
------

Clone this repo, run `npm install` and then start the demo server with
`grunt demo` and go to [http://localhost:8000/demo/](http://localhost:8000/demo/).
