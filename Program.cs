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
        private static void DbContext()
        {
            //初期化
            var options = new DbContextOptionsBuilder<JraDbContext>();
            options.UseSqlite("Data Source=Jra.db");
            context = new JraDbContext(options.Options);
        }
        public static void Main(string[] args)
        {
            DbContext();

            //FromToの期間を入力
            DateTime target = new DateTime(2020, 6, 19);    //From
            while (target >= new DateTime(2020, 5, 1))      //To
            {
                var html = FetchRaceResultPage(target);     //パラメータエラー時は、Cnameが0件になるため処理できない
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
                        var horses = InsertHorseInfo(otherRace);        //HorseInfoへInsertする関数がある
                        var raceResults = CreateRaceResults(otherRace, horses);
                        var payBacks = CreatePayBack(otherRace, raceResults, horses);
                        var raceInfo = CreateRaceInfo(otherRace, horses);

                        // 2020/03/21 レース結果を完成させてからコメントアウトを外す
                        context.PayBack.Add(payBacks);

                        // otherRaceからRaceInfoを作る
                        RaceInfo race = CreateRaceInfo(otherRace, horses); // なかでinsertしてます。horsesは「払い戻しテーブル？」

                        // otherRaceからRaceResultを作る(複数)
                    }
                    context.SaveChanges();
                }
                target = target.AddMonths(-1);
            }
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
                var horseNames = context.HorseInfo.SingleOrDefault(c => c.HorseName == horse.HorseName && c.Birthday == horse.Birthday);

                if (horseNames == null)
                {
                    Debug.WriteLine("Insert実行");
                    context.HorseInfo.Add(horse); //Insert
                }
                else
                {
                    Debug.WriteLine("Insertしない");
                }
                horses.Add(horse);  //保持した馬情報と馬名を比較してInsertを行う。後で面倒になるため。
            }
            context.SaveChanges();  //Insert?
            return horses;
        }

        private static void InsertRaceResults(string otherRace)
        {
            var raceCName = ParseRaceResultCNames(otherRace);
            var horses = new List<HorseInfo>();　//これをどうにかしてInsertする
            foreach (var raceResults in raceCName)
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
            var regex = new MainCName();
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
            var regex = new MainCName();
            var matches = regex.raceNameCName.Matches(html);
            foreach (Match match in matches)
            {
                table.Add(match.Groups["RaceNameCname"].Value);
            }
            return table;
        }

        private static List<string> ParseHorseCNames(string html)
        {
            var table = new List<string>();
            var regex = new MainCName();
            var matches = regex.horseCName.Matches(html);
            foreach (Match match in matches)
            {
                table.Add(match.Groups["HorseCname"].Value);
            }
            return table;
        }

        public static HorseInfo CreateHorseInfo(string html)
        {
            try
            {
                var regex = new HorseInfoCname();
                var matchHorseName = regex.horseNames.Match(html);
                var matchFather = regex.father.Match(html);
                var matchMother = regex.mother.Match(html);
                var matchMotherFather = regex.motherFather.Match(html);
                var matchMotherMother = regex.motherMother.Match(html);
                var matchSex = regex.sex.Match(html);
                var matchBirthday = regex.birthday.Match(html);
                var matchCoatColor = regex.coatColor.Match(html);
                var matchHorseNameMeaning = regex.horseNameMeaning.Match(html);
                var matchHorseOwner = regex.horseOwner.Match(html);
                var TrainerName = regex.trainer.Match(html);
                var matchTrainer = Regex.Replace(TrainerName.Value, "\\<.*?\\>", string.Empty);
                var matchProductionRanch = regex.productionRanch.Match(html);
                var matchOrigin = regex.origin.Match(html);

                var horseInfo = new HorseInfo()
                {
                    HorseName = matchHorseName.Value,
                    Father = matchFather.Value,
                    Mother = matchMother.Value,
                    MotherFather = matchMotherFather.Value,
                    MotherMother = matchMotherMother.Value,
                    Sex = matchSex.Value,
                    Birthday = DateTime.ParseExact(matchBirthday.Value, "yyyy年M月d日", CultureInfo.InvariantCulture),
                    CoatColor = matchCoatColor.Value,
                    HorseNameMeaning = matchHorseNameMeaning.Value,
                    HorseOwner = matchHorseOwner.Value,
                    Trainer = matchTrainer,
                    ProductionRanch = matchProductionRanch.Value,
                    Origin = matchOrigin.Value
                };
                return horseInfo;
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
                var matchHolding = regex.holding.Match(html);
                var matchRaceName = regex.raceName.Match(html);
                var matchDate = regex.date.Match(html);
                var matchShippingTime = regex.shippingTime.Match(html);
                var matchWeather = regex.weather.Match(html);
                var matchBaba = regex.baba.Match(html);
                var matchBabaState = regex.babaState.Match(html);
                var matchDistance = regex.distance.Match(html);
                var matchAround = regex.around.Match(html);

                //レースの出走条件
                var matchOldClass = regex.oldClass.Matches(html);
                var oldClass = "";
                foreach (Match match in matchOldClass)
                {
                    var category = match.Groups["OldClass"].Value;
                    oldClass = string.Join(" ",
                    Regex.Matches(category, "cell (category|class|rule|weight)\\\">(?<name>.*?)\\</div\\>", RegexOptions.Singleline)
                        .Cast<Match>()
                        .Select(match => match.Groups["name"].Value));
                }
                var raceInfo = new RaceInfo()
                {
                    Holding = matchHolding.Value,
                    RaceName = matchRaceName.Value,
                    Date = DateTime.ParseExact(matchDate.Value, "yyyy年M月d日", CultureInfo.InvariantCulture),
                    ShippingTime = matchShippingTime.Value,
                    Weather = matchWeather.Value,
                    Baba = matchBaba.Value,
                    BabaState = matchBabaState.Value,
                    OldClass = oldClass,
                    Distance = matchDistance.Value,
                    Around = matchAround.Value,
                };
                context.RaceInfo.Add(raceInfo);
                return raceInfo;
            }
            catch (Exception ex)
            {
                Debug.WriteLine(ex);
                throw;
            }
        }
        #region 払い戻しを取得
        public static PayBack CreatePayBack(string html, RaceResults raceResults, List<HorseInfo> horses)
        {
            var regex = new PayBackCname();
            var win = regex.win.Matches(html);
            var wideBefore = regex.wideBefore.Matches(html);
            var wideAfter = regex.wideAfter.Matches(html);
            var tripleBefor = regex.tripleBefor.Matches(html);
            var tripleCenter = regex.tripleCenter.Matches(html);
            var tripleAfter = regex.tripleAfter.Matches(html);
            var refund = regex.refund.Matches(html);

            var payback = new PayBack();
            var count = win.Count + wideBefore.Count + wideAfter.Count + tripleBefor.Count + tripleCenter.Count + tripleAfter.Count;
            if (count == 22)
            {
                payback.TanshoNum = int.Parse(win[0].Value);
                payback.Fuku1Num = int.Parse(win[1].Value);
                payback.Fuku2Num = int.Parse(win[2].Value);
                payback.Fuku3Num = int.Parse(win[3].Value);
                payback.Wakuren1Waku = int.Parse(wideBefore[0].Value);
                payback.Wakuren2Waku = int.Parse(wideAfter[0].Value);
                payback.Wide1_1Num = int.Parse(wideBefore[1].Value);
                payback.Wide1_2Num = int.Parse(wideAfter[1].Value);
                payback.Wide2_1Num = int.Parse(wideBefore[2].Value);
                payback.Wide2_2Num = int.Parse(wideAfter[2].Value);
                payback.Wide3_1Num = int.Parse(wideBefore[3].Value);
                payback.Wide3_2Num = int.Parse(wideAfter[3].Value);
                payback.Umaren1Num = int.Parse(wideBefore[4].Value);
                payback.Umaren2Num = int.Parse(wideAfter[4].Value);
                payback.Umatan1Num = int.Parse(wideBefore[5].Value);
                payback.Umatan2Num = int.Parse(wideAfter[5].Value);
                payback.Sanfuku1Num = int.Parse(tripleBefor[0].Value);
                payback.Sanfuku2Num = int.Parse(tripleCenter[0].Value);
                payback.Sanfuku3Num = int.Parse(tripleAfter[0].Value);
                payback.Santan1Num = int.Parse(tripleBefor[1].Value);
                payback.Santan2Num = int.Parse(tripleCenter[1].Value);
                payback.Santan3Num = int.Parse(tripleAfter[1].Value);
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
            context.PayBack.Add(payback);
            return payback;
        }
        #endregion

        #region レース結果を取得
        public static RaceResults CreateRaceResults(string html, List<HorseInfo> horses)
        {
            var regex = new RaceResultsCName();
            var matchDate = regex.date.Match(html);
            var matchHolding = regex.holding.Match(html);
            var matchPlace = regex.place.Match(html);
            var matchWaku = regex.waku.Match(html);
            var matchNum = regex.num.Match(html);
            var matchHorse = regex.horse.Match(html);
            var matchWeight = regex.weight.Match(html);
            var matchJockey = regex.jockey.Match(html);
            var matchTime = regex.time.Match(html);
            var matchArrivalDifference = regex.arrivalDifference.Match(html);
            var matchCorner = regex.corner.Matches(html);
            var matchHalongtime = regex.halongTime.Match(html);
            var matchHorseweight = regex.horseWeight.Match(html);
            var matchTrainer = regex.trainer.Match(html);
            var matchPop = regex.pop.Match(html);

            var raceNameRegex = new RaceInfoCname();
            var matchRaceName = raceNameRegex.raceName.Match(html);

            var corner = "";
            foreach (Match match in matchCorner)
            {
                var ulul = match.Groups["corner"].Value;
                corner = string.Join(",",
                Regex.Matches(ulul, "順位\\\">(?<number>.*?)\\</li\\>", RegexOptions.Singleline)
                    .Cast<Match>()
                    .Select(match => match.Groups["number"].Value));
            }
            var raceResults = new RaceResults()
            {
                Date = DateTime.ParseExact(matchDate.Value, "yyyy年M月d日", CultureInfo.InvariantCulture),
                Holding = matchHolding.Value,
                RaceName = matchRaceName.Value,
                Place = matchPlace.Value,
                Waku = int.Parse(matchWaku.Value),
                Num = int.Parse(matchNum.Value),
                Weight = matchWeight.Value,
                Jockey = matchJockey.Value,
                Time = matchTime.Value,
                ArrivalDifference = matchArrivalDifference.Value,
                Corner = corner,
                HalongTime = matchHalongtime.Value,
                HorseWeight = matchHorseweight.Value,
                Trainer = matchTrainer.Value,
                Pop = int.Parse(matchPop.Value)
            };

            context.RaceResults.Add(raceResults);
            return raceResults;
        }
        #endregion

    #region Cnameの算出
        static string FetchRaceResultPage(DateTime month)
        {
            var cName = new AccessSCodeMonthlyConvertor().ConvertTo(month);
            return new Downloder().GetRaceResults(cName);
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

        private int YearAndMonth(int year, int month)
        {
            return year * 100 + month;
        }
    }
    #endregion
}