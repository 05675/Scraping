using jrascraping.GetJra;
using jrascraping.Models;
using jrascraping.Regexs;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Globalization;
using System.Linq;
using System.Text.RegularExpressions;

namespace jrascraping.Query
{
    public class RaceResultQuery
    {
        private static JraDbContext context;
        private static void DbContext()
        {
            //初期化
            var options = new DbContextOptionsBuilder<JraDbContext>();
            options.UseSqlite("Data Source=Jra.db");
            context = new JraDbContext(options.Options);
        }

        /// <summary>
        /// レース結果のInsert
        /// </summary>
        public List<RaceResult> AddRaceResults(string otherRace)
        {
            DbContext();
            var raceCName = ParseRaceResultCNames(otherRace).Distinct();
            var raceResult = new List<RaceResult>();
            foreach (var raceResults in raceCName)
            {
                var getResultsHtml = new Downloder().GetRaceResultsHtml(raceResults);

                // 1着～最下位のHTMLを取得
                var raceResultsHtml = Regex.Match(getResultsHtml, @"<tbody>.*?</tbody>", RegexOptions.Singleline);
                MatchCollection raceResultHtml = Regex.Matches(raceResultsHtml.Value, @"<tr>.*?</tr>", RegexOptions.Singleline);
                var result = Regex.Matches(raceResultsHtml.Value, @"<tr>.*?</tr>", RegexOptions.Singleline)
                    .Cast<Match>()
                    .Select(result => CreateRaceResults(result.Value, getResultsHtml))
                    .ToList();

                // すでにレース結果が存在しているかチェック
                for (var i = 0; i < result.Count; i++)
                {
                    var raceCheck = context.RaceResults.SingleOrDefault(c =>
                        c.Date == result[i].Date &&
                        c.Num == result[i].Num &&
                        c.RaceName == result[i].RaceName &&
                        c.Place == result[i].Place
                    );

                    if (raceCheck == null) 
                    {
                        Debug.WriteLine($"Insert実行{result[i].RaceName}:{result[i].Date}");
                        context.RaceResults.Add(result[i]);
                    }
                    else
                    {
                        Debug.WriteLine($"既に存在：{result[i].RaceName}：{result[i].Horse}");
                    }
                    raceResult.Add(result[i]);
                }
            }
            context.SaveChanges();
            return raceResult;
        }

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
                        .Select(match => match.Groups["number"].Value))
                        .Replace("&nbsp;", "");
                }

                // 人気順位のNullチェック。競争除外はNullになるため、変数に100をセット。int.Parseの例外を回避する
                int pop = string.IsNullOrEmpty(matchPop.Value) ? 100 : int.Parse(matchPop.Value);

                var raceResults = new RaceResult()
                {
                    Date = DateTime.ParseExact(matchDate.Value, "yyyy年M月d日", CultureInfo.InvariantCulture) + shippingTime,
                    ShippingTime = matchShippingTime.Value,
                    Holding = matchHolding.Value,
                    RaceName = matchRaceName.Value,
                    Place = matchPlace.Value,
                    Waku = int.Parse(matchWaku.Value),
                    // Horseはシャドウプロパティ？らしい
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
    }
}
