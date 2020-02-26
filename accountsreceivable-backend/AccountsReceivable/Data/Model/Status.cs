using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AccountsReceivable.Data.Model
{

    public class StatusList : TimeStampable
    { 
        [JsonProperty("id")]
        public int Id { get; set; }
        [JsonProperty("status")]
        public string Status { get; set; }
        [JsonProperty("description")]
        public string Description { get; set; }
        [JsonProperty("applicationID")]
        public int ApplicationID { get; set; }
        
    }
}
