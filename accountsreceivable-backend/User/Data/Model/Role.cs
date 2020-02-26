using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Users.Data.Model
{
    public class Role
    {
        public int ID { get; set; }
        public string Value { get; set; }
        public DateTime EnteredDate { get; set; }
        public int EnteredByID { get; set; }

        public int UserID { get; set; }
        public User User { get; set; }
    }
}