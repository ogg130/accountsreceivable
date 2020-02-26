using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AccountsReceivable.Data.Model
{
    public class TimeStampable
    {
        public DateTime EnteredDate { get; set; }
        public int EnteredByID { get; set; }
    }

}
