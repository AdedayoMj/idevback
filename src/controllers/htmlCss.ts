import { NextFunction, Request, Response } from 'express';
import logging from '../config/logging';
import HtmlCss from '../models/htmlCss';
import mongoose from 'mongoose';

const create = (req: Request, res: Response, next: NextFunction) => {
    logging.info('Attempting to create new courses ...');

    let { reader,
        courseStats,
        htmlBasics,
        htmlForms,
        cssBasics,
        cssClassSelectore,
        htmlSemantics,
        csslayout,
        psuedoElement , mediaQueries,
        task} = req.body;

    const html = new HtmlCss({
        _id: new mongoose.Types.ObjectId(),
        reader,
        courseStats,
        htmlBasics,
        htmlForms,
        cssBasics,
        cssClassSelectore,
        htmlSemantics,
        csslayout,
        psuedoElement,
        mediaQueries,
        task

    });

    return html
        .save()
        .then((newHtml) => {
            logging.info(`New blog created`);

            return res.status(201).json({ html: newHtml });
        })
        .catch((error) => {
            logging.error(error.message);

            return res.status(500).json({
                message: error.message
            });
        });
};

const read = (req: Request, res: Response, next: NextFunction) => {
    const _id = req.params.htmlID;
    logging.info(`Incoming read for html with id ${_id}`);

    HtmlCss.findById(_id)
        .populate('author')
        .exec()
        .then((html) => {
            if (html) {
                return res.status(200).json({ html });
            } else {
                return res.status(404).json({
                    error: 'Blog not found.'
                });
            }
        })
        .catch((error) => {
            logging.error(error.message);

            return res.status(500).json({
                error: error.message
            });
        });
};

const readAll = (req: Request, res: Response, next: NextFunction) => {
    logging.info('Returning all blogs ');

    HtmlCss.find()
        .populate('author')
        .exec()
        .then((html) => {
            return res.status(200).json({
                count: html.length,
                html: html
            });
        })
        .catch((error) => {
            logging.error(error.message);

            return res.status(500).json({
                message: error.message
            });
        });
};

const query = (req: Request, res: Response, next: NextFunction) => {
    logging.info('Query route called');

    HtmlCss.find(req.body)
        .populate('author')
        .exec()
        .then((html) => {
            return res.status(200).json({
                count: html.length,
                html: html
            });
        })
        .catch((error) => {
            logging.error(error.message);

            return res.status(500).json({
                message: error.message
            });
        });
};

const update = (req: Request, res: Response, next: NextFunction) => {
    logging.info('Update route called');

    const _id = req.params.htmlID;

    HtmlCss.findById(_id)
        .exec()
        .then((html) => {
            if (html) {
                html.set(req.body);
                html.save()
                    .then((savedHtml) => {
                        logging.info(`Html Course with id ${_id} updated`);

                        return res.status(201).json({
                            html: savedHtml
                        });
                    })
                    .catch((error) => {
                        logging.error(error.message);

                        return res.status(500).json({
                            message: error.message
                        });
                    });
            } else {
                return res.status(401).json({
                    message: 'NOT FOUND'
                });
            }
        })
        .catch((error) => {
            logging.error(error.message);

            return res.status(500).json({
                message: error.message
            });
        });
};

const deleteHtml = (req: Request, res: Response, next: NextFunction) => {
    logging.warn('Delete route called');

    const _id = req.params.htmlID;

    HtmlCss.findByIdAndDelete(_id)
        .exec()
        .then(() => {
            return res.status(201).json({
                message: 'html course deleted'
            });
        })
        .catch((error) => {
            logging.error(error.message);

            return res.status(500).json({
                message: error.message
            });
        });
};

export default {
    create,
    read,
    readAll,
    query,
    update,
    deleteHtml
};