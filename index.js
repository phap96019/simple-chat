var app = require("express")();
var http = require("http").Server(app);
var io = require("socket.io")(http);
var port = process.env.PORT || 3000;

app.get("/:roomId", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", function (socket) {
  console.log("user connected");
  socket.on("roomId", function (...data) {
    //data[0]: roomId, data[1]: message
    io.emit(data[0], data[1]);
  });
  socket.on("disconnect", () => {
    console.log("user disconected");
  });
});

http.listen(port, function () {
  console.log("listening on :" + port);
});
