using jrascraping.Models;
using jrascraping.Regexs;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Globalization;
using System.Text.RegularExpressions;

namespace jrascraping
{
    public class Jra
    {
        private static JraDbContext context;
        public static void Main(string[] args)
        {
            var options = new DbContextOptionsBuilder<JraDbContext>();
            options.UseSqlite("Data Source=Jra.db");
            context = new JraDbContext(options.Options);

            //Viewを起動する処理。いずれ必要かも？
            //CreateWebHostBuilder(args).Build().Run();

            //レース結果の検索ページ
            string html = new Downloder().GetRaceResults("pw01skl00999999/B3");
            List<string> RaceDays = RaceDaysCNames(html);

            //Cname：1回東京1日目
            foreach (var cname in RaceDays)
            {
                string otherRaceHtml = new Downloder().GetRaceResults(cname);
                var raceResultCNames = ParseRaceResultCNames(otherRaceHtml);

                //Cname：1R～12R
                foreach (var resultCName in raceResultCNames)
                {
                    string otherRace = new Downloder().GetRaceResults(resultCName);
                    var horseCNames = ParseHorseCNames(otherRace);
                    //馬の情報が取れるので、一旦入れる？
                    var horses = new List<HorseInfo>();

                    // 馬の情報を取得
                    foreach (var horseInfo in horseCNames)
                    {
                        var horseHtml = new Downloder().GetHorse(horseInfo);
                        var horse = CreateHorse(horseHtml); // なかでinsertしてます。
                        horses.Add(horse);
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

        public static HorseInfo CreateHorse(string html)
        {
            //正規表現
            var regex = new HorseInfos();
            var MatchHorseName = regex.horsenames.Match(html);
            var MatchFather = regex.horsenames.Match(html);
            var MatchMother = regex.horsenames.Match(html);
            var MatchMotherFather = regex.horsenames.Match(html);
            var MatchMotherMother = regex.horsenames.Match(html);
            var MatchSex = regex.horsenames.Match(html);
            var MatchBirthday = regex.horsenames.Match(html);
            var MatchCoatColor = regex.horsenames.Match(html);
            var MatchHorseNameMeaning = regex.horsenames.Match(html);
            var MatchHorseOwner = regex.horsenames.Match(html);
            var MatchTrainer = regex.horsenames.Match(html);
            var MatchProductionRanch = regex.horsenames.Match(html);
            var MatchOrigin = regex.horsenames.Match(html);

            var horseinfo = new Models.HorseInfo()
            {
                HorseName = MatchHorseName.Value,
                Father = MatchFather.Value,
                Mother = MatchMother.Value,
                MotherFather = MatchMotherFather.Value,
                MotherMother = MatchMotherMother.Value,
                Sex = MatchSex.Value,
                Birthday = DateTime.ParseExact(MatchBirthday.Value, "yyyy年M月d日", CultureInfo.InvariantCulture),
                CoatColor = MatchCoatColor.Value,
                HorseNameMeaning = MatchHorseNameMeaning.Value,
                HorseOwner = MatchHorseOwner.Value,
                Trainer = MatchTrainer.Value,
                ProductionRanch = MatchProductionRanch.Value,
                Origin = MatchOrigin.Value
            };
            context.HorseInfo.Add(horseinfo);
            return horseinfo;
        }
    }
}