const { decodeBase64 } = require("bcryptjs");
const express = require("express");
const router = express.Router();
const db = require("../../models");

//@route        GET /api/cases
//@desc         Get all cases
//@access       Private
router.get("/api/cases/", (req, res) => {
  db.Case.findAll({
    include: [
      db.Type,
      db.Division,
      db.Plaintiff,
      db.PlaintiffAttorney,
      db.Defendant,
      db.DefenseAttorney,
    ],
  })
    .then((cases) => {
      console.log(cases);
      res.json(cases);
    })
    .catch((err) => console.log("Error while searching : ", err));
});

//@route        GET /api/cases/:id
//@desc         Get case
//@access       Private
router.get("/api/cases/:id", (req, res) => {
  const { id } = req.params;
  db.Case.findOne({
    where: { id },
    include: [
      db.Type,
      db.Division,
      db.Plaintiff,
      db.PlaintiffAttorney,
      db.Defendant,
      db.DefenseAttorney,
    ],
  })
    .then((oneCase) => {
      console.log(oneCase);
      res.json(oneCase);
    })
    .catch((err) => console.log("Error while searching : ", err));
});

// Add search routing to the get case routers
//@route        GET /search/caseumber
//@desc         Get cases by case number
//@access       Private
router.get("/search/casenumber", (req, res) => {
  let { caseNumber } = req.query;
  db.Case.findAll({
    include: [
      db.Type,
      db.Division,
      db.Plaintiff,
      db.PlaintiffAttorney,
      db.Defendant,
      db.DefenseAttorney,
    ],
    where: {
      caseNumber,
    },
  })
    .then(async (cases) => {
      console.log(cases);
      const divisions = await db.Division.findAll({});
      res.render("docketmaster", {
        divisions,
        cases,
      });
    })
    .catch((err) => {
      res.render("error", { error: err });
      console.log(req.query);
    });
});

//@route        GET /search/plaintiff
//@desc         Get cases by Plaintiff
//@access       Private
router.get("/search/plaintiff", (req, res) => {
  let { pLName } = req.query;
  db.Plaintiff.findOne({
    where: {
      LName: pLName,
    },
  })
    .then((results) => {
      db.Case.findOne({
        where: {
          PlaintiffId: results.dataValues.id,
        },
        include: [
          db.Type,
          db.Division,
          db.Plaintiff,
          db.PlaintiffAttorney,
          db.Defendant,
          db.DefenseAttorney,
        ],
      })
        .then(async (caseResults) => {
          const cases = [caseResults];
          console.log(cases);
          const divisions = await db.Division.findAll({});
          res.render("docketmaster", {
            divisions,
            cases,
          });
        })
        .catch((err) => {
          res.render("error", { error: err });
        });
    })
    .catch((err) => {
      res.render("error", { error: err });
    });
});

//@route        GET /search/plaintiff-attorney
//@desc         Get cases by plaintiff attorney
//@access       Private
router.get("/search/plaintiff-attorney", (req, res) => {
  let { pAttyLName } = req.query;
  db.PlaintiffAttorney.findOne({
    where: {
      LName: pAttyLName,
    },
  })
    .then((results) => {
      db.Case.findOne({
        where: {
          PlaintiffAttorneyId: results.dataValues.id,
        },
        include: [
          db.Type,
          db.Division,
          db.Plaintiff,
          db.PlaintiffAttorney,
          db.Defendant,
          db.DefenseAttorney,
        ],
      })
        .then(async (caseResults) => {
          const cases = [caseResults];
          console.log(cases);
          const divisions = await db.Division.findAll({});
          res.render("docketmaster", {
            divisions,
            cases,
          });
        })
        .catch((err) => {
          res.render("error", { error: err });
        });
    })
    .catch((err) => {
      res.render("error", { error: err });
    });
});

//@route        GET /search/defendant
//@desc         Get cases by defendant
//@access       Private
router.get("/search/defendant", (req, res) => {
  let { dLName } = req.query;
  db.Defendant.findOne({
    where: { LName: dLName },
  })
    .then((results) => {
      db.Case.findOne({
        where: { DefendantId: results.dataValues.id },
        include: [
          db.Type,
          db.Division,
          db.Plaintiff,
          db.PlaintiffAttorney,
          db.Defendant,
          db.DefenseAttorney,
        ],
      })
        .then(async (caseResults) => {
          const cases = [caseResults];
          console.log(cases);
          const divisions = await db.Division.findAll({});
          res.render("docketmaster", {
            divisions,
            cases,
          });
        })
        .catch((err) => {
          res.render("error", { error: err });
        });
    })
    .catch((err) => {
      res.render("error", { error: err });
    });
});

//@route        GET /search/defense-attorney
//@desc         Get cases by defense attorney
//@access       Private
router.get("/search/defense-attorney", (req, res) => {
  let { dAttyLName } = req.query;
  db.DefenseAttorney.findOne({
    where: { def_attorneyLName: dAttyLName },
  })
    .then((results) => {
      db.Case.findAll({
        where: {
          DefenseAttorneyId: results.dataValues.id,
        },
        include: [
          db.Type,
          db.Division,
          db.Plaintiff,
          db.PlaintiffAttorney,
          db.Defendant,
          db.DefenseAttorney,
        ],
      })
        .then(async (caseResults) => {
          const cases = [caseResults];
          console.log(cases);
          const divisions = await db.Division.findAll({});
          res.render("docketmaster", {
            divisions,
            cases,
          });
        })
        .catch((err) => {
          res.render("error", { error: err });
        });
    })
    .catch((err) => {
      res.render("error", { error: err });
    });
});

//@route        GET /search/division
//@desc         Get cases by division
//@access       Private
router.get("/search/division", (req, res) => {
  let { divisionName } = req.query;
  console.log(req.query);
  db.Division.findOne({
    where: {
      division: divisionName,
    },
  })
    .then((results) => {
      console.log(results);
      db.Case.findAll({
        where: {
          DivisionId: results.dataValues.id,
        },
        include: [
          db.Type,
          db.Division,
          db.Plaintiff,
          db.PlaintiffAttorney,
          db.Defendant,
          db.DefenseAttorney,
        ],
      })
        .then(async (cases) => {
          console.log(cases);
          const divisions = await db.Division.findAll({});
          res.render("docketmaster", {
            divisions,
            cases,
          });
        })
        .catch((err) => {
          res.render("error", { error: err });
        });
    })
    .catch((err) => {
      res.render("error", { error: err });
    });
});

//@route        POST /api/cases
//@desc         Create new case
//@access       Private
router.post("/api/cases", (req, res) => {
  db.Case.create(req.body).then((newCase) => {
    res.status(201).json(newCase);
  });
});

//@route        PUT /api/cases/:id
//@desc         Update case
//@access       Private
router.put("api/cases/:id", (req, res) => {
  const { id } = req.params;
  db.Case.update({
    where: {
      id,
    },
  }).then((updCase) => {
    res.json(updCase);
  });
});

//@route        DELETE /api/cases/:id
//@desc         Delete case
//@access       Private
router.delete("api/cases/:id", (req, res) => {
  const { id } = req.params;
  db.Case.destroy({
    where: {
      id,
    },
  }).then((delCase) => {
    res.json(delCase);
  });
});

module.exports = router;
