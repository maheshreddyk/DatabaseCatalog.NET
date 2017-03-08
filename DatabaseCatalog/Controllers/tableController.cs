using DatabaseCatalog.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;

namespace DatabaseCatalog.Controllers
{
    public class tableController : ApiController
    {
        // GET api/values
        public TableModel Get(String appId, String schema, String tableName)
        {

            using (StreamReader r = new StreamReader(HttpContext.Current.Server.MapPath("~/App_Data/"+ appId +"/" + schema +"/" + tableName+".json")))
            {

                string json = r.ReadToEnd();
                return  JsonConvert.DeserializeObject<TableModel>(json);
                
            }

        }
    }
}