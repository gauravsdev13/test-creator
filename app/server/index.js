const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const app = express();

app.use(express.json());

app.use(cors({
  origin: ["http://localhost:3000"],
  methods: ["GET", "POST", "UPDATE","DELETE", "PUT"],
  credentials: true,
}));


const db = mysql.createConnection({
  host: 'db4free.net',
  user:'sql5453401',
  password:'@Caps123lock',
  database:'sql5453401'
});
  
app.post("/register", (req, res) => {
  const username = req.body.username;
  const joinedOn = req.body.joinedOn;

    db.query(
      "INSERT INTO users (username, joinedOn) VALUES (?,?)",
      [username, joinedOn],
      (err, result) => {
        console.log(err);
      }
    );
  });


app.delete('/logout', (req, res) => {
    if (req.session) {
    req.session.destroy(err => {
      if (err) {
        res.status(400).send('Unable to log out')
      } else {
        res.send('Logout successful')
      }
    });
  } else {
    res.end();
  }
}) 

app.post("/createsegment", (req, res) => {
  const foreignKey = req.body.foreignKey;
  const name = req.body.name;
  const description = req.body.description;
  const segmentId = req.body.segmentId;
  
  db.query(
      "INSERT INTO segments (foreignKey, name, description, segmentId) VALUES (?,?,?,?)",
      [foreignKey, name, description, segmentId],
      (err, result) => {
        console.log(err);
      }
    );
});


app.post("/addparticipant", (req, res) => {

  const username = req.body.username;
  const segmentId = req.body.segmentId;

    db.query(
      "INSERT INTO participants ( username, segmentId) VALUES ( ?, ?)",
      [username, segmentId],
      (err, result) => {
        console.log(err);
      }
    );
});

app.put("/notifyCandidates", (req, res) => {
  const segmentIdNotification = req.body.segmentIdNotification;
  const testStatus = req.body.testStatus;

    db.query(
      "UPDATE participants SET testStatus = ? WHERE segmentId = ?",
      [testStatus, segmentIdNotification],
      (err, result) => {
        console.log(err);
      }
    );

});

app.post("/updateTokens", (req, res) => {
  const loginStatus = req.body.loginStatus;
  const tokens = req.body.tokens;

    db.query(
      "INSERT INTO tokens (loginStatus, tokens) VALUES (?, ?)",
      [loginStatus, tokens],
      (err, result) => {
        console.log(err);
      }
    );
});

app.post("/updatePublishedTests", (req, res) => {
  const testId = req.body.testId;
  const txHash = req.body.txHash;

    db.query(
      "UPDATE tests SET txHash = ? WHERE  testId = ?",
      [txHash, testId],
      (err, result) => {
        console.log(err);
      }
    );
});

app.post("/updatePublishedTestsInAnswers", (req, res) => {
  const testId = req.body.testId;
  const txHash = req.body.txHash;

    db.query(
      "UPDATE answers SET txHash = ? WHERE  testId = ?",
      [txHash, testId],
      (err, result) => {
        console.log(err);
      }
    );
});


app.put("/launchtest", (req, res) => {
  const testIdNotification = req.body.testIdNotification;
  const testStatus = req.body.testStatus;

    db.query(
      "UPDATE tests SET testStatus = ? WHERE  testId = ?",
      [testStatus, testIdNotification],
      (err, result) => {
        console.log(err);
      }
    );
});

app.put("/updateTestStatus", (req, res) => {
  const testId = req.body.testId;
  const testStatus = req.body.testStatus;
    db.query(
      "UPDATE tests SET testStatus = ? WHERE  testId = ?",
      [testStatus, testId],
      (err, result) => {
        console.log(err);
      }
    );
});

app.put("/updateUsername", (req, res) => {
  const username = req.body.username;
  const name = req.body.name;
    db.query(
      "UPDATE users SET name = ? WHERE username = ?",
      [name, username],
      (err, result) => {
        console.log(err);
      }
    );
});

app.delete("/deleteparticipant/:username", (req, res) => {
  const username = req.params.username;
  db.query("DELETE FROM participants WHERE username = ?", username, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.delete("/deletequestion/:QuestionId", (req, res) => {
  const QuestionId = req.params.QuestionId;
  db.query("DELETE FROM questions WHERE QuestionId = ?", QuestionId, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});


app.post("/getResultsforSubmission", (req, res) => {

  const {testId} = req.body;
  var query = "SELECT score, loginStatus FROM answers where testId=" + mysql.escape(testId);

  db.query(query, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
}); 

app.post("/getParticipantsForNotification", (req, res) => {

  const {segmentIdNotification} = req.body;
  var query = "SELECT username FROM participants where segmentId=" + mysql.escape(segmentIdNotification);

  db.query(query, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/getStatusForNotification", (req, res) => {

  const {segmentIdNotification} = req.body;
  var query = "SELECT testStatus FROM participants where segmentId=" + mysql.escape(segmentIdNotification);

  db.query(query, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
}); 


app.post("/getActiveTests", (req, res) => {

  const {foreignKey} = req.body;
  var query = "SELECT * FROM tests where testStatus = 'active' AND foreignKey=" + mysql.escape(foreignKey) ; 

  db.query(query, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  }); 
}); 

app.post("/readCompleteTestList", (req, res) => {

  const {foreignKey} = req.body;
  var query = "SELECT * FROM tests where testStatus = 'complete' AND foreignKey=" + mysql.escape(foreignKey) ; 

  db.query(query, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
}); 

app.post("/readParticipantAnswer", (req, res) => {

  const testId = req.body.testId;
  const loginStatus = req.body.loginStatus;

  db.query("SELECT answerJson FROM answers WHERE testId = ? AND loginStatus = ?", [testId, loginStatus], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
}); 

app.post("/getTestAnswers", (req, res) => {

  const testId = req.body.testId;

  db.query("SELECT answerJson FROM questions WHERE testId = ? ", testId, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
}); 


app.post("/getusers", (req, res) => {

  var query = "SELECT username FROM users";

  db.query(query, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
}); 

app.post("/readTokens", (req, res) => {

  const {loginStatus} = req.body;
  var query = "SELECT tokens FROM tokens where loginStatus=" + mysql.escape(loginStatus) ; 

  db.query(query, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/readNotifications", (req, res) => {

  const {username} = req.body;
  var query = "SELECT testStatus FROM participants where username=" + mysql.escape(username) ; 

  db.query(query, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
}); 

app.post("/createNotifications", (req, res) => {

  const username = req.body.username;
  const testId = req.body.testId;
  
  db.query("INSERT INTO notifcations (username, testId) VALUES (?, ?)", 
  [username, testId], function(err) {
      if (err) throw err;
  });
}); 

app.delete("/deletesegment/:name", (req, res) => {

  const name = req.params.name;
  
  db.query("DELETE FROM segments WHERE name = ?", name, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.delete("/deletetest/:testId", (req, res) => {

  const testId = req.params.testId;
  
  db.query("DELETE FROM tests WHERE testId = ?", testId, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.delete("/deleteUser/:username", (req, res) => {

  const username = req.params.username;
  
  db.query("DELETE FROM users WHERE username = ?", username, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

   
app.post("/createtest", (req, res) => {
  const testId = req.body.testId;
  const testName = req.body.testName;
  const duration = req.body.duration;
  const testDate = req.body.testDate;
  const endTime = req.body.endTime;
  const foreignKey = req.body.foreignKey;
  const cost = req.body.cost;
  const token = req.body.token


    db.query(
      "INSERT INTO tests (testId, testName,  duration, testDate, foreignKey, endTime, cost,  token ) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?)",
      [testId, testName,  duration, testDate, foreignKey, endTime, cost,  token],
      (err, result) => {
        console.log(err);
      }
    );
});

app.post("/getQuestionsSizeForTest", (req, res) => {
  const {testId} = req.body;
  var query = "SELECT * FROM questions where testId=" + mysql.escape(testId);

  db.query(query, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
}); 


app.post("/readtestlist", (req, res) => {
  const {segmentId} = req.body;
  var query = "SELECT * FROM tests where testStatus = 'saved' AND testType = 'S' AND segmentId=" + mysql.escape(segmentId);

  db.query(query, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
}); 

app.post("/readopentestlist", (req, res) => {
  const {foreignKey} = req.body;
  var query = "SELECT * FROM tests where testStatus = 'saved' AND foreignKey=" + mysql.escape(foreignKey);

  db.query(query, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
}); 

app.post("/gettests", (req, res) => {
  db.query("SELECT * FROM tests", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/getresults", (req, res) => {
  db.query("SELECT * FROM answers", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/readSavedTestList", (req, res) => {
  const {foreignKey} = req.body;
  var query = "SELECT * FROM tests where testStatus = 'saved' AND foreignKey=" + mysql.escape(foreignKey) ; 
 
  db.query(query, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
}); 

app.post("/readTestData", (req, res) => {
  const {testId} = req.body;
  var query = "SELECT duration FROM tests where testId = " + mysql.escape(testId) ; 
 
  db.query(query, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
}); 

app.post("/getQuestions", (req, res) => {
  const {testId} = req.body;
  var query = "SELECT * FROM questions where testId = " + mysql.escape(testId) ; 
 
  db.query(query, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
}); 

app.post("/readActiveTestListForUser", (req, res) => {

  var query = "SELECT * FROM tests where testStatus = 'active'"; 
 
  db.query(query, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
}); 


app.post("/readquestions", (req, res) => {
  const {testId} = req.body;
  var query = "SELECT * FROM questions where testId=" + mysql.escape(testId);

  db.query(query, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
}); 

app.post("/addquestions", (req, res) => {

  const number = req.body.number;
  const testId = req.body.testId;
  const question = req.body.question;
  const answerOne = req.body.answerOne;
  const answerTwo = req.body.answerTwo;
  const answerThree = req.body.answerThree;
  const answerFour = req.body.answerFour;
  const type = req.body.type;
  const answerJson = req.body.answerJson;

    db.query(
      "INSERT INTO questions ( number, testId, question, answerOne,  answerTwo,  answerThree,  answerFour, type, answerJson) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [number, testId, question, answerOne,  answerTwo,  answerThree,  answerFour, type, answerJson],
      (err, result) => {
        console.log(err);
      }
    );
});

app.post("/addresults", (req, res) => {

  const testId = req.body.testId;
  const answerJson = req.body.answerJson;
  const loginStatus = req.body.loginStatus;
  const score = req.body.score;

    db.query(
      "INSERT INTO answers ( testId, answerJson, loginStatus, score) VALUES (?, ?, ?, ?)",
      [testId, answerJson, loginStatus, score],
      (err, result) => {
        console.log(err);
      }
    );
});

app.delete("/deletequestion/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM questions WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.listen(process.env.PORT || 3001, () => {
  console.log("running server");
});




