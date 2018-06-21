// Copyright (C) 2018 Cristobal Valenzuela
// 
// This file is part of RunwayML.
// 
// RunwayML is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
// 
// RunwayML is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
// 
// You should have received a copy of the GNU General Public License
// along with RunwayML.  If not, see <http://www.gnu.org/licenses/>.
// 
// ===============================================================
//
// Runway: im2txt receiving data Demo
// This example just receives incoming data from Runway.
// No need to send images or data from here.
// You should select Camera from the Input Panel
//
// Cristóbal Valenzuela
// cris@runwayml.com
//
// ===============================================================


var status;
var caption;
var capture;
var caption;
var emojiCaption = '';

function setup() {
  createCanvas(600, 500);
  capture = createCapture(VIDEO);
  capture.size(width, height);
  capture.hide();

  status = select('#status');
  log = select('#log');

  textSize(100);
  connect2Runway();
}

function draw() {
  image(capture, 0, 0);
  text(emojiCaption, width/2 - 50, height/2);
}

function connect2Runway() {
  // Create a connection to the Runway HTTP Server
  // You should select Camera from the Input Panel
  // *You should update this address to match the URL provided by the app
  const socket = io.connect('http://127.0.0.1:3333');

  // These are the event listeners
  // This is where we wait from Runway to send data
  // When a connection is established
  socket.on('connect', function() {
    status.innerHTML = 'Connected';
  });

  // When there is a data event, update the log element
  socket.on('data', function(data) {
    caption = data.results[0].caption
    // show the result in the page
    log.html(caption);

    if (caption.includes('smiling')) {
      emojiCaption = '😁';
    } else {
      emojiCaption = '';
    }
  });
}