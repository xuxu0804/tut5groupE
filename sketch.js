let circles = []; 
const points = [
    [4, 136], [95, 157], [137, 96], [136, 4], [97, 243], [242, 118],
    [264, 202], [305, 55], [356, 224], [201, 264], [53, 305], [75, 396],
    [0, 296], [162, 419], [183, 500], [224, 356], [316, 377], [336, 463],
    [422, 484], [489, 423], [540, 440], [462, 337], [376, 316], [500, 300],
    [418, 162], [396, 76], [458, 12], [500, 21], [296, 0], [500, 182],
    [0, 28], [25, -10], [6, 458], [40, 540], [300, 500]
  ];

  
// Class for circles with dot
class DotCircle {
  constructor(x, y, outerDiameter, innerDiameter, numCircles, dotColor, fillColor) {
    this.x = x; // X-coordinate for the center of the circle
    this.y = y; // Y-coordinate for the center of the circle
    this.outerDiameter = outerDiameter; // Diameter of the outermost circle
    this.innerDiameter = innerDiameter; // Diameter of the innermost circle
    this.numCircles = numCircles; // Number of concentric circles
    this.dotColor = dotColor; // Color for the dots on each circle
    this.fillColor = fillColor; // Fill color for the main circle

    // Calculate the step size to scale down each circle diameter
    this.diameterStep = (outerDiameter - innerDiameter) / (numCircles - 1);
    
  }

  display() {
    // Draw the filled main circle in the background
    noStroke(); // No border for the filled circle
    fill(this.fillColor); // Set fill color for the main circle
    circle(this.x, this.y, this.outerDiameter); // Draw the main circle with full diameter

    // Draw each concentric circle with dashed style
    for (let i = 0; i < this.numCircles; i++) {
      // Calculate the current diameter based on the step size
      let currentDiameter = (this.outerDiameter - 4) - i * this.diameterStep;
      // Call the function to draw a dashed circle at this diameter
      this.drawDashedCircle(this.x, this.y, currentDiameter, 6, this.dotColor, 2); 
    }
  }

  drawDashedCircle(x, y, diameter, dotSize, lineColor, spacing) {
   // Set the color of the dots for the dashed line
    stroke(lineColor);
    noFill(); // Only dots, no fill color for the circle area

    // Calculate radius and circumference for the current circle
    let radius = diameter / 2;
    let circumference = TWO_PI * radius;

    // Determine the number of dots to fit around the circle with spacing
    let numDots = floor(circumference / (dotSize + spacing));

    // Draw each dot in the dashed circle
    for (let i = 0; i < numDots; i++) {
      // Calculate the angle for each dot's position around the circle
      let angle = map(i, 0, numDots, 0, TWO_PI);
      // Calculate the X and Y position of each dot based on the angle
      let xDot = x + radius * cos(angle);
      let yDot = y + radius * sin(angle);

      fill(lineColor); // Set fill color for the dot
      noStroke(); // No outline for individual dots
      circle(xDot, yDot, dotSize); // Draw the dot at calculated position
    }
  }
}
// Class for circles with multiple line
class LineCircle {
  constructor(x, y, baseRadius, numConcentricCircles, strokeSize, backColor, stokeColor) {
    this.x = x; // X-coordinate for the center of the circles
    this.y = y; // Y-coordinate for the center of the circles
    this.baseRadius = baseRadius; // Radius for the largest circle
    this.numConcentricCircles = numConcentricCircles; // Total number of concentric circles
    this.strokeSize = strokeSize; // Thickness of the stroke for each concentric circle
    this.backColor = backColor; // Background color for the base circle
    this.stokeColor = stokeColor; // Stroke color for the concentric circles

    // Array to store the calculated radii for each concentric circle
    this.concentricRadii = [];

    // Calculate the radius decrement for each concentric circle
    let radiusStep = (baseRadius - 20) / numConcentricCircles;
    // Generate radii for concentric circles by reducing baseRadius progressively
    for (let i = 0; i < numConcentricCircles; i++) {
      // Each concentric radius is reduced by radiusStep
      this.concentricRadii.push(baseRadius - i * radiusStep);
    }
    
    
  }

  display() {
    // Draw the base filled circle
    fill(this.backColor); // Set fill color to backColor
    noStroke(); // Remove stroke for the filled circle
    circle(this.x, this.y, this.baseRadius * 2); // Draw the base circle with double the base radius

    // Set stroke properties for concentric circles
    stroke(this.stokeColor); // Set stroke color for concentric circles
    strokeWeight(this.strokeSize); // Set uniform stroke thickness for all circles
    noFill(); // Remove fill to only draw the outlines

    // Draw each concentric circle
    for (let i = 0; i < this.numConcentricCircles; i++) {
      let currentRadius = this.concentricRadii[i]; // Get the radius for the current circle
      circle(this.x, this.y, currentRadius * 2); // Draw the circle with double the radius
    }
  }
}
// Class for circles with zigzag line
class ZigzagCircle {
  constructor(x, y, outerRadius, innerRadius, numLines, fillColor, strokeColor) {
    this.x = x; // X-coordinate for the center of the circle
    this.y = y; // Y-coordinate for the center of the circle
    this.outerRadius = outerRadius; // Radius for the outer boundary of the circle
    this.innerRadius = innerRadius; // Radius for the inner empty area
    this.numLines = numLines; // Number of zigzag lines to be drawn
    this.fillColor = fillColor; // Fill color for the outer circle
    this.strokeColor = strokeColor; // Color for the zigzag lines
    
    
  }

  display() {
    // Draw the filled outer circle
    fill(this.fillColor); // Set fill color
    noStroke(); // Disable stroke around the circle
    ellipse(this.x, this.y, this.outerRadius * 2); // Draw circle with diameter equal to twice the outer radius

    // Calculate the angle increment for each zigzag line
    let angleStep = TWO_PI / this.numLines; // Divide full circle by the number of lines to get angle increment

    // Arrays to store points on the outer and inner radius for zigzag connections
    let outerPoints = []; // Store points on the outer radius
    let innerPoints = []; // Store points on the inner radius

    // Draw radial lines from the center to the outer circle
    stroke(this.strokeColor); // Set stroke color for radial lines
    strokeWeight(2); // Set thickness for radial lines
    for (let i = 0; i < this.numLines; i++) {
      // Calculate the angle for the current line
      let angle1 = map(i, 0, this.numLines, 0, TWO_PI);

      // Calculate endpoint coordinates on the outer radius for the radial line
      let x1 = this.x + cos(angle1) * this.outerRadius;
      let y1 = this.y + sin(angle1) * this.outerRadius;

      // Draw radial line from the center to the outer radius
      line(this.x, this.y, x1, y1);

      // Calculate endpoint coordinates for the zigzag points
      let angle2 = i * angleStep; // Alternate angle calculation for zigzag points
      let xOuter = this.x + cos(angle2) * this.outerRadius; // Outer zigzag point
      let yOuter = this.y + sin(angle2) * this.outerRadius;
      let xInner = this.x + cos(angle2) * this.innerRadius; // Inner zigzag point
      let yInner = this.y + sin(angle2) * this.innerRadius;

      // Add calculated outer and inner points to their respective arrays
      outerPoints.push({ x: xOuter, y: yOuter });
      innerPoints.push({ x: xInner, y: yInner });
    }
    
     
    // Draw zigzag lines connecting outer and inner points
    stroke(this.strokeColor); // Set color for zigzag lines
    strokeWeight(2); // Set thickness for zigzag lines
    for (let i = 0; i < this.numLines; i++) {
      // Calculate index of the next point to connect for zigzag pattern
      let nextIndex = (i + 1) % this.numLines;

      // Connect current outer point to the next inner point for a zigzag pattern
      line(outerPoints[i].x, outerPoints[i].y, innerPoints[nextIndex].x, innerPoints[nextIndex].y);
    }

  }
}
// Class for smal circles
class SmallCircle {
  constructor(x, y, strokeWeightValue, strokeColor, fillColor, smallCircleColor) {
    this.x = x;  // X-coordinate of the circle's center
    this.y = y;  // Y-coordinate of the circle's center
    this.strokeWeightValue = strokeWeightValue;  // Thickness of the outer circle's stroke
    this.strokeColor = strokeColor;  // Color for the outer circle's stroke
    this.fillColor = fillColor;  // Fill color for the outer circle
    this.smallCircleColor = smallCircleColor;  // Fill color for the inner small circle
   
  }

  display() {
    // Draw the outer circle with the specified stroke and fill colors
    stroke(this.strokeColor); // Set the stroke color for the outer circle
    strokeWeight(this.strokeWeightValue); // Set the stroke thickness for the outer circle
    fill(this.fillColor); // Set the fill color for the outer circle
    circle(this.x, this.y, 30);  // Draw the outer circle with a diameter of 30

    // Draw the inner small circle with a specified color, without any stroke
    noStroke(); // Disable stroke for the small inner circle
    fill(this.smallCircleColor); // Set the fill color for the small inner circle
    circle(this.x, this.y, 10);  // Draw the small inner circle with a diameter of 10
  }
}


// Dictionary with arrays for circle parameters
let circleParams = {
  1: [
    ['DotCircle', 65, 70, 140, 75, 5, '#272b5f', '#bfe0f0'],
    ['LineCircle', 65, 70, 40, 4, 3, '#984e90', '#006c31'],
    ['SmallCircle', 65, 70, 3, '#040506', '#05844d', '#b1a4b4']
  ],
  2: [
    ['DotCircle', 175, 180, 140, 75, 5, '#159439', '#e3f2ef'],
    ['LineCircle', 175, 180, 40, 4, 3, '#eb5559', '#c74d97'],
    ['SmallCircle', 175, 180, 3, '#040506', '#05844d', '#b1a4b4']
  ],
  3: [
    ['DotCircle', 290, 290, 140, 75, 5, '#dd3d4f', '#fff6fa'],
    ['ZigzagCircle', 290, 290, 40, 20, 30, '#d260a0', '#eb5a4b'],
    ['SmallCircle', 290, 290, 3, '#040506', '#05844d', '#b1a4b4']
  ],
  4: [
    ['DotCircle', 400, 400, 135, 75, 5, '#15438a', '#F4C54C'],
    ['LineCircle', 400, 400, 40, 4, 3, '#eb584e', '#e97fb1'],
    ['SmallCircle', 400, 400, 3, '#040506', '#e5282c', '#b1a4b4']
  ],
  5: [
    ['DotCircle', 510, 510, 135, 75, 5, '#6eba78', '#ecf6f8'],
    ['LineCircle', 510, 510, 40, 4, 3, '#bcc25d', '#c980b5']
  ],
  6: [
    ['ZigzagCircle', 215, 30, 135/2, 35, 30, '#f8ca2a', '#e4271a'],
    ['DotCircle', 215, 30, 80, 40, 3, '#eb5a30', '#c4549b'],
    ['SmallCircle', 215, 30, 3, '#040506', '#05844d', '#b1a4b4']
  ],
  7: [
    ['DotCircle', 330, 140, 140, 75, 5, '#c093c3', '#fab632'],
    ['LineCircle', 330, 140, 40, 4, 3, '#53bad7', '#ba60a1'],
    ['SmallCircle', 330, 140, 3, '#26869c', '#e21e19', '#AB9FAE']
  ],
  8: [
    ['DotCircle', 440, 250, 140, 75, 5, '#f07e35', '#f2f8f6'],
    ['LineCircle', 440, 250, 40, 4, 3, '#bc569c', '#117253'],
    ['SmallCircle', 440, 250, 3, '#040506', '#05844d', '#b1a4b4']
  ],
  9: [
    ['ZigzagCircle', 550, 360, 135/2, 35, 30, '#f8ca2a', '#e4271a']
  ],
  10: [
    ['DotCircle', 370, -10, 140, 75, 5, '#e4271e', '#fceae6'],
    ['LineCircle', 370, -10, 40, 4, 3, '#e2a988', '#ba60a1'],
    ['SmallCircle', 370, -10, 3, '#040506', '#05844d', '#b1a4b4']
  ],
  11: [
    ['DotCircle', 480, 100, 140, 75, 5, '#22315b', '#f6af4f'],
    ['DotCircle', 480, 100, 80, 40, 3, '#f4e1f0', '#bd4591'],
    ['SmallCircle', 480, 100, 3, '#040506', '#e6332a', '#b1a4b4']
  ],
  12: [
    ['DotCircle', 20, 220, 140, 75, 5, '#004985', '#f5b423'],
    ['DotCircle', 20, 220, 80, 40, 3, '#e83e35', '#c44b96'],
    ['SmallCircle', 20, 220, 3, '#040506', '#e5282c', '#b1a4b4']
  ],
  13: [
    ['ZigzagCircle', 140, 330, 135/2, 35, 30, '#f8ca2a', '#e4271a'],
    ['DotCircle', 140, 330, 80, 40, 3, '#e52a2f', '#c85d9f'],
    ['SmallCircle', 140, 330, 3, '#040506', '#e5282c', '#b1a4b4']
  ],
  14: [
    ['DotCircle', 250, 440, 140, 75, 5, '#cd1a52', '#f8b66a'],
    ['LineCircle', 250, 440, 40, 4, 3, '#bcc25d', '#c980b5'],
    ['SmallCircle', 250, 440, 3, '#040506', '#e5282c', '#b1a4b4']
  ],
  15: [
    ['DotCircle', 365, 550, 140, 75, 5, '#e72b2c', '#fdf6f7']
  ],
  16: [
    ['DotCircle', -10, 370, 140, 75, 5, '#009d90', '#daeef3'],
    ['LineCircle', -10, 370, 40, 4, 3, '#6e9381', '#af4d97'],
    ['SmallCircle', -10, 370, 3, '#040506', '#05844d', '#b1a4b4']
  ],
  17: [
    ['DotCircle', 100, 480, 140, 75, 5, '#e52929', '#fdfdfd'],
    ['LineCircle', 100, 480, 40, 4, 3, '#b275b0', '#69c0e3'],
    ['SmallCircle', 100, 480, 3, '#040506', '#05844d', '#b1a4b4']
  ]
};
const circleClasses = {
  DotCircle: DotCircle,
  LineCircle: LineCircle,
  ZigzagCircle: ZigzagCircle,
  SmallCircle: SmallCircle
};


function setup() {
  // Create a 500x500 pixel canvas for the drawing
  createCanvas(500, 500);
  
  // Draw a gradient background on the canvas
  drawGradient();
  
  // Create circle instances based on the parameters and class mappings
  // The 'circleParams' object contains configurations for different circle types
  // The 'circleClasses' object maps circle types to their respective class constructors
  createCircles(circleParams, circleClasses);
  
  // Structure to hold points for connecting and generating shapes
  // connectPoints will draw lines or shapes between specified points
  connectPoints(points, 108);
  
  // Generate and draw random ellipses at the specified points
  // The 'generateRandomEllipses' function adds visual interest by placing
  // randomly sized and colored ellipses around the points
  generateRandomEllipses(points);
}

function draw() {
  
  // Loop through the array and call display() on each circle object
  for (let i = 0; i < circles.length; i++) {
    circles[i].display();
  }
  
  // Draw specific pink arcs between the given points
  drawPinkArc([70, 70], [95, 157]);
  drawPinkArc([180, 180], [242, 118]);
  drawPinkArc([290, 290], [376, 316]);
  drawPinkArc([440, 250], [500, 182]);
  drawPinkArc([100, 480], [183, 500]);
}

// Function to create circle instances based on given parameters and class mappings
function createCircles(params, classes) {
  // Iterate through each key in the params object to access different circle parameter sets
  for (let key in params) {
    // Get the array of parameter sets for the current key
    let paramSetArray = params[key];
    // Loop through each parameter set in the array
    for (let i = 0; i < paramSetArray.length; i++) {
      // Extract the current parameter set
      const paramSet = paramSetArray[i];
      // The first element of the parameter set specifies the type of circle to create
      const type = paramSet[0];
      // Check if the circle class exists for the given type and create an instance
      // The remaining elements in paramSet are passed as arguments to the class constructor
      let instance = classes[type] ? new classes[type](...paramSet.slice(1)) : null;
      // If the instance was created successfully, add it to the circles array
      if (instance) {
        circles.push(instance);
      }
    }
  }
}

// function for background
function drawGradient() {
  // Define the start and end colors of the gradient
  let topColor = color('#004e76');  // Blue 
  let bottomColor = color('#0d7faa');  // Light blue shade

  // Draw the gradient background
  for (let y = 0; y <= height; y++) {
    let inter = map(y, 0, height, 0, 1);
    let c = lerpColor(topColor, bottomColor, inter);
    stroke(c);
    line(0, y, width, y);
  }
}
// function for structure
function connectPoints(points, maxDistance) {
  // Loop through each point in the array 'points' and treat it as the starting point
  points.forEach((start, i) => {
    // For each starting point, loop through the points again to get the endpoint
    points.forEach((end, j) => {
      // Only consider pairs where the index 'i' is less than 'j' to avoid duplicate connections
      if (i < j) {
        // Calculate the distance between the two points using the 'calculateDistance' function
        const distance = calculateDistance(...start, ...end);
        
        // If the distance between the points is less than or equal to the specified 'maxDistance'
        if (distance <= maxDistance) {
          // Call 'drawConnection' to visually connect the two points, using the distance as a parameter
          drawConnection(start, end, distance);
        }
      }
    });
  });
}

function drawConnection(start, end, distance) {
  // Calculate the angle between the start and end points using the 'calculateAngle' function
  const angle = calculateAngle(...start, ...end);
  // Calculate the X-axis radius for the ellipses based on the distance, adjusting it to fit
  let radiusX = (distance - 12) / 6;
  // Define a fixed Y-axis radius for the ellipses
  let radiusY = 3;
  // Save the current drawing state
  push();
  // Translate the drawing origin to the starting point's coordinates
  translate(start[0], start[1]);
  // Rotate the drawing context based on the calculated angle (convert angle to radians)
  rotate(radians(angle));
  // Loop to create 3 ellipses along the line between the start and end points
  for (let i = 0; i < 3; i++) {
    // Draw an ellipse at an offset along the line, using the calculated radii for X and Y
    createEllipse((12 + 6 + 2 * radiusX * i), 0, radiusX, radiusY);
  }
  // Restore the previous drawing state to avoid affecting other parts of the canvas
  pop();
}

function generateRandomEllipses(points) {
  // Loop through each point in the array
  for (let i = 0; i < points.length; i++) {
    // Extract the x and y coordinates of the current point
    let x = points[i][0];
    let y = points[i][1];
    // Generate random width (w) and height (h) for the ellipse
    let w = random(15, 20);
    let h = random(15, 20);
    let angle = random(-PI / 9, PI / 9); // Generate a random angle for rotating the ellipse
    push();

    translate(x, y);
    rotate(angle);

    stroke(232, 120, 15);  
    strokeWeight(3);  
    fill(0);  
    // Draw the outer ellipse at the translated origin
    ellipse(0, 0, w, h);
    noStroke();
    fill(255);
    // Draw a smaller inner ellipse inside the outer one
    ellipse(0, 0, w / 3, h / 3);
    pop();
  }
}

function calculateDistance(x1, y1, x2, y2) {
  const deltaX = x2 - x1;
  const deltaY = y2 - y1;
  return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
}

function calculateAngle(x1, y1, x2, y2) {
  const deltaY = y2 - y1;
  const deltaX = x2 - x1;
  const angleRadians = Math.atan2(deltaY, deltaX);
  return angleRadians * (180 / Math.PI);
}

function createEllipse(xPos, yPos, radiusX, radiusY) {
  fill(random(255), random(255), random(255));
  stroke('orange');
  strokeWeight(2);
  ellipse(xPos, yPos, radiusX * 2, radiusY * 2);
}

// Function to draw pink arcs between two points
function drawPinkArc(start, end) {
  const midX = (start[0] + end[0]) / 2;
  const midY = (start[1] + end[1]) / 2;
  const distance = calculateDistance(...start, ...end);

  stroke(255, 28, 90); // Pink color
  strokeWeight(6);
  noFill();
  push();
  translate(midX, midY);
  const angle = calculateAngle(...start, ...end);
  rotate(radians(angle));
  arc(0, 0, distance, distance, PI, TWO_PI);
  pop();
}
