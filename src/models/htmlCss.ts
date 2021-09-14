import mongoose, { Schema } from 'mongoose';
import IHtmlCss from '../interface/htmlCss';

const HtmlSchema: Schema = new Schema(
    {
        courseStats: { type: mongoose.Schema.Types.ObjectId, ref: 'HtmlStats' },
        htmlBasics: { type: Boolean},
        htmlForms: { type: Boolean},
        cssBasics: { type: Boolean},
        cssClassSelectore: { type: Boolean},
        htmlSemantics: { type: Boolean},
        csslayout: { type: Boolean},
        psuedoElement: { type: Boolean},
        mediaQueries: { type: Boolean},
        task: { type: Boolean},
        reader: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
       

    },
    {
        timestamps: true
    }
);

export default mongoose.model<IHtmlCss>('HtmlCss', HtmlSchema);