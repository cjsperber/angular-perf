/**!
 * angular-perf: AngularJS performance/activity notification directives and filters
 * @author C.J. Sperber
 * @version 1.0.0
 */
(function() {
    'use strict';

    angular.module('angular-perf', []);

    angular.module('angular-perf')
        .service('perfData', function () {
            this._perfData = [];

            this.pushPerf = function () {
                if (('performance' in window) && (typeof performance.now === 'function')) {
                    this._perfData.push(performance.now());
                } else {
                    try {
                        this._perfData.push(Date.now());
                    } catch(err) {
                        return alert('your browser does not support angular-perf');
                    }
                }

                return this._perfData.length - 1;
            };

            this.popPerf = function () {
                if (('performance' in window) && (typeof performance.now === 'function')) {
                    return performance.now() - this._perfData.pop();
                } else {
                    if (this._perfData.length > 0) {
                        return Date.now() - this._perfData.pop();
                    }
                }
            }
        });

    angular.module('angular-perf')
        .directive('perfStart', function () {
            return {
                restrict: 'AE',
                scope: {},
                controller: ['perfData', function (perfData) {
                    perfData.pushPerf();
                }]
            }
        });

    angular.module('angular-perf')
        .directive('perfStop', function () {
            return {
                restrict: 'AE',
                scope: {},
                controller: ['$log', 'perfData', function ($log, perfData) {
                    this.log = function(msg) {
                        var _customMsg = msg || '';
                        if (_customMsg) {
                            _customMsg = '(' + _customMsg + ') ';
                        }

                        $log.log(_customMsg + 'routine, time: ' + perfData.popPerf() + ' ms');
                    }
                }],
                link: function(scope, el, attrs, ctrl) {
                    var _customMsg = attrs.perfStop || '';

                    ctrl.log(_customMsg);
                }
            }
        });

    angular.module('angular-perf').value('filterCounter', 0);

    angular.module('angular-perf')
        .filter('filterLog', ['$log', 'filterCounter', function($log, filterCounter) {
            return function(input) {
                $log.log('filter invoked (' + filterCounter++ + ')');

                return input;
            }
        }]);

    angular.module('angular-perf').value('watchCounter', 0);

    angular.module('angular-perf')
        .directive('watcherLog', function() {
            return {
                restrict: 'AE',
                controller: ['$log', '$scope', 'watchCounter', function($log, $scope, watchCounter) {
                    $scope.$watch(function () {
                        $log.log("digest invoked (" + watchCounter++ + ")");
                    })
                }]
            }
        });

    angular.module('angular-perf')
        .directive('delay', ['$log', function($log) {
            return {
                restrict: 'AE',
                scope: {},
                controller: function() {
                     this.synchronousDelayInMs = function(ms) {
                        var until = new Date().getTime() + ms;
                        while (new Date().getTime() < until) {}
                    };
                },
                link: function(scope, el, attrs, ctrl) {
                    var _delay = Number(attrs.delay) || 0;

                    if (_delay > 0) {
                        $log.log('synchronous delay, ' + _delay + ' ms');

                        ctrl.synchronousDelayInMs(_delay);
                    }
                }
            }
        }])
})();
