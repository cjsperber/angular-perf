# Description

angular-perf is a set of wrapper directives and filters for AngularJS that
provide for console-logged performance metrics and application activity.

# Packaged angular-perf

The source for this module is contained with the [main angular-perf repo](https://github.com/cjsperber/angular-perf).
Please file issues and pull requests against that repo.

A minified version of angular-perf is not included in the repo as it should not be included in a
non-development, non-debugging environment.

# Documentation

## Directives

* perf-start
* perf-stop (optional: perf-stop="custom-tag")
* delay

```html
<div data-perf-start>
    <!-- Javascript and other directives/filters/etc. go here -->

    <!-- the delay directive (a synchronous/blocking delay) is being used below -->
    <!-- for testing purposes; e.g. 1 second delay -->
    <span data-delay=1000></span>
</div data-perf-stop="business logic">
```

The above HTML will console-log the time it took to execute Javascript and/or the custom directives/filters/etc. located
between the perf-start and perf-stop attributes. For testing purposes, the delay directive was used to
simulate 1 second synchronous/blocking Javascript functionality.

The perf-start and perf-stop directives support nesting as well.

* watcher-log

```html
<html data-ng-app="app">
   <head>
       <!-- ... -->
   </head>

   <body data-watcher-log data-ng-controller="AppController as AppCtrl">
       <!-- ... -->
   </body>
</html>
```

The above HTML will console-log AngularJS digest cycle invocations. In other words, anytime AngularJS invokes a digest cycle,
it will be console-logged.

## Filters

* filterLog

```html
<div data-ng-repeat="language in AppCtrl.languages">
    {{ language | orderBy:language.name | filterLog }}
</div>
```

The above HTML will console-log every filter invocation.

## Install

You can install this package with `bower`.

### bower

```shell
bower install angular-perf
```

Add a `<script>` to any page using the angular-perf module, e.g. index.html:

```html
<script src="/bower_components/angular-perf/angular-perf.js"></script>
```

Then add `angular-perf` as a dependency for your app:

```javascript
angular.module('app', ['angular-perf']);
```

# License

For purposes of completeness, a licensing section is provided.
This software is considered open-source and is thus unobfuscated and available
for community enhancement.

angular-perf is licensed under the MIT license as expressed below.

The MIT License

Copyright (c) 2015 C.J. Sperber

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
