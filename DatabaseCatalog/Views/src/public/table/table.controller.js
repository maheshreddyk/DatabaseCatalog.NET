(function(module) {
    'use  strict';

    var tableController = function ($location, $stateParams, $http, $filter, $anchorScroll, ApiPath) {

        var ctrl = this;
        ctrl.scrollTo = function(id) {
            $location.hash(id);
            $anchorScroll();
         };
        ctrl.appId = $stateParams.appId;
        ctrl.creator = $stateParams.creator;
        ctrl.tableName = $stateParams.table;
        ctrl.tableAttr ={};
        ctrl.tableColSchema = [];
        ctrl.tableIndices = [];
        ctrl.tableRelationShips = [];
        ctrl.tableViews = [];
        ctrl.desc = "This table hold Account Group Information";
        
        $http.get(ApiPath + "/table/" + ctrl.appId + "/" + ctrl.creator + "/" + ctrl.tableName ).
        then(function(response){
        	ctrl.tableAttr = response.data.tableAttributes;
        	ctrl.tableColSchema = response.data.columnSchema;
        	 ctrl.tableViews  = response.data.views;
        	//INDICES START
        	ctrl.tableIndices = response.data.indices;
        	for(var j=0; j<ctrl.tableIndices.length; j++){
        		var indexColumns = ctrl.tableIndices[j].colNames.split("+");
	        	var indexColumnInfoList =[];
	        	for(var i=0; i<indexColumns.length; i++){ 
	        		 if(indexColumns[i])
	    			 {
	        			 var colSchema = $filter("filter")(ctrl.tableColSchema, {name: indexColumns[i]});
	        			 var indexColumnInfo = {"colName" : indexColumns[i],
		        									"colSeq" : i,
		        									"colNo" : colSchema[0].colNo,
		        									"ordering" : 'A'
		        									};
	        			 indexColumnInfoList.push(indexColumnInfo);
	    			 }
	        	}
	        	ctrl.tableIndices[j].indexColumnInfoList = indexColumnInfoList;
        	}
        	//INDICES END
        	//RELATIONSHIPS START
        	
        	ctrl.tableRelationShips = response.data.relationShips;
        	for(var j=0; j<ctrl.tableRelationShips.length; j++){
        		var fkColumns = ctrl.tableRelationShips[j].fkColNames.split("+");
	        	var fkColumnInfoList =[];
	        	for(var i=0; i<fkColumns.length; i++){ 
	        		 if(fkColumns[i])
	    			 {
	        			 console.log("flcol-", fkColumns[i].replace(/ /g,""), "-");
	        			 var colSchema = $filter("filter")(ctrl.tableColSchema, {name: fkColumns[i].replace(/ /g,"")});
	        			 console.log("colAllSchema", ctrl.tableColSchema);
	        			 console.log("colSchema", colSchema);
	        			 var fkColumnInfo = {"colName" : fkColumns[i],
		        									"colSeq" : i,
		        									"colNo" : colSchema[0].colNo,
		        									
		        									};
	        			 fkColumnInfoList.push(fkColumnInfo);
	    			 }
	        	}
	        	ctrl.tableRelationShips[j].fkColumnInfoList = fkColumnInfoList;
        	}
        	//RELATIONSHIPS END
        	console.log("Table Data", response.data);
        });
        console.log("table params", $stateParams);
    };

    tableController.$inject = ['$location', '$stateParams', '$http', '$filter', '$anchorScroll', 'ApiPath'];
    module.controller('tableController', tableController);

}(angular.module('public')));
