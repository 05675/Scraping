using jrascraping.Models;
using jrascraping.Regexs;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;
using System.Collections.Generic;
using System.Diagnostics;
using System.Text.RegularExpressions;

namespace jrascraping
{
    public class Jra
    {
        public static void Main(string[] args)
        {
            //コンテキスト
            var options = new DbContextOptionsBuilder<JraDbContext>();
            options.UseSqlite("Data Source=Jra.db");
            var context = new JraDbContext(options.Options);

            //Viewを起動する処理。いずれ必要かも？
            //CreateWebHostBuilder(args).Build().Run();

            //レース結果の検索ページ
            string html = new Downloder().GetRaceResults("pw01skl00999999/B3");
            List<string> RaceDays = RaceDaysCNames(html);

            foreach (var cname in RaceDays)
            {
                string otherRaceHtml = new Downloder().GetRaceResults(cname); // ≒ var raceDaysHtml = FetchAccessSPage(cname).Result;
                // otherRaceHtmlから1R～12Rまでのcnameをとってくる。
                var raceResultCNames = ParseRaceResultCNames(otherRaceHtml);
                // 1R～12Rまでのcnameでforeachを書く

                foreach (var resultCName in raceResultCNames)
                {
                    string otherRace = new Downloder().GetRaceResults(resultCName); // ≒ var raceResultHtml = FetchAccessSPage(resultCName).Result;
                    var horseCNames = ParseHorseCNames(otherRace);
                    var horses = new List<HorseInfo>();

                    foreach (var horseInfo in horseCNames)
                    {
                        // 馬のページを取得
                        var horseHtml = new Downloder().GetHorse(horseInfo);
                        var horse = CreateHorse(horseHtml); // なかでinsertしてます。
                        //horses.Add(horse);
                    }
                    // 払い戻しテーブルを作る
                    //PayBack 払い戻しテーブル = Create払い戻しテーブル(otherRace); // なかでinsertしてます？
                    // otherRaceからRaceInfoを作る
                    //RaceInfo race = CreateRace(otherRace, 払い戻しテーブル); // なかでinsertしてます。
                    // otherRaceからRaceResultを作る(複数)
                    //CreateResults(race, horses, otherRace); // なかでinsertしてます。
                }
            }
        }

        public static IHostBuilder CreateWebHostBuilder(string[] args) =>
        Host.CreateDefaultBuilder(args)
        .ConfigureWebHostDefaults(webBuilder =>
        {
            webBuilder.UseStartup<Startup>();
        });

        private static List<string> RaceDaysCNames(string html)
        {
            var table = new List<string>();
            var regex = new Cname();
            var matches = regex.countofdaycname.Matches(html);
            foreach (Match match in matches)
            {
                table.Add(match.Groups["CountOfDayCname"].Value);
            }
            return table;
        }

        private static List<string> ParseRaceResultCNames(string html)
        {
            var table = new List<string>();
            var regex = new Cname();
            var matches = regex.racenamecname.Matches(html);
            foreach (Match match in matches)
            {
                table.Add(match.Groups["RaceNameCname"].Value);
            }
            return table;
        }

        private static List<string> ParseHorseCNames(string html)
        {
            var table = new List<string>();
            var regex = new Cname();
            var matches = regex.horsename.Matches(html);
            foreach (Match match in matches)
            {
                table.Add(match.Groups["horsecname"].Value);
            }
            return table;
        }

        public static List<string> CreateHorse(string html)
        {
            var table = new List<string>();
            var regex = new HorseInfos();
            var MatchHorseName = regex.horsenames.Matches(html);
            Debug.WriteLine(MatchHorseName);

            //foreach (Match match in MatchHorseName)
            //{
            //    table.Add(match.Groups["horsenames"].Value);
            //Debug.WriteLine(match.Groups["horsenames"].Value);
            //}
            return table;

            //Regex regex = new Regex(
            //    "(?<=bgcolor=\\\"#EEEED9\\\">父</td>\n<td bgcolor=\\\"#F5F5EA\\\">).*?(?=</td>)",
            //    RegexOptions.Compiled | RegexOptions.IgnoreCase | RegexOptions.Multiline);
            //var MatchFather = regex.Matches(html);

            //foreach (Match horsename in MatchHorseName)
            //{
            //    foreach (Match father in MatchFather)
            //    {
            //        var horseinfo = new Models.HorseInfo()
            //        {
            //            HorseName = horsename.Value,
            //            Father = father.Value
            //        };
            //        return CreateHorse(html, horseinfo);
            //    }
            //}
        }

    }
}