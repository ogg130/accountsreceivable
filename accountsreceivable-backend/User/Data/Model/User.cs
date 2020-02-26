using System;
using System.Collections.Generic;

namespace Users.Data.Model
{
    public class User
    {
        public int UserID { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string UserName { get; set; }
        public string Hash { get; set; }
        public byte[] Salt { get; set; }
        public int SiteID { get; set; }
        public DateTime EnteredDate { get; set; }
        public int EnteredByID { get; set; }

        public ICollection<Role> Roles { get; set; }
        public ICollection<PhoneNumber> PhoneNumbers { get; set; }
    }
}