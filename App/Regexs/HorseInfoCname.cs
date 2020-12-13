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
            "(?<horsenames>(?<=<span class=\\\"opt\\\">競走馬情報</span>.{0,84}).*?(?=<span class=\\\"name_en\\\">))",
            RegexOptions.Compiled | RegexOptions.IgnoreCase | RegexOptions.Singleline);
     
        public Regex father = new Regex(
            "(?<=<dt>父</dt>\r\n.{22,22}<dd>).*?(?=</dd>)",
            RegexOptions.Compiled | RegexOptions.IgnoreCase | RegexOptions.Singleline);

        public Regex mother = new Regex(
            "(?<=<a href=\\\"#\\\" onclick=\\\"return doAction\\(\\'\\/JRADB\\/accessU.html\\', \\'pj.{23,23}).*?(?=</a>)",
            RegexOptions.Compiled | RegexOptions.IgnoreCase | RegexOptions.Multiline);

        public Regex motherFather = new Regex(
            "(?<=<dt>母の父</dt>\r\n.{22,22}<dd>).*?(?=</dd>)",
            RegexOptions.Compiled | RegexOptions.IgnoreCase | RegexOptions.Singleline);

        public Regex motherMother = new Regex(
            "(?<=<dt>母の母</dt>\r\n.{22,22}<dd>).*?(?=</dd>)",
            RegexOptions.Compiled | RegexOptions.IgnoreCase | RegexOptions.Singleline);

        public Regex sex = new Regex(
            "(?<=<dt>性別</dt>\r\n.{22,22}<dd>).*?(?=</dd>)",
            RegexOptions.Compiled | RegexOptions.IgnoreCase | RegexOptions.Singleline);

        public Regex birthday = new Regex(
            "(?<=<dt>生年月日</dt>\r\n.{22,22}<dd>).*?(?=</dd>)",
            RegexOptions.Compiled | RegexOptions.IgnoreCase | RegexOptions.Singleline);

        public Regex coatColor = new Regex(
           "(?<=<dt>毛色</dt>\r\n.{22,22}<dd>).*?(?=</dd>)",
            RegexOptions.Compiled | RegexOptions.IgnoreCase | RegexOptions.Singleline);

        public Regex horseNameMeaning = new Regex(
            "(?<=<dt>馬名意味</dt>\r\n.{22,22}<dd>).*?(?=</dd>)",
            RegexOptions.Compiled | RegexOptions.IgnoreCase | RegexOptions.Singleline);

        public Regex horseOwner = new Regex(
            "(?<=<dt>馬主名</dt>\r\n.{22,22}<dd>).*?(?=</dd>)",
            RegexOptions.Compiled | RegexOptions.IgnoreCase | RegexOptions.Singleline);

        public Regex trainer = new Regex(
            "(?<=<a href=\\\"#\\\" onclick=\\\"return doAction\\(\\'\\/JRADB\\/accessC.html\\', \\'pw.{19,19}).*?(?=</dd>)",
            RegexOptions.Compiled | RegexOptions.IgnoreCase | RegexOptions.Multiline);

        public Regex productionRanch = new Regex(
            "(?<=<dt>生産牧場</dt>\r\n.{22,22}<dd>).*?(?=</dd>)",
            RegexOptions.Compiled | RegexOptions.IgnoreCase | RegexOptions.Singleline);

        public Regex origin = new Regex(
            "(?<=<dt>産地</dt>\r\n.{22,22}<dd>).*?(?=</dd>)",
            RegexOptions.Compiled | RegexOptions.IgnoreCase | RegexOptions.Singleline);
    }
}
