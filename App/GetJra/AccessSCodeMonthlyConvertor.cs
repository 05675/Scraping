using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace jrascraping.GetJra
{
    public class AccessSCodeMonthlyConvertor
    {
        /// <summary>
        /// レース結果のCnameを取得
        /// </summary>
        public string FetchRaceResultPage(DateTime month)
        {
            var cName = new AccessSCodeMonthlyConvertor().ConvertTo(month);
            return new Downloder().GetRaceResultsHtml(cName);
        }
        internal string ConvertTo(DateTime month)
        {
            var idx1 = month.Year;
            var idx2 = month.Month;
            var arg = YearAndMonth(idx1, idx2);
            var yearNow = DateTime.Now.Year;
            var monthNow = DateTime.Now.Month;
            var currenYear = YearAndMonth(yearNow, monthNow);
            string param;
            if (arg >= currenYear)
            {
                param = "pw01skl00" + arg.ToString() + "/";
            }
            else
            {
                param = "pw01skl10" + arg.ToString() + "/";
            }
            var cname = param + ObjParam.ObjParamCname(arg.ToString().Substring(2, 4));
            return cname;
        }

        /// <summary>
        /// Cnameの年月を算出
        /// </summary>
        private int YearAndMonth(int year, int month)
        {
            return year * 100 + month;
        }
    }
}
