  // Connect to the rosbridge server
  var ros = new ROSLIB.Ros({
    url : 'ws://localhost:9090'
  });
  
  // Create a publisher for the 2D Nav Goal message
  var publisher = new ROSLIB.Topic({
    ros : ros,
    name : '/move_base_simple/goal',
    messageType : 'geometry_msgs/PoseStamped'
  });
  
  var amclListener = new ROSLIB.Topic({
    ros: ros,
    name: '/amcl_pose',
    messageType: 'geometry_msgs/PoseWithCovarianceStamped'
  });

  amclListener.subscribe(function(msg) {
    var currentPose = msg.pose.pose;
    var x = currentPose.position.x;
    var y = currentPose.position.y;
    var quaternion = currentPose.orientation;
    var angle = Math.atan2(2 * quaternion.z * quaternion.w, 1 - 2 * quaternion.z * quaternion.z);
    angle = angle * 180 / Math.PI;
    angle = Math.round(angle * 100) / 100;
    $('#currentPose').html("Current Pose: X=" + x + ", Y=" + y + ", Angle=" + angle);
  });




  // Function to publish a 2D Nav Goal message
  function publishGoal() {
    // Get the X, Y, and angle values from the user input fields
    var x = parseFloat(document.getElementById('x').value);
    var y = parseFloat(document.getElementById('y').value);
    var angle = parseFloat(document.getElementById('angle').value);
    
    // Create a new 2D Nav Goal message
    var goal = new ROSLIB.Message({
      header : {
        seq : 0,
        stamp : { sec : 0, nsec : 0 },
        frame_id : 'map'
      },
      pose : {
        position : {
          x : x,
          y : y,
          z : 0.0
        },
        orientation : {
          x : 0.0,
          y : 0.0,
          z : Math.sin(angle / 2.0),
          w : Math.cos(angle / 2.0)
        }
      }
    });
    
    // Publish the goal message
    publisher.publish(goal);
  };

const imageContainer = document.getElementById("container");
const myImage = document.getElementById("bot");
const xPos = x; // The desired x-position of the image in pixels
const yPos = y; // The desired y-position of the image in pixels

myImage.style.position = "absolute"; // Make the image position absolute
myImage.style.left = xPos + "px"; // Set the left position of the image
myImage.style.top = yPos + "px"; // Set the top position of the image
