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
    public class RaceInfoQuery
    {
        private static JraDbContext context;
        private static void DbContext()
        {
            //初期化
            var options = new DbContextOptionsBuilder<JraDbContext>();
            options.UseSqlite("Data Source=Jra.db");
            context = new JraDbContext(options.Options);
        }
        public RaceInfo AddRaceInfo(string html, List<HorseInfo> horses)
        {
            DbContext();

            try
            {
                var regex = new RaceInfoCname();
                var matchHolding = regex.holding.Match(html);
                var matchRaceName = regex.raceName.Match(html);
                var matchShippingTime = regex.shippingTime.Match(html);

                // Dateに時刻を加え、PKが重複しないようにする
                var shippingTime = DateTime.Parse(matchShippingTime.Value).TimeOfDay;
                var matchDate = regex.date.Match(html);
                var date = DateTime.ParseExact(matchDate.Value, "yyyy年M月d日", CultureInfo.InvariantCulture) + shippingTime;
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

                var raceDuplicateCheck = context.RaceInfo.SingleOrDefault(c => c.Date == date && c.ShippingTime == matchShippingTime.Value);

                if (raceDuplicateCheck != null) return null;
                {
                    var raceInfo = new RaceInfo()
                    {
                        Holding = matchHolding.Value,
                        RaceName = matchRaceName.Value,
                        Date = date,
                        ShippingTime = matchShippingTime.Value,
                        Weather = matchWeather.Value,
                        Baba = matchBaba.Value,
                        BabaState = matchBabaState.Value,
                        OldClass = oldClass,
                        Distance = matchDistance.Value,
                        Around = matchAround.Value,
                    };
                    Debug.WriteLine($"Insert実行：{raceInfo.RaceName}");
                    context.Add(raceInfo);
                    context.SaveChanges();

                    // raceInfoが無ければ、PayBackはaddしない
                    var payBacks = new PayBackQuery().AddPayBack(html);

                    return raceInfo;
                }
            }
            catch (Exception ex)
            {
                Debug.WriteLine(ex);
                throw;
            }
        }

        public List<string> RaceDaysCNames(string html, DateTime inputFrom, DateTime inputTo)
        {
            var table = new List<string>();
            var regex = new MainCName();
            var matches = regex.holding.Matches(html);
            List<string> days = Days(html, inputFrom, inputTo);

            foreach (Match match in matches)
            {
                foreach (var d in days)
                {
                    if (match.ToString().Contains(d))
                    {
                        table.Add(match.Groups["CountOfDayCname"].Value);
                    }
                }
            }
            return table;
        }

        /// <summary>
        /// レース結果の年月日を取得
        /// </summary>
        public List<string> Days(string html, DateTime inputFrom, DateTime inputTo)
        {
            var from = inputFrom.ToString("yyyyMMdd");
            var to = inputTo.ToString("yyyyMMdd");

            var table = new List<string>();
            var regex = new RaceDays();
            var searchYear = regex.year.Match(html).ToString();
            var searchMonth = regex.month.Match(html).Value.PadLeft(2, '0');
            var matches =regex.day.Matches(html);

            foreach (Match match in matches)
            {
                var day = searchYear + searchMonth + match.Groups["day"].Value.PadLeft(2, '0');
                if (int.Parse(from) <= int.Parse(day) && int.Parse(to) >= int.Parse(day))
                {
                    table.Add(day + "/");
                }
            }
            return table;
        }
    }
}
