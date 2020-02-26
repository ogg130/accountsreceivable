using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Sites.Data.Model
{
    public class Site
    {
        public int SiteID { get; set; }
        public string Name { get; set; }
        public string Code { get; set; }
        public DateTime EnteredDate { get; set; }
        public int EnteredByID { get; set; }
    }
}