#include <Servo.h>

// Declare servos
Servo servo1, servo2, servo3, servo4;

int pos = 0;
int step = 10;            
unsigned long lastMove = 0; 
const int interval = 15;  // Interval between timer 

void setup() {
  servo1.attach(3);
  servo2.attach(5);
  servo3.attach(6);
  servo4.attach(9);
}

void loop() {
  unsigned long currentMillis = millis();

  // Check if it's time to move based on our interval
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