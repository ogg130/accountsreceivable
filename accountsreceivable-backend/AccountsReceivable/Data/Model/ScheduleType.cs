using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AccountsReceivable.Data.Model
{

    public class ScheduleType : TimeStampable
    {
        public int ScheduleTypeID { get; set; }
        public string Value { get; set; }
        public int ScheduleAssetID { get; set; }
        public int Term { get; set; }

    }
}
