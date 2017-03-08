(function(module){

  var navigationComponent = {
    templateUrl:"src/public/navigation/nav.template.html",
    controller : navigationController
  };

  navigationController.$inject =['MenuService'];
  
   function  navigationController(MenuService){
     var ctrl = this;
     ctrl.applications =[];
     ctrl.filterText ="" ; //
     ctrl.activeMenuTable ="None";
     var erdmApp= [];
     var cmrApp = [];
     ctrl.setActive = function(table) {
       ctrl.activeMenuTable = table;
     }
    
     MenuService.getMenuItems().then(function(data){
    	 ctrl.applications.push(data[0]);
    	 ctrl.allApplications = angular.copy( ctrl.applications); //for filter purpose
    	 // console.log(JSON.stringify(data[0]));     
    	 
     });	
     console.log("ADDING MENU");
     
     
//     ctrl.applications.push({appId: "erdm",
//                  desc :"ERDM APP",
//                  filterText:"",
//                  creators :
//                      [{ name : "ERDM",
//                        tables : ['REFT_ACCT_GRP', 'REFT_USCMR_COL_W','REFT_ACCT_GRP11', 'REFT_USCMR_COL_W1','REFT_ACCT_GRP2', 'REFT_USCMR_COL_W3','REFT_ACCT_GRP4', 'REFT_USCMR_COL_W5','REFT_ACCT_GRP6', 'REFT_USCMR_COL_W7']
//                      },
//                      { name : "STAGING",
//                        tables : [' STAGING Table 1', ' STAGING Table 2']
//                      }
//                      ]
//                    });
//      ctrl.applications.push({appId: "cmr",
//                   desc :"CREATE CMR",
//                   filterText:"",
//                   creators :
//                       [{ name : "CIWEB",
//                         tables : ['CIWEB Table 1', ' CIWEB Table 2']
//                       },
//                       { name : "CMMA",
//                         tables : ['CMMA Table 1', ' CMMA Table 2']
//                       }
//                       ]
//                     });
     

  ctrl.filter= function(application){
    //On each filter copy  all tables in the selected app and start filtering
    for(var i=0; i< ctrl.allApplications.length; i++)
    {
      if(application.appId == ctrl.allApplications[i].appId)
      {
        for(var j=0; j< application.creators.length; j++)
        {
          application.creators[j].tables.splice(0,  application.creators[j].tables.length);
          Array.prototype.push.apply(application.creators[j].tables, ctrl.allApplications[i].creators[j].tables);
        }
        break;
      }
    }

      ctrl.filterText =ctrl.filterText.toLowerCase();
      for(var i=0; i< application.creators.length; i++)
      {
        var spliceTab =[];
          for(var j=0; j< application.creators[i].tables.length; j++)
          {
            if(application.creators[i].tables[j].toLowerCase().indexOf(application.filterText) <0){
              spliceTab.push(j);
            }
          }
          for(j= spliceTab.length-1; j>=0; j--){
            application.creators[i].tables.splice(spliceTab[j],1);

          }
      }


  };


   };

  module.component('navigation', navigationComponent);

}(angular.module('public')));
