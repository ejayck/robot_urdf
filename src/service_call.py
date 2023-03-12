#!/usr/bin/env python

import rospy
from geometry_msgs.msg import PoseStamped, Point, Quaternion

def publish_2d_nav_goal():
    # Initialize the ROS node
    rospy.init_node('my_goal_publishers', anonymous=False)

    # Create a publisher for the 2D Nav Goal message
    pub = rospy.Publisher('/move_base_simple/goal', PoseStamped, queue_size=10)

    # Create a new 2D Nav Goal message
    goal = PoseStamped()

    # Set the header information for the message
    goal.header.seq = 0
    goal.header.stamp = rospy.Time.now()
    goal.header.frame_id = "map"

    # Set the position and orientation of the goal
    goal.pose.position = Point(x=0.0, y=13.0, z=0.0)
    goal.pose.orientation = Quaternion(x=0.0, y=0.0, z=0.0, w=1.0)

    # Publish the goal
    rate = rospy.Rate(1) # 1 Hz
    while not rospy.is_shutdown():
        pub.publish(goal)
        rate.sleep()

if __name__ == '__main__':
    try:
        publish_2d_nav_goal()
    except rospy.ROSInterruptException:
        pass
