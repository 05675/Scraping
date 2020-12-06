using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace jrascraping.Regexs
{
    public class HorseInfoCname
    {
        public Regex horseNames = new Regex(
            "(?<horsenames>(?<=<span class=\\\"opt\\\">競走馬情報</span>).*?(?=<span class=\\\"name_en\\\">))",
            RegexOptions.Compiled | RegexOptions.IgnoreCase | RegexOptions.Singleline);
     
        // todo:修正
        public Regex father = new Regex(
            //"corner_list\\\"\\>(?<corner>.*?)\\</div\\>",
            "(?<father>(?<=<dt>父</dt>\n.{26,26}).*?(?=</dd>))",
            RegexOptions.Compiled | RegexOptions.IgnoreCase | RegexOptions.Singleline);
        
        public Regex mother = new Regex(
            "(?<mother>(?<=<a href=\\\"#\\\" onclick=\\\"return doAction\\(\\'\\/JRADB\\/accessU.html\\', \\'pj.{23,23}).*?(?=</a>))",
            RegexOptions.Compiled | RegexOptions.IgnoreCase | RegexOptions.Multiline);

        public Regex motherFather = new Regex(
            "(?<motherfather>(?<=母の父</td>\n<td bgcolor=\\\"#F5F5EA\\\">).*?(?=</td>\n))",
            RegexOptions.Compiled | RegexOptions.IgnoreCase | RegexOptions.Multiline);

        public Regex motherMother = new Regex(
            "(?<mothermother>(?<=母の母</td>\n<td bgcolor=\\\"#F5F5EA\\\">).*?(?=</td>\n))",
            RegexOptions.Compiled | RegexOptions.IgnoreCase | RegexOptions.Multiline);

        public Regex sex = new Regex(
            "(?<sex>(?<=性別</td>\n<td nowrap bgcolor=\\\"#F5F5EA\\\">).*?(?=</td>))",
            RegexOptions.Compiled | RegexOptions.IgnoreCase | RegexOptions.Multiline);

        public Regex birthday = new Regex(
            "(?<birthday>(?<=生年月日</td>\n<td nowrap bgcolor=\\\"#F5F5EA\\\">\n\n).*?(?=\n\n</td>))",
            RegexOptions.Compiled | RegexOptions.IgnoreCase | RegexOptions.Multiline);

        public Regex coatColor = new Regex(
            "(?<coatcolor>(?<=毛色</td>\n<td nowrap bgcolor=\\\"#F5F5EA\\\">).*?(?=</td>))",
            RegexOptions.Compiled | RegexOptions.IgnoreCase | RegexOptions.Multiline);

        public Regex horseNameMeaning = new Regex(
            "(?<horsenamemeaning>(?<=馬名意味</td>\n<td colspan=\\\"5\\\" width=\\\"410\\\" bgcolor=\\\"#F5F5EA\\\">).*?(?=</td>))",
            RegexOptions.Compiled | RegexOptions.IgnoreCase | RegexOptions.Multiline);

        public Regex horseOwner = new Regex(
            "(?<horseowner>(?<=馬主</td>\n<td width=\\\"250\\\" nowrap bgcolor=\\\"#F5F5EA\\\">).*?(?=</td>))",
            RegexOptions.Compiled | RegexOptions.IgnoreCase | RegexOptions.Multiline);

        public Regex trainer = new Regex(
            "(?<trainer>(?<=JRADB/accessC.html\\',\\'pw..............\\'\\);\\\">).*?(?=</td>))",
            RegexOptions.Compiled | RegexOptions.IgnoreCase | RegexOptions.Multiline);

        public Regex productionRanch = new Regex(
            "(?<productionranch>(?<=生産牧場</td>\n<td width=\\\"250\\\" nowrap bgcolor=\\\"#F5F5EA\\\">).*?(?=</td>))",
            RegexOptions.Compiled | RegexOptions.IgnoreCase | RegexOptions.Multiline);

        public Regex origin = new Regex(
            "(?<origin>(?<=>産地</td>\n<td width=\\\"250\\\" nowrap bgcolor=\\\"#F5F5EA\\\">).*?(?=</td>))",
            RegexOptions.Compiled | RegexOptions.IgnoreCase | RegexOptions.Multiline);
    }
}
