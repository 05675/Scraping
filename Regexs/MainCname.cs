using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace jrascraping.Regexs
{
    public class MainCname
    {
        // 1回東京1日目のようなCnameを取得
        public Regex countofdaycname = new Regex(
            "(?<CountOfDayCname>pw.{28,28})\\'\\);\\\">",
            RegexOptions.Compiled | RegexOptions.IgnoreCase | RegexOptions.Multiline);

        //各レースのCnameを取得
        public Regex racenamecname = new Regex(
            "(?<RaceNameCname>pw01sde.{25,25})\\'\\);\\\">",
            RegexOptions.Compiled | RegexOptions.IgnoreCase | RegexOptions.Multiline);

        //馬名のCnameを取得
        public Regex horsename = new Regex(
            "(?<horsecname>pw01dud.{15,15})\\'\\);\\\">",
            RegexOptions.Compiled | RegexOptions.IgnoreCase | RegexOptions.Multiline);
    }
}
