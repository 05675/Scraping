using jrascraping.GetJra;
using jrascraping.Models;
using jrascraping.Regexs;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Globalization;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace jrascraping.Query
{
    public class Insert
    {
        private static readonly JraDbContext context;

        /// <summary>
        /// HorseInfoへInsert
        /// </summary>
        public List<HorseInfo> InsertHorseInfo(string otherRace)
        {
            var jra = new Jra();
            var horseCNames = jra.ParseHorseCNames(otherRace);
            //レース結果の馬情報を保持
            var horses = new List<HorseInfo>();

            // HorseInfoのInsert
            foreach (var horseInfo in horseCNames)
            {
                var horseHtml = new Downloder().GetHorse(horseInfo);
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
            try
            {
                var regex = new HorseInfoCname();
                var matchHorseName = regex.horseNames.Match(html);
                var matchFather = regex.father.Match(html);
                var matchMother = regex.mother.Match(html);
                var matchMotherFather = regex.motherFather.Match(html);
                var matchMotherMother = regex.motherMother.Match(html);
                var matchSex = regex.sex.Match(html);
                var matchBirthday = regex.birthday.Match(html);
                var birthDay = DateTime.ParseExact(matchBirthday.Value, "yyyy年M月d日", CultureInfo.InvariantCulture);
                var matchCoatColor = regex.coatColor.Match(html);
                var matchHorseNameMeaning = regex.horseNameMeaning.Match(html);
                var matchHorseOwner = regex.horseOwner.Match(html);
                var TrainerName = regex.trainer.Match(html);
                var matchTrainer = Regex.Replace(TrainerName.Value, "\\<.*?\\>", string.Empty);
                var matchProductionRanch = regex.productionRanch.Match(html);
                var matchOrigin = regex.origin.Match(html);

                var horseCheck = context.HorseInfo.SingleOrDefault(c => c.HorseName == matchHorseName.Value && c.Birthday == birthDay);

                if (horseCheck == null)
                {
                    var horseInfo = new HorseInfo()
                    {
                        HorseName = matchHorseName.Value,
                        Father = matchFather.Value,
                        Mother = matchMother.Value,
                        MotherFather = matchMotherFather.Value,
                        MotherMother = matchMotherMother.Value,
                        Sex = matchSex.Value,
                        Birthday = birthDay,
                        CoatColor = matchCoatColor.Value,
                        HorseNameMeaning = matchHorseNameMeaning.Value,
                        HorseOwner = matchHorseOwner.Value,
                        Trainer = matchTrainer,
                        ProductionRanch = matchProductionRanch.Value,
                        Origin = matchOrigin.Value
                    };

                    Debug.WriteLine("Insert実行：" + horseInfo.HorseName);
                    context.Add(horseInfo);
                    return horseInfo;
                }
                else
                {
                    Debug.WriteLine(horseCheck.HorseName + "：既に存在。");
                    return null;
                }
            }
            catch (Exception ex)
            {
                Debug.WriteLine(ex);
                throw;
            }
        }

        /// <summary>
        /// レース結果のInsert
        /// </summary>
        public List<RaceResult> InsertRaceResults(string otherRace)
        {
            var jra = new Jra();
            var raceCName = jra.ParseRaceResultCNames(otherRace).Distinct();
            var raceResult = new List<RaceResult>();
            foreach (var raceResults in raceCName)
            {
                var getResultsHtml = new Downloder().GetRaceResults(raceResults);

                // 1着～最下位のHTMLを取得
                var raceResultsHtml = Regex.Match(getResultsHtml, @"<tbody>.*?</tbody>", RegexOptions.Singleline);
                MatchCollection raceResultHtml = Regex.Matches(raceResultsHtml.Value, @"<tr>.*?</tr>", RegexOptions.Singleline);
                var result = Regex.Matches(raceResultsHtml.Value, @"<tr>.*?</tr>", RegexOptions.Singleline)
                    .Cast<Match>()
                    .Select(result => jra.CreateRaceResults(result.Value, getResultsHtml))
                    .ToList();

                // すでにレース結果が存在している場合は、Insertしない
                for (var i = 0; i < result.Count; i++)
                {
                    var raceCheck = context.RaceResults.SingleOrDefault(c =>
                        c.Date == result[i].Date &&
                        c.Waku == result[i].Waku &&
                        c.RaceName == result[i].RaceName &&
                        c.Place == result[i].Place
                    );

                    if (raceCheck == null)
                    {
                        Debug.WriteLine("Insert実行：" + result[i].RaceName + "：" + result[i].Date);
                        context.RaceResults.Add(result[i]);
                    }
                    else
                    {
                        Debug.WriteLine(result[i].RaceName + "：" + result[i].Horse + "：既に存在。");
                    }
                    raceResult.Add(result[i]);
                }
            }
            context.SaveChanges();
            return raceResult;
        }
    }
}
