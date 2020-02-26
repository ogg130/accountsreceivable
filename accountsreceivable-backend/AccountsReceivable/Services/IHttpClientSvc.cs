using System.Net.Http;

namespace AccountsReceivable.Services
{
    public interface IHttpClientSvc
    {
        HttpClient Client { get; }
    }
}