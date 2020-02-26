
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AccountsReceivable.Data.Model
{
    public class Role : TimeStampable
    {
        public int ID { get; set; }
        public string Value { get; set; }
        public int UserID { get; set; }
    }
}