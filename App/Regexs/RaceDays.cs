using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace jrascraping.Regexs
{
    /// <summary>
    /// レース結果をFromToで取得するための正規表現
    /// </summary>
    public class RaceDays
    {
        public Regex year = new Regex(
            "(?<year>((?<=<div class=\\\"current\\\"><span>).*?(?=年)))",
            RegexOptions.Compiled | RegexOptions.IgnoreCase | RegexOptions.Multiline);

        public Regex month = new Regex(
            "(?<month>((?<=<div class=\\\"current\\\"><span>.{4,4}年).*?(?=月)))",
            RegexOptions.Compiled | RegexOptions.IgnoreCase | RegexOptions.Multiline);

        public Regex day = new Regex(
            "(?<day>((?<=<h3 class=\\\"sub_header\\\">.{1,2}月).*?(?=日)))",
            RegexOptions.Compiled | RegexOptions.IgnoreCase | RegexOptions.Multiline);


    }
}
