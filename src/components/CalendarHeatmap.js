import { useState, useEffect } from "react";

const CalendarHeatmap = ({ reviewData }) => {
  const [calendarData, setCalendarData] = useState([]);
  const [maxValue, setMaxValue] = useState(1);

  useEffect(() => {
    if (!reviewData || !reviewData.reviews || reviewData.reviews.length === 0) {
      setCalendarData([]);
      return;
    }

    // Get all reviews from the past 90 days
    const now = new Date();
    const startDate = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() - 90
    );

    // Create a date -> count map
    const dateMap = {};
    for (let i = 0; i < 91; i++) {
      const date = new Date(startDate);
      date.setDate(date.getDate() + i);
      const dateStr = date.toISOString().split("T")[0];
      dateMap[dateStr] = 0;
    }

    // Count reviews per day
    reviewData.reviews.forEach((review) => {
      const reviewDate = new Date(review.timestamp).toISOString().split("T")[0];
      if (dateMap[reviewDate] !== undefined) {
        dateMap[reviewDate]++;
      }
    });

    // Convert to array format for rendering
    const data = Object.entries(dateMap).map(([date, count]) => ({
      date,
      count,
      formattedDate: new Date(date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
    }));

    // Find max value for color scaling
    const max = Math.max(...data.map((d) => d.count));
    setMaxValue(max > 0 ? max : 1);

    setCalendarData(data);
  }, [reviewData]);

  // Get color intensity based on value
  const getColorIntensity = (count) => {
    if (count === 0) return "bg-secondary-100 dark:bg-secondary-800";

    const intensity = Math.min(Math.ceil((count / maxValue) * 4), 4);

    const colors = [
      "bg-primary-100 dark:bg-primary-900",
      "bg-primary-200 dark:bg-primary-800",
      "bg-primary-300 dark:bg-primary-700",
      "bg-primary-400 dark:bg-primary-600",
      "bg-primary-500 dark:bg-primary-500",
    ];

    return colors[intensity];
  };

  // Group dates by week for rendering
  const weeklyData = [];
  for (let i = 0; i < calendarData.length; i += 7) {
    weeklyData.push(calendarData.slice(i, i + 7));
  }

  return (
    <div className="card-glass p-6 w-full max-w-4xl mx-auto mb-8">
      <h3 className="text-lg font-semibold mb-4">
        Review Activity (Last 90 Days)
      </h3>

      <div className="overflow-x-auto">
        <div className="flex flex-col gap-1" style={{ minWidth: "700px" }}>
          {/* Days of week labels */}
          <div className="flex text-xs text-secondary-500 dark:text-secondary-400 mb-1">
            <div className="w-12 flex-shrink-0"></div>
            <div className="flex-1 grid grid-cols-7 gap-1">
              <div>Sun</div>
              <div>Mon</div>
              <div>Tue</div>
              <div>Wed</div>
              <div>Thu</div>
              <div>Fri</div>
              <div>Sat</div>
            </div>
          </div>

          {/* Calendar grid */}
          {weeklyData.map((week, weekIndex) => {
            // Get the week label (only show month names)
            const firstDay = week[0]?.date;
            const weekLabel = firstDay
              ? new Date(firstDay).getDate() === 1 || weekIndex === 0
                ? new Date(firstDay).toLocaleDateString("en-US", {
                    month: "short",
                  })
                : ""
              : "";

            return (
              <div key={weekIndex} className="flex">
                <div className="w-12 flex-shrink-0 text-xs text-secondary-500 dark:text-secondary-400 flex items-center justify-end pr-2">
                  {weekLabel}
                </div>
                <div className="flex-1 grid grid-cols-7 gap-1">
                  {week.map((day, dayIndex) => (
                    <div
                      key={dayIndex}
                      className={`aspect-square rounded-sm ${getColorIntensity(
                        day.count
                      )} hover:ring-2 hover:ring-secondary-300 dark:hover:ring-secondary-600 transition-all`}
                      title={`${day.formattedDate}: ${day.count} reviews`}
                    ></div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-end mt-4 text-xs text-secondary-500 dark:text-secondary-400">
        <div className="mr-2">Less</div>
        <div className={`h-3 w-3 ${getColorIntensity(0)} rounded-sm`}></div>
        <div
          className={`h-3 w-3 ${getColorIntensity(
            Math.ceil(maxValue * 0.25)
          )} rounded-sm ml-1`}
        ></div>
        <div
          className={`h-3 w-3 ${getColorIntensity(
            Math.ceil(maxValue * 0.5)
          )} rounded-sm ml-1`}
        ></div>
        <div
          className={`h-3 w-3 ${getColorIntensity(
            Math.ceil(maxValue * 0.75)
          )} rounded-sm ml-1`}
        ></div>
        <div
          className={`h-3 w-3 ${getColorIntensity(maxValue)} rounded-sm ml-1`}
        ></div>
        <div className="ml-2">More</div>
      </div>
    </div>
  );
};

export default CalendarHeatmap;
