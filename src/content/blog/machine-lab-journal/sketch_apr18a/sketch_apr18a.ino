#include <Servo.h>

// This is a test of having all motors start from the same initial position 0, and then wait for 5 seconds, and then move them together synchronously 

// To achieve that, we need to create a simple state machine 

bool isMoving = false; 

// Declare servos
Servo servo1, servo2, servo3, servo4;

int pos = 0;
int step = 10;            
unsigned long lastMove = 0; 
const int interval = 30;  // Interval between timer 
const unsigned long waitTime = 3000; // Interval at start 



void setup() {
  servo1.attach(3);
  servo2.attach(5);
  servo3.attach(6);
  servo4.attach(9);

  // Set initial position 
  servo1.write(0);
  servo2.write(0);
  servo3.write(0);
  servo4.write(0);
}

void loop() {
  unsigned long currentMillis = millis();

  // State management
  // Check if we are still at the initial waiting period
  if (!isMoving) {
    if (currentMillis >= waitTime) {
      isMoving = true;
    }
    return;
  }


  // Movement Logic 
  if (currentMillis - lastMove >= interval) {
    lastMove = currentMillis;

    pos += step; 

    // Reverse direction if we hit the limits
    if (pos >= 180 || pos <= 0) {
      step = -step; 
    }
    servo1.write(pos);
    servo2.write(pos);
    servo3.write(pos);
    servo4.write(pos);
  }

// CODE CONTENT FOR OTHER STUFF HERE!!!

}