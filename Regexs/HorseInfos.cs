using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace jrascraping.Regexs
{
    public class HorseInfos
    {
        public Regex horsenames = new Regex(
            "(?<horsenames>(?<=<span style=\\\"padding-left: 1px;\\\">).*?(?=</span>))",
            RegexOptions.Compiled | RegexOptions.IgnoreCase | RegexOptions.Multiline);
    }
}
