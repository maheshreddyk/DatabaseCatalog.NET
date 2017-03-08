(function(module) {

    var showTabDirective = function() {
        return {
            link: function(scope, elem, attrs) {
                elem.click(function(e) {
                    e.preventDefault();
                    jQuery(elem).tab('show');
                });

            }

        }
    };

    module.directive('showTab', showTabDirective);
}(angular.module('common')));
