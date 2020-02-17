using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace jrascraping.Regexs
{
    public class RaceResultsCname
    {
        public Regex date = new Regex(
            "(?<date>((?<= <span class=\\\"opt\\\">).*?(?=[1-9]回)))",
            RegexOptions.Compiled | RegexOptions.IgnoreCase | RegexOptions.Multiline);

        public Regex numberoftime = new Regex(
            "(?<numberoftime>((?<=曜）).*?(?=</span>)))",
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
            "(?<horse>((?<=\\('/JRADB/accessU.html','pw.{20,20}'\\);\\\">).*?(?=</a>)))",
            RegexOptions.Compiled | RegexOptions.IgnoreCase | RegexOptions.Multiline);

        public Regex weight = new Regex(
            "(?<weight>((?<=<td class=\\\"weight\\\">).*?(?=</td>)))",
            RegexOptions.Compiled | RegexOptions.IgnoreCase | RegexOptions.Multiline);

        public Regex jockey = new Regex(
            "(?<jockey>((?<=\\('/JRADB/accessK.html','pw.{14,14}'\\);\\\">).*?(?=</a>)))",
            RegexOptions.Compiled | RegexOptions.IgnoreCase | RegexOptions.Multiline);

        public Regex time = new Regex(
            "(?<time>((?<=<td class=\\\"time\\\">).*?(?=</td>)))",
            RegexOptions.Compiled | RegexOptions.IgnoreCase | RegexOptions.Multiline);

        public Regex arrivaldifference = new Regex(
            "(?<arrivaldifference>((?<=<td class=\\\"margin\\\">).*?(?=</td>)))",
            RegexOptions.Compiled | RegexOptions.IgnoreCase | RegexOptions.Multiline);
        //まだ
        public Regex corner = new Regex(
            "(?<corner>((?<=\\('/JRADB/accessU.html','pw.{20,20}'\\);\\\">).*?(?=</a>)))",
            RegexOptions.Compiled | RegexOptions.IgnoreCase | RegexOptions.Multiline);

        public Regex halongtime = new Regex(
            "(?<halongtime>((?<=<td class=\\\"f_time\\\">).*?(?=</td>)))",
            RegexOptions.Compiled | RegexOptions.IgnoreCase | RegexOptions.Multiline);
        //HorseInfoCnameの調教師の取り方を参考に
        public Regex horseweight = new Regex(
            "(?<horseweight>((?<=<td class=\\\"h_weight\\\">\n\n\\\\s+).*?(?=</span>)))",
            RegexOptions.Compiled | RegexOptions.IgnoreCase | RegexOptions.Multiline);

        public Regex trainer = new Regex(
            "(?<trainer>((?<=\\('/JRADB/accessC.html','pw.{14,14}'\\);\\\">).*?(?=</a>)))",
            RegexOptions.Compiled | RegexOptions.IgnoreCase | RegexOptions.Multiline);

        public Regex pop = new Regex(
            "(?<pop>((?<=<td class=\\\"pop\\\">).*?(?=</td>)))",
            RegexOptions.Compiled | RegexOptions.IgnoreCase | RegexOptions.Multiline);
    }
}