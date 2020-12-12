using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace jrascraping.Regexs
{
    public class RaceInfoCname
    {
        public Regex holding = new Regex(
            "(?<=<div class=\\\"cell date\\\">20.{13,13}).*?(?=</div>)",
            RegexOptions.Compiled | RegexOptions.IgnoreCase | RegexOptions.Multiline);

        public Regex raceName = new Regex(
            "(?<=<span class=\\\"race_name\\\">).*?(?=<)",
            RegexOptions.Compiled | RegexOptions.IgnoreCase | RegexOptions.Multiline);

        public Regex date = new Regex(
            "(?<=<div class=\\\"cell date\\\">).*?(?=（)",
            RegexOptions.Compiled | RegexOptions.IgnoreCase | RegexOptions.Multiline);

        public Regex shippingTime = new Regex(
            "(?<=発走時刻：<strong>).*?(?=</strong>)",
            RegexOptions.Compiled | RegexOptions.IgnoreCase | RegexOptions.Multiline);

        public Regex weather = new Regex(
            "(?<=天候</span><span class=\\\"txt\\\">).*?(?=</span></span></li>)",
            RegexOptions.Compiled | RegexOptions.IgnoreCase | RegexOptions.Multiline);

        public Regex baba = new Regex(
            "(?<=</span></span></li><li class=\\\".{4,4}\\\"><span class=\\\"inner\\\"><span class=\\\"cap\\\">).*?(?=</span><span class=\\\"txt\\\">)",
            RegexOptions.Compiled | RegexOptions.IgnoreCase | RegexOptions.Multiline);

        public Regex babaState = new Regex(
            "(?<=<li class=\\\".{4,4}\\\"><span class=\\\"inner\\\"><span class=\\\"cap\\\">.{1,3}</span><span class=\\\"txt\\\">).*?(?=</span></span></li></ul>)",
            RegexOptions.Compiled | RegexOptions.IgnoreCase | RegexOptions.Multiline);

        public Regex old = new Regex(
            "(?<=<div class=\\\"cell category\\\">).*?(?=</div>)",
            RegexOptions.Compiled | RegexOptions.IgnoreCase | RegexOptions.Multiline);

        public Regex oldClass = new Regex(
            "div class=\\\"type\\\"\\>(?<OldClass>.*?)\\<div class=\\\"cell course\\\"\\>",
            RegexOptions.Compiled | RegexOptions.IgnoreCase | RegexOptions.Singleline);

        public Regex distance = new Regex(
            "(?<=<span class=\\\"cap\\\">コース：</span>).*?(?=<span class=\\\"unit\\\">)",
            RegexOptions.Compiled | RegexOptions.IgnoreCase | RegexOptions.Multiline);

        public Regex around = new Regex(
            "(?<=</span><span class=\\\"detail\\\">（).*?(?=）</span></div>)",
            RegexOptions.Compiled | RegexOptions.IgnoreCase | RegexOptions.Multiline);
    }
}
