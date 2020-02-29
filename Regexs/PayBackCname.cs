using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace jrascraping.Regexs
{
    public class PayBackCname
    {
        public Regex horsename = new Regex(
            "(?<=^[ \t]*<span class=\\\"num\\\">)\\d{1,2}(?=</span>\n)",
            RegexOptions.Compiled | RegexOptions.IgnoreCase | RegexOptions.Multiline);
     
        public Regex win = new Regex(
            "(?<=^[ \t]*<span class=\\\"num\\\">)\\d{1,2}(?=</span>\r\n)",
            RegexOptions.Compiled | RegexOptions.IgnoreCase | RegexOptions.Multiline);
        
        public Regex widebefore = new Regex(
            "(?<=\\^\\[ \t\\]*<span class=\\\"num\\\">).*?(?=-\\\\d{1,2}</span>)",
            RegexOptions.Compiled | RegexOptions.IgnoreCase | RegexOptions.Multiline);
        
        public Regex wideafter = new Regex(
            "(?<=\\^\\[ \t\\]*<span class=\\\"num\\\">\\\\d{1,2}-).*?(?=</span>)",
            RegexOptions.Compiled | RegexOptions.IgnoreCase | RegexOptions.Multiline);
        
        public Regex triplebefor = new Regex(
            "(?<=\\^\\[ \t\\]*<span class=\\\"num\\\">).*?(?=-\\\\d{1,2}-\\\\d{1,2}</span>)",
            RegexOptions.Compiled | RegexOptions.IgnoreCase | RegexOptions.Multiline);

        public Regex triplecenter = new Regex(
            "(?<=\\^\\[ \t\\]*<span class=\\\"num\\\">\\\\d{1,2}-).*?(?=-\\\\d{1,2}</span>)",
            RegexOptions.Compiled | RegexOptions.IgnoreCase | RegexOptions.Multiline);

        public Regex tripleafter = new Regex(
            "(?<=\\^\\[ \t\\]*<span class=\\\"num\\\">\\\\d{1,2}-\\\\d{1,2}-).*?(?=</span>)",
            RegexOptions.Compiled | RegexOptions.IgnoreCase | RegexOptions.Multiline); 

        public Regex refund = new Regex(
            "(?<=\\^\\[ \t\\]*<span class=\\\"yen\\\">).*?(?=<span class=\\\"unit\\\">円)",
            RegexOptions.Compiled | RegexOptions.IgnoreCase | RegexOptions.Multiline);
    }
}
