using System;
using System.Collections.Generic;
using System.IO;
using System.Net.Http;
using System.Text;

namespace jrascraping.GetJra
{
    public class Downloder
    {
        public string GetRaceResultsHtml(string cname)
        {
            string accessPageName = "accessS.html";
            return GetHtmlInternal(cname, accessPageName);
        }
        public string GetHorseHtml(string cname)
        {
            string accessPageName = "accessU.html";
            return GetHtmlInternal(cname, accessPageName);
        }

        private string GetHtmlInternal(string cname, string accessPageName)
        {
            //cnameとそのhttpを取得する
            using (HttpClient client = new HttpClient())
            {
                try
                {
                    var content = new FormUrlEncodedContent(
                        new Dictionary<string, string>
                        {
                            { "cname", cname },
                        });
                    //レース結果URL
                    HttpResponseMessage response = client.PostAsync($"https://www.jra.go.jp/JRADB/{accessPageName}", content).Result;
                    response.EnsureSuccessStatusCode();     //上のURLを呼び出す処理
                    Encoding.RegisterProvider(CodePagesEncodingProvider.Instance);
                    string responseBody = new StreamReader(response.Content.ReadAsStreamAsync().Result, Encoding.GetEncoding("shift_jis")).ReadToEnd();
                    return responseBody;
                }
                catch (HttpRequestException e)
                {
                    Console.WriteLine("\nException Caught!");
                    Console.WriteLine("Message :{0} ", e.Message);
                }
            }
            return string.Empty;
        }
    }
}