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
            "(?<=） ).*?(?=\n)",
            RegexOptions.Compiled | RegexOptions.IgnoreCase | RegexOptions.Multiline);

        public Regex raceName = new Regex(
            "(?<=<span class=\\\"race_name\\\">\n.{32}).*?(?=<|\n)",
            RegexOptions.Compiled | RegexOptions.IgnoreCase | RegexOptions.Multiline);

        public Regex date = new Regex(
            "(?<=<div class=\\\"cell date\\\">\n.{27,}).*?(?=（)",
            RegexOptions.Compiled | RegexOptions.IgnoreCase | RegexOptions.Multiline);

        public Regex shippingTime = new Regex(
            "(?<=発走時刻：<strong>).*?(?=</strong></div>)",
            RegexOptions.Compiled | RegexOptions.IgnoreCase | RegexOptions.Multiline);

        public Regex weather = new Regex(
            "(?<=天候</span><span class=\\\"txt\\\">).*?(?=</span></span></li>)",
            RegexOptions.Compiled | RegexOptions.IgnoreCase | RegexOptions.Multiline);

        public Regex baba = new Regex(
            "(?<=<span class=\\\"inner\\\">\n.{32}<span class=\\\"cap\\\">).*?(?=</span>)",
            RegexOptions.Compiled | RegexOptions.IgnoreCase | RegexOptions.Multiline);

        public Regex babaState = new Regex(
            "(?<=</span>\n.{32}<span class=\\\"txt\\\">).*?(?=</span>)",
            RegexOptions.Compiled | RegexOptions.IgnoreCase | RegexOptions.Multiline);

        public Regex old = new Regex(
            "(?<=<div class=\\\"cell category\\\">).*?(?=</div>)",
            RegexOptions.Compiled | RegexOptions.IgnoreCase | RegexOptions.Multiline);

        public Regex oldClass = new Regex(
            "div class=\\\"type\\\"\\>(?<OldClass>.*?)\\<div class=\\\"cell course\\\"\\>",
            RegexOptions.Compiled | RegexOptions.IgnoreCase | RegexOptions.Singleline);

        public Regex distance = new Regex(
            "(?<=<div class=\\\"cell course\\\"><span class=\\\"cap\\\">コース：</span>).*?(?=<span class=\\\"unit\\\">)",
            RegexOptions.Compiled | RegexOptions.IgnoreCase | RegexOptions.Multiline);

        public Regex around = new Regex(
            "(?<=</span><span class=\\\"detail\\\">（).*?(?=）</span></div>)",
            RegexOptions.Compiled | RegexOptions.IgnoreCase | RegexOptions.Multiline);
    }
}
