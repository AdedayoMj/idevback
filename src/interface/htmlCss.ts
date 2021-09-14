import ICourseStats from "./courseStats";
import IUser from "./user";


export default interface IHtmlCss{
    reader: string | IUser;
    courseStats: string | ICourseStats;
    htmlBasics: boolean;
    htmlForms: boolean;
    cssBasics: boolean;
    cssClassSelectore: boolean;
    htmlSemantics: boolean;
    csslayout: boolean;
    psuedoElement: boolean;
    mediaQueries: boolean;
    task: boolean;
}