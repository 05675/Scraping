using System;
using System.Collections.Generic;
using System.Data.SQLite;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Text.RegularExpressions;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.EntityFrameworkCore;
using jrascraping.Models;

namespace jrascraping
{
    public class Downloder
    {
        public string GetHtml(string V)
        {
            //httpを取得する
            using (HttpClient client = new HttpClient())
            {
                try
                {
                    var content = new FormUrlEncodedContent(
                        new Dictionary<string, string>
                        {
                            { "cname", V },
                        });
                    //レース結果URL
                    HttpResponseMessage response = client.PostAsync("http://www.jra.go.jp/JRADB/accessS.html", content).Result;
                    response.EnsureSuccessStatusCode();     //上のURLを呼び出す処理
                    System.Text.Encoding.RegisterProvider(CodePagesEncodingProvider.Instance);
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