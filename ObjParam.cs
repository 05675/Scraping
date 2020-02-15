using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace jrascraping
{
    public class ObjParam
    {
        public static string ObjParamCname(string arg)
        {
            var objParams = new Dictionary<string, string>();
            objParams.Add("0001", "AD");
            objParams.Add("0002", "7B");
            return objParams[arg];
        }
    }
}
