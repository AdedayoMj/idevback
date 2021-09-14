import mongoose, { Schema } from 'mongoose';
import ICourseStats from '../interface/courseStats';

const HtmlStatsSchema: Schema = new Schema(
    {
      
    name: { type: String },
    timeToComplete: { type: String },
    percentageCompleted: { type: String },
    likes:{ type: Boolean },

    },
    {
        timestamps: true
    }
);

export default mongoose.model<ICourseStats>('HtmlStats', HtmlStatsSchema);