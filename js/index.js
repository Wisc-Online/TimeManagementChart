google.charts.load('current', { 'packages': ['corechart'] });
google.charts.setOnLoadCallback(setupChart);
weeklyHours = [['Task', 'Hours per Week']]

var chart, chartData;

var chartOptions = {
    title: 'My Weekly Allotted Time',
    pieSliceText: 'label',
    tooltip: { trigger: 'focus' },
    legend: 'bottom',
    animation: {
        "startup": true,
        duration: 250,
        easing: 'out',

    }
};

function setupChart() {
    chart = new google.visualization.PieChart(document.getElementById('piechart'));
    chartData = new google.visualization.DataTable();

    chartData.addColumn('string', 'Activity');
    chartData.addColumn('number', 'Hours');

    chartData.addRow(["Total Hours", 168]);

    chart.draw(chartData, chartOptions);
}
function ClearFields() {
    $(".chartData").each(function (i, element) {
        var $element = $(element);
        $element.val("")
        var creditsTextbox = $("#Credits")
        creditsTextbox.val("");
        setupChart();
        var HoursInAWeekTextBox = $("#HoursRemaining");
        HoursInAWeekTextBox.text("168");
    }
    )
}

$(function () {
    var creditsTextbox = $("#Credits")
    var creditHoursInput = $("#CreditHours");
    var studyTimeTextbox = $("#StudyTime");
    creditsTextbox.change(function () {
        var credits = creditsTextbox.val();

        var studyTimeHours = 2 * credits;
        var creditHours = 2 * credits;

        studyTimeTextbox.val(studyTimeHours);
        creditHoursInput.val(creditHours);
        creditHoursInput.change();
    });
    
    $(".chartData").change(function () {
        var availableHoursInAWeekTextBox = $("#AvailHours");
        var hoursLeftInAWeekTextBox = $("#HoursRemaining");
        var availableHoursInAWeek = availableHoursInAWeekTextBox.text();
        availableHoursInAWeek = availableHoursInAWeek.valueOf();

        chartData.removeRows(0, chartData.getNumberOfRows());

        $(".chartData").each(function (i, element) {

            var $element = $(element);

            var title = $element.attr("data-title");
            var hours = parseInt($element.val());
            if (!isNaN(hours)) {
                availableHoursInAWeek = availableHoursInAWeek - hours;
                hoursLeftInAWeekTextBox.text(availableHoursInAWeek);
            }

            chartData.addRow([title, hours]);
        });

        chart.draw(chartData, chartOptions);
    });
})