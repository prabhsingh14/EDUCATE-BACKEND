import mongoose from "mongoose";

const analyticsSnapshotSchema = new mongoose.Schema({
    instructor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    year: {
        type: Number,
        required: true
    },

    month: {
        type: Number, // 1 for January, 2 for February, ..., 12 for December
        required: true
    },

    totalRevenue: {
        type: Number,
        default: 0
    },

    totalOrders: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

// prevents duplicate entries for the same instructor, year, and month
analyticsSnapshotSchema.index({ instructor: 1, year: 1, month: 1 }, { unique: true });

const AnalyticsSnapshot = mongoose.model("AnalyticsSnapshot", analyticsSnapshotSchema);
export default AnalyticsSnapshot;