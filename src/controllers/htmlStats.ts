import { NextFunction, Request, Response } from 'express';
import logging from '../config/logging';
import HtmlStats from '../models/htmlStats';
import mongoose from 'mongoose';

const create = (req: Request, res: Response, next: NextFunction) => {
    logging.info('Attempting to create new stats ...');

    let { name,timeToComplete,percentageCompleted,likes} = req.body;

    const stats = new HtmlStats({
        _id: new mongoose.Types.ObjectId(),
        name,
        timeToComplete,
        percentageCompleted,
        likes
    });

    return stats
        .save()
        .then((newStat) => {
            logging.info(`New course created`);

            return res.status(201).json({ stats: newStat });
        })
        .catch((error) => {
            logging.error(error.message);

            return res.status(500).json({
                message: error.message
            });
        });
};

const read = (req: Request, res: Response, next: NextFunction) => {
    const _id = req.params.statID;
    logging.info(`Incoming read for html with id ${_id}`);

    HtmlStats.findById(_id)
        .populate('reader')
        .exec()
        .then((stats) => {
            if (stats) {
                return res.status(200).json({ stats });
            } else {
                return res.status(404).json({
                    error: 'Stats not found.'
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

    HtmlStats.find()
        .populate('reader')
        .exec()
        .then((stats) => {
            return res.status(200).json({
                count: stats.length,
                stats: stats
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

    HtmlStats.find(req.body)
        .populate('reader')
        .exec()
        .then((stats) => {
            return res.status(200).json({
                count: stats.length,
                stats: stats
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

    const _id = req.params.statID;

    HtmlStats.findById(_id)
        .exec()
        .then((stats) => {
            if (stats) {
                stats.set(req.body);
                stats.save()
                    .then((savedCourse) => {
                        logging.info(`Html stats with id ${_id} updated`);

                        return res.status(201).json({
                            stats: savedCourse
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

const deleteStats= (req: Request, res: Response, next: NextFunction) => {
    logging.warn('Delete route called');

    const _id = req.params.statID;

    HtmlStats.findByIdAndDelete(_id)
        .exec()
        .then(() => {
            return res.status(201).json({
                message: 'html stats deleted'
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
    deleteStats
};