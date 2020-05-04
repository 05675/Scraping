using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace jrascraping.Regexs
{
    public class PayBackCname
    {
        public Regex horseName = new Regex(
            "(?<=^[ \t]*<span class=\\\"num\\\">)\\d{1,2}(?=</span>\n)",
            RegexOptions.Compiled | RegexOptions.IgnoreCase | RegexOptions.Multiline);
     
        public Regex win = new Regex(
            "(?<=^[ \t]*<span class=\\\"num\\\">)\\d{1,2}(?=</span>\r\n)",
            RegexOptions.Compiled | RegexOptions.IgnoreCase | RegexOptions.Multiline);
        
        public Regex wideBefore = new Regex(
            "(?<=^[ \t]*<span class=\\\"num\\\">)\\d{1,2}(?=-\\d{1,2}</span>)",
            RegexOptions.Compiled | RegexOptions.IgnoreCase | RegexOptions.Multiline);
        
        public Regex wideAfter = new Regex(
            "(?<=^[ \t]*<span class=\\\"num\\\">\\d{1,2}-)\\d{1,2}(?=</span>)",
            RegexOptions.Compiled | RegexOptions.IgnoreCase | RegexOptions.Multiline);
        
        public Regex tripleBefor = new Regex(
            "(?<=^[ \t]*<span class=\\\"num\\\">).*?(?=-\\d{1,2}-\\d{1,2}</span>)",
            RegexOptions.Compiled | RegexOptions.IgnoreCase | RegexOptions.Multiline);

        public Regex tripleCenter = new Regex(
            "(?<=^[ \t]*<span class=\\\"num\\\">\\d{1,2}-).*?(?=-\\d{1,2}</span>)",
            RegexOptions.Compiled | RegexOptions.IgnoreCase | RegexOptions.Multiline);

        public Regex tripleAfter = new Regex(
            "(?<=^[ \t]*<span class=\\\"num\\\">\\d{1,2}-\\d{1,2}-).*?(?=</span>)",
            RegexOptions.Compiled | RegexOptions.IgnoreCase | RegexOptions.Multiline); 

        public Regex refund = new Regex(
            "(?<=^[ \t]*<span class=\\\"yen\\\">).*?(?=<span class=\\\"unit\\\">円)",
            RegexOptions.Compiled | RegexOptions.IgnoreCase | RegexOptions.Multiline);
    }
}
