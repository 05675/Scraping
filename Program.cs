using jrascraping.Models;
using jrascraping.Regexs;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Globalization;
using System.Linq;
using System.Text.RegularExpressions;

namespace jrascraping
{
    public class Jra
    {
        private static JraDbContext context;
        public static void Main(string[] args)
        {
            DbContext();
            DateTime target = new DateTime(2019, 2, 1);
            while (target >= new DateTime(2000, 1, 1))
            {
                var html = FetchRaceResultPage(target);
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
                        var RaceResults = CreateRaceResults(otherRace);
                        InsertHorseInfo(otherRace);

                        // 払い戻しテーブルを作る
                        //PayBack 払い戻しテーブル = Create払い戻しテーブル(otherRace); // なかでinsertしてます？
                        // otherRaceからRaceInfoを作る
                        //RaceInfo race = CreateRace(otherRace, 払い戻しテーブル); // なかでinsertしてます。
                        // otherRaceからRaceResultを作る(複数)
                        //CreateResults(race, horses, otherRace); // なかでinsertしてます。
                    }
                }
                target = target.AddMonths(-1);
            }
        }

        private static void DbContext()
        {
            //初期化
            var options = new DbContextOptionsBuilder<JraDbContext>();
            options.UseSqlite("Data Source=Jra.db");
            context = new JraDbContext(options.Options);
        }
        private static void InsertHorseInfo(string otherRace)
        {
            var horseCNames = ParseHorseCNames(otherRace);
            //レース結果の馬情報を保持
            var horses = new List<HorseInfo>();

            // 馬の情報を取得
            foreach (var horseInfo in horseCNames)
            {
                var horseHtml = new Downloder().GetHorse(horseInfo);
                var horse = CreateHorse(horseHtml); // なかでinsertしてます。
                horses.Add(horse);  //保持した馬情報と馬名を比較してInsertを行う。後で面倒
            }
            //context.SaveChanges();
        }

        private static void InsertRaceResults(string otherRace)
        {
            var raceCname = ParseRaceResultCNames(otherRace);
            //var horses = new List<HorseInfo>();　これをどうにかしてInsertする
            foreach (var raceResults in raceCname)
            {
                var raceResultsHtml = new Downloder().GetRaceResults(raceResults);
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
            var regex = new MainCname();
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
            var regex = new MainCname();
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
            var regex = new MainCname();
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
            var regex = new HorseInfoCname();
            var MatchHorseName = regex.horsenames.Match(html);
            var MatchFather = regex.father.Match(html);
            var MatchMother = regex.mother.Match(html);
            var MatchMotherFather = regex.motherfather.Match(html);
            var MatchMotherMother = regex.mothermother.Match(html);
            var MatchSex = regex.sex.Match(html);
            var MatchBirthday = regex.birthday.Match(html);
            var MatchCoatColor = regex.coatcolor.Match(html);
            var MatchHorseNameMeaning = regex.horsenamemeaning.Match(html);
            var MatchHorseOwner = regex.horseowner.Match(html);
            var TrainerName = regex.trainer.Match(html);
            var MatchTrainer = Regex.Replace(TrainerName.Value, "\\<.*?\\>", string.Empty);
            var MatchProductionRanch = regex.productionranch.Match(html);
            var MatchOrigin = regex.origin.Match(html);

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
                Trainer = MatchTrainer,
                ProductionRanch = MatchProductionRanch.Value,
                Origin = MatchOrigin.Value
            };
            //context.HorseInfo.Add(horseinfo);
            return horseinfo;
        }

        public static RaceResults CreateRaceResults(string html)
        {
            var regex = new RaceResultsCname();
            var MatchDate = regex.date.Match(html);
            var matches = new RaceResultsCname().corner.Matches(html);
            foreach (Match match in matches)
            {
                var ulul = match.Groups["corner"].Value;
                var corner = string.Join(",",
                Regex.Matches(ulul, "順位\\\">(?<number>.*?)\\</li\\>", RegexOptions.Singleline)
                    .Cast<Match>()
                    .Select(match => match.Groups["number"].Value));
            }
            var raceresults = new Models.RaceResults()
            {
                Date = MatchDate.Value

            };
            //context.RaceResults.Add(raceresults);
            return raceresults;
        }

        static string FetchRaceResultPage(DateTime month)
        {
            var cname = new AccessSCodeMonthlyConvertor().ConvertTo(month);
            return new Downloder().GetRaceResults(cname);
        }
    }

    class AccessSCodeMonthlyConvertor
    {
        internal string ConvertTo(DateTime month)
        {
            var idx1 = month.Year;
            var idx2 = month.Month;
            var arg = (idx1 * 100) + idx2;
            string param;
            if (arg >= 202002)
            {
                param = "pw01skl00" + arg.ToString() + "/";
            }
            else
            {
                param = "pw01skl10" + arg.ToString() + "/";
            }
            var cname = param + ObjParam.ObjParamCname(arg.ToString().Substring(2, 4));
            return cname;
        }
    }
}