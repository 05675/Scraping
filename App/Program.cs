using jrascraping.GetJra;
using jrascraping.Models;
using jrascraping.Query;
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

            // 期間を指定：現状は月単位で取得
            DateTime target = new DateTime(2020, 10, 1);    //From
            while (target >= new DateTime(2020, 10, 30))     //To
            {
                var html = new AccessSCodeMonthlyConvertor().FetchRaceResultPage(target);
                var insert = new Insert();
                List<string> raceDays = RaceDaysCNames(html);

                //Cname：1回東京1日目などを取得
                foreach (var cname in raceDays)
                {
                    string otherRaceHtml = new Downloder().GetRaceResults(cname);
                    var raceResultCNames = new Jra().ParseRaceResultCNames(otherRaceHtml);

                    //Cname：1R～12Rまで取得
                    foreach (var resultCName in raceResultCNames)
                    {

                        //if()    //raceInfoがすでにあれば、PAYBACKは不要の条件を入れる。
                        //{
                        //  cotinue;
                        //}
                        string otherRace = new Downloder().GetRaceResults(resultCName);
                        var horses = new Insert().InsertHorseInfo(otherRace);
                        var raceResults = insert.InsertRaceResults(otherRace);
                        var payBacks = CreatePayBack(otherRace);
                        var raceInfo = CreateRaceInfo(otherRace, horses);

                        // 2020/03/21 レース結果を完成させてからコメントアウトを外す
                        // otherRaceからRaceInfoを作る
                        // otherRaceからRaceResultを作る(複数)
                    }
                    context.SaveChanges();
                }
                target = target.AddMonths(-1);
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

        public List<string> ParseRaceResultCNames(string html)
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

        public List<string> ParseHorseCNames(string html)
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
        public static RaceInfo CreateRaceInfo(string html, List<HorseInfo> horses)
        {
            try
            {
                var regex = new RaceInfoCname();
                var matchHolding = regex.holding.Match(html);
                var matchRaceName = regex.raceName.Match(html);
                var matchDate = regex.date.Match(html);
                var matchShippingTime = regex.shippingTime.Match(html);

                // Dateに時刻を加え、PKが重複しないようにする
                var shippingTime = DateTime.Parse(matchShippingTime.Value).TimeOfDay;
                var matchWeather = regex.weather.Match(html);
                var matchBaba = regex.baba.Match(html);
                var matchBabaState = regex.babaState.Match(html);
                var matchDistance = regex.distance.Match(html);
                var matchAround = regex.around.Match(html);

                // レースの出走条件
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
                    Date = DateTime.ParseExact(matchDate.Value, "yyyy年M月d日", CultureInfo.InvariantCulture) + shippingTime,
                    ShippingTime = matchShippingTime.Value,
                    Weather = matchWeather.Value,
                    Baba = matchBaba.Value,
                    BabaState = matchBabaState.Value,
                    OldClass = oldClass,
                    Distance = matchDistance.Value,
                    Around = matchAround.Value,
                };
                return raceInfo;
            }
            catch (Exception ex)
            {
                Debug.WriteLine(ex);
                throw;
            }
        }
        #region 払い戻しを取得
        public static PayBack CreatePayBack(string html)
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

        public RaceResult CreateRaceResults(string html, string dateHtml)
        {
            try
            {
                var regex = new RaceResultsCName();
                var matchDate = regex.date.Match(dateHtml);
                var matchShippingTime = regex.shippingTime.Match(dateHtml);
                var matchHolding = regex.holding.Match(dateHtml);

                // Dateに時刻を加え、PKが重複しないようにする
                var shippingTime = DateTime.Parse(matchShippingTime.Value).TimeOfDay;
                var matchPlace = regex.place.Match(html);
                var matchWaku = regex.waku.Match(html);
                var matchNum = regex.num.Match(html);
                var matchHorse = regex.horse.Match(html);
                var matchWeight = regex.weight.Match(html);
                var matchJockey = Regex.Replace(regex.jockey.Match(html).Value, @"<.*?>", "");
                var matchTime = regex.time.Match(html);
                var matchArrivalDifference = regex.arrivalDifference.Match(html);
                var matchCorner = regex.corner.Matches(html);
                var matchHalongTime = regex.halongTime.Match(html); 
                var matchHorseWeight = regex.horseWeight.Match(html).Value.Replace("<span>", "");
                var matchTrainer = regex.trainer.Match(html);
                var matchPop = regex.pop.Match(html);

                var raceNameRegex = new RaceInfoCname();
                var matchRaceName = raceNameRegex.raceName.Match(dateHtml);

                var corner = "";
                foreach (Match match in matchCorner)
                {
                    var ulul = match.Groups["corner"].Value;
                    corner = string.Join(",",
                    Regex.Matches(ulul, "順位\\\">(?<number>.*?)\\</li\\>", RegexOptions.Singleline)
                        .Cast<Match>()
                        .Select(match => match.Groups["number"].Value));
                }

                // 人気順位のNullチェック。競争除外はNullになるため、変数に100をセット。int.Parseの例外を回避する
                int pop;
                if (string.IsNullOrEmpty(matchPop.Value))
                {
                    pop = 100;
                }
                else
                {
                    pop = int.Parse(matchPop.Value);
                }

                var raceResults = new RaceResult()
                {
                    Date = DateTime.ParseExact(matchDate.Value, "yyyy年M月d日", CultureInfo.InvariantCulture) + shippingTime,
                    ShippingTime = matchShippingTime.Value,
                    Holding = matchHolding.Value,
                    RaceName = matchRaceName.Value,
                    Place = matchPlace.Value,
                    Waku = int.Parse(matchWaku.Value),
                    Num = int.Parse(matchNum.Value),
                    Weight = matchWeight.Value,
                    Jockey = matchJockey,
                    Time = matchTime.Value,
                    ArrivalDifference = matchArrivalDifference.Value,
                    Corner = corner,
                    HalongTime = matchHalongTime.Value,
                    HorseWeight = matchHorseWeight,
                    Trainer = matchTrainer.Value,
                    Pop = pop
                };
                return raceResults;
            }

            catch (Exception ex)
            {
                Debug.WriteLine(ex);
                throw;
            }
        }
        
    }
}