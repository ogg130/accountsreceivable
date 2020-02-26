using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Users.Data.Model;

namespace Users.Utils
{
    public class CredentialsHasher
    {

    
        public static void HashUserCredentials(Login body, ActionResult<User> dbUser, out string hash, out string userEntryHashed)
        {
            // Parse out the hash and the salt into separate objects
            hash = dbUser.Value.Hash;
            var salt = dbUser.Value.Salt;

            // Add the salt which we grabbed from the users db record to the password that the user entered
            userEntryHashed = Convert.ToBase64String(KeyDerivation.Pbkdf2(
                password: body.Password,
                salt: salt,
                prf: KeyDerivationPrf.HMACSHA1,
                iterationCount: 10000,
                numBytesRequested: 256 / 8));
        }
    }
}
