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
            "(?<=<div class=\\\"num\\\">).{1,2}(?=</div>)",
            RegexOptions.Compiled | RegexOptions.IgnoreCase | RegexOptions.Multiline);

        // todo: 
        //１．<div class="num">9</div>　を取得。1頭・2頭・3頭。既存のURLを取得でOKそう
        //２．
        
        public Regex wideBefore = new Regex(
            "(?<=<div class=\\\"num\\\">).{1,2}(?=-\\d{1,2}</div>)",
            RegexOptions.Compiled | RegexOptions.IgnoreCase | RegexOptions.Multiline);
        
        public Regex wideAfter = new Regex(
            "(?<=<div class=\\\"num\\\">\\d{1,2}-)\\d{1,2}(?=</div>)",
            RegexOptions.Compiled | RegexOptions.IgnoreCase | RegexOptions.Multiline);
        
        public Regex tripleBefor = new Regex(
            "(?<=<div class=\\\"num\\\">).*?(?=-\\d{1,2}-\\d{1,2}</div>)",
            RegexOptions.Compiled | RegexOptions.IgnoreCase | RegexOptions.Multiline);

        public Regex tripleCenter = new Regex(
            "(?<=<div class=\\\"num\\\">\\d{1,2}-).*?(?=-\\d{1,2}</div>)",
            RegexOptions.Compiled | RegexOptions.IgnoreCase | RegexOptions.Multiline);

        public Regex tripleAfter = new Regex(
            "(?<=<div class=\\\"num\\\">\\d{1,2}-\\d{1,2}-).*?(?=</div>)",
            RegexOptions.Compiled | RegexOptions.IgnoreCase | RegexOptions.Multiline); 

        public Regex refund = new Regex(
            "(?<=<div class=\\\"yen\\\">).*?(?=<span class=\\\"unit\\\">円)",
            RegexOptions.Compiled | RegexOptions.IgnoreCase | RegexOptions.Multiline);
    }
}
