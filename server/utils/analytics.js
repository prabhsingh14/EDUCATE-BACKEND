import AnalyticsSnapshot from "../models/AnalyticsSnapshot";

export const updateMonthlyAnalytics = async(instructorId, amount, date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // getMonth() is zero-based, so we add 1

    await AnalyticsSnapshot.findOneAndUpdate(
        { instructor: instructorId, year, month },
        { $inc: { revenue: amount, orders: 1 } },
        { upsert: true, new: true }
    );
}