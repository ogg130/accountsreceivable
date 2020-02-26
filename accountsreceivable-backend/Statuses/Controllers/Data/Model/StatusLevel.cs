using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Statuses.Data.Model
{
    public class StatusLevel
    {
        public int ID { get; set; }
        public string Status { get; set; }
        public string Description { get; set; }
        public int ApplicationID { get; set; }
        public DateTime EnteredDate { get; set; }
        public int EnteredByID { get; set; }
    }
}