import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

const StatsDashboard = ({ reviewData }) => {
  const [stats, setStats] = useState({
    totalReviews: 0,
    accuracyPercentage: 0,
    currentStreak: 0,
    upcomingReviews: 0,
    weeklyData: [],
    retentionData: [],
  });

  useEffect(() => {
    if (!reviewData) return;

    // Calculate statistics from review data
    const totalReviews = reviewData.reviews?.length || 0;
    const knownCards = reviewData.reviews?.filter((r) => r.known).length || 0;
    const accuracyPercentage =
      totalReviews > 0 ? Math.round((knownCards / totalReviews) * 100) : 0;

    // Calculate streak
    let currentStreak = 0;
    const sortedDates = [
      ...new Set(
        reviewData.reviews?.map((r) => new Date(r.timestamp).toDateString()) ||
          []
      ),
    ].sort((a, b) => new Date(b) - new Date(a));

    if (sortedDates.length > 0) {
      const today = new Date().toDateString();
      const yesterday = new Date(Date.now() - 86400000).toDateString();

      if (sortedDates[0] === today || sortedDates[0] === yesterday) {
        currentStreak = 1;
        let previousDate = new Date(sortedDates[0]);

        for (let i = 1; i < sortedDates.length; i++) {
          const currentDate = new Date(sortedDates[i]);
          const dayDifference = Math.round(
            (previousDate - currentDate) / 86400000
          );

          if (dayDifference === 1) {
            currentStreak++;
            previousDate = currentDate;
          } else {
            break;
          }
        }
      }
    }

    // Calculate upcoming reviews for the next 7 days
    const now = Date.now();
    const upcomingReviews =
      reviewData.cards?.filter((card) => {
        const nextReview = card.nextReviewAt;
        return (
          nextReview &&
          nextReview > now &&
          nextReview < now + 7 * 24 * 60 * 60 * 1000
        );
      }).length || 0;

    // Generate weekly data for bar chart
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i);
      return date.toISOString().split("T")[0];
    }).reverse();

    const weeklyData = last7Days.map((date) => {
      const reviewsOnDay =
        reviewData.reviews?.filter(
          (r) => new Date(r.timestamp).toISOString().split("T")[0] === date
        ).length || 0;

      return {
        date: new Date(date).toLocaleDateString("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
        }),
        reviews: reviewsOnDay,
      };
    });

    // Generate retention data (correct answers over time periods)
    const intervals = [1, 7, 14, 30, 60, 90];
    const retentionData = intervals.map((days) => {
      const cutoffDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
      const reviewsInPeriod =
        reviewData.reviews?.filter(
          (r) => new Date(r.timestamp) >= cutoffDate
        ) || [];
      const correctInPeriod = reviewsInPeriod.filter((r) => r.known).length;
      const retentionRate =
        reviewsInPeriod.length > 0
          ? Math.round((correctInPeriod / reviewsInPeriod.length) * 100)
          : 0;

      return {
        period: days === 1 ? "1 day" : `${days} days`,
        retention: retentionRate,
      };
    });

    setStats({
      totalReviews,
      accuracyPercentage,
      currentStreak,
      upcomingReviews,
      weeklyData,
      retentionData,
    });
  }, [reviewData]);

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {/* Stats Cards */}
        <div className="card-glass p-4 flex flex-col items-center justify-center">
          <div className="text-3xl font-bold">{stats.totalReviews}</div>
          <div className="text-secondary-500 dark:text-secondary-400">
            Total Reviews
          </div>
        </div>

        <div className="card-glass p-4 flex flex-col items-center justify-center">
          <div className="text-3xl font-bold">{stats.accuracyPercentage}%</div>
          <div className="text-secondary-500 dark:text-secondary-400">
            Accuracy
          </div>
        </div>

        <div className="card-glass p-4 flex flex-col items-center justify-center">
          <div className="text-3xl font-bold">{stats.currentStreak}</div>
          <div className="text-secondary-500 dark:text-secondary-400">
            Day Streak
          </div>
        </div>

        <div className="card-glass p-4 flex flex-col items-center justify-center">
          <div className="text-3xl font-bold">{stats.upcomingReviews}</div>
          <div className="text-secondary-500 dark:text-secondary-400">
            Due in 7 Days
          </div>
        </div>
      </div>

      {/* Weekly Activity Chart */}
      <div className="card-glass p-4 mb-8">
        <h3 className="text-lg font-semibold mb-4">Weekly Activity</h3>
        <div className="h-60">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={stats.weeklyData}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => value.split(",")[0]}
              />
              <YAxis allowDecimals={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(255, 255, 255, 0.8)",
                  borderRadius: "8px",
                  border: "none",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                }}
              />
              <Bar
                dataKey="reviews"
                fill="#38bdf8"
                radius={[4, 4, 0, 0]}
                animationDuration={1500}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Retention Chart */}
      <div className="card-glass p-4">
        <h3 className="text-lg font-semibold mb-4">Retention Over Time</h3>
        <div className="h-60">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={stats.retentionData}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis dataKey="period" tick={{ fontSize: 12 }} />
              <YAxis domain={[0, 100]} unit="%" ticks={[0, 25, 50, 75, 100]} />
              <Tooltip
                formatter={(value) => [`${value}%`, "Retention Rate"]}
                contentStyle={{
                  backgroundColor: "rgba(255, 255, 255, 0.8)",
                  borderRadius: "8px",
                  border: "none",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                }}
              />
              <Line
                type="monotone"
                dataKey="retention"
                stroke="#0ea5e9"
                strokeWidth={3}
                dot={{ r: 4, fill: "#0ea5e9" }}
                activeDot={{ r: 6, fill: "#0369a1" }}
                animationDuration={1500}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default StatsDashboard;
