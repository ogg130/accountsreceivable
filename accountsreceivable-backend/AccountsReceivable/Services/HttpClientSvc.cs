using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace AccountsReceivable.Services
{
    public class HttpClientSvc : IHttpClientSvc
    {
        public HttpClient Client { get; }

        public HttpClientSvc(HttpClient client)
        {
            client.DefaultRequestHeaders.Add("Accept", "application/json");
            client.DefaultRequestHeaders.Add("Access-Control-Allow-Origin", "*");
            client.DefaultRequestHeaders.Add("Authorization", "Basic YXAxdXMzcjpwQHNzdzByZDE=");
            Client = client;
        }
    }
}