using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using Users.Data.Enum;

namespace Users.Data.Model
{
    public static class DbInitializer
    {
        public static void Initialize(Context context)
        {
            context.Database.EnsureCreated();

            //Look for any users.
            if (context.User.Any())
            {
                return;   // DB has been seeded
            }

            var users = GenerateUsers();

            foreach (var user in users)
            {
                context.User.Add(user);
            }
            context.SaveChanges();

            var roles = new List<Role>
            {

                new Role {Value=RoleType.OWNER.ToString(), EnteredDate=DateTime.Now, EnteredByID=1, UserID=1 },
                
                new Role {Value=RoleType.FINANCE.ToString(), EnteredDate=DateTime.Now, EnteredByID=1, UserID=2},
                new Role {Value=RoleType.FINANCE.ToString(), EnteredDate=DateTime.Now, EnteredByID=1, UserID=3 },
                new Role {Value=RoleType.FINANCE.ToString(), EnteredDate=DateTime.Now, EnteredByID=1 , UserID=4},
                new Role {Value=RoleType.FINANCE.ToString(), EnteredDate=DateTime.Now, EnteredByID=1, UserID=5 },
                
                new Role {Value=RoleType.DIRECTOR.ToString(), EnteredDate=DateTime.Now, EnteredByID=1,UserID=6 },
                new Role {Value=RoleType.DIRECTOR.ToString(), EnteredDate=DateTime.Now, EnteredByID=1,UserID=7 },
                new Role {Value=RoleType.DIRECTOR.ToString(), EnteredDate=DateTime.Now, EnteredByID=1,UserID=8 },

                new Role {Value=RoleType.OWNER.ToString(), EnteredDate=DateTime.Now, EnteredByID=1,UserID=9 },
                new Role {Value=RoleType.OWNER.ToString(), EnteredDate=DateTime.Now, EnteredByID=1,UserID=10 },
                new Role {Value=RoleType.OWNER.ToString(), EnteredDate=DateTime.Now, EnteredByID=1,UserID=11 },
                new Role {Value=RoleType.OWNER.ToString(), EnteredDate=DateTime.Now, EnteredByID=1,UserID=12 },
                new Role {Value=RoleType.OWNER.ToString(), EnteredDate=DateTime.Now, EnteredByID=1,UserID=13 }

            };
            foreach (var role in roles)
            {
                context.Role.Add(role);
            }
            context.SaveChanges();

            var phoneNumbers = new List<PhoneNumber>
            {
            new PhoneNumber{UserID=1, Type=NumberType.WORK.ToString(), Number="1111111111",EnteredDate=DateTime.Now,EnteredByID=1},
            new PhoneNumber{UserID=1, Type=NumberType.HOME.ToString(), Number="2222222222",EnteredDate=DateTime.Now,EnteredByID=1},
            new PhoneNumber{UserID=2, Type=NumberType.CELL.ToString(), Number="3333333333",EnteredDate=DateTime.Now,EnteredByID=1},
            new PhoneNumber{UserID=3, Type=NumberType.WORK.ToString(), Number="4444444444",EnteredDate=DateTime.Now,EnteredByID=1},
            new PhoneNumber{UserID=5, Type=NumberType.CELL.ToString(), Number="5555555555",EnteredDate=DateTime.Now,EnteredByID=1},
            new PhoneNumber{UserID=7, Type=NumberType.WORK.ToString(), Number="6666666666",EnteredDate=DateTime.Now,EnteredByID=1},
            new PhoneNumber{UserID=8, Type=NumberType.WORK.ToString(), Number="7777777777",EnteredDate=DateTime.Now,EnteredByID=1}
            };
            foreach (var number in phoneNumbers)
            {
                context.PhoneNumber.Add(number);
            }
            context.SaveChanges();
        }
        public static List<User> GenerateUsers()
        {
            var users = new List<User>
            {
            new User{FirstName="Robert",LastName="Ogden",Email="email1@email.com", UserName="rogden", EnteredDate=DateTime.Now,EnteredByID=1,SiteID=1},
            new User{FirstName="Antonio",LastName="Paderi",Email="email2@email.com", UserName="apaderi", EnteredDate=DateTime.Now,EnteredByID=1,SiteID=1},
            new User{FirstName="Jenifer",LastName="Koenig",Email="email3@email.com", UserName="jkoenig", EnteredDate=DateTime.Now,EnteredByID=1,SiteID=1},
            new User{FirstName="Debbie",LastName="Selmo",Email="email4@email.com", UserName="dselmo", EnteredDate=DateTime.Now,EnteredByID=1,SiteID=1},
            new User{FirstName="Kelly",LastName="Foster",Email="email5@email.com", UserName="kfoster", EnteredDate=DateTime.Now,EnteredByID=1,SiteID=2},
            new User{FirstName="April",LastName="Chapman",Email="email6@email.com", UserName="achapman", EnteredDate=DateTime.Now,EnteredByID=1,SiteID=1},
            new User{FirstName="Todd",LastName="Lipscomb",Email="email7@email.com", UserName="fjordan", EnteredDate=DateTime.Now,EnteredByID=1,SiteID=1},
            new User{FirstName="Jason",LastName="Ellenberg",Email="email7@email.com", UserName="mkoppinger", EnteredDate=DateTime.Now,EnteredByID=1,SiteID=2},
            new User{FirstName="Courtney",LastName="Rogers",Email="email8@email.com", UserName="crogers", EnteredDate=DateTime.Now,EnteredByID=1,SiteID=2},
            new User{FirstName="Firmin",LastName="Salazar",Email="email98@email.com", UserName="fsalazar", EnteredDate=DateTime.Now,EnteredByID=1,SiteID=1},
            new User{FirstName="David",LastName="Zak",Email="email10@email.com", UserName="byoung", EnteredDate=DateTime.Now,EnteredByID=1,SiteID=2},
            new User{FirstName="Barbara",LastName="Williams",Email="email11@email.com", UserName="bwilliams", EnteredDate=DateTime.Now,EnteredByID=1,SiteID=1},
            new User{FirstName="Jim",LastName="Davis",Email="email12@email.com", UserName="jdavis", EnteredDate=DateTime.Now,EnteredByID=1,SiteID=1},
            new User{FirstName="Unit",LastName="Test",Email="email13email.com", UserName="utest", EnteredDate=DateTime.Now,EnteredByID=1,SiteID=1},
            };

            var passwords = new List<string>
        {
            "rogden123",
            "apaderi123",
            "jkoenig123",
            "dselmo123",
            "kfoster123",
            "achapman123",
            "tlipscomb123",
            "jellenberg123",
            "crogers123",
            "fsalazar123",
            "dzak123",
             "bwilliams123",
             "jdavis123",
             "unittestaccount"
        };

            for (var i = 0; i < users.Count; ++i)
            {
                var password = passwords[i];

                // generate a 128-bit salt using a secure PRNG
                var salt = new byte[128 / 8];
                using (var rng = RandomNumberGenerator.Create())
                {
                    rng.GetBytes(salt);
                }
                users[i].Salt = salt;

                // derive a 256-bit subkey (use HMACSHA1 with 10,000 iterations)
                string hash = Convert.ToBase64String(KeyDerivation.Pbkdf2(
                    password: password,
                    salt: salt,
                    prf: KeyDerivationPrf.HMACSHA1,
                    iterationCount: 10000,
                    numBytesRequested: 256 / 8));
                users[i].Hash = hash;
            }
            return users;
        }
    }
}