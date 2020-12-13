using jrascraping.GetJra;
using jrascraping.Models;
using jrascraping.Regexs;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Globalization;
using System.Linq;
using System.Text.RegularExpressions;

namespace jrascraping.Query
{
    public class HorseQuery
    {
        private static JraDbContext context;

        private static void DbContext()
        {
            //初期化
            var options = new DbContextOptionsBuilder<JraDbContext>();
            options.UseSqlite("Data Source=Jra.db");
            context = new JraDbContext(options.Options);
        }

        /// <summary>
        /// HorseInfoへInsert
        /// </summary>
        public List<HorseInfo> AddHorseInfo(string otherRace)
        {
            var horseCNames = ParseHorseCNames(otherRace);
            var horses = new List<HorseInfo>();

            // HorseInfoのInsert
            foreach (var horseInfo in horseCNames)
            {
                var horseHtml = new Downloder().GetHorseHtml(horseInfo);
                var horse = CreateHorseInfo(horseHtml);
                horses.Add(horse);
            }
            context.SaveChanges();
            return horses;
        }

        /// <summary>
        /// HorseInfoへInsertするデータの準備
        /// </summary>
        public static HorseInfo CreateHorseInfo(string html)
        {
            DbContext();
            try
            {
                var regex = new HorseInfoCname();
                var matchHorseName = Regex.Replace(regex.horseNames.Match(html).Value, @"<.*?>", "");
                var matchFather = regex.father.Match(html);
                var matchMother = regex.mother.Match(html);
                var matchMotherFather = regex.motherFather.Match(html);
                var matchMotherMother = regex.motherMother.Match(html);
                var matchSex = regex.sex.Match(html);
                var matchBirthday = regex.birthday.Match(html);
                var birthday = DateTime.ParseExact(matchBirthday.Value, "yyyy年M月d日", CultureInfo.InvariantCulture);
                var matchCoatColor = regex.coatColor.Match(html);
                var matchHorseNameMeaning = regex.horseNameMeaning.Match(html);
                var matchHorseOwner = regex.horseOwner.Match(html);
                var TrainerName = regex.trainer.Match(html);
                var matchTrainer = Regex.Replace(TrainerName.Value, "\\<.*?\\>", string.Empty);
                var matchProductionRanch = regex.productionRanch.Match(html);
                var matchOrigin = regex.origin.Match(html);

                var horseCheck = context.HorseInfo.SingleOrDefault(c => c.HorseName == matchHorseName && c.Birthday == birthday);

                if (horseCheck != null) return null;
                {
                    var horseInfo = new HorseInfo()
                    {
                        HorseName = matchHorseName,
                        Father = matchFather.Value,
                        Mother = matchMother.Value,
                        MotherFather = matchMotherFather.Value,
                        MotherMother = matchMotherMother.Value,
                        Sex = matchSex.Value,
                        Birthday = birthday,
                        CoatColor = matchCoatColor.Value,
                        HorseNameMeaning = matchHorseNameMeaning.Value,
                        HorseOwner = matchHorseOwner.Value,
                        Trainer = matchTrainer,
                        ProductionRanch = matchProductionRanch.Value,
                        Origin = matchOrigin.Value,
                    };
                    Debug.WriteLine($"Insert実行：{horseInfo.HorseName}");
                    context.Add(horseInfo);
                    context.SaveChanges();

                    return horseInfo;
                }
            }
            catch (Exception ex)
            {
                Debug.WriteLine(ex);
                throw;
            }
        }
        public List<string> ParseHorseCNames(string html)
        {
            var table = new List<string>();
            var regex = new MainCName();
            var matches = regex.horseCName.Matches(html);
            foreach (Match match in matches)
            {
                table.Add(match.Groups["HorseCname"].Value);
            }
            return table;
        }
    }
}
