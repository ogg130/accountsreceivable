using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AccountsReceivable.Data.Model
{

    public class CostCenter : TimeStampable
    { 
        [JsonProperty("id")]
        public int Id { get; set; }
        [JsonProperty("value")]
        public int Value { get; set; }
        [JsonProperty("description")]
        public string Description { get; set; }
        [JsonProperty("siteID")]
        public int SiteID { get; set; }

    }

}
