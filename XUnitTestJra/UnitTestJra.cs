using System;
using System.Linq;
using System.Text.RegularExpressions;
using Xunit;

namespace XUnitTestJra
{
    public class UnitTestJra
    {
        [Fact(DisplayName = "foreachの処理")]
        public void foreachの処理()
        {
            var html = HtmlTest();
            var raceResultsHtml = Regex.Match(html, @"<tbody>.*?</tbody>", RegexOptions.Singleline);
            MatchCollection index = Regex.Matches(raceResultsHtml.Value, @"<tr>.*?</tr>", RegexOptions.Singleline);

            foreach (Match result in index)
            {
                var results = result.Value;
            }
        }

        [Fact(DisplayName = "Linqの処理")]
        public void Linqの処理()
        {
            var html = HtmlTest();
            var raceResultsHtml = Regex.Match(html, @"<tbody>.*?</tbody>", RegexOptions.Singleline);
            var index = Regex.Matches(raceResultsHtml.Value, @"<tr>.*?</tr>", RegexOptions.Singleline)
                .Cast<Match>()
                .Select(index => index.Value)
                .ToList();
        }

        private static string HtmlTest()
        {
            var html = @"
<tbody>
<tr>
1.aaaaaaaaaa
bbbbbbbbbbbb
cccccccccccc
dddddddddddd
</tr>

<tr>
2.eeeeeeeeee
ffffffffffff
gggggggggggg
hhhhhhhhhhhh
iiiiiiiiiiii
</tr>

<tr>
3.jjjjjjjjjj
kkkkkkkkkkkk


</tr>
</tbody>
";
            return html;
        }

    }
}
