#include <Servo.h>

// Declare servos
Servo servos[4]; 
int servoPins[] = {3, 5, 8, 9};

bool isMoving = false; 
int pos = 0;
int step = 10;            
int currentServo = 0;    

unsigned long lastMove = 0; 
const int interval = 50;  
const unsigned long waitTime = 3000; 

void setup() {
  Serial.begin(9600); 
  Serial.println("System Initializing...");

  for (int i = 0; i < 4; i++) {
    servos[i].attach(servoPins[i]);
    servos[i].write(0); 
  }
  
  Serial.println("Waiting for startup delay...");
}

void loop() {
  unsigned long currentMillis = millis();

  if (!isMoving) {
    if (currentMillis >= waitTime) {
      isMoving = true;
      Serial.println("Movement Started!");
      Serial.print("Moving Servo Index: ");
      Serial.println(currentServo);
    }
    return;
  }

  if (currentMillis - lastMove >= interval) {
    lastMove = currentMillis;

    pos += step; 
    servos[currentServo].write(pos);

    if (pos >= 180 || pos <= 0) {
      currentServo++; 
      pos = 0;        
      
      if (currentServo >= 4) {
        currentServo = 0;
      }

      // Debug output to track the sequence
      Serial.print("Switching to Servo Index: ");
      Serial.println(currentServo);
    }
  }

  // CODE CONTENT FOR OTHER STUFF HERE!!!
}