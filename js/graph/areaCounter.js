var AreaCounter = function(g, height, x, y) {

    function countArea(databaseline, datanewline){

        var normalAreasToCount = 0;

        for (var i=0; i<databaseline.length; i++){

            if (databaseline[i].yAxis > datanewline[i].yAxis){
                var dataBaselineLastIncreaseCount = databaseline[i].yAxis - databaseline[i-1].yAxis;
                var dataBaselineIncreateInOneHour = dataBaselineLastIncreaseCount/1000;
                var datanewlineLastIncreaseCount = datanewline[i].yAxis - datanewline[i-1].yAxis;
                var datanewlineIncreateInOneHour = datanewlineLastIncreaseCount/1000;
                var databaselineIncreased = parseInt(databaseline[i-1].yAxis);
                var datanewlineIncreased = parseInt(datanewline[i-1].yAxis);
                var countHoursUntillBreakPoint = 0;
                var countTempAtBreakPoint = 0;
                while (databaselineIncreased < datanewlineIncreased) {
                    databaselineIncreased += dataBaselineIncreateInOneHour;
                    datanewlineIncreased += datanewlineIncreateInOneHour;
                    countHoursUntillBreakPoint++;
                    countTempAtBreakPoint = databaselineIncreased;
                }
                countBaseLineTempUntillBreakPoint = countTempAtBreakPoint - databaseline[i-1].yAxis - dataBaselineIncreateInOneHour;
                countNewLineTempUntillBreakPoint = countTempAtBreakPoint - datanewline[i-1].yAxis - datanewlineIncreateInOneHour;
                countHoursUntillBreakPoint = countHoursUntillBreakPoint !== 0 ? countHoursUntillBreakPoint - 1 : 0;

                break;

            }else{
                normalAreasToCount++;
            }
        }

        return getAreaBNewLine() - getAreaBaseLine();

        function getAreaBaseLine(){

        var normalAreaCount = 0;
        for (var i=0; i<normalAreasToCount - 1; i++){
            var yAxisIncreasedCount = databaseline[i+1].yAxis - databaseline[i].yAxis;
            var xAxisIncreasedCount = databaseline[i+1].xAxis - databaseline[i].xAxis;
            var yAxisIncreasedSinceBeginning = databaseline[i].yAxis - databaseline[0].yAxis;
            var baseLineAreaCount = ((yAxisIncreasedCount * xAxisIncreasedCount) / 2) + (xAxisIncreasedCount * yAxisIncreasedSinceBeginning);
            normalAreaCount += baseLineAreaCount
        }

        var extraAreaCount = 0;
        var yAxisExtraIncreasedCount = countBaseLineTempUntillBreakPoint;
        var xAxisExtraIncreasedCount = countHoursUntillBreakPoint;
        var yAxisExtraIncreasedSinceBeginning = parseInt(databaseline[normalAreasToCount-1].yAxis) - databaseline[0].yAxis;
        var extraAreaCount = ((yAxisExtraIncreasedCount * xAxisExtraIncreasedCount) / 2) + (xAxisExtraIncreasedCount * yAxisExtraIncreasedSinceBeginning);

        var baseLineTotal = normalAreaCount + extraAreaCount;

        //console.log('(', yAxisExtraIncreasedCount,' * ', xAxisExtraIncreasedCount, ') / 2) + (', xAxisExtraIncreasedCount, ' * ', yAxisExtraIncreasedSinceBeginning, ') +', normalAreaCount, ' = ', baseLineTotal)

        return baseLineTotal;

        }

        function getAreaBNewLine(){

            var normalAreaCount = 0;
            for (var i=0; i<normalAreasToCount - 1; i++){

                var yAxisIncreasedCount = datanewline[i+1].yAxis - datanewline[i].yAxis;
                var xAxisIncreasedCount = datanewline[i+1].xAxis - datanewline[i].xAxis;

                var yAxisIncreasedSinceBeginning = datanewline[i].yAxis - databaseline[0].yAxis;
                var baseLineAreaCount = ((yAxisIncreasedCount * xAxisIncreasedCount) / 2) + (xAxisIncreasedCount * yAxisIncreasedSinceBeginning);
                normalAreaCount += baseLineAreaCount
            }

            var extraAreaCount = 0;
            var yAxisExtraIncreasedCount = countNewLineTempUntillBreakPoint;
            var xAxisExtraIncreasedCount = countHoursUntillBreakPoint;
            var yAxisExtraIncreasedSinceBeginning = parseInt(datanewline[normalAreasToCount-1].yAxis) - databaseline[0].yAxis;
            var extraAreaCount = ((yAxisExtraIncreasedCount * xAxisExtraIncreasedCount) / 2) + (xAxisExtraIncreasedCount * yAxisExtraIncreasedSinceBeginning);

            var newLineTotal = normalAreaCount + extraAreaCount;

            //console.log('(', yAxisExtraIncreasedCount,' * ', xAxisExtraIncreasedCount, ') / 2) + (', xAxisExtraIncreasedCount, ' * ', yAxisExtraIncreasedSinceBeginning, ') +', normalAreaCount, ' = ', newLineTotal)

            return newLineTotal;

        }
    }


    return {
        countArea: countArea
    }
};
