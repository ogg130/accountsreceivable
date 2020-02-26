using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AccountsReceivable.Data.Model
{
    public class User : TimeStampable
    {
        [JsonProperty("userID")]
        public int UserID { get; set; }
        [JsonProperty("firstName")]
        public string FirstName { get; set; }
        [JsonProperty("lastName")]
        public string LastName { get; set; }
        [JsonProperty("email")]
        public string Email { get; set; }
        [JsonProperty("userName")]
        public string UserName { get; set; }
        [JsonProperty("hash")]
        public string hash { get; set; }
        [JsonProperty("siteID")]
        public int SiteID { get; set; }

        [JsonProperty("roles")]
        public List<Role> Roles { get; set; }
        [JsonProperty("phoneNumbers")]
        public List<Phonenumber> PhoneNumbers { get; set; }
    }



    public class Phonenumber : TimeStampable
    {
        [JsonProperty("id")]
        public int Id { get; set; }
        [JsonProperty("type")]
        public string Type { get; set; }
        [JsonProperty("number")]
        public string Number { get; set; }
        [JsonProperty("userID")]
        public int UserID { get; set; }

    }


}
