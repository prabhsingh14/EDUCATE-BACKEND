import AnalyticsSnapshot from '../models/AnalyticsSnapshot.js';
import Payment from '../models/Payment.js';

export const getInstructorAnalytics = async (req, res) => {
    try {
        const instructorId = req.user.id;

        // fetch total revenue till date
        const payments = await Payment.find({
            instructorId: instructorId,
            status: 'completed'
        })

        const totalRevenue = payments.reduce((acc, payment) => acc + payment.amount, 0);
        const totalOrders = payments.length;

        // get last 6 months
        const today = new Date();
        const lastSixMonths = [];

        for (let i = 5; i >= 0; i--) {
            const d = new Date(today.getFullYear(), today.getMonth() - i, 1);
            lastSixMonths.push({
                year: d.getFullYear(),
                month: d.getMonth() + 1, // getMonth() is zero-based
            });
        }

        const snapshots = await AnalyticsSnapshot.find({
            instructor: instructorId,
            $or: lastSixMonths
        }).sort({ month: -1, year: -1 });

        return res.status(200).json({
            totalRevenue,
            totalOrders,
            monthlyData: snapshots
        });
    } catch (error) {
        console.error('Error fetching instructor analytics:', error);
        return res.status(500).json({
            message: 'Internal server error',
            error: error.message
        });
    }
}