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

            //FromToの期間を入力
            DateTime target = new DateTime(2020, 4, 30);    //From
            while (target >= new DateTime(2020, 1, 1))      //To
            {
                var html = FetchRaceResultPage(target);
                List<string> raceDays = RaceDaysCNames(html);

                //Cname：1回東京1日目などを取得
                foreach (var cname in raceDays)
                {
                    string otherRaceHtml = new Downloder().GetRaceResults(cname);
                    var raceResultCNames = ParseRaceResultCNames(otherRaceHtml);

                    //Cname：1R～12Rまで取得
                    foreach (var resultCName in raceResultCNames)
                    {
                        string otherRace = new Downloder().GetRaceResults(resultCName);
                        var horses = InsertHorseInfo(otherRace);
                        var raceResults = CreateRaceResults(otherRace, horses);
                        var payBacks = CreatePayBack(otherRace, raceResults, horses);
                        var raceInfo = CreateRaceInfo(otherRace, horses);

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

            //馬の情報を取得
            foreach (var horseInfo in horseCNames)
            {
                var horseHtml = new Downloder().GetHorse(horseInfo);
                var horse = CreateHorseInfo(horseHtml); // なかでinsertしてます。
                var horsenames = context.HorseInfo.SingleOrDefault(c => c.HorseName == horse.HorseName && c.Birthday == horse.Birthday);

                if (horsenames == null)
                {
                    Debug.WriteLine("Insert実行");
                    //context.HorseInfo.Add(horse); //Insert
                }
                else
                {
                    Debug.WriteLine("Insertしない");
                }
                //horses.Add(horse);  //保持した馬情報と馬名を比較してInsertを行う。後で面倒になるため。
            }
            //context.SaveChanges();  //Insert?
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
            var matches = regex.holding.Matches(html);
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
            var matches = regex.raceNameCName.Matches(html);
            foreach (Match match in matches)
            {
                table.Add(match.Groups["aceNameCname"].Value);
            }
            return table;
        }

        private static List<string> ParseHorseCNames(string html)
        {
            var table = new List<string>();
            var regex = new MainCname();
            var matches = regex.horseCName.Matches(html);
            foreach (Match match in matches)
            {
                table.Add(match.Groups["horseCName"].Value);
            }
            return table;
        }

        public static HorseInfo CreateHorseInfo(string html)
        {
            try
            {
                var regex = new HorseInfoCname();
                var MatchHorseName = regex.horseNames.Match(html);
                var MatchFather = regex.father.Match(html);
                var MatchMother = regex.mother.Match(html);
                var MatchMotherFather = regex.motherFather.Match(html);
                var MatchMotherMother = regex.motherMother.Match(html);
                var MatchSex = regex.sex.Match(html);
                var MatchBirthday = regex.birthday.Match(html);
                var MatchCoatColor = regex.coatcolor.Match(html);
                var MatchHorseNameMeaning = regex.horseNameMeaning.Match(html);
                var MatchHorseOwner = regex.horseOwner.Match(html);
                var TrainerName = regex.trainer.Match(html);
                var MatchTrainer = Regex.Replace(TrainerName.Value, "\\<.*?\\>", string.Empty);
                var MatchProductionRanch = regex.productionRanch.Match(html);
                var MatchOrigin = regex.origin.Match(html);

                var horseinfo = new HorseInfo()
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

        public static RaceInfo CreateRaceInfo(string html, List<HorseInfo> horses)
        {
            try
            {
                var regex = new RaceInfoCname();
                var MatchCountOfDay = regex.holding.Match(html);
                var MatchRaceName = regex.raceName.Match(html);
                var MatchDate = regex.date.Match(html);
                var MatchShippingTime = regex.shippingTime.Match(html);
                var MatchWeather = regex.weather.Match(html);
                var MatchBaba = regex.baba.Match(html);
                var MatchBabaState = regex.babaState.Match(html);
                var MatchDistance = regex.distance.Match(html);
                var MatchAround = regex.around.Match(html);

                //レースの出走条件
                var Matcholdclass = regex.oldClass.Matches(html);
                var oldclass = "";
                foreach (Match match in Matcholdclass)
                {
                    var category = match.Groups["oldclass"].Value;
                    oldclass = string.Join(" ",
                    Regex.Matches(category, "cell (category|class|rule|weight)\\\">(?<name>.*?)\\</div\\>", RegexOptions.Singleline)
                        .Cast<Match>()
                        .Select(match => match.Groups["name"].Value));
                }
                var raceinfo = new RaceInfo()
                {
                    CountOfDay = MatchCountOfDay.Value,
                    RaceName = MatchRaceName.Value,
                    Date = DateTime.ParseExact(MatchDate.Value, "yyyy年M月d日", CultureInfo.InvariantCulture),
                    ShippingTime = MatchShippingTime.Value,
                    Weather = MatchWeather.Value,
                    Baba = MatchBaba.Value,
                    BabaState = MatchBabaState.Value,
                    OldClass = oldclass,
                    Distance = MatchDistance.Value,
                    Around = MatchAround.Value,
                };
                //context.RaceInfo.Add(raceinfo);
                return raceinfo;
            }
            catch (Exception ex)
            {
                Debug.WriteLine(ex);
                throw;
            }
        }
        public static PayBack CreatePayBack(string html, RaceResults raceResults, List<HorseInfo> horses)
        {
            var regex = new PayBackCname();
            var win = regex.win.Matches(html);
            var widebefore = regex.wideBefore.Matches(html);
            var wideafter = regex.wideAfter.Matches(html);
            var triplebefor = regex.tripleBefor.Matches(html);
            var triplecenter = regex.tripleCenter.Matches(html);
            var tripleafter = regex.tripleAfter.Matches(html);
            var refund = regex.refund.Matches(html);

            var payback = new PayBack();
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
                //payback.TanshoNum = int.Parse(win[0].Value);
                //payback.Wide1_1Num = int.Parse(widebefore[1].Value);
                //payback.Wide1_2Num = int.Parse(wideafter[1].Value);
                //payback.Wide2_1Num = int.Parse(widebefore[2].Value);
                //payback.Wide2_2Num = int.Parse(wideafter[2].Value);
                //payback.Wide3_1Num = int.Parse(widebefore[3].Value);
                //payback.Wide3_2Num = int.Parse(wideafter[3].Value);
                //payback.Umaren1Num = int.Parse(widebefore[4].Value);
                //payback.Umaren2Num = int.Parse(wideafter[4].Value);
                //payback.Umatan1Num = int.Parse(widebefore[5].Value);
                //payback.Umatan2Num = int.Parse(wideafter[5].Value);
                //payback.Sanfuku1Num = int.Parse(triplebefor[0].Value);
                //payback.Sanfuku2Num = int.Parse(triplecenter[0].Value);
                //payback.Sanfuku3Num = int.Parse(tripleafter[0].Value);
                //payback.Santan1Num = int.Parse(triplebefor[1].Value);
                //payback.Santan2Num = int.Parse(triplecenter[1].Value);
                //payback.Santan3Num = int.Parse(tripleafter[1].Value);
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
                //payback.TanshoRe = int.Parse(refund[0].Value, System.Globalization.NumberStyles.AllowThousands);
                //payback.Wide1Re = int.Parse(refund[5].Value, System.Globalization.NumberStyles.AllowThousands);
                //payback.Wide2Re = int.Parse(refund[6].Value, System.Globalization.NumberStyles.AllowThousands);
                //payback.Wide3Re = int.Parse(refund[7].Value, System.Globalization.NumberStyles.AllowThousands);
                //payback.UmarenRe = int.Parse(refund[8].Value, System.Globalization.NumberStyles.AllowThousands);
                //payback.UmatanRe = int.Parse(refund[9].Value, System.Globalization.NumberStyles.AllowThousands);
                //payback.SanfukuRe = int.Parse(refund[10].Value, System.Globalization.NumberStyles.AllowThousands);
                //payback.SantanRe = int.Parse(refund[11].Value, System.Globalization.NumberStyles.AllowThousands);
            }
            return payback;
        }

        public static RaceResults CreateRaceResults(string html, List<HorseInfo> horses)
        {
            var regex = new RaceResultsCname();
            var MatchDate = regex.date.Match(html);
            var MatchNumberoftime = regex.holding.Match(html);
            var MatchPlace = regex.place.Match(html);
            var MatchWaku = regex.waku.Match(html);
            var MatchNum = regex.num.Match(html);
            var MatchHorse = regex.horse.Match(html);
            var MatchWeight = regex.weight.Match(html);
            var MatchJockey = regex.jockey.Match(html);
            var MatchTime = regex.time.Match(html);
            var MatchArrivaldifference = regex.arrivaldifference.Match(html);
            var MatchCorner = regex.corner.Matches(html);
            var MatchHalongtime = regex.halongTime.Match(html);
            var MatchHorseweight = regex.horseWeight.Match(html);
            var MatchTrainer = regex.trainer.Match(html);
            var MatchPop = regex.pop.Match(html);

            var _regex = new RaceInfoCname();
            var MatchRaceName = _regex.raceName.Match(html);

            var corner = "";
            foreach (Match match in MatchCorner)
            {
                var ulul = match.Groups["corner"].Value;
                corner = string.Join(",",
                Regex.Matches(ulul, "順位\\\">(?<number>.*?)\\</li\\>", RegexOptions.Singleline)
                    .Cast<Match>()
                    .Select(match => match.Groups["number"].Value));
            }
            var raceresults = new RaceResults()
            {
                Date = DateTime.ParseExact(MatchDate.Value, "yyyy年M月d日", CultureInfo.InvariantCulture),
                NumberOfTime = MatchNumberoftime.Value,
                RaceName = MatchRaceName.Value,
                Place = MatchPlace.Value,
                Waku = int.Parse(MatchWaku.Value),
                Num = int.Parse(MatchNum.Value),
                Weight = MatchWeight.Value,
                Jockey = MatchJockey.Value,
                Time = MatchTime.Value,
                ArrivalDifference = MatchArrivaldifference.Value,
                Corner = corner,
                HalongTime = MatchHalongtime.Value,
                HorseWeight = MatchHorseweight.Value,
                Trainer = MatchTrainer.Value,
                Pop = int.Parse(MatchPop.Value)
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
            var arg = YearAndMonth(idx1, idx2);
            var yearNow = DateTime.Now.Year;
            var monthNow = DateTime.Now.Month;
            var currenYear = YearAndMonth(yearNow, monthNow);
            string param;
            if (arg >= currenYear)
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

        private int YearAndMonth(int year,int month)
        {
            return year * 100 + month;
        }
    }
}