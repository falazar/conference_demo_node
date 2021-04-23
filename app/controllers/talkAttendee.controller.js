const db = require("../models");
const TalkAttendee = db.talkAttendees;
const Op = db.Sequelize.Op;


// Create and Save a new talkAttendee
exports.create = (req, res) => {
    // Validate request
    if (!req.body.talkId) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a talkAttendee
    const talkAttendee = {
        userId: req.body.userId,
        talkId: req.body.talkId,
        status: req.body.status,
    };

    // First verify it is not in database.... if found update, else create
    let where =
        {
            where: {
                userId: req.body.userId,
                talkId: req.body.talkId,
            }
        };

    // todo split up methods.
    TalkAttendee.findOne(where).then(found => {
        console.log("found = ", found)

        if (found) {
            TalkAttendee.update(req.body, {
                where: {id: found.id}
            })
                .then(num => {
                    if (num == 1) {
                        res.send({
                            message: "TalkAttendee was updated successfully.",
                            id: found.id
                        });
                    } else {
                        res.send({
                            message: `Cannot update TalkAttendee with id=${found.id}. Maybe talkattendee was not found or req.body is empty!`
                        });
                    }
                })
                .catch(err => {
                    res.status(500).send({
                        message: "Error updating TalkAttendee with id=" + found.id
                    });
                });

        } else {
            // Save in the database

            // TODO check talk capacity, make sure there is still an open spot.
            if (!_talkUnderCapacity(req.body.talkId)) {
                res.send({
                    message: `Cannot update TalkAttendee with id=${req.body.talkId}. Talk is at capacity!`
                    // TODO handle front end.
                });
                return;
            }

            TalkAttendee.create(talkAttendee)
                .then(data => {
                    // console.log('debug data = ', data)
                    res.send(data);
                })
                .catch(err => {
                    res.status(500).send({
                        message:
                            err.message || "Some error occurred while creating the TalkAttendee."
                    });
                });
        }

    });
};

// Make sure we are still under capacity for attendees, returns boolean.
// function talkUnderCapacity(talkId) {
var _talkUnderCapacity = function(talkId) {

    console.log('checking talk capacity now...')

    // TODO

    return true;
    // return false;
}

// Retrieve all talkAttendees from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    // const q = req.query.q;
    let where = {where: {}};
    // if (title) where =
    //     {
    //         where: {
    //             name: {[Op.like]: `%${name}%`}  // TODO
    //         }
    //     };

    TalkAttendee.findAll(where)
        .then(data => {
            // res.send(data); // straight json.

            // console.log(data);

            // render `talklist.ejs` with the list of talk.
            // console.log(data);
            // res.render('talklist', {
            //     currencyFormat: currencyFormat,
            //     talks: data
            // })

        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving talkattendees."
            });
        });
};

// Find a single TalkAttendee with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    TalkAttendee.findByPk(id)
        .then(data => {
            //console.log('dataValues = ', data.dataValues);

            // res.send(data);  // sends as plain json

            // Render the `TalkAttendee.ejs` template with the TalkAttendee content.
            // let TalkAttendee = data.dataValues;
            // res.render('talkattendee', {
            // example...
            //     currencyFormat: currencyFormat,
            //     title: TalkAttendee.title,
            //     company: TalkAttendee.company,
            //     summary: TalkAttendee.summary,
            //     link: TalkAttendee.link,
            // })

        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving TalkAttendee with id=" + id
            });
        });
};

// Update a TalkAttendee by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    TalkAttendee.update(req.body, {
        where: {id: id}
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "TalkAttendee was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update TalkAttendee with id=${id}. Maybe talkattendee was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating TalkAttendee with id=" + id
            });
        });
};

// Delete a TalkAttendee with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    TalkAttendee.destroy({
        where: {id: id}
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "TalkAttendee was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete talkattendee with id=${id}. Maybe TalkAttendee was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete TalkAttendee with id=" + id
            });
        });
};

// Delete all TalkAttendee from the database.
exports.deleteAll = (req, res) => {
    TalkAttendee.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({message: `${nums} TalkAttendees were deleted successfully!`});
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all talkattendees."
            });
        });
};

