const db = require("../models");
const Talk = db.talks;
const TalkAttendee = db.talkAttendees;
const Op = db.Sequelize.Op;


function currencyFormat(num) {
    const currency = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0
    })
    return currency.format(num)
}

// Create and Save a new talk
exports.create = (req, res) => {
    // Validate request
    if (!req.body.name) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a talk
    const talk = {
        name: req.body.name,
        company: req.body.company,
        summary: req.body.summary,
        email: req.body.email,
        bio: req.body.bio,
        capacity: req.body.capacity,
    };

    // Save talk in the database
    Talk.create(talk)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Talk."
            });
        });
};

// Retrieve all talk from the database, joining to get all userTalks information also.
exports.findAll = (req, res) => {
    const name = req.query.name;
    let q = req.query.q;
    if (!q) q = ""
    let where = ""  // nothing for now.

    // Basic search, by string
    // Joined table search.
    where = {
        include: [{
            model: TalkAttendee,
            where: {userId: 11},   // TODO NOTE: Also only get userTalks that belong to current user.
            required: false,  // sql outer join
        }],
        where: {
            [Op.or]: [
                {name: {[Op.like]: `%${q}%`}},
                {summary: {[Op.like]: `%${q}%`}}
            ]
        }
    }

    Talk.findAll(where)
        .then(data => {
            // res.send(data); // straight json.

            console.log('data = ', data); // debug output.
            // let talks = data.toJSON()
            // console.log('talks = ', talks); // debug output.

            // render `talklist.ejs` with the list of talks.
            // console.log(data);
            res.render('talklist', {
                currencyFormat: currencyFormat,
                talks: data   // includes our second table join data.
            })

        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving talks."
            });
        });

};

// Find a single Talk with an id, also query and get the talkAttendee for curr user, if they are going.
exports.findOne = (req, res) => {
    const id = req.params.id;

    Talk.findByPk(id)
        .then(data => {
            //console.log('dataValues = ', data.dataValues);

            // res.send(data);  // sends as plain json
            // Render the `talk.ejs` template with the talk content.
            let talk = data.dataValues

            TalkAttendee.findOne({where: {userId: 11, talkId: talk.id}}).then(data2 => {  // todo NOTE: hardcoded user id for demo.
                let talkAttendee = null
                // console.log('data2 = ', data2)
                if (data2) talkAttendee = data2.dataValues
                // console.log('userTalk = ', userTalk)

                res.render('talk', {
                    currencyFormat: currencyFormat,
                    id: talk.id,
                    name: talk.name,
                    company: talk.company,
                    summary: talk.summary,
                    email: talk.email,
                    bio: talk.bio,
                    link: talk.link,
                    capacity: talk.capacity,
                    talkAttendeeId: talkAttendee ? talkAttendee.id : 0   // id if current user is attending the talk.
                })

            })


        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Talk with id=" + id
            });
            console.log('err = ', err)

        });
};

// Update a Talk by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Talk.update(req.body, {
        where: {id: id}
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Talk was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Talk with id=${id}. Maybe talk was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Talk with id=" + id
            });
        });
};

// Delete a Talk with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Talk.destroy({
        where: {id: id}
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Talk was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Talk with id=${id}. Maybe Talk was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Talk with id=" + id
            });
        });
};

// Delete all Talks from the database.
exports.deleteAll = (req, res) => {
    Talk.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({message: `${nums} Talks were deleted successfully!`});
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all talks."
            });
        });
};

