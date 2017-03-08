using DatabaseCatalog.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using Newtonsoft.Json.Linq;

namespace DatabaseCatalog.Controllers
{
    public class CatalogController : ApiController
    {
        // GET api/catalog
        public IEnumerable<ApplicationModel> Get()
        {

            using (StreamReader r = new StreamReader(HttpContext.Current.Server.MapPath("~/App_Data/apps.txt")))
            {
                
                string json = r.ReadToEnd();
                return JsonConvert.DeserializeObject<List<ApplicationModel>>(json);
            }
           
        }

        

    }
}