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

            // 1カ月単位で取得可能
            DateTime inputFrom = new DateTime(2021, 10, 9);
            DateTime inputTo = new DateTime(2021, 10, 9);
            while (inputFrom <= inputTo)
            {
                var html = new AccessSCodeMonthlyConvertor().FetchRaceResultPage(inputFrom);
                List<string> venusCnames = new RaceInfoQuery().RaceDaysCNames(html, inputFrom, inputTo);
               
                //Cname：開催情報(1回東京1日目など)を取得
                foreach (var venusCname in venusCnames)
                {
                    //TODO: fromToの期間を設定。while内で日付を決める。
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

                        var horseInfo = new HorseQuery().AddHorseInfo(raceResultHtml);
                        var raceResults = new RaceResultQuery().AddRaceResults(raceResultHtml);
                        var raceInfo = new RaceInfoQuery().AddRaceInfo(raceResultHtml, horseInfo);

                        // 2020/03/21 レース結果を完成させてからコメントアウトを外す
                        // otherRaceからRaceInfoを作る
                        // otherRaceからRaceResultを作る(複数)
                    }
                }
                inputFrom = inputFrom.AddDays(1);
            }
        }
    }
}