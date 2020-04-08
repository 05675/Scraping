using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace jrascraping.Regexs
{
    public class RaceInfoCname
    {
        public Regex countOfDay = new Regex(
            "(?<=<div class=\\\"cell date\\\">\n\\\\s{27,}).*?(?=（)",
            RegexOptions.Compiled | RegexOptions.IgnoreCase | RegexOptions.Multiline);

        public Regex raceName = new Regex(
            "(?<=<span class=\\\"race_name\\\">\n\\\\s{32}).*?(?=<span class=\\\"grade_icon lg\\\">)",
            RegexOptions.Compiled | RegexOptions.IgnoreCase | RegexOptions.Multiline);

        public Regex shippingTime = new Regex(
            "(?<=発走時刻：<strong>).*?(?=</strong></div>)",
            RegexOptions.Compiled | RegexOptions.IgnoreCase | RegexOptions.Multiline);

        public Regex weather = new Regex(
            "(?<=天候</span><span class=\\\"txt\\\">).*?(?=</span></span></li>)",
            RegexOptions.Compiled | RegexOptions.IgnoreCase | RegexOptions.Multiline);

        public Regex baba = new Regex(
            "(?<=<span class=\\\"inner\\\">\n\\\\s{32}<span class=\\\"cap\\\">).*?(?=</span>)",
            RegexOptions.Compiled | RegexOptions.IgnoreCase | RegexOptions.Multiline);

        public Regex babaState = new Regex(
            "(?<=</span>\n\\\\s{32}<span class=\\\"txt\\\">).*?(?=</span>)",
            RegexOptions.Compiled | RegexOptions.IgnoreCase | RegexOptions.Multiline);

        public Regex old = new Regex(
            "(?<=<div class=\\\"cell category\\\">).*?(?=</div>)",
            RegexOptions.Compiled | RegexOptions.IgnoreCase | RegexOptions.Multiline);

        public Regex classes = new Regex(
            "div class=\\\"type\\\"\\>(?<classes>.*?)\\<div class=\\\"cell course\\\"\\>",
            RegexOptions.Compiled | RegexOptions.IgnoreCase | RegexOptions.Singleline);

        public Regex distance = new Regex(
            "(?<=<div class=\\\"cell course\\\"><span class=\\\"cap\\\">コース：</span>).*?(?=<span class=\\\"unit\\\">)",
            RegexOptions.Compiled | RegexOptions.IgnoreCase | RegexOptions.Multiline);

        public Regex around = new Regex(
            "(?<=</span><span class=\\\"detail\\\">（).*?(?=）</span></div>)",
            RegexOptions.Compiled | RegexOptions.IgnoreCase | RegexOptions.Multiline);
    }
}
