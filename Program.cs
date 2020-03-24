using jrascraping.Models;
using jrascraping.Regexs;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Globalization;
using System.IO;
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
            DateTime target = new DateTime(2020, 3, 2);
            while (target >= new DateTime(2018, 9, 1))
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
                        var horses = InsertHorseInfo(otherRace);
                        var raceResults = CreateRaceResults(otherRace, horses);
                        var payBacks = PayBack(otherRace, raceResults, horses);

                        // 2020/03/21 レース結果を完成させてからコメントアウトを外す
                        //context.PayBack.Add(PayBacks);

                        // otherRaceからRaceInfoを作る
                        //RaceInfo race = CreateRace(otherRace, 払い戻しテーブル); // なかでinsertしてます。
                        // otherRaceからRaceResultを作る(複数)
                        //CreateResults(race, horses, otherRace); // なかでinsertしてます。
                    }
                    context.SaveChanges();
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
        private static List<HorseInfo> InsertHorseInfo(string otherRace)
        {
            var horseCNames = ParseHorseCNames(otherRace);
            //レース結果の馬情報を保持
            var horses = new List<HorseInfo>();


            // 馬の情報を取得
            foreach (var horseInfo in horseCNames)
            {
                var horseHtml = new Downloder().GetHorse(horseInfo);
                var horse = CreateHorse(horseHtml); // なかでinsertしてます。
                var horsenames = context.HorseInfo.SingleOrDefault(c => c.HorseName == horse.HorseName && c.Birthday == horse.Birthday);

                if (horsenames == null)
                {
                    Debug.WriteLine("Insert実行");
                    context.HorseInfo.Add(horse);
                }
                else
                {
                    Debug.WriteLine("Insertしない");
                }
                horses.Add(horse);  //保持した馬情報と馬名を比較してInsertを行う。後で面倒
            }
            context.SaveChanges();
            return horses;
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
            try
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
                return horseinfo;
            }
            catch (Exception ex)
            {
                Debug.WriteLine(ex);
                throw;
            }
        }

        public static PayBack PayBack(string html, RaceResults raceResults, List<HorseInfo> horses)
        {
            var regex = new PayBackCname();
            var win = regex.win.Matches(html);
            var widebefore = regex.widebefore.Matches(html);
            var wideafter = regex.wideafter.Matches(html);
            var triplebefor = regex.triplebefor.Matches(html);
            var triplecenter = regex.triplecenter.Matches(html);
            var tripleafter = regex.tripleafter.Matches(html);
            var refund = regex.refund.Matches(html);

            var payback = new Models.PayBack();

            var count = win.Count + widebefore.Count + wideafter.Count + triplebefor.Count + triplecenter.Count + tripleafter.Count;
            if (count == 22) { 
                payback.TanshoNum = int.Parse(win[0].Value);
                payback.Fuku1Num = int.Parse(win[1].Value);
                payback.Fuku2Num = int.Parse(win[2].Value);
                payback.Fuku3Num = int.Parse(win[3].Value);
                payback.Wakuren1Waku = int.Parse(widebefore[0].Value);
                payback.Wakuren2Waku = int.Parse(wideafter[0].Value);
                payback.Wide1_1Num = int.Parse(widebefore[1].Value);
                payback.Wide1_2Num = int.Parse(wideafter[1].Value);
                payback.Wide2_1Num = int.Parse(widebefore[2].Value);
                payback.Wide2_2Num = int.Parse(wideafter[2].Value);
                payback.Wide3_1Num = int.Parse(widebefore[3].Value);
                payback.Wide3_2Num = int.Parse(wideafter[3].Value);
                payback.Umaren1Num = int.Parse(widebefore[4].Value);
                payback.Umaren2Num = int.Parse(wideafter[4].Value);
                payback.Umatan1Num = int.Parse(widebefore[5].Value);
                payback.Umatan2Num = int.Parse(wideafter[5].Value);
                payback.Sanfuku1Num = int.Parse(triplebefor[0].Value);
                payback.Sanfuku2Num = int.Parse(triplecenter[0].Value);
                payback.Sanfuku3Num = int.Parse(tripleafter[0].Value);
                payback.Santan1Num = int.Parse(triplebefor[1].Value);
                payback.Santan2Num = int.Parse(triplecenter[1].Value);
                payback.Santan3Num = int.Parse(tripleafter[1].Value);
            }
            else
            {
                payback.TanshoNum = int.Parse(win[0].Value);
                payback.Wide1_1Num = int.Parse(widebefore[1].Value);
                payback.Wide1_2Num = int.Parse(wideafter[1].Value);
                payback.Wide2_1Num = int.Parse(widebefore[2].Value);
                payback.Wide2_2Num = int.Parse(wideafter[2].Value);
                payback.Wide3_1Num = int.Parse(widebefore[3].Value);
                payback.Wide3_2Num = int.Parse(wideafter[3].Value);
                payback.Umaren1Num = int.Parse(widebefore[4].Value);
                payback.Umaren2Num = int.Parse(wideafter[4].Value);
                payback.Umatan1Num = int.Parse(widebefore[5].Value);
                payback.Umatan2Num = int.Parse(wideafter[5].Value);
                payback.Sanfuku1Num = int.Parse(triplebefor[0].Value);
                payback.Sanfuku2Num = int.Parse(triplecenter[0].Value);
                payback.Sanfuku3Num = int.Parse(tripleafter[0].Value);
                payback.Santan1Num = int.Parse(triplebefor[1].Value);
                payback.Santan2Num = int.Parse(triplecenter[1].Value);
                payback.Santan3Num = int.Parse(tripleafter[1].Value);
            }

            if (refund.Count == 12)
            {
                payback.TanshoRe = int.Parse(refund[0].Value, System.Globalization.NumberStyles.AllowThousands);
                payback.Fuku1Re = int.Parse(refund[1].Value, System.Globalization.NumberStyles.AllowThousands);
                payback.Fuku2Re = int.Parse(refund[2].Value, System.Globalization.NumberStyles.AllowThousands);
                payback.Fuku3Re = int.Parse(refund[3].Value, System.Globalization.NumberStyles.AllowThousands);
                payback.WakurenRe = int.Parse(refund[4].Value, System.Globalization.NumberStyles.AllowThousands);
                payback.Wide1Re = int.Parse(refund[5].Value, System.Globalization.NumberStyles.AllowThousands);
                payback.Wide2Re = int.Parse(refund[6].Value, System.Globalization.NumberStyles.AllowThousands);
                payback.Wide3Re = int.Parse(refund[7].Value, System.Globalization.NumberStyles.AllowThousands);
                payback.UmarenRe = int.Parse(refund[8].Value, System.Globalization.NumberStyles.AllowThousands);
                payback.UmatanRe = int.Parse(refund[9].Value, System.Globalization.NumberStyles.AllowThousands);
                payback.SanfukuRe = int.Parse(refund[10].Value, System.Globalization.NumberStyles.AllowThousands);
                payback.SantanRe = int.Parse(refund[11].Value, System.Globalization.NumberStyles.AllowThousands);
            }
            else
            {
                payback.TanshoRe = int.Parse(refund[0].Value, System.Globalization.NumberStyles.AllowThousands);
                payback.Wide1Re = int.Parse(refund[5].Value, System.Globalization.NumberStyles.AllowThousands);
                payback.Wide2Re = int.Parse(refund[6].Value, System.Globalization.NumberStyles.AllowThousands);
                payback.Wide3Re = int.Parse(refund[7].Value, System.Globalization.NumberStyles.AllowThousands);
                payback.UmarenRe = int.Parse(refund[8].Value, System.Globalization.NumberStyles.AllowThousands);
                payback.UmatanRe = int.Parse(refund[9].Value, System.Globalization.NumberStyles.AllowThousands);
                payback.SanfukuRe = int.Parse(refund[10].Value, System.Globalization.NumberStyles.AllowThousands);
                payback.SantanRe = int.Parse(refund[11].Value, System.Globalization.NumberStyles.AllowThousands);
            }
            return payback;
        }

        public static RaceResults CreateRaceResults(string html, List<HorseInfo> horses)
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