using jrascraping.GetJra;
using jrascraping.Models;
using jrascraping.Query;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;

namespace jrascraping
{
    public class Jra
    {
        private static JraDbContext context;
        private static void DbContext()
        {
            //初期化
            var options = new DbContextOptionsBuilder<JraDbContext>();
            options.UseSqlite("Data Source=Jra.db");
            context = new JraDbContext(options.Options);
        }
        public static void Main(string[] args)
        {
            DbContext();

            // 期間を指定：現状は月単位で取得
            DateTime target = new DateTime(2020, 6, 1);    //From
            while (target <= new DateTime(2020, 6, 30))     //To
            {
                var html = new AccessSCodeMonthlyConvertor().FetchRaceResultPage(target);
                var insert = new RaceResultQuery();
                List<string> raceDays = new RaceInfoQuery().RaceDaysCNames(html);

                //Cname：1回東京1日目などを取得
                foreach (var cname in raceDays)
                {
                    string otherRaceHtml = new Downloder().GetRaceResults(cname);
                    var raceResultCNames = new RaceResultQuery().ParseRaceResultCNames(otherRaceHtml);

                    //Cname：1R～12Rまで取得
                    foreach (var resultCName in raceResultCNames)
                    {

                        //if()    //raceInfoがすでにあれば、PAYBACKは不要の条件を入れる。
                        //{
                        //  cotinue;
                        //}
                        string otherRace = new Downloder().GetRaceResults(resultCName);
                        var horses = new HorseQuery().InsertHorseInfo(otherRace);
                        var raceResults = insert.InsertRaceResults(otherRace);
                        var payBacks = new PayBackQuery().CreatePayBack(otherRace);
                        var raceInfo = new RaceInfoQuery().CreateRaceInfo(otherRace, horses);

                        // 2020/03/21 レース結果を完成させてからコメントアウトを外す
                        // otherRaceからRaceInfoを作る
                        // otherRaceからRaceResultを作る(複数)
                    }
                    context.SaveChanges();
                }
                target = target.AddMonths(-1);
            }
        }
    }
}