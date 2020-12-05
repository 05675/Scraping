using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace jrascraping.Regexs
{
    public class RaceResultsCName
    {
        public Regex date = new Regex(
            "(?<date>((?<=<span class=\\\"opt\\\">).*?(?=（)))",
            RegexOptions.Compiled | RegexOptions.IgnoreCase | RegexOptions.Multiline);
        
        public Regex shippingTime = new Regex(
            "(?<shippingtime>((?<=発走時刻：<strong>).*?(?=</strong>)))",
            RegexOptions.Compiled | RegexOptions.IgnoreCase | RegexOptions.Multiline);

        public Regex holding = new Regex(
            "(?<holding>((?<=曜）).*?(?=</span>)))",
            RegexOptions.Compiled | RegexOptions.IgnoreCase | RegexOptions.Multiline);

        public Regex place = new Regex(
            "(?<place>((?<=<td class=\\\"place\\\">)).*?(?=</td>))",
            RegexOptions.Compiled | RegexOptions.IgnoreCase | RegexOptions.Multiline);

        public Regex waku = new Regex(
            "(?<waku>((?<=<td class=\\\"waku\\\"><img src=\\\"/JRADB/img/waku/).*?(?=.png\\\" alt=\\\")))",
            RegexOptions.Compiled | RegexOptions.IgnoreCase | RegexOptions.Multiline);

        public Regex num = new Regex(
            "(?<num>((?<=<td class=\\\"num\\\">).*?(?=</td>)))",
            RegexOptions.Compiled | RegexOptions.IgnoreCase | RegexOptions.Multiline);

        public Regex horse = new Regex(
            "(?<horse>((?<=\\('/JRADB/accessU.html', 'pw.{20,20}'\\);\\\">).*?(?=</a>)))",
            RegexOptions.Compiled | RegexOptions.IgnoreCase | RegexOptions.Multiline);

        public Regex weight = new Regex(
            "(?<weight>((?<=<td class=\\\"weight\\\">).*?(?=</td>)))",
            RegexOptions.Compiled | RegexOptions.IgnoreCase | RegexOptions.Multiline);

        public Regex jockey = new Regex(
            "(?<jockey>((?<=\\('/JRADB/accessK.html', 'pw.{14,14}'\\);\\\">).*?(?=</a>)))",
            RegexOptions.Compiled | RegexOptions.IgnoreCase | RegexOptions.Multiline);

        public Regex time = new Regex(
            "(?<time>((?<=<td class=\\\"time\\\">).*?(?=</td>)))",
            RegexOptions.Compiled | RegexOptions.IgnoreCase | RegexOptions.Multiline);

        public Regex arrivalDifference = new Regex(
            "(?<arrivaldifference>((?<=<td class=\\\"margin\\\">).*?(?=</td>)))",
            RegexOptions.Compiled | RegexOptions.IgnoreCase | RegexOptions.Multiline);
        
        public Regex corner = new Regex(
            "corner_list\\\"\\>(?<corner>.*?)\\</div\\>",
            RegexOptions.Compiled | RegexOptions.IgnoreCase | RegexOptions.Singleline);

        public Regex halongTime = new Regex(
            "(?<halongtime>((?<=<td class=\\\"f_time\\\">).*?(?=</td>)))",
            RegexOptions.Compiled | RegexOptions.IgnoreCase | RegexOptions.Multiline);
        
        public Regex horseWeight = new Regex(
            //"(?<horseweight>((?<=<td class=\\\"h_weight\\\">\n\n.{20,20}).*?(?=</span>)))",
            "(?<horseweight>((?<=<td class=\\\"h_weight\\\">).*?(?=</span>)))",
            RegexOptions.Compiled | RegexOptions.IgnoreCase | RegexOptions.Multiline);

        public Regex trainer = new Regex(
            "(?<trainer>((?<=\\('/JRADB/accessC.html', 'pw.{14,14}'\\);\\\">).*?(?=</a>)))",
            RegexOptions.Compiled | RegexOptions.IgnoreCase | RegexOptions.Multiline);

        public Regex pop = new Regex(
            "(?<pop>((?<=<td class=\\\"pop\\\">).*?(?=</td>)))",
            RegexOptions.Compiled | RegexOptions.IgnoreCase | RegexOptions.Multiline);
    }
}