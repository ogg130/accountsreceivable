using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CostCenters.Data.Model
{
    public class CostCenter
    {
        public int ID { get; set; }
        public int Value { get; set; }
        public string Description { get; set; }
        public int SiteID { get; set; }
        public DateTime EnteredDate { get; set; }
        public int EnteredByID { get; set; }
    }
}