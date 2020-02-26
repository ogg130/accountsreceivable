using AccountsReceivable.Services;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using Newtonsoft.Json;
using RichardSzalay.MockHttp;
using System;
using System.Net.Http;
using System.Threading.Tasks;
using Users.Controllers;
using Users.Data.Model;
using Users.Utils;
using Xunit;

namespace Users.Test
{
    public class UserControllerShould
    {

        [Fact]
        public async Task Match_Salted_User_Entry_To_Hashed_And_Salted_Password()
        {

            // Arrange -----

            // Create a mock http client handler
            var mockHttp = new MockHttpMessageHandler();

            // Setup a mock response for when the user api is invoked im the test
            mockHttp.When("https://localhost:5001/api/v1/user/*")
                    .Respond("application/json", "{  'userID': 14,  'firstName': 'Unit',  'lastName': 'Test',  'email': 'email13email.com',  'userName': 'utest',  'hash': 'epi06OdGJcFQKxa04M2ma+MUV9v/+L3aiFMniwtlyoU=',  'salt': 'tm39i+9M3ycgGm9LhbIz2Q==',  'siteID': 1,  'enteredDate': '2020-02-25T23:17:55.7774528',  'enteredByID': 1,  'roles': [],  'phoneNumbers': []    }");// Respond with JSON

            // Create a mock http client
            var client = new HttpClient(mockHttp);

            // Genereate a mock response by sending a request to an endpoint that matches the above mask
            var response = await client.GetAsync("https://localhost:5001/api/v1/user/utest");
            var json = await response.Content.ReadAsStringAsync();

            // Deserialize the mock response
            var dbUser = JsonConvert.DeserializeObject<User>(json);

            // Create a mock response body to send containing a password that should satisfy the hash and salt scheme
            var body = new Login()
            {
                Password = "unittestaccount"
            };
            
            // Act ------
            
            // Hash the mock user entry
            var hash = dbUser.Hash;
            var salt = dbUser.Salt;

            // Add the salt form the mock db record to the mock password
            var userEntryHashed = Convert.ToBase64String(KeyDerivation.Pbkdf2(
                password: body.Password,
                salt: salt,
                prf: KeyDerivationPrf.HMACSHA1,
                iterationCount: 10000,
                numBytesRequested: 256 / 8));

            // Assert -----
            
            //If the 'database' hash is the same as the mocked user entry password + salt, test passed!
            Assert.True(hash == userEntryHashed);
        }
    

    [Fact]
    public async Task Fail_On_Bad_User_Entry()
    {

        // Arrange -----

        // Create a mock http client handler
        var mockHttp = new MockHttpMessageHandler();

        // Setup a mock response for when the user api is invoked im the test
        mockHttp.When("https://localhost:5001/api/v1/user/*")
                .Respond("application/json", "{  'userID': 14,  'firstName': 'Unit',  'lastName': 'Test',  'email': 'email13email.com',  'userName': 'utest',  'hash': 'epi06OdGJcFQKxa04M2ma+MUV9v/+L3aiFMniwtlyoU=',  'salt': 'tm39i+9M3ycgGm9LhbIz2Q==',  'siteID': 1,  'enteredDate': '2020-02-25T23:17:55.7774528',  'enteredByID': 1,  'roles': [],  'phoneNumbers': []    }");// Respond with JSON

        // Create a mock http client
        var client = new HttpClient(mockHttp);

        // Genereate a mock response by sending a request to an endpoint that matches the above mask
        var response = await client.GetAsync("https://localhost:5001/api/v1/user/utest");
        var json = await response.Content.ReadAsStringAsync();

        // Deserialize the mock response
        var dbUser = JsonConvert.DeserializeObject<User>(json);

        // Create a mock response body to send containing a password that should satisfy the hash and salt scheme
        var body = new Login()
        {
            Password = "unittest123account"
        };

        // Act ------

        // Hash the mock user entry
        var hash = dbUser.Hash;
        var salt = dbUser.Salt;

        // Add the salt form the mock db record to the mock password
        var userEntryHashed = Convert.ToBase64String(KeyDerivation.Pbkdf2(
            password: body.Password,
            salt: salt,
            prf: KeyDerivationPrf.HMACSHA1,
            iterationCount: 10000,
            numBytesRequested: 256 / 8));

        // Assert -----

        //If the 'database' hash is NOT the same as the mocked user entry password + salt, test passed!
        Assert.True(hash != userEntryHashed);
    }
}
}
