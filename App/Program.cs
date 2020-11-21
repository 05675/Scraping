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
        public static void DbContext()
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
            DateTime target = new DateTime(2020, 10, 1);    //From
            while (target <= new DateTime(2020, 10, 30))     //To
            {
                var html = new AccessSCodeMonthlyConvertor().FetchRaceResultPage(target);
                var insert = new RaceResultQuery();
                List<string> venusCnames = new RaceInfoQuery().RaceDaysCNames(html);

                //Cname：開催情報(1回東京1日目など)を取得
                foreach (var venusCname in venusCnames)
                {
                    string sarchRaceResultHtml = new Downloder().GetRaceResultsHtml(venusCname);
                    var raceResultCNames = new RaceResultQuery().ParseRaceResultCNames(sarchRaceResultHtml);

                    //Cname：1R～12Rまで取得
                    foreach (var raceResultCName in raceResultCNames)
                    {

                        //if()    //raceInfoがすでにあれば、PAYBACKは不要の条件を入れる。
                        //{
                        //  cotinue;
                        //}
                        string raceResultHtml = new Downloder().GetRaceResultsHtml(raceResultCName);
                        var horses = new HorseQuery().InsertHorseInfo(raceResultHtml);
                        var raceResults = insert.InsertRaceResults(raceResultHtml);
                        var payBacks = new PayBackQuery().CreatePayBack(raceResultHtml);
                        var raceInfo = new RaceInfoQuery().CreateRaceInfo(raceResultHtml, horses);

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