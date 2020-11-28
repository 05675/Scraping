using jrascraping.Models;
using jrascraping.Regexs;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Globalization;
using System.Linq;
using System.Text.RegularExpressions;

namespace jrascraping.Query
{
    public class RaceInfoQuery
    {
        public RaceInfo InsertRaceInfo(string html, List<HorseInfo> horses)
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
        public List<string> RaceDaysCNames(string html)
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
    }
}
