#include <Servo.h>

//Declare all servos 
Servo servo1;
Servo servo2;
Servo servo3;
Servo servo4;

int pos = 0;    

void setup() {
  servo1.attach(3);
  servo2.attach(5);
  servo3.attach(6);
  servo4.attach(9);
}

void loop() {
  for (pos = 0; pos <= 180; pos += 10) {
    servo1.write(pos);
    servo2.write(pos);
    servo3.write(pos);
    servo4.write(pos);
    delay(15); 
  }

  for (pos = 180; pos >= 0; pos -= 10) {
    servo1.write(pos);
    servo2.write(pos);
    servo3.write(pos);
    servo4.write(pos);
    delay(15);
  }
}