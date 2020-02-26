using System;

namespace Users.Data.Model
{
    public class PhoneNumber
    {
        public int ID { get; set; }
        public string Type { get; set; }
        public string Number { get; set; }

        public int UserID { get; set; }
        public DateTime EnteredDate { get; set; }
        public int EnteredByID { get; set; }

        public User User { get; set; }
    }
}