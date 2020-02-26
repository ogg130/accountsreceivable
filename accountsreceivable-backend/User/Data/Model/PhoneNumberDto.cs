using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Users.Data.Enum;

namespace Users.Data.Model
{
    public class PhoneNumberDto
    {
        public int ID { get; set; }
        public string Type { get; set; }
        public string Number { get; set; }

        public DateTime EnteredDate { get; set; }
        public int EnteredByID { get; set; }
        public int UserID { get; set; }
    }
}